'use client'

import { useEffect } from 'react'

/**
 * Cursor-tracked highlight for every card on the page.
 *
 * Sets --mx / --my on whichever card the pointer is over so CSS can draw a
 * soft radial sheen that follows it. One delegated listener for the whole
 * document rather than one per card, and it writes to a CSS variable
 * instead of to style properties that trigger layout.
 */

const SELECTOR = '.dir-card, .leak-row, .sfl-card, .ind-card, .ts-card, .fs-tab, .dir-window, .lcd-form-card, .lcd-panel'

export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null

    const flush = () => {
      frame = 0
      if (!pending) return
      pending.el.style.setProperty('--mx', pending.x + '%')
      pending.el.style.setProperty('--my', pending.y + '%')
      pending = null
    }

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const card = target?.closest?.(SELECTOR) as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      pending = {
        el: card,
        x: Math.round(((e.clientX - r.left) / r.width) * 100),
        y: Math.round(((e.clientY - r.top) / r.height) * 100),
      }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
