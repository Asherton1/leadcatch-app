import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { createHash } from 'crypto'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// Geo lookup via free ipapi service — 30k requests/month free tier
async function lookupGeo(ip: string): Promise<{ country: string | null; city: string | null; region: string | null }> {
  if (!ip || ip === 'unknown') return { country: null, city: null, region: null }
  // Strip IPv6 mapped prefix and localhost
  const cleanIp = ip.replace(/^::ffff:/, '').trim()
  if (cleanIp === '127.0.0.1' || cleanIp === '::1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.')) {
    return { country: null, city: null, region: null }
  }
  try {
    // ip-api.com free tier: 45 req/min, no key required
    const res = await fetch(`https://ipwho.is/${cleanIp}`, {
      signal: AbortSignal.timeout(2500),
    })
    if (!res.ok) return { country: null, city: null, region: null }
    const data = await res.json()
    if (data.success === false) return { country: null, city: null, region: null }
    return {
      country: data.country || null,
      city: data.city || null,
      region: data.region || null,
    }
  } catch (err) {
    console.error('geo lookup failed:', err)
    return { country: null, city: null, region: null }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { api_key, session_id, page_url, referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid, is_active, mark_offline } = body

    if (!api_key || !session_id) {
      return NextResponse.json(
        { error: 'Missing api_key or session_id' },
        { status: 400, headers: corsHeaders }
      )
    }

    const { data: client } = await supabase
      .from('clients')
      .select('id, active, allowed_domains')
      .eq('api_key', api_key)
      .maybeSingle()

    if (!client) {
      return NextResponse.json({ error: 'Invalid api_key' }, { status: 401, headers: corsHeaders })
    }
    if (!client.active) {
      return NextResponse.json({ error: 'Client not active' }, { status: 403, headers: corsHeaders })
    }

    if (client.allowed_domains && page_url) {
      try {
        const url = new URL(page_url)
        const hostname = url.hostname.toLowerCase()
        const allowed = client.allowed_domains.some((d: string) =>
          hostname === d.toLowerCase() || hostname.endsWith('.' + d.toLowerCase())
        )
        if (!allowed) {
          return NextResponse.json({ error: 'Domain not allowed' }, { status: 403, headers: corsHeaders })
        }
      } catch { /* invalid URL — allow through */ }
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const ip_hash = createHash('sha256').update(ip).digest('hex').substring(0, 16)
    const user_agent = (req.headers.get('user-agent') || '').substring(0, 500)

    const { data: existing } = await supabase
      .from('visitors')
      .select('id, country')
      .eq('client_id', client.id)
      .eq('session_id', session_id)
      .maybeSingle()

    if (existing) {
      // If marking offline, backdate last_ping_at so visitor immediately drops out of "live" window
      const update: Record<string, unknown> = {
        page_url: page_url || null,
        is_active: is_active !== false,
      }
      if (mark_offline) {
        console.log('[visitor-ping] MARK_OFFLINE for session:', session_id)
        // Backdate to 60 sec ago so the 45-sec live window excludes them immediately
        update.last_ping_at = new Date(Date.now() - 60 * 1000).toISOString()
        update.is_active = false
      } else {
        update.last_ping_at = new Date().toISOString()
      }
      await supabase.from('visitors').update(update).eq('id', existing.id)
    } else {
      // New visitor — geo lookup + full insert
      const geo = await lookupGeo(ip)
      await supabase.from('visitors').insert({
        client_id: client.id,
        session_id,
        page_url: page_url || null,
        referrer: referrer || null,
        user_agent,
        ip_hash,
        country: geo.country,
        city: geo.city,
        region: geo.region,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
        utm_term: utm_term || null,
        gclid: gclid || null,
        fbclid: fbclid || null,
        is_active: is_active !== false,
      })
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('visitor-ping error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: corsHeaders })
  }
}
