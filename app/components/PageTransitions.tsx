'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PageTransitions() {
  const router = useRouter()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return
      
      const href = link.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#')) return
      if (link.getAttribute('target') === '_blank') return
      
      // Internal link — add transition
      e.preventDefault()
      
      const landing = document.querySelector('.landing')
      const blogPost = document.querySelector('.blog-post')
      const container = (landing || blogPost || document.body) as HTMLElement
      
      container.classList.add('page-transitioning')
      
      setTimeout(() => {
        router.push(href)
      }, 300)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [router])

  // Fade in on mount
  useEffect(() => {
    const landing = document.querySelector('.landing')
    const blogPost = document.querySelector('.blog-post')
    const container = (landing || blogPost || document.body) as HTMLElement
    
    container.style.opacity = '0'
    container.style.transform = 'translateY(8px)'
    container.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.style.opacity = '1'
        container.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return null
}
