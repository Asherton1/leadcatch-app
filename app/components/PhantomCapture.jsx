'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v15: Aurora ambient backdrop + signal capture network overlay
 * --------------------------------------------------------------------------
 * Earth video swapped for CSS-only gradient aurora. Canvas network unchanged.
 *
 * Layer stack (bottom to top):
 *   1. .hero #0a0604 dark base
 *   2. Aurora div (3 blurred orange radial-gradient blobs, slow drift, CSS-only)
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
        section.hero > .phantom-aurora {
          max-width: none !important;
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          pointer-events: none !important;
        }
        section.hero > .phantom-aurora {
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
        .phantom-aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .phantom-aurora-blob-1 {
          width: 60%;
          height: 80%;
          background: radial-gradient(circle at center, rgba(255, 107, 53, 0.55) 0%, rgba(255, 107, 53, 0) 70%);
          opacity: 0.45;
          top: -10%;
          left: -10%;
          animation: phantom-aurora-drift-1 32s ease-in-out infinite;
        }
        .phantom-aurora-blob-2 {
          width: 50%;
          height: 70%;
          background: radial-gradient(circle at center, rgba(180, 60, 20, 0.55) 0%, rgba(180, 60, 20, 0) 70%);
          opacity: 0.4;
          bottom: -20%;
          right: -15%;
          animation: phantom-aurora-drift-2 48s ease-in-out infinite;
        }
        .phantom-aurora-blob-3 {
          width: 40%;
          height: 60%;
          background: radial-gradient(circle at center, rgba(255, 140, 80, 0.45) 0%, rgba(255, 140, 80, 0) 70%);
          opacity: 0.3;
          top: 20%;
          right: 10%;
          animation: phantom-aurora-drift-3 60s ease-in-out infinite;
        }
        @keyframes phantom-aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15%, 10%) scale(1.15); }
        }
        @keyframes phantom-aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12%, -8%) scale(0.9); }
        }
        @keyframes phantom-aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-8%, 15%) scale(1.2); }
        }
      `}</style>

      <div className="phantom-aurora" aria-hidden="true">
        <div className="phantom-aurora-blob phantom-aurora-blob-1" />
        <div className="phantom-aurora-blob phantom-aurora-blob-2" />
        <div className="phantom-aurora-blob phantom-aurora-blob-3" />
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
