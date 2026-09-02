'use client'

import { useEffect, useRef, useState } from 'react'
import './signal-flow.css'

export default function SignalFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  useEffect(() => {
    if (!on) return
    const t1 = setTimeout(() => setStage(1), 500)
    const t2 = setTimeout(() => setStage(2), 1900)
    const t3 = setTimeout(() => setStage(3), 3300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [on])

  const dots = Array.from({ length: 100 })

  return (
    <div className="sf" ref={ref}>
      <div className="sf-grid">
        {dots.map((_, i) => {
          const submitted = i < 32
          return (
            <span
              key={i}
              className={
                'sf-dot' +
                (submitted ? ' sf-dot-sub' : '') +
                (stage >= 1 && submitted ? ' sf-seen' : '') +
                (stage >= 2 && !submitted ? ' sf-caught' : '')
              }
              style={{ transitionDelay: (i % 20) * 14 + 'ms' }}
            />
          )
        })}
      </div>

      <div className="sf-legend">
        <div className={'sf-leg' + (stage >= 1 ? ' in' : '')}>
          <span className="sf-key sf-key-sub" />
          <span className="sf-leg-n">32</span>
          <span className="sf-leg-t">pressed submit &mdash; all your ad platforms ever see</span>
        </div>
        <div className={'sf-leg' + (stage >= 2 ? ' in' : '')}>
          <span className="sf-key sf-key-caught" />
          <span className="sf-leg-n">68</span>
          <span className="sf-leg-t">started and left &mdash; captured, followed up, attributed</span>
        </div>
      </div>

      <div className={'sf-close' + (stage >= 3 ? ' in' : '')}>
        Out of 100 people who wanted what you sell, your campaigns are learning from 32.
      </div>
    </div>
  )
}
