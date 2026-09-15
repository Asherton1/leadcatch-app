'use client'

import { useEffect, useRef, useState } from 'react'
import './phase-flow.css'

const STEPS = [
  { k: 'Audit',      t: 'Find what the reporting is hiding' },
  { k: 'Tracking',   t: 'Conversions that fire on what matters' },
  { k: 'Structure',  t: 'Rebuild around what the data shows' },
  { k: 'Measure',    t: 'Cost per client, not cost per lead' },
]

export default function PhaseFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  useEffect(() => {
    if (!on) return
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1600),
      setTimeout(() => setStage(4), 2200),
      setTimeout(() => setStage(5), 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [on])

  return (
    <div className={'pf' + (on ? ' pf-on' : '') + (stage >= 5 ? ' pf-handoff' : '')} ref={ref}>

      <div className="pf-phase pf-one">
        <div className="pf-phase-head">
          <span className="pf-badge">Phase one</span>
          <h3>Fix the measurement, then the media</h3>
          <p>The consulting engagement. It stands on its own and it is where most accounts need to start.</p>
        </div>

        <div className="pf-steps">
          {STEPS.map((s, i) => (
            <div className={'pf-step' + (stage > i ? ' pf-done' : '')} key={s.k}>
              <span className="pf-step-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span className="pf-step-text">
                <b>{s.k}</b>
                <i>{s.t}</i>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-bridge" aria-hidden="true">
        <span className="pf-bridge-line" />
        <span className="pf-bridge-packet" />
        <span className="pf-bridge-label">once the numbers are true</span>
      </div>

      <div className="pf-phase pf-two">
        <div className="pf-phase-head">
          <span className="pf-badge pf-badge-two">Phase two</span>
          <h3>Recover what the forms are losing</h3>
          <p>Only once the measurement is sound. Recovery software on top of broken tracking captures nothing useful.</p>
        </div>

        <div className="pf-capture">
          <div className="pf-capture-row">
            <span className="pf-capture-label">Inquiries started</span>
            <span className="pf-capture-val">100</span>
          </div>
          <div className="pf-capture-row pf-capture-dim">
            <span className="pf-capture-label">Reached you</span>
            <span className="pf-capture-val">34</span>
          </div>
          <div className="pf-capture-row pf-capture-hot">
            <span className="pf-capture-label">Recovered by ReCapture</span>
            <span className="pf-capture-val">66</span>
          </div>
          <div className="pf-capture-bar">
            <i className="pf-cap-known" />
            <i className="pf-cap-lost" />
          </div>
          <p className="pf-capture-note">Sent back to Meta and Google as real conversion signal, weighted by intent.</p>
        </div>
      </div>
    </div>
  )
}
