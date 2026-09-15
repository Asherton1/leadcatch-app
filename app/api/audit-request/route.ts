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

  return NextResponse.json({ ok: true })
}
