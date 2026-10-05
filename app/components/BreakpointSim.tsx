'use client'

import { useEffect, useRef, useState } from 'react'
import './breakpoint-sim.css'

export default function BreakpointSim() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [b, setB] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const beats = [700, 1500, 2400, 3400, 4400, 5400, 6500]
      beats.forEach((ms, i) => timers.push(setTimeout(() => setB(i + 1), ms)))
    }, { threshold: 0.35 })
    io.observe(el)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const Form = ({ mobile }: { mobile: boolean }) => {
    const phone = mobile ? (b >= 3 ? '214 555 0199' : '') : (b >= 3 ? '(214) 555-0199' : '')
    const phoneBad = mobile && b >= 4
    const sent = !mobile && b >= 5
    const gone = mobile && b >= 7

    return (
      <div className="bk-form">
        <div className="bk-form-head">Request a consultation</div>
        <div className={'bk-f' + (b === 1 ? ' is-active' : '')}>
          <span className="bk-f-label">Name</span>
          <span className="bk-f-in">{b >= 1 ? 'Megan Whitfield' : ''}</span>
        </div>
        <div className={'bk-f' + (b === 2 ? ' is-active' : '')}>
          <span className="bk-f-label">Email</span>
          <span className="bk-f-in">{b >= 2 ? 'm.whitfield84@gmail.com' : ''}</span>
        </div>
        <div className={'bk-f' + (b === 3 ? ' is-active' : '') + (phoneBad ? ' is-bad' : '')}>
          <span className="bk-f-label">Phone</span>
          <span className="bk-f-in">{phone}</span>
          {phoneBad && (
            <span className="bk-err">{b >= 6 ? 'Still not accepted' : 'Enter a valid phone number'}</span>
          )}
        </div>
        <div className={'bk-submit' + (sent ? ' is-sent' : '')}>{sent ? 'Sent' : 'Submit'}</div>
        {gone && <div className="bk-gone">Left without submitting</div>}
      </div>
    )
  }

  return (
    <div className="bk" ref={ref}>
      <div className="bk-pair">
        <div className="bk-device bk-desktop">
          <div className="bk-chrome">
            <span className="bk-cd" /><span className="bk-cd" /><span className="bk-cd" />
            <span className="bk-dev-tag">Desktop</span>
          </div>
          <div className="bk-screen"><Form mobile={false} /></div>
          <div className={'bk-stamp is-good' + (b >= 5 ? ' is-on' : '')}>Submitted</div>
        </div>

        <div className="bk-device bk-mobile">
          <div className="bk-notch" />
          <div className="bk-screen bk-screen-m">
            <span className="bk-dev-tag bk-dev-tag-m">Mobile</span>
            <Form mobile={true} />
          </div>
          <div className={'bk-stamp is-bad' + (b >= 7 ? ' is-on' : '')}>Lost</div>
        </div>
      </div>

      <div className={'bk-verdict' + (b >= 7 ? ' is-on' : '')}>
        <p>
          <strong>Same form. Same person. One field.</strong> The mobile keyboard puts a
          space in the number and the validation rejects it. She tries twice and leaves.
          On your laptop that field has never failed once, which is why nobody has ever
          found it.
        </p>
        <p className="bk-verdict-sub">
          Breakpoint names the field and splits it by device, from the sessions that never
          submitted. That is the only place this answer exists.
        </p>
      </div>
    </div>
  )
}
