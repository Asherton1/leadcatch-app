'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 1800, triggered = false): number {
  const [value, setValue] = useState(0)
  const frameRef    = useRef<number>(0)
  const startRef    = useRef<number>(0)
  const hasRun      = useRef(false)

  useEffect(() => {
    if (!triggered || hasRun.current) return
    hasRun.current = true

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed  = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [triggered, end, duration])

  return value
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function StatsBar() {
  const [visible, setVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Trigger count-up when stats bar scrolls into view
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stat 1: 60–80%  (two simultaneous count-ups)
  const lo = useCountUp(60,   1600, visible)
  const hi = useCountUp(80,   1600, visible)

  // Stat 2: $18.8k  (animate 0 → 188, display as X.Xk)
  const rev = useCountUp(188, 1800, visible)

  // Stat 3: 2 minutes
  const mins = useCountUp(2,  1400, visible)

  return (
    <div ref={wrapRef} className="stats-bar">
      <div className="stat-item">
        <span className="stat-number">
          {lo}–{hi}%
        </span>
        <span className="stat-label">Form Abandonment Rate</span>
      </div>

      <div className="stat-item">
        <span className="stat-number">
          ${(rev / 10).toFixed(1)}k
        </span>
        <span className="stat-label">Avg. Lost Per Month</span>
      </div>

      <div className="stat-item">
        <span className="stat-number">
          {mins}&nbsp;min
        </span>
        <span className="stat-label">Installation Time</span>
      </div>
    </div>
  )
}
