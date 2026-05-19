'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — Bloom AI video background (full-bleed, dimmed, brand-coated)
 * -----------------------------------------------------------------------------
 * Layer stack (bottom to top within the hero stacking context):
 *   z-index 1: the Bloom AI video, edge-to-edge of the viewport, opacity 0.4,
 *              saturation/brightness dampened, playback at 0.5x.
 *   z-index 2: orange radial-gradient wash that "coats" the video so the brand
 *              warmth sits ON TOP of the motion. Video becomes ambient depth.
 *
 * Both layers break out of any parent width constraint via
 *   left: calc(50% - 50vw); width: 100vw
 * so even if .hero or .landing has a max-width, the video spans full viewport.
 *
 * Gated at >=768px (tablet+). Mobile gets the existing radial-gradient hero
 * background (no video, no orange overlay — falls through to .hero defaults).
 */
export default function PhantomCapture() {
  const [show, setShow] = useState(false)
  const videoRef = useRef(null)

  // Gate at tablet+ (>=768px)
  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Slow playback to 0.5x once video is mounted
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
      {/* Layer 1: full-bleed dimmed video */}
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
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.4,
          filter: 'saturate(0.65) brightness(0.85)',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2: brand orange wash that coats the video */}
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
          background:
            'radial-gradient(ellipse 90% 70% at 15% 20%, rgba(255, 107, 53, 0.34) 0%, transparent 55%),' +
            'radial-gradient(ellipse 70% 60% at 85% 15%, rgba(255, 107, 53, 0.26) 0%, transparent 55%),' +
            'radial-gradient(ellipse 80% 70% at 80% 90%, rgba(255, 107, 53, 0.30) 0%, transparent 55%),' +
            'radial-gradient(ellipse 60% 50% at 25% 85%, rgba(255, 107, 53, 0.22) 0%, transparent 55%),' +
            'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(20, 8, 4, 0.35) 0%, transparent 80%)',
        }}
      />
    </>
  )
}
