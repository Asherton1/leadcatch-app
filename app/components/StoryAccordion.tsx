'use client'
import { useEffect } from 'react'
export default function StoryAccordion() {
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('details.about-story-v2-section')) as HTMLDetailsElement[]
    const cleanups: (() => void)[] = []
    secs.forEach((section) => {
      const summary = section.querySelector('.about-story-v2-summary') as HTMLElement | null
      const body = section.querySelector('.about-story-v2-body') as HTMLElement | null
      if (!summary || !body) return
      const onClick = (e: Event) => {
        e.preventDefault()
        if (section.open) {
          body.style.height = body.scrollHeight + 'px'
          requestAnimationFrame(() => { body.style.height = '0px'; body.style.opacity = '0' })
          const done = () => { section.open = false; body.style.height = ''; body.removeEventListener('transitionend', done) }
          body.addEventListener('transitionend', done)
        } else {
          section.open = true
          body.style.height = '0px'; body.style.opacity = '0'
          requestAnimationFrame(() => { body.style.height = body.scrollHeight + 'px'; body.style.opacity = '1' })
          const done = () => { body.style.height = ''; body.removeEventListener('transitionend', done) }
          body.addEventListener('transitionend', done)
        }
      }
      summary.addEventListener('click', onClick)
      cleanups.push(() => summary.removeEventListener('click', onClick))
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])
  return null
}
