'use client'

import { useEffect, useState } from 'react'

/**
 * PhantomCapture — Bloom AI video background
 * -------------------------------------------
 * Plays the polished Bloom AI MP4 as a full-bleed looping background
 * across the entire hero section.
 *
 * - Desktop + tablet (>=768px): video plays, autoplay/loop/muted/playsInline
 * - Mobile (<768px): returns null, falls through to existing radial-gradient
 *   hero background (saves cellular bandwidth and battery)
 * - Video file: /public/bloom-hero.mp4 (served as static asset by Next.js)
 *
 * Place inside any parent that has `position: relative` AND
 * `isolation: isolate` (your .hero already has both).
 */
export default function PhantomCapture() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      preload="auto"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <source src="/bloom-hero.mp4" type="video/mp4" />
    </video>
  )
}
