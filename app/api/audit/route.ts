import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logAdminAccess, auditContext } from '@/lib/audit'

/**
 * Records an admin viewing a customer's data.
 *
 * The caller's identity is taken from their access token, never from the
 * request body, so a client cannot attribute an entry to someone else.
 */
export async function POST(request: NextRequest) {
  let body: { token?: string; action?: string; clientId?: string; notes?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { token, action, clientId, notes } = body
  if (!token || !action) return NextResponse.json({ ok: false }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const ctx = auditContext(request)
  await logAdminAccess({
    actorEmail: userData.user.email ?? null,
    actorId: userData.user.id,
    action,
    clientId: clientId ?? null,
    resource: 'dashboard',
    notes: notes ?? null,
    ip: ctx.ip,
    userAgent: ctx.userAgent,
  })

  return NextResponse.json({ ok: true })
}
