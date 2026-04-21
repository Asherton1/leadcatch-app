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

    // ── Stat Counter Animation ───────────────────────────────────────────
    function animateCounters() {
      const statValues = document.querySelectorAll('.stat-number')
      statValues.forEach(el => {
        const text = el.textContent ?? ''
        
        // Only animate numbers
        const match = text.match(/^([\$]?)(\d[\d,]*)(.*)$/)
        if (!match) return
        
        const prefix = match[1]
        const targetNum = parseInt(match[2].replace(/,/g, ''))
        const suffix = match[3]
        
        if (isNaN(targetNum) || targetNum === 0) return
        if ((el as HTMLElement).dataset.counted === 'true') return
        ;(el as HTMLElement).dataset.counted = 'true'
        
        let start = 0
        const duration = 1500
        const startTime = performance.now()
        
        function tick(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          const current = Math.round(eased * targetNum)
          
          if (current !== start) {
            start = current
            el.textContent = prefix + current.toLocaleString() + suffix
          }
          
          if (progress < 1) requestAnimationFrame(tick)
        }
        
        requestAnimationFrame(tick)
      })
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(animateCounters, 200)
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    const statsGrid = document.querySelector('.stats-bridge')
    if (statsGrid) statsObserver.observe(statsGrid)

    // ── Parallax on scroll ───────────────────────────────────────────────
    function updateParallax() {
      const scrollY = window.scrollY
      
      // Hero elements move slower
      const heroTitle = document.querySelector('.hero h1') as HTMLElement
      const heroSub = document.querySelector('.hero-subtitle') as HTMLElement
      const heroOrb = document.querySelector('.hero-glow-orb') as HTMLElement
      
      if (heroTitle && scrollY < 800) {
        heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`
      }
      if (heroSub && scrollY < 800) {
        heroSub.style.transform = `translateY(${scrollY * 0.2}px)`
      }
      if (heroOrb && scrollY < 800) {
        heroOrb.style.transform = `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})`
      }
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true })

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('scroll', updateParallax)
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move as EventListener)
        el.removeEventListener('mouseleave', leave as EventListener)
      })
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move as EventListener)
        el.removeEventListener('mouseleave', leave as EventListener)
      })
      if (statsGrid) statsObserver.unobserve(statsGrid)
    }
  }, [])

  return <div ref={progressRef} className="scroll-progress" />
}
