'use client'

import { useEffect, useRef } from 'react'

type P = {
  x: number
  y: number
  vy: number
  vx: number
  r: number
  life: number
  maxLife: number
  recovered: boolean
  flare: number
}

export default function FlowField() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = Math.min(90, Math.round((w * h) / 18000))
    const particles: P[] = []

    const spawn = (seeded = false): P => {
      const maxLife = 260 + Math.random() * 420
      return {
        x: Math.random() * w,
        y: seeded ? Math.random() * h : -20 - Math.random() * 120,
        vy: 0.22 + Math.random() * 0.55,
        vx: (Math.random() - 0.5) * 0.16,
        r: 0.9 + Math.random() * 1.9,
        life: seeded ? Math.random() * maxLife : 0,
        maxLife,
        // ~11% of inquiries get recovered
        recovered: Math.random() < 0.11,
        flare: 0,
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(spawn(true))

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 1

      // connection lines between nearby particles
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 15000) {
            const alpha = (1 - d2 / 15000) * 0.09
            ctx.strokeStyle = `rgba(255,107,53,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life += 1

        const progress = p.life / p.maxLife

        // recovered particles flare back to life around 60% of their journey
        if (p.recovered && progress > 0.6 && p.flare < 1) {
          p.flare = Math.min(1, p.flare + 0.035)
          p.vy *= 0.985
        }

        // abandoned particles fade out as they fall
        let alpha: number
        if (p.recovered) {
          alpha = 0.14 + p.flare * 0.6
        } else {
          alpha = Math.max(0, 0.3 * (1 - progress * 1.25))
        }

        if (alpha > 0.004) {
          const radius = p.r * (1 + p.flare * 1.1)

          if (p.flare > 0.05) {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 7)
            g.addColorStop(0, `rgba(255,134,89,${0.34 * p.flare})`)
            g.addColorStop(1, 'rgba(255,107,53,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(p.x, p.y, radius * 7, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.fillStyle = p.recovered
            ? `rgba(255,150,105,${alpha})`
            : `rgba(255,107,53,${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }

        if (p.y > h + 30 || p.life > p.maxLife * 1.6) {
          particles[i] = spawn(false)
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return <canvas ref={ref} className="flr-canvas" aria-hidden="true" />
}
