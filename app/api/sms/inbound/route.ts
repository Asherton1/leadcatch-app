import { NextRequest, NextResponse } from 'next/server'
import { handleFinishReply, isStop } from '@/lib/finish-anywhere'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Twilio posts inbound texts here.
 *
 * Two jobs: honour STOP on every message regardless of context, and pass
 * anything else to the Finish Anywhere session if one is open. Replies are
 * returned as TwiML so Twilio sends them from the same number.
 */

function twiml(message: string | null) {
  const body = message
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</Message></Response>`
    : '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const from = String(form.get('From') ?? '').trim()
    const body = String(form.get('Body') ?? '').trim()

    if (!from) return twiml(null)

    // STOP always wins, whatever else is going on. This goes to the same
    // do-not-contact list that suppresses email, SMS and voice together.
    if (isStop(body)) {
      try {
        // The list is scoped per client, so find whose session this is first.
        const { data: sess } = await supabaseAdmin
          .from('finish_sessions')
          .select('client_id')
          .eq('phone_e164', from)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (sess?.client_id) {
          await supabaseAdmin.from('do_not_contact').insert({
            client_id: sess.client_id,
            identifier_type: 'phone',
            identifier_value: from,
            opted_out_at: new Date().toISOString(),
            source: 'sms_stop',
            notes: 'Replied STOP to a Finish Anywhere message',
          })
        } else {
          // No session to attribute it to. Suppress across every client rather
          // than risk messaging them again from somewhere else.
          const { data: clients } = await supabaseAdmin.from('clients').select('id')
          if (clients?.length) {
            await supabaseAdmin.from('do_not_contact').insert(
              clients.map(c => ({
                client_id: c.id,
                identifier_type: 'phone',
                identifier_value: from,
                opted_out_at: new Date().toISOString(),
                source: 'sms_stop',
                notes: 'Replied STOP with no active session',
              }))
            )
          }
        }
      } catch (e) {
        console.error('[sms-inbound] dnc write failed:', e)
      }
    }

    const reply = await handleFinishReply(from, body)
    return twiml(reply)
  } catch (e) {
    console.error('[sms-inbound] handler error:', e)
    return twiml(null)
  }
}
