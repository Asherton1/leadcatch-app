'use client'

import { useEffect, useRef, useState } from 'react'
import './leak-rows.css'

const ROWS = [
  {
    id: 'behavior',
    num: '01',
    eyebrow: 'The behavior',
    title: 'They start. Then vanish.',
    text: 'A prospect finds your site, opens your form, types their name and email — then their phone buzzes. They switch tabs. They never come back. And you never knew they existed.',
    stat: '70%',
    statLabel: 'never return',
  },
  {
    id: 'pattern',
    num: '02',
    eyebrow: 'The pattern',
    title: 'Every extra field costs you.',
    text: 'Five fields might seem reasonable, but most visitors abandon after three. Every additional field is a silent conversion killer — and until now you had no way to see which one broke them.',
    stat: '3',
    statLabel: 'fields to the breaking point',
  },
  {
    id: 'cost',
    num: '03',
    eyebrow: 'The cost',
    title: 'Ghost leads bleed you dry.',
    text: 'If 100 visitors start your form and 60 do not finish, that is 15 to 20 lost bookings a month. At a $1,500 average service, that is $22,000 to $30,000 walking out the door. Every month.',
    stat: '$30K',
    statLabel: 'lost per month',
  },
]

export default function LeakRows() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [open, setOpen] = useState<string | null>('behavior')

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  return (
    <div className={'leak' + (on ? ' leak-on' : '')} ref={ref}>
      {ROWS.map((r, i) => {
        const isOpen = open === r.id
        return (
          <div
            className={'leak-row' + (isOpen ? ' leak-open' : '')}
            key={r.id}
            style={{ transitionDelay: i * 120 + 'ms' }}
          >
            <span className="leak-num" aria-hidden="true">{r.num}</span>
            <span className="leak-sweep" aria-hidden="true" />

            <button
              className="leak-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : r.id)}
            >
              <span className="leak-head">
                <span className="leak-eyebrow">{r.eyebrow}</span>
                <span className="leak-title">{r.title}</span>
              </span>
              <span className="leak-mark" aria-hidden="true">
                <span className="leak-mark-h" />
                <span className="leak-mark-v" />
              </span>
            </button>

            <div className="leak-drawer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="leak-drawer-inner">
                <div className="leak-body">
                  <p className="leak-text">{r.text}</p>
                  <div className="leak-stat">
                    <span className="leak-stat-num">{r.stat}</span>
                    <span className="leak-stat-label">{r.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
