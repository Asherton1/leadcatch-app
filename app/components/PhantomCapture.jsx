'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — v18: Responsive hero
 * --------------------------------------------------------------------------
 * Mobile (<768px):  Earth video + signal capture orbs (proven mobile-friendly)
 * Desktop (>=768px): Procedural flow field + signal capture orbs (new wow)
 *
 * Layer stack:
 *   1. .hero #0a0604 dark base
 *   2. EITHER earth video (mobile) OR flow canvas (desktop) — z-index 0
 *   3. Signal capture canvas (orbs) — z-index 1
 *   4. .hero-split content
 */
export default function PhantomCapture() {
  const videoRef = useRef(null)
  const flowCanvasRef = useRef(null)
  const captureCanvasRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect viewport + handle resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    let t
    const debouncedCheck = () => {
      clearTimeout(t)
      t = setTimeout(check, 200)
    }
    window.addEventListener('resize', debouncedCheck)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', debouncedCheck)
    }
  }, [])

  // Earth video — mobile only
  useEffect(() => {
    if (!isMobile) return
    const v = videoRef.current
    if (!v) return
    const setRate = () => { v.playbackRate = 0.5 }
    setRate()
    v.addEventListener('loadedmetadata', setRate)
    v.addEventListener('play', setRate)
    return () => {
      v.removeEventListener('loadedmetadata', setRate)
      v.removeEventListener('play', setRate)
    }
  }, [isMobile])

  // Flow field — desktop only
  useEffect(() => {
    if (isMobile) return
    const canvas = flowCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles = []
    let w = 0, h = 0, time = 0
    const dpr = window.devicePixelRatio || 1
    const COUNT = 1000

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < COUNT; i++) {
        const life = Math.random() * 250 + 50
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          life: life,
          maxLife: life,
          orange: Math.random() < 0.15,
        })
      }
    }

    const angleAt = (x, y, t) => {
      const a = Math.sin(x * 0.0042 + t * 0.0008) * Math.cos(y * 0.0055 - t * 0.0006)
      const b = Math.sin((x - y) * 0.0035 + t * 0.0007) * 0.5
      return (a + b) * Math.PI * 2.0
    }

    const animate = () => {
      time++
      ctx.fillStyle = 'rgba(10, 6, 4, 0.05)'
      ctx.fillRect(0, 0, w, h)

      for (const p of particles) {
        const angle = angleAt(p.x, p.y, time)
        p.x += Math.cos(angle) * 0.85
        p.y += Math.sin(angle) * 0.85
        p.life--

        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.life = 100 + Math.random() * 200
          p.maxLife = p.life
          p.orange = Math.random() < 0.15
        }

        const fadeIn = Math.min((p.maxLife - p.life) / 30, 1)
        const fadeOut = Math.min(p.life / 30, 1)
        const alpha = Math.max(0, Math.min(0.7, fadeIn * fadeOut))

        if (p.orange) {
          ctx.fillStyle = 'rgba(255, 107, 53, ' + (alpha * 0.9) + ')'
        } else {
          ctx.fillStyle = 'rgba(220, 220, 235, ' + (alpha * 0.7) + ')'
        }
        ctx.fillRect(p.x, p.y, 1.3, 1.3)
      }

      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isMobile])

  // Signal capture orbs — both viewports
  useEffect(() => {
    const canvas = captureCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let nodes = []
    let pulses = []
    let rings = []
    let w = 0
    let h = 0
    const dpr = window.devicePixelRatio || 1
    const CONNECT_DIST = 200

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    const initNodes = () => {
      const count = Math.max(24, Math.min(48, Math.floor((w * h) / 30000)))
      nodes = []
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          captureNode: Math.random() < 0.25,
          glow: 0,
        })
      }
    }

    const spawnPulse = () => {
      if (nodes.length < 2) return
      const start = nodes[Math.floor(Math.random() * nodes.length)]
      const neighbors = nodes.filter((n) => {
        if (n === start) return false
        const dx = n.x - start.x
        const dy = n.y - start.y
        return dx * dx + dy * dy < CONNECT_DIST * CONNECT_DIST
      })
      if (neighbors.length === 0) return
      const end = neighbors[Math.floor(Math.random() * neighbors.length)]
      pulses.push({ start, end, t: 0, speed: 0.008 + Math.random() * 0.006 })
    }

    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0) { n.x = 0; n.vx *= -1 }
        if (n.x > w) { n.x = w; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 }
        if (n.y > h) { n.y = h; n.vy *= -1 }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const d = Math.sqrt(d2)
            const alpha = (1 - d / CONNECT_DIST) * 0.18
            ctx.strokeStyle = 'rgba(220,220,235,' + alpha + ')'
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (frame % 20 === 0 && Math.random() < 0.9) spawnPulse()

      const newPulses = []
      for (const p of pulses) {
        p.t += p.speed
        if (p.t < 1) {
          const x = p.start.x + (p.end.x - p.start.x) * p.t
          const y = p.start.y + (p.end.y - p.start.y) * p.t
          ctx.fillStyle = 'rgba(255,255,255,0.7)'
          ctx.beginPath()
          ctx.arc(x, y, 1.8, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(255,255,255,0.25)'
          ctx.beginPath()
          ctx.arc(x, y, 3.4, 0, Math.PI * 2)
          ctx.fill()
          newPulses.push(p)
        } else {
          if (p.end.captureNode) {
            p.end.glow = 1
            rings.push({ node: p.end, r: 4, a: 0.75 })
          }
        }
      }
      pulses = newPulses

      const newRings = []
      for (const r of rings) {
        r.r += 0.8
        r.a -= 0.011
        if (r.a > 0 && r.r < 80) {
          ctx.strokeStyle = 'rgba(255,107,53,' + r.a + ')'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(r.node.x, r.node.y, r.r, 0, Math.PI * 2)
          ctx.stroke()
          newRings.push(r)
        }
      }
      rings = newRings

      for (const n of nodes) {
        if (n.glow > 0) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26)
          grad.addColorStop(0, 'rgba(255,107,53,' + (n.glow * 0.75) + ')')
          grad.addColorStop(1, 'rgba(255,107,53,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(n.x, n.y, 26, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(255,107,53,' + (0.8 + n.glow * 0.2) + ')'
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2)
          ctx.fill()
          n.glow = Math.max(0, n.glow - 0.008)
        } else {
          ctx.fillStyle = 'rgba(220,220,235,0.4)'
          ctx.beginPath()
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        section.hero > video.phantom-video,
        section.hero > canvas.phantom-flow,
        section.hero > canvas.phantom-canvas {
          max-width: none !important;
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          pointer-events: none !important;
        }
        section.hero > video.phantom-video {
          min-width: 100vw !important;
          width: 100vw !important;
          z-index: 0 !important;
        }
        section.hero > canvas.phantom-flow {
          width: 100% !important;
          height: 100% !important;
          z-index: 0 !important;
        }
        section.hero > canvas.phantom-canvas {
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
        }
        section.hero::before,
        section.hero::after,
        .hero-glow-orb,
        .hero-scanline,
        .hero-particles {
          display: none !important;
        }
        section.hero {
          background: #0a0604 !important;
        }
      `}</style>

      {isMobile && (
        <video
          ref={videoRef}
          className="phantom-video"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          preload="auto"
          style={{
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            opacity: 0.5,
            filter: 'saturate(0.65) brightness(0.55)',
            transform: 'scaleX(2.0) translateZ(0)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <source src="/bloom-hero.mp4" type="video/mp4" />
        </video>
      )}

      {!isMobile && (
        <canvas ref={flowCanvasRef} className="phantom-flow" aria-hidden="true" />
      )}

      <canvas ref={captureCanvasRef} className="phantom-canvas" aria-hidden="true" />
    </>
  )
}
