'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="nav-desktop">
        <Link href="/about">About</Link>
        <Link href="/blog">Insights</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/test-form">Demo</Link>
        <Link href="/compare">Compare</Link>
        <Link href="/signup">Start Trial</Link>
        <Link href="/login" style={{ color: "#ff6b35", border: "1px solid rgba(255,107,53,0.4)", padding: "0.4rem 1rem", borderRadius: "6px" }}>Login</Link>
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
          <Link href="/#pricing">Pricing</Link>
          <Link href="/test-form">Demo</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup" className="nav-mobile-cta">Start Free Trial</Link>
        </div>
      )}
    </>
  )
}
