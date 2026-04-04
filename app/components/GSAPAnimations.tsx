'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAPAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero ──
      gsap.fromTo('.hero h1',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo('.cta-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' }
      )

      // ── Problem cards ──
      gsap.fromTo('.problem-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.problem-grid', start: 'top 85%' } }
      )

      // ── Dashboard mock ──
      gsap.fromTo('.screenshot-mock',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.screenshot-mock', start: 'top 85%' } }
      )

      // ── Feature cards ──
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-grid', start: 'top 85%' } }
      )

      // ── Pricing cards ──
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 85%' } }
      )

      // ── Testimonials ──
      gsap.fromTo('.testimonial',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials', start: 'top 85%' } }
      )

    })

    return () => ctx.revert()
  }, [])

  return null
}
