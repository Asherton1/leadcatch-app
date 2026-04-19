import { NextRequest, NextResponse } from 'next/server'

const RESEND_KEY = process.env.RESEND_API_KEY
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== 'Bearer ' + CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const emails = [
    {
      to: 'communications@mintdentistry.com',
      cc: 'jennifersgrillo@mintdentistry.com',
      subject: 'From your neighbor in Harwood — quick question about your online forms',
      body: `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">
<p>Hi there,</p>

<p>I live in the Harwood District \u2014 literally a few blocks from your Uptown location on Fairmount. I see the MINT billboard from my balcony every day, so when I built a tool that helps dental practices recover lost leads, you were the first practice that came to mind.</p>

<p>Here\u2019s the issue I keep seeing: 60-70% of people who start filling out a consultation or appointment request form online never hit submit. They type their name, email, phone \u2014 then get distracted and close the tab. Your CRM never sees them.</p>

<p>For a practice doing veneers, implants, and cosmetic work at MINT\u2019s level, even a few of those lost leads per month could represent $10,000-$30,000 in missed revenue.</p>

<p>I built <a href="https://userecapture.com" style="color: #ff6b35;">ReCapture</a> to solve exactly this. One script tag on your website captures that partial form data in real time \u2014 before they leave. Your front desk gets an instant alert with the lead\u2019s info within seconds, and a branded recovery email goes out automatically.</p>

<p>With 50+ locations, I\u2019d imagine even a 5% improvement in form completion would move the needle significantly across the network.</p>

<p>Would love to show you a quick demo \u2014 takes 2 minutes. Happy to swing by the Uptown office since I\u2019m right down the street.</p>

<p>Best,<br/>
Ash Chraibi<br/>
Founder, <a href="https://userecapture.com" style="color: #ff6b35;">ReCapture</a><br/>
(813) 245-5956</p>
</div>`
    }
  ]

  const results = []

  for (const email of emails) {
    try {
      const payload: Record<string, unknown> = {
        from: 'Ash Chraibi <hello@userecapture.com>',
        to: email.to,
        subject: email.subject,
        html: email.body,
      }
      if (email.cc) {
        payload.cc = email.cc
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_KEY,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      results.push({ to: email.to, status: res.status, data })
    } catch (err) {
      results.push({ to: email.to, error: String(err) })
    }
  }

  return NextResponse.json({ sent: results.length, results })
}
