import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendMetaConversion } from '@/lib/ad-conversions'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Marks a lead as junk and tells the ad platforms.
 *
 * Every tool in this category only ever sends positive signal, so the platforms
 * keep optimising toward whatever produced the bad leads as well as the good
 * ones. This sends the same person back with a value of zero and a disqualified
 * flag, so value-based optimisation learns the pattern is worthless.
 */
export async function POST(request: NextRequest) {
  try {
    const { lead_id, reason, undo } = await request.json()
    if (!lead_id) {
      return NextResponse.json({ ok: false, error: 'lead_id required' }, { status: 400 })
    }

    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('id, client_id, email, phone, name, session_id, disqualified_at, exclusion_sent_at')
      .eq('id', lead_id)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 })
    }

    // Undo just clears the flags. We cannot unsend a signal, but we stop
    // counting it and never send it again.
    if (undo) {
      await supabaseAdmin
        .from('leads')
        .update({ disqualified_at: null, disqualified_reason: null })
        .eq('id', lead_id)
      return NextResponse.json({ ok: true, disqualified: false })
    }

    await supabaseAdmin
      .from('leads')
      .update({
        disqualified_at: new Date().toISOString(),
        disqualified_reason: (reason as string) ?? 'marked_by_client',
      })
      .eq('id', lead_id)

    // Only ever send once per lead.
    if (lead.exclusion_sent_at) {
      return NextResponse.json({ ok: true, disqualified: true, signal: 'already_sent' })
    }

    const { data: client } = await supabaseAdmin
      .from('clients')
      .select('meta_capi_enabled, meta_pixel_id, meta_access_token, meta_test_event_code, exclusion_signals_enabled')
      .eq('id', lead.client_id)
      .maybeSingle()

    let sent = false

    if (
      client?.exclusion_signals_enabled !== false &&
      client?.meta_capi_enabled &&
      client?.meta_pixel_id &&
      client?.meta_access_token
    ) {
      try {
        await sendMetaConversion({
          pixelId: client.meta_pixel_id,
          accessToken: client.meta_access_token,
          testEventCode: client.meta_test_event_code,
          leadEmail: lead.email,
          leadPhone: lead.phone,
          leadName: lead.name,
          estimatedValue: 0,
          sessionId: lead.session_id,
          eventName: 'DisqualifiedLead',
        })
        sent = true
      } catch (e) {
        console.error('[exclusion] meta dispatch failed:', e)
      }
    }

    if (sent) {
      await supabaseAdmin
        .from('leads')
        .update({ exclusion_sent_at: new Date().toISOString() })
        .eq('id', lead_id)
    }

    return NextResponse.json({ ok: true, disqualified: true, signal: sent ? 'sent' : 'skipped' })
  } catch (e) {
    console.error('[exclusion] handler error:', e)
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 })
  }
}
