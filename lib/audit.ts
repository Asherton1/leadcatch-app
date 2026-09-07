import { supabaseAdmin } from './supabase-admin'

type AuditEntry = {
  actorEmail?: string | null
  actorId?: string | null
  action: string
  clientId?: string | null
  resource?: string | null
  resourceId?: string | null
  ip?: string | null
  userAgent?: string | null
  notes?: string | null
}

/**
 * Records administrative access to customer data.
 *
 * Deliberately non-throwing: a logging failure must never break the operation
 * being logged. Failures are written to the server console so they surface in
 * platform logs rather than disappearing silently.
 */
export async function logAdminAccess(entry: AuditEntry): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('admin_access_log').insert({
      actor_email: entry.actorEmail ?? null,
      actor_id: entry.actorId ?? null,
      action: entry.action,
      client_id: entry.clientId ?? null,
      resource: entry.resource ?? null,
      resource_id: entry.resourceId ?? null,
      ip: entry.ip ?? null,
      user_agent: entry.userAgent ?? null,
      notes: entry.notes ?? null,
    })
    if (error) console.error('[audit] write failed:', error, entry.action)
  } catch (err) {
    console.error('[audit] write threw:', err)
  }
}

/** Pull request metadata for an audit entry. */
export function auditContext(request: Request) {
  return {
    ip:
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      null,
    userAgent: request.headers.get('user-agent'),
  }
}
