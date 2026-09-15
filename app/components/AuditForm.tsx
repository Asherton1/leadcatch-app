'use client'

import { useState, useEffect, useRef } from 'react'
import './audit-form.css'

const PLATFORMS = ['Google Ads', 'Meta', 'TikTok', 'Microsoft Ads', 'X Ads', 'Not sure']
const SPENDS = ['Under $2k / mo', '$2k – $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Not sure']

export default function AuditForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [website, setWebsite] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [monthlySpend, setSpend] = useState('')
  const [concern, setConcern] = useState('')
  const [hp, setHp] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  const [stage, setStage] = useState(0)
  const nextRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = nextRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t = [
        setTimeout(() => setStage(1), 350),
        setTimeout(() => setStage(2), 900),
        setTimeout(() => setStage(3), 1450),
      ]
      return () => t.forEach(clearTimeout)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function toggle(p: string) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  async function submit() {
    setErr('')
    if (!name.trim() || !email.trim()) { setErr('Name and email are required.'); return }
    setSending(true)
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, business, website, platforms, monthlySpend, concern, hp }),
      })
      if (!res.ok) { setErr('Something went wrong. Email me directly at Asherton@userecapture.com.'); setSending(false); return }
      setDone(true)
    } catch {
      setErr('Something went wrong. Email me directly at Asherton@userecapture.com.')
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="af-wrap">
        <div className="af-done">
          <span className="af-done-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <h2>Got it.</h2>
          <p>I will reply personally within a day with exactly what to export and how to send it. Nothing automated, and nothing else will be sent to you.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="af-wrap">
      <div className="af-card">

        <div className="af-grid">
          <label className="af-field">
            <span>Your name</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" />
          </label>
          <label className="af-field">
            <span>Email</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@business.com" />
          </label>
          <label className="af-field">
            <span>Business</span>
            <input value={business} onChange={e => setBusiness(e.target.value)} placeholder="Business name" />
          </label>
          <label className="af-field">
            <span>Website</span>
            <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="yourbusiness.com" />
          </label>
        </div>

        <div className="af-block">
          <span className="af-label">What are you running?</span>
          <div className="af-chips">
            {PLATFORMS.map(p => (
              <button
                key={p}
                type="button"
                className={'af-chip' + (platforms.includes(p) ? ' is-on' : '')}
                onClick={() => toggle(p)}
              >{p}</button>
            ))}
          </div>
        </div>

        <div className="af-block">
          <span className="af-label">Roughly what are you spending a month?</span>
          <div className="af-chips">
            {SPENDS.map(v => (
              <button
                key={v}
                type="button"
                className={'af-chip' + (monthlySpend === v ? ' is-on' : '')}
                onClick={() => setSpend(v)}
              >{v}</button>
            ))}
          </div>
          <p className="af-hint">Only so I know what I am looking at. It changes nothing about the audit.</p>
        </div>

        <label className="af-field af-field-full">
          <span>Anything you are already unsure about?</span>
          <textarea
            rows={3}
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder="Optional. If something has been bothering you about the account, tell me and I will look at that first."
          />
        </label>

        <div className="af-hp" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} />
        </div>

        {err && <p className="af-err">{err}</p>}

        <button className="af-submit" type="button" onClick={submit} disabled={sending}>
          {sending ? 'Sending…' : 'Request the audit'}
          {!sending && <span>&rarr;</span>}
        </button>

        <div className="af-next" ref={nextRef}>
          <span className="af-next-label">What happens next</span>
          <div className="af-steps">
            {[
              ['I reply personally', 'Within a day, from my own address. Nothing automated.'],
              ['You send exports', 'I will tell you exactly which reports and how to pull them. Usually two exports and about ten minutes of your time.'],
              ['You get both documents', 'The teardown and the strategy, typically within a few days.'],
            ].map(([h, d], i) => (
              <div className={'af-step' + (stage > i ? ' af-done-step' : '')} key={h}>
                <span className="af-step-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="af-step-text">
                  <b>{h}</b>
                  <i>{d}</i>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="af-foot">No charge, no obligation, and I will not add you to anything. If the account turns out to be in good shape I will tell you that.</p>
      </div>
    </div>
  )
}
