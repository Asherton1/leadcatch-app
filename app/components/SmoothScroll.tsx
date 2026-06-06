'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  // Initialize Lenis once on mount
  useEffect(() => {
    // Respect visitors who've asked their device to reduce motion —
    // they keep plain native scroll, no smoothing forced on them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,          // smoothing: lower = snappier, higher = floatier. 0.1 is a subtle, premium glide.
      smoothWheel: true,  // smooth the mouse wheel / trackpad
      // smoothTouch is left OFF (default) so phones keep fast, native momentum scroll
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // On every route change, snap instantly back to the top
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
