import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { sendEmailForLead } from '@/lib/email'

// GET /api/cron/send-emails
// Called by Vercel cron every 5 minutes (see vercel.json).
// Finds all leads whose scheduled send time has passed and emails them.
export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Find leads that are due: email_send_after is in the past, not yet sent, has an email
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id')
    .eq('email_sent', false)
    .not('email_send_after', 'is', null)
    .not('email', 'is', null)
    .lte('email_send_after', new Date().toISOString())

  if (error) {
    console.error('Cron query error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!leads.length) {
    return NextResponse.json({ processed: 0, sent: 0, failed: 0 })
  }

  const results = await Promise.allSettled(leads.map(l => sendEmailForLead(l.id)))

  const sent   = results.filter(r => r.status === 'fulfilled' && r.value.success && !r.value.skipped).length
  const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length

  console.log(`Cron: processed ${leads.length} leads — ${sent} sent, ${failed} failed`)
  return NextResponse.json({ processed: leads.length, sent, failed })
}
