'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useIsAdmin } from '@/lib/use-is-admin'
import './audits.css'

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

const STATUS_COLORS: Record<string, string> = {
  queued: '#6b7280', audit_sent: '#f59e0b', email_sent: '#4a9eff',
  replied: '#ff6b35', trial_started: '#10b981', paying: '#eab308',
  dead: '#ef4444', unsubscribed: '#6b7280',
}

const STATUS_LABELS: Record<string, string> = {
  queued: 'Queued', audit_sent: 'Audit Sent', email_sent: 'Email Sent',
  replied: 'Replied', trial_started: 'Trial Started', paying: 'Paying',
  dead: 'Dead', unsubscribed: 'Unsubscribed',
}

const EVENT_LABELS: Record<string, string> = {
  audit_submitted: 'Audit submitted', audit_delivered: 'Audit delivered',
  cold_email_sent: 'Cold email scheduled', cold_email_opened: 'Email opened',
  cold_email_clicked: 'Email clicked', replied: 'Replied',
  manual_note: 'Note', status_change: 'Status changed',
  unsubscribed: 'Unsubscribed',
}

function relativeTime(iso: string | null): string {
  if (!iso) return '\u2014'
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString()
}

function fmtCurrency(v: unknown): string {
  if (v == null || v === '') return '\u2014'
  const n = typeof v === 'string' ? parseInt(v) : (v as number)
  if (isNaN(n)) return '\u2014'
  return '$' + n.toLocaleString()
}

export default function AuditsPage() {
  const { loading: authLoading, isAdmin } = useIsAdmin()
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [events, setEvents] = useState<OutreachEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAdmin) { setLoading(false); return }
    async function load() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) { setError('Not logged in'); setLoading(false); return }
        const res = await fetch('/api/admin/outreach/audits', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) {
          const j = await res.json().catch(() => ({}))
          setError(j.reason || j.error || `HTTP ${res.status}`)
          setLoading(false)
          return
        }
        const json = await res.json()
        setProspects(json.prospects || [])
        setEvents(json.events || [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [authLoading, isAdmin])

  if (authLoading) {
    return <div className="audits-state">Loading\u2026</div>
  }
  if (!isAdmin) {
    return <div className="audits-state audits-state-error">Unauthorized. This area is for admins only.</div>
  }
  if (loading) {
    return <div className="audits-state">Loading audit data\u2026</div>
  }
  if (error) {
    return <div className="audits-state audits-state-error">Error: {error}</div>
  }

  const totalProspects = prospects.length
  const auditsSent = events.filter(e => e.event_type === 'audit_submitted').length
  const emailsSent = events.filter(e => e.event_type === 'cold_email_sent').length
  const replies = events.filter(e => e.event_type === 'replied').length

  const prospectById: Record<string, Prospect> = {}
  for (const p of prospects) prospectById[p.id] = p

  return (
    <div className="audits-page">
      <div className="audits-header">
        <div>
          <p className="audits-eyebrow">Audit Pipeline</p>
          <h1 className="audits-title">Every prospect. Every action.</h1>
        </div>
      </div>

      <div className="audits-stats">
        <div className="audits-stat">
          <p className="audits-stat-label">Total Prospects</p>
          <p className="audits-stat-value">{totalProspects.toLocaleString()}</p>
        </div>
        <div className="audits-stat">
          <p className="audits-stat-label">Audits Submitted</p>
          <p className="audits-stat-value">{auditsSent.toLocaleString()}</p>
        </div>
        <div className="audits-stat">
          <p className="audits-stat-label">Cold Emails Scheduled</p>
          <p className="audits-stat-value">{emailsSent.toLocaleString()}</p>
        </div>
        <div className="audits-stat audits-stat-accent">
          <p className="audits-stat-label">Replies Received</p>
          <p className="audits-stat-value">{replies.toLocaleString()}</p>
        </div>
      </div>

      <section className="audits-section">
        <h2 className="audits-section-title">Prospects</h2>
        {prospects.length === 0 ? (
          <div className="audits-empty">No prospects yet. Run <code>run_outreach.py</code> to populate.</div>
        ) : (
          <div className="audits-table-wrap">
            <table className="audits-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Vertical</th>
                  <th>Status</th>
                  <th className="audits-th-right">Last Action</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map(p => (
                  <tr key={p.id}>
                    <td className="audits-td-strong">{p.company || p.domain || '\u2014'}</td>
                    <td className="audits-td-mono">{p.email}</td>
                    <td>{p.vertical || '\u2014'}</td>
                    <td>
                      <span className="audits-status-dot" style={{ background: STATUS_COLORS[p.status] || '#6b7280' }} />
                      <span className="audits-status-label">{STATUS_LABELS[p.status] || p.status}</span>
                    </td>
                    <td className="audits-td-muted audits-td-right">{relativeTime(p.last_event_at || p.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="audits-section">
        <h2 className="audits-section-title">Recent Activity</h2>
        {events.length === 0 ? (
          <div className="audits-empty">No activity yet.</div>
        ) : (
          <div className="audits-timeline">
            {events.map(e => {
              const p = prospectById[e.prospect_id]
              const md = (e.metadata || {}) as Record<string, unknown>
              return (
                <div key={e.id} className="audits-timeline-item">
                  <div className="audits-timeline-time">{relativeTime(e.created_at)}</div>
                  <div className="audits-timeline-body">
                    <div className="audits-timeline-headline">
                      <span className="audits-timeline-event">{EVENT_LABELS[e.event_type] || e.event_type}</span>
                      <span className="audits-timeline-sep">\u00b7</span>
                      <span className="audits-timeline-target">{p?.company || p?.email || 'Unknown'}</span>
                    </div>
                    {e.event_type === 'audit_submitted' && (
                      <div className="audits-timeline-meta">
                        <span>Industry: <strong className="audits-orange">{String(md.industry || '\u2014')}</strong></span>
                        <span>Grade: <strong>{String(md.grade || '\u2014')}</strong></span>
                        <span>Monthly at risk: <strong className="audits-red">{fmtCurrency(md.monthly_revenue)}</strong></span>
                      </div>
                    )}
                    {e.event_type === 'cold_email_sent' && (
                      <div className="audits-timeline-meta">
                        <span>Subject: <strong>{String(md.subject || '\u2014')}</strong></span>
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
