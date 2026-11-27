'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import './live-capture.css'

/**
 * ReCapture, run on the person reading the page.
 *
 * They start filling in a real form. The panel beside it shows what
 * ReCapture would be seeing in real time. The moment they move to leave,
 * switch tabs, or go quiet, it captures them and shows what a client
 * would have received.
 *
 * Nothing is sent anywhere. No network call, no storage, no cookie. The
 * state lives in this component and dies on reload, and the panel says so.
 */

type Status = 'idle' | 'watching' | 'captured'

const IDLE_MS = 7000

export default function LiveCaptureDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [seconds, setSeconds] = useState(0)

  const startedAt = useRef<number | null>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusRef = useRef<Status>('idle')
  statusRef.current = status

  const filled = [name, email, phone].filter(v => v.trim().length > 1).length
  const emailLooksReal = /\S+@\S+\.\S+/.test(email)

  // Same shape as the real scorer: how far they got, weighted toward the
  // identifiers that let you actually reach someone.
  const score = Math.min(
    97,
    (name.trim().length > 1 ? 22 : 0) +
    (emailLooksReal ? 34 : email.trim().length > 2 ? 12 : 0) +
    (phone.replace(/\D/g, '').length >= 10 ? 28 : phone.trim().length > 2 ? 10 : 0) +
    Math.min(13, Math.floor(seconds / 3))
  )

  const band = score >= 70 ? 'Hot' : score >= 40 ? 'Warm' : 'Cold'

  const capture = useCallback(() => {
    if (statusRef.current !== 'watching') return
    setStatus('captured')
  }, [])

  const touch = useCallback(() => {
    if (statusRef.current === 'captured') return
    if (startedAt.current === null) startedAt.current = Date.now()
    setStatus('watching')
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(capture, IDLE_MS)
  }, [capture])

  // Clock, so time on form is real rather than decorative.
  useEffect(() => {
    if (status !== 'watching') return
    const id = setInterval(() => {
      if (startedAt.current) setSeconds(Math.floor((Date.now() - startedAt.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [status])

  // The triggers the real tracker uses.
  useEffect(() => {
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 2) capture()
    }
    const onVisibility = () => { if (document.hidden) capture() }

    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('visibilitychange', onVisibility)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [capture])

  const reset = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    startedAt.current = null
    setName(''); setEmail(''); setPhone('')
    setSeconds(0)
    setStatus('idle')
  }

  // Read after mount, never during render. Reading navigator while rendering
  // makes the server emit "Desktop" and a phone emit "Mobile", which fails
  // hydration and makes React throw away and rebuild this whole subtree.
  const [device, setDevice] = useState('Desktop')
  useEffect(() => {
    setDevice(/Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop')
  }, [])

  const firstName = name.trim().split(' ')[0] || 'you'

  return (
    <div className="lcd-grid">
      {/* A real form. Deliberately marked so our own tracker ignores it. */}
      <div className="lcd-form-card" data-recapture="ignore">
        <p className="lcd-form-title">Request a consultation</p>
        <p className="lcd-form-note">
          A normal enquiry form. Fill in a line or two, then try to leave the page.
        </p>

        <div className="lcd-field">
          <label className="lcd-label" htmlFor="lcd-name">Full name</label>
          <input
            id="lcd-name" className="lcd-input" type="text" autoComplete="off"
            placeholder="Your name" value={name}
            disabled={status === 'captured'}
            onChange={e => { setName(e.target.value); touch() }}
          />
        </div>

        <div className="lcd-field">
          <label className="lcd-label" htmlFor="lcd-email">Email address</label>
          <input
            id="lcd-email" className="lcd-input" type="email" autoComplete="off"
            placeholder="you@company.com" value={email}
            disabled={status === 'captured'}
            onChange={e => { setEmail(e.target.value); touch() }}
          />
        </div>

        <div className="lcd-field">
          <label className="lcd-label" htmlFor="lcd-phone">Phone</label>
          <input
            id="lcd-phone" className="lcd-input" type="tel" autoComplete="off"
            placeholder="(214) 555-0100" value={phone}
            disabled={status === 'captured'}
            onChange={e => { setPhone(e.target.value); touch() }}
          />
        </div>

        <button className="lcd-submit" type="button" disabled>
          Submit (disabled on purpose)
        </button>

        {status === 'watching' && (
          <p className="lcd-hint">
            <i />
            Now move your cursor to the top of the window as though you were
            closing the tab, or just stop typing.
          </p>
        )}
      </div>

      {/* What ReCapture sees. */}
      <div className={'lcd-panel' + (status === 'captured' ? ' captured' : '')}>
        <span className="lcd-stamp">Captured</span>

        <div className="lcd-panel-head">
          <span className={'lcd-status' + (status === 'watching' ? ' watching' : status === 'captured' ? ' caught' : '')}>
            <i />
            {status === 'idle' ? 'Waiting' : status === 'watching' ? 'Visitor active' : 'Visitor left'}
          </span>
          <span className="lcd-timer">
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
          </span>
        </div>

        <div className="lcd-metric">
          <span>Name</span>
          <b className={name.trim() ? '' : 'pending'}>{name.trim() || 'not yet typed'}</b>
        </div>
        <div className="lcd-metric">
          <span>Email</span>
          <b className={email.trim() ? '' : 'pending'}>{email.trim() || 'not yet typed'}</b>
        </div>
        <div className="lcd-metric">
          <span>Phone</span>
          <b className={phone.trim() ? '' : 'pending'}>{phone.trim() || 'not yet typed'}</b>
        </div>
        <div className="lcd-metric">
          <span>Fields completed</span>
          <b>{filled} of 3</b>
        </div>
        <div className="lcd-metric">
          <span>Device</span>
          <b>{device}</b>
        </div>

        <div className="lcd-score-wrap">
          <div className="lcd-score-top">
            <span className="lcd-score-label">Intent score &middot; {band}</span>
            <span className="lcd-score">{score}</span>
          </div>
          <div className="lcd-bar"><i style={{ width: score + '%' }} /></div>
          <p className="lcd-score-note">
            How far someone got, weighted toward the details that let you actually
            reach them. A half-finished enquiry from a serious buyer scores higher
            than a complete one from a browser.
          </p>
        </div>

        <div className="lcd-actions">
          <div className="lcd-action">
            <span className="tick" />
            Recovery email queued to {emailLooksReal ? email.trim() : 'their address'}, from your sender name
          </div>
          <div className="lcd-action">
            <span className="tick" />
            Text alert to your intake team naming {firstName}
          </div>
          <div className="lcd-action">
            <span className="tick" />
            Conversion event sent to Meta and Google, hashed
          </div>
        </div>

        <p className="lcd-privacy">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6l-8-4Z" />
          </svg>
          Nothing above left your browser. No request was made, nothing was stored,
          and it all disappears when you reload. On your own site this is exactly
          the record your team would receive.
        </p>

        {status === 'captured' && (
          <button className="lcd-reset" type="button" onClick={reset}>
            Run it again
          </button>
        )}
      </div>
    </div>
  )
}
