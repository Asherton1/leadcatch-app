'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = { value: number; prefix?: string; suffix?: string; label: string }

const STATS: Stat[] = [
  { value: 10,  prefix: '$', suffix: 'M+', label: 'in managed ad spend' },
  { value: 38,  suffix: '+',  label: 'long-term client relationships' },
  { value: 100, prefix: '$', suffix: 'K/mo', label: 'peak monthly ad budget' },
  { value: 10,  suffix: ' yrs', label: 'in high-ticket marketing' },
]

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return n
}

function StatCell({ stat, run }: { stat: Stat; run: boolean }) {
  const n = useCountUp(stat.value, run)
  return (
    <div className="about-stat-cell">
      <div className="about-stat-num">
        {stat.prefix}{n}{stat.suffix}
      </div>
      <div className="about-stat-label">{stat.label}</div>
    </div>
  )
}

export default function StatCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setRun(true); obs.disconnect() }
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="about-stat-grid" ref={ref}>
      {STATS.map((s, i) => (
        <StatCell key={i} stat={s} run={run} />
      ))}
    </div>
  )
}
