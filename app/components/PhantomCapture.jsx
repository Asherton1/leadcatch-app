'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — "Second Chances" hero background
 * --------------------------------------------------
 * Sparse warm motes drifting in dim space. Most fade quietly into nothing.
 * Every 3.5–6 seconds, one re-ignites: brightens, glows, rises with new life,
 * fades. The arc per element: drift → almost-out → IGNITE → rise → fade.
 *
 * Maps to "Every prospect that almost got away" — the ignition is the moment
 * a lost lead comes back to life.
 *
 * - Renders ONLY on viewports >= 1440px
 * - Returns null on tablet/mobile/standard desktop
 * - Respects prefers-reduced-motion (renders nothing)
 * - Cleans up RAF + timers + observer on unmount
 *
 * Place inside any parent that has `position: relative` AND
 * `isolation: isolate` (your .hero already has both).
 *
 * Tuning knobs at the top of useEffect:
 *   EMBER_COUNT (default 12) — total motes on screen
 *   IGNITE_MIN_MS / IGNITE_MAX_MS — ms between ignition events
 */
export default function PhantomCapture() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isLargeDesktop, setIsLargeDesktop] = useState(false)

  // Gate at 1440px
  useEffect(() => {
    const check = () => setIsLargeDesktop(window.innerWidth >= 1440)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Canvas animation
  useEffect(() => {
    if (!isLargeDesktop) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // === TUNING KNOBS ===
    const EMBER_COUNT = 12
    const IGNITE_MIN_MS = 3500
    const IGNITE_MAX_MS = 6000
    // ====================

    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let rafId = 0
    let igniteTimer = 0
    let alive = true

    const resize = () => {
      const rect = container.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    class Ember {
      constructor(initial) {
        this.reset(initial)
      }

      reset(initial) {
        this.x = Math.random() * w
        // Spawn anywhere on first init, then below the visible area to drift up
        this.y = initial ? Math.random() * h : h - Math.random() * h * 0.4
        this.vx = (Math.random() - 0.5) * 0.08
        this.vyBase = -(0.04 + Math.random() * 0.08)
        this.vyRising = -(0.4 + Math.random() * 0.25)
        this.vy = this.vyBase
        this.sizeBase = 0.8 + Math.random() * 1.2
        this.sizePeak = this.sizeBase * (2.5 + Math.random() * 1.2)
        this.hue = 14 + Math.random() * 20
        this.life = 0
        this.stateStart = 0
        this.state = 'drifting'
        // Durations in frames (~60fps assumed; gracefully degrades on slower)
        this.driftingDuration = 200 + Math.random() * 280
        this.fadingDuration = 160 + Math.random() * 100
        this.ignitingDuration = 55 + Math.random() * 20
        this.risingDuration = 140 + Math.random() * 80
        this.dyingDuration = 100 + Math.random() * 60
        this.baseOpacity = 0.25 + Math.random() * 0.22
        this.swayPhase = Math.random() * Math.PI * 2
        this.swayFreq = 0.003 + Math.random() * 0.007
      }

      ignite() {
        if (this.state === 'drifting' || this.state === 'fading') {
          this.state = 'igniting'
          this.stateStart = this.life
        }
      }

      update() {
        this.life++
        const t = this.life - this.stateStart

        if (this.state === 'drifting' && t > this.driftingDuration) {
          this.state = 'fading'
          this.stateStart = this.life
        } else if (this.state === 'fading' && t > this.fadingDuration) {
          this.reset(false)
          return
        } else if (this.state === 'igniting' && t > this.ignitingDuration) {
          this.state = 'rising'
          this.stateStart = this.life
        } else if (this.state === 'rising' && t > this.risingDuration) {
          this.state = 'dying'
          this.stateStart = this.life
        } else if (this.state === 'dying' && t > this.dyingDuration) {
          this.reset(false)
          return
        }

        this.y += this.vy
        this.x +=
          this.vx +
          Math.sin(this.life * this.swayFreq + this.swayPhase) * 0.1

        if (this.y < -20) {
          this.reset(false)
          return
        }
      }

      draw() {
        const t = this.life - this.stateStart
        let alpha = 0
        let size = this.sizeBase
        let glow = 0

        if (this.state === 'drifting') {
          alpha = this.baseOpacity
          size = this.sizeBase
          glow = 0
        } else if (this.state === 'fading') {
          const p = t / this.fadingDuration
          alpha = this.baseOpacity * (1 - p * 0.75)
          size = this.sizeBase * (1 - p * 0.2)
          glow = 0
        } else if (this.state === 'igniting') {
          // Smoothstep ramp — the wow moment
          const p = t / this.ignitingDuration
          const eased = p * p * (3 - 2 * p)
          alpha = this.baseOpacity * 0.25 + (0.88 - this.baseOpacity * 0.25) * eased
          size = this.sizeBase + (this.sizePeak - this.sizeBase) * eased
          glow = eased
          this.vy = this.vyBase + (this.vyRising - this.vyBase) * eased
        } else if (this.state === 'rising') {
          alpha = 0.88
          size = this.sizePeak
          glow = 1
          this.vy = this.vyRising
        } else {
          // dying
          const p = t / this.dyingDuration
          alpha = 0.88 * (1 - p * p)
          size = this.sizePeak * (1 - p * 0.3)
          glow = 1 - p
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        ctx.fillStyle = `hsl(${this.hue}, ${88 + glow * 7}%, ${55 + glow * 8}%)`
        if (glow > 0) {
          ctx.shadowColor = `hsl(${this.hue}, 95%, 55%)`
          ctx.shadowBlur = size * (2.5 + glow * 6)
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const embers = []
    for (let i = 0; i < EMBER_COUNT; i++) embers.push(new Ember(true))
    // Stagger initial lives so embers aren't synchronized
    embers.forEach((e) => {
      e.life = Math.floor(Math.random() * 300)
    })

    const igniteSomething = () => {
      if (!alive) return
      const candidates = embers.filter(
        (e) => e.state === 'drifting' || e.state === 'fading'
      )
      if (candidates.length === 0) return
      // Prefer fading embers — more dramatic rebirth
      const fading = candidates.filter((e) => e.state === 'fading')
      const pool = fading.length > 0 ? fading : candidates
      pool[Math.floor(Math.random() * pool.length)].ignite()
    }

    const scheduleIgnite = () => {
      if (!alive) return
      const delay = IGNITE_MIN_MS + Math.random() * (IGNITE_MAX_MS - IGNITE_MIN_MS)
      igniteTimer = window.setTimeout(() => {
        igniteSomething()
        scheduleIgnite()
      }, delay)
    }
    // Let the scene settle for 2s before the first ignition
    igniteTimer = window.setTimeout(() => {
      igniteSomething()
      scheduleIgnite()
    }, 2000)

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < embers.length; i++) {
        embers[i].update()
        embers[i].draw()
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      alive = false
      cancelAnimationFrame(rafId)
      window.clearTimeout(igniteTimer)
      ro.disconnect()
    }
  }, [isLargeDesktop])

  if (!isLargeDesktop) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
