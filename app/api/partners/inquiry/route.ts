import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, agency, email, message } = body as Record<string, string>

    if (!name || !agency || !email) {
      return NextResponse.json(
        { error: 'Name, agency, and email are required.' },
        { status: 400 }
      )
    }

    if (!RESEND_KEY) {
      console.error('[partners/inquiry] RESEND_API_KEY missing')
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
    }

    const resend = new Resend(RESEND_KEY)

    // Notify Ash
    await resend.emails.send({
      from: 'ReCapture Partners <hello@userecapture.com>',
      to: 'hello@userecapture.com',
      replyTo: email,
      subject: `Partner application: ${agency} (${name})`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;background:#0a0a0a;color:#fff;padding:32px;">
<h2 style="color:#ff6b35;margin:0 0 24px;">New Partner Application</h2>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;color:#fff;">${escapeHtml(name)}</td></tr>
<tr><td style="padding:8px 0;color:#888;">Agency</td><td style="padding:8px 0;color:#fff;">${escapeHtml(agency)}</td></tr>
<tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#ff6b35;">${escapeHtml(email)}</td></tr>
${message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Notes</td><td style="padding:8px 0;color:#fff;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>` : ''}
</table>
</div>`,
    })

    // Confirmation to applicant
    const firstName = name.split(' ')[0]
    await resend.emails.send({
      from: 'Asherton at ReCapture <hello@userecapture.com>',
      to: email,
      replyTo: 'hello@userecapture.com',
      subject: 'Your ReCapture partner application',
      html: `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Inter',sans-serif;color:#fff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 24px;">
  <span style="font-size:18px;font-weight:700;color:#fff;"><span style="color:#ff6b35;">[&bull;]</span> Re<span style="color:#ff6b35;">Capture</span></span>
</td></tr>
<tr><td style="padding:0 0 16px;">
  <p style="margin:0;font-size:16px;color:#fff;line-height:1.6;">Hi ${escapeHtml(firstName)},</p>
</td></tr>
<tr><td style="padding:0 0 24px;">
  <p style="margin:0;font-size:15px;color:#ccc;line-height:1.7;">Got your application for the ReCapture partner program. I read every one personally.</p>
  <p style="margin:16px 0 0;font-size:15px;color:#ccc;line-height:1.7;">I&rsquo;ll review it in the next 24 hours and reply with a few calendar windows for a 15-minute intro call. If it&rsquo;s a fit for both sides, your first client account can be live within a week.</p>
</td></tr>
<tr><td style="padding:32px 0 0;border-top:1px solid #222;">
  <p style="margin:24px 0 0 0;font-size:14px;color:#fff;font-weight:600;">Asherton Chraibi</p>
  <p style="margin:2px 0 0 0;font-size:13px;color:#888;">Founder, ReCapture</p>
  <p style="margin:2px 0 0 0;font-size:13px;color:#888;">Lost revenue recovery for high-ticket service businesses</p>
  <p style="margin:8px 0 0 0;font-size:13px;color:#888;">(888) 606-0630 &middot; hello@userecapture.com</p>
</td></tr>
</table></td></tr></table>
</body></html>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[partners/inquiry] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
