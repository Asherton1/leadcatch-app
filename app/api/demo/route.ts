import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

function isSpam(data: Record<string, string>): string | null {
  if (data.website && data.website.trim().length > 0) return 'honeypot'
  if (!data.name || data.name.trim().length < 3) return 'name too short'
  if (/^(.)\1+$/.test(data.name.trim())) return 'name is repeated chars'
  if (/^test/i.test(data.name.trim())) return 'test submission'
  if (!data.email || !data.email.includes('@') || !data.email.includes('.')) return 'invalid email'
  const throwaway = ['mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com', 'sharklasers.com', 'trashmail.com']
  const domain = data.email.split('@')[1]?.toLowerCase()
  if (throwaway.includes(domain)) return 'throwaway email'
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '')
    if (digits.length > 0 && digits.length < 7) return 'phone too short'
    if (/^(\d)\1+$/.test(digits)) return 'phone is repeated digits'
  }
  if (data.message) {
    const msg = data.message.toLowerCase()
    if (/\b(viagra|casino|crypto|bitcoin|lottery|prize|winner|click here|buy now)\b/.test(msg)) return 'spam keywords'
    if (/^(.)\1{5,}$/.test(data.message.trim())) return 'message is repeated chars'
  }
  return null
}

function prospectConfirmationHtml(name: string) {
  const firstName = name ? name.split(' ')[0] : 'there'
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0a0a;">

        <!-- Logo -->
        <tr><td style="padding:0 0 32px 0;">
          <span style="font-family:'Inter',sans-serif;font-size:1.25rem;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">
            <span style="color:#ff6b35;">[•]</span> Re<span style="color:#ff6b35;">Capture</span>
          </span>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:0 0 24px 0;">
          <h1 style="margin:0;font-family:'Inter',sans-serif;font-size:1.75rem;font-weight:700;line-height:1.2;letter-spacing:-0.02em;color:#ffffff;">
            Hi ${firstName},
          </h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:0 0 24px 0;">
          <p style="margin:0 0 16px 0;font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:#c4c4c4;">
            Got your demo request. Thanks for the interest.
          </p>
          <p style="margin:0 0 16px 0;font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:#c4c4c4;">
            Quick note &mdash; you don't have to wait for me to set up a call. ReCapture is fully self-serve. You can start your 7-day free trial right now, install the script in 60 seconds, and see your first abandoned lead come through today.
          </p>
          <p style="margin:0 0 16px 0;font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:#c4c4c4;">
            No card required to start. Most clients recover one lead in the first week &mdash; usually pays for the year.
          </p>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:8px 0 32px 0;">
          <a href="https://www.userecapture.com/signup" style="display:inline-block;background:#ff6b35;color:#0a0a0a;padding:14px 28px;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;letter-spacing:-0.005em;">
            Begin your 7-day trial &rarr;
          </a>
        </td></tr>

        <!-- Reply prompt -->
        <tr><td style="padding:0 0 32px 0;">
          <p style="margin:0;font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:#888888;">
            Questions before you sign up? Just reply to this email. I read every message personally.
          </p>
        </td></tr>

        <!-- Hairline -->
        <tr><td style="padding:0 0 24px 0;">
          <div style="height:1px;background:#1a1a1a;"></div>
        </td></tr>

        <!-- Sign-off -->
        <tr><td style="padding:0 0 16px 0;">
          <p style="margin:0;font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:#c4c4c4;">
            Ash<br/>
            <span style="color:#888888;">Founder, ReCapture</span><br/>
            <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none;">userecapture.com</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0 0;">
          <p style="margin:0;font-family:'Inter',sans-serif;font-size:12px;line-height:1.6;color:#555555;">
            ReCapture &middot; Form abandonment recovery for high-ticket service businesses &middot; Dallas, TX
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, service, message, website } = body

  const spamReason = isSpam({ name, email, phone, service, message, website })
  if (spamReason) {
    return NextResponse.json({ ok: true })
  }

  await supabase.from('demo_requests').insert({ name, email, phone, service, message })

  // Notify Ash
  await resend.emails.send({
    from: 'ReCapture <hello@userecapture.com>',
    to: 'asherton.c@me.com',
    subject: `New Demo Request — ${name}`,
    html: `
      <h2>New Demo Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business Type:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message || 'None'}</p>
    `,
  })

  // Confirmation to prospect
  await resend.emails.send({
    from: 'Ash from ReCapture <hello@userecapture.com>',
    to: email,
    subject: 'Your ReCapture demo — start your trial today',
    html: prospectConfirmationHtml(name),
    replyTo: 'asherton.c@me.com',
  })

  return NextResponse.json({ ok: true })
}
