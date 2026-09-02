'use client'

import { useEffect, useRef, useState } from 'react'
import './ledger-feed.css'

type Status = 'OPEN' | 'CONTACTED' | 'CONVERTED'

const LEADS: { name: string; email: string; value: string; time: string; status: Status }[] = [
  { name: 'Marcus Alvarez', email: 'm.alvarez@gmail.com', value: '$4,200', time: '11:42 PM', status: 'CONVERTED' },
  { name: 'James Nguyen',   email: 'james.n@gmail.com',   value: '$1,850', time: '10:08 PM', status: 'CONTACTED' },
  { name: 'Kelsey Thomas',  email: 'kelsey.t@gmail.com',  value: '$2,400', time: '9:21 PM',  status: 'OPEN' },
  { name: 'David Lin',      email: 'david.l@gmail.com',   value: '$980',   time: '8:04 PM',  status: 'OPEN' },
]

const STATS = [
  { to: 47,    prefix: '',  suffix: '',  label: 'Abandoned leads',   tone: 'plain' },
  { to: 51700, prefix: '$', suffix: '',  label: 'Revenue at risk',   tone: 'risk'  },
  { to: 12,    prefix: '',  suffix: '',  label: 'Recovered',         tone: 'plain' },
  { to: 13200, prefix: '$', suffix: '',  label: 'Recovered revenue', tone: 'good'  },
]

function Count({ to, prefix, suffix, run }: { to: number; prefix: string; suffix: string; run: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let f = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1)
      setV(Math.round(to * (1 - Math.pow(1 - t, 4))))
      if (t < 1) f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [run, to])
  return <>{prefix}{v.toLocaleString()}{suffix}</>
}

export default function LedgerFeed() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [landed, setLanded] = useState<number>(-1)

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

  useEffect(() => {
    if (!on) return
    const timers = LEADS.map((_, i) =>
      setTimeout(() => setLanded(i), 900 + i * 380)
    )
    return () => timers.forEach(clearTimeout)
  }, [on])

  return (
    <div className={'lf' + (on ? ' lf-on' : '')} ref={ref}>
      <div className="lf-scan" aria-hidden="true" />

      <div className="lf-stats">
        {STATS.map((s, i) => (
          <div className={'lf-stat lf-stat-' + s.tone} key={s.label} style={{ transitionDelay: i * 90 + 'ms' }}>
            <div className="lf-stat-num">
              <Count to={s.to} prefix={s.prefix} suffix={s.suffix} run={on} />
            </div>
            <div className="lf-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="lf-feed">
        <div className="lf-feed-head">
          <span className="lf-pip" aria-hidden="true" />
          Captured tonight
          <span className="lf-feed-count">{Math.max(0, landed + 1)} of 4 shown</span>
        </div>

        {LEADS.map((l, i) => (
          <div
            className={
              'lf-row' +
              (landed >= i ? ' lf-in' : '') +
              (landed === i ? ' lf-flash' : '')
            }
            key={l.email}
          >
            <span className="lf-time">{l.time}</span>
            <span className="lf-name">{l.name}</span>
            <span className="lf-email">{l.email}</span>
            <span className="lf-value">{l.value}</span>
            <span className={'lf-status lf-status-' + l.status.toLowerCase()}>{l.status}</span>
          </div>
        ))}

        <div className="lf-feed-foot">
          Every one of these started your form and never pressed submit.
        </div>
      </div>
    </div>
  )
}
