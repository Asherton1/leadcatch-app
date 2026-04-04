'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureClient } from '@/lib/provision'
import './dashboard.css'

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
  if (t.includes('mobile') || t.includes('phone')) return '📱 Mobile'
  if (t.includes('tablet')) return '📱 Tablet'
  return '💻 Desktop'
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
  const [loggingOut, setLoggingOut]             = useState(false)
  const [allClients, setAllClients]             = useState<Client[]>([])
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
      setAuthed(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_OUT') router.replace('/login')
    })
    return () => subscription.unsubscribe()
  }, [router])

  // ── Fetch all clients ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!authed) return
    setClientsLoading(true)
    supabase
      .from('clients')
      .select('id, name, first_name, last_name, company_name, api_key, active')
      .order('name')
      .then(({ data, error }) => {
        if (!error && data) {
          const rows = data as Client[]
          setAllClients(rows)
          if (rows.length > 0) setSelectedClient(rows[0])
        }
        setClientsLoading(false)
      })
  }, [authed])

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
    return rows
  }, [leads, filter, search])

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
          
            <span><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff', fontWeight: 700 }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700 }}>Capture</span></span></span></span></span>
          <span className="admin-badge">Admin</span>
        </div>
        <div className="header-right">
          {selectedClient && <span className="client-name">{displayName(selectedClient)}</span>}
          <button className="logout-btn" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      {/* ── Client Selector Bar ─────────────────────────────────────────────── */}
      <ClientSelector
        clients={allClients}
        selected={selectedClient}
        onSelect={c => { setSelectedClient(c); setFilter('all') }}
        loading={clientsLoading}
      />

      {/* ── Stats (5 cards) ─────────────────────────────────────────────────── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Partial Submissions</div>
            <div className="stat-icon">📊</div>
          </div>
          <div className="stat-value">{isLoading ? '—' : stats.total_leads}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-icon">✓</div>
          </div>
          <div className="stat-value">{isLoading ? '—' : `${stats.avg_completion_rate}%`}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Estimated Lost Revenue</div>
            <div className="stat-icon">💰</div>
          </div>
          <div className="stat-value">{isLoading ? '—' : formatCurrency(stats.total_revenue_lost)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Avg. Time on Form</div>
            <div className="stat-icon">⏱️</div>
          </div>
          <div className="stat-value">{isLoading ? '—' : formatDuration(stats.avg_time_on_form)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Emails Deployed</div>
            <div className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
                <path d="M3 4h14c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z"/>
                <polyline points="18,5 10,11 2,5"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{isLoading ? '—' : stats.emails_deployed}</div>
        </div>
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
          <span className="search-icon">🔍</span>
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
            <div className="state-row">
              {search
                ? 'No leads match your search.'
                : `No leads yet for ${selectedClient ? displayName(selectedClient) : 'this client'}.`}
            </div>
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
                    <div className="email-sent-badge">✉ sent</div>
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

    </div>
  )
}
