'use client'

import { useState, useEffect } from 'react'

const fakeNames = [
  'Sarah Mit', 'Michael Ch', 'David Sull', 'Jessica Bra',
  'Andrew Lee', 'Maria Garc', 'Daniel Kim', 'Emily Rose',
  'Robert Tor', 'Olivia Wri', 'James Park', 'Sophia Mar',
]

const labels = ['NAME', 'EMAIL', 'PHONE']

type Vignette = {
  id: number
  x: number
  y: number
  label: string
  name: string
}

// Position regions that AVOID the central headline + the right-side Ghost demo
const positionRegions = [
  () => ({ x: Math.random() * 12 + 2,  y: Math.random() * 70 + 15 }),  // far left vertical strip
  () => ({ x: Math.random() * 20 + 3,  y: Math.random() * 16 + 4 }),   // top-left corner
  () => ({ x: Math.random() * 22 + 3,  y: Math.random() * 16 + 78 }),  // bottom-left corner
  () => ({ x: Math.random() * 16 + 78, y: Math.random() * 14 + 4 }),   // top-right corner (above demo)
  () => ({ x: Math.random() * 16 + 78, y: Math.random() * 14 + 82 }),  // bottom-right corner (below demo)
]

export default function GhostFunnel() {
  const [vignettes, setVignettes] = useState<Vignette[]>([])

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let nextId = 0

    const spawn = () => {
      const pos = positionRegions[Math.floor(Math.random() * positionRegions.length)]()
      const newV: Vignette = {
        id: nextId++,
        x: pos.x,
        y: pos.y,
        label: labels[Math.floor(Math.random() * labels.length)],
        name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
      }
      setVignettes(prev => [...prev, newV])
      setTimeout(() => {
        setVignettes(prev => prev.filter(v => v.id !== newV.id))
      }, 6500)
    }

    // Stagger initial spawns so all 3 don't pop at once
    const t1 = setTimeout(spawn, 800)
    const t2 = setTimeout(spawn, 2500)
    const t3 = setTimeout(spawn, 4200)

    // Recurring spawn every ~2.8s
    const interval = setInterval(spawn, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="ghost-funnel" aria-hidden="true">
      {vignettes.map(v => (
        <div
          key={v.id}
          className="ghost-vignette"
          style={{ left: `${v.x}%`, top: `${v.y}%` }}
        >
          <div className="ghost-vignette-label">{v.label}</div>
          <div className="ghost-vignette-field">
            <span className="ghost-vignette-typed">{v.name}</span>
            <span className="ghost-vignette-cursor" />
          </div>
          <div className="ghost-vignette-pulse" />
        </div>
      ))}
    </div>
  )
}
