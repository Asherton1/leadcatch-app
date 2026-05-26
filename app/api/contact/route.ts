import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_KEY = process.env.RESEND_API_KEY!
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL!

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const VALID_INQUIRY_TYPES = ['sales', 'demo', 'partnership', 'support', 'other']

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const company = String(body.company || '').trim()
  const phone = String(body.phone || '').trim()
  const rawType = String(body.inquiryType || 'other').trim().toLowerCase()
  const inquiryType = VALID_INQUIRY_TYPES.includes(rawType) ? rawType : 'other'
  const message = String(body.message || '').trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Message too short — please add more detail' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message too long — please keep under 5000 characters' }, { status: 400 })
  }

  // Insert into DB - don't fail the entire request if this fails, since
  // Slack + email still get the data through.
  const { error: dbError } = await supabase.from('contact_inquiries').insert({
    name,
    email,
    company: company || null,
    phone: phone || null,
    inquiry_type: inquiryType,
    message,
    source: 'web',
    status: 'new',
  })

  if (dbError) {
    console.error('Contact DB insert failed:', dbError)
  }

  // Slack alert - fire and forget
  try {
    await fetch(SLACK_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'New contact form submission from ' + name,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*New Contact Inquiry*\n\n' +
                    '*Name:* ' + name + '\n' +
                    '*Email:* ' + email + '\n' +
                    (company ? '*Company:* ' + company + '\n' : '') +
                    (phone ? '*Phone:* ' + phone + '\n' : '') +
                    '*Type:* ' + inquiryType + '\n\n' +
                    '*Message:*\n' + message
            }
          }
        ]
      })
    })
  } catch (e) {
    console.error('Slack alert failed:', e)
  }

  // Auto-reply to submitter via Resend
  const submitterHTML = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Helvetica Neue\', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #0a0a0a; line-height: 1.6;">' +
    '<p style="font-size: 16px; margin: 0 0 24px;">Hi ' + name + ',</p>' +
    '<p style="font-size: 16px; margin: 0 0 24px;">Got your message &mdash; appreciate you reaching out. I&rsquo;ll personally review it and get back to you within 24 hours.</p>' +
    '<p style="font-size: 16px; margin: 0 0 24px;">If it&rsquo;s urgent, you can also reach us directly:</p>' +
    '<p style="font-size: 16px; margin: 0 0 24px;">' +
      '<strong>Concierge:</strong> (888) 606-0630<br />' +
      '<strong>Email:</strong> hello@userecapture.com' +
    '</p>' +
    '<p style="font-size: 16px; margin: 24px 0 4px;">&mdash; Asherton Chraibi<br />Founder, ReCapture</p>' +
    '<p style="font-size: 13px; color: #666; margin: 32px 0 0;">' +
      '<a href="https://www.userecapture.com" style="color: #ff6b35; text-decoration: none;">www.userecapture.com</a>' +
    '</p>' +
  '</div>'

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + RESEND_KEY,
      },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: email,
        subject: 'Got your message — ReCapture',
        html: submitterHTML,
      }),
    })
  } catch (e) {
    console.error('Auto-reply failed:', e)
  }

  // Notification to Ash via Resend
  const notifyHTML = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Helvetica Neue\', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0a0a0a;">' +
    '<h2 style="margin: 0 0 16px; font-size: 20px;">New Contact Inquiry</h2>' +
    '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
      '<tr><td style="padding: 6px 0; color: #666; width: 100px;">Name:</td><td>' + name + '</td></tr>' +
      '<tr><td style="padding: 6px 0; color: #666;">Email:</td><td><a href="mailto:' + email + '" style="color: #ff6b35;">' + email + '</a></td></tr>' +
      (company ? '<tr><td style="padding: 6px 0; color: #666;">Company:</td><td>' + company + '</td></tr>' : '') +
      (phone ? '<tr><td style="padding: 6px 0; color: #666;">Phone:</td><td>' + phone + '</td></tr>' : '') +
      '<tr><td style="padding: 6px 0; color: #666;">Type:</td><td>' + inquiryType + '</td></tr>' +
    '</table>' +
    '<div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-left: 3px solid #ff6b35;">' +
      '<div style="font-size: 12px; color: #666; margin-bottom: 8px; letter-spacing: 0.08em;">MESSAGE</div>' +
      '<div style="font-size: 15px; line-height: 1.6; white-space: pre-wrap;">' + message + '</div>' +
    '</div>' +
    (dbError ? '<p style="margin-top: 16px; color: #cc0000; font-size: 13px;">[ERROR] DB insert failed: ' + dbError.message + '</p>' : '') +
  '</div>'

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + RESEND_KEY,
      },
      body: JSON.stringify({
        from: 'ReCapture <hello@userecapture.com>',
        to: 'hello@userecapture.com',
        subject: 'New Contact Inquiry — ' + name + (company ? ' (' + company + ')' : ''),
        html: notifyHTML,
      }),
    })
  } catch (e) {
    console.error('Notification email failed:', e)
  }

  return NextResponse.json({ success: true })
}
