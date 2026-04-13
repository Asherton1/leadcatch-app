'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  const isActive = (href: string) => {
    if (href === '/#pricing') return false
    return path === href || path.startsWith(href + '/')
  }

  return (
    <>
      <div className="nav-desktop">
        <Link href="/about" className={isActive('/about') ? 'nav-link nav-active' : 'nav-link'}>About</Link>
        <Link href="/blog" className={isActive('/blog') ? 'nav-link nav-active' : 'nav-link'}>Insights</Link>
        <Link href="/pricing" className={isActive('/pricing') ? 'nav-link nav-active' : 'nav-link'}>Pricing</Link>
        <Link href="/test-form" className={isActive('/test-form') ? 'nav-link nav-active' : 'nav-link'}>Live Demo</Link>
        <Link href="/compare" className={isActive('/compare') ? 'nav-link nav-active' : 'nav-link'}>Compare</Link>
        <Link href="/calculator" className={isActive('/calculator') ? 'nav-link nav-active' : 'nav-link'}>ROI Estimator</Link>
        <Link href="/start-trial" className={isActive('/start-trial') ? 'nav-link nav-active' : 'nav-link'}>Start Trial</Link>
        <Link href="/login" className="nav-login">Login</Link>
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? 'transparent' : '#888', transition: 'all 0.3s' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
      </button>

      {open && (
        <div className="nav-mobile-menu" onClick={() => setOpen(false)}>
          <Link href="/about">About</Link>
          <Link href="/blog">Insights</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/test-form">Live Demo</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/calculator">ROI Estimator</Link>
          <Link href="/login">Login</Link>
          <Link href="/start-trial" className="nav-mobile-cta">Start Free Trial</Link>
        </div>
      )}
    </>
  )
}
