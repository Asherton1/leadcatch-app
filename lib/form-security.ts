// Shared spam-detection + HTML-escape utilities for public form endpoints.
// Used by /api/demo, /api/enterprise-inquiry, /api/form-audit.

export function isSpam(data: Record<string, string>): string | null {
  // Honeypot — hidden field that real users never fill in
  if (data.website && data.website.trim().length > 0) return 'honeypot'

  // Name validation
  if (!data.name || data.name.trim().length < 3) return 'name too short'
  if (/^(.)\1+$/.test(data.name.trim())) return 'name is repeated chars'
  if (/^test/i.test(data.name.trim())) return 'test submission'

  // Email validation
  if (!data.email || !data.email.includes('@') || !data.email.includes('.')) return 'invalid email'
  const throwaway = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
    'yopmail.com', 'sharklasers.com', 'trashmail.com', '10minutemail.com',
    'getnada.com', 'maildrop.cc', 'tempmailo.com', 'temp-mail.org',
  ]
  const domain = data.email.split('@')[1]?.toLowerCase()
  if (throwaway.includes(domain)) return 'throwaway email'

  // Phone validation
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '')
    if (digits.length > 0 && digits.length < 7) return 'phone too short'
    if (/^(\d)\1+$/.test(digits)) return 'phone is repeated digits'
  }

  // Message content patterns — block SDR cold-outreach + crypto/casino spam
  if (data.message) {
    const msg = data.message.toLowerCase()
    // Original spam keywords
    if (/\b(viagra|casino|crypto|bitcoin|lottery|prize|winner|click here|buy now)\b/.test(msg)) return 'spam keywords'
    // SDR cold-outreach patterns (the Carl Settle / Sam Ross style)
    if (/reply with ['"]?not for us['"]?/i.test(msg)) return 'sdr opt-out boilerplate'
    if (/worth (a |the |[0-9]+) ?(min|minute)/i.test(msg)) return 'sdr "worth X minutes" pitch'
    if (/brief (call|chat|conversation)/i.test(msg)) return 'sdr "brief call" pitch'
    if (/keen to hear from you/i.test(msg)) return 'sdr "keen to hear" pitch'
    if (/looking to (sell|buy|acquire) (your )?(company|business|domain)/i.test(msg)) return 'acquisition spam'
    if (/(quick|brief) question about your (patient|intake|contact|lead)/i.test(msg)) return 'sdr "quick question" pitch'
    // Repeated chars (e.g. aaaaaaa)
    if (/^(.)\1{5,}$/.test(data.message.trim())) return 'message is repeated chars'
  }

  // Subject patterns (used by enterprise-inquiry's "company" or any subject-like field)
  if (data.company) {
    const co = data.company
    // Random alphanumeric tracking codes (the TXCB2KV pattern)
    if (/[A-Z0-9]{6,8}\s+TX[A-Z0-9]{4,6}/.test(co)) return 'tracking code in company name'
    if (/^[A-Z0-9]{7,}$/.test(co.trim())) return 'random alphanumeric'
  }

  return null
}

// Escape HTML special chars so user input cannot inject markup into emails.
// Critical for any endpoint that concatenates user data into HTML email bodies.
export function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
