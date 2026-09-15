import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = isEmail(body.email) ? (body.email as string).trim() : ''
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  // honeypot
  if (typeof body.hp === 'string' && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const platforms = Array.isArray(body.platforms)
    ? body.platforms.filter((p): p is string => typeof p === 'string').slice(0, 8)
    : []

  const { error } = await supabaseAdmin.from('audit_requests').insert({
    name,
    email,
    business: typeof body.business === 'string' ? body.business.trim() || null : null,
    website: typeof body.website === 'string' ? body.website.trim() || null : null,
    platforms,
    monthly_spend: typeof body.monthlySpend === 'string' ? body.monthlySpend : null,
    concern: typeof body.concern === 'string' ? body.concern.trim() || null : null,
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    user_agent: request.headers.get('user-agent'),
  })

  if (error) {
    console.error('[audit-request] insert failed:', error)
    return NextResponse.json({ error: 'Could not save' }, { status: 500 })
  }

  // Alert by SMS. Resend is unavailable, and a text reaches me faster anyway.
  try {
    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    const from = process.env.TWILIO_PHONE_NUMBER
    const to = process.env.AUDIT_ALERT_PHONE

    if (sid && token && from && to) {
      const lines = [
        'Audit request',
        `${name}${body.business ? ' \u00b7 ' + body.business : ''}`,
        email,
        platforms.length ? platforms.join(', ') : 'platforms not given',
        typeof body.monthlySpend === 'string' && body.monthlySpend ? body.monthlySpend : 'spend not given',
      ]
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ From: from, To: to, Body: lines.join('\n') }),
      })
    }
  } catch (e) {
    console.error('[audit-request] alert failed:', e)
  }

  return NextResponse.json({ ok: true })
}
