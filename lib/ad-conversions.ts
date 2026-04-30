import crypto from 'crypto'

// SHA256 hash for PII (Meta + Google both require this for emails/phones/names)
function sha256(value: string | null | undefined): string | null {
  if (!value) return null
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

function hashPhone(phone: string | null | undefined): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  const e164 = digits.length === 10 ? '1' + digits : digits
  return crypto.createHash('sha256').update(e164).digest('hex')
}

// ─────────────────────────────────────────────────────────────────
// META (Facebook) Conversions API
// ─────────────────────────────────────────────────────────────────

interface MetaConversionPayload {
  pixelId: string
  accessToken: string
  testEventCode?: string | null
  leadEmail: string | null
  leadPhone: string | null
  leadName: string | null
  estimatedValue: number
  eventSourceUrl?: string
  ipAddress?: string
  userAgent?: string
}

export async function sendMetaConversion(payload: MetaConversionPayload) {
  const {
    pixelId, accessToken, testEventCode,
    leadEmail, leadPhone, leadName, estimatedValue,
    eventSourceUrl, ipAddress, userAgent,
  } = payload

  if (!pixelId || !accessToken) {
    console.error('Meta CAPI skipped — missing pixelId or accessToken')
    return { success: false, error: 'missing_credentials' }
  }

  let firstName: string | null = null
  let lastName: string | null = null
  if (leadName) {
    const parts = leadName.trim().split(/\s+/)
    firstName = parts[0] ?? null
    lastName = parts.length > 1 ? parts.slice(1).join(' ') : null
  }

  const userData: Record<string, string | string[]> = {}
  if (leadEmail) userData.em = [sha256(leadEmail) as string]
  if (leadPhone) userData.ph = [hashPhone(leadPhone) as string]
  if (firstName) userData.fn = [sha256(firstName) as string]
  if (lastName) userData.ln = [sha256(lastName) as string]
  if (ipAddress) userData.client_ip_address = ipAddress
  if (userAgent) userData.client_user_agent = userAgent

  const eventData: Record<string, unknown> = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: userData,
    custom_data: {
      currency: 'USD',
      value: estimatedValue,
      lead_event_source: 'ReCapture',
      content_name: 'Form Abandonment Recovery',
    },
  }
  if (eventSourceUrl) eventData.event_source_url = eventSourceUrl

  const body: Record<string, unknown> = { data: [eventData] }
  if (testEventCode) body.test_event_code = testEventCode

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const result = await res.json()
    if (res.ok && result.events_received) {
      console.log('Meta CAPI success — events_received:', result.events_received, 'fbtrace_id:', result.fbtrace_id)
      return { success: true, events_received: result.events_received, fbtrace_id: result.fbtrace_id }
    }
    console.error('Meta CAPI failed:', res.status, JSON.stringify(result))
    return { success: false, status: res.status, error: result }
  } catch (err) {
    console.error('Meta CAPI error:', err)
    return { success: false, error: String(err) }
  }
}

// ─────────────────────────────────────────────────────────────────
// GOOGLE ADS — Click Conversions Upload via Google Ads API
// ─────────────────────────────────────────────────────────────────
// Uses uploadClickConversions endpoint with hashed user identifiers
// (enhanced conversions for leads). Requires:
// - Developer Token (you, ReCapture's Google Ads MCC)
// - OAuth refresh token (per customer, granted via /api/auth/google-ads)
// - Customer ID (per customer's Google Ads account)

const GOOGLE_ADS_API_VERSION = 'v17'
const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'

async function getGoogleAccessToken(refreshToken: string): Promise<string | null> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    console.error('Google OAuth env vars missing')
    return null
  }
  try {
    const res = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    })
    if (!res.ok) {
      console.error('Google OAuth token refresh failed:', res.status, await res.text())
      return null
    }
    const data = await res.json() as { access_token?: string }
    return data.access_token ?? null
  } catch (err) {
    console.error('Google OAuth token refresh error:', err)
    return null
  }
}

interface GoogleConversionPayload {
  customerId: string           // "1234567890" (no dashes)
  refreshToken: string         // OAuth refresh token from /api/auth/google-ads
  conversionId: string         // "AW-12345678"
  conversionLabel: string      // "abc-DEFGhij_kLmN"
  leadEmail: string | null
  leadPhone: string | null
  estimatedValue: number
  gclid?: string | null
}

export async function sendGoogleConversion(payload: GoogleConversionPayload) {
  const {
    customerId, refreshToken, conversionId, conversionLabel,
    leadEmail, leadPhone, estimatedValue, gclid,
  } = payload

  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  if (!developerToken) {
    console.error('Google Ads skipped — GOOGLE_ADS_DEVELOPER_TOKEN env var missing')
    return { success: false, error: 'missing_developer_token' }
  }

  if (!customerId || !refreshToken || !conversionId || !conversionLabel) {
    console.error('Google Ads skipped — missing required fields')
    return { success: false, error: 'missing_credentials' }
  }

  const accessToken = await getGoogleAccessToken(refreshToken)
  if (!accessToken) {
    return { success: false, error: 'oauth_token_refresh_failed' }
  }

  // Conversion action resource: customers/{customer}/conversionActions/{conversion}
  // Conversion ID format: "AW-12345678" → numeric portion only
  const conversionIdNumeric = conversionId.replace(/^AW-/, '')
  const conversionActionResource = `customers/${customerId}/conversionActions/${conversionIdNumeric}`

  const userIdentifiers: Array<Record<string, string>> = []
  if (leadEmail) userIdentifiers.push({ hashedEmail: sha256(leadEmail) as string })
  if (leadPhone) userIdentifiers.push({ hashedPhoneNumber: hashPhone(leadPhone) as string })

  const conversion: Record<string, unknown> = {
    conversionAction: conversionActionResource,
    conversionDateTime: new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '+00:00'),
    conversionValue: estimatedValue,
    currencyCode: 'USD',
  }
  if (gclid) {
    conversion.gclid = gclid
  } else {
    conversion.userIdentifiers = userIdentifiers
  }

  const url = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:uploadClickConversions`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': developerToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversions: [conversion],
        partialFailure: true,
        validateOnly: false,
      }),
    })
    const result = await res.json()
    if (res.ok) {
      console.log('Google Ads conversion uploaded for customer', customerId, 'label', conversionLabel)
      return { success: true, result }
    }
    console.error('Google Ads upload failed:', res.status, JSON.stringify(result))
    return { success: false, status: res.status, error: result }
  } catch (err) {
    console.error('Google Ads upload error:', err)
    return { success: false, error: String(err) }
  }
}
