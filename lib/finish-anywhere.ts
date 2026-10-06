import { supabaseAdmin } from '@/lib/supabase-admin'

/**
 * Finish Anywhere.
 *
 * Every other recovery tool sends a link and asks the person to start again.
 * Most will not, because restarting a form is worse than never beginning one.
 * This lets them finish inside the text message instead: they reply with the
 * one thing that was missing and the submission completes on our side.
 *
 * Only runs when the client has switched it on AND confirmed the consent line
 * is on their form, because this sends an unsolicited text to someone who never
 * pressed submit.
 */

export const FINISH_FIELDS = ['phone', 'email'] as const
export type FinishField = (typeof FINISH_FIELDS)[number]

const ASK: Record<FinishField, string> = {
  phone: 'the best number to reach you on',
  email: 'the best email for you',
}

export function missingFields(lead: {
  email?: string | null
  phone?: string | null
}): FinishField[] {
  const out: FinishField[] = []
  if (!lead.phone) out.push('phone')
  if (!lead.email) out.push('email')
  return out
}

/** Does this reply look like the thing we asked for? */
export function parseReply(field: FinishField, body: string): string | null {
  const text = (body ?? '').trim()
  if (!text) return null

  if (field === 'email') {
    const m = text.match(/[^\s@]+@[^\s@]+\.[a-z]{2,}/i)
    return m ? m[0].toLowerCase() : null
  }

  // phone: pull the digits and sanity check the length
  const digits = text.replace(/\D/g, '')
  if (digits.length === 10) return digits
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1)
  return null
}

export function isStop(body: string) {
  return /^\s*(stop|unsubscribe|cancel|end|quit)\s*$/i.test(body ?? '')
}

async function sendText(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_PHONE_NUMBER
  if (!sid || !token || !from) return false

  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }),
    })
    if (!res.ok) {
      console.error('[finish] send failed:', res.status, (await res.text()).slice(0, 200))
      return false
    }
    return true
  } catch (e) {
    console.error('[finish] send exception:', e)
    return false
  }
}

/** Opens a session and sends the first message. */
export async function openFinishSession(opts: {
  clientId: string
  leadId: string
  phone: string
  businessName: string
  needed: FinishField[]
}) {
  const { clientId, leadId, phone, businessName, needed } = opts
  if (!needed.length) return { started: false, reason: 'nothing_missing' }

  // Never open a second session for someone who already has one open.
  const { data: existing } = await supabaseAdmin
    .from('finish_sessions')
    .select('id')
    .eq('phone', phone)
    .is('completed_at', null)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (existing) return { started: false, reason: 'already_open' }

  const first = needed[0]

  const { data: session, error } = await supabaseAdmin
    .from('finish_sessions')
    .insert({
      client_id: clientId,
      lead_id: leadId,
      phone,
      awaiting_field: first,
      fields_needed: needed,
      prompts_sent: 1,
    })
    .select('id')
    .single()

  if (error || !session) {
    console.error('[finish] could not open session:', error)
    return { started: false, reason: 'db_error' }
  }

  const body =
    `Hi, it's ${businessName}. You started getting in touch with us and did not quite finish. ` +
    `No need to go back to the site, just reply here with ${ASK[first]} and we will take it from there. ` +
    `Reply STOP to opt out.`

  const sent = await sendText(phone, body)
  return { started: sent, sessionId: session.id }
}

/** Handles an inbound reply. Returns the text to send back, or null to stay quiet. */
export async function handleFinishReply(fromPhone: string, body: string) {
  const { data: session } = await supabaseAdmin
    .from('finish_sessions')
    .select('id, client_id, lead_id, awaiting_field, fields_needed, collected, prompts_sent')
    .eq('phone', fromPhone)
    .is('completed_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .maybeSingle()

  if (!session) return null

  if (isStop(body)) {
    await supabaseAdmin
      .from('finish_sessions')
      .update({ completed_at: new Date().toISOString(), closed_reason: 'opted_out' })
      .eq('id', session.id)
    return 'You will not hear from us again. Sorry for the interruption.'
  }

  const field = session.awaiting_field as FinishField
  const value = parseReply(field, body)

  if (!value) {
    // One clarification, then we stop. Nobody wants a bot arguing with them.
    if ((session.prompts_sent ?? 0) >= 2) {
      await supabaseAdmin
        .from('finish_sessions')
        .update({ completed_at: new Date().toISOString(), closed_reason: 'unparseable' })
        .eq('id', session.id)
      return null
    }
    await supabaseAdmin
      .from('finish_sessions')
      .update({ prompts_sent: (session.prompts_sent ?? 1) + 1 })
      .eq('id', session.id)
    return field === 'email'
      ? 'Sorry, that did not look like an email address. Could you send it again?'
      : 'Sorry, that did not look like a phone number. Could you send it again?'
  }

  const collected = { ...(session.collected as Record<string, string>), [field]: value }
  const remaining = (session.fields_needed as FinishField[]).filter(f => !collected[f])

  // Write what we learned straight onto the lead.
  if (session.lead_id) {
    await supabaseAdmin
      .from('leads')
      .update({ [field]: value })
      .eq('id', session.lead_id)
  }

  if (remaining.length) {
    const next = remaining[0]
    await supabaseAdmin
      .from('finish_sessions')
      .update({ collected, awaiting_field: next, prompts_sent: 1 })
      .eq('id', session.id)
    return `Got it. And ${ASK[next]}?`
  }

  await supabaseAdmin
    .from('finish_sessions')
    .update({ collected, awaiting_field: null, completed_at: new Date().toISOString(), closed_reason: 'completed' })
    .eq('id', session.id)

  return 'Perfect, that is everything. Someone will be in touch shortly.'
}
