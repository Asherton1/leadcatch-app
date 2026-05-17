'use client'

import { useEffect, useRef } from 'react'

export default function ReturnField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0

    const setupCanvas = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      if (width === 0 || height === 0) return
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setupCanvas()

    type Particle = {
      x: number; y: number
      vx: number; vy: number
      size: number
      alpha: number
      returning: boolean
      returnT: number
      sX: number; sY: number
      cX: number; cY: number
    }

    const PARTICLE_COUNT = 200
    const particles: Particle[] = []

    const attractor = () => ({ x: width * 0.72, y: height * 0.55 })

    // Pseudo-curl flow field — multi-frequency sin/cos
    const flowAngle = (x: number, y: number, t: number) => {
      const fx = x * 0.0012
      const fy = y * 0.0018
      const ft = t * 0.00008
      return (
        Math.sin(fx + ft) * 0.9 +
        Math.cos(fy - ft * 0.6) * 0.7 +
        Math.sin(fx * 2.3 + fy * 1.4 + ft * 0.4) * 0.5
      )
    }

    const resetParticle = (p: Particle, fresh = false) => {
      if (fresh) {
        p.x = Math.random() * width
        p.y = Math.random() * height
      } else {
        p.x = -10 + Math.random() * 40
        p.y = Math.random() * height
      }
      const baseSpeed = 0.35 + Math.random() * 0.25
      p.vx = baseSpeed
      p.vy = (Math.random() - 0.5) * 0.2
      p.size = 0.7 + Math.random() * 1.3
      p.alpha = 0.22 + Math.random() * 0.4
      p.returning = false
      p.returnT = 0
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p: Particle = {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, alpha: 0,
        returning: false, returnT: 0,
        sX: 0, sY: 0, cX: 0, cY: 0,
      }
      resetParticle(p, true)
      particles.push(p)
    }

    let lastReturnTime = performance.now() + 2500
    let rafId = 0

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleResize = () => setupCanvas()
    window.addEventListener('resize', handleResize)

    const animate = (now: number) => {
      if (width === 0 || height === 0) {
        setupCanvas()
        rafId = requestAnimationFrame(animate)
        return
      }

      // Fade existing pixels (trail effect) without darkening background
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      // Trigger a return event periodically
      if (!reduceMotion && now - lastReturnTime > 6500 + Math.random() * 3500) {
        lastReturnTime = now
        const candidates = particles.filter(p =>
          !p.returning &&
          p.x > width * 0.6 && p.x < width * 0.93 &&
          p.y > height * 0.15 && p.y < height * 0.85
        )
        if (candidates.length > 0) {
          const target = candidates[Math.floor(Math.random() * candidates.length)]
          const att = attractor()
          target.returning = true
          target.returnT = 0
          target.sX = target.x
          target.sY = target.y
          target.cX = (target.x + att.x) / 2 + (Math.random() - 0.5) * 80
          target.cY = (target.y + att.y) / 2 - 130 - Math.random() * 70
        }
      }

      const att = attractor()
      const RETURN_INCREMENT = 1 / 140

      for (const p of particles) {
        if (p.returning) {
          p.returnT += RETURN_INCREMENT
          if (p.returnT >= 1) {
            resetParticle(p)
            continue
          }
          const t = p.returnT
          const omt = 1 - t
          p.x = omt * omt * p.sX + 2 * omt * t * p.cX + t * t * att.x
          p.y = omt * omt * p.sY + 2 * omt * t * p.cY + t * t * att.y

          const fadeAlpha = 0.95 - t * 0.55
          ctx.shadowColor = 'rgba(255, 107, 53, 0.95)'
          ctx.shadowBlur = 14
          ctx.fillStyle = `rgba(255, 150, 80, ${fadeAlpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.7, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          const angle = flowAngle(p.x, p.y, now)
          const targetVx = 0.5 + Math.cos(angle) * 0.25
          const targetVy = Math.sin(angle) * 0.3
          p.vx = p.vx * 0.97 + targetVx * 0.03
          p.vy = p.vy * 0.97 + targetVy * 0.03
          p.x += p.vx
          p.y += p.vy

          if (p.x > width + 30 || p.y > height + 30 || p.y < -30) {
            resetParticle(p)
            continue
          }

          ctx.fillStyle = `rgba(255, 107, 53, ${p.alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="return-field" aria-hidden="true" />
}
