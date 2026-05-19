'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — v8: three-layer stack, content on forefront
 * ------------------------------------------------------------
 * Stacking from bottom to top:
 *   Layer 1 (zIndex 1): video, recessed (opacity 0.45) — ambient background
 *   Layer 2 (zIndex 2): heavy dark dim layer (opacity 0.65) — separates content from video
 *   Content (zIndex 5+ via .hero-split): sits on the forefront, sharp and readable
 *
 * Width is forced to 100vw via !important overrides on .landing and .hero
 * so layers fully extend edge to edge.
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
      <style jsx global>{`
        @media (min-width: 768px) {
          .landing {
            max-width: 100vw !important;
            width: 100% !important;
            overflow-x: hidden !important;
          }
          section.hero {
            background: #0a0604 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            box-sizing: border-box !important;
          }
          section.hero::before {
            display: none !important;
          }
          .hero-glow-orb {
            display: none !important;
          }
        }
      `}</style>

      {/* Layer 1: video in BACKGROUND, recessed and atmospheric */}
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
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.45,
          transform: 'scaleX(2.2)',
          transformOrigin: 'center center',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: HEAVY dark layer UNDERNEATH the content, ABOVE the video */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          background: 'rgba(15, 6, 3, 0.65)',
        }}
      />
    </>
  )
}
