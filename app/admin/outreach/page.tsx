import Link from 'next/link'
import Image from 'next/image'
import '../../landing.css'

const ADMIN_KEY = process.env.OUTREACH_ADMIN_KEY ?? ''
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const dynamic = 'force-dynamic'

interface Prospect {
  id: string
  email: string
  first_name: string | null
  company: string | null
  domain: string | null
  vertical: string | null
  status: string
  notes: string | null
  last_event_at: string | null
  created_at: string
  updated_at: string
}

interface OutreachEvent {
  id: string
  prospect_id: string
  event_type: string
  metadata: Record<string, unknown>
  created_at: string
}

async function fetchSupabase<T>(table: string, queryString: string = ''): Promise<T[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return []
  const url = `${SUPABASE_URL}/rest/v1/${table}${queryString ? '?' + queryString : ''}`
  try {
    const res = await fetch(url, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
      cache: 'no-store',
    })
    if (!res.ok) return []
    return await res.json() as T[]
  } catch {
    return []
  }
}

const STATUS_COLORS: Record<string, string> = {
  queued: '#6b7280', audit_sent: '#f59e0b', email_sent: '#3b82f6',
  replied: '#ff6b35', trial_started: '#22c55e', paying: '#eab308',
  dead: '#ef4444', unsubscribed: '#6b7280',
}

const STATUS_LABELS: Record<string, string> = {
  queued: 'Queued', audit_sent: 'Audit Sent', email_sent: 'Email Sent',
  replied: 'Replied', trial_started: 'Trial Started', paying: 'Paying',
  dead: 'Dead', unsubscribed: 'Unsubscribed',
}

const EVENT_LABELS: Record<string, string> = {
  audit_submitted: 'Audit submitted', audit_delivered: 'Audit delivered',
  cold_email_sent: 'Cold email sent', cold_email_opened: 'Email opened',
  cold_email_clicked: 'Email clicked', replied: 'Replied',
  manual_note: 'Note added', status_change: 'Status changed',
  unsubscribed: 'Unsubscribed',
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return '\u2014'
  const date = new Date(iso)
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

function formatCurrency(value: unknown): string {
  if (value == null || value === '') return '\u2014'
  const num = typeof value === 'string' ? parseInt(value) : (value as number)
  if (isNaN(num)) return '\u2014'
  return '$' + num.toLocaleString()
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div style={{ padding: '2rem 1.75rem', border: '1px solid #1e1e1e', borderRadius: '8px', background: '#0c0c0c' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: accent ? '#ff6b35' : '#666', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 1rem' }}>{label}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: accent ? '#ff6b35' : '#fff', margin: 0, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value.toLocaleString()}</p>
    </div>
  )
}

export default async function OutreachPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const params = await searchParams

  if (!ADMIN_KEY || params.key !== ADMIN_KEY) {
    return (
      <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '6rem 2rem', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Unauthorized</h1>
        <p style={{ color: '#888' }}>Access requires a key in the URL.</p>
      </div>
    )
  }

  const [prospects, events] = await Promise.all([
    fetchSupabase<Prospect>('outreach_prospects', 'select=*&order=last_event_at.desc.nullslast,created_at.desc'),
    fetchSupabase<OutreachEvent>('outreach_events', 'select=*&order=created_at.desc&limit=50'),
  ])

  const totalProspects = prospects.length
  const auditsSent = events.filter(e => e.event_type === 'audit_submitted').length
  const emailsSent = events.filter(e => e.event_type === 'cold_email_sent').length
  const replies = events.filter(e => e.event_type === 'replied').length

  const prospectById: Record<string, Prospect> = {}
  for (const p of prospects) prospectById[p.id] = p

  return (
    <div className="landing">
      <div className="ambient-bg" />

      <nav className="lc-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" priority />
        </Link>
        <span style={{ color: '#666', fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
      </nav>

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Outreach Engine</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Every prospect. </span>
            <span className="canon-hero-headline-muted">Every action. Every dollar at stake.</span>
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <StatCard label="Total Prospects" value={totalProspects} />
          <StatCard label="Audits Submitted" value={auditsSent} />
          <StatCard label="Cold Emails Sent" value={emailsSent} />
          <StatCard label="Replies Received" value={replies} accent />
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 1.5rem', opacity: 0.75 }}>Prospects</p>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 2.5rem' }}>The pipeline</h2>

        {prospects.length === 0 ? (
          <div style={{ color: '#666', fontSize: '0.9375rem', padding: '3rem', textAlign: 'center', border: '1px solid #1e1e1e', borderRadius: '8px' }}>No prospects yet. Run a batch to populate.</div>
        ) : (
          <div style={{ border: '1px solid #1e1e1e', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 1.2fr 1.3fr 1fr', gap: '1rem', padding: '0.875rem 1.25rem', background: '#0f0f0f', borderBottom: '1px solid #1e1e1e', fontSize: '0.6875rem', fontWeight: 600, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <div>Company</div>
              <div>Email</div>
              <div>Vertical</div>
              <div>Status</div>
              <div style={{ textAlign: 'right' }}>Last Action</div>
            </div>
            {prospects.map((p, i) => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 1.2fr 1.3fr 1fr', gap: '1rem', padding: '1rem 1.25rem', borderBottom: i < prospects.length - 1 ? '1px solid #1a1a1a' : 'none', fontSize: '0.875rem', alignItems: 'center' }}>
                <div style={{ color: '#fff', fontWeight: 500 }}>{p.company || p.domain || '\u2014'}</div>
                <div style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.8125rem' }}>{p.email}</div>
                <div style={{ color: '#888' }}>{p.vertical || '\u2014'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_COLORS[p.status] || '#6b7280', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ color: '#ccc' }}>{STATUS_LABELS[p.status] || p.status}</span>
                </div>
                <div style={{ color: '#666', fontSize: '0.8125rem', textAlign: 'right' }}>{formatRelativeTime(p.last_event_at || p.created_at)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 1.5rem', opacity: 0.75 }}>Recent Activity</p>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 2.5rem' }}>The last fifty actions</h2>

        {events.length === 0 ? (
          <div style={{ color: '#666', fontSize: '0.9375rem', padding: '3rem', textAlign: 'center', border: '1px solid #1e1e1e', borderRadius: '8px' }}>No activity yet.</div>
        ) : (
          <div>
            {events.map((e, i) => {
              const p = prospectById[e.prospect_id]
              const md = (e.metadata || {}) as Record<string, unknown>
              return (
                <div key={e.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '1.25rem 0', borderBottom: i < events.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <div style={{ width: '90px', flexShrink: 0, color: '#666', fontSize: '0.75rem', paddingTop: '2px' }}>{formatRelativeTime(e.created_at)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '0.9375rem', marginBottom: '0.35rem' }}>
                      {EVENT_LABELS[e.event_type] || e.event_type}
                      <span style={{ color: '#666', fontWeight: 400 }}> &middot; </span>
                      <span style={{ color: '#ccc' }}>{p?.company || p?.email || 'Unknown'}</span>
                    </div>
                    {e.event_type === 'audit_submitted' && (
                      <div style={{ color: '#888', fontSize: '0.8125rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <span>Industry: <span style={{ color: '#ff6b35' }}>{String(md.industry || '\u2014')}</span></span>
                        <span>Grade: <span style={{ color: '#ccc' }}>{String(md.grade || '\u2014')}</span></span>
                        <span>Monthly at risk: <span style={{ color: '#ef4444' }}>{formatCurrency(md.monthly_revenue)}</span></span>
                      </div>
                    )}
                    {e.event_type === 'cold_email_sent' && (
                      <div style={{ color: '#888', fontSize: '0.8125rem' }}>
                        Subject: <span style={{ color: '#ccc' }}>{String(md.subject || '\u2014')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
