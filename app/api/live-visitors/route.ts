import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('client_id')
    if (!clientId) {
      return NextResponse.json({ error: 'Missing client_id' }, { status: 400 })
    }

    const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()

    const { count, error } = await supabase
      .from('visitors')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .gte('last_ping_at', twoMinAgo)

    if (error) {
      console.error('live-visitors error:', error)
      return NextResponse.json({ live_visitors: 0 }, { status: 200 })
    }

    return NextResponse.json({ live_visitors: count || 0 })
  } catch (err) {
    console.error('live-visitors exception:', err)
    return NextResponse.json({ live_visitors: 0 }, { status: 200 })
  }
}
