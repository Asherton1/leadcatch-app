'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureClient } from '@/lib/provision'
import './dashboard.css'
import Footer from '../components/Footer'

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
  const cutoffs: Record<Exclude<Filter, 'all'>, number> = {
    today: 24 * 60 * 60 * 1000,
    week:  7  * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  }
  const cutoff = Date.now() - cutoffs[filter as Exclude<Filter, 'all'>]
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

        <div className="modal-body">

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
      rows = rows.filter(l => scoreLead(l).score >= 75)
    } else if (statusFilter === 'warm') {
      rows = rows.filter(l => { const s = scoreLead(l).score; return s >= 50 && s < 75 })
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

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="logo">
          
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff', fontWeight: 700 }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700 }}>Capture</span></span></span>
          {isAdmin && <a href="/admin" style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#ff6b35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '4px', padding: '2px 6px', textDecoration: 'none' }}>ADMIN</a>}
        </div>
        <div className="header-right">
          {selectedClient && <span className="client-name">{displayName(selectedClient)}</span>}
          <a href="/settings" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => (e.target as HTMLElement).style.color = '#ff6b35'} onMouseOut={e => (e.target as HTMLElement).style.color = '#888'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Settings
            </a>
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
            <div className="roi-eyebrow">§ RECOVERED REVENUE</div>
            <div className="roi-amount">
              ${recoveredRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className="roi-subtitle">
              Across {recoveredCount} recovered lead{recoveredCount === 1 ? '' : 's'}
            </div>
          </div>
          <div className="roi-hero-right">
            <div className="roi-window-selector">
              <button
                className={`roi-window-btn ${recoveredWindow === 'month' ? 'active' : ''}`}
                onClick={() => setRecoveredWindow('month')}
                type="button"
              >
                This Month
              </button>
              <button
                className={`roi-window-btn ${recoveredWindow === '30days' ? 'active' : ''}`}
                onClick={() => setRecoveredWindow('30days')}
                type="button"
              >
                30 Days
              </button>
              <button
                className={`roi-window-btn ${recoveredWindow === 'all' ? 'active' : ''}`}
                onClick={() => setRecoveredWindow('all')}
                type="button"
              >
                All Time
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats (5 cards) — 4 are clickable filter shortcuts ─────────────── */}
      <div className="stats-grid">
        <button
          className={`stat-card stat-card-clickable${cardFilter === 'none' && statusFilter === 'all' ? ' active' : ''}`}
          onClick={() => { setCardFilter('none'); setStatusFilter('all') }}
          type="button"
          aria-label="Show all leads"
        >
          <div className="stat-header">
            <div className="stat-label">Partial Submissions</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '—' : stats.total_leads}</div>
        </button>

        <button
          className={`stat-card stat-card-clickable${cardFilter === 'completion-desc' ? ' active' : ''}`}
          onClick={() => setCardFilter(cardFilter === 'completion-desc' ? 'none' : 'completion-desc')}
          type="button"
          aria-label="Sort leads by highest completion rate"
        >
          <div className="stat-header">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '—' : `${stats.avg_completion_rate}%`}</div>
        </button>

        <button
          className={`stat-card stat-card-clickable${cardFilter === 'value-desc' ? ' active' : ''}`}
          onClick={() => setCardFilter(cardFilter === 'value-desc' ? 'none' : 'value-desc')}
          type="button"
          aria-label="Sort leads by highest estimated value"
        >
          <div className="stat-header">
            <div className="stat-label">Estimated Lost Revenue</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '—' : formatCurrency(stats.total_revenue_lost)}</div>
        </button>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Avg. Time on Form</div>
            <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          </div>
          <div className="stat-value">{isLoading ? '—' : formatDuration(stats.avg_time_on_form)}</div>
        </div>

        <button
          className={`stat-card stat-card-clickable${cardFilter === 'emails-only' ? ' active' : ''}`}
          onClick={() => setCardFilter(cardFilter === 'emails-only' ? 'none' : 'emails-only')}
          type="button"
          aria-label="Filter to leads with emails deployed"
        >
          <div className="stat-header">
            <div className="stat-label">Emails Deployed</div>
            <div className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{isLoading ? '—' : stats.emails_deployed}</div>
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

        <div className="table-body">
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
                <div className="empty-eyebrow">§ TRACKING ACTIVE</div>
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

      <Footer />
    </div>
  )
}
