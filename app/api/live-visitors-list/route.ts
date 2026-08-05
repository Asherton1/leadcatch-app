import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

interface JourneyEvent {
  event_type: string
  page_url: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('client_id')
    if (!clientId) {
      return NextResponse.json({ error: 'Missing client_id' }, { status: 400 })
    }

    const twoMinAgo = new Date(Date.now() - 30 * 1000).toISOString()

    const { data: visitors, error } = await supabase
      .from('visitors')
      .select('id, session_id, page_url, referrer, user_agent, country, city, region, utm_source, utm_medium, utm_campaign, pages_visited, form_started, is_active, created_at, last_ping_at')
      .eq('client_id', clientId)
      .gte('last_ping_at', twoMinAgo)
      .order('last_ping_at', { ascending: false })

    if (error || !visitors) {
      return NextResponse.json({ visitors: [] }, { status: 200 })
    }

    if (visitors.length === 0) {
      return NextResponse.json({ visitors: [] })
    }

    // Fetch journey events for all active session_ids in one query
    const sessionIds = visitors.map(v => v.session_id)
    const { data: events } = await supabase
      .from('visitor_events')
      .select('session_id, event_type, page_url, metadata, created_at')
      .in('session_id', sessionIds)
      .eq('client_id', clientId)
      .order('created_at', { ascending: true })

    const eventsBySession: Record<string, JourneyEvent[]> = {}
    if (events) {
      for (const e of events) {
        if (!eventsBySession[e.session_id]) eventsBySession[e.session_id] = []
        eventsBySession[e.session_id].push({
          event_type: e.event_type,
          page_url: e.page_url,
          metadata: e.metadata,
          created_at: e.created_at,
        })
      }
    }

    // Compute intent score for each visitor
    const enriched = visitors.map(v => {
      const journey = eventsBySession[v.session_id] || []
      const timeOnSite = Math.round((new Date(v.last_ping_at).getTime() - new Date(v.created_at).getTime()) / 1000)

      let intent_score = 0
      if (v.form_started) intent_score += 40
      if ((v.pages_visited || 1) >= 3) intent_score += 20
      if ((v.pages_visited || 1) >= 5) intent_score += 15
      if (timeOnSite >= 60) intent_score += 15
      if (timeOnSite >= 180) intent_score += 10

      let intent_label: 'hot' | 'warm' | 'cool' = 'cool'
      if (intent_score >= 60) intent_label = 'hot'
      else if (intent_score >= 30) intent_label = 'warm'

      return {
        ...v,
        journey,
        time_on_site_seconds: timeOnSite,
        intent_score,
        intent_label,
      }
    })

    return NextResponse.json({ visitors: enriched })
  } catch (err) {
    console.error('live-visitors-list exception:', err)
    return NextResponse.json({ visitors: [] }, { status: 200 })
  }
}
