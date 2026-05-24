/**
 * Unified email signature for all ReCapture-branded outgoing emails.
 * Phase 2 wires this into each email surface.
 */

const LOGO_BLOCK = `<p style="margin:0 0 18px 0;font-size:14px;font-weight:700;letter-spacing:-0.01em;color:#ffffff;line-height:1;">
  <span style="color:#ff6b35;font-weight:800;padding-right:3px;">+</span>Re<span style="color:#ff6b35;">Capture</span>
</p>`

const CONTACT_LINE = `<p style="margin:0;font-size:12px;color:#666666;line-height:1.6;">
  <a href="tel:+18886060630" style="color:#666666;text-decoration:none;">(888) 606-0630</a>
  <span style="color:#444444;"> &middot; </span>
  <a href="mailto:hello@userecapture.com" style="color:#666666;text-decoration:none;">hello@userecapture.com</a>
  <span style="color:#444444;"> &middot; </span>
  <a href="https://www.userecapture.com" style="color:#ff6b35;text-decoration:none;">userecapture.com</a>
</p>`

export function ashSignatureHtml(): string {
  return `<div style="padding:28px 0 0 0;margin-top:32px;border-top:1px solid #1a1a1a;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
  ${LOGO_BLOCK}
  <p style="margin:0 0 2px 0;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;line-height:1.4;">Asherton Chraibi</p>
  <p style="margin:0 0 2px 0;font-size:13px;color:#888888;line-height:1.5;">Founder, ReCapture</p>
  <p style="margin:0 0 14px 0;font-size:13px;color:#888888;line-height:1.5;">Lost revenue recovery for high-ticket service businesses</p>
  ${CONTACT_LINE}
</div>`
}

export function marissaSignatureHtml(): string {
  return `<div style="padding:28px 0 0 0;margin-top:32px;border-top:1px solid #1a1a1a;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
  ${LOGO_BLOCK}
  <p style="margin:0 0 2px 0;font-size:15px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;line-height:1.4;">Marissa</p>
  <p style="margin:0 0 2px 0;font-size:13px;color:#888888;line-height:1.5;">ReCapture Concierge</p>
  <p style="margin:0 0 14px 0;font-size:13px;color:#888888;line-height:1.5;">Every prospect that almost got away. Brought back.</p>
  ${CONTACT_LINE}
</div>`
}
