import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { logAdminAccess, auditContext } from '@/lib/audit'

/**
 * Permanently deletes a lead.
 *
 * The caller must own the client the lead belongs to, or be an admin. Identity
 * comes from the access token, never from the request body.
 */
export async function POST(request: NextRequest) {
  let body: { token?: string; leadId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { token, leadId } = body
  if (!token || !leadId) {
    return NextResponse.json({ error: 'token and leadId are required' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = userData.user

  // What client does this lead belong to?
  const { data: lead, error: leadErr } = await supabaseAdmin
    .from('leads')
    .select('id, client_id, name, email')
    .eq('id', leadId)
    .single()

  if (leadErr || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  // Authorise: admin, or the owner of that client record.
  const { data: me } = await supabaseAdmin
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  let allowed = me?.is_admin === true
  if (!allowed) {
    const { data: owned } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('id', lead.client_id)
      .eq('user_id', user.id)
      .maybeSingle()
    allowed = !!owned
  }

  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error: delErr } = await supabaseAdmin
    .from('leads')
    .delete()
    .eq('id', leadId)

  if (delErr) {
    console.error('[lead-delete] failed:', delErr)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  const ctx = auditContext(request)
  await logAdminAccess({
    actorEmail: user.email ?? null,
    actorId: user.id,
    action: 'delete_lead',
    clientId: lead.client_id,
    resource: 'leads',
    resourceId: leadId,
    notes: lead.email || lead.name || null,
    ip: ctx.ip,
    userAgent: ctx.userAgent,
  })

  return NextResponse.json({ ok: true })
}
