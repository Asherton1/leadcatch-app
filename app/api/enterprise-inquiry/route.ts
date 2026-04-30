import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isSpam, escapeHtml } from '@/lib/form-security'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, locations, message, website } = body

    // Spam check using shared library
    const spamReason = isSpam({
      name: name || '',
      email: email || '',
      company: company || '',
      message: message || '',
      website: website || '',
    })
    if (spamReason) {
      // Silent reject — return 200 so spammers don't get useful feedback
      console.log('[enterprise-inquiry] blocked:', spamReason)
      return NextResponse.json({ ok: true })
    }

    // Escape ALL user input before injecting into HTML email body
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      company: escapeHtml(company),
      locations: escapeHtml(locations) || 'Not specified',
      message: escapeHtml(message) || 'No message',
    }

    await resend.emails.send({
      from: 'ReCapture <hello@userecapture.com>',
      to: 'hello@userecapture.com',
      replyTo: email,
      subject: 'Enterprise Inquiry — ' + safe.company,
      html:
        '<h2>New Enterprise Inquiry</h2>' +
        '<p><strong>Name:</strong> ' + safe.name + '</p>' +
        '<p><strong>Email:</strong> ' + safe.email + '</p>' +
        '<p><strong>Company:</strong> ' + safe.company + '</p>' +
        '<p><strong>Locations:</strong> ' + safe.locations + '</p>' +
        '<p><strong>Message:</strong> ' + safe.message + '</p>',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[enterprise-inquiry] error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
