'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v20: Dallas dusk video only (orbs removed)
 * --------------------------------------------------------------------------
 * Stripped to the cinematic video as the sole hero backdrop.
 */
export default function PhantomCapture() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const setRate = () => { v.playbackRate = 0.5 }
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
          margin: 0 !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          min-width: 100vw !important;
          width: 100vw !important;
        }
        section.hero::before,
        section.hero::after,
        .hero-glow-orb,
        .hero-scanline,
        .hero-particles {
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
          opacity: 0.45,
          filter: 'saturate(0.6) brightness(0.5)',
          transform: 'translateZ(0)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <source src="/dallas-hero.mp4" type="video/mp4" />
      </video>
    </>
  )
}
