import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { ensureClient } from '@/lib/provision'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  // ── Parse body ─────────────────────────────────────────────────────────
  let token: string
  let paymentMethodId: string
  let firstName: string | undefined
  let lastName: string | undefined
  let companyName: string | undefined

  try {
    const body = await req.json()

    // Accept token from body (new signup flow) or Authorization header (legacy)
    const authHeader = req.headers.get('authorization')
    token = body.token ?? (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null)

    paymentMethodId = body.paymentMethodId
    firstName   = body.firstName   ?? undefined
    lastName    = body.lastName    ?? undefined
    companyName = body.companyName ?? undefined

    if (!token)           throw new Error('missing token')
    if (!paymentMethodId) throw new Error('missing paymentMethodId')
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Bad request'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  // ── Auth: verify the user's JWT ────────────────────────────────────────
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL    ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  )

  const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // ── Provision client record (get-or-create) ────────────────────────────
  // Pull name fields from body first; fall back to user_metadata from signup
  const meta = user.user_metadata ?? {}
  const first   = firstName   ?? meta.first_name   ?? ''
  const last    = lastName    ?? meta.last_name    ?? ''
  const company = companyName ?? meta.company_name ?? ''

  await ensureClient(
    user.id,
    user.email ?? '',
    first   || undefined,
    last    || undefined,
    company || undefined,
  )

  // ── Create Stripe customer ─────────────────────────────────────────────
  const displayName = company || [first, last].filter(Boolean).join(' ') || user.email

  let customer: Stripe.Customer
  try {
    customer = await stripe.customers.create({
      email:            user.email,
      name:             displayName,
      payment_method:   paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
      metadata:         { supabase_user_id: user.id },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Stripe customer creation failed'
    console.error('[stripe/setup] customer create error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // ── Set trial window (14 days) ─────────────────────────────────────────
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

  // ── Update clients table ───────────────────────────────────────────────
  const { error: dbErr } = await supabase
    .from('clients')
    .update({
      stripe_customer_id: customer.id,
      trial_ends_at:      trialEndsAt,
    })
    .eq('user_id', user.id)

  if (dbErr) {
    console.error('[stripe/setup] DB update error:', dbErr.message)
    // Customer was created in Stripe — log but don't fail the request.
  }

  return NextResponse.json({
    customerId:  customer.id,
    trialEndsAt,
  })
}
