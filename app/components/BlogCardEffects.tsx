'use client'

import { useEffect } from 'react'

export default function BlogCardEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // skip on touch / no-hover devices
    if (window.matchMedia('(hover: none)').matches) return

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.blog-more a'))
    const cleanups: Array<() => void> = []

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const ry = (px - 0.5) * 6   // rotateY, ~3deg each way
        const rx = (0.5 - py) * 6   // rotateX
        card.style.transform =
          `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`
        card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
        card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
      }
      const onLeave = () => {
        card.style.transform = ''
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((c) => c())
  }, [])

  return null
}
