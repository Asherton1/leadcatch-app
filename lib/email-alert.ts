import { Resend } from 'resend'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''

interface EmailAlertPayload {
  toEmail: string
  leadName: string | null
  leadEmail: string | null
  leadPhone: string | null
  formData: Record<string, unknown> | null
  fieldsCompleted: number
  totalFields: number
  clientCompanyName?: string | null
}

export async function sendEmailAlert(payload: EmailAlertPayload) {
  const {
    toEmail, leadName, leadEmail, leadPhone, formData,
    fieldsCompleted, totalFields, clientCompanyName,
  } = payload

  if (!toEmail || !RESEND_KEY) {
    console.error('Email alert skipped — missing config:', { toEmail: !!toEmail, key: !!RESEND_KEY })
    return
  }

  const resend = new Resend(RESEND_KEY)

  // Extra fields from form_data, excluding the standard ones
  let extrasHtml = ''
  if (formData && typeof formData === 'object') {
    const skipKeys = new Set(['name', 'email', 'phone', 'tel', 'telephone'])
    for (const [key, val] of Object.entries(formData)) {
      if (skipKeys.has(key.toLowerCase())) continue
      if (val && String(val).trim()) {
        const label = key.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        extrasHtml += `<tr><td style="padding:8px 0;color:#888;font-size:13px;">${label}</td><td style="padding:8px 0;color:#fff;font-size:14px;">${String(val).trim()}</td></tr>`
      }
    }
  }

  const subject = leadName
    ? `New lead: ${leadName}`
    : leadEmail
    ? `New lead: ${leadEmail}`
    : 'New lead from ReCapture'

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0a0a0a;">
        <tr><td style="padding:0 0 24px 0;">
          <span style="font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#fff;">
            <span style="color:#ff6b35;">[•]</span> Re<span style="color:#ff6b35;">Capture</span>
          </span>
        </td></tr>
        <tr><td style="padding:0 0 8px 0;">
          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;color:#ff6b35;text-transform:uppercase;">New Lead Captured</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1.3;">
            ${leadName || leadEmail || 'A visitor'} started a form on ${clientCompanyName || 'your site'}.
          </h1>
        </td></tr>
        <tr><td style="padding:16px 20px;background:#141414;border:1px solid #222;border-radius:8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${leadName ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#fff;font-size:14px;">${leadName}</td></tr>` : ''}
            ${leadEmail ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px;">Email</td><td style="padding:8px 0;color:#fff;font-size:14px;"><a href="mailto:${leadEmail}" style="color:#ff6b35;text-decoration:none;">${leadEmail}</a></td></tr>` : ''}
            ${leadPhone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px;">Phone</td><td style="padding:8px 0;color:#fff;font-size:14px;"><a href="tel:${leadPhone}" style="color:#ff6b35;text-decoration:none;">${leadPhone}</a></td></tr>` : ''}
            ${extrasHtml}
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px;">Progress</td><td style="padding:8px 0;color:#fff;font-size:14px;">${fieldsCompleted} of ${totalFields} fields completed</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0 0 0;">
          <p style="margin:0;color:#888;font-size:14px;line-height:1.6;">Follow up while the intent is fresh — leads contacted within 5 minutes are 9x more likely to convert.</p>
        </td></tr>
        <tr><td style="padding:24px 0 0 0;border-top:1px solid #222;margin-top:24px;">
          <p style="margin:24px 0 0 0;color:#555;font-size:11px;letter-spacing:0.05em;">Powered by ReCapture · Form abandonment recovery for high-ticket service businesses</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    const result = await resend.emails.send({
      from: 'ReCapture Alerts <hello@userecapture.com>',
      to: toEmail,
      replyTo: leadEmail || undefined,
      subject,
      html,
    })
    console.log('Email alert sent to', toEmail, 'id:', result.data?.id)
  } catch (err) {
    console.error('Email alert error:', err)
  }
}
