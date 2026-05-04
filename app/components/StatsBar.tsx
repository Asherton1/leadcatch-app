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

  // Animated $18.8K count-up
  const dollars = useCountUp(18800, 2000, visible)
  const formattedDollars = '$' + dollars.toLocaleString()

  return (
    <div ref={wrapRef} className="stats-hero">
      {/* Dominant featured stat */}
      <div className="stats-hero-featured">
        <p className="stats-hero-eyebrow">Estimated revenue lost per month</p>
        <p className="stats-hero-number">{formattedDollars}</p>
        <p className="stats-hero-context">
          Per high-ticket business · From form abandonment alone · Industry average
        </p>
      </div>

      {/* Supporting context stats — smaller, side-by-side below */}
      <div className="stats-hero-supporting">
        <div className="stats-hero-stat">
          <span className="stats-hero-stat-num">60–80%</span>
          <span className="stats-hero-stat-label">of form visitors abandon before submit</span>
        </div>
        <div className="stats-hero-divider"></div>
        <div className="stats-hero-stat">
          <span className="stats-hero-stat-num">2 min</span>
          <span className="stats-hero-stat-label">to install one script tag</span>
        </div>
      </div>
    </div>
  )
}
