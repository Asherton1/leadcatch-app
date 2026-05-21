import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

interface SupabaseUser {
  id?: string
  email?: string
  [key: string]: unknown
}

interface ClientRow {
  is_admin?: boolean
}

/**
 * Mirrors lib/use-is-admin.ts:
 *   1. Get user from session token
 *   2. Look up clients table by email
 *   3. Require is_admin = true
 */
async function validateAdminToken(token: string): Promise<{ ok: boolean; email?: string; reason?: string }> {
  if (!token) return { ok: false, reason: 'missing token' }

  // Step 1: validate session token, get user
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  })
  if (!userRes.ok) return { ok: false, reason: `auth check failed: ${userRes.status}` }
  const user: SupabaseUser = await userRes.json()
  if (!user.email) return { ok: false, reason: 'no email on user' }

  // Step 2: query clients.is_admin (same as useIsAdmin)
  const clientUrl = `${SUPABASE_URL}/rest/v1/clients?email=eq.${encodeURIComponent(user.email)}&select=is_admin`
  const clientRes = await fetch(clientUrl, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: 'no-store',
  })
  if (!clientRes.ok) return { ok: false, reason: `clients lookup failed: ${clientRes.status}` }

  const rows = await clientRes.json() as ClientRow[]
  if (!Array.isArray(rows) || rows.length === 0) {
    return { ok: false, reason: 'no client row for this email' }
  }
  if (!rows[0].is_admin) {
    return { ok: false, reason: 'is_admin is false' }
  }

  return { ok: true, email: user.email }
}

async function fetchTable<T>(table: string, queryString: string): Promise<T[]> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${queryString}`
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) return []
  return await res.json() as T[]
}

export async function GET(req: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()

  const check = await validateAdminToken(token)
  if (!check.ok) {
    return NextResponse.json({ error: 'Unauthorized', reason: check.reason }, { status: 401 })
  }

  try {
    const [prospects, events] = await Promise.all([
      fetchTable('outreach_prospects', 'select=*&order=last_event_at.desc.nullslast,created_at.desc'),
      fetchTable('outreach_events', 'select=*&order=created_at.desc&limit=100'),
    ])
    return NextResponse.json({ prospects, events })
  } catch (err) {
    console.error('[audits api] error:', err)
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
