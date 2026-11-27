'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './recovery-sequence.css'

gsap.registerPlugin(ScrollTrigger)

type Step = { kicker: string; title: string; body: string }

const STEPS: Step[] = [
  {
    kicker: 'They arrive',
    title: 'Someone starts filling in your form.',
    body: 'They came from an ad you paid for. They typed their name, then their email, then their phone number. Nothing has been submitted, so as far as every tool you own is concerned, this person does not exist.',
  },
  {
    kicker: 'They vanish',
    title: 'Then something pulls them away.',
    body: 'A call, a kid, a meeting. The tab closes. Your CRM stays empty, your pixel never fires, and the money you spent getting them here is gone with them.',
  },
  {
    kicker: 'We catch it',
    title: 'ReCapture already has them.',
    body: 'Contact fields only, captured the moment they were typed, scored by how far they actually got. A half-finished inquiry from a serious buyer outranks a complete one from a tyre-kicker.',
  },
  {
    kicker: 'Recovery fires',
    title: 'They hear from you, as you.',
    body: 'A branded email from your own sender name on whatever delay you set, and a text to your intake team the second it happens. Your clock starts before your competitor even knows the person existed.',
  },
  {
    kicker: 'The platforms learn',
    title: 'Meta and Google find out they were real.',
    body: 'The recovered inquiry goes back as a server-side conversion, hashed and deduplicated against your existing pixel. Your campaigns stop optimising from a fraction of your demand.',
  },
]

export default function RecoverySequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const mm = gsap.matchMedia()

    // Pinned and scrubbed on desktop only. On a phone a tall pinned
    // stage fights the browser chrome and reads as broken scrolling,
    // so there the steps simply stack and reveal as you pass them.
    mm.add('(min-width: 901px)', () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${(STEPS.length - 1) * 90}%`,
        pin: pin,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: self => {
          const i = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length * 0.999)
          )
          setStep(prev => (prev === i ? prev : i))
        },
      })
      return () => st.kill()
    })

    mm.add('(max-width: 900px)', () => {
      // Advance on simple viewport entry instead of pinning.
      const triggers = STEPS.map((_, i) =>
        ScrollTrigger.create({
          trigger: section,
          start: () => `top+=${i * 55}% center`,
          end: () => `top+=${(i + 1) * 55}% center`,
          onToggle: self => { if (self.isActive) setStep(i) },
        })
      )
      return () => triggers.forEach(t => t.kill())
    })

    return () => mm.revert()
  }, [])

  const s = STEPS[step]

  return (
    <section className="rseq" ref={sectionRef} aria-label="How ReCapture recovers a lead">
      <div className="rseq-pin" ref={pinRef}>
        <div className="rseq-inner">
          <div className="rseq-copy">
            <p className="rseq-eyebrow">The recovery sequence</p>
            <p className="rseq-count">
              <b>{String(step + 1).padStart(2, '0')}</b> / {String(STEPS.length).padStart(2, '0')}
            </p>
            <h2 className="rseq-title">{s.title}</h2>
            <p className="rseq-body">{s.body}</p>

            <div className="rseq-rail">
              {STEPS.map((item, i) => (
                <button
                  key={item.kicker}
                  type="button"
                  className={
                    'rseq-rail-item' +
                    (i === step ? ' active' : '') +
                    (i < step ? ' done' : '')
                  }
                  onClick={() => setStep(i)}
                >
                  {item.kicker}
                </button>
              ))}
            </div>
          </div>

          <div className="rseq-stage" data-recapture="ignore">
            {/* The form. Present throughout, changing state. */}
            <div className={'rseq-card rseq-form in' + (step >= 1 ? ' dim' : '')}>
              <div className="rseq-form-head">
                <span className={'rseq-chip' + (step >= 1 ? ' gone' : '')}>
                  <i />{step >= 1 ? 'Visitor left' : 'Visitor active'}
                </span>
                <span className="rseq-time">9:47 PM</span>
              </div>

              <div className="rseq-field">
                <span className="rseq-field-label">Name</span>
                <span className="rseq-field-value shown">
                  Sarah Mitchell{step === 0 && <span className="rseq-caret" />}
                </span>
              </div>
              <div className="rseq-field">
                <span className="rseq-field-label">Email</span>
                <span className="rseq-field-value shown">sarah.m@gmail.com</span>
              </div>
              <div className="rseq-field">
                <span className="rseq-field-label">Phone</span>
                <span className="rseq-field-value shown">(214) 555-0188</span>
              </div>
              <div className="rseq-field">
                <span className="rseq-field-label">Service</span>
                <span className="rseq-field-value shown empty">Not reached</span>
              </div>
            </div>

            {/* Captured lead. */}
            <div className={'rseq-card rseq-lead' + (step >= 2 ? ' in' : '')}>
              <p className="rseq-card-title">
                Captured
                <span className="rseq-chip hot"><i />Hot</span>
              </p>
              <div className="rseq-row">
                <span>Intent score</span>
                <span className="rseq-score">84</span>
              </div>
              <div className="rseq-meter"><i /></div>
              <div className="rseq-row">
                <span>Fields completed</span>
                <strong>3 of 4</strong>
              </div>
              <div className="rseq-row">
                <span>Estimated value</span>
                <strong>$4,200</strong>
              </div>
            </div>

            {/* Recovery actions. */}
            <div className={'rseq-card rseq-recovery' + (step >= 3 ? ' in' : '')}>
              <p className="rseq-card-title">Recovery fired</p>
              <div className="rseq-row">
                <span className="rseq-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                </span>
                <span style={{ flex: 1 }}>Email from <strong>your sender name</strong></span>
                <span className="rseq-pill">Sent</span>
              </div>
              <div className="rseq-row">
                <span className="rseq-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" /></svg>
                </span>
                <span style={{ flex: 1 }}>Text to <strong>your intake team</strong></span>
                <span className="rseq-pill">Sent</span>
              </div>
            </div>

            {/* Signal out. */}
            <div className={'rseq-card rseq-signal' + (step >= 4 ? ' in' : '')}>
              <p className="rseq-card-title">Conversion signal sent</p>
              <div className="rseq-row">
                <span style={{ flex: 1 }}>Meta Conversions API</span>
                <span className="rseq-pill">Received</span>
              </div>
              <div className="rseq-row">
                <span style={{ flex: 1 }}>Google Ads conversion</span>
                <span className="rseq-pill">Received</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
