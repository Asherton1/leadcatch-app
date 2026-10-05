'use client'

import { useEffect, useRef, useState } from 'react'
import './leak-flow.css'

const SCENES = [
  { key: 'call', heading: 'They tap your number', recorded: 'Nothing. No name, no number, no record.' },
  { key: 'book', heading: 'They open your booking page', recorded: 'Nothing. A page view, filed as a bounce.' },
  { key: 'form', heading: 'They start your form', recorded: 'Nothing, unless somebody is watching inside the form.' },
]

export default function LeakFlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [run, setRun] = useState(false)
  const [scene, setScene] = useState(0)
  const [beat, setBeat] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || run) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [run])

  useEffect(() => {
    if (!run) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>(r => timers.push(setTimeout(r, ms)))

    ;(async () => {
      for (let s = 0; s < SCENES.length; s++) {
        if (cancelled) return
        setScene(s)
        for (let b = 1; b <= 5; b++) {
          if (cancelled) return
          setBeat(b)
          await wait(b === 5 ? 1800 : 1100)
        }
      }
      if (!cancelled) { setScene(SCENES.length); setBeat(5) }
    })()

    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [run])

  const done = scene >= SCENES.length

  return (
    <div className="lk" ref={ref}>
      <div className="lk-stage">

        <div className={'lk-phone' + (run ? ' is-live' : '')}>
          <div className="lk-notch" />
          <div className="lk-screen">

            <div className={'lk-scene' + (scene === 0 ? ' is-on' : '')}>
              <div className="lk-site">
                <div className="lk-site-bar">
                  <span className="lk-site-dot" /><span className="lk-site-dot" /><span className="lk-site-dot" />
                </div>
                <div className="lk-site-body">
                  <div className="lk-skel lk-skel-lg" />
                  <div className="lk-skel" />
                  <div className="lk-skel lk-skel-sm" />
                  <div className={'lk-telbar' + (scene === 0 && beat >= 1 ? ' is-hit' : '')}>
                    (214) 555-0199
                  </div>
                  {scene === 0 && beat >= 1 && <span className="lk-tap" />}
                </div>
              </div>

              <div className={'lk-call' + (scene === 0 && beat >= 2 ? ' is-on' : '')}>
                <div className="lk-call-av">N</div>
                <div className="lk-call-num">(214) 555-0199</div>
                <div className="lk-call-state">
                  {beat === 2 && <span className="lk-ring">calling<i/><i/><i/></span>}
                  {beat === 3 && <span className="lk-ring">ringing<i/><i/><i/></span>}
                  {beat >= 4 && <span className="lk-missed">No answer</span>}
                </div>
                <div className="lk-call-keys">
                  <span /><span /><span /><span /><span /><span />
                </div>
                <div className={'lk-call-end' + (beat >= 4 ? ' is-hit' : '')} />
              </div>
            </div>

            <div className={'lk-scene' + (scene === 1 ? ' is-on' : '')}>
              <div className="lk-book">
                <div className="lk-book-head">Book a consultation</div>
                <div className="lk-book-grid">
                  {Array.from({ length: 21 }, (_, i) => {
                    const free = i === 19 || i === 20
                    return (
                      <span
                        key={i}
                        className={'lk-day' + (free ? ' is-free' : ' is-full')}
                        style={{ transitionDelay: `${i * 22}ms` }}
                      >
                        {i + 1}
                      </span>
                    )
                  })}
                </div>
                <div className={'lk-book-note' + (scene === 1 && beat >= 3 ? ' is-on' : '')}>
                  Next availability in 20 days
                </div>
                <div className={'lk-book-close' + (scene === 1 && beat >= 4 ? ' is-on' : '')}>
                  Tab closed
                </div>
              </div>
            </div>

            <div className={'lk-scene' + (scene >= 2 ? ' is-on' : '')}>
              <div className="lk-form">
                <div className="lk-form-head">Request a consultation</div>
                {[
                  { label: 'Name', value: 'Megan Whitfield', at: 1, stall: false },
                  { label: 'Email', value: 'm.whitfield84@gmail.com', at: 2, stall: false },
                  { label: 'Phone', value: '214', at: 3, stall: true },
                  { label: 'What are you looking for?', value: '', at: 9, stall: false },
                ].map(f => {
                  const active = scene >= 2 && beat === f.at
                  const filled = scene >= 2 && beat >= f.at && f.value
                  return (
                    <div className={'lk-field' + (active ? ' is-active' : '')} key={f.label}>
                      <span className="lk-field-label">{f.label}</span>
                      <span className="lk-field-input">
                        {filled ? <span className="lk-typed">{f.value}</span> : null}
                        {active ? <span className={'lk-caret' + (f.stall && beat >= 3 ? ' is-stalled' : '')} /> : null}
                      </span>
                    </div>
                  )
                })}
                <div className={'lk-form-gone' + (scene >= 2 && beat >= 4 ? ' is-on' : '')}>
                  Left without submitting
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="lk-caption">
          {SCENES.map((sc, i) => (
            <div className={'lk-cap' + (scene === i ? ' is-on' : scene > i ? ' is-past' : '')} key={sc.key}>
              <span className="lk-cap-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="lk-cap-text">
                <b>{sc.heading}</b>
                <span className="lk-cap-rec">
                  <span className="lk-cap-rec-label">What you recorded</span>
                  {sc.recorded}
                </span>
              </div>
            </div>
          ))}

          <div className={'lk-verdict' + (done ? ' is-on' : '')}>
            <p>
              <strong>Three attempts. One person. Nothing on file.</strong> Your analytics
              counted a bounce. Your CRM has no row. Nobody on your team knows this
              happened, so nobody follows up.
            </p>
            <p className="lk-verdict-sub">
              ReCapture records all three, and the form one comes with their name,
              email and phone attached.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
