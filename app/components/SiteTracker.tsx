'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SKIP_PATHS = ['/demo-firm']

export default function SiteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (SKIP_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) return
    if (document.getElementById('rc-site-tracker')) return
    const el = document.createElement('script')
    el.id = 'rc-site-tracker'
    el.src = 'https://www.userecapture.com/track.js?key=admin_252bcf7523b0e813f2b470d2e0f61fd9'
    el.async = true
    document.body.appendChild(el)
  }, [pathname])

  return null
}
