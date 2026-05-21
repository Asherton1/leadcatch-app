import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
const CRON_SECRET = process.env.CRON_SECRET ?? ''

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!RESEND_KEY) {
    return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { to, subject, html, text, scheduledAt } = body as {
    to: string
    subject: string
    html: string
    text?: string
    scheduledAt?: string
  }

  if (!to || !subject || !html) {
    return NextResponse.json({ error: 'to, subject, html required' }, { status: 400 })
  }

  const payload: Record<string, unknown> = {
    from: 'ReCapture <hello@userecapture.com>',
    to,
    reply_to: 'hello@userecapture.com',
    subject,
    html,
  }
  if (text) payload.text = text
  if (scheduledAt) payload.scheduledAt = scheduledAt

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + RESEND_KEY,
      },
      body: JSON.stringify(payload),
    })

    const resendData = await resendRes.json()

    if (!resendRes.ok) {
      console.error('[send-cold-email] resend error:', resendData)
      return NextResponse.json({ error: resendData.message || 'Resend error' }, { status: resendRes.status })
    }

    return NextResponse.json({ success: true, id: resendData.id })
  } catch (err) {
    console.error('[send-cold-email] error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
