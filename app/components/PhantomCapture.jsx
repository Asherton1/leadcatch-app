'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v12: full-bleed video, desktop + mobile, fully responsive
 * --------------------------------------------------------------------------
 * Adds .hero-scanline { display: none } so the orange scanning beam is
 * removed on mobile. Desktop had it hidden already via the original CSS.
 *
 * Everything else identical to v11.
 */
export default function PhantomCapture() {
  const videoRef = useRef(null)

  useEffect(() => {
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
  }, [])

  return (
    <>
      <style jsx global>{`
        section.hero > video.phantom-video {
          max-width: none !important;
          min-width: 100vw !important;
          width: 100vw !important;
          margin: 0 !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
        }
        section.hero::before,
        section.hero::after,
        .hero-glow-orb,
        .hero-scanline {
          display: none !important;
        }
        section.hero {
          background: #0a0604 !important;
        }
      `}</style>

      <video
        ref={videoRef}
        className="phantom-video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        preload="auto"
        style={{
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.5,
          filter: 'saturate(0.65) brightness(0.55)',
          transform: 'scaleX(2.0) translateZ(0)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>
    </>
  )
}
