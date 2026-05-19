'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — Bloom Earth video (v6: CSS override + horizontal stretch)
 * --------------------------------------------------------------------------
 * Root cause of the orange-on-right problem: the .hero element's own CSS has
 * orange radial-gradient backgrounds painted on it, and there's a .hero-glow-orb
 * div that adds more orange. No amount of overlay layers from inside this
 * component could fully hide them. Fix: globally override .hero's background
 * and hide hero-glow-orb when this component is mounted.
 *
 * Then: scaleX(1.4) on the video horizontally stretches the Earth content so
 * it extends across the full width instead of being confined to the left.
 *
 * Gated at >=768px (tablet+). Mobile falls through to .hero defaults.
 */
export default function PhantomCapture() {
  const [show, setShow] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!show) return
    const v = videoRef.current
    if (!v) return
    const setRate = () => {
      v.playbackRate = 0.5
    }
    setRate()
    v.addEventListener('loadedmetadata', setRate)
    v.addEventListener('play', setRate)
    return () => {
      v.removeEventListener('loadedmetadata', setRate)
      v.removeEventListener('play', setRate)
    }
  }, [show])

  if (!show) return null

  return (
    <>
      {/* Global CSS overrides — kill .hero's natural orange gradients */}
      <style jsx global>{`
        @media (min-width: 768px) {
          section.hero {
            background: #0a0604 !important;
          }
          section.hero::before {
            display: none !important;
          }
          .hero-glow-orb {
            display: none !important;
          }
        }
      `}</style>

      {/* Earth video — horizontally stretched to fill the whole hero width */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(50% - 50vw)',
          width: '100vw',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.65,
          transform: 'scaleX(1.4)',
          transformOrigin: 'center center',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle warm brand tint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(50% - 50vw)',
          width: '100vw',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          background: 'rgba(35, 14, 5, 0.35)',
        }}
      />
    </>
  )
}
