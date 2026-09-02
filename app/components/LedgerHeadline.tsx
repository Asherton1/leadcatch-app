'use client'

import { useEffect, useRef, useState } from 'react'
import './ledger-headline.css'

export default function LedgerHeadline() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  return (
    <div className={'lh' + (on ? ' lh-on' : '')} ref={ref}>
      <span className="lh-rail" aria-hidden="true">
        <span className="lh-rail-line" />
        <span className="lh-rail-text">The proof</span>
      </span>

      <h2 className="lh-title">
        <span className="lh-line" style={{ transitionDelay: '0ms' }}>
          Every lost lead.
        </span>
        <span className="lh-line lh-line-accent" style={{ transitionDelay: '260ms' }}>
          Every dollar.
          <span className="lh-underline" aria-hidden="true" />
        </span>
        <span className="lh-line lh-line-muted" style={{ transitionDelay: '560ms' }}>
          Sitting in front of you
        </span>
        <span className="lh-line lh-line-muted" style={{ transitionDelay: '820ms' }}>
          every single morning.
        </span>
      </h2>
    </div>
  )
}
