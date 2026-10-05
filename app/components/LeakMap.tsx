'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import './leak-map.css'

type Ev = { event_type: string; metadata: Record<string, unknown> | null; created_at: string }

export default function LeakMap({ clientId, avgValue }: { clientId: string | null; avgValue: number }) {
  const [events, setEvents] = useState<Ev[]>([])
  const [leadCount, setLeadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!clientId) return
    let cancelled = false
    setLoading(true)
    ;(async () => {
      const [{ data: ev }, { count }] = await Promise.all([
        supabase
          .from('visitor_events')
          .select('event_type, metadata, created_at')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false })
          .limit(4000),
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientId),
      ])
      if (!cancelled) {
        setEvents((ev as Ev[]) ?? [])
        setLeadCount(count ?? 0)
        setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [clientId])

  const n = (type: string) => events.filter(e => e.event_type === type).length

  const telTaps = n('tel_tap')
  const smsTaps = n('sms_tap') + n('mailto_tap')
  const bookingAbandons = n('booking_abandoned')
  const formStarts = n('form_started')

  const stages = [
    { key: 'tel', name: 'Tapped your phone number', count: telTaps,
      note: 'They tried to call. You have no record of whether anyone answered.' },
    { key: 'book', name: 'Opened booking, did not book', count: bookingAbandons,
      note: 'They got as far as your scheduler and closed it.' },
    { key: 'msg', name: 'Tapped email or text', count: smsTaps,
      note: 'They reached for another way to get hold of you.' },
    { key: 'form', name: 'Started a form, left', count: formStarts,
      note: 'Captured in full, with their details, in the list below.' },
  ].filter(s => s.count > 0)

  const totalLeaks = stages.reduce((a, s) => a + s.count, 0)
  const invisible = telTaps + smsTaps + bookingAbandons
  const worth = invisible * avgValue

  // Call taps outside business hours, which is usually the finding that matters.
  const afterHours = events.filter(e => {
    if (e.event_type !== 'tel_tap') return false
    const h = Number((e.metadata as { hour?: number } | null)?.hour ?? -1)
    return h >= 0 && (h < 8 || h >= 18)
  }).length

  if (!clientId || loading || totalLeaks === 0) return null

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(worth)

  return (
    <div className={'lm-panel' + (open ? ' open' : '')}>
      <button className="lm-strip" type="button" onClick={() => setOpen(o => !o)}>
        <span className="lm-strip-text">
          <span className="lm-kicker">Leak Map</span>
          <span className="lm-line">
            <b>{invisible} people tried to reach you and left no trace</b>
            <span className="lm-detail">Not a form, not a lead, no record anywhere until now</span>
            <span className="lm-value">{money} of interest</span>
          </span>
        </span>
        <span className="lm-cta">
          {open ? 'Hide' : 'Review'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="lm-body">
          <p className="lm-intro">
            A form is only one way somebody tries to reach you. These are the others.
            Tapping a phone number or opening your booking page leaves no name and no
            email, so there is nobody to follow up with. What it tells you is how many
            people wanted to talk to you and did not get through.
          </p>

          <table className="lm-table">
            <thead>
              <tr>
                <th>How they tried to reach you</th>
                <th>People</th>
                <th>Share</th>
                <th>What it means</th>
              </tr>
            </thead>
            <tbody>
              {stages.map(s => (
                <tr key={s.key} className={s.key === 'form' ? 'is-captured' : ''}>
                  <td className="lm-td-name">{s.name}</td>
                  <td className="lm-td-n">{s.count}</td>
                  <td className="lm-td-pct">{Math.round((s.count / totalLeaks) * 100)}%</td>
                  <td className="lm-td-note">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {afterHours > 0 && (
            <div className="lm-finding">
              <span className="lm-finding-label">Worth knowing</span>
              <p>
                <strong>{afterHours} of those {telTaps} call taps</strong> happened before
                8am or after 6pm. If nobody is answering the phone at those hours, that is
                not a marketing problem, it is a staffing one.
              </p>
            </div>
          )}

          <p className="lm-foot">
            Based on {events.length.toLocaleString()} visitor actions and {leadCount} captured
            inquiries. Value shown is your average lead value times the number of people who
            tried to reach you another way.
          </p>
        </div>
      )}
    </div>
  )
}
