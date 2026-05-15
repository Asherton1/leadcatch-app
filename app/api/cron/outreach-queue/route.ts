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

// Get day of week (0=Sun, 6=Sat) in America/Chicago timezone
function getChicagoDOW(date: Date): number {
  const day = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short'
  }).format(date)
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return map[day] ?? 0
}

// Push date to next weekday if it lands on Sat/Sun (Chicago time)
function nextWeekday(date: Date): Date {
  const d = new Date(date.getTime())
  const dow = getChicagoDOW(d)
  if (dow === 6) d.setUTCDate(d.getUTCDate() + 2)  // Sat -> Mon
  else if (dow === 0) d.setUTCDate(d.getUTCDate() + 1)  // Sun -> Mon
  return d
}

// Forwarding PS for Day 4 + Day 10 follow-ups.
function psHtml(company: string | null | undefined): string {
  const c = company || 'your team'
  return `<p style="color: #888; font-size: 13px; font-style: italic; margin-top: 28px; line-height: 1.5;">P.S. If you're not the right person at ${c}, a quick forward to whoever handles your website or marketing would mean a lot. Thanks either way.</p>`
}

// Vertical-specific Day 4 follow-up templates. firstName + company injected at runtime.
// Falls back to generic copy if vertical is unknown or null.
function getDay4Html(vertical: string | null | undefined, firstName: string, company: string | null | undefined): string {
  const c = company || 'your site'
  const wrapperOpen = '<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">'

  switch (vertical) {
    case 'Multifamily':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week. Inboxes are brutal — wanted to make sure this didn't get buried.</p>

<p>Quick recap: 70% of leasing inquiries on ${c}'s site get abandoned before submit. ReCapture captures every started-but-not-submitted inquiry and pushes it into AppFolio (or Yardi, Buildium, RentCafe) via webhook within 60 seconds.</p>

<p>For a 200-unit portfolio that's typically 50+ extra qualified prospects feeding the leasing pipeline every month — without changing your stack.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Med Spa':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week — wanted to make sure it didn't get buried.</p>

<p>Quick recap: 67% of consultation forms on ${c}'s site get abandoned before submit. ReCapture captures every consultation that didn't finish and pushes it into Boulevard (or Mindbody, Aesthetic Record, Vagaro) within 60 seconds.</p>

<p>At a $2,800 average first treatment, even a 10% recovery rate is typically $30K-$80K in monthly bookings.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Luxury Real Estate':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week. Inboxes are brutal mid-week.</p>

<p>Quick recap: 71% of buyer inquiries on ${c}'s site or IDX listings get abandoned before submit. ReCapture captures every inquiry and pushes it into Follow Up Boss (or your CRM) within 60 seconds, with an SMS to the assigned agent.</p>

<p>At your average price point, even one recovered buyer per month is six figures in commission.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Cosmetic Dental':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week.</p>

<p>Quick recap: 67% of cosmetic consultation forms on ${c}'s site get abandoned before submit. ReCapture captures every veneer, implant, or smile-makeover inquiry and pushes it into your practice management software via webhook, with a HIPAA-compliant AI voice callback within 60 seconds. BAA available.</p>

<p>At $4K-$50K per case, even one recovered patient per month moves the needle.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Plastic Surgery':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week.</p>

<p>Quick recap: 67% of consultation forms on ${c}'s site get abandoned before submit. ReCapture captures every rhinoplasty, breast, or body-contouring inquiry and pushes it into Nextech (or your PMS) via webhook, with a HIPAA-compliant AI voice callback within 60 seconds. BAA available.</p>

<p>At $8K-$30K per procedure, even one recovered patient per month is six figures in surgical revenue.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Dermatology':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week.</p>

<p>Quick recap: 67% of cosmetic consultation forms on ${c}'s site get abandoned before submit. ReCapture captures every Botox, laser, or aesthetic-treatment inquiry and pushes it into Nextech (or your PMS) via webhook, with a HIPAA-compliant AI voice callback within 60 seconds. BAA available.</p>

<p>For practices running paid ads to cosmetic landing pages, this typically recovers 15-30 additional qualified consultations per month.</p>

<p>Worth a 15-min walkthrough this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    default:
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Following up on my note from earlier this week. Inboxes are brutal — wanted to make sure this didn't get buried.</p>

<p>Quick recap: 60-70% of visitors filling out forms on ${c} never hit submit. ReCapture captures them in real-time so your team can follow up before they go elsewhere.</p>

<p>Open to a 15-minute demo this week?</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`
  }
}

// Vertical-specific Day 10 breakup templates. Same dispatch pattern as Day 4.
function getDay10Html(vertical: string | null | undefined, firstName: string, company: string | null | undefined): string {
  const c = company || 'the work'
  const wrapperOpen = '<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">'

  switch (vertical) {
    case 'Multifamily':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note — won't keep pestering.</p>

<p>If pipeline recovery isn't a priority right now, totally understand. If you ever want to see how much paid ad spend is disappearing into bounce-rate on ${c}'s leasing pages, you know where to find me.</p>

<p>Otherwise, wishing you strong leasing momentum heading into summer.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Med Spa':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note from me.</p>

<p>If consultation recovery isn't a priority right now, totally get it. If you ever want to see how much Meta or Google spend is bouncing off ${c} without converting, the door's open.</p>

<p>Otherwise, wishing you a strong rest of the year.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Luxury Real Estate':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note — won't keep bumping.</p>

<p>If lead recovery isn't a priority right now, totally understand. If it becomes one — especially heading into peak buyer season — you know where to find me.</p>

<p>Otherwise, wishing you strong listings and clean closings at ${c}.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Cosmetic Dental':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note from me.</p>

<p>If consultation recovery isn't on the roadmap right now, no worries. If you ever want to see how many veneer or implant inquiries are slipping past ${c}, the door's open.</p>

<p>Otherwise, wishing you a great rest of the year.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Plastic Surgery':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note from me.</p>

<p>If consultation recovery isn't a priority right now, totally get it. If you ever want to see how many surgical consultations are slipping past ${c} into the bounce-rate, the door's open.</p>

<p>Otherwise, wishing you a great rest of the year.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    case 'Dermatology':
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note from me.</p>

<p>If recovery of abandoned cosmetic inquiries isn't a priority right now, totally understand. If it becomes one, you know where to find me.</p>

<p>Otherwise, wishing you a great rest of the year at ${c}.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`

    default:
      return `${wrapperOpen}
<p>Hi ${firstName},</p>

<p>Last note from me — I don't want to be a pest.</p>

<p>If form abandonment isn't a priority right now, totally understand. If it ever becomes one, you know where to find me. Otherwise, wishing you the best with ${c}.</p>

${SIGNATURE_HTML}
${psHtml(company)}
</div>`
  }
}


export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== 'Bearer ' + CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Skip weekend runs entirely — no outreach on Sat/Sun (Chicago time)
  const todayDOW = getChicagoDOW(new Date())
  if (todayDOW === 0 || todayDOW === 6) {
    return NextResponse.json({ skipped: 'weekend - Mon-Fri only' })
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
        const day4 = nextWeekday(new Date(sentAt.getTime() + 4 * 24 * 60 * 60 * 1000))
        const day10 = nextWeekday(new Date(sentAt.getTime() + 10 * 24 * 60 * 60 * 1000))

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
      const followupHtml = getDay4Html(item.vertical, item.prospect_name.split(' ')[0], item.prospect_company)

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
      const breakupHtml = getDay10Html(item.vertical, item.prospect_name.split(' ')[0], item.prospect_company)

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
