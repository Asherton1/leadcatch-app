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

export default function MathSection() {
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
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stagger count-ups to match the spine drawing (1.6s) + dot reveals (300ms apart)
  const cost = useCountUp(397, 1400, 400, visible)
  const medspa = useCountUp(2800, 1600, 700, visible)
  const dental = useCountUp(1900, 1400, 1000, visible)
  const property = useCountUp(3200, 1600, 1300, visible)

  const fmt = (n: number) => n.toLocaleString('en-US')

  return (
    <section ref={wrapRef} className={`pricing-math ${visible ? 'pricing-math-visible' : ''}`}>
      <div className="pricing-math-inner">
        <p className="pricing-math-eyebrow">The math</p>
        <h2 className="pricing-math-headline">Plans pay for themselves. Here&apos;s how.</h2>

        <div className="pricing-math-spine">
          <div className="pricing-math-spine-inner">
            <div className="pricing-math-line" />

            <div className="pricing-math-row pricing-math-row-left">
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(cost)}<span className="pricing-math-num-period"> / mo</span></div>
                <div className="pricing-math-desc">Cost of ReCapture Pro.</div>
              </div>
              <div className="pricing-math-dot" data-step="1" />
            </div>

            <div className="pricing-math-row pricing-math-row-right">
              <div className="pricing-math-dot" data-step="2" />
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(medspa)}</div>
                <div className="pricing-math-desc">Average med spa client.</div>
              </div>
            </div>

            <div className="pricing-math-row pricing-math-row-left">
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(dental)}</div>
                <div className="pricing-math-desc">Average dental patient.</div>
              </div>
              <div className="pricing-math-dot" data-step="3" />
            </div>

            <div className="pricing-math-row pricing-math-row-right">
              <div className="pricing-math-dot" data-step="4" />
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(property)}</div>
                <div className="pricing-math-desc">Average property management lease per year.</div>
              </div>
            </div>

          </div>

          <div className="pricing-math-punchline-block">
            <div className="pricing-math-dot pricing-math-dot-final" data-step="5" />
            <div className="pricing-math-punchline">One recovered lead pays for the year.</div>
            <div className="pricing-math-punchline-sub">Most clients break even in week one.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
