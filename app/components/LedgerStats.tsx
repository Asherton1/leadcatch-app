'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(end: number, duration: number, delay: number, triggered: boolean): number {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!triggered || hasRun.current) return
    hasRun.current = true

    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(end)
      return
    }

    const startTimer = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startRef.current) startRef.current = ts
        const elapsed = ts - startRef.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(end * eased))
        if (progress < 1) frameRef.current = requestAnimationFrame(animate)
      }
      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(startTimer)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [triggered, end, duration, delay])

  return value
}

export default function LedgerStats() {
  const [visible, setVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

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

  // $51,700 leads (longest + first), then 47, 12, $13,200 stagger after
  const lossDollars = useCountUp(51700, 2200, 0, visible)
  const abandoned = useCountUp(47, 1600, 100, visible)
  const recovered = useCountUp(12, 1400, 200, visible)
  const recoveredDollars = useCountUp(13200, 1600, 300, visible)

  const fmt = (n: number) => n.toLocaleString('en-US')

  return (
    <div ref={wrapRef} className="ledger-stats">
      <div className="ledger-stat">
        <div className="ledger-stat-num">{abandoned}</div>
        <div className="ledger-stat-label">Abandoned leads</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num ledger-stat-orange">${fmt(lossDollars)}</div>
        <div className="ledger-stat-label">Revenue at risk</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num">{recovered}</div>
        <div className="ledger-stat-label">Recovered</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num ledger-stat-orange">${fmt(recoveredDollars)}</div>
        <div className="ledger-stat-label">Recovered revenue</div>
      </div>
    </div>
  )
}
