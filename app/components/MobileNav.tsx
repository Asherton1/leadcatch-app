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
        <Link href="/why-us" className={isActive('/why-us') ? 'nav-link nav-active' : 'nav-link'}>Why Us</Link>
        <Link href="/how-it-works" className={isActive('/how-it-works') ? 'nav-link nav-active' : 'nav-link'}>How It Works</Link>
        <Link href="/integrations" className={isActive('/integrations') ? 'nav-link nav-active' : 'nav-link'}>Integrations</Link>
        <Link href="/form-audit" className={isActive('/form-audit') ? 'nav-link nav-active' : 'nav-link'}>Free Audit</Link>
        <Link href="/calculator" className={isActive('/calculator') ? 'nav-link nav-active' : 'nav-link'}>ROI Estimator</Link>

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

      <div
        className="nav-mobile-menu"
        style={{
          maxHeight: open ? '800px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div style={{ padding: '1rem 0' }} onClick={() => setOpen(false)}>
          <Link href="/about" className={isActive('/about') ? 'mobile-link-active' : ''}>About</Link>
          <Link href="/blog" className={isActive('/blog') ? 'mobile-link-active' : ''}>Insights</Link>
          <Link href="/pricing" className={isActive('/pricing') ? 'mobile-link-active' : ''}>Pricing</Link>
          <Link href="/test-form" className={isActive('/test-form') ? 'mobile-link-active' : ''}>Live Demo</Link>
          <Link href="/why-us" className={isActive('/why-us') ? 'mobile-link-active' : ''}>Why Us</Link>
          <Link href="/how-it-works" className={isActive('/how-it-works') ? 'mobile-link-active' : ''}>How It Works</Link>
          <Link href="/integrations" className={isActive('/integrations') ? 'mobile-link-active' : ''}>Integrations</Link>
          <Link href="/form-audit" className={isActive('/form-audit') ? 'mobile-link-active' : ''}>Free Audit</Link>
          <Link href="/calculator" className={isActive('/calculator') ? 'mobile-link-active' : ''}>ROI Estimator</Link>
          <Link href="/login" className={isActive('/login') ? 'mobile-link-active' : ''}>Login</Link>
          <Link href="/start-trial" className="nav-mobile-cta">Start Free Trial</Link>
        </div>
      </div>
    </>
  )
}
