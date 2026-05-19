'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — Bloom AI Earth video background (v5: opaque base + video + tint)
 * ---------------------------------------------------------------------------------
 * Three-layer stack to fix the asymmetric brightness issue caused by .hero's
 * underlying orange radial gradients bleeding through where the video frame
 * is dark.
 *
 * Layer 0 (z-index 0): OPAQUE dark warm base, full viewport width. Blocks
 *   the .hero's natural background from showing through anywhere.
 * Layer 1 (z-index 1): Earth video, native aspect, full width via 100vw.
 * Layer 2 (z-index 2): Subtle warm brand tint on top.
 *
 * Result: hero is uniformly dark across the whole width. Earth content shows
 * through where the video has it; dark areas just sit on top of the dark
 * base — same dark consistency edge-to-edge. No more orange bleed-through.
 *
 * Gated at >=768px (tablet+). Mobile gets the existing .hero background.
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
      {/* Layer 0: opaque dark warm base — blocks .hero background from bleeding through */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(50% - 50vw)',
          width: '100vw',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          background: '#0a0604',
        }}
      />

      {/* Layer 1: video at native aspect, full viewport width */}
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
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: subtle warm brand tint, uniform across the whole hero */}
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
          background: 'rgba(40, 16, 6, 0.35)',
        }}
      />
    </>
  )
}
