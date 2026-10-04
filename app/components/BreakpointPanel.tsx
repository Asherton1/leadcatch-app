'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import './breakpoint-panel.css'

type Row = {
  field_order: string[] | null
  last_field: string | null
  outcome: string | null
  device_type: string | null
}

type FieldStat = {
  name: string
  reached: number
  stoppedHere: number
  dropRate: number
}

function prettify(name: string) {
  return name
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export default function BreakpointPanel({ clientId }: { clientId: string | null }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [device, setDevice] = useState<'all' | 'mobile' | 'desktop'>('all')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!clientId) return
    let cancelled = false
    setLoading(true)
    ;(async () => {
      const { data } = await supabase
        .from('form_events')
        .select('field_order, last_field, outcome, device_type')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(2000)
      if (!cancelled) {
        setRows((data as Row[]) ?? [])
        setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [clientId])

  const scoped = rows.filter(r => device === 'all' || r.device_type === device)
  const total = scoped.length

  // Use the most common field order as the canonical shape of the form.
  const orderCounts = new Map<string, number>()
  scoped.forEach(r => {
    if (r.field_order?.length) {
      const key = r.field_order.join('|')
      orderCounts.set(key, (orderCounts.get(key) ?? 0) + 1)
    }
  })
  const canonical = [...orderCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]?.split('|') ?? []

  const stats: FieldStat[] = canonical.map((name, i) => {
    const stoppedHere = scoped.filter(
      r => r.outcome === 'abandoned' && r.last_field === name
    ).length

    // Anyone who submitted got through every field. Anyone who abandoned got as
    // far as the field they stopped on. Both count as having reached this one.
    const reached = scoped.filter(r => {
      if (r.outcome === 'submitted') return true
      const idx = r.field_order?.indexOf(r.last_field ?? '') ?? -1
      return idx >= i
    }).length

    return {
      name,
      reached,
      stoppedHere,
      dropRate: reached > 0 ? Math.round((stoppedHere / reached) * 100) : 0,
    }
  })

  const worst = stats.reduce<FieldStat | null>(
    (acc, s) => (s.stoppedHere >= 3 && (!acc || s.dropRate > acc.dropRate) ? s : acc),
    null
  )

  if (!clientId) return null

  return (
    <div className={'bp-panel' + (open ? ' open' : '')}>
      <button className="bp-strip" type="button" onClick={() => setOpen(o => !o)}>
        <span className="bp-pip" aria-hidden="true" />
        <span className="bp-strip-text">
          <b>Breakpoint</b>
          <span className="bp-sub">
            {worst && total >= 5
              ? `This form loses most people at ${prettify(worst.name)}`
              : 'Where this form loses people'}
          </span>
        </span>
        <span className="bp-cta">
          {open ? 'Hide' : 'Review'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {open && (
      <div className="bp-body">
      <div className="bp-head">
        <div className="bp-tabs">
          {(['all', 'mobile', 'desktop'] as const).map(d => (
            <button
              key={d}
              type="button"
              className={'bp-tab' + (device === d ? ' is-on' : '')}
              onClick={() => setDevice(d)}
            >
              {d === 'all' ? 'All' : d === 'mobile' ? 'Mobile' : 'Desktop'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bp-empty">Reading form sessions…</div>
      ) : total < 5 ? (
        <div className="bp-empty">
          Not enough sessions yet. Breakpoint needs a handful of form starts before the
          pattern means anything. It will fill in on its own.
        </div>
      ) : (
        <>
          {worst ? (
            <div className="bp-finding">
              <span className="bp-finding-label">The finding</span>
              <p>
                <strong>{prettify(worst.name)}</strong> is where this form loses most people.
                Of the {worst.reached} who reached it{device !== 'all' ? ` on ${device}` : ''},{' '}
                <strong>{worst.stoppedHere} stopped there</strong>. That is {worst.dropRate} percent.
              </p>
            </div>
          ) : null}

          <div className="bp-rows">
            {stats.map((s, i) => {
              const isWorst = worst?.name === s.name
              return (
                <div className={'bp-row' + (isWorst ? ' bp-row-worst' : '')} key={s.name}>
                  <span className="bp-row-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="bp-row-name">{prettify(s.name)}</span>
                  <span className="bp-row-bar">
                    <i style={{ width: `${Math.min(100, s.dropRate)}%` }} />
                  </span>
                  <span className="bp-row-stat">
                    {s.stoppedHere > 0 ? `${s.stoppedHere} stopped` : '—'}
                  </span>
                  <span className="bp-row-pct">{s.dropRate > 0 ? `${s.dropRate}%` : ''}</span>
                </div>
              )
            })}
          </div>

          <p className="bp-foot">
            {scoped.filter(r => r.outcome === 'submitted').length} of {total} finished.{' '}
            Based on {total} form session{total === 1 ? '' : 's'}
            {device !== 'all' ? ` on ${device}` : ''}. Field names only, never what anyone typed.
          </p>
        </>
      )}
      </div>
      )}
    </div>
  )
}
