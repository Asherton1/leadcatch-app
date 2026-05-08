'use client'

import { useEffect, useState, useRef } from 'react'

type Lead = { name: string; initials: string; email: string; service: string; value: number; status: 'Open' | 'Contacted' | 'Recovered' }

interface DashboardMockupProps {
  abandoned: number
  revenueAtRisk: number
  recovered: number
  recoveredRevenue: number
  leads: Lead[]
}

// Smooth ease-out animation hook for counter ticks
function useAnimatedNumber(target: number, duration = 2200, delay = 200) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const startTime = performance.now() + delay
    let frameId: number

    const tick = (now: number) => {
      if (now < startTime) {
        frameId = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, delay])

  return value
}

export default function DashboardMockup({ abandoned, revenueAtRisk, recovered, recoveredRevenue, leads }: DashboardMockupProps) {
  const fmt = (n: number) => '$' + n.toLocaleString()

  // Animated stat values
  const animAbandoned = useAnimatedNumber(abandoned, 2000, 200)
  const animRevenueAtRisk = useAnimatedNumber(revenueAtRisk, 2400, 400)
  const animRecovered = useAnimatedNumber(recovered, 1800, 700)
  const animRecoveredRevenue = useAnimatedNumber(recoveredRevenue, 2200, 900)

  // Stagger lead rows in
  const [visibleLeadCount, setVisibleLeadCount] = useState(0)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    leads.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLeadCount(c => c + 1), 1400 + i * 250))
    })
    return () => { timers.forEach(t => clearTimeout(t)) }
  }, [leads])

  return (
    <div className="dashboard-mockup-wrap" style={{ maxWidth: '680px', margin: '2.5rem auto', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,107,53,0.2)', boxShadow: '0 0 60px rgba(255,107,53,0.06)' }}>

      {/* Animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lead-row-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes status-pulse-recovered {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(16,185,129,0); }
        }
        @keyframes status-pulse-live {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.6); }
          50% { box-shadow: 0 0 0 6px rgba(255,107,53,0); }
        }
        .lead-row-anim {
          animation: lead-row-fadein 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .status-recovered-pulse {
          animation: status-pulse-recovered 2.4s ease-in-out infinite;
        }

        /* MOBILE RESPONSIVE — collapse 4-col grids to 2-col stat grid + readable lead rows */
        @media (max-width: 640px) {
          .dashboard-mockup-wrap {
            margin: 1.5rem auto !important;
          }
          .dashboard-stats-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .dashboard-stats-cell {
            border-right: none !important;
          }
          .dashboard-stats-cell:nth-child(odd) {
            border-right: 1px solid #141414 !important;
          }
          .dashboard-lead-headers {
            display: none !important;
          }
          .dashboard-lead-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
            padding: 1rem 1rem !important;
          }
          .dashboard-lead-row .lead-service,
          .dashboard-lead-row .lead-value,
          .dashboard-lead-row .lead-status {
            text-align: left !important;
          }
          .dashboard-lead-meta {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-top: 0.4rem !important;
          }
          .dashboard-stat-value {
            font-size: 1.25rem !important;
          }
        }
      ` }} />

      {/* Top bar */}
      <div style={{ background: '#0d0d0d', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: '#555', marginLeft: '0.5rem', fontWeight: 500 }}>ReCapture Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff6b35', boxShadow: '0 0 8px rgba(255,107,53,0.6)', animation: 'status-pulse-live 1.6s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.6rem', color: '#ff6b35', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live</span>
        </div>
      </div>

      {/* Stats — animated counters */}
      <div className="dashboard-stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: '#0d0d0d' }}>
        <div className="dashboard-stats-cell" style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Abandoned</div>
          <div className="dashboard-stat-value" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{animAbandoned}</div>
        </div>
        <div className="dashboard-stats-cell" style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Revenue at Risk</div>
          <div className="dashboard-stat-value" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff6b35', fontVariantNumeric: 'tabular-nums' }}>{fmt(animRevenueAtRisk)}</div>
        </div>
        <div className="dashboard-stats-cell" style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Recovered</div>
          <div className="dashboard-stat-value" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', fontVariantNumeric: 'tabular-nums' }}>{animRecovered}</div>
        </div>
        <div className="dashboard-stats-cell" style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Revenue Saved</div>
          <div className="dashboard-stat-value" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', fontVariantNumeric: 'tabular-nums' }}>{fmt(animRecoveredRevenue)}</div>
        </div>
      </div>

      {/* Lead rows */}
      <div style={{ background: '#0d0d0d' }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #141414', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Recent Abandoned Leads</span>
          <span style={{ fontSize: '0.55rem', color: '#333' }}>This month</span>
        </div>

        {/* Column headers — hidden on mobile */}
        <div className="dashboard-lead-headers" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr', padding: '0.5rem 1.25rem', borderBottom: '1px solid #111' }}>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Contact</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Service</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Value</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, textAlign: 'right' }}>Status</span>
        </div>

        {leads.map((lead, i) => (
          <div
            key={i}
            className={visibleLeadCount > i ? 'dashboard-lead-row lead-row-anim' : 'dashboard-lead-row'}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1.5fr 1fr',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #111',
              alignItems: 'center',
              opacity: visibleLeadCount > i ? undefined : 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b35, #e85d2c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{lead.initials}</div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{lead.name}</div>
                <div style={{ fontSize: '0.6rem', color: '#444' }}>{lead.email}</div>
              </div>
            </div>
            <div className="lead-service" style={{ fontSize: '0.75rem', color: '#888' }}>{lead.service}</div>
            <div className="lead-value" style={{ fontSize: '0.75rem', color: '#ff6b35', fontWeight: 600 }}>{fmt(lead.value)}</div>
            <div className="lead-status" style={{ textAlign: 'right' }}>
              <span
                className={lead.status === 'Recovered' ? 'status-recovered-pulse' : ''}
                style={{
                  display: 'inline-block',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  background: lead.status === 'Recovered' ? 'rgba(16,185,129,0.12)' : lead.status === 'Contacted' ? 'rgba(255,107,53,0.12)' : 'rgba(120,120,120,0.12)',
                  color: lead.status === 'Recovered' ? '#10b981' : lead.status === 'Contacted' ? '#ff6b35' : '#888',
                }}
              >
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
