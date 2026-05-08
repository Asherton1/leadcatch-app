import { Resend } from 'resend'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''

interface FirstLeadParams {
  to: string
  firstName: string | null
  leadName: string | null
  leadEmail: string | null
  leadPhone: string | null
  estimatedValue: number | null
}

function firstLeadHtml(params: FirstLeadParams): string {
  const { firstName, leadName, leadEmail, leadPhone, estimatedValue } = params
  const greeting = firstName ? "Hi " + firstName + "," : "Hi there,"
  const valueDisplay = estimatedValue && estimatedValue > 0
    ? "$" + estimatedValue.toLocaleString()
    : "TBD"

  return [
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;font-family:Inter,-apple-system,sans-serif;">',
    '<tr><td align="center" style="padding:40px 20px;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0a0a0a;color:#fff;">',

    '<tr><td style="padding:0 0 32px 0;">',
    '<span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.3px;">',
    '<span style="color:#ff6b35;">[&bull;]</span> Re<span style="color:#ff6b35;">Capture</span>',
    '</span>',
    '</td></tr>',

    '<tr><td style="padding:0 0 16px 0;">',
    '<p style="margin:0;font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:0.2em;">First Lead Captured</p>',
    '</td></tr>',
    '<tr><td style="padding:0 0 24px 0;">',
    '<h1 style="margin:0;font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1.2;">',
    'Your tracker is working.',
    '</h1>',
    '</td></tr>',

    '<tr><td style="color:#aaa;font-size:15px;line-height:1.7;padding:0 0 32px 0;">',
    greeting + ' ReCapture just captured your first abandoned lead. This is the moment everything is built around &mdash; someone started filling out a form on your site, did not complete it, and would have been invisible to you. Now you have their info.',
    '</td></tr>',

    '<tr><td style="font-size:11px;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;padding:0 0 12px 0;font-weight:700;">The Lead</td></tr>',

    '<tr><td style="padding:0 0 32px 0;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;">',
    '<tr><td style="padding:24px 24px 12px 24px;">',
    leadName ? '<p style="margin:0 0 12px 0;font-size:18px;font-weight:700;color:#fff;">' + leadName + '</p>' : '<p style="margin:0 0 12px 0;font-size:18px;font-weight:700;color:#888;font-style:italic;">No name provided</p>',
    leadEmail ? '<p style="margin:0 0 8px 0;font-size:14px;color:#aaa;"><span style="color:#666;">Email:</span> <a href="mailto:' + leadEmail + '" style="color:#ff6b35;text-decoration:none;">' + leadEmail + '</a></p>' : '',
    leadPhone ? '<p style="margin:0 0 8px 0;font-size:14px;color:#aaa;"><span style="color:#666;">Phone:</span> <a href="tel:' + leadPhone + '" style="color:#ff6b35;text-decoration:none;">' + leadPhone + '</a></p>' : '',
    '<p style="margin:8px 0 0 0;font-size:14px;color:#aaa;"><span style="color:#666;">Estimated Value:</span> <strong style="color:#22c55e;">' + valueDisplay + '</strong></p>',
    '</td></tr>',
    '</table>',
    '</td></tr>',

    '<tr><td style="font-size:11px;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;padding:0 0 12px 0;font-weight:700;">What Happens Next</td></tr>',

    '<tr><td style="color:#aaa;font-size:14px;line-height:1.75;padding:0 0 24px 0;">',
    'Their info is in your dashboard right now. You can reach out personally, or your auto-recovery email may have already gone out (depending on your settings). Every future abandoned lead will land in the same place.',
    '</td></tr>',

    '<tr><td style="text-align:center;padding:0 0 32px 0;">',
    '<a href="https://www.userecapture.com/dashboard" style="display:inline-block;background:#ff6b35;color:#000;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:14px;">View Lead in Dashboard</a>',
    '</td></tr>',

    '<tr><td style="padding:24px 0 0 0;border-top:1px solid #1e1e1e;color:#666;font-size:13px;line-height:1.7;">',
    'Ash<br/>',
    'Founder, ReCapture<br/>',
    '<span style="color:#444;">Reply to this email if you have any questions.</span>',
    '</td></tr>',

    '</table>',
    '</td></tr>',
    '</table>',
  ].join("")
}

/**
 * Send the "first lead captured" celebration email to a client.
 * Fire-and-forget. Errors are logged but never thrown back to the caller,
 * because this should never block the track API hot path.
 */
export async function sendFirstLeadCelebration(params: FirstLeadParams): Promise<void> {
  if (!RESEND_KEY) {
    console.error("[first-lead-email] RESEND_API_KEY not set")
    return
  }
  if (!params.to) {
    console.error("[first-lead-email] No recipient email provided")
    return
  }

  try {
    const resend = new Resend(RESEND_KEY)
    const html = firstLeadHtml(params)
    const subject = "Your first abandoned lead just came in"

    const { error } = await resend.emails.send({
      from: "Asherton Chraibi <hello@userecapture.com>",
      to: params.to,
      subject,
      html,
      replyTo: "hello@userecapture.com",
    })

    if (error) {
      console.error("[first-lead-email] Resend error:", error)
    } else {
      console.log("[first-lead-email] Sent to", params.to)
    }
  } catch (err) {
    console.error("[first-lead-email] Exception:", err)
  }
}
