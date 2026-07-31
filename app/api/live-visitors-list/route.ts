import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('client_id')
    if (!clientId) {
      return NextResponse.json({ error: 'Missing client_id' }, { status: 400 })
    }
    const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()
    const { data, error } = await supabase
      .from('visitors')
      .select('id, session_id, page_url, referrer, user_agent, created_at, last_ping_at')
      .eq('client_id', clientId)
      .gte('last_ping_at', twoMinAgo)
      .order('last_ping_at', { ascending: false })
    if (error) {
      console.error('live-visitors-list error:', error)
      return NextResponse.json({ visitors: [] }, { status: 200 })
    }
    return NextResponse.json({ visitors: data || [] })
  } catch (err) {
    console.error('live-visitors-list exception:', err)
    return NextResponse.json({ visitors: [] }, { status: 200 })
  }
}
