import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

const ADMIN_EMAILS = new Set([
  'asherton@userecapture.com',
  'asherton.c@me.com',
])

interface SupabaseUser {
  id?: string
  email?: string
  [key: string]: unknown
}

async function validateAdminToken(token: string): Promise<{ ok: boolean; email?: string; reason?: string }> {
  if (!token) return { ok: false, reason: 'missing token' }
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return { ok: false, reason: `auth check failed: ${res.status}` }
  const user: SupabaseUser = await res.json()
  if (!user.email) return { ok: false, reason: 'no email on user' }
  if (!ADMIN_EMAILS.has(user.email)) return { ok: false, reason: 'not an admin' }
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
