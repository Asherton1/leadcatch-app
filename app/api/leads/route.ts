import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const api_key = searchParams.get('api_key')
  const status = searchParams.get('status')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 500)

  if (!api_key) {
    return NextResponse.json({ error: 'api_key is required' }, { status: 401 })
  }

  // Validate client
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, name, avg_lead_value')
    .eq('api_key', api_key)
    .single()

  if (clientError || !client) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Build leads query
  let query = supabase
    .from('leads')
    .select('*')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (status) {
    query = query.eq('status', status)
  }

  const { data: leads, error: leadsError } = await query

  if (leadsError) {
    console.error('Leads fetch error:', leadsError)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }

  // Summary stats
  const total_leads = leads.length
  const total_revenue_lost = leads.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0)
  const avg_completion_rate =
    total_leads > 0
      ? Math.round(
          (leads.reduce(
            (sum, l) => sum + (l.total_fields > 0 ? l.fields_completed / l.total_fields : 0),
            0
          ) /
            total_leads) *
            100
        )
      : 0

  return NextResponse.json({
    client: { id: client.id, name: client.name },
    leads,
    stats: {
      total_leads,
      total_revenue_lost,
      avg_completion_rate,
    },
  })
}
