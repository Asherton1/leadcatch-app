import { supabaseAdmin } from '@/lib/supabase-admin'

/**
 * Finish Anywhere.
 *
 * Every other recovery tool sends a link and asks the person to start again.
 * Most will not, because restarting a form is worse than never beginning one.
 * This lets them finish inside the text message: we ask the question they
 * stalled on, they reply in plain words, and it lands on the lead.
 *
 * Only runs when the client has switched it on AND confirmed the consent line
 * is on their form, because this texts somebody who never pressed submit.
 */

/** Turn "matterType" or "matter_type" into "matter type". */
export function prettify(name: string) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .trim()
}

/** Tidy a form label into something that reads inside a sentence. */
export function asQuestion(label: string | null, name: string) {
  const text = (label ?? '').replace(/\*/g, '').replace(/\s*:\s*$/, '').trim()
  if (text && text.length >= 3) return text
  return prettify(name)
}

/**
 * The first thing they did not answer. Contact fields are skipped: we already
 * have a phone to text them on, and chasing an email by SMS is a worse use of
 * the one message we get.
 */
const CONTACTISH = /(first|last|full)?\s*name|email|phone|mobile|tel|zip|postcode/i

export function nextUnanswered(
  fieldOrder: string[] | null,
  fieldLabels: (string | null)[] | null,
  filled: string[] | null
): { name: string; label: string | null } | null {
  if (!fieldOrder?.length) return null
  const done = new Set(filled ?? [])
  for (let i = 0; i < fieldOrder.length; i++) {
    const name = fieldOrder[i]
    if (done.has(name)) continue
    if (CONTACTISH.test(name)) continue
    const label = fieldLabels?.[i] ?? null
    if (label && CONTACTISH.test(label)) continue
    return { name, label }
  }
  return null
}

export function isStop(body: string) {
  return /^\s*(stop|unsubscribe|cancel|end|quit|stopall|revoke)\s*$/i.test(body ?? '')
}

/**
 * A reply is freeform, so we take what they send rather than pattern matching.
 * We only reject things that are obviously not an answer.
 */
export function acceptAnswer(body: string): string | null {
  const text = (body ?? '').trim().replace(/\s+/g, ' ')
  if (text.length < 2) return null
  if (text.length > 300) return text.slice(0, 300)
  if (/^(ok|okay|k|yes|no|y|n|thanks|ty|\?+)$/i.test(text)) return null
  return text
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

export async function openFinishSession(opts: {
  clientId: string
  leadId: string
  phone: string
  businessName: string
  question: { name: string; label: string | null }
}) {
  const { clientId, leadId, phone, businessName, question } = opts

  const { data: existing } = await supabaseAdmin
    .from('finish_sessions')
    .select('id')
    .eq('phone', phone)
    .is('completed_at', null)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()
  if (existing) return { started: false, reason: 'already_open' }

  const { data: session, error } = await supabaseAdmin
    .from('finish_sessions')
    .insert({
      client_id: clientId,
      lead_id: leadId,
      phone,
      awaiting_field: question.name,
      fields_needed: [question.name],
      collected: { _label: question.label ?? '' },
      prompts_sent: 1,
    })
    .select('id')
    .single()

  if (error || !session) {
    console.error('[finish] could not open session:', error)
    return { started: false, reason: 'db_error' }
  }

  const ask = asQuestion(question.label, question.name)
  const body =
    `Hi, it's ${businessName}. You started getting in touch and did not quite finish. ` +
    `No need to go back to the site, just reply here and tell us: ${ask}. ` +
    `Reply STOP to opt out.`

  const sent = await sendText(phone, body)
  return { started: sent, sessionId: session.id }
}

/** Handles an inbound reply. Returns text to send back, or null to stay quiet. */
export async function handleFinishReply(fromPhone: string, body: string) {
  const { data: session } = await supabaseAdmin
    .from('finish_sessions')
    .select('id, client_id, lead_id, awaiting_field, collected, prompts_sent')
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

  const answer = acceptAnswer(body)
  const stored = (session.collected ?? {}) as Record<string, string>

  if (!answer) {
    // One nudge, then we stop. Nobody wants a bot arguing with them.
    if ((session.prompts_sent ?? 1) >= 2) {
      await supabaseAdmin
        .from('finish_sessions')
        .update({ completed_at: new Date().toISOString(), closed_reason: 'no_answer' })
        .eq('id', session.id)
      return null
    }
    await supabaseAdmin
      .from('finish_sessions')
      .update({ prompts_sent: (session.prompts_sent ?? 1) + 1 })
      .eq('id', session.id)
    const ask = asQuestion(stored._label ?? null, session.awaiting_field ?? '')
    return `Sorry, could you tell us ${ask}?`
  }

  // Put the answer on the lead, alongside whatever they typed on the site.
  if (session.lead_id && session.awaiting_field) {
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('form_data')
      .eq('id', session.lead_id)
      .maybeSingle()

    const form = { ...((lead?.form_data ?? {}) as Record<string, unknown>) }
    form[session.awaiting_field] = answer
    form._finished_by_text = true

    await supabaseAdmin
      .from('leads')
      .update({ form_data: form })
      .eq('id', session.lead_id)
  }

  await supabaseAdmin
    .from('finish_sessions')
    .update({
      collected: { ...stored, [session.awaiting_field ?? 'answer']: answer },
      awaiting_field: null,
      completed_at: new Date().toISOString(),
      closed_reason: 'completed',
    })
    .eq('id', session.id)

  return 'Perfect, that is everything we needed. Someone will be in touch shortly.'
}
