const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER ?? ''

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

  if (!businessPhone || !TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) {
    console.error('SMS alert skipped — missing config:', { businessPhone: !!businessPhone, sid: !!TWILIO_SID, token: !!TWILIO_TOKEN, from: !!TWILIO_FROM })
    return
  }

  const parts: string[] = ['🔥 ReCapture Lead Alert']

  if (leadName) parts.push(`Name: ${leadName}`)
  if (leadEmail) parts.push(`Email: ${leadEmail}`)
  if (leadPhone) parts.push(`Phone: ${leadPhone}`)

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
        To: businessPhone,
        From: TWILIO_FROM,
        Body: body,
      }),
    })

    if (res.ok) {
      console.log('SMS alert sent to', businessPhone)
    } else {
      const err = await res.text()
      console.error('SMS alert failed:', res.status, err)
    }
  } catch (err) {
    console.error('SMS alert error:', err)
  }
}
