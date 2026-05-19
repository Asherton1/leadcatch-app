'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture — v9: single video, no dark wash, content on forefront
 * --------------------------------------------------------------------
 * - Single dim video layer (opacity 0.5 + filter) — ambient background
 * - NO dark wash overlay (removes "the dark box")
 * - .hero-right background killed (removes the dark column behind the form)
 * - .hero overflow:visible (lets video extend beyond .hero bounds)
 * - width:100vw + left:calc(50% - 50vw) (forces full viewport width)
 * - scaleX(2.5) (stretches Earth across the full width)
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
            max-width: none !important;
            width: 100% !important;
            overflow-x: hidden !important;
          }
          section.hero {
            background: #0a0604 !important;
            width: 100vw !important;
            max-width: none !important;
            min-width: 100vw !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            overflow: visible !important;
            box-sizing: border-box !important;
          }
          section.hero::before {
            display: none !important;
          }
          .hero-glow-orb {
            display: none !important;
          }
          /* kill the dark column behind the form mockup */
          .hero-right {
            background: transparent !important;
            background-color: transparent !important;
          }
        }
      `}</style>

      {/* Single dim video. No wash. */}
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
          opacity: 0.5,
          filter: 'saturate(0.65) brightness(0.55)',
          transform: 'scaleX(2.5)',
          transformOrigin: 'center center',
        }}
      >
        <source src="/bloom-hero.mp4" type="video/mp4" />
      </video>
    </>
  )
}
