'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

const FIELDS = [
  { name: 'First name', all: 100, mobile: 100 },
  { name: 'Last name',  all: 94,  mobile: 93 },
  { name: 'Email',      all: 81,  mobile: 78 },
  { name: 'Phone',      all: 32,  mobile: 19, breaks: true },
  { name: 'What are you looking for?', all: 28, mobile: 17 },
  { name: 'Tell us more', all: 19, mobile: 11 },
]

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [view, setView] = useState<'all' | 'mobile'>('all')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const key = view === 'all' ? 'all' : 'mobile'

  return (
    <div className="bp2" ref={ref}>
      <div className="bp2-card">
        <div className="bp2-head">
          <span className="bp2-title">Where this form loses people</span>
          <span className="bp2-tabs">
            <button type="button" className={view === 'all' ? 'is-on' : ''} onClick={() => setView('all')}>All</button>
            <button type="button" className={view === 'mobile' ? 'is-on' : ''} onClick={() => setView('mobile')}>Mobile</button>
          </span>
        </div>

        <div className="bp2-rows">
          {FIELDS.map((f, i) => {
            const pct = f[key as 'all' | 'mobile']
            const prev = i > 0 ? FIELDS[i - 1][key as 'all' | 'mobile'] : 100
            const drop = prev - pct
            return (
              <div className={'bp2-row' + (f.breaks ? ' is-break' : '')} key={f.name}>
                <span className="bp2-name">{f.name}</span>
                <span className="bp2-bar">
                  <i style={{ width: on ? `${pct}%` : '0%', transitionDelay: `${i * 110}ms` }} />
                </span>
                <span className="bp2-pct">{on ? pct : 0}</span>
                <span className="bp2-drop">{drop > 0 ? `\u2212${drop}` : ''}</span>
              </div>
            )
          })}
        </div>

        <div className={'bp2-finding' + (on ? ' is-on' : '')}>
          <span className="bp2-finding-label">The finding</span>
          {view === 'all'
            ? 'Phone is where this form loses most people. Half of everyone who reached it stopped there.'
            : 'On mobile it is worse. Four out of five people who reach the phone field never get past it.'}
        </div>
      </div>

      <p className="bp2-caption">
        Field names only, never what anyone typed. The split by device is usually where
        the answer is hiding.
      </p>
    </div>
  )
}
