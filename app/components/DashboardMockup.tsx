'use client'

type Lead = { name: string; initials: string; email: string; service: string; value: number; status: 'Open' | 'Contacted' | 'Recovered' }

interface DashboardMockupProps {
  abandoned: number
  revenueAtRisk: number
  recovered: number
  recoveredRevenue: number
  leads: Lead[]
}

export default function DashboardMockup({ abandoned, revenueAtRisk, recovered, recoveredRevenue, leads }: DashboardMockupProps) {
  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div style={{ maxWidth: '680px', margin: '2.5rem auto', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,107,53,0.2)', boxShadow: '0 0 60px rgba(255,107,53,0.06)' }}>
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
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
          <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: '#0d0d0d' }}>
        <div style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Abandoned</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{abandoned}</div>
        </div>
        <div style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Revenue at Risk</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff6b35' }}>{fmt(revenueAtRisk)}</div>
        </div>
        <div style={{ padding: '1.25rem 1rem', borderRight: '1px solid #141414', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Recovered</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{recovered}</div>
        </div>
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.4rem' }}>Revenue Saved</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{fmt(recoveredRevenue)}</div>
        </div>
      </div>

      {/* Lead rows */}
      <div style={{ background: '#0d0d0d' }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #141414', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Recent Abandoned Leads</span>
          <span style={{ fontSize: '0.55rem', color: '#333' }}>This month</span>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr', padding: '0.5rem 1.25rem', borderBottom: '1px solid #111' }}>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Contact</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Service</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Value</span>
          <span style={{ fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, textAlign: 'right' }}>Status</span>
        </div>

        {leads.map((lead, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr', padding: '0.75rem 1.25rem', borderBottom: '1px solid #111', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b35, #e85d2c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{lead.initials}</div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{lead.name}</div>
                <div style={{ fontSize: '0.6rem', color: '#444' }}>{lead.email}</div>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{lead.service}</div>
            <div style={{ fontSize: '0.75rem', color: '#ff6b35', fontWeight: 600 }}>{fmt(lead.value)}</div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: 4,
                background: lead.status === 'Recovered' ? 'rgba(16,185,129,0.1)' : lead.status === 'Contacted' ? 'rgba(59,130,246,0.1)' : 'rgba(255,107,53,0.1)',
                color: lead.status === 'Recovered' ? '#10b981' : lead.status === 'Contacted' ? '#3b82f6' : '#ff6b35',
              }}>{lead.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ background: '#0d0d0d', padding: '0.6rem 1.25rem', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <span style={{ fontSize: '0.6rem', color: '#333' }}>userecapture.com</span>
      </div>
    </div>
  )
}
