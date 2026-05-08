import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

async function sendEmail(to: string, subject: string, html: string, apiKey: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Asherton Chraibi <hello@userecapture.com>',
      to: [to],
      subject,
      html,
      reply_to: 'hello@userecapture.com',
    }),
  })
  return res.json()
}

interface ClientRow {
  id: string
  email: string | null
  first_name: string | null
  name: string | null
  api_key: string
  trial_ends_at: string | null
  created_at: string
}

function installNudgeHtml(firstName: string, apiKey: string, daysSinceSignup: number): string {
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi there,'
  const scriptTag = '<script src="https://userecapture.com/track.js?key=' + apiKey + '"></script>'

  return [
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;font-family:Inter,-apple-system,sans-serif;">',
    '<tr><td align="center" style="padding:40px 20px;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0a0a0a;color:#fff;">',

    '<tr><td style="padding:0 0 40px 0;">',
    '<span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.3px;">',
    '<span style="color:#ff6b35;">[&bull;]</span> Re<span style="color:#ff6b35;">Capture</span>',
    '</span>',
    '</td></tr>',

    '<tr><td style="padding:0 0 24px 0;">',
    '<h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1.25;">',
    'Need a hand getting installed, ' + (firstName || 'there') + '?',
    '</h1>',
    '</td></tr>',

    '<tr><td style="color:#aaa;font-size:15px;line-height:1.7;padding:0 0 24px 0;">',
    greeting + ' &mdash; you signed up ' + daysSinceSignup + ' days ago and I haven\'t seen any tracker activity from your site yet. ',
    'No worries at all &mdash; most installs take 5 minutes once you have the script in front of the right person. I just wanted to make sure nothing is stuck.',
    '</td></tr>',

    '<tr><td style="color:#aaa;font-size:15px;line-height:1.7;padding:0 0 24px 0;">',
    'Here\'s your tracker snippet again, in case the welcome email got buried:',
    '</td></tr>',

    '<tr><td style="padding:0 0 32px 0;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:8px;">',
    '<tr><td style="padding:16px 20px;font-family:Courier,monospace;font-size:13px;color:#22c55e;word-break:break-all;line-height:1.6;">',
    '&lt;script src=&quot;https://userecapture.com/track.js?key=' + apiKey + '&quot;&gt;&lt;/script&gt;',
    '</td></tr>',
    '</table>',
    '</td></tr>',

    '<tr><td style="color:#aaa;font-size:15px;line-height:1.7;padding:0 0 24px 0;">',
    'Drop it in your site\'s template file (right before the closing <code style="background:#1a1a1a;color:#ff6b35;padding:2px 6px;border-radius:3px;font-size:13px;">&lt;/body&gt;</code> tag) and you\'re done. Works on WordPress, Webflow, Squarespace, Wix, or any custom site.',
    '</td></tr>',

    '<tr><td style="color:#aaa;font-size:15px;line-height:1.7;padding:0 0 32px 0;">',
    '<strong style="color:#fff;">Want me to walk you through it?</strong> Just reply to this email with the URL of your site and I\'ll personally help get you installed. Takes 10 minutes on a quick screen-share, or I can do it async if that\'s easier.',
    '</td></tr>',

    '<tr><td style="text-align:center;padding:0 0 32px 0;">',
    '<a href="https://www.userecapture.com/integrations" style="display:inline-block;background:#ff6b35;color:#000;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:14px;margin-right:8px;">Install Guides</a>',
    '<a href="https://www.userecapture.com/dashboard" style="display:inline-block;background:transparent;color:#aaa;font-weight:600;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:14px;border:1px solid #1e1e1e;">Open Dashboard</a>',
    '</td></tr>',

    '<tr><td style="padding:24px 0 0 0;border-top:1px solid #1e1e1e;color:#666;font-size:13px;line-height:1.7;">',
    'Ash<br/>',
    'Founder, ReCapture<br/>',
    '<span style="color:#444;">Born &amp; Built in Dallas, Texas</span>',
    '</td></tr>',

    '</table>',
    '</td></tr>',
    '</table>',
  ].join('')
}

export async function GET(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const RESEND_KEY = process.env.RESEND_API_KEY!
  const CRON_SECRET = process.env.CRON_SECRET!

  const authHeader = req.headers.get('authorization')
  if (authHeader !== 'Bearer ' + CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  // Window: signed up between 2 and 4 days ago
  const windowStart = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
  const windowEnd = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()

  // Find clients in the window who haven't been nudged yet
  const { data: clients } = await supabase
    .from('clients')
    .select('id, email, first_name, name, api_key, trial_ends_at, created_at')
    .eq('active', true)
    .neq('plan', 'admin')
    .eq('install_nudge_sent', false)
    .gte('created_at', windowStart)
    .lte('created_at', windowEnd)

  const results: string[] = []
  const skipped: string[] = []

  if (clients && clients.length > 0) {
    for (const c of clients as ClientRow[]) {
      if (!c.email || !c.api_key) {
        skipped.push((c.email || c.id) + ' - missing email or api_key')
        continue
      }

      // Check if this client has any leads yet (proxy for tracker firing)
      const { count, error: leadCountErr } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('client_id', c.id)

      if (leadCountErr) {
        console.error('[install-nudge] Lead count error for', c.id, leadCountErr)
        continue
      }

      // If they have leads, tracker is firing — no nudge needed.
      // Mark as nudge_sent anyway so we do not check them again.
      if ((count ?? 0) > 0) {
        await supabase
          .from('clients')
          .update({ install_nudge_sent: true, install_nudge_sent_at: new Date().toISOString() })
          .eq('id', c.id)
        skipped.push(c.email + ' - tracker already firing (' + count + ' leads)')
        continue
      }

      const firstName = c.first_name || c.name?.split(' ')[0] || 'there'
      const daysSinceSignup = Math.floor((now.getTime() - new Date(c.created_at).getTime()) / (24 * 60 * 60 * 1000))

      const subject = 'Need a hand getting ReCapture installed?'
      const html = installNudgeHtml(firstName, c.api_key, daysSinceSignup)

      const res = await sendEmail(c.email, subject, html, RESEND_KEY)
      await supabase
        .from('clients')
        .update({ install_nudge_sent: true, install_nudge_sent_at: new Date().toISOString() })
        .eq('id', c.id)
      results.push(c.email + ' (' + firstName + ', day ' + daysSinceSignup + ') - ' + (res.id || 'sent'))
    }
  }

  // Notify admin if anything happened
  if (results.length > 0 || skipped.length > 0) {
    const lines: string[] = []
    if (results.length > 0) {
      lines.push('<p><strong>' + results.length + ' install nudges sent:</strong></p>')
      lines.push(...results.map(r => '<p style="color:#22c55e;">' + r + '</p>'))
    }
    if (skipped.length > 0) {
      lines.push('<p><strong>' + skipped.length + ' clients skipped:</strong></p>')
      lines.push(...skipped.map(s => '<p style="color:#888;">' + s + '</p>'))
    }
    const notifyHtml = '<div style="font-family:Inter,sans-serif;color:#333;font-size:14px">' + lines.join('') + '</div>'
    await sendEmail('hello@userecapture.com', 'ReCapture install nudges - ' + results.length + ' sent', notifyHtml, RESEND_KEY)
  }

  return NextResponse.json({
    message: 'Install nudge complete',
    sent: results.length,
    skipped: skipped.length,
    sent_details: results,
    skipped_details: skipped,
  })
}
