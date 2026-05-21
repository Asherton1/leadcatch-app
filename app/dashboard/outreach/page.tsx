'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useIsAdmin } from '@/lib/use-is-admin'
import './overview.css'

interface QueueItem {
  id?: string
  status?: string
  sent_at?: string | null
  replied_at?: string | null
  follow_up_day_4_sent_at?: string | null
  follow_up_day_10_sent_at?: string | null
  [key: string]: unknown
}

interface Prospect {
  id: string
  email: string
  status: string
  created_at: string
  last_event_at: string | null
}

interface OutreachEvent {
  id: string
  event_type: string
  created_at: string
}

function extractArray(json: unknown): unknown[] {
  if (Array.isArray(json)) return json
  if (typeof json !== 'object' || json === null) return []
  const obj = json as Record<string, unknown>
  for (const key of ['queue', 'items', 'data', 'results']) {
    if (Array.isArray(obj[key])) return obj[key] as unknown[]
  }
  return []
}

function isThisWeek(iso: string | null | undefined): boolean {
  if (!iso) return false
  const d = new Date(iso).getTime()
  if (isNaN(d)) return false
  return Date.now() - d < 7 * 24 * 60 * 60 * 1000
}

export default function OverviewPage() {
  const { loading: authLoading, isAdmin } = useIsAdmin()
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [events, setEvents] = useState<OutreachEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [queueError, setQueueError] = useState<string | null>(null)
  const [auditsError, setAuditsError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAdmin) { setLoading(false); return }

    async function load() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) { setLoading(false); return }
        const token = session.access_token

        // Fetch both in parallel, isolate failures
        const [queueRes, auditsRes] = await Promise.all([
          fetch('/api/admin/outreach', { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
          fetch('/api/admin/outreach/audits', { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
        ])

        if (queueRes?.ok) {
          const j = await queueRes.json()
          setQueueItems(extractArray(j) as QueueItem[])
        } else {
          setQueueError(`HTTP ${queueRes?.status ?? '?'}`)
        }

        if (auditsRes?.ok) {
          const j = await auditsRes.json()
          setProspects(j.prospects || [])
          setEvents(j.events || [])
        } else {
          setAuditsError(`HTTP ${auditsRes?.status ?? '?'}`)
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [authLoading, isAdmin])

  if (authLoading) return <div className="overview-state">Loading\u2026</div>
  if (!isAdmin) return <div className="overview-state overview-state-error">Unauthorized. This area is for admins only.</div>
  if (loading) return <div className="overview-state">Loading outreach overview\u2026</div>

  // Cold Queue stats
  const queueTotal = queueItems.length
  const queueSentThisWeek = queueItems.filter(q =>
    isThisWeek(q.sent_at as string) ||
    isThisWeek(q.follow_up_day_4_sent_at as string) ||
    isThisWeek(q.follow_up_day_10_sent_at as string)
  ).length
  const queueRepliesThisWeek = queueItems.filter(q => isThisWeek(q.replied_at as string)).length
  const queueScheduled = queueItems.filter(q => q.status === 'scheduled' || q.status === 'queued').length

  // Audit Pipeline stats
  const auditTotal = prospects.length
  const auditSentThisWeek = events.filter(e =>
    e.event_type === 'cold_email_sent' && isThisWeek(e.created_at)
  ).length
  const auditRepliesThisWeek = events.filter(e =>
    e.event_type === 'replied' && isThisWeek(e.created_at)
  ).length
  const auditsThisWeek = events.filter(e =>
    e.event_type === 'audit_submitted' && isThisWeek(e.created_at)
  ).length

  // Combined hero stats
  const totalProspects = queueTotal + auditTotal
  const totalSentThisWeek = queueSentThisWeek + auditSentThisWeek
  const totalRepliesThisWeek = queueRepliesThisWeek + auditRepliesThisWeek
  const activeConversations =
    queueItems.filter(q => q.status === 'replied' || q.status === 'in_progress').length +
    prospects.filter(p => ['replied', 'trial_started', 'paying'].includes(p.status)).length

  return (
    <div className="overview-page">
      <div className="overview-header">
        <p className="overview-eyebrow">Outreach Overview</p>
        <h1 className="overview-title">All outbound activity. One view.</h1>
      </div>

      <div className="overview-stats">
        <div className="overview-stat">
          <p className="overview-stat-label">Total Prospects</p>
          <p className="overview-stat-value">{totalProspects.toLocaleString()}</p>
        </div>
        <div className="overview-stat">
          <p className="overview-stat-label">Sent This Week</p>
          <p className="overview-stat-value">{totalSentThisWeek.toLocaleString()}</p>
        </div>
        <div className="overview-stat overview-stat-accent">
          <p className="overview-stat-label">Replies This Week</p>
          <p className="overview-stat-value">{totalRepliesThisWeek.toLocaleString()}</p>
        </div>
        <div className="overview-stat">
          <p className="overview-stat-label">Active Conversations</p>
          <p className="overview-stat-value">{activeConversations.toLocaleString()}</p>
        </div>
      </div>

      <div className="overview-columns">
        <div className="overview-column">
          <div className="overview-column-head">
            <p className="overview-column-eyebrow">Cold Queue</p>
            <Link href="/dashboard/outreach/manual" className="overview-column-link">View all \u2192</Link>
          </div>
          {queueError ? (
            <p className="overview-column-empty">Couldn\u2019t load queue data ({queueError})</p>
          ) : (
            <ul className="overview-column-list">
              <li><span>In queue</span><strong>{queueScheduled.toLocaleString()}</strong></li>
              <li><span>Sent this week</span><strong>{queueSentThisWeek.toLocaleString()}</strong></li>
              <li><span>Replies this week</span><strong className="overview-orange">{queueRepliesThisWeek.toLocaleString()}</strong></li>
              <li><span>Total prospects</span><strong>{queueTotal.toLocaleString()}</strong></li>
            </ul>
          )}
        </div>

        <div className="overview-column">
          <div className="overview-column-head">
            <p className="overview-column-eyebrow">Audit Pipeline</p>
            <Link href="/dashboard/outreach/audits" className="overview-column-link">View all \u2192</Link>
          </div>
          {auditsError ? (
            <p className="overview-column-empty">Couldn\u2019t load audit data ({auditsError})</p>
          ) : (
            <ul className="overview-column-list">
              <li><span>Audits this week</span><strong>{auditsThisWeek.toLocaleString()}</strong></li>
              <li><span>Emails sent this week</span><strong>{auditSentThisWeek.toLocaleString()}</strong></li>
              <li><span>Replies this week</span><strong className="overview-orange">{auditRepliesThisWeek.toLocaleString()}</strong></li>
              <li><span>Total prospects</span><strong>{auditTotal.toLocaleString()}</strong></li>
            </ul>
          )}
        </div>

        <div className="overview-column overview-column-muted">
          <div className="overview-column-head">
            <p className="overview-column-eyebrow">Partners</p>
            <span className="overview-column-soon">Coming soon</span>
          </div>
          <p className="overview-column-empty">
            Inbound partner applications from <code>/partners</code> will appear here once submissions start coming in.
          </p>
        </div>
      </div>
    </div>
  )
}
