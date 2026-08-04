'use client'

import { useEffect, useRef, useState } from 'react'
import './hero-capture.css'

const NAME = 'Sarah Mitchell'
const EMAIL = 'sarah.m@gmail.com'
const PHONE = '(214) 555-'

type Phase = 'idle' | 'name' | 'email' | 'phone' | 'held' | 'leaving' | 'captured'

export default function HeroCapture() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [n, setN] = useState('')
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setN(NAME); setE(EMAIL); setP(PHONE); setPhase('captured')
      return
    }

    const t = timers.current
    const at = (ms: number, fn: () => void) => t.push(setTimeout(fn, ms))

    const run = () => {
      t.forEach(clearTimeout)
      t.length = 0
      setPhase('idle'); setN(''); setE(''); setP('')

      let clock = 600
      at(clock, () => setPhase('name'))
      for (let i = 0; i <= NAME.length; i++) at(clock + i * 62, () => setN(NAME.slice(0, i)))
      clock += NAME.length * 62 + 340

      at(clock, () => setPhase('email'))
      for (let i = 0; i <= EMAIL.length; i++) at(clock + i * 52, () => setE(EMAIL.slice(0, i)))
      clock += EMAIL.length * 52 + 340

      at(clock, () => setPhase('phone'))
      for (let i = 0; i <= PHONE.length; i++) at(clock + i * 70, () => setP(PHONE.slice(0, i)))
      clock += PHONE.length * 70

      // The interruption. Nothing happens. This is the whole point.
      at(clock + 200, () => setPhase('held'))
      clock += 2200

      at(clock, () => setPhase('leaving'))
      at(clock + 620, () => setPhase('captured'))
      clock += 620

      if (typeof window !== 'undefined' && window.innerWidth >= 900) {
        at(clock + 5200, run)
      }
    }

    run()
    return () => t.forEach(clearTimeout)
  }, [])

  const typing = phase === 'name' || phase === 'email' || phase === 'phone' || phase === 'held'
  const gone = phase === 'leaving' || phase === 'captured'

  const Field = ({
    label, value, active, cursor,
  }: { label: string; value: string; active: boolean; cursor: boolean }) => (
    <div className={'hc-field' + (active ? ' on' : '')}>
      <span className="hc-label">{label}</span>
      <span className="hc-value">
        {value}
        {cursor && <i className="hc-caret" />}
      </span>
      <span className="hc-rule" />
    </div>
  )

  return (
    <div className="hc" data-recapture="ignore">
      <div className="hc-frame">
        <div className="hc-meta">
          <span className={'hc-status' + (gone ? ' left' : '')}>
            {gone ? 'Visitor left' : 'Visitor active'}
          </span>
          <span className="hc-time">9:47 PM</span>
        </div>

        <div className={'hc-stage' + (gone ? ' gone' : '')}>
          <div className="hc-form-title">Book a Consultation</div>
          <Field label="Full Name" value={n} active={typing} cursor={phase === 'name'} />
          <Field label="Email" value={e} active={phase !== 'idle' && phase !== 'name'} cursor={phase === 'email'} />
          <Field label="Phone" value={p} active={phase === 'phone' || phase === 'held'} cursor={phase === 'phone' || phase === 'held'} />
          <div className="hc-submit">Submit</div>
        </div>

        <div className={'hc-scan' + (phase === 'leaving' ? ' run' : '')} />

        <div className={'hc-result' + (phase === 'captured' ? ' in' : '')}>
          <div className="hc-result-head">
            <span className="hc-pip" />
            Captured
          </div>
          <div className="hc-result-rows">
            <div className="hc-r"><span>Name</span><b>{NAME}</b></div>
            <div className="hc-r"><span>Email</span><b>{EMAIL}</b></div>
            <div className="hc-r"><span>Phone</span><b>{PHONE}</b></div>
            <div className="hc-r"><span>Intent</span><b className="hot">Hot &middot; 84</b></div>
          </div>
          <div className="hc-result-foot">
            Recovery email queued &middot; 60s
          </div>
        </div>
      </div>
    </div>
  )
}
