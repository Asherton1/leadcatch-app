'use client'

import { useEffect, useState } from 'react'
import './live-visitors-demo.css'

type V = { path: string; meta: string; score: number; note: string }

const SCENES: V[][] = [
  [
    { path: '/', meta: 'Frisco, TX · Mobile', score: 18, note: 'Just landed' },
  ],
  [
    { path: '/practice-areas', meta: 'Plano, TX · Desktop', score: 44, note: '2 pages · 1m 04s' },
    { path: '/', meta: 'Frisco, TX · Mobile', score: 26, note: '2 pages · 0m 41s' },
  ],
  [
    { path: '/contact', meta: 'Dallas, TX · Mobile', score: 61, note: 'Opened the form' },
    { path: '/practice-areas', meta: 'Plano, TX · Desktop', score: 54, note: '4 pages · 3m 12s' },
    { path: '/', meta: 'Frisco, TX · Mobile', score: 31, note: '3 pages · 1m 22s' },
  ],
  [
    { path: '/contact', meta: 'Dallas, TX · Mobile', score: 82, note: 'Filling out form' },
    { path: '/practice-areas', meta: 'Plano, TX · Desktop', score: 54, note: '4 pages · 3m 48s' },
    { path: '/', meta: 'Frisco, TX · Mobile', score: 31, note: '3 pages · 1m 58s' },
  ],
  [
    { path: '/practice-areas', meta: 'Plano, TX · Desktop', score: 57, note: '5 pages · 4m 20s' },
    { path: '/', meta: 'Frisco, TX · Mobile', score: 33, note: '3 pages · 2m 30s' },
  ],
]

function band(score: number) {
  if (score >= 70) return { label: 'Hot', color: '#ef4444' }
  if (score >= 45) return { label: 'Warm', color: '#f59e0b' }
  return { label: 'Cool', color: '#6b7280' }
}

export default function LiveVisitorsDemo() {
  const [i, setI] = useState(0)
  const [captured, setCaptured] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const t = setInterval(() => {
      setI(prev => {
        const next = (prev + 1) % SCENES.length
        // the moment the hot visitor disappears, flash the capture
        setCaptured(next === 4)
        return next
      })
    }, 2600)
    return () => clearInterval(t)
  }, [])

  const scene = SCENES[i]

  return (
    <div className="lvd">
      <div className="lvd-head">
        <span className="lvd-dot" />
        <span className="lvd-count">
          {scene.length} on your site now
        </span>
      </div>

      <div className="lvd-rows">
        {scene.map(v => {
          const b = band(v.score)
          return (
            <div className="lvd-row" key={v.path}>
              <div className="lvd-row-top">
                <span className="lvd-path">{v.path}</span>
                <span className="lvd-badge" style={{ color: b.color }}>
                  {b.label} {v.score}
                </span>
              </div>
              <div className="lvd-row-bot">
                <span className="lvd-meta">{v.meta}</span>
                <span className={'lvd-note' + (v.note === 'Filling out form' ? ' active' : '')}>
                  {v.note}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={'lvd-capture' + (captured ? ' show' : '')}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Left without submitting — captured
      </div>
    </div>
  )
}
