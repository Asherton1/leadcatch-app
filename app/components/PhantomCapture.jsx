'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — v10: actually full-bleed, content forward, single layer
 * ------------------------------------------------------------------------
 * The bug for 8 iterations was .hero > * { max-width: 1200px; margin: auto; }
 * in landing.css line 162. That rule applied to every direct child of .hero,
 * including the video element, clamping it to 1200px centered.
 *
 * Fix: video has className="phantom-video" so we can target it with
 * `section.hero > video.phantom-video` which wins on specificity over .hero > *.
 *
 * Also killing .hero::before, .hero::after, .hero-glow-orb so the video sits
 * on a solid dark base without orange bleed.
 *
 * Mobile (<768px): component returns null. Hero keeps its original styling.
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
          /* Beat the .hero > * { max-width: 1200px } rule that was constraining the video.
             Without this, video gets clamped to a 1200px centered column inside the hero. */
          section.hero > video.phantom-video {
            max-width: none !important;
            min-width: 100vw !important;
            width: 100vw !important;
            margin: 0 !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
          }
          /* Hide hero's orange gradient pseudo-elements so the video reads clean */
          section.hero::before {
            display: none !important;
          }
          section.hero::after {
            display: none !important;
          }
          .hero-glow-orb {
            display: none !important;
          }
          /* Solid dark base on .hero so dim video sits on consistent ground */
          section.hero {
            background: #0a0604 !important;
          }
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
