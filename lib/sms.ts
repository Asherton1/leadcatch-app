import { supabaseAdmin } from './supabase-admin'

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER ?? ''

const PRO_TIERS = ['pro', 'enterprise_starter', 'enterprise_growth', 'enterprise_scale', 'enterprise_custom']

interface SmsAlertPayload {
  businessPhone: string
  leadName: string | null
  leadEmail: string | null
  leadPhone: string | null
  formData: Record<string, unknown> | null
  fieldsCompleted: number
  totalFields: number
  clientId?: string
  siteUrl?: string
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  let out = template
  for (const [key, val] of Object.entries(vars)) {
    out = out.split('{' + key + '}').join(val)
  }
  return out
}

async function getClientAlertTemplate(clientId: string, topic: string = 'instant'): Promise<string | null> {
  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('plan, is_admin')
    .eq('id', clientId)
    .maybeSingle()

  if (!client) return null
  const allowed = client.is_admin === true || PRO_TIERS.includes(client.plan)
  if (!allowed) return null

  const { data: tpl } = await supabaseAdmin
    .from('client_sms_templates')
    .select('body')
    .eq('client_id', clientId)
    .eq('topic', topic)
    .maybeSingle()

  return tpl?.body || null
}


export async function sendSmsAlert(payload: SmsAlertPayload) {
  const { businessPhone, leadName, leadEmail, leadPhone, formData, fieldsCompleted, totalFields, clientId, siteUrl } = payload

  if (!businessPhone || !TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) {
    console.error('SMS alert skipped — missing config:', { businessPhone: !!businessPhone, sid: !!TWILIO_SID, token: !!TWILIO_TOKEN, from: !!TWILIO_FROM })
    return
  }

  // Normalize phone to E.164 — Twilio requires +countrycode prefix
  // 10 digits -> assume US, prepend +1
  // 11 digits starting with 1 -> prepend +
  // already starts with + -> leave alone
  let normalizedPhone = businessPhone.trim().replace(/[\s\-\(\)\.]/g, '')
  if (!normalizedPhone.startsWith('+')) {
    const digits = normalizedPhone.replace(/\D/g, '')
    if (digits.length === 10) normalizedPhone = '+1' + digits
    else if (digits.length === 11 && digits.startsWith('1')) normalizedPhone = '+' + digits
    else normalizedPhone = '+' + digits
  }

  // Build form_data string for merge tag substitution
  let formDataStr = ''
  if (formData && typeof formData === 'object') {
    const skipKeys = new Set(['name', 'email', 'phone', 'tel', 'telephone'])
    const extras: string[] = []
    for (const [key, val] of Object.entries(formData)) {
      if (skipKeys.has(key.toLowerCase())) continue
      if (val && String(val).trim()) {
        const label = key.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        extras.push(`${label}: ${String(val).trim()}`)
      }
    }
    formDataStr = extras.join(', ')
  }

  // Try to load client custom alert template (Pro+ only); fall back to hardcoded default
  let body: string
  let customTemplate: string | null = null
  if (clientId) {
    try {
      customTemplate = await getClientAlertTemplate(clientId, 'instant')
    } catch (err) {
      console.error('[sms] custom template lookup failed:', err)
    }
  }

  if (customTemplate) {
    body = fillTemplate(customTemplate, {
      name: leadName || 'Unnamed lead',
      email: leadEmail || '',
      phone: leadPhone || '',
      form_data: formDataStr,
      fields_completed: String(fieldsCompleted),
      total_fields: String(totalFields),
      site_url: siteUrl || '',
    })
  } else {
    const parts: string[] = ['New lead from ReCapture']
    if (leadName) parts.push(`Name: ${leadName}`)
    if (leadEmail) parts.push(`Email: ${leadEmail}`)
    if (leadPhone) parts.push(`Phone: ${leadPhone}`)
    if (formDataStr) parts.push(formDataStr)
    parts.push(`${fieldsCompleted} of ${totalFields} fields completed`)
    parts.push('Follow up while the intent is fresh.')
    body = parts.join('\n')
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64')

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: normalizedPhone,
        From: TWILIO_FROM,
        Body: body,
      }),
    })

    if (res.ok) {
      console.log('SMS alert sent to', normalizedPhone)
    } else {
      const err = await res.text()
      console.error('SMS alert failed:', res.status, err)
    }
  } catch (err) {
    console.error('SMS alert error:', err)
  }
}
