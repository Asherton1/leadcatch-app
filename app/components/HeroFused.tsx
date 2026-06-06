'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './HeroFused.css'

export default function HeroFused() {
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0

    const size = () => {
      canvas.width = root.clientWidth * dpr
      canvas.height = root.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    window.addEventListener('resize', size)

    const blobs = [
      { x: 0.66, y: 0.40, r: 0.6, ph: 0, sp: 0.00030, col: [255, 107, 53] },
      { x: 0.84, y: 0.58, r: 0.52, ph: 2.1, sp: 0.00024, col: [255, 140, 70] },
      { x: 0.72, y: 0.24, r: 0.46, ph: 4.2, sp: 0.00034, col: [190, 55, 22] },
      { x: 0.80, y: 0.72, r: 0.4, ph: 1.1, sp: 0.00027, col: [255, 95, 40] },
    ]

    const frame = (t: number) => {
      const w = root.clientWidth
      const h = root.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)
      const gather = (Math.sin(t * 0.00018) * 0.5 + 0.5) * 0.5
      ctx.globalCompositeOperation = 'lighter'
      for (const b of blobs) {
        let bx = b.x + Math.sin(t * b.sp + b.ph) * 0.10
        let by = b.y + Math.cos(t * b.sp * 0.92 + b.ph) * 0.10
        bx = bx + (0.72 - bx) * gather
        by = by + (0.5 - by) * gather
        const cx = bx * w
        const cy = by * h
        const rr = b.r * Math.min(w, h) * (1 - gather * 0.18)
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr)
        g.addColorStop(0, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0.22)`)
        g.addColorStop(1, `rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, rr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

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

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      gctx.revert()
    }
  }, [])

  return (
    <section className="hf-hero" ref={rootRef}>
      <canvas className="hf-bg" ref={canvasRef} aria-hidden="true" />
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
