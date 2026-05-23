'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v16: Ghost fields backdrop + signal capture network overlay
 * --------------------------------------------------------------------------
 * Earth video swapped for ambient ghost data fields (left margins only).
 * Canvas network unchanged.
 *
 * Layer stack (bottom to top):
 *   1. .hero #0a0604 dark base
 *   2. Ghost fields layer (left 50% only, text-only, edge-margins)
 *   3. Canvas signal network (drifting nodes, white pulses, orange captures)
 *   4. .hero-split content (text + form mockup)
 */
export default function PhantomCapture() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
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
        section.hero > canvas.phantom-canvas,
        section.hero > .phantom-ghost-fields {
          max-width: none !important;
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          pointer-events: none !important;
        }
        section.hero > canvas.phantom-canvas {
          width: 100% !important;
          height: 100% !important;
        }
        section.hero > .phantom-ghost-fields {
          width: 50% !important;
          height: 100% !important;
          overflow: hidden !important;
          z-index: 0 !important;
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
        @media (max-width: 768px) {
          section.hero > .phantom-ghost-fields {
            display: none !important;
          }
        }
        .ghost-field {
          position: absolute;
          font-family: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
          font-size: 11px;
          color: rgba(220, 220, 235, 0.5);
          white-space: nowrap;
          will-change: opacity, transform, color;
          pointer-events: none;
          opacity: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ghost-field-label {
          color: rgba(255, 107, 53, 0.7);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .ghost-field-value {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          will-change: width;
        }
        .ghost-field-1 {
          top: 5%;
          left: 3%;
          animation: ghost-complete 12s ease-in-out infinite;
          animation-delay: 0s;
        }
        .ghost-field-2 {
          top: 28%;
          left: 1%;
          animation: ghost-abandon 12s ease-in-out infinite;
          animation-delay: 2.4s;
        }
        .ghost-field-3 {
          top: 55%;
          left: 2%;
          animation: ghost-abandon 12s ease-in-out infinite;
          animation-delay: 4.8s;
        }
        .ghost-field-4 {
          top: 78%;
          left: 4%;
          animation: ghost-complete 12s ease-in-out infinite;
          animation-delay: 7.2s;
        }
        .ghost-field-5 {
          top: 92%;
          left: 8%;
          animation: ghost-abandon 12s ease-in-out infinite;
          animation-delay: 9.6s;
        }
        .ghost-field-1 .ghost-field-value { animation: ghost-type 12s linear infinite; animation-delay: 0s; }
        .ghost-field-2 .ghost-field-value { animation: ghost-type 12s linear infinite; animation-delay: 2.4s; }
        .ghost-field-3 .ghost-field-value { animation: ghost-type 12s linear infinite; animation-delay: 4.8s; }
        .ghost-field-4 .ghost-field-value { animation: ghost-type 12s linear infinite; animation-delay: 7.2s; }
        .ghost-field-5 .ghost-field-value { animation: ghost-type 12s linear infinite; animation-delay: 9.6s; }
        @keyframes ghost-complete {
          0% { opacity: 0; }
          5% { opacity: 0.6; }
          40% { opacity: 0.6; color: rgba(220, 220, 235, 0.5); }
          45% { color: rgba(255, 255, 255, 0.85); }
          55% { color: rgba(255, 255, 255, 0.85); }
          70% { opacity: 0; color: rgba(255, 255, 255, 0.85); }
          100% { opacity: 0; }
        }
        @keyframes ghost-abandon {
          0% { opacity: 0; transform: translateX(0) scale(1); }
          5% { opacity: 0.6; transform: translateX(0) scale(1); }
          40% { opacity: 0.5; color: rgba(220, 220, 235, 0.5); transform: translateX(0) scale(1); }
          45% { opacity: 0.3; color: rgba(150, 150, 160, 0.4); }
          55% { opacity: 0.95; color: rgba(255, 107, 53, 0.95); transform: translateX(0) scale(1.05); }
          65% { opacity: 0.7; color: rgba(255, 107, 53, 0.7); transform: translateX(12px) scale(1); }
          75% { opacity: 0.3; color: rgba(255, 107, 53, 0.6); transform: translateX(24px) scale(0.98); }
          85% { opacity: 0; transform: translateX(36px) scale(0.95); }
          100% { opacity: 0; }
        }
        @keyframes ghost-type {
          0% { width: 0; }
          8% { width: 0; }
          30% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>

      <div className="phantom-ghost-fields" aria-hidden="true">
        <div className="ghost-field ghost-field-1">
          <span className="ghost-field-label">Name</span>
          <span className="ghost-field-value">Jennifer Thorne</span>
        </div>
        <div className="ghost-field ghost-field-2">
          <span className="ghost-field-label">Email</span>
          <span className="ghost-field-value">m.delacroix@gmail.com</span>
        </div>
        <div className="ghost-field ghost-field-3">
          <span className="ghost-field-label">Phone</span>
          <span className="ghost-field-value">(214) 555-0193</span>
        </div>
        <div className="ghost-field ghost-field-4">
          <span className="ghost-field-label">Inquiry</span>
          <span className="ghost-field-value">Veneer consultation</span>
        </div>
        <div className="ghost-field ghost-field-5">
          <span className="ghost-field-label">Budget</span>
          <span className="ghost-field-value">$15-25K</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="phantom-canvas"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
    </>
  )
}
