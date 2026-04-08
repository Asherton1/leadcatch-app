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
  let plan: string = 'pro'

  try {
    const body = await req.json()
    const authHeader = req.headers.get('authorization')
    token = body.token ?? (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null)
    paymentMethodId = body.paymentMethodId
    firstName   = body.firstName   ?? undefined
    lastName    = body.lastName    ?? undefined
    companyName = body.companyName ?? undefined
    plan = body.plan === 'essentials' ? 'essentials' : 'pro'
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

  // ── Create subscription with 7-day trial ──
  let subscription: Stripe.Subscription
  try {
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan === 'essentials' ? process.env.STRIPE_PRICE_ID_ESSENTIALS! : process.env.STRIPE_PRICE_ID! }],
      trial_period_days: 7,
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: { supabase_user_id: user.id },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Subscription creation failed'
    console.error('[stripe/setup] subscription error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  const trialEndsAt = subscription.trial_end
    ? new Date(subscription.trial_end * 1000).toISOString()
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const { error: dbErr } = await supabase
    .from('clients')
    .update({
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      plan,
      trial_ends_at: trialEndsAt,
    })
    .eq('user_id', user.id)

  if (dbErr) console.error('[stripe/setup] DB update error:', dbErr.message)

  // ── Get API key for onboarding email ──
  const { data: clientRow } = await supabase
    .from('clients')
    .select('api_key')
    .eq('user_id', user.id)
    .single()

  const apiKey = clientRow?.api_key ?? 'Check your dashboard'
  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  // ── Send onboarding email ──
  await resend.emails.send({
    from: 'ReCapture <hello@userecapture.com>',
    to: user.email!,
    subject: `Welcome to ReCapture — Let's Get You Set Up`,
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;font-family:'Inter',-apple-system,sans-serif;">
      <tr><td align="center" style="padding:20px 10px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0a0a;color:#fff;">

        <!-- Header -->
        <tr><td style="padding:0 0 8px 0;">
          <img src="https://userecapture.com/logo-email.svg" alt="ReCapture" width="140" height="32" style="display:block;" />
        </td></tr>

        <!-- Welcome -->
        <tr><td style="padding:24px 0 8px 0;">
          <h1 style="font-size:26px;font-weight:700;color:#ff6b35;margin:0 0 12px 0;">Welcome aboard, ${first || 'there'}.</h1>
          <p style="font-size:15px;color:#888;line-height:1.7;margin:0;">Your account is live. Here's everything you need to start capturing the leads your website has been losing.</p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:24px 0;"><hr style="border:none;height:1px;background:#1e1e1e;margin:0;" /></td></tr>

        <!-- Step 1: Your Plan -->
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;">
            <tr><td style="padding:20px;">
              <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px 0;">Your Plan</p>
              <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 4px 0;">${plan === 'essentials' ? 'Essentials' : 'Pro'} — $${plan === 'essentials' ? '150' : '200'}/mo</p>
              <p style="font-size:13px;color:#666;margin:0;">7-day free trial active. Your card won't be charged until <strong style="color:#ccc;">${trialEndDate}</strong>.</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Step 2: Install -->
        <tr><td style="padding:0 0 8px 0;">
          <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Step 1 — Install the tracker</p>
          <p style="font-size:14px;color:#aaa;line-height:1.7;margin:0 0 12px 0;">Copy and paste this one line of code into your website, right before the closing <span style="font-family:monospace;color:#4a9eff;">&lt;/body&gt;</span> tag. Works on WordPress, Wix, Webflow, Squarespace, or any custom site.</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:8px;">
            <tr><td style="padding:14px 16px;font-family:monospace;font-size:12px;color:#4a9eff;word-break:break-all;">
              &lt;script src="https://userecapture.com/track.js?key=${apiKey}"&gt;&lt;/script&gt;
            </td></tr>
          </table>
        </td></tr>

        <!-- Step 3: What to expect -->
        <tr><td style="padding:0 0 8px 0;">
          <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0;">Step 2 — What to expect</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 4px 0;">Within minutes</p>
                <p style="font-size:12px;color:#666;margin:0;line-height:1.6;">The tracker starts capturing partial form submissions as soon as it's installed.</p>
              </td>
              <td width="4%"></td>
              <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 4px 0;">Within 48 hours</p>
                <p style="font-size:12px;color:#666;margin:0;line-height:1.6;">You'll see real leads in your dashboard — names, emails, and phone numbers of people who abandoned your form.</p>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 4px 0;">Every Monday</p>
                <p style="font-size:12px;color:#666;margin:0;line-height:1.6;">You'll receive a weekly report with leads captured, revenue at risk, and recovery metrics.</p>
              </td>
              <td width="4%"></td>
              <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 4px 0;">${plan !== 'essentials' ? 'Automated recovery' : 'Manual follow-up'}</p>
                <p style="font-size:12px;color:#666;margin:0;line-height:1.6;">${plan !== 'essentials' ? 'ReCapture will automatically email abandoned leads on your behalf to bring them back.' : 'Use your dashboard to follow up with every lead via email or phone call.'}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Your API Key -->
        <tr><td style="padding:0 0 8px 0;">
          <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Your API Key</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:8px;">
            <tr><td style="padding:14px 16px;font-family:monospace;font-size:14px;color:#fff;word-break:break-all;">
              ${apiKey}
            </td></tr>
          </table>
        </td></tr>

        <!-- Login credentials -->
        <tr><td style="padding:0 0 8px 0;">
          <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px 0;">Your Login</p>
        </td></tr>
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:8px;">
            <tr><td style="padding:14px 16px;">
              <p style="font-size:13px;color:#888;margin:0 0 4px 0;">Dashboard: <a href="https://userecapture.com/login" style="color:#4a9eff;text-decoration:none;">userecapture.com/login</a></p>
              <p style="font-size:13px;color:#888;margin:0;">Email: <span style="color:#fff;">${user.email}</span></p>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="text-align:center;padding:8px 0 24px 0;">
          <a href="https://userecapture.com/dashboard" style="display:inline-block;background:#ff6b35;color:#000;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px;">Open Your Dashboard</a>
        </td></tr>

        <!-- Support -->
        <tr><td style="padding:0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-left:3px solid #ff6b35;border-radius:0 8px 8px 0;">
            <tr><td style="padding:16px 20px;">
              <p style="font-size:14px;font-weight:700;color:#fff;margin:0 0 4px 0;">Need help getting set up?</p>
              <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">Reply to this email or reach us at <a href="mailto:hello@userecapture.com" style="color:#ff6b35;text-decoration:none;">hello@userecapture.com</a>. We'll walk you through the installation personally.</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="border-top:1px solid #1e1e1e;padding:20px 0 0 0;text-align:center;">
          <span style="color:#444;font-size:12px;">ReCapture · Born & Built in Dallas, Texas</span>
        </td></tr>

      </table>
      </td></tr>
      </table>
    `,
  })

  // ── Notify Ash of new signup ──
  await resend.emails.send({
    from: 'ReCapture <onboarding@resend.dev>',
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
