'use client'

import { useEffect, useRef, useState } from 'react'
import './media-panel.css'

const PLATFORMS = ['Google Ads', 'Meta', 'TikTok', 'Microsoft Ads', 'X Ads']

const ROWS = [
  { label: 'Paid search',   spend: 6420,  before: 11, after: 24 },
  { label: 'Paid social',   spend: 3180,  before: 4,  after: 19 },
  { label: 'Display',       spend: 2940,  before: 0,  after: 2  },
  { label: 'Retargeting',   spend: 1150,  before: 3,  after: 9  },
]

export default function MediaPanel() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  useEffect(() => {
    if (!on) return
    const t = setTimeout(() => setFixed(true), 2200)
    return () => clearTimeout(t)
  }, [on])

  const total = ROWS.reduce((a, r) => a + r.spend, 0)
  const conv = ROWS.reduce((a, r) => a + (fixed ? r.after : r.before), 0)

  return (
    <div className={'mp' + (on ? ' mp-on' : '') + (fixed ? ' mp-fixed' : '')} ref={ref}>
      <div className="mp-head">
        <span className="mp-pip" aria-hidden="true" />
        <span className="mp-title">Account overview</span>
        <span className={'mp-state' + (fixed ? ' is-good' : '')}>
          {fixed ? 'Measured correctly' : 'Tracking incomplete'}
        </span>
      </div>

      <div className="mp-summary">
        <div className="mp-stat">
          <span className="mp-stat-num">${total.toLocaleString()}</span>
          <span className="mp-stat-label">Spend this month</span>
        </div>
        <span className="mp-divider" aria-hidden="true" />
        <div className="mp-stat">
          <span className={'mp-stat-num' + (fixed ? ' mp-good' : ' mp-bad')} key={String(fixed)}>{conv}</span>
          <span className="mp-stat-label">Conversions recorded</span>
        </div>
        <span className="mp-divider" aria-hidden="true" />
        <div className="mp-stat">
          <span className="mp-stat-num">${conv > 0 ? Math.round(total / conv).toLocaleString() : '—'}</span>
          <span className="mp-stat-label">Cost per conversion</span>
        </div>
      </div>

      <div className="mp-rows">
        {ROWS.map((r, i) => {
          const v = fixed ? r.after : r.before
          const pct = Math.min(100, (v / 24) * 100)
          return (
            <div className="mp-row" key={r.label} style={{ ['--i' as string]: i }}>
              <span className="mp-row-label">{r.label}</span>
              <span className="mp-row-spend">${r.spend.toLocaleString()}</span>
              <span className="mp-bar"><i style={{ width: pct + '%' }} /></span>
              <span className="mp-row-conv">{v}</span>
            </div>
          )
        })}
      </div>

      <div className="mp-platforms">
        {PLATFORMS.map((p, i) => (
          <span className="mp-platform" key={p} style={{ ['--i' as string]: i }}>{p}</span>
        ))}
      </div>
    </div>
  )
}
