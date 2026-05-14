import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const RESEND_KEY = process.env.RESEND_API_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Verify caller is admin
async function isAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  const token = authHeader.substring(7)

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return false

  const { data: client } = await supabase
    .from('clients')
    .select('is_admin')
    .eq('user_id', user.id)
    .single()

  return Boolean(client?.is_admin)
}

// Merge tags
const COMPANY_FALLBACK: Record<string, string> = {
  med_spa: 'your practice',
  plastic_surgery: 'your practice',
  cosmetic_dental: 'your practice',
  dental: 'your practice',
  dermatology: 'your practice',
  multifamily: 'your team',
  property_management: 'your team',
  luxury_real_estate: 'your team',
  luxury_auto: 'your dealership',
}

function mergeTags(html: string, prospect: {
  prospect_name: string
  prospect_company: string | null
  vertical: string
  city: string | null
}): string {
  const firstName = prospect.prospect_name.split(' ')[0]
  const companyText = prospect.prospect_company || COMPANY_FALLBACK[prospect.vertical] || 'your team'
  return html
    .replace(/\{firstName\}/g, firstName)
    .replace(/\{company\}/g, companyText)
    .replace(/\{vertical\}/g, prospect.vertical)
    .replace(/\{city\}/g, prospect.city || 'Dallas')
}

// GET — fetch all queue items for admin
export async function GET(request: NextRequest) {
  const admin = await isAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { data, error } = await supabase
      .from('outreach_queue')
      .select('*')
      .order('scheduled_send_at', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ items: data || [] })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST — bulk load prospects
export async function POST(request: NextRequest) {
  const admin = await isAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { prospects_block, subject, body_html, schedule_mode, single_date } = body

    if (!prospects_block || !subject || !body_html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Parse the prospect block
    const lines = prospects_block.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0)
    const prospects: Array<{
      prospect_name: string
      prospect_email: string
      prospect_company: string | null
      vertical: string
      prospect_role: string | null
      email_cc: string | null
    }> = []

    for (const line of lines) {
      const parts = line.split(',').map((p: string) => p.trim())
      if (parts.length < 4) {
        return NextResponse.json({ error: 'Invalid line: ' + line }, { status: 400 })
      }
      prospects.push({
        prospect_name: parts[0],
        prospect_email: parts[1],
        prospect_company: parts[2] || null,
        vertical: parts[3],
        prospect_role: parts[4] || null,
        email_cc: parts[5] || null,
      })
    }

    // Compute scheduled times
    const baseDate = new Date()
    const timeSlots = [
      { hour: 9, minute: 30 },
      { hour: 10, minute: 30 },
      { hour: 11, minute: 30 },
      { hour: 13, minute: 30 },
      { hour: 14, minute: 30 },
    ]

    function getWeekday(date: Date, weekday: number): Date {
      // weekday: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
      const result = new Date(date)
      const current = result.getDay() // 0=Sun
      const diff = weekday - current
      const offset = diff < 0 ? diff + 7 : diff
      result.setDate(result.getDate() + offset)
      result.setHours(timeSlots[0].hour, timeSlots[0].minute, 0, 0)
      // Convert to UTC from Central Time (UTC-5 CDT, UTC-6 CST)
      // Approximation: add 5 hours for CDT
      result.setHours(result.getHours() + 5)
      return result
    }

    function spreadSchedule(idx: number, total: number): Date {
      // Spread across Mon-Fri this week (or next week if past Friday)
      const weekdays = [1, 2, 3, 4, 5]
      const slotsPerDay = timeSlots.length
      const totalSlots = weekdays.length * slotsPerDay
      const slot = idx % totalSlots
      const dayIdx = Math.floor(slot / slotsPerDay)
      const slotIdx = slot % slotsPerDay
      const weekday = weekdays[dayIdx]
      const time = timeSlots[slotIdx]
      const date = getWeekday(baseDate, weekday)
      date.setHours(time.hour + 5, time.minute, 0, 0)
      return date
    }

    function singleDayTime(idx: number, dateStr: string): Date {
      const time = timeSlots[idx % timeSlots.length]
      const d = new Date(dateStr + 'T00:00:00')
      d.setHours(time.hour + 5, time.minute, 0, 0)
      return d
    }

    // Build queue items
    const rows = prospects.map((p, idx) => {
      const scheduled = schedule_mode === 'single' && single_date
        ? singleDayTime(idx, single_date)
        : spreadSchedule(idx, prospects.length)

      const tagContext = {
        prospect_name: p.prospect_name,
        prospect_company: p.prospect_company,
        vertical: p.vertical,
        city: 'Dallas',
      }
      const personalizedSubject = mergeTags(subject, tagContext)
      const personalizedBody = mergeTags(body_html, tagContext)

      return {
        prospect_name: p.prospect_name,
        prospect_email: p.prospect_email,
        prospect_company: p.prospect_company,
        prospect_role: p.prospect_role,
        vertical: p.vertical,
        city: 'Dallas',
        email_subject: personalizedSubject,
        email_body_html: personalizedBody,
        email_cc: p.email_cc,
        scheduled_send_at: scheduled.toISOString(),
        status: 'queued',
      }
    })

    const { error: insertErr } = await supabase
      .from('outreach_queue')
      .insert(rows)

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    return NextResponse.json({ loaded: rows.length })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PATCH — actions on individual queue items
export async function PATCH(request: NextRequest) {
  const admin = await isAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, action } = await request.json()

    if (action === 'mark_replied') {
      const { error } = await supabase
        .from('outreach_queue')
        .update({ status: 'replied', replied_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ message: 'Marked replied. Follow-ups stopped.' })
    }

    if (action === 'cancel') {
      const { error } = await supabase
        .from('outreach_queue')
        .update({ status: 'paused', updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ message: 'Cancelled.' })
    }

    if (action === 'send_now') {
      const { data: item } = await supabase
        .from('outreach_queue')
        .select('*')
        .eq('id', id)
        .single()

      if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

      const payload: Record<string, unknown> = {
        from: 'Asherton Chraibi <hello@userecapture.com>',
        to: item.prospect_email,
        subject: item.email_subject,
        html: item.email_body_html,
      }
      if (item.email_cc) payload.cc = item.email_cc

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
          .eq('id', id)

        return NextResponse.json({ message: 'Sent immediately. Follow-ups scheduled.' })
      } else {
        await supabase
          .from('outreach_queue')
          .update({
            status: 'failed',
            send_error: data.message || ('HTTP ' + res.status),
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
        return NextResponse.json({ error: 'Send failed: ' + (data.message || res.status) }, { status: 500 })
      }
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
