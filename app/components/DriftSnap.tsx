'use client'

import { useEffect, useRef } from 'react'

export default function DriftSnap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = canvas.offsetWidth
    let height = canvas.offsetHeight

    const setupCanvas = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setupCanvas()

    const DOT_COUNT = 22

    type Dot = {
      x: number; y: number
      dx: number; dy: number
      size: number
      opacityBase: number; opacityRange: number
      twinklePhase: number; twinkleFreq: number
      captured: boolean; captureStart: number
    }

    const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      size: 1.5 + Math.random() * 1.8,
      opacityBase: 0.18 + Math.random() * 0.18,
      opacityRange: 0.12 + Math.random() * 0.12,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleFreq: 0.15 + Math.random() * 0.25,
      captured: false,
      captureStart: 0,
    }))

    let lastTime = performance.now()
    let nextCaptureTime = performance.now() + 2500
    let rafId = 0

    const handleResize = () => setupCanvas()
    window.addEventListener('resize', handleResize)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      if (!reduceMotion && now >= nextCaptureTime) {
        nextCaptureTime = now + 4500 + Math.random() * 2500
        const available = dots.filter(d => !d.captured)
        if (available.length > 0) {
          const target = available[Math.floor(Math.random() * available.length)]
          target.captured = true
          target.captureStart = now
        }
      }

      ctx.clearRect(0, 0, width, height)

      dots.forEach(dot => {
        if (dot.captured) {
          const elapsed = now - dot.captureStart

          if (elapsed > 1500) {
            const edge = Math.floor(Math.random() * 4)
            if (edge === 0) { dot.x = -10; dot.y = Math.random() * height }
            else if (edge === 1) { dot.x = width + 10; dot.y = Math.random() * height }
            else if (edge === 2) { dot.x = Math.random() * width; dot.y = -10 }
            else { dot.x = Math.random() * width; dot.y = height + 10 }
            dot.dx = (Math.random() - 0.5) * 10
            dot.dy = (Math.random() - 0.5) * 10
            dot.captured = false
            dot.captureStart = 0
            return
          }

          let frameOpacity = 0
          let dotOpacity = 0
          let frameScale = 1

          if (elapsed < 220) {
            const t = elapsed / 220
            frameOpacity = t
            frameScale = 0.4 + t * 0.6
            dotOpacity = dot.opacityBase + (1 - dot.opacityBase) * t
          } else if (elapsed < 1250) {
            frameOpacity = 1
            dotOpacity = 1
            frameScale = 1
          } else {
            const t = (elapsed - 1250) / 250
            frameOpacity = 1 - t
            dotOpacity = 1 - t
            frameScale = 1 + t * 0.1
          }

          const frameSize = 22 * frameScale
          ctx.strokeStyle = `rgba(255, 107, 53, ${frameOpacity * 0.85})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.rect(dot.x - frameSize / 2, dot.y - frameSize / 2, frameSize, frameSize)
          ctx.stroke()

          ctx.save()
          ctx.shadowColor = 'rgba(255, 107, 53, 0.9)'
          ctx.shadowBlur = 14
          ctx.fillStyle = `rgba(255, 107, 53, ${dotOpacity})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size + 0.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          dot.x += dot.dx * dt
          dot.y += dot.dy * dt

          if (dot.x < -15) dot.x = width + 15
          if (dot.x > width + 15) dot.x = -15
          if (dot.y < -15) dot.y = height + 15
          if (dot.y > height + 15) dot.y = -15

          const tw = dot.opacityBase + dot.opacityRange * Math.sin(now / 1000 * dot.twinkleFreq + dot.twinklePhase)
          ctx.fillStyle = `rgba(255, 107, 53, ${Math.max(0, tw)})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="drift-snap" aria-hidden="true" />
}
