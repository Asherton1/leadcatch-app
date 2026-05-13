import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CRON_SECRET = process.env.CRON_SECRET!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export const dynamic = 'force-dynamic'

// GET /api/admin/outreach/export-companies
// Returns deduped list of companies + emails that have ever been added to outreach_queue.
// Used to dedupe future prospect sourcing batches against existing outreach history.
// Auth: Bearer CRON_SECRET
export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('outreach_queue')
    .select('prospect_company, prospect_email, prospect_name, status')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = data || []

  // Unique companies, sorted alphabetically
  const uniqueCompanies = Array.from(
    new Set(rows.map((r) => r.prospect_company).filter(Boolean) as string[])
  ).sort()

  // Unique emails (case-insensitive)
  const uniqueEmails = Array.from(
    new Set(rows.map((r) => (r.prospect_email || '').toLowerCase()).filter(Boolean))
  ).sort()

  // Status breakdown
  const statusCounts: Record<string, number> = {}
  for (const r of rows) {
    const s = r.status || 'unknown'
    statusCounts[s] = (statusCounts[s] || 0) + 1
  }

  return NextResponse.json({
    total_rows: rows.length,
    unique_companies: uniqueCompanies.length,
    unique_emails: uniqueEmails.length,
    status_breakdown: statusCounts,
    companies: uniqueCompanies,
    emails: uniqueEmails,
    // Plain text formats for easy copy/paste
    companies_text: uniqueCompanies.join('\n'),
    emails_text: uniqueEmails.join('\n'),
  })
}
