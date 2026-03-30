'use client'

import { useEffect, useState, useMemo } from 'react'
import './dashboard.css'

const API_KEY = 'esd_1ab9b0af-2401-4f0e-81f9-77ec683c7afb'

type Filter = 'today' | 'week' | 'month' | 'all'

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
}

interface ApiResponse {
  client: { id: string; name: string }
  leads: Lead[]
  stats: {
    total_leads: number
    total_revenue_lost: number
    avg_completion_rate: number
  }
}

function formatCurrency(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toLocaleString()}`
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function formatDuration(seconds: number) {
  if (!seconds) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}s` : `0:${String(s).padStart(2, '0')}s`
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
  const now = Date.now()
  const cutoffs: Record<Exclude<Filter, 'all'>, number> = {
    today: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  }
  const cutoff = now - cutoffs[filter as Exclude<Filter, 'all'>]
  return leads.filter(l => new Date(l.created_at).getTime() >= cutoff)
}

export default function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/leads?api_key=${API_KEY}`)
        if (!res.ok) {
          const json = await res.json()
          throw new Error(json.error ?? 'Request failed')
        }
        setData(await res.json())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredLeads = useMemo(() => {
    if (!data) return []
    let leads = filterByDate(data.leads, filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      leads = leads.filter(
        l =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q)
      )
    }
    return leads
  }, [data, filter, search])

  // Recompute stats from filtered leads
  const stats = useMemo(() => {
    if (!data) return null
    const leads = filteredLeads
    const total_leads = leads.length
    const total_revenue_lost = leads.reduce((s, l) => s + (l.estimated_value ?? 0), 0)
    const avg_completion_rate =
      total_leads > 0
        ? Math.round(
            (leads.reduce(
              (s, l) => s + (l.total_fields > 0 ? l.fields_completed / l.total_fields : 0),
              0
            ) /
              total_leads) *
              100
          )
        : 0
    const avg_time_on_form =
      total_leads > 0
        ? Math.round(leads.reduce((s, l) => s + (l.time_on_form ?? 0), 0) / total_leads)
        : 0
    return { total_leads, total_revenue_lost, avg_completion_rate, avg_time_on_form }
  }, [filteredLeads, data])

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          Lead<span className="logo-accent">Catch</span>
        </div>
        {data && <span className="client-name">{data.client.name}</span>}
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Partial Submissions</div>
            <div className="stat-icon">📊</div>
          </div>
          <div className="stat-value">{loading ? '—' : (stats?.total_leads ?? 0)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-icon">✓</div>
          </div>
          <div className="stat-value">{loading ? '—' : `${stats?.avg_completion_rate ?? 0}%`}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Estimated Lost Revenue</div>
            <div className="stat-icon">💰</div>
          </div>
          <div className="stat-value">
            {loading ? '—' : formatCurrency(stats?.total_revenue_lost ?? 0)}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Avg. Time on Form</div>
            <div className="stat-icon">⏱️</div>
          </div>
          <div className="stat-value">
            {loading ? '—' : formatDuration(stats?.avg_time_on_form ?? 0)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="filters">
          {(['today', 'week', 'month', 'all'] as Filter[]).map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'today' ? 'Today' : f === 'week' ? 'This Week' : f === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search leads..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
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
          {loading && <div className="state-row">Loading leads…</div>}
          {error && <div className="state-row">Error: {error}</div>}
          {!loading && !error && filteredLeads.length === 0 && (
            <div className="state-row">
              {search ? 'No leads match your search.' : 'No leads yet. Install the tracking script to start capturing data.'}
            </div>
          )}

          {filteredLeads.map((lead, i) => {
            const pct = lead.total_fields > 0 ? (lead.fields_completed / lead.total_fields) * 100 : 0
            return (
              <div key={lead.id} className={`table-row${i === 0 ? ' new-entry' : ''}`}>
                <div className="lead-info">
                  <div className="lead-name">{lead.name ?? '—'}</div>
                  {lead.email && <div className="lead-email">{lead.email}</div>}
                  {lead.phone && <div className="lead-phone">{lead.phone}</div>}
                  {!lead.email && !lead.phone && (
                    <div className="lead-phone">No contact info</div>
                  )}
                </div>

                <div className="field-progress">
                  <div className="progress-header">
                    <span className="progress-text">
                      {lead.fields_completed}/{lead.total_fields}
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="time-info">
                  <div className="timestamp">{formatRelativeTime(lead.created_at)}</div>
                  <div className="duration">{formatDuration(lead.time_on_form)}</div>
                </div>

                <div>
                  <div className="device-badge">{deviceLabel(lead.device_type)}</div>
                </div>

                <div>
                  <div className="est-value">{formatCurrency(lead.estimated_value)}</div>
                </div>

                <div>
                  <button className="action-btn">→</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
