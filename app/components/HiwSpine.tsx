'use client'

import { useEffect } from 'react'

export default function HiwSpine() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const flow = document.querySelector('.hiw-flow') as HTMLElement | null
    if (!flow) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = flow.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the flow's top hits ~45% down the viewport,
      // 1 when its bottom reaches the same line
      const line = vh * 0.45
      const p = (line - rect.top) / rect.height
      const clamped = Math.max(0, Math.min(1, p))
      flow.style.setProperty('--hiw-fill', (clamped * 100).toFixed(2) + '%')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
