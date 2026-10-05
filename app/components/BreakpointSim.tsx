'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

const FIELDS = [
  { label: 'First name', got: '100 people reach this' },
  { label: 'Last name', got: '94 still here' },
  { label: 'Email', got: '81 still here' },
  { label: 'Phone', got: '32 still here', breaks: true },
  { label: 'What are you looking for?', got: '28 still here' },
  { label: 'Tell us more', got: '19 still here' },
]

const JAG = [0, -3, 5, -6, 2, 7, -4, 3, -7, 4, 0, 6, -5, 2, -3, 5, -2, 4, 0]

function edge(dir: 'top' | 'bottom', at: number) {
  const pts = JAG.map((j, i) => {
    const x = (i / (JAG.length - 1)) * 100
    const op = j < 0 ? `- ${Math.abs(j)}px` : `+ ${j}px`
    return `${x.toFixed(2)}% calc(${at}% ${op})`
  })
  return dir === 'top'
    ? `polygon(0 0, 100% 0, ${[...pts].reverse().join(', ')})`
    : `polygon(${pts.join(', ')}, 100% 100%, 0 100%)`
}

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      timers.push(setTimeout(() => setStage(1), 600))
      timers.push(setTimeout(() => setStage(2), 1700))
      timers.push(setTimeout(() => setStage(3), 2800))
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const TEAR_AT = 56

  const sheet = (
    <div className="tr-inner">
      <div className="tr-head">Request a consultation</div>
      {FIELDS.map(f => (
        <div className={'tr-field' + (f.breaks ? ' is-break' : '')} key={f.label}>
          <span className="tr-label">{f.label}</span>
          <span className="tr-input" />
          <span className="tr-got">{f.got}</span>
        </div>
      ))}
      <div className="tr-submit">Submit</div>
    </div>
  )

  return (
    <div className="tr" ref={ref}>
      <div className={'tr-sheet stage-' + stage}>
        <div className="tr-half tr-top" style={{ clipPath: edge('top', TEAR_AT) }}>
          {sheet}
        </div>
        <div className="tr-half tr-bottom" style={{ clipPath: edge('bottom', TEAR_AT) }}>
          {sheet}
        </div>
        <span className="tr-line" style={{ top: `${TEAR_AT}%` }} />
        <span className="tr-flag" style={{ top: `${TEAR_AT}%` }}>Breakpoint</span>
      </div>

      <div className={'tr-verdict' + (stage >= 3 ? ' is-on' : '')}>
        <p>
          <strong>Your form tears at Phone.</strong> Of the 81 people who got that far,
          49 stopped there. Everything underneath it is a field almost nobody ever sees.
        </p>
        <p className="tr-verdict-sub">
          On mobile it is worse. Breakpoint splits it by device, names the field, and does
          it from the sessions that never submitted, which is the only place that answer
          exists.
        </p>
      </div>
    </div>
  )
}
