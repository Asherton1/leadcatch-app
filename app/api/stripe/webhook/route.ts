import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

// Enterprise price ID → plan tier mapping
const ENTERPRISE_PRICE_MAP: Record<string, { tier: string; name: string; price: number }> = {
  'price_1TSN1bQlw53EpkIRAhTlUQaA': { tier: 'enterprise_starter', name: 'Enterprise Starter', price: 1997 },
  'price_1TSN2QQlw53EpkIRpPdPfQrz': { tier: 'enterprise_growth',  name: 'Enterprise Growth',  price: 3997 },
  'price_1TSN39Qlw53EpkIRaxpQYNqS': { tier: 'enterprise_scale',   name: 'Enterprise Scale',   price: 7997 },
  'price_1TSN3lQlw53EpkIRoWL8F2aj': { tier: 'enterprise_custom',  name: 'Enterprise Custom',  price: 15000 },
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
  })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook verification failed'
    console.error('[webhook] Signature verification failed:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  switch (event.type) {
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
      if (customerId) {
        await supabase
          .from('clients')
          .update({ active: true, last_payment_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)
        console.log('[webhook] Payment succeeded for customer:', customerId)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
      if (customerId) {
        await supabase
          .from('clients')
          .update({ active: false })
          .eq('stripe_customer_id', customerId)
        console.log('[webhook] Payment FAILED for customer:', customerId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id
      if (customerId) {
        await supabase
          .from('clients')
          .update({ active: false })
          .eq('stripe_customer_id', customerId)
        console.log('[webhook] Subscription canceled for customer:', customerId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id
      if (customerId) {
        const isActive = subscription.status === 'active' || subscription.status === 'trialing'
        await supabase
          .from('clients')
          .update({ active: isActive })
          .eq('stripe_customer_id', customerId)
        console.log('[webhook] Subscription updated for customer:', customerId, 'status:', subscription.status)
      }
      break
    }

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Only handle subscription checkouts with a price match in our enterprise map
      if (session.mode !== 'subscription' || !session.subscription) {
        console.log('[webhook] Skipping non-subscription checkout:', session.id)
        break
      }

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
      const priceId = subscription.items.data[0]?.price.id
      const tierInfo = priceId ? ENTERPRISE_PRICE_MAP[priceId] : null

      if (!tierInfo) {
        console.log('[webhook] Checkout completed but price not in enterprise map:', priceId)
        break
      }

      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
      const customerEmail = session.customer_details?.email || session.customer_email
      const customerName = session.customer_details?.name || ''
      const locationsField = session.custom_fields?.find(f => f.key === 'numberoflocations')
      const numLocations = locationsField?.numeric?.value || 'unspecified'

      if (!customerId || !customerEmail) {
        console.error('[webhook] Enterprise checkout missing customer info')
        break
      }

      // Generate a random API key for this enterprise client
      const apiKey = 'ent_' + Math.random().toString(36).slice(2, 18) + Math.random().toString(36).slice(2, 18)

      // Insert into clients table
      const { data: newClient, error: insertErr } = await supabase
        .from('clients')
        .insert({
          stripe_customer_id: customerId,
          email: customerEmail,
          name: customerName || customerEmail,
          company_name: customerName || customerEmail,
          plan: tierInfo.tier,
          active: true,
          api_key: apiKey,
          last_payment_at: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (insertErr) {
        console.error('[webhook] Failed to insert enterprise client:', insertErr)
        break
      }

      console.log('[webhook] Enterprise client created:', newClient?.id, tierInfo.tier)

      // Send branded welcome email + internal notification (non-blocking)
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Customer welcome
      try {
        await resend.emails.send({
          from: 'Ash from ReCapture <hello@userecapture.com>',
          to: customerEmail,
          replyTo: 'hello@userecapture.com',
          subject: 'Welcome to ReCapture ' + tierInfo.name,
          html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Inter',sans-serif;color:#fff;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 0 24px;"><span style="font-size:18px;font-weight:700;color:#fff;"><span style="color:#ff6b35;">[•]</span> Re<span style="color:#ff6b35;">Capture</span></span></td></tr>
<tr><td style="padding:0 0 8px;"><p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;color:#ff6b35;text-transform:uppercase;">Welcome to Enterprise</p></td></tr>
<tr><td style="padding:0 0 24px;"><h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;line-height:1.3;letter-spacing:-0.02em;">Thanks for joining ReCapture, ${customerName || 'partner'}.</h1></td></tr>
<tr><td style="padding:0 0 24px;"><p style="margin:0;font-size:15px;color:#aaa;line-height:1.7;">Your ${tierInfo.name} subscription is active. I'll personally be in touch within one business day to begin your white-glove onboarding.</p></td></tr>
<tr><td style="padding:0 0 24px;"><p style="margin:0 0 12px;font-size:14px;color:#888;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">What happens next</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #222;border-radius:8px;padding:16px 20px;"><tr><td>
<p style="margin:0 0 8px;font-size:14px;color:#fff;"><strong>Day 1.</strong> I send you a kickoff call invite.</p>
<p style="margin:0 0 8px;font-size:14px;color:#fff;"><strong>Day 2-3.</strong> We map your locations, integrations, and reporting needs.</p>
<p style="margin:0 0 8px;font-size:14px;color:#fff;"><strong>Day 4-7.</strong> Install your tracking script across all locations.</p>
<p style="margin:0;font-size:14px;color:#fff;"><strong>Day 8.</strong> First leads start flowing into your dashboard.</p>
</td></tr></table></td></tr>
<tr><td style="padding:0 0 16px;"><p style="margin:0;font-size:14px;color:#aaa;">Questions before we kick off? Just reply to this email — I read every message personally.</p></td></tr>
<tr><td style="padding:24px 0 0;border-top:1px solid #222;"><p style="margin:0;font-size:14px;color:#fff;font-weight:600;">Ash</p><p style="margin:4px 0 0;font-size:13px;color:#888;">Founder, ReCapture</p><p style="margin:4px 0 0;font-size:13px;color:#ff6b35;">userecapture.com</p></td></tr>
</table></td></tr></table></body></html>`,
        })
        console.log('[webhook] Welcome email sent to:', customerEmail)
      } catch (emailErr) {
        console.error('[webhook] Welcome email failed:', emailErr)
      }

      // Internal notification to Ash
      try {
        await resend.emails.send({
          from: 'ReCapture Alerts <hello@userecapture.com>',
          to: 'hello@userecapture.com',
          replyTo: customerEmail,
          subject: '🎉 NEW ENTERPRISE CUSTOMER: ' + (customerName || customerEmail) + ' — ' + tierInfo.name,
          html: `<div style="font-family:Inter,sans-serif;max-width:600px;background:#0a0a0a;color:#fff;padding:32px;">
<h2 style="color:#ff6b35;margin:0 0 24px;">New Enterprise Customer</h2>
<table style="width:100%;border-collapse:collapse;">
<tr><td style="padding:12px 0;color:#888;width:140px;">Tier</td><td style="padding:12px 0;color:#fff;font-weight:600;">${tierInfo.name}</td></tr>
<tr><td style="padding:12px 0;color:#888;">MRR</td><td style="padding:12px 0;color:#ff6b35;font-weight:600;">$${tierInfo.price.toLocaleString()}/mo</td></tr>
<tr><td style="padding:12px 0;color:#888;">Customer</td><td style="padding:12px 0;color:#fff;">${customerName || '(no name)'}</td></tr>
<tr><td style="padding:12px 0;color:#888;">Email</td><td style="padding:12px 0;color:#fff;">${customerEmail}</td></tr>
<tr><td style="padding:12px 0;color:#888;">Locations</td><td style="padding:12px 0;color:#fff;">${numLocations}</td></tr>
<tr><td style="padding:12px 0;color:#888;">Stripe ID</td><td style="padding:12px 0;color:#aaa;font-family:monospace;font-size:12px;">${customerId}</td></tr>
<tr><td style="padding:12px 0;color:#888;">Client ID</td><td style="padding:12px 0;color:#aaa;font-family:monospace;font-size:12px;">${newClient?.id || 'failed'}</td></tr>
</table>
<p style="margin:24px 0 0;color:#ccc;">Reply to this email to reach the customer directly.</p>
<p style="margin:8px 0 0;color:#888;font-size:13px;">White-glove onboarding starts now. Send the kickoff call invite within 24 hours.</p>
</div>`,
        })
        console.log('[webhook] Internal notification sent')
      } catch (notifyErr) {
        console.error('[webhook] Internal notification failed:', notifyErr)
      }

      break
    }

    default:
      console.log('[webhook] Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
