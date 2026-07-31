import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { createHash } from 'crypto'

// CORS headers for cross-origin visitor beacons
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { api_key, session_id, page_url, referrer } = body

    if (!api_key || !session_id) {
      return NextResponse.json(
        { error: 'Missing api_key or session_id' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Look up client by api_key
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id, active, allowed_domains')
      .eq('api_key', api_key)
      .maybeSingle()

    if (clientError || !client) {
      return NextResponse.json(
        { error: 'Invalid api_key' },
        { status: 401, headers: corsHeaders }
      )
    }

    if (!client.active) {
      return NextResponse.json(
        { error: 'Client not active' },
        { status: 403, headers: corsHeaders }
      )
    }

    // Optional: domain validation
    if (client.allowed_domains && page_url) {
      try {
        const url = new URL(page_url)
        const hostname = url.hostname.toLowerCase()
        const allowed = client.allowed_domains.some((d: string) =>
          hostname === d.toLowerCase() || hostname.endsWith('.' + d.toLowerCase())
        )
        if (!allowed) {
          return NextResponse.json(
            { error: 'Domain not allowed' },
            { status: 403, headers: corsHeaders }
          )
        }
      } catch { /* invalid URL — allow through */ }
    }

    // Hash IP for privacy (never store raw IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const ip_hash = createHash('sha256').update(ip).digest('hex').substring(0, 16)
    const user_agent = (req.headers.get('user-agent') || '').substring(0, 500)

    // Upsert: if session already exists, update last_ping_at
    const { data: existing } = await supabase
      .from('visitors')
      .select('id')
      .eq('client_id', client.id)
      .eq('session_id', session_id)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('visitors')
        .update({
          last_ping_at: new Date().toISOString(),
          page_url: page_url || null,
        })
        .eq('id', existing.id)
    } else {
      await supabase
        .from('visitors')
        .insert({
          client_id: client.id,
          session_id,
          page_url: page_url || null,
          referrer: referrer || null,
          user_agent,
          ip_hash,
        })
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('visitor-ping error:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
