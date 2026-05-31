'use client'

import { useEffect } from 'react'

export default function HiwSpine() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const flow = document.querySelector('.hiw-flow') as HTMLElement | null
    if (!flow) return

    const steps = Array.from(flow.querySelectorAll<HTMLElement>('.hiw-step'))

    let raf = 0
    const update = () => {
      raf = 0
      const rect = flow.getBoundingClientRect()
      const vh = window.innerHeight
      const line = vh * 0.45
      const p = (line - rect.top) / rect.height
      const clamped = Math.max(0, Math.min(1, p))
      flow.style.setProperty('--hiw-fill', (clamped * 100).toFixed(2) + '%')

      // ignite each step once the activation line passes its midpoint
      for (const step of steps) {
        const r = step.getBoundingClientRect()
        const mid = r.top + r.height * 0.5
        if (mid <= line) step.classList.add('is-lit')
        else step.classList.remove('is-lit')
      }
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
