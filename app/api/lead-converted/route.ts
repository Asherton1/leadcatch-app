import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendMetaConversion, sendGoogleConversion } from '@/lib/ad-conversions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { lead_id, converted_value } = await request.json()

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id required' }, { status: 400 })
    }

    const value = Number(converted_value ?? 0)
    if (!value || value <= 0) {
      return NextResponse.json({ error: 'converted_value must be greater than zero' }, { status: 400 })
    }

    // Load the lead and its client
    const { data: lead, error: leadErr } = await supabase
      .from('leads')
      .select('id, client_id, session_id, name, email, phone, purchase_conversion_sent')
      .eq('id', lead_id)
      .single()

    if (leadErr || !lead) {
      return NextResponse.json({ error: 'lead not found' }, { status: 404 })
    }

    // Always record the value, even if we cannot dispatch conversions
    await supabase
      .from('leads')
      .update({ converted_value: value, status: 'converted' })
      .eq('id', lead_id)

    if (lead.purchase_conversion_sent) {
      return NextResponse.json({ success: true, already_sent: true })
    }

    const { data: client } = await supabase
      .from('clients')
      .select('meta_capi_enabled, meta_pixel_id, meta_access_token, meta_test_event_code, google_ads_enabled, google_ads_customer_id, google_ads_conversion_id, google_ads_conversion_label, google_ads_refresh_token')
      .eq('id', lead.client_id)
      .single()

    if (!client) {
      return NextResponse.json({ success: true, dispatched: false })
    }

    const jobs: Promise<unknown>[] = []

    if (client.meta_capi_enabled && client.meta_pixel_id && client.meta_access_token) {
      jobs.push(
        sendMetaConversion({
          pixelId: client.meta_pixel_id,
          accessToken: client.meta_access_token,
          testEventCode: client.meta_test_event_code,
          leadEmail: lead.email,
          leadPhone: lead.phone,
          leadName: lead.name,
          estimatedValue: value,
          eventName: 'Purchase',
          sessionId: lead.session_id,
        }).catch(e => console.error('Meta purchase dispatch failed', lead.id, e))
      )
    }

    if (
      client.google_ads_enabled &&
      client.google_ads_customer_id &&
      client.google_ads_conversion_id &&
      client.google_ads_conversion_label &&
      client.google_ads_refresh_token
    ) {
      jobs.push(
        sendGoogleConversion({
          customerId: client.google_ads_customer_id,
          refreshToken: client.google_ads_refresh_token,
          conversionId: client.google_ads_conversion_id,
          conversionLabel: client.google_ads_conversion_label,
          leadEmail: lead.email,
          leadPhone: lead.phone,
          estimatedValue: value,
        }).catch(e => console.error('Google purchase dispatch failed', lead.id, e))
      )
    }

    if (jobs.length > 0) {
      await Promise.allSettled(jobs)
      await supabase
        .from('leads')
        .update({ purchase_conversion_sent: true })
        .eq('id', lead_id)
    }

    return NextResponse.json({ success: true, dispatched: jobs.length > 0, value })
  } catch (err) {
    console.error('lead-converted error', err)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
