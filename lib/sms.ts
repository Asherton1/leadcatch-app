import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const FROM = process.env.TWILIO_PHONE_NUMBER ?? ''

interface SmsAlertPayload {
  businessPhone: string
  leadName: string | null
  leadEmail: string | null
  leadPhone: string | null
  formData: Record<string, unknown> | null
  fieldsCompleted: number
  totalFields: number
}

export async function sendSmsAlert(payload: SmsAlertPayload) {
  const { businessPhone, leadName, leadEmail, leadPhone, formData, fieldsCompleted, totalFields } = payload

  if (!businessPhone || !FROM) {
    console.error('SMS alert skipped — missing businessPhone or TWILIO_PHONE_NUMBER')
    return
  }

  // Build a concise, high-value message
  const parts: string[] = ['🔥 ReCapture Lead Alert']

  if (leadName) parts.push(`Name: ${leadName}`)
  if (leadEmail) parts.push(`Email: ${leadEmail}`)
  if (leadPhone) parts.push(`Phone: ${leadPhone}`)

  // Pull interesting fields from form_data (treatment, service, vehicle, etc.)
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
    if (extras.length > 0) parts.push(extras.join(', '))
  }

  parts.push(`Fields: ${fieldsCompleted}/${totalFields}`)
  parts.push('Form abandoned — follow up now')

  const body = parts.join('\n')

  try {
    await client.messages.create({
      body,
      from: FROM,
      to: businessPhone,
    })
    console.log('SMS alert sent to', businessPhone)
  } catch (err) {
    console.error('SMS alert failed:', err)
  }
}
