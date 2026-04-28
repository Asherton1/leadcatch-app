import { Resend } from 'resend'
import { supabase } from './supabase'

const DEFAULT_SUBJECT = 'Still interested in {service} at {business_name}?'

// Default body content — plain paragraphs, inserted into the HTML wrapper below.
// Clients can override this via message_template in the DB (also plain text / light HTML).
const DEFAULT_BODY_CONTENT = `<p>Hi {name},</p>

<p>We noticed you started a request for <strong>{service}</strong> but didn't complete it — no worries, life gets busy.</p>

<p>If you're still interested or have any questions, we'd be happy to help you get scheduled at your convenience.</p>`

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')
}

// Wraps any body content in a clean, professional HTML email shell.
// Always called — message_template is content *inside* this, never a replacement for it.
function buildHtml(bodyContent: string, vars: Record<string, string>): string {
  const { business_name, booking_url, brand_color } = vars

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message from ${business_name}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;">

  <div style="max-width:580px;margin:40px auto 60px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">

    <!-- Top accent bar -->
    <div style="height:4px;background:${brand_color || '#ff6b35'};"></div>

    <!-- Header -->
    <div style="padding:32px 40px 24px;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#71717a;letter-spacing:0.02em;">${business_name}</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px;font-size:15px;line-height:1.75;color:#3f3f46;">
      ${bodyContent}
    </div>

    <!-- CTA -->
    ${booking_url && booking_url !== '#' ? `
    <div style="padding:0 40px 36px;">
      <a href="${booking_url}"
         style="display:inline-block;background:${brand_color || '#ff6b35'};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:600;">
        Book Your Appointment
      </a>
    </div>
    ` : ''}

    <!-- Divider -->
    <div style="margin:0 40px;border-top:1px solid #f0f0f0;"></div>

    <!-- Footer -->
    <div style="padding:24px 40px;font-size:12px;color:#a1a1aa;line-height:1.6;">
      ${(vars.contact_phone || vars.contact_email) ? `<p style="margin:0 0 8px;">Questions? ${vars.contact_phone ? `Call us at <a href="tel:${vars.contact_phone}" style="color:#71717a;text-decoration:none;">${vars.contact_phone}</a>` : ''}${vars.contact_phone && vars.contact_email ? ' or email ' : ''}${vars.contact_email ? `<a href="mailto:${vars.contact_email}" style="color:#ff6b35;text-decoration:none;">${vars.contact_email}</a>` : ''}</p>` : ''}
      <p style="margin:0 0 4px;">You received this email because you started a form on <strong style="color:#71717a;">${business_name}</strong>.</p>
      ${vars.email_footer ? `<p style="margin:0 0 4px;">${vars.email_footer}</p>` : ''}
      ${vars.company_tagline ? `<p style="margin:0 0 4px;font-style:italic;">${vars.company_tagline}</p>` : ''}
      <p style="margin:0;">Powered by <a href="https://userecapture.com" style="color:${brand_color || '#ff6b35'};text-decoration:none;">ReCapture</a></p>
    </div>

  </div>

</body>
</html>`
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

export type EmailResult =
  | { success: true; skipped?: true; id?: string }
  | { success: false; error: string }

export async function sendEmailForLead(leadId: string): Promise<EmailResult> {
  console.log('sendEmailForLead called:', leadId)

  // ── 1. Fetch lead ──────────────────────────────────────────────────────────
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('id, name, email, email_sent, form_data, client_id')
    .eq('id', leadId)
    .single()

  console.log('Lead data:', lead?.email, 'already sent:', lead?.email_sent)

  if (leadError || !lead) return { success: false, error: 'Lead not found' }
  if (!lead.email)      return { success: false, error: 'Lead has no email address' }
  if (lead.email_sent)  return { success: true, skipped: true }

  // ── 2. Fetch client ────────────────────────────────────────────────────────
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, name, message_template, booking_url, from_email, email_header, sender_name, contact_phone, contact_email, reply_to_email, email_footer, brand_color, company_tagline, auto_mark_contacted')
    .eq('id', lead.client_id)
    .single()

  if (clientError || !client) return { success: false, error: 'Client not found' }

  // ── 3. Build template variables ────────────────────────────────────────────
  const formData = (lead.form_data as Record<string, string>) ?? {}
  const service =
    formData.service ||
    formData.service_interest ||
    formData.service_type ||
    formData.interested_in ||
    'your inquiry'

  const firstName = (lead.name ?? 'there').split(' ')[0]

  // sender_name: shown in the email "from" field. Falls back to the part of
  // client.name before " - " (e.g. "ESD Health - Sleep Diagnostics" → "ESD Health").
  const senderName: string =
    client.sender_name ??
    (client.name.includes(' - ') ? client.name.split(' - ')[0].trim() : client.name)

  // email_header: shown inside the email body. Separate from the sender name so
  // it can be a tagline (e.g. "Effortless Sleep Diagnostics") rather than a legal name.
  const emailHeader: string = client.email_header ?? client.name

  const vars: Record<string, string> = {
    name:           firstName,
    business_name:  emailHeader,
    service,
    booking_url:    client.booking_url    ?? '#',
    contact_phone:  (client as any).contact_phone  ?? '',
    contact_email:  (client as any).contact_email  ?? '',
    brand_color:    (client as any).brand_color     ?? '#ff6b35',
    email_footer:   (client as any).email_footer    ?? '',
    company_tagline:(client as any).company_tagline ?? '',
  }

  const subject = fill(DEFAULT_SUBJECT, vars)

  // message_template is body *content* (paragraphs), not a full HTML document.
  // Always wrap it in the HTML shell so it renders properly in every email client.
  const bodyContent = fill(client.message_template ?? DEFAULT_BODY_CONTENT, vars)
  const html        = buildHtml(bodyContent, vars)

  // ── 4. Send via Resend ─────────────────────────────────────────────────────
  // Free tier: must use onboarding@resend.dev until a domain is verified.
  // Once the client verifies their domain, set from_email in the clients table.
  const from = client.from_email
    ? `${senderName} <${client.from_email}>`
    : `${senderName} <onboarding@resend.dev>`

  console.log('Calling Resend with:', lead.email, subject)

  let emailId: string
  try {
    const resend = getResend()
    const replyTo = (client as any).reply_to_email || undefined
    const { data, error } = await resend.emails.send({
      from,
      to:      lead.email,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    })
    if (error || !data) {
      const detail = error?.message ?? 'Resend returned no data'
      console.log('Resend error:', detail)
      return { success: false, error: detail }
    }
    console.log('Email sent successfully')
    emailId = data.id
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.log('Resend error:', detail)
    return { success: false, error: detail }
  }

  // ── 5. Mark lead as emailed ────────────────────────────────────────────────
  const updateFields: Record<string, unknown> = { email_sent: true, email_sent_at: new Date().toISOString() }
  if ((client as any).auto_mark_contacted) {
    updateFields.status = 'contacted'
  }
  const { error: updateError } = await supabase
    .from('leads')
    .update(updateFields)
    .eq('id', leadId)

  if (updateError) {
    console.error('Failed to update email_sent flag:', updateError.message)
    // Email was sent — don't fail the response over a flag update
  }

  return { success: true, id: emailId }
}
