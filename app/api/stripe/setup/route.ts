import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { ensureClient } from '@/lib/provision'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
  })

  let token: string
  let paymentMethodId: string
  let firstName: string | undefined
  let lastName: string | undefined
  let companyName: string | undefined

  try {
    const body = await req.json()
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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL    ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  )

  const { data: { user }, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

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

  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

  const { error: dbErr } = await supabase
    .from('clients')
    .update({ stripe_customer_id: customer.id, trial_ends_at: trialEndsAt })
    .eq('user_id', user.id)

  if (dbErr) console.error('[stripe/setup] DB update error:', dbErr.message)

  // ── Get API key for onboarding email ──
  const { data: clientRow } = await supabase
    .from('clients')
    .select('api_key')
    .eq('user_id', user.id)
    .single()

  const apiKey = clientRow?.api_key ?? 'Check your dashboard'
  const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  // ── Send onboarding email ──
  await resend.emails.send({
    from: 'ReCapture <hello@userecapture.com>',
    to: user.email!,
    subject: `Welcome to ReCapture — Here's Your Setup Guide`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #ff6b35; font-size: 28px; margin-bottom: 8px;">Welcome to ReCapture</h1>
        <p style="color: #aaa; font-size: 16px; margin-bottom: 32px;">Hi ${first || 'there'}, you're all set. Here's everything you need to start recovering lost leads.</p>

        <h2 style="font-size: 18px; color: #fff; margin-bottom: 12px;">Your API Key</h2>
        <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 14px; color: #ff6b35; margin-bottom: 32px;">
          ${apiKey}
        </div>

        <h2 style="font-size: 18px; color: #fff; margin-bottom: 12px;">Install the Tracker</h2>
        <p style="color: #aaa; margin-bottom: 12px;">Paste this script tag into your website's HTML — just before the closing &lt;/body&gt; tag:</p>
        <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; color: #4a9eff; margin-bottom: 32px;">
          &lt;script src="https://userecapture.com/track.js?key=${apiKey}"&gt;&lt;/script&gt;
        </div>

        <h2 style="font-size: 18px; color: #fff; margin-bottom: 12px;">What Happens Next</h2>
        <ul style="color: #aaa; font-size: 15px; line-height: 1.8; padding-left: 20px; margin-bottom: 32px;">
          <li>Install the script on any page with a contact form</li>
          <li>Partial submissions appear in your dashboard within minutes</li>
          <li>Follow up directly with every lead you would have lost</li>
        </ul>

        <div style="background: #1a1a1a; border-left: 3px solid #ff6b35; border-radius: 0 8px 8px 0; padding: 16px; margin-bottom: 32px;">
          <p style="color: #fff; font-weight: 700; margin-bottom: 4px;">🔒 Free Trial Active</p>
          <p style="color: #aaa; font-size: 14px; margin: 0;">Your card will be charged $200/month on <strong style="color: #fff;">${trialEndDate}</strong>. Cancel anytime before then.</p>
        </div>

        <a href="https://userecapture.com/dashboard" style="display: inline-block; background: #ff6b35; color: #000; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">Go to Your Dashboard →</a>

        <p style="color: #444; font-size: 13px; margin-top: 40px;">ReCapture · Born & Built in Dallas, Texas 🤘</p>
      </div>
    `,
  })

  // ── Notify Ash of new signup ──
  await resend.emails.send({
    from: 'ReCapture <hello@userecapture.com>',
    to: 'asherton.c@me.com',
    subject: `🚀 New Signup — ${displayName}`,
    html: `
      <h2>New ReCapture Signup</h2>
      <p><strong>Name:</strong> ${displayName}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Trial ends:</strong> ${trialEndDate}</p>
      <p><strong>Stripe Customer:</strong> ${customer.id}</p>
    `,
  })

  return NextResponse.json({ customerId: customer.id, trialEndsAt })
}
