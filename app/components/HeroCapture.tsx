'use client'

import { useEffect, useRef, useState } from 'react'
import './hero-capture.css'

const NAME = 'Sarah Mitchell'
const EMAIL = 'sarah.m@gmail.com'
const PHONE = '(214) 555-'

type Phase = 'idle' | 'name' | 'email' | 'phone' | 'held' | 'leaving' | 'captured' | 'deploying' | 'sent'

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

      // Third beat: how the recovery goes out
      at(clock + 2600, () => setPhase('deploying'))
      clock += 2600

      // Fourth beat: the message actually going out
      at(clock + 3400, () => setPhase('sent'))
      clock += 3400

      if (typeof window !== 'undefined' && window.innerWidth >= 900) {
        at(clock + 4600, run)
      }
    }

    run()
    return () => t.forEach(clearTimeout)
  }, [])

  const typing = phase === 'name' || phase === 'email' || phase === 'phone' || phase === 'held'
  const gone = phase === 'leaving' || phase === 'captured' || phase === 'deploying' || phase === 'sent'

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

        <div className={'hc-result' + (phase === 'captured' ? ' in' : '') + (phase === 'deploying' ? ' out' : '')}>
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
            Matched to your average case value
          </div>
        </div>

        <div className={'hc-deploy' + (phase === 'deploying' ? ' in' : '') + (phase === 'sent' ? ' out' : '')}>
          <div className="hc-result-head">
            <span className="hc-pip" />
            Recovery channels
          </div>
          <div className="hc-ch">
            <div className="hc-ch-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="hc-ch-body">
              <b>Email</b>
              <span>Sent from your domain, 60 second delay</span>
            </div>
            <span className="hc-toggle" />
          </div>
          <div className="hc-ch">
            <div className="hc-ch-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="hc-ch-body">
              <b>SMS</b>
              <span>Alert your intake team instantly</span>
            </div>
            <span className="hc-toggle" />
          </div>
          <div className="hc-ch">
            <div className="hc-ch-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="hc-ch-body">
              <b>AI callback</b>
              <span>Books straight to your calendar</span>
            </div>
            <span className="hc-toggle" />
          </div>
          <div className="hc-deploy-foot">Every channel is a switch. Turn on what fits your business.</div>
        </div>

        <div className={'hc-sent' + (phase === 'sent' ? ' in' : '')}>
          <div className="hc-lock">
            <div className="hc-lock-time">9:48</div>
            <div className="hc-lock-date">Tuesday, 12 November</div>

            <div className="hc-notif">
              <div className="hc-notif-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="hc-notif-body">
                <div className="hc-notif-top">
                  <span className="hc-notif-app">Mail</span>
                  <span className="hc-notif-when">now</span>
                </div>
                <div className="hc-notif-title">You started to reach out &mdash; we saved it</div>
                <div className="hc-notif-text">No need to start over. Just reply here and we&rsquo;ll pick it up from where you left off.</div>
              </div>
            </div>
          </div>

          <div className="hc-sent-foot">
            <span className="hc-sent-tick">&#10003;</span>
            Delivered 61 seconds after they left
          </div>
        </div>
      </div>
    </div>
  )
}
