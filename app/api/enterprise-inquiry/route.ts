import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, company, locations, message } = await req.json()

    await resend.emails.send({
      from: 'ReCapture <onboarding@resend.dev>',
      to: 'asherton.c@me.com',
      subject: '🏢 Enterprise Inquiry — ' + company,
      html: '<h2>New Enterprise Inquiry</h2>' +
        '<p><strong>Name:</strong> ' + name + '</p>' +
        '<p><strong>Email:</strong> ' + email + '</p>' +
        '<p><strong>Company:</strong> ' + company + '</p>' +
        '<p><strong>Locations:</strong> ' + (locations || 'Not specified') + '</p>' +
        '<p><strong>Message:</strong> ' + (message || 'No message') + '</p>',
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
