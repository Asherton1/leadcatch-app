'use client'

import { useEffect, useState } from 'react'

/**
 * PhantomCapture — "Aurora Beams" hero background
 * ------------------------------------------------
 * Four long ribbons of warm orange light drift diagonally across the hero.
 * Each beam fades in at one edge of the screen, flows across at a slight
 * angle, fades out at the other edge. Different speeds, angles, vertical
 * positions, and staggered timings so the scene is always alive.
 *
 * No particles, no DOM text, no extraction metaphor. Pure atmospheric light.
 *
 * - Renders ONLY on viewports >= 1440px
 * - Returns null on tablet/mobile/standard desktop
 * - Pure CSS animations (GPU-accelerated transform + opacity)
 * - Respects prefers-reduced-motion (renders static dim beams, no flow)
 *
 * Place inside any parent that has `position: relative` AND
 * `isolation: isolate` (your .hero already has both).
 */
export default function PhantomCapture() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 1440)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  return (
    <>
      <style jsx>{`
        .ab-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .ab-beam {
          position: absolute;
          width: 70vw;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 107, 53, 0.5) 50%,
            transparent 100%
          );
          filter: blur(55px);
          will-change: transform, opacity;
        }
        .ab-beam-1 {
          top: -5%;
          height: 230px;
          animation: abFlow1 26s linear infinite;
        }
        .ab-beam-2 {
          top: 25%;
          height: 290px;
          animation: abFlow2 34s linear infinite;
          animation-delay: -8s;
        }
        .ab-beam-3 {
          top: 50%;
          height: 200px;
          animation: abFlow3 22s linear infinite;
          animation-delay: -14s;
        }
        .ab-beam-4 {
          top: 70%;
          height: 260px;
          animation: abFlow4 38s linear infinite;
          animation-delay: -20s;
        }
        @keyframes abFlow1 {
          0% {
            transform: translateX(-80vw) rotate(-22deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(110vw) rotate(-22deg);
            opacity: 0;
          }
        }
        @keyframes abFlow2 {
          0% {
            transform: translateX(-80vw) rotate(-32deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(110vw) rotate(-36deg);
            opacity: 0;
          }
        }
        @keyframes abFlow3 {
          0% {
            transform: translateX(-80vw) rotate(-18deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(110vw) rotate(-14deg);
            opacity: 0;
          }
        }
        @keyframes abFlow4 {
          0% {
            transform: translateX(-80vw) rotate(-44deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(110vw) rotate(-48deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-beam {
            animation: none;
            opacity: 0.3;
            transform: rotate(-25deg);
          }
        }
      `}</style>
      <div className="ab-wrap" aria-hidden="true">
        <div className="ab-beam ab-beam-1" />
        <div className="ab-beam ab-beam-2" />
        <div className="ab-beam ab-beam-3" />
        <div className="ab-beam ab-beam-4" />
      </div>
    </>
  )
}
