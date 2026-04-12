'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BlogNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="blog-nav">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <svg width="24" height="24" viewBox="0 0 36 36">
          <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
          <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
        </svg>
        <span><span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.25rem' }}>Capture</span></span>
      </Link>

      <div className="blog-nav-desktop">
        <Link href="/about">About</Link>
        <Link href="/blog">Insights</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/test-form">Demo</Link>
        <Link href="/compare">Compare</Link>
        <Link href="/start-trial">Start Trial</Link>
        <Link href="/login" style={{ color: "#ff6b35", border: "1px solid rgba(255,107,53,0.4)", padding: "0.4rem 1rem", borderRadius: "6px" }}>Login</Link>
      </div>

      <button
        className="blog-nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? 'transparent' : '#888', transition: 'all 0.3s' }} />
        <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#ff6b35' : '#888', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
      </button>

      {open && (
        <div className="blog-nav-mobile-menu" onClick={() => setOpen(false)}>
          <Link href="/about">About</Link>
          <Link href="/blog">Insights</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/test-form">Demo</Link>
        <Link href="/compare">Compare</Link>
          <Link href="/login">Login</Link>
          <Link href="/start-trial" className="blog-nav-mobile-cta">Start Free Trial</Link>
        </div>
      )}
    </nav>
  )
}
