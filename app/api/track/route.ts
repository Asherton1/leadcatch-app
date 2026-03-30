import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Handle CORS preflight from tracking script on client sites
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    api_key,
    session_id,
    name,
    email,
    phone,
    fields_completed,
    total_fields,
    time_on_form,
    device_type,
    form_data,
  } = body as Record<string, unknown>

  if (!api_key || !session_id) {
    return NextResponse.json({ error: 'api_key and session_id are required' }, { status: 400 })
  }

  // Validate client by api_key
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, avg_lead_value, active')
    .eq('api_key', api_key)
    .single()

  if (clientError) {
    // PGRST116 = no rows found → bad API key. Anything else is a real DB error.
    if (clientError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    console.error('Client lookup error:', clientError)
    return NextResponse.json(
      { error: 'Database error during client lookup', detail: clientError.message },
      { status: 500 }
    )
  }

  if (!client.active) {
    return NextResponse.json({ error: 'Account inactive' }, { status: 403 })
  }

  const estimated_value = client.avg_lead_value ?? 0

  // Coerce numeric fields — JSON body values may arrive as strings
  const payload = {
    client_id: client.id,
    session_id,
    name: name ?? null,
    email: email ?? null,
    phone: phone ?? null,
    fields_completed: Number(fields_completed ?? 0),
    total_fields: Number(total_fields ?? 0),
    time_on_form: Number(time_on_form ?? 0),
    device_type: device_type ?? null,
    estimated_value,
    status: 'abandoned',
    form_data: form_data ?? null,
  }

  // Upsert lead — same session updates the existing row.
  // Requires a UNIQUE constraint on leads.session_id in Supabase.
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .upsert(payload, { onConflict: 'session_id' })
    .select('id')
    .single()

  if (leadError) {
    console.error('Lead upsert error:', {
      message: leadError.message,
      code: leadError.code,
      details: leadError.details,
      hint: leadError.hint,
      payload,
    })
    return NextResponse.json(
      {
        error: 'Failed to store lead',
        detail: leadError.message,
        code: leadError.code,
        hint: leadError.hint,
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, lead_id: lead.id },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}
