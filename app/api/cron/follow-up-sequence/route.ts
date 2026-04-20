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

function followUp1Html(name: string, company: string) {
  const firstName = name ? name.split(' ')[0] : null
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi there,'
  const companyLine = company ? ' at ' + company : ''
  return '<div style="font-family:Inter,-apple-system,sans-serif;color:#333;max-width:600px;line-height:1.7;font-size:15px">' +
    '<p>' + greeting + '</p>' +
    '<p>Just wanted to make sure my note about ReCapture didn\u2019t get buried \u2014 I know how busy things get' + companyLine + '.</p>' +
    '<p>The short version: we show you every person who starts your online forms but never submits. Names, emails, phone numbers \u2014 captured the moment they start typing. One script tag, no form changes, 60 seconds to install.</p>' +
    '<p>If you have 5 minutes this week, I\u2019d love to show you a quick demo. And if the timing isn\u2019t right, no worries at all.</p>' +
    '<p>Best,<br/>Asherton Chraibi<br/>Founder, ReCapture<br/>(813) 245-5956<br/>hello@userecapture.com</p>' +
    '</div>'
}

function followUp2Html(name: string, company: string) {
  const firstName = name ? name.split(' ')[0] : null
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi there,'
  const companyLine = company ? ' ' + company : ' yours'
  return '<div style="font-family:Inter,-apple-system,sans-serif;color:#333;max-width:600px;line-height:1.7;font-size:15px">' +
    '<p>' + greeting + '</p>' +
    '<p>Last note from me \u2014 I don\u2019t want to be the person who fills your inbox.</p>' +
    '<p>I built ReCapture because I spent 10 years managing ad campaigns for businesses like' + companyLine + ' and kept watching the same problem: great traffic, solid landing pages, and a massive gap between form views and form submissions. Nobody was tracking what happened <em>during</em> the form.</p>' +
    '<p>If you\u2019re curious, I\u2019d love to run a free Form Audit on your website \u2014 it takes about 2 minutes, and we\u2019ll send you a report showing your form field count, mobile UX issues, tracking gaps, and an estimate of how much revenue your forms are leaking monthly. Completely free, no strings.</p>' +
    '<p>Just reply \u201caudit\u201d and I\u2019ll send it over.</p>' +
    '<p>Best,<br/>Asherton Chraibi<br/>Founder, ReCapture<br/>(813) 245-5956<br/>hello@userecapture.com</p>' +
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

  const { data: fu1Contacts } = await supabase
    .from('outreach_contacts')
    .select('*')
    .eq('followup_1_sent', false)
    .eq('replied', false)
    .lte('initial_sent_at', day4Cutoff.toISOString())

  const { data: fu2Contacts } = await supabase
    .from('outreach_contacts')
    .select('*')
    .eq('followup_1_sent', true)
    .eq('followup_2_sent', false)
    .eq('replied', false)
    .lte('initial_sent_at', day10Cutoff.toISOString())

  const results: string[] = []

  if (fu1Contacts) {
    for (const c of fu1Contacts) {
      const subject = 'Following up \u2014 ' + (c.company || 'your online forms')
      const html = followUp1Html(c.name, c.company)
      const res = await sendEmail(c.email, subject, html, RESEND_KEY)
      await supabase
        .from('outreach_contacts')
        .update({ followup_1_sent: true, followup_1_sent_at: new Date().toISOString() })
        .eq('id', c.id)
      results.push('FU1: ' + c.email + ' - ' + (res.id || 'sent'))
    }
  }

  if (fu2Contacts) {
    for (const c of fu2Contacts) {
      const subject = 'Last note \u2014 free Form Audit for ' + (c.company || 'your website')
      const html = followUp2Html(c.name, c.company)
      const res = await sendEmail(c.email, subject, html, RESEND_KEY)
      await supabase
        .from('outreach_contacts')
        .update({ followup_2_sent: true, followup_2_sent_at: new Date().toISOString() })
        .eq('id', c.id)
      results.push('FU2: ' + c.email + ' - ' + (res.id || 'sent'))
    }
  }

  if (results.length > 0) {
    const notifyHtml = '<div style="font-family:Inter,sans-serif;color:#333;font-size:14px"><p><strong>' + results.length + ' follow-up emails sent:</strong></p>' + results.map(r => '<p>' + r + '</p>').join('') + '</div>'
    await sendEmail('asherton.c@me.com', 'ReCapture follow-up sequence \u2014 ' + results.length + ' sent', notifyHtml, RESEND_KEY)
  }

  return NextResponse.json({
    message: 'Follow-up sequence complete',
    followup1: fu1Contacts?.length || 0,
    followup2: fu2Contacts?.length || 0,
    details: results
  })
}
