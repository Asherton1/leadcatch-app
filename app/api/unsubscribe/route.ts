import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

function verifyUnsubscribeToken(token: string): string | null {
  const secret = process.env.UNSUBSCRIBE_SECRET || process.env.CRON_SECRET || 'recapture-fallback-secret-change-me'
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [leadId, sig] = parts
  const expected = createHmac('sha256', secret).update(leadId).digest('hex').slice(0, 16)
  if (sig !== expected) return null
  return leadId
}

function htmlPage(title: string, message: string, success: boolean): string {
  const accent = success ? '#22c55e' : '#ef4444'
  const checkIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  const xIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  const icon = success ? checkIcon : xIcon

  return [
    '<!DOCTYPE html>',
    '<html lang="en"><head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<title>' + title + ' \u2014 ReCapture</title>',
    '<style>',
    'body { margin:0; padding:0; background:#0a0a0a; font-family:-apple-system,BlinkMacSystemFont,Inter,Arial,sans-serif; color:#e4e4e7; min-height:100vh; display:flex; align-items:center; justify-content:center; }',
    '.card { max-width:480px; margin:2rem; padding:2.5rem; background:#111; border:1px solid #1f1f1f; border-radius:12px; text-align:center; }',
    '.accent { width:48px; height:48px; margin:0 auto 1.25rem; border-radius:50%; background:' + accent + '1a; display:flex; align-items:center; justify-content:center; }',
    'h1 { margin:0 0 0.75rem; font-size:1.4rem; color:#fff; }',
    'p { margin:0 0 1rem; color:#a1a1aa; line-height:1.65; font-size:0.95rem; }',
    'a { color:#ff6b35; text-decoration:none; font-weight:600; }',
    'a:hover { text-decoration:underline; }',
    '</style></head><body>',
    '<div class="card">',
    '<div class="accent">' + icon + '</div>',
    '<h1>' + title + '</h1>',
    '<p>' + message + '</p>',
    '<p><a href="https://userecapture.com">\u2190 Back to ReCapture</a></p>',
    '</div></body></html>'
  ].join('')
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return new NextResponse(
      htmlPage('Invalid Link', 'This unsubscribe link is missing required information.', false),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const leadId = verifyUnsubscribeToken(token)
  if (!leadId) {
    return new NextResponse(
      htmlPage('Invalid Link', 'This unsubscribe link is invalid or has been tampered with.', false),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('id, email, client_id')
    .eq('id', leadId)
    .single()

  if (leadError || !lead || !lead.email) {
    return new NextResponse(
      htmlPage('Already Removed', 'We could not find your contact information. You may already be unsubscribed.', false),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const cleanEmail = lead.email.toLowerCase().trim()

  const { data: existing } = await supabase
    .from('do_not_contact')
    .select('id')
    .eq('identifier_type', 'email')
    .eq('identifier_value', cleanEmail)
    .limit(1)

  if (existing && existing.length > 0) {
    return new NextResponse(
      htmlPage(
        "You're Already Unsubscribed",
        'The email address ' + cleanEmail + ' has already been removed from our recovery email list. You will not receive further messages.',
        true
      ),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const { error: insertError } = await supabase
    .from('do_not_contact')
    .insert({
      client_id: lead.client_id,
      identifier_type: 'email',
      identifier_value: cleanEmail,
      source: 'email_unsubscribe',
      notes: 'Unsubscribed via email link, lead_id=' + leadId,
    })

  if (insertError) {
    console.error('Unsubscribe insert error:', insertError)
    return new NextResponse(
      htmlPage(
        'Something Went Wrong',
        'We could not process your unsubscribe request. Please email support@userecapture.com to be removed manually.',
        false
      ),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new NextResponse(
    htmlPage(
      "You've Been Unsubscribed",
      'The email address ' + cleanEmail + ' has been removed from our recovery email list. You will not receive further messages.',
      true
    ),
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}
