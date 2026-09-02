'use client'

import { useEffect, useRef, useState } from 'react'
import './steps-flow.css'

const STEPS = [
  {
    num: '01',
    kicker: 'Install',
    title: 'One line of code',
    text: 'Paste a single script tag into your site, or drop it into Google Tag Manager. Works with WordPress, Webflow, Squarespace, or anything custom. No form changes, no migration, no developer ticket.',
    stat: '60s',
    statLabel: 'to deploy',
  },
  {
    num: '02',
    kicker: 'Capture',
    title: 'The moment they type',
    text: 'As a visitor completes each contact field, we hold what they entered. If they close the tab, get distracted, or never press submit, that inquiry still exists. Contact fields only, never keystrokes.',
    stat: 'Every',
    statLabel: 'field completed',
  },
  {
    num: '03',
    kicker: 'Recover',
    title: 'While it still matters',
    text: 'The inquiry lands in your dashboard and your CRM within a minute. Follow up yourself, or let recovery run on the schedule you set. Then it goes back to your ad platforms as real conversion signal.',
    stat: '< 1 min',
    statLabel: 'to your pipeline',
  },
]

export default function StepsFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  return (
    <div className={'sfl' + (on ? ' sfl-on' : '')} ref={ref}>
      <div className="sfl-rail" aria-hidden="true">
        <span className="sfl-rail-fill" />
      </div>

      <div className="sfl-grid">
        {STEPS.map((s, i) => (
          <div className="sfl-card" key={s.num} style={{ transitionDelay: i * 160 + 'ms' }}>
            <div className="sfl-node" aria-hidden="true">
              <span className="sfl-node-dot" style={{ transitionDelay: (i * 160 + 240) + 'ms' }} />
            </div>
            <div className="sfl-num">{s.num}</div>
            <div className="sfl-kicker">{s.kicker}</div>
            <h3 className="sfl-title">{s.title}</h3>
            <p className="sfl-text">{s.text}</p>
            <div className="sfl-stat">
              <span className="sfl-stat-num">{s.stat}</span>
              <span className="sfl-stat-label">{s.statLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
