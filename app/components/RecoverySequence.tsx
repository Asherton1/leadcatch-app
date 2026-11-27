'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './recovery-sequence.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * The recovery sequence.
 *
 * Everything here is scrubbed, not stepped. The previous version toggled an
 * `in` class per card, so the cards popped on and off and the scroll felt
 * like a slideshow. Now a single scroll position drives a continuous
 * playhead and every element is written from it each frame: copy crossfades
 * with directional travel, the rail fills, the cards rise and then recede
 * into depth behind the next one, and the numbers count.
 *
 * Nothing in the scroll path touches React state. The handler writes to
 * cached DOM refs, so scrolling never triggers a re-render.
 */

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

const LAST = STEPS.length - 1

// When each card arrives on the playhead, and how fast it gives way to the
// one after it. The form card lingers, because it is the thing the whole
// story is about.
const CARDS = [
  { entry: 0, fade: 0.26 },
  { entry: 2, fade: 0.36 },
  { entry: 3, fade: 0.36 },
  { entry: 4, fade: 0.36 },
]

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const ease = (x: number) => x * x * (3 - 2 * x)
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
const smoothstep = (a: number, b: number, x: number) => ease(clamp01((x - a) / (b - a)))

export default function RecoverySequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const copyRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const copyWrap = copyRef.current
    const stage = stageRef.current
    const rail = railRef.current
    if (!section || !pin || !copyWrap || !stage || !rail) return

    const blocks = Array.from(copyWrap.querySelectorAll<HTMLElement>('.rseq-block'))
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('.rseq-card'))
    const cardRows = cards.map(c => Array.from(c.querySelectorAll<HTMLElement>('[data-row]')))
    const dots = Array.from(rail.querySelectorAll<HTMLElement>('.rseq-dot'))
    const labels = Array.from(rail.querySelectorAll<HTMLElement>('.rseq-dot-label'))
    const fill = rail.querySelector<HTMLElement>('.rseq-rail-fill')
    const count = section.querySelector<HTMLElement>('.rseq-count b')
    const score = section.querySelector<HTMLElement>('[data-score]')
    const meter = section.querySelector<HTMLElement>('[data-meter]')
    const chipLive = section.querySelector<HTMLElement>('[data-chip="live"]')
    const chipGone = section.querySelector<HTMLElement>('[data-chip="gone"]')
    const formCard = cards[0]

    let lastCount = -1
    let lastScore = -1

    // s is the playhead, 0 .. LAST. Everything on screen is a function of it.
    const apply = (s: number) => {
      // Each statement holds, then clears completely before the next one
      // arrives. A linear crossfade left two headlines stacked at half
      // opacity through every transition, which was unreadable. Because
      // opacity reaches zero at |d| = 0.5, and neighbours are 1 apart, at
      // most one block is ever visible.
      for (let i = 0; i < blocks.length; i++) {
        const d = s - i
        const k = Math.min(1, Math.abs(d))
        const op = 1 - smoothstep(0.42, 0.5, k)
        const b = blocks[i]
        b.style.opacity = op.toFixed(4)
        b.style.transform = `translate3d(0, ${(-d * 40).toFixed(2)}px, 0) scale(${(1 - k * 0.015).toFixed(4)})`
        b.style.filter = op > 0.995 ? 'none' : `blur(${((1 - op) * 6).toFixed(2)}px)`
        b.style.visibility = op < 0.004 ? 'hidden' : 'visible'
        b.style.pointerEvents = op > 0.5 ? 'auto' : 'none'
      }

      const frac = clamp01(s / LAST)
      if (fill) fill.style.transform = `scaleX(${frac.toFixed(4)})`

      for (let i = 0; i < dots.length; i++) {
        const near = 1 - Math.min(1, Math.abs(s - i))
        const passed = clamp01(s - i + 1)
        dots[i].style.transform = `scale(${(1 + near * 1.05).toFixed(3)})`
        dots[i].style.opacity = String(0.3 + passed * 0.7)
        dots[i].style.setProperty('--glow', near.toFixed(3))
        if (labels[i]) labels[i].style.color = `rgba(255,255,255,${(0.32 + near * 0.68).toFixed(3)})`
      }

      const n = Math.min(LAST, Math.round(s))
      if (n !== lastCount && count) {
        count.textContent = String(n + 1).padStart(2, '0')
        lastCount = n
      }

      for (let i = 0; i < cards.length; i++) {
        const { entry, fade } = CARDS[i]
        const rel = s - entry
        const t = ease(clamp01((rel + 0.9) / 0.9))
        const back = Math.min(Math.max(0, rel), 2.4)

        const op = t * Math.max(0, 1 - back * fade)
        const ty = (1 - t) * 64 - back * 17
        const sc = 0.93 + t * 0.07 - back * 0.035
        const bl = back * 1.6

        const c = cards[i]
        c.style.opacity = op.toFixed(4)
        c.style.transform = `translate3d(-50%, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`
        c.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none'
        c.style.zIndex = String(10 + i)
        c.style.visibility = op < 0.004 ? 'hidden' : 'visible'

        // Rows arrive one after another inside their own card.
        const rows = cardRows[i]
        for (let j = 0; j < rows.length; j++) {
          const ro = clamp01((t - j * 0.1) / 0.45)
          rows[j].style.opacity = easeOut(ro).toFixed(3)
          rows[j].style.transform = `translate3d(0, ${((1 - easeOut(ro)) * 9).toFixed(2)}px, 0)`
        }
      }

      // The form going cold as they leave.
      const dead = ease(clamp01(s - 0.45))
      if (formCard) formCard.style.setProperty('--dead', dead.toFixed(3))
      if (chipLive) chipLive.style.opacity = (1 - dead).toFixed(3)
      if (chipGone) chipGone.style.opacity = dead.toFixed(3)

      // The score counting as ReCapture picks them up.
      const leadT = ease(clamp01((s - 2 + 0.9) / 0.9))
      const sv = Math.round(84 * leadT)
      if (sv !== lastScore && score) { score.textContent = String(sv); lastScore = sv }
      if (meter) meter.style.transform = `scaleX(${(leadT * 0.84).toFixed(4)})`
    }

    const clearInline = () => {
      ;[...blocks, ...cards, ...dots, ...labels].forEach(el => el.removeAttribute('style'))
      cardRows.flat().forEach(el => el.removeAttribute('style'))
      if (fill) fill.removeAttribute('style')
      if (meter) meter.removeAttribute('style')
      if (chipLive) chipLive.removeAttribute('style')
      if (chipGone) chipGone.removeAttribute('style')
      if (formCard) formCard.style.removeProperty('--dead')
    }

    const mm = gsap.matchMedia()

    // Pinned and scrubbed on desktop only. A tall pinned stage on a phone
    // fights the browser chrome and reads as broken scrolling, so there the
    // steps become a plain vertical narrative instead.
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      apply(0)
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${LAST * 115}%`,
        pin,
        pinSpacing: true,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: self => apply(self.progress * LAST),
      })
      return () => { st.kill(); clearInline() }
    })

    // No pin on a phone: a tall pinned stage fights the browser chrome
    // collapsing and reads as broken scrolling. Each step animates in as
    // you reach it instead, so it is still animated rather than static.
    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      clearInline()
      if (score) score.textContent = '84'
      const items = [...blocks, ...cards]
      const tweens = items.map(el =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      )
      return () => {
        tweens.forEach(tw => { tw.scrollTrigger?.kill(); tw.kill() })
        clearInline()
      }
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      clearInline()
      if (score) score.textContent = '84'
      return () => {}
    })

    return () => { mm.revert(); clearInline() }
  }, [])

  return (
    <section className="rseq" ref={sectionRef} aria-label="How ReCapture recovers a lead">
      <div className="rseq-pin" ref={pinRef}>
        <div className="rseq-inner">
          <div className="rseq-copy">
            <p className="rseq-eyebrow">The recovery sequence</p>
            <p className="rseq-count">
              <b>01</b> <span>/ {String(STEPS.length).padStart(2, '0')}</span>
            </p>

            <div className="rseq-blocks" ref={copyRef}>
              {STEPS.map(s => (
                <div className="rseq-block" key={s.kicker}>
                  <h2 className="rseq-title">{s.title}</h2>
                  <p className="rseq-body">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="rseq-rail" ref={railRef}>
              <span className="rseq-rail-track" aria-hidden="true">
                <i className="rseq-rail-fill" />
              </span>
              {STEPS.map((s, i) => (
                <span
                  key={s.kicker}
                  className="rseq-dot"
                  style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}
                >
                  <span className="rseq-dot-label">{s.kicker}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="rseq-stage" ref={stageRef} data-recapture="ignore">
            {/* 01 - 02: the form itself, going cold. */}
            <div className="rseq-card rseq-form">
              <div className="rseq-form-head">
                <span className="rseq-chip-stack">
                  <span className="rseq-chip" data-chip="live"><i />Visitor active</span>
                  <span className="rseq-chip gone" data-chip="gone"><i />Visitor left</span>
                </span>
                <span className="rseq-time">9:47 PM</span>
              </div>
              <div className="rseq-field" data-row><span className="rseq-field-label">Name</span><span className="rseq-field-value">Sarah Mitchell</span></div>
              <div className="rseq-field" data-row><span className="rseq-field-label">Email</span><span className="rseq-field-value">sarah.m@gmail.com</span></div>
              <div className="rseq-field" data-row><span className="rseq-field-label">Phone</span><span className="rseq-field-value">(214) 555-0188</span></div>
              <div className="rseq-field" data-row><span className="rseq-field-label">Service</span><span className="rseq-field-value empty">Not reached</span></div>
            </div>

            {/* 03: captured. */}
            <div className="rseq-card rseq-lead">
              <p className="rseq-card-title">Captured<span className="rseq-chip hot"><i />Hot</span></p>
              <div className="rseq-row" data-row>
                <span>Intent score</span>
                <span className="rseq-score" data-score>0</span>
              </div>
              <div className="rseq-meter" data-row><i data-meter /></div>
              <div className="rseq-row" data-row><span>Fields completed</span><strong>3 of 4</strong></div>
              <div className="rseq-row" data-row><span>Estimated value</span><strong>$4,200</strong></div>
            </div>

            {/* 04: recovery fires. */}
            <div className="rseq-card rseq-recovery">
              <p className="rseq-card-title">Recovery fired</p>
              <div className="rseq-row" data-row>
                <span className="rseq-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                </span>
                <span className="rseq-row-text">Email from <strong>your sender name</strong></span>
                <span className="rseq-pill">Sent</span>
              </div>
              <div className="rseq-row" data-row>
                <span className="rseq-row-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" /></svg>
                </span>
                <span className="rseq-row-text">Text to <strong>your intake team</strong></span>
                <span className="rseq-pill">Sent</span>
              </div>
            </div>

            {/* 05: the platforms learn. */}
            <div className="rseq-card rseq-signal">
              <p className="rseq-card-title">Conversion signal sent</p>
              <div className="rseq-row" data-row><span className="rseq-row-text">Meta Conversions API</span><span className="rseq-pill">Received</span></div>
              <div className="rseq-row" data-row><span className="rseq-row-text">Google Ads conversion</span><span className="rseq-pill">Received</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
