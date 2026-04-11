import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

function isSpam(data: Record<string, string>): string | null {
  // Honeypot — if this hidden field has a value, it's a bot
  if (data.website && data.website.trim().length > 0) return 'honeypot'

  // Name validation
  if (!data.name || data.name.trim().length < 3) return 'name too short'
  if (/^(.)\1+$/.test(data.name.trim())) return 'name is repeated chars'
  if (/^test/i.test(data.name.trim())) return 'test submission'

  // Email validation
  if (!data.email || !data.email.includes('@') || !data.email.includes('.')) return 'invalid email'
  const throwaway = ['mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com', 'sharklasers.com', 'trashmail.com']
  const domain = data.email.split('@')[1]?.toLowerCase()
  if (throwaway.includes(domain)) return 'throwaway email'

  // Phone validation
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '')
    if (digits.length > 0 && digits.length < 7) return 'phone too short'
    if (/^(\d)\1+$/.test(digits)) return 'phone is repeated digits'
  }

  // Message spam signals
  if (data.message) {
    const msg = data.message.toLowerCase()
    if (/\b(viagra|casino|crypto|bitcoin|lottery|prize|winner|click here|buy now)\b/.test(msg)) return 'spam keywords'
    if (/^(.)\1{5,}$/.test(data.message.trim())) return 'message is repeated chars'
  }

  return null
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, service, message, website } = body

  // Check for spam
  const spamReason = isSpam({ name, email, phone, service, message, website })
  if (spamReason) {
    // Silently accept — don't tell bots they were caught
    return NextResponse.json({ ok: true })
  }

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
