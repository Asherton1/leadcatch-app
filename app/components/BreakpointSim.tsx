'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

const FIELDS = [
  { name: 'First name', survive: 100 },
  { name: 'Last name',  survive: 94 },
  { name: 'Email',      survive: 81 },
  { name: 'Phone',      survive: 32 },
  { name: 'What are you looking for?', survive: 28 },
  { name: 'Tell us more', survive: 19 },
]

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState(-1)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect() }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const timers = FIELDS.map((_, i) => setTimeout(() => setStep(i), 500 + i * 900))
    return () => timers.forEach(clearTimeout)
  }, [started])

  const breakIdx = 3

  return (
    <div className="bs" ref={ref}>
      <div className="bs-form">
        <div className="bs-form-head">
          <span className="bs-dot" /><span className="bs-dot" /><span className="bs-dot" />
          <span className="bs-form-title">Consultation request</span>
        </div>

        {FIELDS.map((f, i) => {
          const active = step === i
          const passed = step > i
          const isBreak = i === breakIdx
          const lost = i > 0 ? FIELDS[i - 1].survive - f.survive : 0
          return (
            <div
              className={
                'bs-field' +
                (active ? ' is-active' : '') +
                (passed ? ' is-passed' : '') +
                (isBreak && step >= i ? ' is-break' : '')
              }
              key={f.name}
            >
              <span className="bs-label">{f.name}</span>
              <span className="bs-input">
                {active || passed ? <span className="bs-caret" /> : null}
              </span>

              {step >= i && lost > 0 ? (
                <span className={'bs-lost' + (isBreak ? ' bs-lost-big' : '')}>
                  &minus;{lost}
                </span>
              ) : null}

              <span className="bs-count">{step >= i ? f.survive : ''}</span>
            </div>
          )
        })}
      </div>

      <div className={'bs-verdict' + (step >= FIELDS.length - 1 ? ' is-on' : '')}>
        <span className="bs-verdict-label">Breakpoint</span>
        <p>
          <strong>Phone</strong> is where this form dies. Of the 81 who reached it,
          <strong> 49 stopped there</strong>. Everything after it is downstream of a
          problem nobody could see.
        </p>
      </div>
    </div>
  )
}
