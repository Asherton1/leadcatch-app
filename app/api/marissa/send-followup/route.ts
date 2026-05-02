import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''

interface FollowupRequest {
  email: string
  name?: string
  topic?: 'pricing' | 'trial' | 'enterprise' | 'general' | 'form_audit' | string
  notes?: string
  call_id?: string
  caller_phone?: string
}

function templateForTopic(topic: string, name: string) {
  const greeting = name ? `Hi ${name},` : 'Hi there,'

  const templates: Record<string, { subject: string; body: string; cta: { label: string; url: string } | null }> = {
    pricing: {
      subject: 'Your ReCapture pricing — as promised',
      body: `Thanks for calling earlier. Here's the pricing breakdown we discussed.

<strong>Essentials — $197/month</strong>
See every lead you're losing. Manual follow-up tools. Lead dashboard with hot/warm/cold scoring.

<strong>Pro — $397/month</strong>
Everything in Essentials, plus AI voice callback within 60 seconds, automated recovery emails, instant SMS alerts to your team, and Slack notifications. HIPAA-ready with BAA available.

<strong>Enterprise — from $1,997/month</strong>
For multi-location practices, franchise systems, and high-volume operations. Custom-priced based on your locations and integration needs.

Both Essentials and Pro come with a 7-day free trial. Cancel anytime.`,
      cta: { label: 'Start your 7-day free trial', url: 'https://www.userecapture.com/start-trial' },
    },
    trial: {
      subject: 'Your 7-day free trial — ready when you are',
      body: `Thanks for calling earlier. As promised, here's your trial link.

You'll get full access to every Pro plan feature for 7 days — AI voice callback, automated recovery emails, SMS alerts, Slack alerts, the works.

Setup takes about 60 seconds. Drop one line of JavaScript on your site and you'll see your first abandoned leads come through within an hour.

Most clients recover their first lead in week one — that single recovered lead usually pays for the entire year of ReCapture.`,
      cta: { label: 'Start your 7-day free trial', url: 'https://www.userecapture.com/start-trial' },
    },
    enterprise: {
      subject: 'Enterprise inquiry — next steps',
      body: `Thanks for calling earlier. Based on what you shared, our enterprise team will reach out within 24 hours to scope a tailored proposal.

In the meantime, here's our enterprise overview with the four tier breakdowns and what's included at each level. Every enterprise deployment is custom-priced based on locations, integrations, and reporting needs.

If anything else comes up before our team reaches out, just reply to this email — someone will personally check every message.`,
      cta: { label: 'Review enterprise tiers', url: 'https://www.userecapture.com/enterprise' },
    },
    form_audit: {
      subject: 'Your free form audit — request the report',
      body: `Thanks for calling earlier. Here's the link to our free form audit.

We'll scan your site and send you a detailed report covering form field count, mobile UX issues, tracking gaps, industry-specific abandonment benchmarks, and exactly how much revenue your forms are leaking every month.

It's the most thorough form analysis in the industry. Completely free. No card required.`,
      cta: { label: 'Request your free form audit', url: 'https://www.userecapture.com/form-audit' },
    },
    general: {
      subject: 'ReCapture — info as promised',
      body: `Thanks for calling earlier. Here's the overview I promised.

ReCapture is a form abandonment recovery platform built for high-ticket service businesses. We capture the leads that start filling out your contact forms but never hit submit — sixty to seventy percent of high-intent visitors do this every day.

We capture their name, email, and phone the moment they start typing, score the lead by intent, and reach out automatically through SMS alerts, AI voice callbacks within 60 seconds, branded recovery emails, or Slack notifications.

Most clients recover their first lead in week one — usually pays for the entire year.`,
      cta: { label: 'See the platform in action', url: 'https://www.userecapture.com/demo' },
    },
  }

  const t = templates[topic] || templates.general
  return { greeting, ...t }
}

export async function POST(req: NextRequest) {
  try {
    const body: Record<string, unknown> = await req.json()
    console.log('[marissa-followup] raw body:', JSON.stringify(body))

    // Defensive extraction — accept Name OR name (Retell sometimes capitalizes)
    const rawEmail = String(body.email || body.Email || '')
    const name = String(body.name || body.Name || '')
    const topic = String(body.topic || body.Topic || 'general')
    const notes = String(body.notes || body.Notes || '')
    const call_id = body.call_id ? String(body.call_id) : undefined

    // Strip Markdown link wrappers if Retell injects them
    // e.g. "[abby@gmail.com](mailto:abby@gmail.com)" -> "abby@gmail.com"
    let cleanedEmail = rawEmail.trim()
    const mdMatch = cleanedEmail.match(/\[([^\]]+)\]/)
    if (mdMatch) cleanedEmail = mdMatch[1]
    const mailtoMatch = cleanedEmail.match(/mailto:([^\s\)>]+)/)
    if (mailtoMatch) cleanedEmail = mailtoMatch[1]
    // Strip surrounding angle brackets / parens / quotes
    cleanedEmail = cleanedEmail.replace(/^[<\[\(\"']+|[>\]\)\"']+$/g, '').trim()

    // Skip caller_phone if it's the literal template string (Retell didn't substitute)
    let caller_phone: string | undefined
    if (body.caller_phone && typeof body.caller_phone === 'string' && !body.caller_phone.includes('{{')) {
      caller_phone = body.caller_phone
    }

    // Basic validation — must have @ and a dot after it
    if (!cleanedEmail || !cleanedEmail.includes('@') || !cleanedEmail.split('@')[1]?.includes('.')) {
      console.error('[marissa-followup] invalid email after cleaning:', { raw: rawEmail, cleaned: cleanedEmail })
      return NextResponse.json({ ok: false, error: 'Invalid email', raw: rawEmail, cleaned: cleanedEmail }, { status: 400 })
    }
    const email = cleanedEmail
    if (!RESEND_KEY) {
      console.error('[marissa-followup] RESEND_API_KEY missing')
      return NextResponse.json({ ok: false, error: 'Email not configured' }, { status: 500 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim()
    const cleanTopic = (topic || 'general').toLowerCase()

    const { greeting, subject, body: emailBody, cta } = templateForTopic(cleanTopic, cleanName)

    const resend = new Resend(RESEND_KEY)

    // Build dark-themed HTML email matching site design
    const ctaHtml = cta ? `<tr><td style="padding:24px 0 0;">
      <a href="${cta.url}" style="display:inline-block;background:#ff6b35;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.01em;">${cta.label} →</a>
    </td></tr>` : ''

    const notesHtml = notes ? `<tr><td style="padding:16px 0 0;">
      <p style="margin:0;font-size:13px;color:#888;border-left:2px solid #ff6b35;padding-left:12px;font-style:italic;">Note from our call: ${notes}</p>
    </td></tr>` : ''

    const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Inter',sans-serif;color:#fff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 24px;">
  <span style="font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#fff;">
    <span style="color:#ff6b35;">[•]</span> Re<span style="color:#ff6b35;">Capture</span>
  </span>
</td></tr>
<tr><td style="padding:0 0 24px;">
  <p style="margin:0 0 16px;font-size:16px;color:#fff;line-height:1.6;">${greeting}</p>
  <div style="font-size:15px;color:#ccc;line-height:1.7;">${emailBody.replace(/\n\n/g, '</p><p style="margin:16px 0;font-size:15px;color:#ccc;line-height:1.7;">').replace(/^/, '<p style="margin:0;">').replace(/$/, '</p>')}</div>
</td></tr>
${ctaHtml}
${notesHtml}
<tr><td style="padding:32px 0 0;border-top:1px solid #222;margin-top:24px;">
  <p style="margin:24px 0 0;font-size:14px;color:#aaa;line-height:1.6;">If you have any questions, just reply to this email — someone will personally check every message.</p>
  <p style="margin:16px 0 0;font-size:13px;color:#888;">— The ReCapture team</p>
  <p style="margin:24px 0 0;color:#555;font-size:11px;letter-spacing:0.05em;">ReCapture · Form abandonment recovery for high-ticket service businesses · Dallas, TX</p>
</td></tr>
</table></td></tr></table>
</body></html>`

    let emailResult
    try {
      emailResult = await resend.emails.send({
        from: 'Marissa at ReCapture <hello@userecapture.com>',
        to: cleanEmail,
        replyTo: 'hello@userecapture.com',
        subject,
        html,
      })
      console.log('[marissa-followup] sent to', cleanEmail, 'topic:', cleanTopic, 'id:', emailResult.data?.id)
    } catch (err) {
      console.error('[marissa-followup] send failed:', err)
      return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 })
    }

    // Log to database (non-blocking — failure here doesn't fail the request)
    try {
      await supabaseAdmin.from('marissa_followups').insert({
        email: cleanEmail,
        name: cleanName || null,
        topic: cleanTopic,
        notes: notes || null,
        call_id: call_id || null,
        caller_phone: caller_phone || null,
        email_id: emailResult.data?.id || null,
        status: 'sent',
      })
    } catch (dbErr) {
      console.error('[marissa-followup] DB log failed:', dbErr)
    }

    // Internal notification to Ash so you know what Marissa is sending
    try {
      await resend.emails.send({
        from: 'Marissa Activity <hello@userecapture.com>',
        to: 'hello@userecapture.com',
        subject: `Marissa sent ${cleanTopic} info to ${cleanEmail}`,
        html: `<div style="font-family:Inter,sans-serif;max-width:600px;background:#0a0a0a;color:#fff;padding:32px;">
<h2 style="color:#ff6b35;margin:0 0 24px;">Marissa Followup Sent</h2>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:8px 0;color:#888;width:120px;">Topic</td><td style="padding:8px 0;color:#fff;">${cleanTopic}</td></tr>
<tr><td style="padding:8px 0;color:#888;">To</td><td style="padding:8px 0;color:#fff;">${cleanEmail}</td></tr>
${cleanName ? `<tr><td style="padding:8px 0;color:#888;">Name</td><td style="padding:8px 0;color:#fff;">${cleanName}</td></tr>` : ''}
${caller_phone ? `<tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;color:#fff;">${caller_phone}</td></tr>` : ''}
${notes ? `<tr><td style="padding:8px 0;color:#888;">Notes</td><td style="padding:8px 0;color:#fff;">${notes}</td></tr>` : ''}
${call_id ? `<tr><td style="padding:8px 0;color:#888;">Call ID</td><td style="padding:8px 0;color:#aaa;font-family:monospace;font-size:12px;">${call_id}</td></tr>` : ''}
</table>
</div>`,
      })
    } catch (notifyErr) {
      console.error('[marissa-followup] internal notify failed:', notifyErr)
    }

    return NextResponse.json({
      ok: true,
      message: `Email sent to ${cleanEmail}`,
      email_id: emailResult.data?.id,
    })
  } catch (err) {
    console.error('[marissa-followup] handler error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
