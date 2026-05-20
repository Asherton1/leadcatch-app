'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v13: Signal Capture Network
 * --------------------------------------------------------------------------
 * Replaces the MP4 video with a canvas-based animation that visualizes what
 * ReCapture actually does: signals flow through a network, occasionally one
 * gets caught at a "capture" node (orange flash + expanding ring).
 *
 * - Faint white constellation of drifting nodes on dark background
 * - Small white pulses travel along nearest-neighbor lines (signals)
 * - When a pulse lands on a capture node: orange flash + halo + expanding ring
 * - 60fps via requestAnimationFrame, canvas resizes to .hero at any breakpoint
 * - No MP4 dependency, no video bandwidth cost
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
    const CONNECT_DIST = 180 // max px between nodes for a line to draw

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
      // Scale node count to viewport so dense screens get more, sparse less
      const count = Math.max(28, Math.min(60, Math.floor((w * h) / 24000)))
      nodes = []
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          // ~20% of nodes are "capture" nodes that flash orange on signal arrival
          captureNode: Math.random() < 0.2,
          glow: 0,
        })
      }
    }

    const spawnPulse = () => {
      if (nodes.length < 2) return
      const start = nodes[Math.floor(Math.random() * nodes.length)]
      // Only send pulse to a node within CONNECT_DIST (a real network neighbor)
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

      // Drift nodes gently, bounce off edges
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
            const alpha = (1 - d / CONNECT_DIST) * 0.12
            ctx.strokeStyle = `rgba(200,200,210,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Spawn new pulses periodically
      if (frame % 22 === 0 && Math.random() < 0.85) spawnPulse()

      // Pulses — small bright dots traveling along lines
      const newPulses = []
      for (const p of pulses) {
        p.t += p.speed
        if (p.t < 1) {
          const x = p.start.x + (p.end.x - p.start.x) * p.t
          const y = p.start.y + (p.end.y - p.start.y) * p.t
          // bright core
          ctx.fillStyle = 'rgba(255,255,255,0.55)'
          ctx.beginPath()
          ctx.arc(x, y, 1.6, 0, Math.PI * 2)
          ctx.fill()
          // soft halo
          ctx.fillStyle = 'rgba(255,255,255,0.2)'
          ctx.beginPath()
          ctx.arc(x, y, 3.2, 0, Math.PI * 2)
          ctx.fill()
          newPulses.push(p)
        } else {
          // Pulse landed — if at a capture node, fire the orange flash + ring
          if (p.end.captureNode) {
            p.end.glow = 1
            rings.push({ node: p.end, r: 4, a: 0.7 })
          }
        }
      }
      pulses = newPulses

      // Capture rings — orange expanding circles
      const newRings = []
      for (const r of rings) {
        r.r += 0.7
        r.a -= 0.011
        if (r.a > 0 && r.r < 70) {
          ctx.strokeStyle = `rgba(255,107,53,${r.a})`
          ctx.lineWidth = 1.3
          ctx.beginPath()
          ctx.arc(r.node.x, r.node.y, r.r, 0, Math.PI * 2)
          ctx.stroke()
          newRings.push(r)
        }
      }
      rings = newRings

      // Nodes themselves — bright orange if currently glowing, otherwise faint dot
      for (const n of nodes) {
        if (n.glow > 0) {
          // radial halo
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22)
          grad.addColorStop(0, `rgba(255,107,53,${n.glow * 0.6})`)
          grad.addColorStop(1, 'rgba(255,107,53,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(n.x, n.y, 22, 0, Math.PI * 2)
          ctx.fill()
          // bright dot
          ctx.fillStyle = `rgba(255,107,53,${0.7 + n.glow * 0.3})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2)
          ctx.fill()
          n.glow = Math.max(0, n.glow - 0.008)
        } else {
          // dim default node
          ctx.fillStyle = 'rgba(210,210,220,0.28)'
          ctx.beginPath()
          ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2)
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
        /* Beat .hero > * { max-width: 1200px; margin: auto } so canvas spans full hero */
        section.hero > canvas.phantom-canvas {
          max-width: none !important;
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          pointer-events: none !important;
        }
        /* Hide hero's other ambient layers so this is the sole backdrop */
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
      <canvas
        ref={canvasRef}
        className="phantom-canvas"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />
    </>
  )
}
