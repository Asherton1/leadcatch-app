import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  await supabase.from('demo_requests').insert({ name, email, phone, service, message })

  await resend.emails.send({
    from: 'ReCapture <hello@userecapture.com>',
    to: 'asherton.c@me.com',
    subject: `🔥 New Demo Request — ${name}`,
    html: `
      <h2>New Demo Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business Type:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message || 'None'}</p>
    `,
  })

  return NextResponse.json({ ok: true })
}
