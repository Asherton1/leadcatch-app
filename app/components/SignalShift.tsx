'use client'

import { useEffect, useRef, useState } from 'react'
import './signal-shift.css'

export default function SignalShift() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t = setTimeout(() => setOn(true), 900)
        io.disconnect()
        return () => clearTimeout(t)
      }
    }, { threshold: 0.45 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="ss" ref={ref}>
      <div className="ss-chrome">
        <div className="ss-chrome-bar">
          <span className="ss-chrome-dot" /><span className="ss-chrome-dot" /><span className="ss-chrome-dot" />
          <span className="ss-chrome-title">Campaign performance</span>
          <span className={'ss-tag' + (on ? ' is-on' : '')}>
            {on ? 'ReCapture connected' : 'Pixel only'}
          </span>
        </div>

        <div className="ss-row ss-row-head">
          <span>Campaign</span><span>Results</span><span>Cost per result</span><span>Learning</span>
        </div>

        {[
          { name: 'Consultation requests', base: 18, lift: 65, cost: 214, better: 59 },
          { name: 'Retargeting, site visitors', base: 7, lift: 24, cost: 331, better: 96 },
        ].map((c, i) => (
          <div className="ss-row" key={c.name} style={{ transitionDelay: `${i * 120}ms` }}>
            <span className="ss-name">{c.name}</span>
            <span className={'ss-num' + (on ? ' is-up' : '')}>{on ? c.lift : c.base}</span>
            <span className={'ss-cost' + (on ? ' is-down' : '')}>${on ? c.better : c.cost}</span>
            <span className="ss-learn">
              <span className="ss-learn-bar">
                <i style={{ width: on ? '100%' : '42%' }} />
              </span>
              <span className="ss-learn-label">{on ? 'Complete' : 'Limited'}</span>
            </span>
          </div>
        ))}

        <div className="ss-foot">
          <span className={'ss-foot-note' + (on ? ' is-hidden' : '')}>
            Meta only knows about the 18 people who pressed submit.
          </span>
          <span className={'ss-foot-note is-good' + (on ? ' is-shown' : '')}>
            Now it knows about all 65 who showed real intent, weighted by how far each one got.
          </span>
        </div>
      </div>

      <p className="ss-caption">
        Same campaigns, same budget, same audience. The only thing that changed is how
        much of your actual demand the platform can see.
      </p>
    </div>
  )
}
