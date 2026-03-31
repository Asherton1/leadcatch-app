import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmailForLead } from '@/lib/email'

// POST /api/send-recovery
// Body: { lead_id: string, api_key: string }
// Validates that the api_key owns the lead before sending.
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { lead_id, api_key } = body as Record<string, string>

  if (!lead_id || !api_key) {
    return NextResponse.json({ error: 'lead_id and api_key are required' }, { status: 400 })
  }

  // Verify the api_key owns this lead
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('api_key', api_key)
    .single()

  if (clientError?.code === 'PGRST116' || !client) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }
  if (clientError) {
    return NextResponse.json({ error: 'Database error', detail: clientError.message }, { status: 500 })
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('client_id')
    .eq('id', lead_id)
    .single()

  if (leadError?.code === 'PGRST116' || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }
  if (lead.client_id !== client.id) {
    return NextResponse.json({ error: 'Lead does not belong to this client' }, { status: 403 })
  }

  const result = await sendEmailForLead(lead_id)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
  if (result.skipped) {
    return NextResponse.json({ success: true, skipped: true, message: 'Recovery email already sent for this lead' })
  }

  return NextResponse.json({ success: true, id: result.id })
}
