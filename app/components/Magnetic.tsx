'use client'

import { useEffect } from 'react'

/**
 * Magnetic buttons. Primary actions lean toward the cursor as it nears
 * them and spring back when it leaves. Delegated, rAF-batched, and only
 * on fine pointers, so phones and reduced-motion users get nothing.
 */
export default function Magnetic({ selector = '[data-magnetic]' }: { selector?: string }) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const RANGE = 90
    const PULL = 0.32
    let frame = 0
    let last: { x: number; y: number } | null = null

    const apply = () => {
      frame = 0
      if (!last) return
      const { x, y } = last
      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -RANGE || r.top > window.innerHeight + RANGE) return
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = x - cx
        const dy = y - cy
        const dist = Math.hypot(dx, dy)
        if (dist < r.width / 2 + RANGE) {
          el.style.transform = `translate(${dx * PULL}px, ${dy * PULL}px)`
          el.style.transition = 'transform .12s cubic-bezier(.2,.8,.3,1)'
        } else if (el.style.transform) {
          el.style.transform = ''
          el.style.transition = 'transform .45s cubic-bezier(.2,1.3,.4,1)'
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
      document.querySelectorAll<HTMLElement>(selector).forEach(el => { el.style.transform = '' })
    }
  }, [selector])

  return null
}
