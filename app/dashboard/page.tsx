'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureClient } from '@/lib/provision'
import './dashboard.css'
import Footer from '../components/Footer'
import '../landing.css'
import AdminNav from '../components/AdminNav'
import Logo from '../components/Logo'

// ── Types ─────────────────────────────────────────────────────────────────────

type Filter = 'today' | 'week' | 'month' | 'all'
type LeadStatus = 'open' | 'contacted' | 'converted' | 'lost'

interface Client {
  id: string
  name: string
  first_name: string | null
  last_name: string | null
  company_name: string | null
  api_key: string
  active: boolean
}

interface Lead {
  id: string
  session_id: string
  name: string | null
  email: string | null
  phone: string | null
  fields_completed: number
  total_fields: number
  time_on_form: number
  device_type: string | null
  estimated_value: number
  status: string
  created_at: string
  client_id: string
  email_sent: boolean
  email_sent_at: string | null
  form_data: Record<string, string> | null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function displayName(c: Client): string {
  return c.company_name
    || (c.first_name && c.last_name ? `${c.first_name} ${c.last_name}` : null)
    || c.name || 'Unknown'
}

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toLocaleString()}`
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function formatAbsoluteTime(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function formatDuration(seconds: number) {
  if (!seconds) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}m` : `0:${String(s).padStart(2, '0')}s`
}

function deviceLabel(type: string | null) {
  if (!type) return '— Unknown'
  const t = type.toLowerCase()
  if (t.includes('mobile') || t.includes('phone')) return 'Mobile'
  if (t.includes('tablet')) return 'Tablet'
  return 'Desktop'
}

function filterByDate(leads: Lead[], filter: Filter): Lead[] {
  if (filter === 'all') return leads
  const now = new Date()
  let cutoff: number

  if (filter === 'today') {
    // Since midnight today, not a rolling 24 hours
    cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  } else if (filter === 'week') {
    // Since Sunday of the current week
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    d.setDate(d.getDate() - d.getDay())
    cutoff = d.getTime()
  } else {
    // Since the 1st of the current month — matches the month-over-month band
    cutoff = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  }

  return leads.filter(l => new Date(l.created_at).getTime() >= cutoff)
}

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'open',      label: 'Open',      color: '#4a9eff' },
  { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
  { value: 'converted', label: 'Converted', color: '#10b981' },
  { value: 'lost',      label: 'Lost',      color: '#6b7280' },
]

function statusColor(status: string): string {
  return STATUS_OPTIONS.find(o => o.value === status)?.color ?? '#6b7280'
}

// ── Lead Scoring ──────────────────────────────────────────────────────────────

interface ScoreBreakdownItem {
  label: string
  points: number
  maxPoints: number
}

interface LeadScore {
  score: number
  label: string
  color: string
  bg: string
  breakdown: ScoreBreakdownItem[]
}

function scoreLead(lead: Lead): LeadScore {
  const breakdown: ScoreBreakdownItem[] = []
  let score = 0

  // Contact info (up to 40 points)
  const emailPts = lead.email ? 20 : 0
  const namePts = lead.name ? 10 : 0
  const phonePts = lead.phone ? 10 : 0
  score += emailPts + namePts + phonePts
  breakdown.push({ label: 'Email provided', points: emailPts, maxPoints: 20 })
  breakdown.push({ label: 'Name provided', points: namePts, maxPoints: 10 })
  breakdown.push({ label: 'Phone provided', points: phonePts, maxPoints: 10 })

  // Field completion (up to 30 points)
  let fieldPts = 0
  if (lead.total_fields > 0) {
    const pct = lead.fields_completed / lead.total_fields
    fieldPts = Math.round(pct * 30)
  }
  score += fieldPts
  breakdown.push({ label: 'Fields completed', points: fieldPts, maxPoints: 30 })

  // Time on form (up to 15 points)
  let timePts = 0
  if (lead.time_on_form >= 60) timePts = 15
  else if (lead.time_on_form >= 30) timePts = 10
  else if (lead.time_on_form >= 10) timePts = 5
  score += timePts
  breakdown.push({ label: 'Time on form', points: timePts, maxPoints: 15 })

  // Form data richness (up to 15 points)
  let dataPts = 0
  if (lead.form_data && typeof lead.form_data === 'object') {
    const filled = Object.values(lead.form_data).filter(v => v && String(v).trim().length > 0).length
    if (filled >= 3) dataPts = 15
    else if (filled >= 2) dataPts = 10
    else if (filled >= 1) dataPts = 5
  }
  score += dataPts
  breakdown.push({ label: 'Form detail richness', points: dataPts, maxPoints: 15 })

  if (score >= 70) return { score, label: 'Hot', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', breakdown }
  if (score >= 40) return { score, label: 'Warm', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', breakdown }
  return { score, label: 'Cold', color: '#6b7280', bg: 'rgba(107,114,128,0.12)', breakdown }
}


// ── Lead Detail Modal ─────────────────────────────────────────────────────────

function LeadModal({
  lead,
  onClose,
  onStatusChange,
}: {
  lead: Lead
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
}) {
  const [pendingStatus, setPendingStatus] = useState<string>(lead.status ?? 'open')
  const [saving, setSaving]               = useState(false)
  const [saved, setSaved]                 = useState(false)

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  

  return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const statusChanged = pendingStatus !== (lead.status ?? 'open')

  async function handleSave() {
    if (!statusChanged) return
    setSaving(true)
    const { error } = await supabase
      .from('leads')
      .update({ status: pendingStatus })
      .eq('id', lead.id)
    if (!error) {
      onStatusChange(lead.id, pendingStatus)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  const formFields = lead.form_data
    ? Object.entries(lead.form_data).filter(([, v]) => v && String(v).trim())
    : []

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-card">

        {/* Modal header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-title-name">{lead.name ?? 'Unknown Lead'}</div>
            <div className="modal-title-time">{formatAbsoluteTime(lead.created_at)}</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Mini metrics row ──────────────────────────────────────────── */}
        <div className="modal-mini-metrics">
          <div className="modal-mini-card">
            <div className="modal-mini-label">Est. Value</div>
            <div className="modal-mini-value accent">{formatCurrency(lead.estimated_value)}</div>
          </div>
          <div className="modal-mini-card">
            <div className="modal-mini-label">Time on Form</div>
            <div className="modal-mini-value">{formatDuration(lead.time_on_form)}</div>
          </div>
          <div className="modal-mini-card">
            <div className="modal-mini-label">Completion</div>
            <div className="modal-mini-value">
              {lead.total_fields > 0
                ? `${Math.round((lead.fields_completed / lead.total_fields) * 100)}%`
                : '—'}
              <span className="modal-mini-sub">{lead.fields_completed}/{lead.total_fields} fields</span>
            </div>
          </div>
          <div className="modal-mini-card">
            <div className="modal-mini-label">Device</div>
            <div className="modal-mini-value">{deviceLabel(lead.device_type)}</div>
          </div>
        </div>

        <div
          className="modal-body"
          onWheel={(e) => {
            const el = e.currentTarget
            const atTop = el.scrollTop === 0
            const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight
            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
              e.preventDefault()
            }
            e.stopPropagation()
          }}
        >

          {/* Contact info */}
          <div className="modal-section">
            <div className="modal-section-label">Contact Information</div>
            <div className="modal-info-grid">
              <div className="modal-info-row">
                <span className="modal-info-key">Name</span>
                <span className="modal-info-val">{lead.name ?? '—'}</span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-key">Email</span>
                <span className="modal-info-val">
                  {lead.email
                    ? <a href={`mailto:${lead.email}`} className="modal-link">{lead.email}</a>
                    : '—'}
                </span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-key">Phone</span>
                <span className="modal-info-val">
                  {lead.phone
                    ? <a href={`tel:${lead.phone}`} className="modal-link">{lead.phone}</a>
                    : '—'}
                </span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-key">Device</span>
                <span className="modal-info-val">{deviceLabel(lead.device_type)}</span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-key">Est. Value</span>
                <span className="modal-info-val modal-value">{formatCurrency(lead.estimated_value)}</span>
              </div>
            </div>
          </div>


          {/* Lead Score */}
          {(() => {
            const s = scoreLead(lead)
            return (
              <div className="modal-section">
                <div className="modal-section-label">Lead Score</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 700, border: "1px solid", color: s.color, borderColor: s.color + "40", background: s.bg }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                    {s.label}
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#888" }}>{s.score} / 100</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {s.breakdown.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.75rem", color: "#888", width: "120px", flexShrink: 0 }}>{item.label}</span>
                      <div style={{ flex: 1, height: 4, background: "#1e1e1e", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ width: item.maxPoints > 0 ? (item.points / item.maxPoints * 100) + "%" : "0%", height: "100%", background: s.color, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "#666", width: "40px", textAlign: "right", flexShrink: 0 }}>{item.points}/{item.maxPoints}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
          {/* Captured form fields */}
          {formFields.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-label">Captured Form Fields</div>
              <div className="modal-info-grid">
                {formFields.map(([key, val]) => (
                  <div key={key} className="modal-info-row">
                    <span className="modal-info-key">{key.replace(/_/g, ' ')}</span>
                    <span className="modal-info-val">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email history */}
          <div className="modal-section">
            <div className="modal-section-label">Email Recovery</div>
            <div className="modal-email-status">
              <div className={`modal-email-badge ${lead.email_sent ? 'sent' : 'pending'}`}>
                {lead.email_sent ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Email sent
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 4.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7" cy="9.5" r="0.75" fill="currentColor"/>
                    </svg>
                    Not yet sent
                  </>
                )}
              </div>
              {lead.email_sent && lead.email_sent_at && (
                <span className="modal-email-time">Sent {formatAbsoluteTime(lead.email_sent_at)}</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="modal-section">
            <div className="modal-section-label">Lead Status</div>
            <div className="modal-status-grid">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`modal-status-btn ${pendingStatus === opt.value ? 'active' : ''}`}
                  style={pendingStatus === opt.value ? { borderColor: opt.color, color: opt.color, background: `${opt.color}18` } : {}}
                  onClick={() => setPendingStatus(opt.value)}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="modal-section">
            <div className="modal-section-label">Timeline</div>
            <div className="modal-timeline">
              <div className="modal-timeline-item">
                <div className="modal-timeline-dot" />
                <div className="modal-timeline-content">
                  <span className="modal-timeline-event">Form abandoned</span>
                  <span className="modal-timeline-time">
                    {formatAbsoluteTime(lead.created_at)}
                    {' · '}
                    {formatRelativeTime(lead.created_at)}
                  </span>
                </div>
              </div>
              {lead.email_sent && lead.email_sent_at && (
                <div className="modal-timeline-item">
                  <div className="modal-timeline-dot sent" />
                  <div className="modal-timeline-content">
                    <span className="modal-timeline-event">Recovery email sent</span>
                    <span className="modal-timeline-time">
                      {formatAbsoluteTime(lead.email_sent_at)}
                      {' · '}
                      {formatRelativeTime(lead.email_sent_at)}
                    </span>
                  </div>
                </div>
              )}
              {!lead.email_sent && (
                <div className="modal-timeline-item">
                  <div className="modal-timeline-dot" />
                  <div className="modal-timeline-content">
                    <span className="modal-timeline-event" style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Recovery email pending…</span>
                    <span className="modal-timeline-time">Scheduled based on client delay</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal footer */}
        <div className="modal-footer">
          <div className="modal-fields-info">
            {lead.fields_completed}/{lead.total_fields} fields · {formatDuration(lead.time_on_form)} on form
          </div>
          <div className="modal-footer-actions">
            <button className="modal-cancel-btn" onClick={onClose} type="button">Cancel</button>
            <button
              className="modal-save-btn"
              onClick={handleSave}
              disabled={!statusChanged || saving}
              type="button"
            >
              {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Client Selector ───────────────────────────────────────────────────────────

function ClientSelector({
  clients,
  selected,
  onSelect,
  loading,
}: {
  clients: Client[]
  selected: Client | null
  onSelect: (c: Client) => void
  loading: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <div className="client-bar">
      <span className="client-bar-label">Viewing Client</span>
      <div className="cs-wrap" ref={ref}>
        <button
          className={`cs-btn${open ? ' open' : ''}`}
          onClick={() => setOpen(v => !v)}
          type="button"
          disabled={clients.length === 0}
        >
          <span className="cs-indicator" />
          <span className="cs-selected-name">
            {loading ? 'Loading…' : selected ? displayName(selected) : clients.length === 0 ? 'No clients' : 'Select client'}
          </span>
          <svg className={`cs-chevron${open ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {open && clients.length > 0 && (
          <div className="cs-menu">
            <div className="cs-menu-header"><span>{clients.length} client{clients.length !== 1 ? 's' : ''}</span></div>
            <div className="cs-menu-list">
              {clients.map(c => (
                <button
                  key={c.id}
                  className={`cs-item${c.id === selected?.id ? ' active' : ''}`}
                  onClick={() => { onSelect(c); setOpen(false) }}
                  type="button"
                >
                  <span className="cs-item-name">{displayName(c)}</span>
                  {c.id === selected?.id && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#ff6b35" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <span className="cs-meta">api key: <code>{selected.api_key}</code></span>
      )}
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter()

  const [authed, setAuthed]                     = useState<boolean | null>(null)
  const [userEmail, setUserEmail]               = useState('')
  const [loggingOut, setLoggingOut]             = useState(false)
  const [allClients, setAllClients]             = useState<Client[]>([])
  const [statusFilter, setStatusFilter]         = useState<'all' | 'hot' | 'warm' | 'cold' | 'contacted' | 'converted'>('all')
  const [cardFilter, setCardFilter]             = useState<'none' | 'completion-desc' | 'value-desc' | 'emails-only'>('none')
  const [recoveredRevenue, setRecoveredRevenue] = useState<number>(0)
  const [recoveredCount, setRecoveredCount]     = useState<number>(0)
  const [recoveredWindow, setRecoveredWindow]   = useState<'month' | '30days' | 'all'>('month')
  const [selectedClient, setSelectedClient]     = useState<Client | null>(null)
  const [liveVisitors, setLiveVisitors] = useState<number>(0)
  const pausePollUntil = useRef<number>(0)
  const [momPeriod, setMomPeriod] = useState<'7d' | '14d' | '30d' | '90d' | 'month'>('30d')
  const [liveDrawerOpen, setLiveDrawerOpen] = useState(false)
  const [hoursDrawerOpen, setHoursDrawerOpen] = useState(false)
  const [fieldsDrawerOpen, setFieldsDrawerOpen] = useState(false)
  const [pipelineDrawerOpen, setPipelineDrawerOpen] = useState(false)
  const [attnOpen, setAttnOpen] = useState(false)
  const [deviceDrawerOpen, setDeviceDrawerOpen] = useState(false)
  const [funnelDrawerOpen, setFunnelDrawerOpen] = useState(false)
  const [nowTick, setNowTick] = useState(0)
  const [lastPollAt, setLastPollAt] = useState<number>(0)
  const [liveVisitorList, setLiveVisitorList] = useState<Array<{
    id: string
    session_id: string
    page_url: string | null
    referrer: string | null
    user_agent: string | null
    country: string | null
    city: string | null
    region: string | null
    utm_source: string | null
    utm_medium: string | null
    utm_campaign: string | null
    pages_visited: number
    form_started: boolean
    is_active: boolean
    created_at: string
    last_ping_at: string
    time_on_site_seconds: number
    intent_score: number
    intent_label: 'hot' | 'warm' | 'cool'
    journey: Array<{
      event_type: string
      page_url: string | null
      metadata: Record<string, unknown> | null
      created_at: string
    }>
  }>>([])

  useEffect(() => {
    if (!selectedClient?.id) return
    let cancelled = false
    const fetchLive = async () => {
      try {
        const res = await fetch(`/api/live-visitors?client_id=${selectedClient.id}`)
        const data = await res.json()
        if (!cancelled) setLiveVisitors(data.live_visitors || 0)
      } catch { /* silent */ }
    }
    fetchLive()
    const iv = setInterval(fetchLive, 5000)
    return () => { cancelled = true; clearInterval(iv) }
  }, [selectedClient?.id])

  useEffect(() => {
    if (!liveDrawerOpen || !selectedClient?.id) return
    let cancelled = false
    const fetchList = async () => {
      try {
        const res = await fetch(`/api/live-visitors-list?client_id=${selectedClient.id}`)
        const data = await res.json()
        if (!cancelled) {
          setLiveVisitorList(data.visitors || [])
          setLastPollAt(Date.now())
        }
      } catch { /* silent */ }
    }
    fetchList()
    const iv = setInterval(fetchList, 5000)
    return () => { cancelled = true; clearInterval(iv) }
  }, [liveDrawerOpen, selectedClient?.id])

  useEffect(() => {
    if (!liveDrawerOpen) return
    const iv = setInterval(() => setNowTick(t => t + 1), 1000)
    return () => clearInterval(iv)
  }, [liveDrawerOpen])


  const [clientsLoading, setClientsLoading]     = useState(true)
  const [leads, setLeads]                       = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading]         = useState(false)
  const [leadsError, setLeadsError]             = useState<string | null>(null)
  const [filter, setFilter]                     = useState<Filter>('all')
  const [search, setSearch]                     = useState('')
  const [modalLead, setModalLead]               = useState<Lead | null>(null)

  // ── Auth gate ──────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/login'); return }
      await ensureClient(session.user.id, session.user.email ?? '')
      setUserEmail(session.user.email ?? '')
      setAuthed(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    return () => subscription.unsubscribe()
  }, [router])

  // ── Fetch clients (admin sees all, customers see only their own) ──────────
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!authed) return
    setClientsLoading(true)

    ;(async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setClientsLoading(false)
        return
      }

      // Check if this user is an admin
      const { data: meRow } = await supabase
        .from('clients')
        .select('is_admin')
        .eq('user_id', user.id)
        .single()

      const adminFlag = meRow?.is_admin === true
      setIsAdmin(adminFlag)

      if (adminFlag) {
        // Admin: fetch all clients
        const { data, error } = await supabase
          .from('clients')
          .select('id, name, first_name, last_name, company_name, api_key, active')
          .order('name')
        if (!error && data) {
          const rows = data as Client[]
          setAllClients(rows)
          if (rows.length > 0) {
            // Default to ReCapture admin row when logged in as founder
            const recaptureRow = rows.find(r => r.name === 'ReCapture' || r.company_name === 'ReCapture')
            setSelectedClient(recaptureRow ?? rows[0])
          }
        }
      } else {
        // Customer: fetch ONLY their own client
        const { data, error } = await supabase
          .from('clients')
          .select('id, name, first_name, last_name, company_name, api_key, active')
          .eq('user_id', user.id)
          .single()
        if (!error && data) {
          const row = data as Client
          setAllClients([row])
          setSelectedClient(row)
        }
      }

      setClientsLoading(false)
    })()
  }, [authed])

  // ── Fetch recovered revenue (Recovered = email_sent + status in [contacted, converted]) ──
  useEffect(() => {
    if (!selectedClient) return

    const now = new Date()
    let startDate: string | null = null
    if (recoveredWindow === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    } else if (recoveredWindow === '30days') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
    // 'all' → no date filter

    let query = supabase
      .from('leads')
      .select('estimated_value', { count: 'exact' })
      .eq('client_id', selectedClient.id)
      .eq('email_sent', true)
      .in('status', ['contacted', 'converted'])

    if (startDate) query = query.gte('created_at', startDate)

    query.then(({ data, error, count }) => {
      if (error) {
        setRecoveredRevenue(0)
        setRecoveredCount(0)
        return
      }
      const total = (data || []).reduce((sum, l) => sum + (Number(l.estimated_value) || 0), 0)
      setRecoveredRevenue(total)
      setRecoveredCount(count || 0)
    })
  }, [selectedClient, recoveredWindow])

  // ── Silent poll so new captures appear without a manual refresh ──────────
  useEffect(() => {
    if (!selectedClient) return
    let cancelled = false

    const poll = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('id, session_id, name, email, phone, fields_completed, total_fields, time_on_form, device_type, estimated_value, status, created_at, client_id, email_sent, email_sent_at, form_data')
        .eq('client_id', selectedClient.id)
        .order('created_at', { ascending: false })

      if (cancelled || error || !data) return
      if (Date.now() < pausePollUntil.current) return

      setLeads(prev => {
        // Only replace if something actually changed, so we don't fight the UI
        if (prev.length === data.length && prev[0]?.id === (data[0] as Lead)?.id) {
          const statusChanged = data.some((row, i) =>
            (row as Lead).status !== prev[i]?.status ||
            (row as Lead).email_sent !== prev[i]?.email_sent
          )
          if (!statusChanged) return prev
        }
        return data as Lead[]
      })
    }

    const iv = setInterval(poll, 12000)
    return () => { cancelled = true; clearInterval(iv) }
  }, [selectedClient])

  // ── Fetch leads for selected client ───────────────────────────────────────
  useEffect(() => {
    if (!selectedClient) return
    setLeadsLoading(true)
    setLeadsError(null)
    setLeads([])
    setSearch('')
    supabase
      .from('leads')
      .select('id, session_id, name, email, phone, fields_completed, total_fields, time_on_form, device_type, estimated_value, status, created_at, client_id, email_sent, email_sent_at, form_data')
      .eq('client_id', selectedClient.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setLeadsError(error.message)
        else setLeads((data ?? []) as Lead[])
        setLeadsLoading(false)
      })
  }, [selectedClient?.id])

  // ── Logout ─────────────────────────────────────────────────────────────────
  async function handleLogout() {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.replace('/')
  }

  // ── Handle status update from modal ───────────────────────────────────────
  function handleStatusChange(id: string, status: string) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (modalLead?.id === id) setModalLead(prev => prev ? { ...prev, status } : null)
    // Pause the background poll briefly so it cannot overwrite a fresh write
    pausePollUntil.current = Date.now() + 6000
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const filteredLeads = useMemo(() => {
    let rows = filterByDate(leads, filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q)
      )
    }
    // Status filter chips: hot/warm/cold use score thresholds, contacted/converted match status field
    if (statusFilter === 'hot') {
      rows = rows.filter(l => scoreLead(l).score >= 70)
    } else if (statusFilter === 'warm') {
      rows = rows.filter(l => { const s = scoreLead(l).score; return s >= 50 && s < 70 })
    } else if (statusFilter === 'cold') {
      rows = rows.filter(l => scoreLead(l).score < 50)
    } else if (statusFilter === 'contacted') {
      rows = rows.filter(l => l.status === 'contacted')
    } else if (statusFilter === 'converted') {
      rows = rows.filter(l => l.status === 'converted')
    }
    // Stat card click-throughs
    if (cardFilter === 'completion-desc') {
      rows = [...rows].sort((a, b) => {
        const aPct = a.total_fields > 0 ? a.fields_completed / a.total_fields : 0
        const bPct = b.total_fields > 0 ? b.fields_completed / b.total_fields : 0
        return bPct - aPct
      })
    } else if (cardFilter === 'value-desc') {
      rows = [...rows].sort((a, b) => (b.estimated_value ?? 0) - (a.estimated_value ?? 0))
    } else if (cardFilter === 'emails-only') {
      rows = rows.filter(l => l.email_sent === true)
    }
    return rows
  }, [leads, filter, search, statusFilter, cardFilter])

  const stats = useMemo(() => {
    const total_leads        = filteredLeads.length
    const emails_deployed    = filteredLeads.filter(l => l.email_sent).length
    const total_revenue_lost = filteredLeads.reduce((s, l) => s + (l.estimated_value ?? 0), 0)
    const avg_completion_rate = total_leads > 0
      ? Math.round(filteredLeads.reduce((s, l) => s + (l.total_fields > 0 ? l.fields_completed / l.total_fields : 0), 0) / total_leads * 100)
      : 0
    const avg_time_on_form = total_leads > 0
      ? Math.round(filteredLeads.reduce((s, l) => s + (l.time_on_form ?? 0), 0) / total_leads)
      : 0
    return { total_leads, emails_deployed, total_revenue_lost, avg_completion_rate, avg_time_on_form }
  }, [filteredLeads])

  // ── Period comparison ─────────────────────────────────────────────────────
  const PERIOD_LABELS: Record<string, string> = {
    '7d': 'Last 7 days',
    '14d': 'Last 14 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    'month': 'This month',
  }

  const monthCompare = useMemo(() => {
    const now = new Date()
    const DAY = 24 * 60 * 60 * 1000

    let currentFrom: number
    let currentTo: number
    let previousFrom: number
    let previousTo: number

    if (momPeriod === 'month') {
      currentFrom = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
      currentTo = now.getTime() + 1
      previousFrom = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
      previousTo = currentFrom
    } else {
      const days = momPeriod === '7d' ? 7 : momPeriod === '14d' ? 14 : momPeriod === '90d' ? 90 : 30
      currentTo = now.getTime() + 1
      currentFrom = currentTo - days * DAY
      previousTo = currentFrom
      previousFrom = previousTo - days * DAY
    }

    const bucket = (from: number, to: number) => {
      const rows = leads.filter(l => {
        const t = new Date(l.created_at).getTime()
        return t >= from && t < to
      })
      return {
        count: rows.length,
        value: rows.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0),
        recovered: rows.filter(l => l.status === 'converted').length,
        emailed: rows.filter(l => l.email_sent).length,
      }
    }

    const current = bucket(currentFrom, currentTo)
    const previous = bucket(previousFrom, previousTo)

    const delta = (a: number, b: number) => {
      if (b === 0) return a > 0 ? 100 : 0
      return Math.round(((a - b) / b) * 100)
    }

    // Daily buckets across the current window for the sparkline
    const spanDays = Math.max(1, Math.round((currentTo - currentFrom) / DAY))
    const buckets = Math.min(spanDays, 90)
    const step = (currentTo - currentFrom) / buckets
    const daily: number[] = []
    const dayLabels: string[] = []
    for (let i = 0; i < buckets; i++) {
      const from = currentFrom + i * step
      const to = from + step
      daily.push(leads.filter(l => {
        const t = new Date(l.created_at).getTime()
        return t >= from && t < to
      }).length)
      dayLabels.push(new Date(from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    }

    const conversionRate = current.count > 0
      ? Math.round((current.recovered / current.count) * 100)
      : 0

    const fmtRange = (from: number, to: number) => {
      const o: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
      return new Date(from).toLocaleDateString('en-US', o) + ' \u2013 ' + new Date(to - 1).toLocaleDateString('en-US', o)
    }

    return {
      daily,
      dayLabels,
      conversionRate,
      current,
      previous,
      countDelta: delta(current.count, previous.count),
      valueDelta: delta(current.value, previous.value),
      recoveredDelta: delta(current.recovered, previous.recovered),
      emailedDelta: delta(current.emailed, previous.emailed),
      periodLabel: PERIOD_LABELS[momPeriod],
      currentRange: fmtRange(currentFrom, currentTo),
      previousRange: fmtRange(previousFrom, previousTo),
      hasPrevious: previous.count > 0,
    }
  }, [leads, momPeriod])

  const periodRecovered = useMemo(() => {
    const now = new Date()
    const DAY = 24 * 60 * 60 * 1000
    let from: number
    const to = now.getTime() + 1
    if (momPeriod === 'month') {
      from = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    } else {
      const days = momPeriod === '7d' ? 7 : momPeriod === '14d' ? 14 : momPeriod === '90d' ? 90 : 30
      from = to - days * DAY
    }
    const rows = leads.filter(l => {
      const t = new Date(l.created_at).getTime()
      return t >= from && t < to && l.status === 'converted'
    })
    return {
      count: rows.length,
      value: rows.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0),
    }
  }, [leads, momPeriod])

  // ── Behavior metrics from captured leads ─────────────────────────────────
  const behavior = useMemo(() => {
    const rows = filteredLeads
    if (rows.length === 0) {
      return {
        afterHoursPct: 0, afterHoursCount: 0, mobilePct: 0,
        peakHour: null as string | null, peakCount: 0,
        responseMins: null as number | null,
        hourly: [] as { hour: number; label: string; count: number; afterHours: boolean; pct: number }[],
        topHours: [] as { hour: number; label: string; count: number; afterHours: boolean; pct: number }[],
        totalRows: 0,
      }
    }

    // After hours = before 8am or at/after 6pm, local time
    const afterHours = rows.filter(l => {
      const h = new Date(l.created_at).getHours()
      return h < 8 || h >= 18
    }).length

    const mobile = rows.filter(l => (l.device_type || '').toLowerCase().includes('mobile')).length

    // Peak hour of day
    const hours = new Array(24).fill(0)
    rows.forEach(l => { hours[new Date(l.created_at).getHours()]++ })
    let peakIdx = 0
    hours.forEach((c, i) => { if (c > hours[peakIdx]) peakIdx = i })
    const peakCount = hours[peakIdx]
    const fmtHour = (h: number) => {
      const ampm = h < 12 ? 'AM' : 'PM'
      const display = h % 12 === 0 ? 12 : h % 12
      return display + ' ' + ampm
    }

    // Median minutes between capture and recovery email
    const gaps = rows
      .filter(l => l.email_sent && l.email_sent_at)
      .map(l => (new Date(l.email_sent_at as string).getTime() - new Date(l.created_at).getTime()) / 60000)
      .filter(m => m >= 0)
      .sort((a, b) => a - b)
    const responseMins = gaps.length > 0 ? Math.round(gaps[Math.floor(gaps.length / 2)]) : null

    // Full 24h distribution for the drawer
    const hourly = hours.map((count, h) => ({
      hour: h,
      label: fmtHour(h),
      count,
      afterHours: h < 8 || h >= 18,
      pct: rows.length > 0 ? Math.round((count / rows.length) * 100) : 0,
    }))

    const topHours = [...hourly]
      .filter(x => x.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    return {
      afterHoursPct: Math.round((afterHours / rows.length) * 100),
      afterHoursCount: afterHours,
      mobilePct: Math.round((mobile / rows.length) * 100),
      peakHour: peakCount > 0 ? fmtHour(peakIdx) : null,
      peakCount,
      responseMins,
      hourly,
      topHours,
      totalRows: rows.length,
    }
  }, [filteredLeads])

  // ── Field-level drop-off ─────────────────────────────────────────────────
  const fieldDropoff = useMemo(() => {
    const rows = filteredLeads
    if (rows.length === 0) return { fields: [] as { name: string; count: number; pct: number }[], total: 0 }

    const tally: Record<string, number> = {}
    rows.forEach(l => {
      if (!l.form_data) return
      Object.keys(l.form_data).forEach(k => {
        const val = l.form_data?.[k]
        if (val && String(val).trim()) tally[k] = (tally[k] || 0) + 1
      })
    })

    const pretty = (k: string) =>
      k.replace(/[_-]+/g, ' ')
       .replace(/([a-z])([A-Z])/g, '$1 $2')
       .replace(/\b\w/g, c => c.toUpperCase())
       .trim()

    const fields = Object.entries(tally)
      .map(([name, count]) => ({
        name: pretty(name),
        count,
        pct: Math.round((count / rows.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    return { fields, total: rows.length }
  }, [filteredLeads])

  // ── Pipeline value by score band ─────────────────────────────────────────
  const pipelineBands = useMemo(() => {
    const rows = filteredLeads
    const bands = [
      { key: 'hot',  label: 'Hot',  color: '#ef4444', min: 70, max: 101 },
      { key: 'warm', label: 'Warm', color: '#f59e0b', min: 50, max: 70 },
      { key: 'cold', label: 'Cold', color: '#6b7280', min: 0,  max: 50 },
    ]
    const total = rows.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0)

    const out = bands.map(b => {
      const matched = rows.filter(l => {
        const sc = scoreLead(l).score
        return sc >= b.min && sc < b.max
      })
      const value = matched.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0)
      return {
        ...b,
        count: matched.length,
        value,
        pct: total > 0 ? Math.round((value / total) * 100) : 0,
      }
    })

    return { bands: out, total, count: rows.length }
  }, [filteredLeads])

  // ── Needs attention: hot, recent, still untouched ─────────────────────────
  const needsAttention = useMemo(() => {
    const cutoff = Date.now() - 48 * 60 * 60 * 1000
    const rows = leads.filter(l => {
      const recent = new Date(l.created_at).getTime() >= cutoff
      const untouched = !['contacted', 'converted', 'lost'].includes(l.status ?? '')
      const hot = scoreLead(l).score >= 70
      return recent && untouched && hot
    })
    const oldest = rows.length > 0
      ? rows.reduce((a, b) => new Date(a.created_at) < new Date(b.created_at) ? a : b)
      : null
    return {
      count: rows.length,
      value: rows.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0),
      oldestAt: oldest ? oldest.created_at : null,
      rows: [...rows].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    }
  }, [leads])

  // ── Device + after-hours crossover ───────────────────────────────────────
  const deviceBreak = useMemo(() => {
    const rows = filteredLeads
    if (rows.length === 0) return { total: 0, mobile: 0, desktop: 0, tablet: 0, mobilePct: 0, mobileAfterHours: 0, mobileAfterHoursPct: 0, avgMobileFields: 0, avgDesktopFields: 0 }

    const isMob = (l: Lead) => (l.device_type || '').toLowerCase().includes('mobile')
    const isTab = (l: Lead) => (l.device_type || '').toLowerCase().includes('tablet')
    const mobileRows = rows.filter(isMob)
    const tabletRows = rows.filter(isTab)
    const desktopRows = rows.filter(l => !isMob(l) && !isTab(l))

    const afterHrs = (l: Lead) => { const h = new Date(l.created_at).getHours(); return h < 8 || h >= 18 }
    const mobileAfterHours = mobileRows.filter(afterHrs).length

    const avg = (arr: Lead[]) => arr.length > 0
      ? Math.round(arr.reduce((sum, l) => sum + (l.total_fields > 0 ? l.fields_completed / l.total_fields : 0), 0) / arr.length * 100)
      : 0

    return {
      total: rows.length,
      mobile: mobileRows.length,
      desktop: desktopRows.length,
      tablet: tabletRows.length,
      mobilePct: Math.round((mobileRows.length / rows.length) * 100),
      mobileAfterHours,
      mobileAfterHoursPct: mobileRows.length > 0 ? Math.round((mobileAfterHours / mobileRows.length) * 100) : 0,
      avgMobileFields: avg(mobileRows),
      avgDesktopFields: avg(desktopRows),
    }
  }, [filteredLeads])

  // ── Recovery funnel ──────────────────────────────────────────────────────
  const recoveryFunnel = useMemo(() => {
    const rows = filteredLeads
    const captured = rows.length
    const emailed = rows.filter(l => l.email_sent).length
    const contacted = rows.filter(l => ['contacted', 'converted'].includes(l.status ?? '')).length
    const converted = rows.filter(l => l.status === 'converted').length
    const lost = rows.filter(l => l.status === 'lost').length
    const open = captured - contacted - lost

    const pct = (n: number) => captured > 0 ? Math.round((n / captured) * 100) : 0

    return {
      captured, emailed, contacted, converted, lost, open,
      emailedPct: pct(emailed),
      contactedPct: pct(contacted),
      convertedPct: pct(converted),
      openPct: pct(open),
      convertedValue: rows.filter(l => l.status === 'converted').reduce((sum, l) => sum + (l.estimated_value ?? 0), 0),
      contactToConvert: contacted > 0 ? Math.round((converted / contacted) * 100) : 0,
    }
  }, [filteredLeads])

  // ── CSV export of exactly what is on screen ───────────────────────────────
  const exportCSV = () => {
    const esc = (v: unknown) => {
      const str = v === null || v === undefined ? '' : String(v)
      return /[",\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str
    }

    const headers = [
      'Captured At', 'Name', 'Email', 'Phone', 'Lead Score', 'Score Band',
      'Status', 'Fields Completed', 'Total Fields', 'Completion %',
      'Time on Form (sec)', 'Device', 'Estimated Value', 'Recovery Email Sent',
      'Recovery Email Sent At', 'Session ID',
    ]

    const rows = filteredLeads.map(l => {
      const sc = scoreLead(l)
      const completion = l.total_fields > 0
        ? Math.round((l.fields_completed / l.total_fields) * 100)
        : 0
      return [
        new Date(l.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago' }),
        l.name ?? '',
        l.email ?? '',
        l.phone ?? '',
        sc.score,
        sc.label,
        l.status ?? '',
        l.fields_completed,
        l.total_fields,
        completion,
        l.time_on_form ?? 0,
        l.device_type ?? '',
        l.estimated_value ?? 0,
        l.email_sent ? 'Yes' : 'No',
        l.email_sent_at ? new Date(l.email_sent_at).toLocaleString('en-US', { timeZone: 'America/Chicago' }) : '',
        l.session_id ?? '',
      ].map(esc).join(',')
    })

    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const stamp = new Date().toISOString().slice(0, 10)
    const who = selectedClient?.company_name || selectedClient?.name || 'recapture'
    a.href = url
    a.download = who.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-leads-' + stamp + '.csv'
    document.body.appendChild(a)
    a.click()
    // Give the browser time to read the blob before releasing it.
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 2000)
  }

  const isLoading = leadsLoading || clientsLoading

  // ── Auth spinner ───────────────────────────────────────────────────────────
  if (authed === null) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ color: '#333', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Authenticating…</div>
      </div>
    )
  }

  return (
    <div className="dashboard">

      <AdminNav />
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="logo">
          
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Logo /></span>
        </div>
        <div className="header-right">
          {selectedClient && <span className="client-name">{displayName(selectedClient)}</span>}
            <button className="logout-btn" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      {/* ── Client Selector Bar (admin-only) ─────────────────────────────── */}
      {isAdmin && (
        <ClientSelector
          clients={allClients}
          selected={selectedClient}
          onSelect={c => { setSelectedClient(c); setFilter('all') }}
          loading={clientsLoading}
        />
      )}

      {/* ── Recovered Revenue Hero Block ────────────────────────────────────── */}
      <div className="roi-hero">
        <div className="roi-hero-inner">
          <div className="roi-hero-left">
            <div className="roi-eyebrow">RECOVERED REVENUE</div>
            <div className="roi-amount">
              ${periodRecovered.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="roi-subtitle">
              {periodRecovered.count > 0
                ? 'Across ' + periodRecovered.count + ' recovered lead' + (periodRecovered.count === 1 ? '' : 's') + ' \u00b7 ' + monthCompare.conversionRate + '% of captured'
                : 'Mark a lead Converted and its value lands here'}
            </div>
          </div>
          <div className="roi-hero-right">
            <div className="roi-period-note">
              <div className="roi-period-label">{monthCompare.periodLabel}</div>
              <div className="roi-period-range">{monthCompare.currentRange}</div>
            </div>
          </div>
        </div>
      </div>

      {needsAttention.count > 0 && (
        <div className={'attn-wrap' + (attnOpen ? ' open' : '')}>
          <button className="attn-strip" type="button" onClick={() => setAttnOpen(o => !o)}>
            <span className="attn-pulse" />
            <span className="attn-text">
              <b>{needsAttention.count} hot {needsAttention.count === 1 ? 'inquiry' : 'inquiries'}</b>
              {' from the last 48 hours '}
              {needsAttention.count === 1 ? 'has' : 'have'} not been contacted
              <span className="attn-value">{formatCurrency(needsAttention.value)} in pipeline</span>
            </span>
            <span className="attn-cta">
              {attnOpen ? 'Hide' : 'Review'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: attnOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>

          {attnOpen && (
            <div className="attn-body">
              {needsAttention.rows.map(l => {
                const sc = scoreLead(l)
                return (
                  <button key={l.id} className="attn-row" type="button" onClick={() => setModalLead(l)}>
                    <span className="attn-row-main">
                      <span className="attn-row-name">{l.name || 'Unknown'}</span>
                      <span className="attn-row-contact">{l.email || l.phone || 'No contact captured'}</span>
                    </span>
                    <span className="attn-row-meta">
                      <span className="attn-row-score" style={{ color: sc.color }}>{sc.label} {sc.score}</span>
                      <span className="attn-row-time">{formatRelativeTime(l.created_at)}</span>
                      <span className="attn-row-value">{formatCurrency(l.estimated_value ?? 0)}</span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="attn-row-arrow">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                )
              })}
              <div className="attn-foot">
                Oldest waiting {needsAttention.oldestAt ? formatRelativeTime(needsAttention.oldestAt) : ''} &middot; open one to log the outcome
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Month over month ──────────────────────────────────────────────── */}
      <div className="mom-band">
        <div className="mom-head">
          <div className="mom-head-left">
            <div className="mom-period-row">
              <select
                className="mom-period"
                value={momPeriod}
                onChange={e => setMomPeriod(e.target.value as typeof momPeriod)}
                aria-label="Comparison period"
              >
                <option value="7d">Last 7 days</option>
                <option value="14d">Last 14 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="month">This month</option>
              </select>
              <span className="mom-range">{monthCompare.currentRange}</span>
            </div>
            <div className="mom-sub">
              {monthCompare.hasPrevious
                ? 'Compared against ' + monthCompare.previousRange
                : 'No activity in the prior period (' + monthCompare.previousRange + ')'}
            </div>
          </div>
          <button className="mom-export" onClick={exportCSV} type="button" title="Download the leads currently shown as CSV">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        <div className="mom-grid">
          {[
            {
              key: 'captured',
              value: String(monthCompare.current.count),
              label: 'Leads Captured',
              delta: monthCompare.countDelta,
              prev: String(monthCompare.previous.count),
              empty: 'No captures yet this month',
              spark: true,
            },
            {
              key: 'value',
              value: formatCurrency(monthCompare.current.value),
              label: 'Pipeline Value',
              delta: monthCompare.valueDelta,
              prev: formatCurrency(monthCompare.previous.value),
              empty: 'Based on your average case value',
            },
            {
              key: 'converted',
              value: String(monthCompare.current.recovered),
              label: 'Marked Converted',
              delta: monthCompare.recoveredDelta,
              prev: String(monthCompare.previous.recovered),
              empty: 'Set a lead to Converted to track this',
              suffix: monthCompare.current.recovered > 0 ? monthCompare.conversionRate + '% of captured' : undefined,
            },
            {
              key: 'emails',
              value: String(monthCompare.current.emailed),
              label: 'Recovery Emails',
              delta: monthCompare.emailedDelta,
              prev: String(monthCompare.previous.emailed),
              empty: 'Enable auto-send in Settings',
            },
          ].map(m => (
            <div className="mom-cell" key={m.key}>
              <div className="mom-metric">{m.value}</div>
              <div className="mom-label">{m.label}</div>

              {monthCompare.hasPrevious ? (
                <div className={'mom-delta ' + (m.delta >= 0 ? 'up' : 'down')}>
                  {m.delta >= 0 ? '\u25b2' : '\u25bc'} {Math.abs(m.delta)}%
                  <span className="mom-prev">vs {m.prev}</span>
                </div>
              ) : m.suffix ? (
                <div className="mom-note accent">{m.suffix}</div>
              ) : m.value === '0' || m.value === '$0' ? (
                <div className="mom-note">{m.empty}</div>
              ) : (
                <div className="mom-note">No prior period to compare</div>
              )}

              {m.spark && monthCompare.daily.length > 1 && (
                <div className="mom-spark">
                  {monthCompare.daily.map((v, i) => {
                    const peak = Math.max(...monthCompare.daily, 1)
                    return (
                      <span
                        key={i}
                        className={'mom-spark-bar' + (v > 0 ? ' filled' : '')}
                        style={{ height: Math.max(2, (v / peak) * 22) + 'px' }}
                      >
                        <span className="mom-spark-tip">
                          <b>{v}</b> {v === 1 ? 'lead' : 'leads'}
                          <em>{monthCompare.dayLabels[i]}</em>
                        </span>
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats (5 cards) — 4 are clickable filter shortcuts ─────────────── */}
      <div className="stats-grid">

        {/* ── Row 1 · Activity ─────────────────────────────────────────── */}
        <button
          className="stat-card stat-card-live stat-card-clickable"
          onClick={() => setLiveDrawerOpen(true)}
          type="button"
          aria-label="Show live visitors detail"
        >
          <div className="stat-header">
            <div className="stat-label"><span className="live-pulse-dot"></span>Live Visitors</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
          </div>
          <div className="stat-value">{liveVisitors}</div>
        </button>

        <button
          className={`stat-card stat-card-clickable${cardFilter === 'none' && statusFilter === 'all' ? ' active' : ''}`}
          onClick={() => { setCardFilter('none'); setStatusFilter('all') }}
          type="button"
          aria-label="Show all leads"
        >
          <div className="stat-header">
            <div className="stat-label">Leads Captured</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : stats.total_leads}</div>
        </button>

        <button
          className={`stat-card stat-card-clickable${cardFilter === 'completion-desc' ? ' active' : ''}`}
          onClick={() => setFieldsDrawerOpen(true)}
          type="button"
          aria-label="Show field drop-off breakdown"
        >
          <div className="stat-header">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : `${stats.avg_completion_rate}%`}</div>
        </button>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Avg. Time on Form</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : formatDuration(stats.avg_time_on_form)}</div>
        </div>

        <button
          className="stat-card stat-card-clickable"
          onClick={() => setHoursDrawerOpen(true)}
          type="button"
          aria-label="Show inquiry timing breakdown"
        >
          <div className="stat-header">
            <div className="stat-label">Peak Inquiry Hour</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : (behavior.peakHour ?? '\u2014')}</div>
          {behavior.peakCount > 0 && (
            <div className="stat-sub">{behavior.peakCount} {behavior.peakCount === 1 ? 'lead' : 'leads'}</div>
          )}
        </button>

        {/* ── Row 2 · Value ────────────────────────────────────────────── */}
        <button
          className={`stat-card stat-card-clickable${cardFilter === 'value-desc' ? ' active' : ''}`}
          onClick={() => setPipelineDrawerOpen(true)}
          type="button"
          aria-label="Show pipeline value breakdown"
        >
          <div className="stat-header">
            <div className="stat-label">Pipeline at Risk</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : formatCurrency(stats.total_revenue_lost)}</div>
        </button>

        <button
          className={`stat-card stat-card-clickable${statusFilter === 'converted' ? ' active' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'converted' ? 'all' : 'converted')}
          type="button"
          aria-label="Filter to converted leads"
        >
          <div className="stat-header">
            <div className="stat-label">Recovered Revenue</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
          </div>
          <div className="stat-value" style={{ color: periodRecovered.value > 0 ? '#22c55e' : undefined }}>
            {isLoading ? '\u2014' : formatCurrency(periodRecovered.value)}
          </div>
        </button>

        <button
          className="stat-card stat-card-clickable"
          onClick={() => setFunnelDrawerOpen(true)}
          type="button"
          aria-label="Show recovery funnel"
        >
          <div className="stat-header">
            <div className="stat-label">Recovery Rate</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : monthCompare.conversionRate + '%'}</div>
        </button>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">After Hours</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : behavior.afterHoursPct + '%'}</div>
          <div className="stat-sub">before 8am or after 6pm</div>
        </div>

        <button
          className="stat-card stat-card-clickable"
          onClick={() => setDeviceDrawerOpen(true)}
          type="button"
          aria-label="Show device breakdown"
        >
          <div className="stat-header">
            <div className="stat-label">On Mobile</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '\u2014' : behavior.mobilePct + '%'}</div>
          <div className="stat-sub">of captured inquiries</div>
        </button>

      </div>

      {/* ── Status filter chips ─────────────────────────────────────────────── */}
      <div className="status-chips">
        {([
          { v: 'all', label: 'All Leads' },
          { v: 'hot', label: 'Hot', dot: '#ef4444' },
          { v: 'warm', label: 'Warm', dot: '#f59e0b' },
          { v: 'cold', label: 'Cold', dot: '#6b7280' },
          { v: 'contacted', label: 'Contacted', dot: '#f59e0b' },
          { v: 'converted', label: 'Converted', dot: '#10b981' },
        ] as const).map(c => (
          <button
            key={c.v}
            className={`chip${statusFilter === c.v ? ' active' : ''}`}
            onClick={() => setStatusFilter(c.v)}
            type="button"
          >
            {'dot' in c && <span className="chip-dot" style={{ background: c.dot }} />}
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div className="controls">
        <div className="filters">
          {(['today', 'week', 'month', 'all'] as Filter[]).map(f => (
            <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'today' ? 'Today' : f === 'week' ? 'This Week' : f === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
        <div className="search-box">
          <span className="search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input type="text" className="search-input" placeholder="Search leads..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* ── Leads Table ─────────────────────────────────────────────────────── */}
      <div className="table-container">
        <div className="table-header">
          <div className="table-header-cell">Lead Info</div>
          <div className="table-header-cell">Fields Completed</div>
          <div className="table-header-cell">Time on Form</div>
          <div className="table-header-cell">Device</div>
          <div className="table-header-cell">Est. Value</div>
          <div className="table-header-cell"></div>
        </div>

        <div
          className="table-body"
          onWheel={(e) => {
            const el = e.currentTarget
            const atTop = el.scrollTop === 0
            const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight
            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
              return
            }
            e.stopPropagation()
          }}
        >
          {isLoading && <div className="state-row">Loading leads…</div>}
          {leadsError && <div className="state-row" style={{ color: '#f87171' }}>Error: {leadsError}</div>}
          {!isLoading && !leadsError && filteredLeads.length === 0 && (
            search ? (
              <div className="state-row">No leads match your search.</div>
            ) : (
              <div className="empty-state">
                <div className="empty-pulse">
                  <span className="empty-pulse-dot" />
                  <span className="empty-pulse-ring" />
                </div>
                <div className="empty-eyebrow">TRACKING ACTIVE</div>
                <h3 className="empty-title">Quiet right now.</h3>
                <p className="empty-body">
                  Your tracker is live and listening for partial form submissions.
                </p>
                <p className="empty-body-muted">
                  The first lead usually arrives within 48 hours of installation.
                </p>
                <div className="empty-divider" />
                <div className="empty-checklist">
                  <div className="empty-check-item">
                    <svg className="empty-check-icon done" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Tracker installed</span>
                  </div>
                  <div className="empty-check-item">
                    <svg className="empty-check-icon waiting" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Awaiting first capture</span>
                  </div>
                  <div className="empty-check-item">
                    <svg className="empty-check-icon pending" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Recovery email fires automatically</span>
                  </div>
                </div>
              </div>
            )
          )}

          {!isLoading && filteredLeads.map((lead, i) => {
            const pct = lead.total_fields > 0 ? (lead.fields_completed / lead.total_fields) * 100 : 0
            return (
              <div key={lead.id} className={`table-row${i === 0 ? ' new-entry' : ''}`}>
                <div className="lead-info">
                  <div className="lead-name">{lead.name ?? '—'}</div>
                  {lead.email && <div className="lead-email">{lead.email}</div>}
                  {lead.phone && <div className="lead-phone">{lead.phone}</div>}
                  {!lead.email && !lead.phone && <div className="lead-phone">No contact info</div>}
                  {/* Status pill */}
                  <div className="lead-status-pill" style={{ color: statusColor(lead.status), borderColor: `${statusColor(lead.status)}40`, background: `${statusColor(lead.status)}12` }}>
                    {(lead.status ?? 'open').charAt(0).toUpperCase() + (lead.status ?? 'open').slice(1)}
                  </div>
                  {/* Lead score badge */}
                  {(() => { const s = scoreLead(lead); return (
                    <div className="lead-score-pill" style={{ color: s.color, borderColor: s.color + "40", background: s.bg, display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 700, border: "1px solid", marginTop: "4px" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} /> {s.label} ({s.score})
                    </div>
                  ); })()}
                  </div>

                <div className="field-progress">
                  <div className="progress-header">
                    <span className="progress-text">{lead.fields_completed}/{lead.total_fields}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="time-info">
                  <div className="timestamp">{formatRelativeTime(lead.created_at)}</div>
                  <div className="duration">{formatDuration(lead.time_on_form)}</div>
                </div>

                <div><div className="device-badge">{deviceLabel(lead.device_type)}</div></div>

                <div>
                  <div className="est-value">{formatCurrency(lead.estimated_value)}</div>
                  {lead.email_sent && (
                    <div className="email-sent-badge">sent</div>
                  )}
                </div>

                <div>
                  <button className="action-btn" onClick={() => setModalLead(lead)}>→</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Lead Detail Modal ────────────────────────────────────────────────── */}
      {modalLead && (
        <LeadModal
          lead={modalLead}
          onClose={() => setModalLead(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      
      {deviceDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setDeviceDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">Device Breakdown<span className="live-drawer-count">{deviceBreak.total}</span></div>
              <button className="live-drawer-close" onClick={() => setDeviceDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {deviceBreak.total === 0 ? (
                <div className="live-drawer-empty">No captured inquiries yet.<br/><span className="live-drawer-empty-sub">Device patterns appear once inquiries start coming in.</span></div>
              ) : (
                <>
                  <p className="drop-intro">The device someone uses tells you when and how they are reaching out &mdash; and how much of the form they are likely to finish.</p>
                  <div className="band-list">
                    {[
                      { label: 'Mobile', count: deviceBreak.mobile, color: '#ff6b35' },
                      { label: 'Desktop', count: deviceBreak.desktop, color: '#6366f1' },
                      { label: 'Tablet', count: deviceBreak.tablet, color: '#6b7280' },
                    ].filter(d => d.count > 0).map(d => {
                      const pct = Math.round((d.count / deviceBreak.total) * 100)
                      return (
                        <div className="band-row" key={d.label}>
                          <div className="band-head">
                            <span className="band-dot" style={{ background: d.color }} />
                            <span className="band-label">{d.label}</span>
                            <span className="band-value">{pct}%</span>
                          </div>
                          <div className="band-bar"><span style={{ width: Math.max(pct, 3) + '%', background: d.color }} /></div>
                          <div className="band-meta">{d.count} {d.count === 1 ? 'inquiry' : 'inquiries'}</div>
                        </div>
                      )
                    })}
                  </div>
                  {deviceBreak.mobile > 0 && (
                    <div className="hours-summary" style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0, borderBottom: 'none' }}>
                      <div className="hours-summary-item">
                        <div className="hours-summary-value">{deviceBreak.mobileAfterHoursPct}%</div>
                        <div className="hours-summary-label">Of mobile inquiries arrive after hours</div>
                      </div>
                      <div className="hours-summary-divider" />
                      <div className="hours-summary-item">
                        <div className="hours-summary-value">{deviceBreak.avgMobileFields}%</div>
                        <div className="hours-summary-label">Avg. form completion on mobile</div>
                      </div>
                      {deviceBreak.desktop > 0 && (
                        <>
                          <div className="hours-summary-divider" />
                          <div className="hours-summary-item">
                            <div className="hours-summary-value">{deviceBreak.avgDesktopFields}%</div>
                            <div className="hours-summary-label">Avg. completion on desktop</div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <p className="hours-note">Mobile inquiries typically arrive outside business hours and complete less of the form. They are the hardest to catch and the easiest to lose.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {funnelDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setFunnelDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">Recovery Funnel<span className="live-drawer-count">{recoveryFunnel.convertedPct}%</span></div>
              <button className="live-drawer-close" onClick={() => setFunnelDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {recoveryFunnel.captured === 0 ? (
                <div className="live-drawer-empty">No captured inquiries yet.<br/><span className="live-drawer-empty-sub">The funnel appears once inquiries start coming in.</span></div>
              ) : (
                <>
                  <p className="drop-intro">Recovery rate is converted divided by captured. Here is every stage in between.</p>
                  <div className="drop-list">
                    {[
                      { name: 'Captured', count: recoveryFunnel.captured, pct: 100, note: 'Inquiries that started but never submitted' },
                      { name: 'Recovery email sent', count: recoveryFunnel.emailed, pct: recoveryFunnel.emailedPct, note: 'Follow-up delivered' },
                      { name: 'Contacted', count: recoveryFunnel.contacted, pct: recoveryFunnel.contactedPct, note: 'Someone on your team reached out' },
                      { name: 'Converted', count: recoveryFunnel.converted, pct: recoveryFunnel.convertedPct, note: 'Became a client' },
                    ].map(f => (
                      <div className="drop-row" key={f.name}>
                        <div className="drop-head">
                          <span className="drop-name">{f.name}</span>
                          <span className="drop-pct">{f.pct}%</span>
                        </div>
                        <div className="drop-bar"><span style={{ width: Math.max(f.pct, f.count > 0 ? 3 : 0) + '%' }} /></div>
                        <div className="drop-meta">{f.count} of {recoveryFunnel.captured}<span>{f.note}</span></div>
                      </div>
                    ))}
                  </div>
                  <div className="hours-summary" style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0, borderBottom: 'none' }}>
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{recoveryFunnel.open}</div>
                      <div className="hours-summary-label">Still open</div>
                    </div>
                    <div className="hours-summary-divider" />
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{recoveryFunnel.contactToConvert}%</div>
                      <div className="hours-summary-label">Convert once contacted</div>
                    </div>
                    <div className="hours-summary-divider" />
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{formatCurrency(recoveryFunnel.convertedValue)}</div>
                      <div className="hours-summary-label">Recovered value</div>
                    </div>
                  </div>
                  <p className="hours-note">The gap between contacted and converted is a follow-up question. The gap between captured and contacted is a speed question.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {fieldsDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setFieldsDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">
                Where People Stop
                <span className="live-drawer-count">{stats.avg_completion_rate}%</span>
              </div>
              <button className="live-drawer-close" onClick={() => setFieldsDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {fieldDropoff.fields.length === 0 ? (
                <div className="live-drawer-empty">
                  No field data captured yet.<br/>
                  <span className="live-drawer-empty-sub">Drop-off patterns appear once inquiries start coming in.</span>
                </div>
              ) : (
                <>
                  <p className="drop-intro">
                    Of {fieldDropoff.total} captured {fieldDropoff.total === 1 ? 'inquiry' : 'inquiries'}, here is how far people got before leaving.
                  </p>
                  <div className="drop-list">
                    {fieldDropoff.fields.map((f, i) => {
                      const prev = i > 0 ? fieldDropoff.fields[i - 1].count : f.count
                      const lost = prev - f.count
                      return (
                        <div className="drop-row" key={f.name}>
                          <div className="drop-head">
                            <span className="drop-name">{f.name}</span>
                            <span className="drop-pct">{f.pct}%</span>
                          </div>
                          <div className="drop-bar">
                            <span style={{ width: f.pct + '%' }} />
                          </div>
                          <div className="drop-meta">
                            {f.count} of {fieldDropoff.total}
                            {lost > 0 && <span className="drop-lost">&minus;{lost} dropped here</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <p className="hours-note">
                    The steepest fall is where the form is costing the most. Removing or reordering that field is usually the fastest win.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {pipelineDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setPipelineDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">
                Pipeline at Risk
                <span className="live-drawer-count">{formatCurrency(pipelineBands.total)}</span>
              </div>
              <button className="live-drawer-close" onClick={() => setPipelineDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {pipelineBands.count === 0 ? (
                <div className="live-drawer-empty">
                  No captured inquiries yet.<br/>
                  <span className="live-drawer-empty-sub">Value breakdown appears once inquiries start coming in.</span>
                </div>
              ) : (
                <>
                  <p className="drop-intro">
                    Estimated value of captured inquiries, split by how engaged the visitor was before leaving.
                  </p>
                  <div className="band-list">
                    {pipelineBands.bands.map(b => (
                      <div className="band-row" key={b.key}>
                        <div className="band-head">
                          <span className="band-dot" style={{ background: b.color }} />
                          <span className="band-label">{b.label}</span>
                          <span className="band-value">{formatCurrency(b.value)}</span>
                        </div>
                        <div className="band-bar">
                          <span style={{ width: Math.max(b.pct, b.count > 0 ? 3 : 0) + '%', background: b.color }} />
                        </div>
                        <div className="band-meta">
                          {b.count} {b.count === 1 ? 'inquiry' : 'inquiries'} &middot; {b.pct}% of value
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="hours-note">
                    Hot inquiries got furthest into the form and are the most likely to respond. That is where recovery effort returns the most.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {hoursDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setHoursDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">
                When Inquiries Arrive
                <span className="live-drawer-count">{behavior.totalRows}</span>
              </div>
              <button className="live-drawer-close" onClick={() => setHoursDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {behavior.totalRows === 0 ? (
                <div className="live-drawer-empty">
                  No captured inquiries yet.<br/>
                  <span className="live-drawer-empty-sub">Timing patterns appear once inquiries start coming in.</span>
                </div>
              ) : (
                <>
                  <div className="hours-summary">
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{behavior.afterHoursPct}%</div>
                      <div className="hours-summary-label">Arrive outside 8am&ndash;6pm</div>
                    </div>
                    <div className="hours-summary-divider" />
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{behavior.peakHour ?? '\u2014'}</div>
                      <div className="hours-summary-label">Busiest hour</div>
                    </div>
                    <div className="hours-summary-divider" />
                    <div className="hours-summary-item">
                      <div className="hours-summary-value">{behavior.mobilePct}%</div>
                      <div className="hours-summary-label">On mobile</div>
                    </div>
                  </div>

                  <div className="hours-chart">
                    {behavior.hourly.map(h => {
                      const peak = Math.max(...behavior.hourly.map(x => x.count), 1)
                      return (
                        <div className="hours-col" key={h.hour}>
                          <div className="hours-bar-wrap">
                            <div
                              className={'hours-bar' + (h.count > 0 ? ' filled' : '') + (h.afterHours ? ' after' : '')}
                              style={{ height: h.count > 0 ? Math.max(6, (h.count / peak) * 100) + '%' : '2px' }}
                            >
                              {h.count > 0 && (
                                <span className="hours-tip">
                                  <b>{h.count}</b> {h.count === 1 ? 'inquiry' : 'inquiries'}
                                  <em>{h.label}</em>
                                </span>
                              )}
                            </div>
                          </div>
                          {h.hour % 6 === 0 && <div className="hours-axis">{h.label.replace(' ', '')}</div>}
                        </div>
                      )
                    })}
                  </div>

                  <div className="hours-legend">
                    <span><i className="hours-swatch biz" /> Business hours</span>
                    <span><i className="hours-swatch aft" /> After hours</span>
                  </div>

                  {behavior.topHours.length > 0 && (
                    <div className="hours-top">
                      <div className="hours-top-label">Busiest Windows</div>
                      {behavior.topHours.map(h => (
                        <div className="hours-top-row" key={h.hour}>
                          <span className="hours-top-time">{h.label}</span>
                          <span className="hours-top-bar">
                            <span style={{ width: h.pct + '%' }} className={h.afterHours ? 'after' : ''} />
                          </span>
                          <span className="hours-top-count">{h.count} &middot; {h.pct}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="hours-note">
                    Inquiries arriving outside business hours are the ones most likely to go unanswered until the next morning.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {liveDrawerOpen && (
        <div className="live-drawer-backdrop" onClick={e => { if (e.target === e.currentTarget) setLiveDrawerOpen(false) }}>
          <div className="live-drawer">
            <div className="live-drawer-header">
              <div className="live-drawer-title">
                <span className="live-pulse-dot"></span>
                Live Visitors on Your Site
                <span className="live-drawer-count">{liveVisitorList.length}</span>
                {lastPollAt > 0 && (
                  <span className="live-drawer-updated">
                    {(() => {
                      void nowTick
                      const s = Math.max(0, Math.floor((Date.now() - lastPollAt) / 1000))
                      return s < 2 ? 'just now' : `updated ${s}s ago`
                    })()}
                  </span>
                )}
              </div>
              <button className="live-drawer-close" onClick={() => setLiveDrawerOpen(false)} type="button" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="live-drawer-body">
              {liveVisitorList.length === 0 ? (
                <div className="live-drawer-empty">
                  No visitors right now.<br/>
                  <span className="live-drawer-empty-sub">Anyone who lands on your site in the next 2 minutes will show up here.</span>
                </div>
              ) : (
                <div className="live-visitors-list">
                  {liveVisitorList.map(v => {
                    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(v.user_agent || '')
                    const currentPath = (() => {
                      try {
                        const u = new URL(v.page_url || '')
                        return u.pathname || '/'
                      } catch { return v.page_url || '/' }
                    })()
                    const source = (() => {
                      if (v.utm_source) return `${v.utm_source}${v.utm_medium ? ' / ' + v.utm_medium : ''}`
                      if (!v.referrer) return 'Direct'
                      try {
                        const u = new URL(v.referrer)
                        return u.hostname.replace(/^www\./, '')
                      } catch { return 'Direct' }
                    })()
                    const locationLabel = (() => {
                      const parts = [v.city, v.region, v.country].filter(Boolean)
                      return parts.length > 0 ? parts.join(', ') : 'Unknown location'
                    })()
                    void nowTick; // subscribe to nowTick so this re-renders every second
                    const nowMs = Date.now()
                    const serverTimeOnSite = v.time_on_site_seconds
                    const secondsSinceServerData = Math.floor((nowMs - new Date(v.last_ping_at).getTime()) / 1000)
                    const timeOnSite = serverTimeOnSite + Math.max(0, secondsSinceServerData)
                    const timeOnSiteLabel = timeOnSite < 60 ? `${timeOnSite}s` : `${Math.floor(timeOnSite/60)}m ${timeOnSite%60}s`
                    const lastSeenSec = Math.round((Date.now() - new Date(v.last_ping_at).getTime()) / 1000)
                    const lastSeenLabel = lastSeenSec < 15 ? 'active now' : lastSeenSec < 60 ? `${lastSeenSec}s ago` : `${Math.round(lastSeenSec/60)}m ago`
                    const pageViews = v.journey.filter(e => e.event_type === 'page_view')
                    const activityColor = v.is_active && lastSeenSec < 20 ? '#22c55e' : lastSeenSec < 45 ? '#f59e0b' : '#6b7280'

                    return (
                      <div key={v.id} className={`live-visitor-card intent-${v.intent_label}`}>
                        <div className="live-visitor-top">
                          <div className="live-visitor-top-left">
                            <div className="live-visitor-device-icon">
                              {isMobile ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
                              ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                              )}
                            </div>
                            <div className="live-visitor-location">{locationLabel}</div>
                          </div>
                          <div className="live-visitor-top-right">
                            <div className={`live-visitor-intent-pill intent-${v.intent_label}`}>
                              <span className="intent-pulse" style={{ background: v.intent_label === 'hot' ? '#ef4444' : v.intent_label === 'warm' ? '#f59e0b' : '#6b7280' }}></span>
                              {v.intent_label === 'hot' ? 'Hot' : v.intent_label === 'warm' ? 'Warm' : 'Browsing'} · {v.intent_score}
                            </div>
                            <div className="live-visitor-last-seen" style={{ color: activityColor }}>
                              <span className="live-visitor-activity-dot" style={{ background: activityColor }}></span>
                              {lastSeenLabel}
                            </div>
                          </div>
                        </div>

                        <div className="live-visitor-current">
                          <div className="live-visitor-current-label">Currently on</div>
                          <div className="live-visitor-current-page">{currentPath}</div>
                          {v.form_started && (
                            <div className="live-visitor-form-badge">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                              Filling out form
                            </div>
                          )}
                        </div>

                        <div className="live-visitor-stats">
                          <div className="live-visitor-stat">
                            <div className="live-visitor-stat-value">{timeOnSiteLabel}</div>
                            <div className="live-visitor-stat-label">On Site</div>
                          </div>
                          <div className="live-visitor-stat">
                            <div className="live-visitor-stat-value">{v.pages_visited || 1}</div>
                            <div className="live-visitor-stat-label">Pages</div>
                          </div>
                          <div className="live-visitor-stat">
                            <div className="live-visitor-stat-value">{source}</div>
                            <div className="live-visitor-stat-label">Source</div>
                          </div>
                          <div className="live-visitor-stat">
                            <div className="live-visitor-stat-value">{isMobile ? 'Mobile' : 'Desktop'}</div>
                            <div className="live-visitor-stat-label">Device</div>
                          </div>
                        </div>

                        {pageViews.length > 1 && (
                          <div className="live-visitor-journey">
                            <div className="live-visitor-journey-label">Journey</div>
                            <div className="live-visitor-journey-path">
                              {pageViews.slice(-5).map((e, i, arr) => {
                                const path = (e.metadata as { path?: string })?.path || '/'
                                return (
                                  <span key={i} className="live-visitor-journey-step">
                                    <span className="live-visitor-journey-page">{path}</span>
                                    {i < arr.length - 1 && <span className="live-visitor-journey-arrow">→</span>}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
