import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendSmsAlert } from '@/lib/sms'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER ?? ''

const VALID_TOPICS = ['pricing', 'trial', 'enterprise', 'form_audit', 'general']

function generateToken(): string {
  // 8-char URL-safe token (e.g. "k7Bx9qPm")
  return crypto.randomBytes(6).toString('base64url').slice(0, 8)
}

function normalizePhone(raw: string): string | null {
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  if (digits.length >= 10) return '+' + digits
  return null
}

function topicLabel(topic: string): string {
  const labels: Record<string, string> = {
    pricing: 'pricing',
    trial: 'trial info',
    enterprise: 'enterprise info',
    form_audit: 'free form audit',
    general: 'info',
  }
  return labels[topic] || 'info'
}

export async function POST(req: NextRequest) {
  try {
    const rawBody: Record<string, unknown> = await req.json()
    console.log('[marissa-sms] raw body:', JSON.stringify(rawBody))

    // Retell wraps function arguments in an 'args' object, not flat at top level.
    // Also support flat top-level for direct API calls / Stripe webhook style.
    const args = (rawBody.args && typeof rawBody.args === 'object'
      ? rawBody.args
      : rawBody) as Record<string, unknown>

    // Pull call_id from nested call object if present (Retell sends body.call.call_id)
    const callObj = (rawBody.call && typeof rawBody.call === 'object'
      ? rawBody.call
      : null) as Record<string, unknown> | null
    const call_id = callObj?.call_id ? String(callObj.call_id) :
                    rawBody.call_id ? String(rawBody.call_id) : undefined

    // Defensive extraction from args (Retell sometimes capitalizes)
    const rawPhone = String(args.phone || args.Phone || '')
    const rawEmail = String(args.email || args.Email || '')
    const name = String(args.name || args.Name || '').trim()
    const topic = String(args.topic || args.Topic || 'general').toLowerCase()
    const notes = String(args.notes || args.Notes || '').trim()

    // Normalize phone
    const phone = normalizePhone(rawPhone)
    if (!phone) {
      console.error('[marissa-sms] invalid phone:', rawPhone)
      return NextResponse.json({ ok: false, error: 'Invalid phone number', raw: rawPhone }, { status: 400 })
    }

    // Validate topic
    const cleanTopic = VALID_TOPICS.includes(topic) ? topic : 'general'

    // Optional email — clean if provided
    let cleanEmail: string | null = null
    if (rawEmail) {
      let e = rawEmail.trim()
      const md = e.match(/\[([^\]]+)\]/)
      if (md) e = md[1]
      const mt = e.match(/mailto:([^\s\)>]+)/)
      if (mt) e = mt[1]
      e = e.replace(/^[<\[\(\"']+|[>\]\)\"']+$/g, '').trim()
      if (e.includes('@') && e.split('@')[1]?.includes('.')) cleanEmail = e
    }

    // Skip caller_phone if it's the literal template string
    let caller_phone: string | undefined
    const cpRaw = args.caller_phone || rawBody.caller_phone
    if (cpRaw && typeof cpRaw === 'string' && !cpRaw.includes('{{')) {
      caller_phone = cpRaw
    }
    // Also fall back to from_number on the call object (most accurate — actual caller)
    if (!caller_phone && callObj?.from_number) {
      caller_phone = String(callObj.from_number)
    }

    // Generate unique token + insert link record
    const token = generateToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.userecapture.com'
    const shortLink = `${baseUrl}/s/${token}`

    const { data: linkRow, error: insertErr } = await supabaseAdmin
      .from('marissa_followup_links')
      .insert({
        token,
        phone,
        email: cleanEmail,
        name: name || null,
        topic: cleanTopic,
        notes: notes || null,
        call_id: call_id || null,
        caller_phone: caller_phone || null,
      })
      .select('id, token')
      .single()

    if (insertErr || !linkRow) {
      console.error('[marissa-sms] DB insert failed:', insertErr)
      return NextResponse.json({ ok: false, error: 'DB error' }, { status: 500 })
    }

    // Look up SMS template from DB (admin-editable, falls back to hardcoded if missing)
    let smsBody: string
    try {
      const { data: template } = await supabaseAdmin
        .from('sms_templates')
        .select('body')
        .eq('topic', cleanTopic)
        .single()

      if (template?.body) {
        // Merge tag substitution
        smsBody = template.body
          .replaceAll('{name}', name || 'there')
          .replaceAll('{topic}', topicLabel(cleanTopic))
          .replaceAll('{shortlink}', shortLink)
          .replaceAll('{phone}', phone)
          .replaceAll('{caller_phone}', caller_phone || phone)
      } else {
        // Fallback if template not found
        const greeting = name ? `Hi ${name}!` : 'Hi!'
        smsBody = `${greeting} As promised — here's your ${topicLabel(cleanTopic)} from ReCapture: ${shortLink}\n\nReply STOP to opt out.`
      }
    } catch (err) {
      console.error('[marissa-sms] template lookup failed, using fallback:', err)
      const greeting = name ? `Hi ${name}!` : 'Hi!'
      smsBody = `${greeting} As promised — here's your ${topicLabel(cleanTopic)} from ReCapture: ${shortLink}\n\nReply STOP to opt out.`
    }

    // Send SMS via Twilio (using existing sms.ts infrastructure adapted)
    let smsId: string | null = null
    let smsSuccess = false
    if (TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM) {
      try {
        const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`
        const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64')
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: phone,
            From: TWILIO_FROM,
            Body: smsBody,
          }),
        })
        if (res.ok) {
          const result = await res.json()
          smsId = result.sid || null
          smsSuccess = true
          console.log('[marissa-sms] SMS sent to', phone, 'sid:', smsId)
        } else {
          const errText = await res.text()
          console.error('[marissa-sms] SMS failed:', res.status, errText)
        }
      } catch (err) {
        console.error('[marissa-sms] SMS exception:', err)
      }
    } else {
      console.error('[marissa-sms] Twilio creds missing')
    }

    // Update link row with SMS status
    if (smsSuccess) {
      await supabaseAdmin
        .from('marissa_followup_links')
        .update({ sms_sent: true, sms_sent_at: new Date().toISOString(), sms_id: smsId })
        .eq('id', linkRow.id)
    }

    // Optional: also send email if they gave one
    let emailId: string | null = null
    if (cleanEmail && RESEND_KEY) {
      const greeting = name ? `Hi ${name}!` : 'Hi!'
      try {
        const resend = new Resend(RESEND_KEY)
        const emailResult = await resend.emails.send({
          from: 'Marissa at ReCapture <hello@userecapture.com>',
          to: cleanEmail,
          replyTo: 'hello@userecapture.com',
          subject: `Your ${topicLabel(cleanTopic)} from ReCapture`,
          html: `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Inter',sans-serif;color:#fff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 24px;">
  <span style="font-size:18px;font-weight:700;color:#fff;"><span style="color:#ff6b35;">[•]</span> Re<span style="color:#ff6b35;">Capture</span></span>
</td></tr>
<tr><td style="padding:0 0 16px;">
  <p style="margin:0;font-size:16px;color:#fff;line-height:1.6;">${greeting}</p>
</td></tr>
<tr><td style="padding:0 0 24px;">
  <p style="margin:0;font-size:15px;color:#ccc;line-height:1.7;">As promised, here's the ${topicLabel(cleanTopic)} we discussed. We also texted this link to your phone so you have it on whichever device works best.</p>
</td></tr>
<tr><td style="padding:0 0 24px;">
  <a href="${shortLink}" style="display:inline-block;background:#ff6b35;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;">View ${topicLabel(cleanTopic)} →</a>
</td></tr>
<tr><td style="padding:32px 0 0;border-top:1px solid #222;">
  <p style="margin:24px 0 0;font-size:14px;color:#aaa;">Questions? Just reply to this email — someone will personally check every message.</p>
  <p style="margin:16px 0 0 0;font-size:14px;color:#fff;font-weight:600;">Ash</p>
  <p style="margin:2px 0 0 0;font-size:13px;color:#888;">Founder, ReCapture</p>
  <p style="margin:2px 0 0 0;font-size:13px;color:#888;">Lost revenue recovery for high-ticket service businesses</p>
  <p style="margin:8px 0 0 0;font-size:13px;color:#888;">(888) 606-0630 · hello@userecapture.com · userecapture.com</p>
</td></tr>
</table></td></tr></table>
</body></html>`,
        })
        emailId = emailResult.data?.id || null
        if (emailId) {
          await supabaseAdmin
            .from('marissa_followup_links')
            .update({ email_sent: true, email_sent_at: new Date().toISOString(), email_id: emailId })
            .eq('id', linkRow.id)
        }
        console.log('[marissa-sms] email sent to', cleanEmail, 'id:', emailId)
      } catch (err) {
        console.error('[marissa-sms] email send failed:', err)
      }
    }

    // Internal notification to Ash
    if (RESEND_KEY) {
      try {
        const resend = new Resend(RESEND_KEY)
        await resend.emails.send({
          from: 'Marissa Activity <hello@userecapture.com>',
          to: 'hello@userecapture.com',
          subject: `Marissa sent ${cleanTopic} link to ${phone}`,
          html: `<div style="font-family:Inter,sans-serif;max-width:600px;background:#0a0a0a;color:#fff;padding:32px;">
<h2 style="color:#ff6b35;margin:0 0 24px;">Marissa Followup (SMS)</h2>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:8px 0;color:#888;width:120px;">Topic</td><td style="padding:8px 0;color:#fff;">${cleanTopic}</td></tr>
<tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;color:#fff;">${phone}</td></tr>
${name ? `<tr><td style="padding:8px 0;color:#888;">Name</td><td style="padding:8px 0;color:#fff;">${name}</td></tr>` : ''}
${cleanEmail ? `<tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#fff;">${cleanEmail}</td></tr>` : ''}
${notes ? `<tr><td style="padding:8px 0;color:#888;">Notes</td><td style="padding:8px 0;color:#fff;">${notes}</td></tr>` : ''}
<tr><td style="padding:8px 0;color:#888;">Link</td><td style="padding:8px 0;color:#ff6b35;font-family:monospace;">${shortLink}</td></tr>
<tr><td style="padding:8px 0;color:#888;">SMS</td><td style="padding:8px 0;color:#fff;">${smsSuccess ? 'Sent' : 'FAILED'}</td></tr>
${call_id ? `<tr><td style="padding:8px 0;color:#888;">Call ID</td><td style="padding:8px 0;color:#aaa;font-family:monospace;font-size:12px;">${call_id}</td></tr>` : ''}
</table>
</div>`,
        })
      } catch (err) {
        console.error('[marissa-sms] internal notify failed:', err)
      }
    }

    return NextResponse.json({
      ok: true,
      message: smsSuccess
        ? `Link sent to ${phone}`
        : `Link created but SMS failed for ${phone}`,
      sms_sent: smsSuccess,
      link: shortLink,
    })
  } catch (err) {
    console.error('[marissa-sms] handler error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
