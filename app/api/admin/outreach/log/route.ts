import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const CRON_SECRET = process.env.CRON_SECRET ?? ''
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

const EVENT_TO_STATUS: Record<string, string> = {
  'audit_submitted': 'audit_sent',
  'cold_email_sent': 'email_sent',
  'replied': 'replied',
  'unsubscribed': 'unsubscribed',
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const prospect = body.prospect as Record<string, unknown> | undefined
  const event = body.event as Record<string, unknown> | undefined
  if (!prospect?.email || !event?.event_type) {
    return NextResponse.json({ error: 'prospect.email and event.event_type required' }, { status: 400 })
  }

  const eventType = String(event.event_type)
  const supabaseHeaders = {
    'apikey': SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  }

  try {
    const status = EVENT_TO_STATUS[eventType]
    const upsertData: Record<string, unknown> = { email: prospect.email }
    if (prospect.first_name) upsertData.first_name = prospect.first_name
    if (prospect.company) upsertData.company = prospect.company
    if (prospect.domain) upsertData.domain = prospect.domain
    if (prospect.vertical) upsertData.vertical = prospect.vertical
    if (status) upsertData.status = status

    const upsertRes = await fetch(
      `${SUPABASE_URL}/rest/v1/outreach_prospects?on_conflict=email`,
      {
        method: 'POST',
        headers: { ...supabaseHeaders, 'Prefer': 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(upsertData),
      }
    )

    if (!upsertRes.ok) {
      const errBody = await upsertRes.text()
      console.error('[outreach/log] upsert error:', errBody)
      return NextResponse.json({ error: 'Upsert failed: ' + errBody.slice(0, 200) }, { status: 500 })
    }

    const prospectArr = await upsertRes.json()
    const prospectRow = Array.isArray(prospectArr) ? prospectArr[0] : prospectArr
    const prospectId = prospectRow?.id
    if (!prospectId) {
      return NextResponse.json({ error: 'No prospect ID returned' }, { status: 500 })
    }

    const eventRes = await fetch(
      `${SUPABASE_URL}/rest/v1/outreach_events`,
      {
        method: 'POST',
        headers: { ...supabaseHeaders, 'Prefer': 'return=representation' },
        body: JSON.stringify({
          prospect_id: prospectId,
          event_type: eventType,
          metadata: event.metadata ?? {},
        }),
      }
    )

    if (!eventRes.ok) {
      const errBody = await eventRes.text()
      console.error('[outreach/log] event insert error:', errBody)
      return NextResponse.json({ error: 'Event insert failed: ' + errBody.slice(0, 200) }, { status: 500 })
    }

    const eventArr = await eventRes.json()
    const eventRow = Array.isArray(eventArr) ? eventArr[0] : eventArr
    const eventId = eventRow?.id

    return NextResponse.json({
      success: true,
      prospect_id: prospectId,
      event_id: eventId,
    })
  } catch (err) {
    console.error('[outreach/log] error:', err)
    return NextResponse.json({ error: 'Log failed' }, { status: 500 })
  }
}
