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
      subject: 'Your ReCapture pricing, as promised',
      body: `Thanks for calling earlier. Here is the breakdown.

<strong>Pro &mdash; $397/month</strong>
One website. Every form and page included. Captured inquiries scored by intent, campaign attribution, automated recovery, SMS and Slack alerts, and conversion signals sent back to Meta and Google.

<strong>Group &mdash; $897/month</strong>
Two to four locations, with one rolled-up dashboard across every site plus per-location reporting.

<strong>Multi-location</strong>
$1,997 for five to eight locations, $3,997 for nine to sixteen, $6,997 for seventeen to thirty. Beyond that we price it to your setup.

Every plan starts with a seven day free trial and you can cancel any time.`,
      cta: { label: 'Start your 7-day free trial', url: 'https://www.userecapture.com/start-trial' },
    },
    trial: {
      subject: 'Your 7-day free trial, ready when you are',
      body: `Thanks for calling earlier. Here is your trial link.

Setup is one line of JavaScript on your site, the same way you would add Google Analytics. It covers every form you have, and you will start seeing captured inquiries in the dashboard as soon as people use them.

During the trial you get everything on the Pro plan: intent scoring on each inquiry, campaign attribution so you can see which channel produced them, automated recovery emails under your own branding, SMS and Slack alerts, and conversion signals going back to Meta and Google.

Nothing changes about how your forms work or where your submitted leads go.`,
      cta: { label: 'Start your 7-day free trial', url: 'https://www.userecapture.com/start-trial' },
    },
    enterprise: {
      subject: 'Multi-location pricing and next steps',
      body: `Thanks for calling earlier. Here is the overview for multi-location setups.

Pricing runs by number of locations: $897 for two to four, $1,997 for five to eight, $3,997 for nine to sixteen, and $6,997 for seventeen to thirty. Past thirty we price it to your setup.

Every multi-location plan includes one rolled-up dashboard across all your sites, reporting broken out per location, custom-branded recovery emails for each site, and a BAA where you need one.

Reply to this email if you want to walk through your specific setup and I will get back to you personally.`,
      cta: { label: 'Review the plans', url: 'https://www.userecapture.com/enterprise' },
    },
    form_audit: {
      subject: 'Your free form audit',
      body: `Thanks for calling earlier. Here is the link to the free form audit.

We look at your forms and send back a written report covering field count, how they behave on mobile, where the tracking has gaps, and where people are most likely dropping out before they submit.

Free, no card, no obligation.`,
      cta: { label: 'Request your free form audit', url: 'https://www.userecapture.com/form-audit' },
    },
    general: {
      subject: 'ReCapture, info as promised',
      body: `Thanks for calling earlier. Here is the overview.

When somebody starts filling in a form on your site and leaves without pressing submit, that inquiry disappears. Your CRM never sees it, your analytics never sees it, and nobody follows up because nobody knows it happened. Baymard Institute puts form abandonment at 60 to 70 percent.

ReCapture captures the contact details they already entered, scores each one by how far they got, and shows them in a dashboard alongside the inquiries that did come through. From there you can follow up yourself or let automated recovery handle it.

It also traces every captured inquiry back to the campaign that produced it, and sends those inquiries to Meta and Google as conversion events so your advertising is optimising on real demand rather than a fraction of it.

Setup is one line of code and nothing changes about how your forms work.`,
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
    <span style="color:#ff6b35;font-weight:800;padding-right:4px;">+</span>Re<span style="color:#ff6b35;">Capture</span>
  </span>
</td></tr>
<tr><td style="padding:0 0 24px;">
  <p style="margin:0 0 16px;font-size:16px;color:#fff;line-height:1.6;">${greeting}</p>
  <div style="font-size:15px;color:#ccc;line-height:1.7;">${emailBody.replace(/\n\n/g, '</p><p style="margin:16px 0;font-size:15px;color:#ccc;line-height:1.7;">').replace(/^/, '<p style="margin:0;">').replace(/$/, '</p>')}</div>
</td></tr>
${ctaHtml}
${notesHtml}
<tr><td style="padding:28px 0 0 0;border-top:1px solid #1a1a1a;">
  <p style="margin:0 0 28px 0;font-size:14px;color:#aaa;line-height:1.6;">If you have any questions, just reply to this email — someone will personally check every message.</p>
<p style="margin:0 0 18px 0;font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#ffffff;line-height:1;"><span style="color:#ff6b35;font-weight:800;padding-right:3px;">+</span>Re<span style="color:#ff6b35;">Capture</span></p>
<p style="margin:0 0 2px 0;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;line-height:1.4;">Marissa</p>
<p style="margin:0 0 2px 0;font-size:13px;color:#888888;line-height:1.5;">ReCapture Concierge</p>
<p style="margin:0 0 14px 0;font-size:13px;color:#888888;line-height:1.5;">Every prospect that almost got away. Brought back.</p>
<p style="margin:0;font-size:12px;color:#666666;line-height:1.6;"><a href="tel:+18886060630" style="color:#666666;text-decoration:none;">(888) 606-0630</a> <span style="color:#444444;">&middot;</span> <a href="mailto:hello@userecapture.com" style="color:#666666;text-decoration:none;">hello@userecapture.com</a> <span style="color:#444444;">&middot;</span> <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none;">userecapture.com</a></p>
  <p style="margin:24px 0 0;color:#555;font-size:11px;letter-spacing:0.05em;">ReCapture · The recovery layer for high-ticket service businesses · Dallas, TX</p>
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
