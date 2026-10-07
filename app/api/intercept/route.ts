import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

const ALLOWED = ['shown', 'engaged', 'dismissed']

/**
 * Records what Predict and Intercept did on a page. Three events per session
 * at most: shown, then either engaged or dismissed. This exists so the feature
 * can be proven to help rather than assumed to, since unlike everything else
 * we ship it can make a client's conversion worse.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      api_key, session_id, visitor_session_id, event,
      trigger_reason, field_at, fields_completed, device_type, page_url,
    } = body ?? {}

    if (!api_key || !event) {
      return NextResponse.json({ error: 'Missing api_key or event' }, { status: 400, headers: corsHeaders })
    }
    if (!ALLOWED.includes(String(event))) {
      return NextResponse.json({ error: 'Unknown event' }, { status: 400, headers: corsHeaders })
    }

    const { data: client } = await supabaseAdmin
      .from('clients')
      .select('id, active, predict_enabled')
      .eq('api_key', api_key)
      .maybeSingle()

    if (!client || !client.active) {
      return NextResponse.json({ error: 'Invalid api_key' }, { status: 401, headers: corsHeaders })
    }
    // Belt and braces: if the toggle is off, we do not store events for it.
    if (!client.predict_enabled) {
      return NextResponse.json({ ok: true, ignored: true }, { headers: corsHeaders })
    }

    const { error } = await supabaseAdmin.from('intercept_events').insert({
      client_id: client.id,
      session_id: session_id ?? null,
      visitor_session_id: visitor_session_id ?? null,
      event: String(event),
      trigger_reason: trigger_reason ? String(trigger_reason).slice(0, 40) : null,
      field_at: field_at ? String(field_at).slice(0, 120) : null,
      fields_completed: Number.isFinite(Number(fields_completed)) ? Number(fields_completed) : null,
      device_type: device_type ? String(device_type).slice(0, 20) : null,
      page_url: page_url ? String(page_url).slice(0, 500) : null,
    })

    if (error) {
      console.error('[intercept] insert failed:', error)
      return NextResponse.json({ error: 'Insert failed' }, { status: 500, headers: corsHeaders })
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('[intercept] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: corsHeaders })
  }
}
