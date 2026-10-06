import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Response Guard.
 *
 * ReCapture already alerts the moment a good lead abandons. The failure after
 * that is human: the alert scrolls up the channel and a hot inquiry sits for
 * days. This escalates when nobody has marked the lead contacted.
 *
 * The clock only runs during the client's own call hours, so a lead captured at
 * eleven at night is not thirty minutes overdue by half past.
 */

const LEVELS = [
  { level: 1, afterMin: 5 },
  { level: 2, afterMin: 15 },
  { level: 3, afterMin: 30 },
]

function minutesOpenSince(
  startedISO: string,
  now: Date,
  openHour: number,
  closeHour: number,
  tz: string
): number {
  // Count only the minutes that fell inside the client's working window.
  const start = new Date(startedISO)
  let open = 0
  const cursor = new Date(start)
  while (cursor < now) {
    const hour = Number(
      new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false })
        .format(cursor)
    )
    if (hour >= openHour && hour < closeHour) open += 1
    cursor.setMinutes(cursor.getMinutes() + 1)
    if (open > 600) break // a full working day is enough, stop counting
  }
  return open
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const cutoff = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, client_id, name, email, phone, estimated_value, status, guard_started_at, guard_level, guard_cleared_at')
    .not('guard_started_at', 'is', null)
    .is('guard_cleared_at', null)
    .gte('guard_started_at', cutoff)
    .lt('guard_level', 3)
    .limit(200)

  if (error) {
    console.error('[guard] query failed:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  if (!leads?.length) return NextResponse.json({ ok: true, checked: 0 })

  // Clear anything that has since been handled.
  const handled = leads.filter(l => l.status === 'contacted' || l.status === 'converted')
  if (handled.length) {
    await supabase
      .from('leads')
      .update({ guard_cleared_at: now.toISOString() })
      .in('id', handled.map(l => l.id))
  }

  const open = leads.filter(l => l.status !== 'contacted' && l.status !== 'converted')
  const byClient = new Map<string, typeof open>()
  open.forEach(l => {
    const arr = byClient.get(l.client_id) ?? []
    arr.push(l)
    byClient.set(l.client_id, arr)
  })

  let escalated = 0

  for (const [clientId, clientLeads] of byClient) {
    const { data: client } = await supabase
      .from('clients')
      .select('id, name, company_name, sms_enabled, sms_phone, email_alert_address, timezone, ai_call_hours_start, ai_call_hours_end, response_guard_enabled')
      .eq('id', clientId)
      .maybeSingle()

    if (!client || client.response_guard_enabled === false) continue

    const tz = client.timezone ?? 'America/Chicago'
    const openHour = Number(client.ai_call_hours_start ?? 8)
    const closeHour = Number(client.ai_call_hours_end ?? 18)

    for (const lead of clientLeads) {
      const mins = minutesOpenSince(lead.guard_started_at!, now, openHour, closeHour, tz)
      const due = LEVELS.filter(L => mins >= L.afterMin && L.level > (lead.guard_level ?? 0))
      if (!due.length) continue

      const step = due[due.length - 1]
      const who = lead.name || lead.email || lead.phone || 'An inquiry'
      const worth = lead.estimated_value
        ? ` worth about $${Number(lead.estimated_value).toLocaleString()}`
        : ''

      const body =
        step.level === 1
          ? `Still waiting: ${who}${worth} came in ${mins} minutes ago and nobody has picked it up yet.`
          : step.level === 2
          ? `${who}${worth} has been sitting for ${mins} minutes. Speed matters more than anything else here.`
          : `${who}${worth} has gone ${mins} minutes with no contact. This one is going cold.`

      // sendSmsAlert builds its own message from the new-lead template, so the
      // escalation sends directly instead.
      if (client.sms_enabled && client.sms_phone) {
        const sid = process.env.TWILIO_ACCOUNT_SID
        const token = process.env.TWILIO_AUTH_TOKEN
        const from = process.env.TWILIO_PHONE_NUMBER
        if (sid && token && from) {
          try {
            const res = await fetch(
              `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
              {
                method: 'POST',
                headers: {
                  Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ From: from, To: client.sms_phone, Body: body }),
              }
            )
            if (!res.ok) {
              console.error('[guard] sms failed:', res.status, (await res.text()).slice(0, 200))
            }
          } catch (e) {
            console.error('[guard] sms exception:', e)
          }
        }
      }

      await supabase
        .from('leads')
        .update({ guard_level: step.level, guard_escalated_at: now.toISOString() })
        .eq('id', lead.id)

      escalated += 1
    }
  }

  return NextResponse.json({ ok: true, checked: leads.length, escalated })
}
