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
      from: 'ReCapture <hello@userecapture.com>',
      to: [to],
      subject,
      html,
      reply_to: 'asherton.c@me.com',
    }),
  })
  return res.json()
}

interface ClientRow {
  id: string
  email: string | null
  first_name: string | null
  name: string | null
  plan: string | null
  trial_ends_at: string | null
  avg_lead_value: number | null
}

interface LeadRow {
  id: string
  status: string | null
  estimated_value: number | null
}

function trialReminderHtml(firstName: string, trialEndDateLong: string, plan: string, planPrice: number, leads: number, atRisk: number, recovered: number, saved: number) {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;font-family:'Inter',-apple-system,sans-serif;">
<tr><td align="center" style="padding:48px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0a0a;color:#fff;">

  <tr><td style="padding:0 0 56px 0;">
    <span style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px;">
      <span style="color:#ff6b35;">[&bull;]</span> Re<span style="color:#ff6b35;">Capture</span>
    </span>
    <span style="font-size:11px;color:#888;margin-left:14px;letter-spacing:0.5px;">Trial Update</span>
  </td></tr>

  <tr><td style="padding:0 0 16px 0;">
    <p style="margin:0;font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:0.2em;">&sect; 2 days left</p>
  </td></tr>
  <tr><td style="padding:0 0 24px 0;">
    <h1 style="margin:0;font-size:30px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1.2;">Your trial ends ${trialEndDateLong}.</h1>
  </td></tr>
  <tr><td style="color:#aaa;font-size:16px;line-height:1.7;padding:0 0 56px 0;">
    Hi ${firstName} &mdash; here's what ReCapture has captured for you so far.
  </td></tr>

  <tr><td style="font-size:11px;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;padding:0 0 16px 0;font-weight:700;">Your Trial Performance</td></tr>

  <tr><td style="padding:0 0 48px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%;padding:0 6px 12px 0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:24px 16px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#ff6b35;line-height:1;">${leads}</div>
            <div style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:10px;">Leads Captured</div>
          </td></tr></table>
        </td>
        <td style="width:50%;padding:0 0 12px 6px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:24px 16px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#f87171;line-height:1;">$${atRisk.toLocaleString()}</div>
            <div style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:10px;">Revenue at Risk</div>
          </td></tr></table>
        </td>
      </tr>
      <tr>
        <td style="width:50%;padding:0 6px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:24px 16px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#22c55e;line-height:1;">${recovered}</div>
            <div style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:10px;">Recovered</div>
          </td></tr></table>
        </td>
        <td style="width:50%;padding:0 0 0 6px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:24px 16px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#22c55e;line-height:1;">$${saved.toLocaleString()}</div>
            <div style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:10px;">Revenue Saved</div>
          </td></tr></table>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="font-size:11px;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;padding:0 0 16px 0;font-weight:700;">What Happens Next</td></tr>

  <tr><td style="padding:0 0 56px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;">
      <tr><td style="padding:32px 28px;">
        <div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;">Your Plan</div>
        <div style="font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.3px;margin-bottom:24px;">${plan} &middot; $${planPrice}/mo</div>
        <div style="height:1px;background:#1e1e1e;margin:0 0 24px 0;"></div>
        <p style="margin:0 0 16px 0;color:#aaa;font-size:15px;line-height:1.7;">
          On <strong style="color:#fff;">${trialEndDateLong}</strong>, your subscription continues automatically and your card on file is charged $${planPrice}.
        </p>
        <p style="margin:0;color:#888;font-size:14px;line-height:1.7;">
          ${recovered > 0 ? "You've already saved more than the cost of a month's subscription. No action needed." : "If everything's running smoothly, no action needed. Otherwise, you can manage your plan below."}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="text-align:center;padding:0 0 40px 0;">
    <a href="https://www.userecapture.com/dashboard" style="display:inline-block;background:#ff6b35;color:#000;font-weight:700;padding:16px 32px;border-radius:8px;text-decoration:none;font-size:14px;letter-spacing:-0.005em;margin-right:8px;">Open Dashboard</a>
    <a href="https://www.userecapture.com/settings" style="display:inline-block;background:transparent;color:#888;font-weight:600;padding:16px 28px;border-radius:8px;text-decoration:none;font-size:14px;border:1px solid #1e1e1e;">Manage Plan</a>
  </td></tr>

  <tr><td style="padding:0 0 48px 0;">
    <p style="margin:0;font-size:14px;color:#888;line-height:1.7;">
      Questions or need to make changes? Just reply to this email &mdash; I read every message.
    </p>
  </td></tr>

  <tr><td style="padding:0 0 24px 0;">
    <div style="height:1px;background:#1e1e1e;"></div>
  </td></tr>

  <tr><td style="text-align:center;">
    <span style="color:#444;font-size:12px;letter-spacing:0.3px;">ReCapture &middot; Born &amp; Built in Dallas, Texas</span>
  </td></tr>

</table>
</td></tr>
</table>`
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
  // Day 5 = trial ends in ~2 days. Window: trial_ends_at between 1.5 days and 2.5 days from now.
  const windowStart = new Date(now.getTime() + 1.5 * 24 * 60 * 60 * 1000).toISOString()
  const windowEnd = new Date(now.getTime() + 2.5 * 24 * 60 * 60 * 1000).toISOString()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, email, first_name, name, plan, trial_ends_at, avg_lead_value')
    .eq('active', true)
    .eq('trial_reminder_5_sent', false)
    .gte('trial_ends_at', windowStart)
    .lte('trial_ends_at', windowEnd)

  const results: string[] = []

  if (clients && clients.length > 0) {
    for (const c of clients as ClientRow[]) {
      if (!c.email || !c.trial_ends_at) continue

      // Pull all leads for this client (during trial)
      const { data: leads } = await supabase
        .from('leads')
        .select('id, status, estimated_value')
        .eq('client_id', c.id)

      const leadsList = (leads ?? []) as LeadRow[]
      const avgValue = c.avg_lead_value || 400
      const totalLeads = leadsList.length
      const recovered = leadsList.filter(l => l.status === 'converted').length
      const atRisk = totalLeads * avgValue
      const saved = recovered * avgValue

      const firstName = c.first_name || c.name?.split(' ')[0] || 'there'
      const trialEndDateLong = new Date(c.trial_ends_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      const planLabel = c.plan === 'essentials' ? 'Essentials' : 'Pro'
      const planPrice = c.plan === 'essentials' ? 197 : 397

      const subject = `Your ReCapture trial ends ${new Date(c.trial_ends_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — here's what you've captured`
      const html = trialReminderHtml(firstName, trialEndDateLong, planLabel, planPrice, totalLeads, atRisk, recovered, saved)

      const res = await sendEmail(c.email, subject, html, RESEND_KEY)
      await supabase
        .from('clients')
        .update({ trial_reminder_5_sent: true, trial_reminder_5_sent_at: new Date().toISOString() })
        .eq('id', c.id)
      results.push(c.email + ' (' + firstName + ') - ' + (res.id || 'sent'))
    }
  }

  if (results.length > 0) {
    const notifyHtml = '<div style="font-family:Inter,sans-serif;color:#333;font-size:14px"><p><strong>' + results.length + ' trial reminders sent:</strong></p>' + results.map(r => '<p>' + r + '</p>').join('') + '</div>'
    await sendEmail('asherton.c@me.com', 'ReCapture trial reminders — ' + results.length + ' sent', notifyHtml, RESEND_KEY)
  }

  return NextResponse.json({
    message: 'Trial reminders complete',
    sent: results.length,
    details: results,
  })
}
