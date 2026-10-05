'use client'

import { useEffect, useRef, useState } from 'react'
import './leak-flow.css'

type Exit = { at: number; label: string; sub: string; lose: number }

const EXITS: Exit[] = [
  { at: 22, label: 'Tapped your number, nobody answered', sub: 'No name, no record, nothing in your CRM', lose: 26 },
  { at: 44, label: 'Opened booking, saw a three week wait', sub: 'Closed the tab and went looking elsewhere', lose: 19 },
  { at: 66, label: 'Started your form and left', sub: 'This is the only one anyone used to catch', lose: 32 },
]

export default function LeakFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [run, setRun] = useState(false)
  const [stage, setStage] = useState(-1)

  useEffect(() => {
    const el = ref.current
    if (!el || run) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); io.disconnect() }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [run])

  useEffect(() => {
    if (!run) return
    const t = EXITS.map((_, i) => setTimeout(() => setStage(i), 1400 + i * 1500))
    const last = setTimeout(() => setStage(EXITS.length), 1400 + EXITS.length * 1500)
    return () => { t.forEach(clearTimeout); clearTimeout(last) }
  }, [run])

  const lost = EXITS.slice(0, Math.max(stage + 1, 0)).reduce((a, e) => a + e.lose, 0)
  const left = 100 - lost

  // 100 dots, each assigned the exit it peels off at
  const dots = Array.from({ length: 100 }, (_, i) => {
    let acc = 0
    for (let e = 0; e < EXITS.length; e++) {
      acc += EXITS[e].lose
      if (i < acc) return e
    }
    return -1 // made it all the way through
  })

  return (
    <div className="lf" ref={ref}>
      <div className="lf-head">
        <span className="lf-count">{run ? left : 100}</span>
        <span className="lf-count-label">
          of 100 people still trying to reach you
        </span>
      </div>

      <div className="lf-track">
        {EXITS.map((e, i) => (
          <div
            className={'lf-exit' + (stage >= i ? ' is-on' : '')}
            style={{ top: `${e.at}%` }}
            key={e.label}
          >
            <span className="lf-exit-rule" />
            <span className="lf-exit-text">
              <b>{e.label}</b>
              <span>{e.sub}</span>
            </span>
            <span className="lf-exit-n">&minus;{e.lose}</span>
          </div>
        ))}

        <div className="lf-dots">
          {dots.map((exit, i) => {
            const gone = exit >= 0 && stage >= exit
            const top = gone ? EXITS[exit].at : 94
            return (
              <span
                className={'lf-dot' + (gone ? ' is-gone' : '') + (exit === -1 ? ' is-through' : '')}
                key={i}
                style={{
                  left: `${6 + (i % 20) * 4.4}%`,
                  transitionDelay: `${(i % 20) * 18}ms`,
                  top: run ? `${top}%` : '-4%',
                }}
              />
            )
          })}
        </div>
      </div>

      <div className={'lf-foot' + (stage >= EXITS.length ? ' is-on' : '')}>
        <p>
          <strong>{left} of them submitted something.</strong> The other {lost} wanted
          to talk to you and left no trace at all. Your analytics counted them as
          bounces. Your CRM never knew they existed.
        </p>
        <p className="lf-foot-sub">
          ReCapture records every one of these exits, so you can see which one is
          costing you the most.
        </p>
      </div>
    </div>
  )
}
