'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

const SCRIPT = [
  { label: 'First name', value: 'Megan', speed: 90 },
  { label: 'Last name',  value: 'Whitfield', speed: 85 },
  { label: 'Email',      value: 'm.whitfield84@gmail.com', speed: 55 },
  { label: 'Phone',      value: '214', speed: 320, stall: true },
  { label: 'What are you looking for?', value: '', speed: 0 },
  { label: 'Tell us more', value: '', speed: 0 },
]

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [started, setStarted] = useState(false)
  const [field, setField] = useState(0)
  const [typed, setTyped] = useState<string[]>(SCRIPT.map(() => ''))
  const [stalled, setStalled] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>(r => timeouts.push(setTimeout(r, ms)))

    ;(async () => {
      for (let f = 0; f < SCRIPT.length; f++) {
        const s = SCRIPT[f]
        if (!s.value) break
        if (cancelled) return
        setField(f)
        await wait(420)
        for (let c = 0; c < s.value.length; c++) {
          if (cancelled) return
          setTyped(prev => {
            const next = [...prev]
            next[f] = s.value.slice(0, c + 1)
            return next
          })
          await wait(s.speed + Math.random() * 60)
        }
        if (s.stall) {
          if (cancelled) return
          setStalled(true)
          await wait(3200)
          if (cancelled) return
          setGone(true)
          return
        }
        await wait(260)
      }
    })()

    return () => { cancelled = true; timeouts.forEach(clearTimeout) }
  }, [started])

  return (
    <div className="bs" ref={ref}>
      <div className={'bs-form' + (gone ? ' is-gone' : '')}>
        <div className="bs-form-head">
          <span className="bs-dot" /><span className="bs-dot" /><span className="bs-dot" />
          <span className="bs-form-title">Consultation request</span>
        </div>

        {SCRIPT.map((s, i) => {
          const active = field === i && !gone
          const filled = typed[i].length > 0
          return (
            <div
              className={'bs-field' + (active ? ' is-active' : '') + (filled ? ' is-filled' : '')}
              key={s.label}
            >
              <span className="bs-label">{s.label}</span>
              <span className="bs-input">
                <span className="bs-typed">{typed[i]}</span>
                {active ? <span className={'bs-caret' + (stalled ? ' is-stalled' : '')} /> : null}
              </span>
            </div>
          )
        })}

        <div className="bs-form-foot">
          <span className="bs-submit">Request consultation</span>
        </div>
      </div>

      <div className={'bs-verdict' + (gone ? ' is-on' : '')}>
        <p>
          She never pressed submit, so nothing recorded her. No row in the CRM, no
          conversion in Meta or Google, nobody to follow up.
        </p>
        <p className="bs-verdict-line">
          <strong>Phone is where this form loses people.</strong> Not a guess. The field
          itself, named, from the sessions that never finished.
        </p>
      </div>
    </div>
  )
}
