import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmailForLead } from '@/lib/email'
import { sendSmsAlert } from '@/lib/sms'

// Handle CORS preflight from tracking script on client sites
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    api_key,
    session_id,
    name,
    email,
    phone,
    fields_completed,
    total_fields,
    time_on_form,
    device_type,
    form_data,
  } = body as Record<string, unknown>

  if (!api_key || !session_id) {
    return NextResponse.json({ error: 'api_key and session_id are required' }, { status: 400 })
  }

  // Validate client by api_key
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id, avg_lead_value, active, auto_email_enabled, email_delay_minutes, plan, sms_enabled, sms_phone, slack_webhook_url, retell_agent_id, ai_callback_enabled, webhook_url, business_name, name')
    .eq('api_key', api_key)
    .single()

  if (clientError) {
    if (clientError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    console.error('Client lookup error:', clientError)
    return NextResponse.json(
      { error: 'Database error during client lookup', detail: clientError.message },
      { status: 500 }
    )
  }

  if (!client.active) {
    return NextResponse.json({ error: 'Account inactive' }, { status: 403 })
  }

  const estimated_value = client.avg_lead_value ?? 0

  const payload = {
    client_id: client.id,
    session_id,
    name: name ?? null,
    email: email ?? null,
    phone: phone ?? null,
    fields_completed: Number(fields_completed ?? 0),
    total_fields: Number(total_fields ?? 0),
    time_on_form: Number(time_on_form ?? 0),
    device_type: device_type ?? null,
    estimated_value,
    status: 'abandoned',
    form_data: form_data ?? null,
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .upsert(payload, { onConflict: 'session_id' })
    .select('id')
    .single()

  if (leadError) {
    console.error('Lead upsert error:', {
      message: leadError.message,
      code: leadError.code,
      details: leadError.details,
      hint: leadError.hint,
      payload,
    })
    return NextResponse.json(
      {
        error: 'Failed to store lead',
        detail: leadError.message,
        code: leadError.code,
        hint: leadError.hint,
      },
      { status: 500 }
    )
  }

  // --- SMS ALERT (Pro plan only) ---
  if (
    client.sms_enabled &&
    client.sms_phone &&
    client.plan !== 'essentials' &&
    (name || email || phone)
  ) {
    const { data: existing } = await supabase
      .from('leads')
      .select('sms_sent')
      .eq('id', lead.id)
      .single()

    if (!existing?.sms_sent) {
      try {
        await sendSmsAlert({
          businessPhone: client.sms_phone,
          leadName: (name as string) ?? null,
          leadEmail: (email as string) ?? null,
          leadPhone: (phone as string) ?? null,
          formData: (form_data as Record<string, unknown>) ?? null,
          fieldsCompleted: Number(fields_completed ?? 0),
          totalFields: Number(total_fields ?? 0),
        })
        await supabase
          .from('leads')
          .update({ sms_sent: true, sms_sent_at: new Date().toISOString() })
          .eq('id', lead.id)
      } catch (err) {
        console.error('SMS alert failed for lead', lead.id, err)
      }
    }
  }


  // --- SLACK ALERT ---
  if (name || email || phone) {
    try {
      if (client.slack_webhook_url) {
        const score = Number(fields_completed ?? 0) >= 3 ? 'Hot' : Number(fields_completed ?? 0) >= 2 ? 'Warm' : 'Cold'
        const slackMsg = {
          blocks: [
            {
              type: 'header',
              text: { type: 'plain_text', text: `New Abandoned Lead - ${score}`, emoji: true }
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Name:*\n${name || 'N/A'}` },
                { type: 'mrkdwn', text: `*Email:*\n${email || 'N/A'}` },
                { type: 'mrkdwn', text: `*Phone:*\n${phone || 'N/A'}` },
                { type: 'mrkdwn', text: `*Fields:*\n${fields_completed || 0}/${total_fields || 0}` },
              ]
            },
            {
              type: 'context',
              elements: [
                { type: 'mrkdwn', text: `Captured by ReCapture | ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}` }
              ]
            }
          ]
        }

        const slackRes = await fetch(client.slack_webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMsg),
        })
        const slackText = await slackRes.text()
      }
    } catch (err) {
      console.error('Slack alert failed for lead', lead.id, err)
    }
  }


  // --- OUTBOUND WEBHOOK ---
  if (name || email || phone) {
    try {
      if (client.webhook_url) {
        const webhookPayload = {
          event: 'lead.abandoned',
          timestamp: new Date().toISOString(),
          lead: {
            name: name || null,
            email: email || null,
            phone: phone || null,
            fields_completed: Number(fields_completed ?? 0),
            total_fields: Number(total_fields ?? 0),
            time_on_form: Number(time_on_form ?? 0),
            device_type: device_type || null,
            score: Number(fields_completed ?? 0) >= 3 ? 'hot' : Number(fields_completed ?? 0) >= 2 ? 'warm' : 'cold',
            estimated_value: estimated_value,
            form_data: form_data || null,
          }
        }

        await fetch(client.webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        })
      }
    } catch (err) {
      console.error('Outbound webhook failed for lead', lead.id, err)
    }
  }

  // --- AUTO-RECOVERY EMAIL ---

    // AI Voice Callback (Retell)
    if (client.ai_callback_enabled && phone && process.env.RETELL_API_KEY) {
      try {
        const agentId = client.retell_agent_id || 'agent_f0c3170df59b32221bfebd7c7f'
        const phoneClean = String(phone).replace(/[^+\d]/g, '')
        const toNumber = phoneClean.startsWith('+') ? phoneClean : '+1' + String(phone).replace(/[^\d]/g, '')
        const retellRes = await fetch('https://api.retellai.com/v2/create-phone-call', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + process.env.RETELL_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from_number: '+18886060630',
            to_number: toNumber,
            agent_id: agentId,
            retell_llm_dynamic_variables: {
              business_name: client.business_name || client.name || 'our office',
              lead_name: (name as string) || 'there',
            },
          }),
        })
        const retellResult = await retellRes.json()
        console.error('Retell call triggered for lead', lead.id, retellResult.call_id || 'no-id')
      } catch (err) {
        console.error('Retell callback failed for lead', lead.id, err)
      }
    }

  if (client.auto_email_enabled && email && client.plan !== 'essentials') {
    const delayMinutes = client.email_delay_minutes ?? 0

    if (delayMinutes > 0) {
      const sendAfter = new Date(Date.now() + delayMinutes * 60 * 1000).toISOString()
      supabase
        .from('leads')
        .update({ email_send_after: sendAfter })
        .eq('id', lead.id)
        .is('email_send_after', null)
        .then(({ error }) => {
          if (error) console.error('Failed to schedule email for lead', lead.id, error.message)
        })
    } else {
      sendEmailForLead(lead.id).catch(err =>
        console.error('Auto email failed for lead', lead.id, err)
      )
    }
  }

  return NextResponse.json(
    { success: true, lead_id: lead.id },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}
