import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-03-25.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
)

export async function POST(req: NextRequest) {
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

    default:
      console.log('[webhook] Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
