'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v14: Earth video + signal capture network overlay
 * --------------------------------------------------------------------------
 * Earth sets the cinematic mood. Canvas overlay narrates ReCapture's product:
 * signals flow through a drifting network of nodes, and when one lands on a
 * "capture" node it flashes orange with a halo + expanding ring.
 *
 * Layer stack (bottom to top):
 *   1. .hero #0a0604 dark base
 *   2. Earth video (dimmed via opacity + filter, stretched scaleX 2.0)
 *   3. Canvas signal network (drifting nodes, white pulses, orange captures)
 *   4. .hero-split content (text + form mockup) — wins via DOM order at z:1
 */
export default function PhantomCapture() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Video playback rate
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const setRate = () => {
      v.playbackRate = 0.5
    }
    setRate()
    v.addEventListener('loadedmetadata', setRate)
    v.addEventListener('play', setRate)
    return () => {
      v.removeEventListener('loadedmetadata', setRate)
      v.removeEventListener('play', setRate)
    }
  }, [])

  // Canvas signal-capture network animation
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
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    const initNodes = () => {
      // Slightly sparser than v13 since layered over Earth (avoid clutter)
      const count = Math.max(24, Math.min(48, Math.floor((w * h) / 30000)))
      nodes = []
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          captureNode: Math.random() < 0.25, // 25% are capture nodes
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

      // Drift nodes, bounce off edges
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0) { n.x = 0; n.vx *= -1 }
        if (n.x > w) { n.x = w; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 }
        if (n.y > h) { n.y = h; n.vy *= -1 }
      }

      // Network lines — alpha falls off with distance
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
            ctx.strokeStyle = `rgba(220,220,235,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Spawn pulses
      if (frame % 20 === 0 && Math.random() < 0.9) spawnPulse()

      // Pulses — white signals traveling along lines
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
          // Pulse arrived — if at a capture node, fire orange flash + ring
          if (p.end.captureNode) {
            p.end.glow = 1
            rings.push({ node: p.end, r: 4, a: 0.75 })
          }
        }
      }
      pulses = newPulses

      // Orange capture rings expanding outward
      const newRings = []
      for (const r of rings) {
        r.r += 0.8
        r.a -= 0.011
        if (r.a > 0 && r.r < 80) {
          ctx.strokeStyle = `rgba(255,107,53,${r.a})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(r.node.x, r.node.y, r.r, 0, Math.PI * 2)
          ctx.stroke()
          newRings.push(r)
        }
      }
      rings = newRings

      // Nodes — bright orange flash if currently captured, faint white otherwise
      for (const n of nodes) {
        if (n.glow > 0) {
          // Orange halo
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26)
          grad.addColorStop(0, `rgba(255,107,53,${n.glow * 0.75})`)
          grad.addColorStop(1, 'rgba(255,107,53,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(n.x, n.y, 26, 0, Math.PI * 2)
          ctx.fill()
          // Bright dot
          ctx.fillStyle = `rgba(255,107,53,${0.8 + n.glow * 0.2})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2)
          ctx.fill()
          n.glow = Math.max(0, n.glow - 0.008)
        } else {
          // Default visible dim node
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
        /* Beat .hero > * { max-width: 1200px } for both video and canvas */
        section.hero > video.phantom-video,
        section.hero > canvas.phantom-canvas {
          max-width: none !important;
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
        section.hero > video.phantom-video {
          min-width: 100vw !important;
          width: 100vw !important;
        }
        section.hero > canvas.phantom-canvas {
          width: 100% !important;
          height: 100% !important;
          pointer-events: none !important;
        }
        /* Hide hero's other ambient layers so our stack is clean */
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
          zIndex: 1,
          opacity: 0.5,
          filter: 'saturate(0.65) brightness(0.55)',
          transform: 'scaleX(2.0) translateZ(0)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      <canvas
        ref={canvasRef}
        className="phantom-canvas"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
    </>
  )
}
