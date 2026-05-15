'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { useIsAdmin } from '@/lib/use-is-admin'
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer'
import '../../landing.css'
import './outreach.css'

interface QueueItem {
  id: string
  prospect_name: string
  prospect_email: string
  prospect_company: string | null
  prospect_role: string | null
  vertical: string
  city: string | null
  email_subject: string
  email_cc: string | null
  scheduled_send_at: string
  status: string
  sent_at: string | null
  send_error: string | null
  follow_up_day_4_sent_at: string | null
  follow_up_day_10_sent_at: string | null
  replied_at: string | null
  notes: string | null
  created_at: string
}

const VERTICALS = [
  'med-spa', 'dental', 'plastic-surgery', 'property-mgmt',
  'luxury-real-estate', 'luxury-auto', 'gohighlevel', 'other'
]

const STATUS_FILTERS = ['all', 'queued', 'sent', 'replied', 'failed', 'paused', 'opted_out']

const VIEW_STORAGE_KEY = 'recapture-outreach-view-mode'
type ViewMode = 'table' | 'calendar'

// Format a Date as YYYY-MM-DD in America/Chicago (the cron's TZ)
function dayKey(date: Date): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit'
  })
  return fmt.format(date)
}

// Parse a YYYY-MM-DD day key back to a Date (local time, noon to avoid TZ shift)
function parseDayKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0)
}

// Generate a 42-day month grid (6 weeks max), weeks starting Sunday
function getMonthGrid(monthDate: Date): Date[] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()

  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - startWeekday)

  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    days.push(d)
  }
  return days
}

function formatDayLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long', month: 'long', day: 'numeric'
  }).format(date)
}

function formatMonthHeader(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long', year: 'numeric'
  }).format(date)
}

export default function OutreachAdminPage() {
  const { loading: authLoading, isAdmin } = useIsAdmin()
  const [items, setItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [flash, setFlash] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // View mode (remembers last preference)
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date())
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [clickedDay, setClickedDay] = useState<string | null>(null)

  // Bulk add form state
  const [prospectsBlock, setProspectsBlock] = useState('')
  const [subject, setSubject] = useState('')
  const [bodyHtml, setBodyHtml] = useState('')
  const [scheduleMode, setScheduleMode] = useState<'spread' | 'single'>('spread')
  const [singleDate, setSingleDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Load view preference on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(VIEW_STORAGE_KEY)
    if (saved === 'table' || saved === 'calendar') {
      setViewMode(saved as ViewMode)
    }
  }, [])

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VIEW_STORAGE_KEY, mode)
    }
  }

  const loadQueue = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/outreach', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + (session?.access_token || ''),
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setItems(data.items || [])
    } catch (err) {
      console.error('Load failed:', err)
      setFlash({ type: 'error', msg: 'Failed to load queue: ' + (err instanceof Error ? err.message : 'unknown') })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    loadQueue()
  }, [isAdmin, loadQueue])

  const handleBulkAdd = async () => {
    if (!prospectsBlock.trim() || !subject.trim() || !bodyHtml.trim()) {
      setFlash({ type: 'error', msg: 'Prospects, subject, and body are all required' })
      return
    }
    setSubmitting(true)
    setFlash(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/outreach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (session?.access_token || ''),
        },
        body: JSON.stringify({
          prospects_block: prospectsBlock,
          subject,
          body_html: bodyHtml,
          schedule_mode: scheduleMode,
          single_date: singleDate || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load prospects')
      setFlash({ type: 'success', msg: `Loaded ${data.loaded} prospects into queue` })
      setProspectsBlock('')
      setSubject('')
      setBodyHtml('')
      await new Promise(resolve => setTimeout(resolve, 500))
      await loadQueue()
    } catch (err) {
      setFlash({ type: 'error', msg: err instanceof Error ? err.message : 'Failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleAction = async (id: string, action: 'mark_replied' | 'cancel' | 'send_now') => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/outreach', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (session?.access_token || ''),
        },
        body: JSON.stringify({ id, action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Action failed')
      setFlash({ type: 'success', msg: data.message || 'Done' })
      await loadQueue()
    } catch (err) {
      setFlash({ type: 'error', msg: err instanceof Error ? err.message : 'Action failed' })
    }
  }

  // Group items by day in CT
  const itemsByDay = useMemo(() => {
    const m = new Map<string, QueueItem[]>()
    for (const item of items) {
      const dateStr = item.sent_at || item.scheduled_send_at
      if (!dateStr) continue
      const key = dayKey(new Date(dateStr))
      if (!m.has(key)) m.set(key, [])
      m.get(key)!.push(item)
    }
    for (const dayItems of m.values()) {
      dayItems.sort((a, b) => {
        const aTime = new Date(a.sent_at || a.scheduled_send_at).getTime()
        const bTime = new Date(b.sent_at || b.scheduled_send_at).getTime()
        return aTime - bTime
      })
    }
    return m
  }, [items])

  const todayKey = useMemo(() => dayKey(new Date()), [])

  // Enhanced stats including next-7 + empty-weekday warnings
  const stats = useMemo(() => {
    let next7Days = 0
    let emptyWeekdays = 0

    for (let i = 0; i < 7; i++) {
      const d = parseDayKey(todayKey)
      d.setDate(d.getDate() + i)
      const k = dayKey(d)
      const dayItems = itemsByDay.get(k) || []
      next7Days += dayItems.filter(it => it.status === 'queued').length
    }

    for (let i = 0; i < 14; i++) {
      const d = parseDayKey(todayKey)
      d.setDate(d.getDate() + i)
      const dow = d.getDay()
      if (dow === 0 || dow === 6) continue
      const k = dayKey(d)
      const dayItems = itemsByDay.get(k) || []
      const hasQueued = dayItems.some(it => it.status === 'queued')
      if (!hasQueued) emptyWeekdays++
    }

    return {
      queued: items.filter(i => i.status === 'queued').length,
      sent: items.filter(i => i.status === 'sent').length,
      replied: items.filter(i => i.status === 'replied' || i.replied_at).length,
      failed: items.filter(i => i.status === 'failed').length,
      next7Days,
      emptyWeekdays
    }
  }, [items, itemsByDay, todayKey])

  const filtered = statusFilter === 'all' ? items : items.filter(i => i.status === statusFilter)

  // Calendar navigation
  const goToPrevMonth = () => {
    const d = new Date(calendarMonth)
    d.setMonth(d.getMonth() - 1)
    setCalendarMonth(d)
  }
  const goToNextMonth = () => {
    const d = new Date(calendarMonth)
    d.setMonth(d.getMonth() + 1)
    setCalendarMonth(d)
  }
  const goToToday = () => {
    setCalendarMonth(new Date())
  }

  // Day cell status (for count badge color)
  function getDayStatusColor(items: QueueItem[]): string {
    if (items.length === 0) return '#1a1a1a'
    const hasFailed = items.some(i => i.status === 'failed')
    const hasQueued = items.some(i => i.status === 'queued')
    if (hasFailed) return '#ef4444'
    if (hasQueued) return '#ff6b35'
    const allSentOrReplied = items.every(i => i.status === 'sent' || i.status === 'replied')
    if (allSentOrReplied) return '#10b981'
    return '#888'
  }

  // Top verticals for chips
  function getTopVerticals(items: QueueItem[]): { vertical: string; count: number }[] {
    const counts = new Map<string, number>()
    for (const item of items) {
      counts.set(item.vertical, (counts.get(item.vertical) || 0) + 1)
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([vertical, count]) => ({ vertical, count }))
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Access denied.
      </div>
    )
  }

  const monthDays = getMonthGrid(calendarMonth)
  const currentMonth = calendarMonth.getMonth()
  const clickedDayItems = clickedDay ? (itemsByDay.get(clickedDay) || []) : []
  const hoveredDayItems = hoveredDay ? (itemsByDay.get(hoveredDay) || []) : []
  const hoveredDayVerticals = getTopVerticals(hoveredDayItems)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e4e4e7' }}>
      <AdminNav />

      <div className="outreach-admin">
        <div className="outreach-admin-header">
          <p className="outreach-admin-eyebrow">Admin · Outreach Queue</p>
          <h1 className="outreach-admin-h1">Outreach automation</h1>
        </div>

        {flash && (
          <div className={`outreach-flash ${flash.type}`}>{flash.msg}</div>
        )}

        {/* STATS - 6 cards (added Next 7 + Empty weekdays) */}
        <div className="outreach-stats outreach-stats-6">
          <div className="outreach-stat">
            <div className="outreach-stat-label">Queued</div>
            <div className="outreach-stat-value orange">{stats.queued}</div>
          </div>
          <div className="outreach-stat">
            <div className="outreach-stat-label">Sent</div>
            <div className="outreach-stat-value green">{stats.sent}</div>
          </div>
          <div className="outreach-stat">
            <div className="outreach-stat-label">Replied</div>
            <div className="outreach-stat-value">{stats.replied}</div>
          </div>
          <div className="outreach-stat">
            <div className="outreach-stat-label">Failed</div>
            <div className="outreach-stat-value">{stats.failed}</div>
          </div>
          <div className="outreach-stat">
            <div className="outreach-stat-label">Next 7 days</div>
            <div className="outreach-stat-value">{stats.next7Days}</div>
          </div>
          <div className="outreach-stat">
            <div className="outreach-stat-label">Empty weekdays (14d)</div>
            <div className={`outreach-stat-value ${stats.emptyWeekdays > 3 ? 'orange' : ''}`}>{stats.emptyWeekdays}</div>
          </div>
        </div>

        {/* BULK ADD FORM */}
        <div className="outreach-section">
          <p className="outreach-section-eyebrow">01 — Load prospects</p>
          <h2 className="outreach-section-h2">Paste a block of prospects, write one email, schedule across the week.</h2>

          <div className="outreach-field">
            <label className="outreach-label">Prospects (one per line)</label>
            <textarea
              className="outreach-textarea"
              value={prospectsBlock}
              onChange={e => setProspectsBlock(e.target.value)}
              placeholder={`Format: name, email, company, vertical[, role][, cc_email]
Example:
Jennifer Sgrillo, jennifersgrillo@mintdentistry.com, MINT Dentistry, dental, Marketing Director, communications@mintdentistry.com
Tracy Vance, tracy@summitapm.com, Summit Property Management, property-mgmt
Mike Pennington, michael.pennington@platinumderm.com, Platinum Derm, med-spa, CEO`}
            />
            <div className="outreach-helper">Vertical must be one of: {VERTICALS.join(', ')}. Role and CC are optional.</div>
          </div>

          <div className="outreach-field">
            <label className="outreach-label">Email subject</label>
            <input
              type="text"
              className="outreach-input"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="From your neighbor in Harwood — quick question about your forms"
            />
          </div>

          <div className="outreach-field">
            <label className="outreach-label">Email body (HTML)</label>
            <textarea
              className="outreach-textarea body"
              value={bodyHtml}
              onChange={e => setBodyHtml(e.target.value)}
              placeholder={`<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.7;">
<p>Hi {firstName},</p>
<p>...</p>
<p>Best,<br/>Asherton Chraibi<br/>Founder, ReCapture</p>
</div>

Available merge tags: {firstName}, {company}, {vertical}, {city}`}
            />
          </div>

          <div className="outreach-row">
            <div className="outreach-field">
              <label className="outreach-label">Schedule mode</label>
              <select
                className="outreach-select"
                value={scheduleMode}
                onChange={e => setScheduleMode(e.target.value as 'spread' | 'single')}
              >
                <option value="spread">Spread across Mon–Fri this week (recommended)</option>
                <option value="single">All on one specific date</option>
              </select>
            </div>
            {scheduleMode === 'single' && (
              <div className="outreach-field">
                <label className="outreach-label">Send date</label>
                <input
                  type="date"
                  className="outreach-input"
                  value={singleDate}
                  onChange={e => setSingleDate(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            className="outreach-btn-primary"
            onClick={handleBulkAdd}
            disabled={submitting}
          >
            {submitting ? 'Loading...' : 'Load into queue'}
          </button>
        </div>

        {/* QUEUE SECTION with view toggle */}
        <div className="outreach-section">
          <div className="outreach-section-header-row">
            <div>
              <p className="outreach-section-eyebrow">02 — Current queue</p>
              <h2 className="outreach-section-h2">All prospects, all statuses, full pipeline.</h2>
            </div>
            <div className="outreach-view-toggle">
              <button
                className={`outreach-view-toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                onClick={() => handleViewChange('calendar')}
              >
                Calendar
              </button>
              <button
                className={`outreach-view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => handleViewChange('table')}
              >
                Table
              </button>
            </div>
          </div>

          {viewMode === 'calendar' ? (
            loading ? (
              <div style={{ color: '#666', padding: '2rem 0' }}>Loading queue...</div>
            ) : (
              <div className="outreach-calendar">
                <div className="outreach-calendar-nav">
                  <button className="outreach-calendar-nav-btn" onClick={goToPrevMonth} aria-label="Previous month">‹</button>
                  <h3 className="outreach-calendar-month">{formatMonthHeader(calendarMonth)}</h3>
                  <button className="outreach-calendar-nav-btn" onClick={goToNextMonth} aria-label="Next month">›</button>
                  <button className="outreach-calendar-today-btn" onClick={goToToday}>Today</button>
                </div>

                <div className="outreach-calendar-grid">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="outreach-calendar-weekday">{d}</div>
                  ))}
                  {monthDays.map(day => {
                    const key = dayKey(day)
                    const dayItems = itemsByDay.get(key) || []
                    const isCurrentMonth = day.getMonth() === currentMonth
                    const isToday = key === todayKey
                    const isPast = key < todayKey
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6
                    const totalCount = dayItems.length
                    const statusColor = getDayStatusColor(dayItems)
                    const topVerticals = getTopVerticals(dayItems)
                    const chipsTotal = topVerticals.reduce((s, t) => s + t.count, 0)
                    const isEmptyWeekday = !isWeekend && !isPast && totalCount === 0 && isCurrentMonth
                    const isOverloaded = totalCount > 8

                    let cellClass = 'outreach-calendar-day'
                    if (!isCurrentMonth) cellClass += ' other-month'
                    if (isToday) cellClass += ' today'
                    if (isPast && totalCount === 0) cellClass += ' past-empty'
                    if (isWeekend) cellClass += ' weekend'
                    if (isEmptyWeekday) cellClass += ' empty-weekday'
                    if (isOverloaded) cellClass += ' overloaded'
                    if (totalCount > 0) cellClass += ' has-items'

                    return (
                      <div
                        key={key}
                        className={cellClass}
                        onMouseEnter={() => totalCount > 0 && setHoveredDay(key)}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() => totalCount > 0 && setClickedDay(key)}
                      >
                        <div className="outreach-calendar-day-header">
                          <span className="outreach-calendar-day-num">{day.getDate()}</span>
                          {totalCount > 0 && (
                            <span
                              className="outreach-calendar-day-count"
                              style={{ background: statusColor, color: '#0a0a0a' }}
                            >
                              {totalCount}
                            </span>
                          )}
                        </div>
                        {totalCount > 0 && (
                          <div className="outreach-calendar-day-verticals">
                            {topVerticals.map(({ vertical, count }) => (
                              <div key={vertical} className="outreach-calendar-vertical-chip">
                                {vertical} × {count}
                              </div>
                            ))}
                            {totalCount > chipsTotal && (
                              <div className="outreach-calendar-vertical-chip more">
                                +{totalCount - chipsTotal} more
                              </div>
                            )}
                          </div>
                        )}
                        {hoveredDay === key && totalCount > 0 && (
                          <div className="outreach-calendar-popover">
                            <div className="outreach-calendar-popover-title">{formatDayLabel(day)}</div>
                            <div className="outreach-calendar-popover-summary">
                              {totalCount} {totalCount === 1 ? 'email' : 'emails'}
                              {hoveredDayVerticals.length > 0 && (
                                <> · {hoveredDayVerticals.map(v => `${v.count} ${v.vertical}`).join(', ')}</>
                              )}
                            </div>
                            <div className="outreach-calendar-popover-hint">Click for full list</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="outreach-calendar-legend">
                  <div className="outreach-calendar-legend-item">
                    <span className="outreach-calendar-legend-dot" style={{ background: '#ff6b35' }} />
                    Queued
                  </div>
                  <div className="outreach-calendar-legend-item">
                    <span className="outreach-calendar-legend-dot" style={{ background: '#10b981' }} />
                    All sent
                  </div>
                  <div className="outreach-calendar-legend-item">
                    <span className="outreach-calendar-legend-dot" style={{ background: '#ef4444' }} />
                    Has failed
                  </div>
                  <div className="outreach-calendar-legend-item">
                    <span className="outreach-calendar-legend-dot" style={{ background: 'transparent', border: '1px dashed #ff6b35' }} />
                    Empty weekday
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              <div className="outreach-filter-bar">
                {STATUS_FILTERS.map(f => (
                  <button
                    key={f}
                    className={`outreach-filter-pill ${statusFilter === f ? 'active' : ''}`}
                    onClick={() => setStatusFilter(f)}
                  >
                    {f} ({f === 'all' ? items.length : items.filter(i => i.status === f).length})
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ color: '#666', padding: '2rem 0' }}>Loading queue...</div>
              ) : filtered.length === 0 ? (
                <div style={{ color: '#666', padding: '2rem 0' }}>No prospects in this view yet.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="outreach-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Vertical</th>
                        <th>Scheduled</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div style={{ color: '#fff', fontWeight: 600 }}>{item.prospect_name}</div>
                            <div style={{ color: '#666', fontSize: '0.75rem' }}>{item.prospect_email}</div>
                          </td>
                          <td>{item.prospect_company || '—'}</td>
                          <td style={{ color: '#888', fontSize: '0.75rem' }}>{item.vertical}</td>
                          <td style={{ fontSize: '0.75rem' }}>
                            {item.status === 'sent' && item.sent_at
                              ? new Date(item.sent_at).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                              : new Date(item.scheduled_send_at).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </td>
                          <td>
                            <span className={`outreach-status-pill outreach-status-${item.status}`}>{item.status}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {item.status === 'queued' && (
                                <>
                                  <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'send_now')}>Send now</button>
                                  <button className="outreach-btn-danger" onClick={() => handleAction(item.id, 'cancel')}>Cancel</button>
                                </>
                              )}
                              {item.status === 'sent' && !item.replied_at && (
                                <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'mark_replied')}>Mark replied</button>
                              )}
                              {item.status === 'failed' && (
                                <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'send_now')}>Retry</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {/* DAY DRAWER (overlay) */}
        {clickedDay && (
          <div className="outreach-drawer-overlay" onClick={() => setClickedDay(null)}>
            <div className="outreach-drawer" onClick={e => e.stopPropagation()}>
              <div className="outreach-drawer-header">
                <div>
                  <p className="outreach-drawer-eyebrow">Day detail</p>
                  <h3 className="outreach-drawer-title">{formatDayLabel(parseDayKey(clickedDay))}</h3>
                  <p className="outreach-drawer-subtitle">{clickedDayItems.length} {clickedDayItems.length === 1 ? 'email' : 'emails'}</p>
                </div>
                <button className="outreach-drawer-close" onClick={() => setClickedDay(null)} aria-label="Close">×</button>
              </div>
              <div className="outreach-drawer-body">
                {clickedDayItems.map(item => (
                  <div key={item.id} className="outreach-drawer-item">
                    <div className="outreach-drawer-item-main">
                      <div className="outreach-drawer-item-name">{item.prospect_company || item.prospect_name}</div>
                      <div className="outreach-drawer-item-meta">
                        <span className="outreach-drawer-item-vertical">{item.vertical}</span>
                        <span className="outreach-drawer-item-time">
                          {new Date(item.sent_at || item.scheduled_send_at).toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="outreach-drawer-item-email">{item.prospect_email}</div>
                    </div>
                    <div className="outreach-drawer-item-right">
                      <span className={`outreach-status-pill outreach-status-${item.status}`}>{item.status}</span>
                      <div className="outreach-drawer-item-actions">
                        {item.status === 'queued' && (
                          <>
                            <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'send_now')}>Send now</button>
                            <button className="outreach-btn-danger" onClick={() => handleAction(item.id, 'cancel')}>Cancel</button>
                          </>
                        )}
                        {item.status === 'sent' && !item.replied_at && (
                          <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'mark_replied')}>Mark replied</button>
                        )}
                        {item.status === 'failed' && (
                          <button className="outreach-btn-secondary" onClick={() => handleAction(item.id, 'send_now')}>Retry</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
