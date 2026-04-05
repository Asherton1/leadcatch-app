import { supabase } from './supabase'

// ─── SQL migration required ───────────────────────────────────────────────────
// Run once in Supabase SQL editor before deploying:
//
//   ALTER TABLE clients
//     ADD COLUMN IF NOT EXISTS first_name    text,
//     ADD COLUMN IF NOT EXISTS last_name     text,
//     ADD COLUMN IF NOT EXISTS company_name  text;
//
// The `name` column remains as the primary display name (company if provided,
// otherwise "First Last").
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientRecord {
  id: string
  user_id: string
  name: string
  first_name: string | null
  last_name: string | null
  company_name: string | null
  api_key: string
  avg_lead_value: number
  auto_email_enabled: boolean
  email_delay_minutes: number
  sender_name: string | null
  email_header: string | null
  active: boolean
  plan: string | null
  stripe_customer_id: string | null
  email: string | null
  trial_ends_at: string | null
}

const SELECT_COLS = [
  'id', 'user_id', 'name', 'first_name', 'last_name', 'company_name',
  'api_key', 'avg_lead_value', 'auto_email_enabled', 'email_delay_minutes',
  'sender_name', 'email_header', 'active',
  'email', 'plan', 'stripe_customer_id', 'trial_ends_at',
].join(', ')

function makeApiKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'client_'
  for (let i = 0; i < 24; i++) key += chars[Math.floor(Math.random() * chars.length)]
  return key
}

/**
 * Gets the client record for a user, or creates one if it doesn't exist.
 *
 * Call after a successful signIn / signUp (session must be active so the
 * Supabase client carries the user's JWT for RLS).
 *
 * Name fields are only used when creating a brand-new record (signup path).
 * On login they're omitted — the existing row already holds the correct values.
 */
export async function ensureClient(
  userId:      string,
  email:       string,
  firstName?:  string,
  lastName?:   string,
  companyName?: string,
): Promise<ClientRecord | null> {
  // 1. Return existing record unchanged
  const { data: existing, error: fetchErr } = await supabase
    .from('clients')
    .select(SELECT_COLS)
    .eq('user_id', userId)
    .maybeSingle()

  if (fetchErr) console.error('[provision] fetch error:', fetchErr.message)
  if (existing) return existing as unknown as ClientRecord

  // 2. Derive display name
  const first = firstName?.trim() || ''
  const last  = lastName?.trim()  || ''
  const company = companyName?.trim() || ''

  let displayName: string
  if (company) {
    displayName = company
  } else if (first || last) {
    displayName = `${first} ${last}`.trim()
  } else {
    // Fallback: prettify the email local-part ("john.doe" → "John Doe")
    displayName = email
      .split('@')[0]
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  }

  // 3. Insert new row
  const { data: created, error: insertErr } = await supabase
    .from('clients')
    .insert({
      user_id:             userId,
      name:                displayName,
      first_name:          first   || null,
      last_name:           last    || null,
      company_name:        company || null,
      api_key:             makeApiKey(),
      avg_lead_value:      400,
      auto_email_enabled:  true,
      email_delay_minutes: 0,
      sender_name:         'ReCapture',
      email_header:        'Revenue Recovery',
      active:              true,
      email:               email,
    })
    .select(SELECT_COLS)
    .single()

  if (insertErr) {
    console.error('[provision] insert error:', insertErr.message)
    return null
  }

  return created as unknown as ClientRecord
}
