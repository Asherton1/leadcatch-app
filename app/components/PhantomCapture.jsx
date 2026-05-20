'use client'

import { useEffect, useRef } from 'react'

/**
 * PhantomCapture — v11: full-bleed video, desktop + mobile, fully responsive
 * --------------------------------------------------------------------------
 * Video sized with width:100vw + height:100% + object-fit:cover, so it adapts
 * to whatever .hero's dimensions are at any breakpoint. No screen-size gate.
 *
 * The .hero > * rule in landing.css (line 162) constrains every child of .hero
 * to max-width:1200px centered. We beat it with `section.hero > video.phantom-video`
 * which is more specific. !important locks it.
 *
 * Pseudo-elements (.hero::before, .hero::after) and .hero-glow-orb are hidden
 * so the orange mesh gradients don't bleed through the dim video.
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
        /* Beats .hero > * { max-width: 1200px; margin: auto; } from landing.css.
           Applies at every screen size — desktop, tablet, mobile. */
        section.hero > video.phantom-video {
          max-width: none !important;
          min-width: 100vw !important;
          width: 100vw !important;
          margin: 0 !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
        }
        /* Hide the hero's orange gradient pseudo-elements at every breakpoint */
        section.hero::before,
        section.hero::after,
        .hero-glow-orb {
          display: none !important;
        }
        /* Solid dark base on .hero (overrides desktop AND mobile @480px gradient) */
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
