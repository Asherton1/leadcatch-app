'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — Bloom AI video background (v3: scaled even-fill)
 * -----------------------------------------------------------------
 * Fixes:
 *  - Video transform: scale(1.5) zooms in so the planet fills more of the frame
 *    instead of sitting in the left portion with an empty right side.
 *  - Wash is now a UNIFORM warm dark tint instead of radial gradients, so no
 *    bright orange hot spots fighting the headline.
 *  - Both layers use left: calc(50% - 50vw); width: 100vw to break out of any
 *    parent max-width and span the full viewport.
 *
 * Gated at >=768px (tablet+). Mobile falls through to existing hero gradients.
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
      {/* Layer 1: scaled, dimmed video filling full viewport width */}
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
          opacity: 0.55,
          filter: 'saturate(0.75) brightness(0.88)',
          transform: 'scale(1.5)',
          transformOrigin: 'center center',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: uniform warm dark wash, evenly across the whole hero */}
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
          background: 'rgba(30, 12, 5, 0.40)',
        }}
      />
    </>
  )
}
