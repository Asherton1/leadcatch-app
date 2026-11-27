import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

// GET /api/conversions/google?c=<client_id>&t=<token>
//
// Serves a Google Ads offline conversion import file for one client.
// The client pastes this URL into their own Google Ads account under
// Goals > Conversions > Uploads > Schedules, and Google fetches it on a
// schedule. No Google Ads API, no developer token, no OAuth.
//
// Google's fetcher sends no headers we control, so the URL itself carries the
// credential: an HMAC over the client id. Unguessable, per client, revocable
// by rotating the secret, and no new table or column needed to store it.

export const dynamic = 'force-dynamic'

// Google will not attribute a conversion to a click older than 90 days, and a
// scheduled import re-fetches the same file repeatedly. A rolling window keeps
// the file small and keeps re-sent rows byte-identical so Google's own
// deduplication (same click id + conversion name + conversion time) collapses
// them instead of double counting.
const WINDOW_DAYS = 30

function sign(clientId: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET || process.env.CRON_SECRET || 'recapture-fallback-secret-change-me'
  return createHmac('sha256', secret).update(`gads:${clientId}`).digest('hex').slice(0, 32)
}

function tokenMatches(clientId: string, provided: string): boolean {
  const expected = sign(clientId)
  if (provided.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}

// Google accepts "yyyy-MM-dd HH:mm:ss" alongside a Parameters:TimeZone line.
// Everything is emitted in UTC: it is unambiguous and has no daylight saving
// transition to get wrong, which is the failure Google's own guidance warns
// about for offset-based time zones.
function formatConversionTime(iso: string): string {
  return new Date(iso).toISOString().slice(0, 19).replace('T', ' ')
}

// A value Google rejects is worse than no value, and a stray quote or comma in
// a conversion action name would shift every column after it.
function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const clientId = url.searchParams.get('c') ?? ''
  const token = url.searchParams.get('t') ?? ''

  if (!clientId || !token || !tokenMatches(clientId, token)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, name, active, google_conversion_action_name')
    .eq('id', clientId)
    .single()

  if (clientError || !client) return new NextResponse('Not found', { status: 404 })

  const conversionName = client.google_conversion_action_name
  if (!conversionName) {
    // Without the exact conversion action name Google rejects every row, so
    // serving an empty file is better than serving rows that all fail.
    return new NextResponse(
      'Parameters:TimeZone=UTC\nGoogle Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n',
      { status: 200, headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store' } }
    )
  }

  const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString()

  // Only abandoned leads carrying a gclid belong in this file.
  //
  // No gclid means the visitor never arrived from a Google ad, so there is no
  // click to attribute a conversion to. And a submitted lead will already have
  // fired the client's own on-site conversion tag, so importing it again would
  // double count the same person. ReCapture's contribution is the abandonment.
  //
  // Disqualified, suppressed and bot-flagged leads are excluded for the same
  // reason the exclusion signals exist: feeding them back teaches the campaign
  // to find more of them.
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('gclid, created_at, estimated_value')
    .eq('client_id', clientId)
    .eq('status', 'abandoned')
    .not('gclid', 'is', null)
    .is('disqualified_at', null)
    .is('suppressed_at', null)
    .not('suspected_bot', 'is', true)
    .gte('created_at', since)
    .order('created_at', { ascending: true })
    .limit(5000)

  if (leadsError) {
    console.error('[gads-csv] lead query failed for client', clientId, leadsError.message)
    return new NextResponse('Temporarily unavailable', { status: 503 })
  }

  const rows = (leads ?? []).map(l =>
    [
      csvCell(l.gclid as string),
      csvCell(conversionName),
      formatConversionTime(l.created_at as string),
      String(Number(l.estimated_value ?? 0)),
      'USD',
    ].join(',')
  )

  const body =
    'Parameters:TimeZone=UTC\n' +
    'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\n' +
    (rows.length ? rows.join('\n') + '\n' : '')

  console.log('[gads-csv] served', rows.length, 'conversions for client', clientId)

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Disposition': 'inline; filename="recapture-conversions.csv"',
    },
  })
}
