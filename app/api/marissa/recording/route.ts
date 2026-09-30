import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

/**
 * Returns the recording URL for the call behind a short link, if Retell has one.
 * Keyed on the link token rather than the call id, so nothing internal is exposed.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ ok: false }, { status: 400 })

  const { data: link } = await supabaseAdmin
    .from('marissa_followup_links')
    .select('call_id')
    .eq('token', token)
    .maybeSingle()

  if (!link?.call_id) return NextResponse.json({ ok: false, reason: 'no_call' })

  const key = process.env.RETELL_API_KEY
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' })

  try {
    const res = await fetch(`https://api.retellai.com/v2/get-call/${link.call_id}`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return NextResponse.json({ ok: false, reason: 'lookup_failed' })

    const call = await res.json()
    return NextResponse.json({
      ok: true,
      recordingUrl: call.recording_url ?? null,
      durationMs: call.duration_ms ?? null,
    })
  } catch (e) {
    console.error('[recording] lookup failed:', e)
    return NextResponse.json({ ok: false, reason: 'error' })
  }
}
