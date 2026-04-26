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
    }),
  })
  return res.json()
}

function followUp1Html(name: string) {
  const firstName = name ? name.split(' ')[0] : null
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi,'
  return '<div style="font-family:Inter,-apple-system,sans-serif;color:#333;max-width:600px;line-height:1.7;font-size:15px">' +
    '<p>' + greeting + '</p>' +
    '<p>Following up on your demo request — wanted to make sure my last note didn\'t get buried.</p>' +
    '<p>If you\'re still curious about ReCapture, I\'d love to walk you through it on a quick 15-min call. We can pull up your site live, install the script in 60 seconds, and you\'ll see your first abandoned lead come through before we hang up.</p>' +
    '<p>If now isn\'t the right time, no problem at all — just let me know and I\'ll stop pinging you.</p>' +
    '<p>Best,<br/>Ash<br/>Founder, ReCapture<br/><a href="https://userecapture.com" style="color:#ff6b35;text-decoration:none">userecapture.com</a></p>' +
    '</div>'
}

function followUp2Html(name: string) {
  const firstName = name ? name.split(' ')[0] : null
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi,'
  return '<div style="font-family:Inter,-apple-system,sans-serif;color:#333;max-width:600px;line-height:1.7;font-size:15px">' +
    '<p>' + greeting + '</p>' +
    '<p>Last note on this — I don\'t want to be the person who fills your inbox.</p>' +
    '<p>You signed up for a demo a couple weeks back and I haven\'t heard from you since. If timing or priorities shifted, totally understand.</p>' +
    '<p>If you ever want to revisit, the door\'s open — 14-day trial is still available, no card required to start. Just reply to this email or head to <a href="https://userecapture.com" style="color:#ff6b35;text-decoration:none">userecapture.com</a>.</p>' +
    '<p>Wishing you a strong quarter.</p>' +
    '<p>Ash<br/>Founder, ReCapture</p>' +
    '</div>'
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
  const day4Cutoff = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)
  const day10Cutoff = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)

  // Day 4 follow-ups: created 4+ days ago, no fu1 sent, no reply, no trial
  const { data: fu1Demos } = await supabase
    .from('demo_requests')
    .select('*')
    .eq('followup_1_sent', false)
    .eq('replied', false)
    .eq('trial_started', false)
    .lte('created_at', day4Cutoff.toISOString())

  // Day 10 follow-ups: fu1 already sent, no fu2 sent, no reply, no trial
  const { data: fu2Demos } = await supabase
    .from('demo_requests')
    .select('*')
    .eq('followup_1_sent', true)
    .eq('followup_2_sent', false)
    .eq('replied', false)
    .eq('trial_started', false)
    .lte('created_at', day10Cutoff.toISOString())

  const results: string[] = []

  if (fu1Demos) {
    for (const d of fu1Demos) {
      const subject = 'Following up on your ReCapture demo'
      const html = followUp1Html(d.name)
      const res = await sendEmail(d.email, subject, html, RESEND_KEY)
      await supabase
        .from('demo_requests')
        .update({ followup_1_sent: true, followup_1_sent_at: new Date().toISOString() })
        .eq('id', d.id)
      results.push('Day 4: ' + d.email + ' (' + (d.name || 'no name') + ') - ' + (res.id || 'sent'))
    }
  }

  if (fu2Demos) {
    for (const d of fu2Demos) {
      const subject = 'Last note — your ReCapture demo'
      const html = followUp2Html(d.name)
      const res = await sendEmail(d.email, subject, html, RESEND_KEY)
      await supabase
        .from('demo_requests')
        .update({ followup_2_sent: true, followup_2_sent_at: new Date().toISOString() })
        .eq('id', d.id)
      results.push('Day 10: ' + d.email + ' (' + (d.name || 'no name') + ') - ' + (res.id || 'sent'))
    }
  }

  if (results.length > 0) {
    const notifyHtml = '<div style="font-family:Inter,sans-serif;color:#333;font-size:14px"><p><strong>' + results.length + ' demo follow-ups sent:</strong></p>' + results.map(r => '<p>' + r + '</p>').join('') + '</div>'
    await sendEmail('asherton.c@me.com', 'ReCapture demo follow-ups — ' + results.length + ' sent', notifyHtml, RESEND_KEY)
  }

  return NextResponse.json({
    message: 'Demo follow-up sequence complete',
    day4: fu1Demos?.length || 0,
    day10: fu2Demos?.length || 0,
    details: results
  })
}
