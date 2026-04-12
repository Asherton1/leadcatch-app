'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BlogNav() {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  const isActive = (href: string) => {
    if (href === '/#pricing') return false
    return path === href || path.startsWith(href + '/')
  }

  return (
    <nav className="lc-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
          <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
          <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
        </svg>
        <span><span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.25rem' }}>Capture</span></span>
      </Link>

      <div className="nav-desktop">
        <Link href="/about" className={isActive('/about') ? 'nav-link nav-active' : 'nav-link'}>About</Link>
        <Link href="/blog" className={isActive('/blog') ? 'nav-link nav-active' : 'nav-link'}>Insights</Link>
        <Link href="/#pricing" className="nav-link">Pricing</Link>
        <Link href="/test-form" className={isActive('/test-form') ? 'nav-link nav-active' : 'nav-link'}>Demo</Link>
        <Link href="/compare" className={isActive('/compare') ? 'nav-link nav-active' : 'nav-link'}>Compare</Link>
        <Link href="/start-trial" className={isActive('/start-trial') ? 'nav-link nav-active' : 'nav-link'}>Start Trial</Link>
        <Link href="/login" className="nav-login">Login</Link>
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{ display: 'none', flexDirection: 'column', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
      >
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? 'transparent' : '#888', transition: 'all 0.3s' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
      </button>

      {open && (
        <div className="nav-mobile-menu" onClick={() => setOpen(false)} style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 100 }}>
          <Link href="/about" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>About</Link>
          <Link href="/blog" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>Insights</Link>
          <Link href="/#pricing" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>Pricing</Link>
          <Link href="/test-form" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>Demo</Link>
          <Link href="/compare" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>Compare</Link>
          <Link href="/login" style={{ color: '#bbb', textDecoration: 'none', fontSize: '1rem' }}>Login</Link>
          <Link href="/start-trial" style={{ color: '#ff6b35', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}>Start Free Trial</Link>
        </div>
      )}
    </nav>
  )
}
