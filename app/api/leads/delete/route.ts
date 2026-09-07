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
  let body: { token?: string; leadId?: string; leadIds?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { token } = body
  const ids = (body.leadIds && body.leadIds.length ? body.leadIds : body.leadId ? [body.leadId] : [])
    .filter(v => typeof v === 'string' && v.length > 0)
    .slice(0, 200)

  if (!token || ids.length === 0) {
    return NextResponse.json({ error: 'token and at least one lead id are required' }, { status: 400 })
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
  const { data: rows, error: leadErr } = await supabaseAdmin
    .from('leads')
    .select('id, client_id, name, email')
    .in('id', ids)

  if (leadErr || !rows || rows.length === 0) {
    return NextResponse.json({ error: 'Leads not found' }, { status: 404 })
  }

  // Every lead must belong to one client. Refuse mixed batches rather than
  // authorising against one client and deleting another's data.
  const clientIds = Array.from(new Set(rows.map(r => r.client_id)))
  if (clientIds.length !== 1) {
    return NextResponse.json({ error: 'Batch spans multiple clients' }, { status: 400 })
  }
  const lead = { client_id: clientIds[0] }

  // Authorise: admin, or the owner of that client record.
  const { data: me } = await supabaseAdmin
    .from('clients')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle()

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
    .in('id', rows.map(r => r.id))

  if (delErr) {
    console.error('[lead-delete] failed:', delErr)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  const ctx = auditContext(request)
  await logAdminAccess({
    actorEmail: user.email ?? null,
    actorId: user.id,
    action: rows.length > 1 ? 'delete_leads_batch' : 'delete_lead',
    clientId: lead.client_id,
    resource: 'leads',
    resourceId: rows.map(r => r.id).join(','),
    notes: rows.length > 1 ? `${rows.length} leads deleted` : (rows[0].email || rows[0].name || null),
    ip: ctx.ip,
    userAgent: ctx.userAgent,
  })

  return NextResponse.json({ ok: true, deleted: rows.length })
}
