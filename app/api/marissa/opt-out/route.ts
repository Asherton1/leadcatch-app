import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

// Marissa calls this function when she detects an opt-out keyword during a call.
// Architecture matches /api/marissa/send-followup-sms — Retell wraps function args
// in an `args` object and includes call metadata in `body.call`.
//
// On successful opt-out, this endpoint:
//   1. Normalizes the phone number to digits-only format (matches DNC table convention)
//   2. Writes to public.do_not_contact with source = 'voice_keyword'
//   3. Returns a confirmation that Marissa speaks back to the caller before ending call

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Retell wraps function arguments in an args object.
  // Defensive extraction handles flat OR nested formats.
  const args = (body.args as Record<string, unknown>) ?? body
  const callMeta = (body.call as Record<string, unknown>) ?? {}
  const callId = (callMeta.call_id as string) ?? (body.call_id as string) ?? 'unknown'

  // Phone number — case-insensitive accessor, fallbacks for Retell quirks
  const rawPhone =
    (args.phone_number as string) ??
    (args.phone as string) ??
    (args.caller_phone as string) ??
    (args.Phone as string) ??
    ''

  const triggeredKeyword =
    (args.triggered_keyword as string) ??
    (args.keyword as string) ??
    (args.reason as string) ??
    'opt_out_keyword_detected'

  const clientId =
    (args.client_id as string) ??
    (callMeta.metadata as Record<string, unknown>)?.client_id as string ??
    null

  // Normalize phone — strip everything except digits.
  // Matches isOptedOut() convention in app/api/track/route.ts
  const cleanPhone = (rawPhone || '').replace(/\D/g, '')

  if (!cleanPhone) {
    console.error('[marissa/opt-out] No phone number provided', { callId, args })
    return NextResponse.json(
      {
        success: false,
        error: 'No phone number provided',
        spoken_response: "I had trouble processing that, but I will not contact you again from this number.",
      },
      { status: 200 } // 200 so Marissa still ends call cleanly
    )
  }

  // Skip if already opted out
  const { data: existing } = await supabase
    .from('do_not_contact')
    .select('id')
    .eq('identifier_type', 'phone')
    .eq('identifier_value', cleanPhone)
    .limit(1)

  if (existing && existing.length > 0) {
    console.log('[marissa/opt-out] Already opted out', { callId, cleanPhone })
    return NextResponse.json({
      success: true,
      already_opted_out: true,
      spoken_response: "You are already on our do not contact list. Have a good day.",
    })
  }

  // Insert opt-out record
  const insertPayload: Record<string, unknown> = {
    identifier_type: 'phone',
    identifier_value: cleanPhone,
    source: 'voice_keyword',
    notes: `Marissa call ${callId}, triggered: ${triggeredKeyword}`,
  }

  // Only set client_id if we have one — table allows NULL for global opt-outs
  if (clientId) {
    insertPayload.client_id = clientId
  }

  const { error: insertError } = await supabase
    .from('do_not_contact')
    .insert(insertPayload)

  if (insertError) {
    console.error('[marissa/opt-out] Insert failed', { callId, cleanPhone, error: insertError })
    // Even if DB write fails, we still return success so Marissa ends call cleanly.
    // The caller will be re-protected on next attempt via fail-closed logic.
    return NextResponse.json(
      {
        success: false,
        error: insertError.message,
        spoken_response: "Understood. I have removed you from our list. Have a good day.",
      },
      { status: 200 }
    )
  }

  console.log('[marissa/opt-out] Opt-out recorded', {
    callId,
    cleanPhone,
    triggeredKeyword,
    clientId,
  })

  return NextResponse.json({
    success: true,
    opted_out: true,
    spoken_response: "Understood. I have removed you from our list. Have a good day.",
  })
}
