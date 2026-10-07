'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import './intercept-panel.css'

type Row = {
  event: string
  trigger_reason: string | null
  device_type: string | null
  fields_completed: number | null
  created_at: string
}

function pct(part: number, whole: number) {
  if (!whole) return 0
  return Math.round((part / whole) * 100)
}

export default function InterceptPanel({ clientId }: { clientId: string | null }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [device, setDevice] = useState<'all' | 'mobile' | 'desktop'>('all')

  useEffect(() => {
    if (!clientId) return
    let cancelled = false
    setLoading(true)
    ;(async () => {
      const { data } = await supabase
        .from('intercept_events')
        .select('event, trigger_reason, device_type, fields_completed, created_at')
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

  // Still fetching: render nothing rather than flashing an empty state.
  if (loading) return null

  // No data yet still gets a panel. A blank space where a paid feature should
  // be reads as paying for something that does not exist.
  if (rows.length === 0) {
    return (
      <section className="ip ip-empty">
        <p className="ip-kicker">Predict and Intercept</p>
        <h3 className="ip-title">Nothing to report yet</h3>
        <p className="ip-sub">
          When this is switched on and a visitor looks about to give up on your form,
          ReCapture offers to take their phone number instead, right there on the page.
          This panel will show you how often that offer appeared and whether it worked.
          You can turn it on under Settings.
        </p>
      </section>
    )
  }

  const scoped = rows.filter(r => device === 'all' || r.device_type === device)
  const shown = scoped.filter(r => r.event === 'shown').length
  const engaged = scoped.filter(r => r.event === 'engaged').length
  const dismissed = scoped.filter(r => r.event === 'dismissed').length
  const ignored = Math.max(shown - engaged - dismissed, 0)

  const byTrigger = ['idle', 'exit_intent'].map(t => {
    const s = scoped.filter(r => r.event === 'shown' && r.trigger_reason === t).length
    const e = scoped.filter(r => r.event === 'engaged' && r.trigger_reason === t).length
    return { t, s, e }
  })

  const label: Record<string, string> = {
    idle: 'They stopped typing',
    exit_intent: 'They headed for the exit',
  }

  return (
    <section className="ip">
      <div className="ip-head">
        <div>
          <p className="ip-kicker">Predict and Intercept</p>
          <h3 className="ip-title">Offers made before someone left</h3>
          <p className="ip-sub">
            When somebody looks like they are about to abandon your form, we offer to take
            their number instead. This is how often that offer was made, and what happened next.
          </p>
        </div>
        <div className="ip-filters">
          {(['all', 'mobile', 'desktop'] as const).map(d => (
            <button
              key={d}
              type="button"
              className={'ip-filter' + (device === d ? ' is-on' : '')}
              onClick={() => setDevice(d)}
            >
              {d === 'all' ? 'All' : d === 'mobile' ? 'Phone' : 'Desktop'}
            </button>
          ))}
        </div>
      </div>

      <div className="ip-stats">
        <div className="ip-stat">
          <div className="ip-n">{shown}</div>
          <div className="ip-l">Times the offer appeared</div>
        </div>
        <div className="ip-stat">
          <div className="ip-n ip-good">{engaged}</div>
          <div className="ip-l">Gave their number</div>
          <div className="ip-sl">{pct(engaged, shown)}% of the time</div>
        </div>
        <div className="ip-stat">
          <div className="ip-n">{dismissed}</div>
          <div className="ip-l">Closed it straight away</div>
          <div className="ip-sl">{pct(dismissed, shown)}% of the time</div>
        </div>
        <div className="ip-stat">
          <div className="ip-n">{ignored}</div>
          <div className="ip-l">Left it alone and went</div>
          <div className="ip-sl">{pct(ignored, shown)}% of the time</div>
        </div>
      </div>

      <table className="ip-table">
        <thead>
          <tr>
            <th>What tipped us off</th>
            <th className="ip-r">Offers made</th>
            <th className="ip-r">Numbers given</th>
            <th className="ip-r">Worked</th>
          </tr>
        </thead>
        <tbody>
          {byTrigger.map(({ t, s, e }) => (
            <tr key={t}>
              <td className="ip-w">{label[t] ?? t}</td>
              <td className="ip-r">{s}</td>
              <td className="ip-r">{e}</td>
              <td className="ip-r ip-o">{s ? pct(e, s) + '%' : '\u2014'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="ip-foot">
        {dismissed > engaged
          ? 'More people are closing this than using it. Worth reviewing the wording, or switching it off for this client.'
          : 'Every number here is someone who was about to leave without giving you anything.'}
      </p>
    </section>
  )
}
