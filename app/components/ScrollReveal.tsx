'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
    )

    // Observe both .reveal and .word-reveal elements
    const elements = document.querySelectorAll('.reveal, .word-reveal')
    elements.forEach(el => {
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (inViewport) {
        el.classList.add('revealed')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
