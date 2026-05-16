'use client'

import { useState, useEffect } from 'react'

const problems = [
  {
    eyebrow: 'the behavior',
    title: 'They Start. Then Vanish.',
    text: "A prospect finds your site, opens your form, types their name and email — then their phone buzzes. They switch tabs. They never come back. And you never knew they existed.",
    statValue: 70,
    statPrefix: '',
    statSuffix: '%',
    statLabel: 'never return',
  },
  {
    eyebrow: 'the pattern',
    title: 'Every Extra Field Costs You',
    text: "Five fields might seem reasonable — but data shows most visitors abandon after three. Every extra field is a silent conversion killer. And until now, you had no way to see it.",
    statValue: 3,
    statPrefix: '',
    statSuffix: '',
    statLabel: 'fields = the breaking point',
  },
  {
    eyebrow: 'the cost',
    title: 'Ghost Leads Are Bleeding You Dry',
    text: "If 100 visitors start your form and 60 don't finish, that's 15–20 lost bookings per month. For a $1,500 average service, that's $22k–$30k walking out the door. Every single month.",
    statValue: 30,
    statPrefix: '$',
    statSuffix: 'K',
    statLabel: 'lost per month',
  },
]

function AnimatedNumber({
  target,
  isActive,
  prefix,
  suffix,
}: {
  target: number
  isActive: boolean
  prefix: string
  suffix: string
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isActive) {
      const timer = setTimeout(() => setCurrent(0), 400)
      return () => clearTimeout(timer)
    }

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setCurrent(target)
      return
    }

    setCurrent(0)
    let frame: number
    const start = performance.now()
    const duration = 700

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isActive, target])

  return (
    <span>
      {prefix}
      {current}
      {suffix}
    </span>
  )
}

export default function ProblemAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="problem-editorial">
      {problems.map((p, i) => {
        const isOpen = openIdx === i
        return (
          <article
            className={`problem-row${isOpen ? ' problem-row-open' : ''}`}
            key={i}
          >
            <button
              type="button"
              className="problem-row-trigger"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <div className="problem-row-head">
                <span className="problem-row-eyebrow">{p.eyebrow}</span>
                <h3 className="problem-row-title">{p.title}</h3>
              </div>
              <span className="problem-row-icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="problem-row-body">
              <div className="problem-row-body-inner">
                <p className="problem-row-text">{p.text}</p>
                <div className="problem-row-stat">
                  <div className="problem-row-stat-num">
                    <AnimatedNumber
                      target={p.statValue}
                      isActive={isOpen}
                      prefix={p.statPrefix}
                      suffix={p.statSuffix}
                    />
                  </div>
                  <div className="problem-row-stat-label">{p.statLabel}</div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
