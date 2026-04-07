import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  )

  // Get all active clients
  const { data: clients, error: clientErr } = await supabase
    .from('clients')
    .select('id, name, email, first_name, avg_lead_value, plan')
    .eq('active', true)

  if (clientErr || !clients || clients.length === 0) {
    console.log('[weekly-report] No active clients or error:', clientErr?.message)
    return NextResponse.json({ sent: 0 })
  }

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  let sent = 0
  const clientSummaries: { name: string; email: string; leads: number; atRisk: number; recovered: number; savedRevenue: number; rate: number; plan: string }[] = []

  for (const client of clients) {
    if (!client.email) continue

    // Get leads from the past 7 days (this week)
    const { data: leads } = await supabase
      .from('leads')
      .select('id, name, email, status, estimated_value, created_at')
      .eq('client_id', client.id)
      .gte('created_at', weekAgo)
      .order('created_at', { ascending: false })

    const weekLeads = leads ?? []
    if (weekLeads.length === 0) continue // Skip clients with no activity

    // Get leads from the PREVIOUS week (for comparison)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()
    const { data: prevLeads } = await supabase
      .from('leads')
      .select('id, status')
      .eq('client_id', client.id)
      .gte('created_at', twoWeeksAgo)
      .lt('created_at', weekAgo)

    const prevWeekLeads = prevLeads ?? []

    // This week stats
    const totalLeads = weekLeads.length
    const recovered = weekLeads.filter(l => l.status === 'converted').length
    const contacted = weekLeads.filter(l => l.status === 'contacted').length
    const open = weekLeads.filter(l => l.status === 'open').length
    const avgValue = client.avg_lead_value || 400
    const revenueAtRisk = totalLeads * avgValue
    const recoveredRevenue = recovered * avgValue
    const recoveryRate = totalLeads > 0 ? Math.round((recovered / totalLeads) * 100) : 0

    // Previous week stats
    const prevTotal = prevWeekLeads.length
    const prevRecovered = prevWeekLeads.filter(l => l.status === 'converted').length
    const prevRevenueAtRisk = prevTotal * avgValue
    const prevRecoveredRevenue = prevRecovered * avgValue
    const prevRecoveryRate = prevTotal > 0 ? Math.round((prevRecovered / prevTotal) * 100) : 0

    // Trend arrows helper
    function trend(current: number, previous: number, inverse = false): string {
      if (previous === 0 && current === 0) return ''
      if (previous === 0) return ' <span style="font-size: 12px; color: #22c55e;">&#9650; NEW</span>'
      const pct = Math.round(((current - previous) / previous) * 100)
      if (pct === 0) return ' <span style="font-size: 12px; color: #888;">&#8212; 0%</span>'
      const up = pct > 0
      const color = inverse ? (up ? '#f87171' : '#22c55e') : (up ? '#22c55e' : '#f87171')
      const arrow = up ? '&#9650;' : '&#9660;'
      return ` <span style="font-size: 12px; color: ${color};">${arrow} ${Math.abs(pct)}%</span>`
    }

    const isPro = client.plan !== 'essentials'
    const leadsArrow = isPro ? trend(totalLeads, prevTotal) : ''
    const riskArrow = isPro ? trend(revenueAtRisk, prevRevenueAtRisk, true) : ''
    const recoveredArrow = isPro ? trend(recovered, prevRecovered) : ''
    const savedArrow = isPro ? trend(recoveredRevenue, prevRecoveredRevenue) : ''
    const rateArrow = isPro ? trend(recoveryRate, prevRecoveryRate) : ''

    const firstName = client.first_name || client.name?.split(' ')[0] || 'there'
    const weekOf = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    // Top 5 leads for the table
    const topLeads = weekLeads.slice(0, 5)
    const leadsTableRows = topLeads.map(l => {
      const statusColor = l.status === 'converted' ? '#22c55e' : l.status === 'contacted' ? '#60a5fa' : '#fbbf24'
      const statusLabel = (l.status || 'open').charAt(0).toUpperCase() + (l.status || 'open').slice(1)
      return `<tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #1e1e1e; color: #fff; font-size: 14px;">${l.name || '—'}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 14px;">${l.email || '—'}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #1e1e1e;"><span style="color: ${statusColor}; font-weight: 600; font-size: 12px; background: ${statusColor}15; padding: 3px 8px; border-radius: 4px;">${statusLabel}</span></td>
      </tr>`
    }).join('')

    const html = `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <div style="margin-bottom: 32px;">
          <span style="font-size: 22px; font-weight: 700; color: #fff;">Re</span><span style="font-size: 22px; font-weight: 700; color: #ff6b35;">Capture</span>
          <span style="font-size: 11px; color: #888; margin-left: 12px;">Weekly Report</span>
        </div>

        <p style="color: #aaa; font-size: 16px; margin-bottom: 8px;">Hi ${firstName},</p>
        <p style="color: #aaa; font-size: 15px; margin-bottom: 32px;">Here's your lead recovery summary for the week of <strong style="color: #fff;">${weekOf}</strong>.</p>

        <div style="display: flex; gap: 12px; margin-bottom: 32px;">
          <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #ff6b35;">${totalLeads}${leadsArrow}</div>
            <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Abandoned Leads</div>
          </div>
          <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #f87171;">$${revenueAtRisk.toLocaleString()}${riskArrow}</div>
            <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Revenue at Risk</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 32px;">
          <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #22c55e;">${recovered}${recoveredArrow}</div>
            <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Recovered</div>
          </div>
          <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #22c55e;">$${recoveredRevenue.toLocaleString()}${savedArrow}</div>
            <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Revenue Saved</div>
          </div>
        </div>

        <div style="background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 20px; margin-bottom: 32px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: ${recoveryRate > 20 ? '#22c55e' : '#fbbf24'};">${recoveryRate}%${rateArrow}</div>
          <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Recovery Rate</div>
        </div>

        ${weekLeads.length > 0 ? `
        <h3 style="font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Recent Leads</h3>
        <table style="width: 100%; border-collapse: collapse; background: #111; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
          <thead>
            <tr style="background: #1a1a1a;">
              <th style="padding: 10px 12px; text-align: left; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Name</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Email</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Status</th>
            </tr>
          </thead>
          <tbody>${leadsTableRows}</tbody>
        </table>
        ` : ''}

        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://userecapture.com/dashboard" style="display: inline-block; background: #ff6b35; color: #000; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">View Full Dashboard</a>
        </div>

        <div style="border-top: 1px solid #1e1e1e; padding-top: 20px;">
          <p style="color: #444; font-size: 12px; text-align: center; margin: 0;">ReCapture · Weekly Report · Born & Built in Dallas, Texas</p>
        </div>
      </div>
    `

    try {
      await resend.emails.send({
        from: 'ReCapture <hello@userecapture.com>',
        to: client.email,
        subject: `Your Weekly Lead Report — ${totalLeads} leads captured, $${revenueAtRisk.toLocaleString()} at risk`,
        html,
      })
      sent++
      clientSummaries.push({ name: client.name || client.first_name || 'Unknown', email: client.email, leads: totalLeads, atRisk: revenueAtRisk, recovered, savedRevenue: recoveredRevenue, rate: recoveryRate, plan: client.plan || 'pro' })
      console.log(`[weekly-report] Sent to ${client.email}`)
    } catch (err) {
      console.error(`[weekly-report] Failed to send to ${client.email}:`, err)
    }
  }

  // Notify Ash — full Monday briefing
  try {
    const clientRows = clientSummaries.map(c => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #fff; font-size: 14px;">${c.name}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 14px;">${c.email}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #ff6b35; font-weight: 700; font-size: 14px;">${c.leads}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #f87171; font-weight: 700; font-size: 14px;">$${c.atRisk.toLocaleString()}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #22c55e; font-weight: 700; font-size: 14px;">${c.recovered}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: #22c55e; font-weight: 700; font-size: 14px;">$${c.savedRevenue.toLocaleString()}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; color: ${c.rate > 20 ? '#22c55e' : '#fbbf24'}; font-weight: 700; font-size: 14px;">${c.rate}%</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #1e1e1e; font-size: 12px;"><span style="background: ${c.plan === 'pro' ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.08)'}; color: ${c.plan === 'pro' ? '#ff6b35' : '#888'}; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${(c.plan || 'pro').toUpperCase()}</span></td>
      </tr>
    `).join('')

    const totalLeadsAll = clientSummaries.reduce((sum, c) => sum + c.leads, 0)
    const totalAtRisk = clientSummaries.reduce((sum, c) => sum + c.atRisk, 0)
    const totalRecovered = clientSummaries.reduce((sum, c) => sum + c.recovered, 0)
    const totalSaved = clientSummaries.reduce((sum, c) => sum + c.savedRevenue, 0)
    const weekOf = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    await resend.emails.send({
      from: 'ReCapture <onboarding@resend.dev>',
      to: 'asherton.c@me.com',
      subject: `Monday Briefing — ${sent} reports sent · ${totalLeadsAll} leads · $${totalAtRisk.toLocaleString()} at risk`,
      html: `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 700px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="margin-bottom: 32px;">
            <span style="font-size: 22px; font-weight: 700; color: #fff;">Re</span><span style="font-size: 22px; font-weight: 700; color: #ff6b35;">Capture</span>
            <span style="font-size: 11px; color: #888; margin-left: 12px;">Monday Briefing</span>
          </div>

          <p style="color: #aaa; font-size: 15px; margin-bottom: 32px;">Week of <strong style="color: #fff;">${weekOf}</strong> — ${sent} client reports sent.</p>

          <div style="display: flex; gap: 12px; margin-bottom: 32px;">
            <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #ff6b35;">${totalLeadsAll}</div>
              <div style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Total Leads</div>
            </div>
            <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #f87171;">$${totalAtRisk.toLocaleString()}</div>
              <div style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Total at Risk</div>
            </div>
            <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #22c55e;">${totalRecovered}</div>
              <div style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Recovered</div>
            </div>
            <div style="flex: 1; background: #111; border: 1px solid #1e1e1e; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 24px; font-weight: 700; color: #22c55e;">$${totalSaved.toLocaleString()}</div>
              <div style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Revenue Saved</div>
            </div>
          </div>

          <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Client Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse; background: #111; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
            <thead>
              <tr style="background: #1a1a1a;">
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Client</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Email</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Leads</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">At Risk</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Recovered</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Saved</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Rate</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Plan</th>
              </tr>
            </thead>
            <tbody>${clientRows}</tbody>
          </table>

          <div style="text-align: center;">
            <a href="https://userecapture.com/admin" style="display: inline-block; background: #ff6b35; color: #000; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">Open Admin Dashboard</a>
          </div>

          <div style="border-top: 1px solid #1e1e1e; padding-top: 20px; margin-top: 32px;">
            <p style="color: #444; font-size: 12px; text-align: center; margin: 0;">ReCapture · Monday Briefing · ${weekOf}</p>
          </div>
        </div>
      `,
    })
  } catch {}

  return NextResponse.json({ sent, timestamp: now.toISOString() })
}
