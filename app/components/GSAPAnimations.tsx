'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAPAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance — cinematic stagger ──
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .fromTo('.hero h1',
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo('.cta-group',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo('.dashboard-video-wrap',
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
          '-=0.3'
        )

      // ── Stats bar — count up effect ──
      gsap.fromTo('.stats-bridge',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-bridge', start: 'top 85%' } }
      )

      // ── Problem cards — stagger in ──
      gsap.fromTo('.problem-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.problem-grid', start: 'top 85%' } }
      )

      // ── Steps section ──
      gsap.fromTo('.step-card',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.how-it-works-section', start: 'top 80%' } }
      )

      // ── Dashboard mock — dramatic entrance ──
      gsap.fromTo('.screenshot-mock',
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.screenshot-section', start: 'top 80%' } }
      )

      // ── Feature wow-cards — stagger with scale ──
      gsap.fromTo('.wow-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.wow-card', start: 'top 85%' } }
      )

      // ── Industry cards — stagger in ──
      gsap.fromTo('.industries-grid > a',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.industries-grid', start: 'top 85%' } }
      )

      // ── Testimonials — slide in from sides ──
      gsap.fromTo('.testimonials-grid > div:nth-child(odd)',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-grid', start: 'top 85%' } }
      )
      gsap.fromTo('.testimonials-grid > div:nth-child(even)',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-grid', start: 'top 85%' } }
      )

      // ── Final CTA — scale up ──
      gsap.fromTo('.final-cta h2',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.final-cta', start: 'top 80%' } }
      )

      // ── Section dividers — fade in ──
      gsap.fromTo('.section-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.section-divider', start: 'top 90%' },
          stagger: 0.2 }
      )

    })

    return () => ctx.revert()
  }, [])

  return null
}
