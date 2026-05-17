'use client'

import { useState, useEffect, useRef, Fragment } from 'react'

const steps = [
  {
    num: '01',
    title: 'Install in 60 Seconds',
    text: 'Copy one line of code into your website. Works with WordPress, Wix, Webflow, Squarespace, or any custom site. Takes less time than making coffee.',
    statValue: '60s',
    statLabel: 'time to deploy',
  },
  {
    num: '02',
    title: 'Capture Every Lead',
    text: 'The instant a visitor types into your form, ReCapture captures their name, email, and phone — even if they close the tab, get distracted, or abandon halfway through.',
    statValue: '100%',
    statLabel: 'lead capture rate',
  },
  {
    num: '03',
    title: 'Recover Lost Revenue',
    text: 'Reach out manually from your dashboard or let ReCapture send automated recovery emails on your behalf. Turn invisible drop-offs into booked appointments and closed revenue.',
    statValue: '$30K',
    statLabel: 'monthly recovered revenue',
  },
]

export default function StepsAccordion() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`steps-flow${isVisible ? ' steps-flow-visible' : ''}`}
    >
      <div className="steps-flow-grid">
        {steps.map((s, i) => (
          <Fragment key={i}>
            <div className="steps-flow-col">
              <div className="steps-flow-indicator" aria-hidden="true">
                <svg viewBox="0 0 28 28" className="steps-flow-ring">
                  <circle cx="14" cy="14" r="13" />
                </svg>
                <span className="steps-flow-num">{s.num}</span>
              </div>
              <h3 className="steps-flow-title">{s.title}</h3>
              <p className="steps-flow-text">{s.text}</p>
              <div className="steps-flow-stat">
                <div className="steps-flow-stat-num">{s.statValue}</div>
                <div className="steps-flow-stat-label">{s.statLabel}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`steps-flow-connector steps-flow-connector-${i + 1}`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 60 12" preserveAspectRatio="none">
                  <line x1="0" y1="6" x2="50" y2="6" />
                  <polyline points="50,2 60,6 50,10" />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
