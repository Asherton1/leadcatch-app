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
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
<tr><td align="center" style="padding:40px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a0a0a;color:#fff;">

  <tr><td style="padding:0 0 32px 0;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px;">
        <span style="color:#ff6b35;font-weight:800;">[</span><span style="color:#ff6b35;">&#8226;</span><span style="color:#ff6b35;font-weight:800;">]</span>&nbsp;&nbsp;<span style="color:#fff;">Re</span><span style="color:#ff6b35;">Capture</span>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 0 12px 0;">
    <h1 style="font-size:28px;font-weight:700;color:#ff6b35;margin:0;letter-spacing:-0.5px;">Welcome aboard, ${first || 'there'}.</h1>
  </td></tr>
  <tr><td style="padding:0 0 32px 0;">
    <p style="font-size:16px;color:#999;line-height:1.75;margin:0;">Your account is live and ready to start capturing the leads your website has been losing. Below is everything you need to get set up.</p>
  </td></tr>

  <tr><td style="padding:0 0 32px 0;"><div style="height:1px;background:#1e1e1e;"></div></td></tr>

  <tr><td style="padding:0 0 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:12px;">
      <tr><td style="padding:24px;">
        <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px 0;">Your plan</p>
        <p style="font-size:24px;font-weight:700;color:#fff;margin:0 0 6px 0;">${plan === 'essentials' ? 'Essentials' : 'Pro'} — $${plan === 'essentials' ? '197' : '397'}/mo</p>
        <p style="font-size:14px;color:#666;margin:0;line-height:1.6;">7-day free trial active. Your card will not be charged until <strong style="color:#bbb;">${trialEndDate}</strong>.</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 0 12px 0;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#ff6b35;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;letter-spacing:0.5px;">STEP 1</td>
      <td style="padding-left:12px;font-size:15px;font-weight:700;color:#fff;">Install the tracking script</td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:0 0 16px 0;">
    <p style="font-size:14px;color:#888;line-height:1.7;margin:0;">Copy and paste this single line of code into your website. Works on WordPress, Wix, Webflow, Squarespace, or any custom site.</p>
  </td></tr>
  <tr><td style="padding:0 0 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:8px;">
      <tr><td style="padding:16px 20px;font-family:'Courier New',monospace;font-size:13px;color:#22c55e;word-break:break-all;line-height:1.6;">
        &lt;script src=&quot;https://userecapture.com/track.js?key=${apiKey}&quot;&gt;&lt;/script&gt;
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 0 12px 0;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#ff6b35;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;letter-spacing:0.5px;">STEP 2</td>
      <td style="padding-left:12px;font-size:15px;font-weight:700;color:#fff;">Access your dashboard</td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:0 0 16px 0;">
    <p style="font-size:14px;color:#888;line-height:1.7;margin:0;">Your dashboard shows every abandoned lead, their contact info, revenue at risk, and recovery status.</p>
  </td></tr>
  <tr><td style="padding:0 0 32px 0;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#ff6b35;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-align:center;">
        <a href="https://userecapture.com/dashboard" style="color:#fff;text-decoration:none;">Open Your Dashboard</a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 0 12px 0;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#ff6b35;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;letter-spacing:0.5px;">STEP 3</td>
      <td style="padding-left:12px;font-size:15px;font-weight:700;color:#fff;">What to expect</td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:0 0 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:20px;vertical-align:top;">
          <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 6px 0;">Within minutes</p>
          <p style="font-size:13px;color:#888;margin:0;line-height:1.6;">The tracker begins capturing partial form submissions the moment it is installed.</p>
        </td>
        <td width="4%"></td>
        <td width="48%" style="background:#111;border:1px solid #1e1e1e;border-radius:10px;padding:20px;vertical-align:top;">
          <p style="font-size:13px;font-weight:700;color:#ff6b35;margin:0 0 6px 0;">Within 48 hours</p>
          <p style="font-size:13px;color:#888;margin:0;line-height:1.6;">You will see real leads in your dashboard with names, emails, phone numbers, and dollar values.</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 0 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:12px;">
      <tr><td style="padding:24px;">
        <p style="font-size:11px;font-weight:700;color:#ff6b35;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px 0;">Included in your plan</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Real-time partial form capture</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Exit-intent detection</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Lead scoring — hot, warm, cold</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Automated branded recovery emails</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Revenue-at-risk dashboard</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Weekly performance reports</td></tr>
          ${plan !== 'essentials' ? '<tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> Instant SMS alerts</td></tr><tr><td style="padding:6px 0;font-size:13px;color:#bbb;"><span style="color:#22c55e;margin-right:8px;">&#10003;</span> HIPAA-ready with BAA included</td></tr>' : ''}
        </table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 0 32px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:12px;">
      <tr><td style="padding:24px;">
        <p style="font-size:15px;font-weight:700;color:#fff;margin:0 0 8px 0;">Need help getting set up?</p>
        <p style="font-size:14px;color:#888;line-height:1.7;margin:0;">Reply to this email or reach out at <a href="mailto:hello@userecapture.com" style="color:#ff6b35;text-decoration:none;font-weight:600;">hello@userecapture.com</a>. We are based in Dallas and typically respond within a few hours.</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 0 24px 0;"><div style="height:1px;background:#1e1e1e;"></div></td></tr>

  <tr><td style="padding:0 0 8px 0;text-align:center;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>
      <td style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.5px;">
        <span style="color:#ff6b35;font-weight:800;">[</span><span style="color:#ff6b35;">&#8226;</span><span style="color:#ff6b35;font-weight:800;">]</span>&nbsp;&nbsp;<span style="color:#fff;">Re</span><span style="color:#ff6b35;">Capture</span>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="text-align:center;padding:8px 0;">
    <a href="https://userecapture.com" style="color:#666;text-decoration:none;font-size:12px;margin:0 6px;">Website</a>
    <span style="color:#333;">|</span>
    <a href="https://userecapture.com/pricing" style="color:#666;text-decoration:none;font-size:12px;margin:0 6px;">Pricing</a>
    <span style="color:#333;">|</span>
    <a href="https://userecapture.com/why-us" style="color:#666;text-decoration:none;font-size:12px;margin:0 6px;">Why Us</a>
    <span style="color:#333;">|</span>
    <a href="https://userecapture.com/baa" style="color:#666;text-decoration:none;font-size:12px;margin:0 6px;">BAA</a>
    <span style="color:#333;">|</span>
    <a href="https://userecapture.com/blog" style="color:#666;text-decoration:none;font-size:12px;margin:0 6px;">Insights</a>
  </td></tr>
  <tr><td style="text-align:center;padding:12px 0 4px;">
    <span style="font-size:11px;color:#444;">HIPAA Compliant</span>
    <span style="color:#2a2a2a;font-size:11px;margin:0 4px;">|</span>
    <span style="font-size:11px;color:#444;">SSL Secured</span>
    <span style="color:#2a2a2a;font-size:11px;margin:0 4px;">|</span>
    <span style="font-size:11px;color:#444;">Payments by Stripe</span>
    <span style="color:#2a2a2a;font-size:11px;margin:0 4px;">|</span>
    <span style="font-size:11px;color:#444;">Dallas, TX</span>
  </td></tr>
  <tr><td style="text-align:center;padding:4px 0;">
    <p style="font-size:11px;color:#444;margin:0;">Born and Built in Dallas, Texas</p>
  </td></tr>
  <tr><td style="text-align:center;padding:4px 0 0;">
    <p style="font-size:11px;color:#444;margin:0;">hello@userecapture.com</p>
  </td></tr>

</table>
</td></tr>
</table>
`
  })

  // ── Notify Ash of new signup ──
  await resend.emails.send({
    from: 'ReCapture <onboarding@resend.dev>',
    to: 'asherton.c@me.com',
    subject: `New Signup — ${displayName}`,
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
