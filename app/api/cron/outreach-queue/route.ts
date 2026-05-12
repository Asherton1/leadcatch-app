import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const RESEND_KEY = process.env.RESEND_API_KEY!
const CRON_SECRET = process.env.CRON_SECRET!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Vercel Hobby max function duration. Needed because 300ms delays + Resend latency
// can push a 50-email run past the default 10s timeout.
export const maxDuration = 60

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Locked outreach signature — used in Day 4 + Day 10 follow-ups.
// Never use 'Ash Chraibi' or personal cell (813) 245-5956 in any outreach.
const SIGNATURE_HTML = `<p>Best,<br/>
Asherton Chraibi<br/>
Founder, ReCapture<br/>
Lost revenue recovery for high-ticket service businesses</p>

<p>(888) 606-0630 — Concierge line<br/>
<a href="mailto:hello@userecapture.com" style="color: #ff6b35;">hello@userecapture.com</a><br/>
<a href="https://userecapture.com" style="color: #ff6b35;">www.userecapture.com</a></p>`

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== 'Bearer ' + CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date().toISOString()
  const results: { sent: number; failed: number; followups_4: number; followups_10: number; errors: string[] } = {
    sent: 0,
    failed: 0,
    followups_4: 0,
    followups_10: 0,
    errors: [],
  }

  // 1. INITIAL SENDS — emails scheduled for now or earlier, status=queued
  const { data: dueSends, error: dueSendsErr } = await supabase
    .from('outreach_queue')
    .select('*')
    .eq('status', 'queued')
    .lte('scheduled_send_at', now)
    .limit(50)

  if (dueSendsErr) {
    results.errors.push('queue read error: ' + dueSendsErr.message)
  }

  for (const item of dueSends || []) {
    try {
      const payload: Record<string, unknown> = {
        from: 'Asherton Chraibi <hello@userecapture.com>',
        to: item.prospect_email,
        subject: item.email_subject,
        html: item.email_body_html,
      }
      if (item.email_cc) {
        payload.cc = item.email_cc
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_KEY,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json() as { id?: string; message?: string }

      if (res.ok && data.id) {
        const sentAt = new Date()
        const day4 = new Date(sentAt.getTime() + 4 * 24 * 60 * 60 * 1000)
        const day10 = new Date(sentAt.getTime() + 10 * 24 * 60 * 60 * 1000)

        await supabase
          .from('outreach_queue')
          .update({
            status: 'sent',
            sent_at: sentAt.toISOString(),
            resend_message_id: data.id,
            follow_up_day_4_scheduled_at: day4.toISOString(),
            follow_up_day_10_scheduled_at: day10.toISOString(),
            updated_at: sentAt.toISOString(),
          })
          .eq('id', item.id)
        results.sent++
      } else {
        await supabase
          .from('outreach_queue')
          .update({
            status: 'failed',
            send_error: data.message || ('HTTP ' + res.status),
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id)
        results.failed++
        results.errors.push(`${item.prospect_email}: ${data.message || res.status}`)
      }
    } catch (err) {
      await supabase
        .from('outreach_queue')
        .update({
          status: 'failed',
          send_error: String(err),
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id)
      results.failed++
      results.errors.push(`${item.prospect_email}: ${String(err)}`)
    }
    // Resend rate limit is 5 req/sec; 300ms delay = ~3.3/sec (safe margin)
    await sleep(300)
  }

  // 2. DAY 4 FOLLOW-UPS — sent items where day 4 is now/past and day 4 hasn't fired and no reply
  const { data: due4 } = await supabase
    .from('outreach_queue')
    .select('*')
    .eq('status', 'sent')
    .is('follow_up_day_4_sent_at', null)
    .is('replied_at', null)
    .lte('follow_up_day_4_scheduled_at', now)
    .limit(50)

  for (const item of due4 || []) {
    try {
      const followupHtml = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">
<p>Hi ${item.prospect_name.split(' ')[0]},</p>

<p>Following up on my note from earlier this week. I know inboxes are brutal — wanted to make sure this didn't get buried.</p>

<p>Quick recap: 60-70% of visitors filling out forms on ${item.prospect_company || 'your site'} never hit submit. ReCapture captures them in real-time so your team can follow up before they go elsewhere.</p>

<p>Open to a 15-minute demo this week? I can show you exactly what your invisible leads look like.</p>

${SIGNATURE_HTML}
</div>`

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_KEY,
        },
        body: JSON.stringify({
          from: 'Asherton Chraibi <hello@userecapture.com>',
          to: item.prospect_email,
          subject: 'Re: ' + item.email_subject,
          html: followupHtml,
        }),
      })

      if (res.ok) {
        await supabase
          .from('outreach_queue')
          .update({
            follow_up_day_4_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id)
        results.followups_4++
      }
    } catch (err) {
      results.errors.push(`day-4 ${item.prospect_email}: ${String(err)}`)
    }
    await sleep(300)
  }

  // 3. DAY 10 FOLLOW-UPS — same logic, longer fuse, breakup-style
  const { data: due10 } = await supabase
    .from('outreach_queue')
    .select('*')
    .eq('status', 'sent')
    .is('follow_up_day_10_sent_at', null)
    .is('replied_at', null)
    .lte('follow_up_day_10_scheduled_at', now)
    .limit(50)

  for (const item of due10 || []) {
    try {
      const breakupHtml = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">
<p>Hi ${item.prospect_name.split(' ')[0]},</p>

<p>Last note from me — I don't want to be a pest.</p>

<p>If form abandonment isn't a priority right now, totally understand. If it ever becomes one, you know where to find me. Otherwise, wishing you the best with ${item.prospect_company || 'the work'}.</p>

${SIGNATURE_HTML}
</div>`

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_KEY,
        },
        body: JSON.stringify({
          from: 'Asherton Chraibi <hello@userecapture.com>',
          to: item.prospect_email,
          subject: 'Re: ' + item.email_subject,
          html: breakupHtml,
        }),
      })

      if (res.ok) {
        await supabase
          .from('outreach_queue')
          .update({
            follow_up_day_10_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id)
        results.followups_10++
      }
    } catch (err) {
      results.errors.push(`day-10 ${item.prospect_email}: ${String(err)}`)
    }
    await sleep(300)
  }

  return NextResponse.json(results)
}
