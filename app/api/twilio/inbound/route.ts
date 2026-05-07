import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

// Twilio sends inbound SMS as application/x-www-form-urlencoded.
// We parse it, check for opt-out keywords, persist to do_not_contact,
// and return an empty TwiML response (Twilio toll-free numbers auto-handle
// the user-facing confirmation reply at the carrier level).
//
// Webhook URL to configure in Twilio dashboard:
//   https://userecapture.com/api/twilio/inbound  (POST)

const OPT_OUT_KEYWORDS = [
  'STOP',
  'STOPALL',
  'UNSUBSCRIBE',
  'CANCEL',
  'END',
  'QUIT',
]

function isOptOutMessage(body: string): { match: boolean; keyword: string | null } {
  if (!body) return { match: false, keyword: null }
  const cleaned = body.trim().toUpperCase()

  // Exact match (most common — single word reply)
  if (OPT_OUT_KEYWORDS.includes(cleaned)) {
    return { match: true, keyword: cleaned }
  }

  // Word-boundary match for short phrases like "STOP messages" or "PLEASE STOP"
  for (const keyword of OPT_OUT_KEYWORDS) {
    const pattern = new RegExp(`\\b${keyword}\\b`, 'i')
    if (pattern.test(body)) {
      return { match: true, keyword }
    }
  }

  return { match: false, keyword: null }
}

function emptyTwimlResponse(): NextResponse {
  // Returns valid empty TwiML. Twilio's toll-free auto-handler sends the
  // standard opt-out reply on its own; we do not double-up.
  const xml = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  })
}

export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (err) {
    console.error('[twilio/inbound] Failed to parse form data:', err)
    return emptyTwimlResponse()
  }

  const fromRaw = (formData.get('From') as string) ?? ''
  const body = (formData.get('Body') as string) ?? ''
  const messageSid = (formData.get('MessageSid') as string) ?? 'unknown'

  console.log('[twilio/inbound] Received', { from: fromRaw, body: body.slice(0, 100), messageSid })

  // Normalize phone — strip non-digits to match DNC table convention
  const cleanPhone = fromRaw.replace(/\D/g, '')
  if (!cleanPhone) {
    console.warn('[twilio/inbound] No phone number in From field')
    return emptyTwimlResponse()
  }

  const optOutCheck = isOptOutMessage(body)

  if (!optOutCheck.match) {
    // Not an opt-out message. Log and exit silently.
    // (Future: write to inbound_sms_log table for client dashboard.)
    console.log('[twilio/inbound] No opt-out keyword detected', { cleanPhone })
    return emptyTwimlResponse()
  }

  // Check if already opted out
  const { data: existing } = await supabase
    .from('do_not_contact')
    .select('id')
    .eq('identifier_type', 'phone')
    .eq('identifier_value', cleanPhone)
    .limit(1)

  if (existing && existing.length > 0) {
    console.log('[twilio/inbound] Phone already opted out', { cleanPhone })
    return emptyTwimlResponse()
  }

  // Insert opt-out record
  const { error: insertError } = await supabase
    .from('do_not_contact')
    .insert({
      identifier_type: 'phone',
      identifier_value: cleanPhone,
      source: 'sms_stop',
      notes: `Inbound SMS opt-out, message_sid=${messageSid}, keyword=${optOutCheck.keyword}, body=${body.slice(0, 200)}`,
    })

  if (insertError) {
    console.error('[twilio/inbound] DNC insert failed', { cleanPhone, error: insertError })
    // Even on DB failure we return empty TwiML so Twilio does not retry.
    // The carrier-level opt-out still applies via toll-free auto-handler.
    return emptyTwimlResponse()
  }

  console.log('[twilio/inbound] SMS opt-out recorded', {
    cleanPhone,
    keyword: optOutCheck.keyword,
    messageSid,
  })

  return emptyTwimlResponse()
}

// Twilio sometimes sends a GET request to verify the webhook URL.
// Return 200 OK so the URL passes Twilio validation.
export async function GET() {
  return new NextResponse('OK', { status: 200 })
}
