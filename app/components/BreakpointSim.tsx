'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

const DOORS = [
  { label: 'First name', gap: 96 },
  { label: 'Last name', gap: 91 },
  { label: 'Email', gap: 90 },
  { label: 'Phone', gap: 26, breaks: true },
  { label: 'Looking for?', gap: 80 },
  { label: 'Tell us more', gap: 75 },
]

// the doorway each figure fails to get through. 7 means they made it out.
const STOPS = [1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7]

// fixed lanes so server and client render identically
const LANE = [8, 34, 61, 20, 47, 72, 12, 39, 66, 27, 54, 80, 16, 43, 69, 31, 58, 5, 76, 24, 50, 63, 37, 11]

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      for (let i = 1; i <= 7; i++) {
        timers.push(setTimeout(() => setStep(i), 500 + i * 760))
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const xOf = (door: number) => 9 + (door - 1) * 14.5

  return (
    <div className="dw" ref={ref}>
      <div className="dw-hall">
        {DOORS.map((d, i) => {
          const n = i + 1
          return (
            <div
              className={'dw-door' + (d.breaks ? ' is-break' : '') + (step >= n ? ' is-reached' : '')}
              style={{ left: `${xOf(n)}%` }}
              key={d.label}
            >
              <span className="dw-post dw-post-t" style={{ height: `${(100 - d.gap) / 2}%` }} />
              <span className="dw-post dw-post-b" style={{ height: `${(100 - d.gap) / 2}%` }} />
              <span className="dw-door-label">{d.label}</span>
              {d.breaks && <span className="dw-door-flag">Breakpoint</span>}
            </div>
          )
        })}

        {STOPS.map((stop, i) => {
          const reached = Math.min(step, stop)
          const blocked = step >= stop && stop <= 6
          const out = stop === 7 && step >= 7
          const x = step === 0 ? 2 : out ? 94 : xOf(reached) - (blocked ? 3.4 : 0)
          return (
            <span
              className={'dw-p' + (blocked ? ' is-stuck' : '') + (out ? ' is-out' : '')}
              key={i}
              style={{
                left: `${x}%`,
                top: `${LANE[i]}%`,
                transitionDelay: `${(i % 6) * 55}ms`,
              }}
            >
              <i className="dw-p-head" />
              <i className="dw-p-body" />
            </span>
          )
        })}

        <span className="dw-exit">Submitted</span>
      </div>

      <div className={'dw-verdict' + (step >= 7 ? ' is-on' : '')}>
        <p>
          <strong>Phone is the doorway nobody fits through.</strong> Of the 81 people who
          reached it, 49 stopped there. Every field after it is a door almost nobody ever
          gets to.
        </p>
        <p className="dw-verdict-sub">
          On mobile the gap is narrower still. Breakpoint names the field, splits it by
          device, and works it out from the people who left, which is the only place that
          answer exists.
        </p>
      </div>
    </div>
  )
}
