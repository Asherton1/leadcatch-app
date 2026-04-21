'use client'

import { useEffect, useRef } from 'react'

export default function PremiumEffects() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    // ── Scroll Progress Bar ──────────────────────────────────────────────
    function updateProgress() {
      if (!progressRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      progressRef.current.style.transform = `scaleX(${progress})`
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    // ── Magnetic Buttons ─────────────────────────────────────────────────
    const magneticBtns = document.querySelectorAll('.cta-primary, .cta-secondary, .explore-features-link')
    const magneticHandlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = []

    magneticBtns.forEach(btn => {
      const el = btn as HTMLElement
      el.classList.add('magnetic-btn')

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
      }

      const leave = () => {
        el.style.transform = 'translate(0, 0)'
      }

      el.addEventListener('mousemove', move as EventListener)
      el.addEventListener('mouseleave', leave as EventListener)
      magneticHandlers.push({ el, move, leave })
    })

    // ── 3D Card Tilt ─────────────────────────────────────────────────────
    const tiltCards = document.querySelectorAll('.wow-card, .industries-grid > a, .testimonials-grid > div')
    const tiltHandlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = []

    tiltCards.forEach(card => {
      const el = card as HTMLElement

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
      }

      const leave = () => {
        el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)'
        el.style.transition = 'transform 0.4s ease'
        setTimeout(() => { el.style.transition = '' }, 400)
      }

      el.addEventListener('mousemove', move as EventListener)
      el.addEventListener('mouseleave', leave as EventListener)
      tiltHandlers.push({ el, move, leave })
    })

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('scroll', updateProgress)
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move as EventListener)
        el.removeEventListener('mouseleave', leave as EventListener)
      })
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move as EventListener)
        el.removeEventListener('mouseleave', leave as EventListener)
      })
    }
  }, [])

  return <div ref={progressRef} className="scroll-progress" />
}
