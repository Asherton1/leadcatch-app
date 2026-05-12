'use client'

import { useEffect, useRef, useState } from 'react'

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
                <div className="pricing-math-num">${fmt(397)}<span className="pricing-math-num-period"> / mo</span></div>
                <div className="pricing-math-desc">Cost of ReCapture Pro.</div>
              </div>
              <div className="pricing-math-dot" data-step="1" />
            </div>

            <div className="pricing-math-row pricing-math-row-right">
              <div className="pricing-math-dot" data-step="2" />
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(2800)}</div>
                <div className="pricing-math-desc">Average med spa client.</div>
              </div>
            </div>

            <div className="pricing-math-row pricing-math-row-left">
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(1900)}</div>
                <div className="pricing-math-desc">Average dental patient.</div>
              </div>
              <div className="pricing-math-dot" data-step="3" />
            </div>

            <div className="pricing-math-row pricing-math-row-right">
              <div className="pricing-math-dot" data-step="4" />
              <div className="pricing-math-content">
                <div className="pricing-math-num">${fmt(3200)}</div>
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
