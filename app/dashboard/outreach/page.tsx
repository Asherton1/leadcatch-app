'use client'

import { useEffect, useState, useCallback } from 'react'
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

export default function OutreachAdminPage() {
  const { loading: authLoading, isAdmin } = useIsAdmin()
  const [items, setItems] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [flash, setFlash] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Bulk add form state
  const [prospectsBlock, setProspectsBlock] = useState('')
  const [subject, setSubject] = useState('')
  const [bodyHtml, setBodyHtml] = useState('')
  const [scheduleMode, setScheduleMode] = useState<'spread' | 'single'>('spread')
  const [singleDate, setSingleDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
      // Force a fresh fetch with a small delay to ensure Supabase row-level consistency
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

  // Stats
  const stats = {
    queued: items.filter(i => i.status === 'queued').length,
    sent: items.filter(i => i.status === 'sent').length,
    replied: items.filter(i => i.status === 'replied' || i.replied_at).length,
    failed: items.filter(i => i.status === 'failed').length,
  }

  // Filtered view
  const filtered = statusFilter === 'all' ? items : items.filter(i => i.status === statusFilter)

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

        {/* STATS */}
        <div className="outreach-stats">
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
<p>Best,<br/>Ash Chraibi<br/>Founder, ReCapture</p>
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

        {/* QUEUE TABLE */}
        <div className="outreach-section">
          <p className="outreach-section-eyebrow">02 — Current queue</p>
          <h2 className="outreach-section-h2">All prospects, all statuses, full pipeline.</h2>

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
        </div>
      </div>

      <Footer />
    </div>
  )
}
