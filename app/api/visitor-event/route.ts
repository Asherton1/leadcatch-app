import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

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
    const { api_key, session_id, event_type, page_url, metadata } = body

    if (!api_key || !session_id || !event_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      )
    }

    const { data: client } = await supabase
      .from('clients')
      .select('id, active')
      .eq('api_key', api_key)
      .maybeSingle()

    if (!client || !client.active) {
      return NextResponse.json(
        { error: 'Invalid or inactive client' },
        { status: 401, headers: corsHeaders }
      )
    }

    // Insert the event
    await supabase
      .from('visitor_events')
      .insert({
        client_id: client.id,
        session_id,
        event_type,
        page_url: page_url || null,
        metadata: metadata || null,
      })

    // Side effects based on event type
    if (event_type === 'page_view') {
      // Increment pages_visited on the visitor row
      const { data: visitor } = await supabase
        .from('visitors')
        .select('id, pages_visited')
        .eq('client_id', client.id)
        .eq('session_id', session_id)
        .maybeSingle()

      if (visitor) {
        await supabase
          .from('visitors')
          .update({ pages_visited: (visitor.pages_visited || 1) + 1, page_url: page_url || null })
          .eq('id', visitor.id)
      }
    } else if (event_type === 'form_started') {
      await supabase
        .from('visitors')
        .update({ form_started: true })
        .eq('client_id', client.id)
        .eq('session_id', session_id)
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('visitor-event error:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
