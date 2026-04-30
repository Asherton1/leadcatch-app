import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')  // contains client_id (our internal one)
  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL(`/settings?google_ads_error=${encodeURIComponent(error)}`, req.url))
  }
  if (!code || !state) {
    return NextResponse.redirect(new URL('/settings?google_ads_error=missing_code_or_state', req.url))
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || `${url.origin}/api/auth/google-ads/callback`

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/settings?google_ads_error=server_misconfigured', req.url))
  }

  try {
    const tokenRes = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })
    if (!tokenRes.ok) {
      const errBody = await tokenRes.text()
      console.error('Google OAuth code exchange failed:', tokenRes.status, errBody)
      return NextResponse.redirect(new URL(`/settings?google_ads_error=token_exchange_failed`, req.url))
    }
    const tokenData = await tokenRes.json() as {
      access_token: string
      refresh_token?: string
      expires_in: number
    }

    if (!tokenData.refresh_token) {
      // Google only returns refresh_token on first grant. If user re-auths,
      // they need to revoke the previous grant first.
      return NextResponse.redirect(new URL('/settings?google_ads_error=no_refresh_token_revoke_first', req.url))
    }

    // state = our internal client UUID
    const { error: dbErr } = await supabaseAdmin
      .from('clients')
      .update({
        google_ads_refresh_token: tokenData.refresh_token,
        google_ads_oauth_connected: true,
        google_ads_oauth_connected_at: new Date().toISOString(),
      })
      .eq('id', state)

    if (dbErr) {
      console.error('Google OAuth DB save error:', dbErr)
      return NextResponse.redirect(new URL('/settings?google_ads_error=db_save_failed', req.url))
    }

    return NextResponse.redirect(new URL('/settings?google_ads_connected=1', req.url))
  } catch (err) {
    console.error('Google OAuth callback error:', err)
    return NextResponse.redirect(new URL('/settings?google_ads_error=callback_failed', req.url))
  }
}
