'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './HeroFused.css'

export default function HeroFused() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.hf-line', { y: '0%' })
        gsap.set('.hf-strike', { scaleX: 1 })
        gsap.set('.hf-eyebrow, .hf-sub, .hf-cta', { opacity: 1, y: 0 })
        return
      }
      gsap.set('.hf-line', { y: '112%' })
      gsap.set('.hf-strike', { scaleX: 0 })
      gsap.set('.hf-eyebrow, .hf-sub, .hf-cta', { opacity: 0, y: 14 })
      const tl = gsap.timeline()
      tl.to('.hf-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.2)
        .to('.hf-l1', { y: '0%', duration: 0.95, ease: 'power4.out' }, 0.3)
        .to('.hf-l2', { y: '0%', duration: 0.95, ease: 'power4.out' }, 0.42)
        .to('.hf-strike', { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 1.2)
        .to('.hf-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.2)
        .to('.hf-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.4)
    }, root)
    return () => gctx.revert()
  }, [])

  return (
    <section className="hf-hero" ref={rootRef}>
      <video className="hf-bg" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
        <source src="/dallas-hero.mp4" type="video/mp4" />
      </video>
      <div className="hf-scrim" aria-hidden="true" />
      <div className="hf-inner">
        <p className="hf-eyebrow">Born &amp; Built in Dallas, Texas</p>
        <h1 className="hf-h1">
          <span className="hf-mask"><span className="hf-line hf-l1">Your best leads</span></span>
          <span className="hf-mask"><span className="hf-line hf-l2">never hit <span className="hf-accent">submit.<span className="hf-strike" /></span></span></span>
        </h1>
        <p className="hf-sub">High-value prospects start typing, then vanish. ReCapture captures them the moment they begin — so the lead is never truly gone.</p>
        <a className="hf-cta" href="/start-trial">
          Start your 7-day free trial
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </section>
  )
}
