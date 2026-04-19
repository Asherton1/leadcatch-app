'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
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
        <Link href="/why-us" className={isActive('/why-us') ? 'nav-link nav-active' : 'nav-link'}>Why Us</Link>
        <Link href="/how-it-works" className={isActive('/how-it-works') ? 'nav-link nav-active' : 'nav-link'}>How It Works</Link>
        <Link href="/integrations" className={isActive('/integrations') ? 'nav-link nav-active' : 'nav-link'}>Integrations</Link>
        <div className="nav-dropdown-wrapper">
          <span className="nav-link" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Tools <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
          <div className="nav-dropdown-menu">
            <Link href="/test-form" className="nav-dropdown-item">Live Demo</Link>
            <Link href="/calculator" className="nav-dropdown-item">ROI Estimator</Link>
            <Link href="/form-audit" className="nav-dropdown-item">Free Form Audit</Link>
          </div>
        </div>
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
          <Link href="/why-us" className={isActive('/why-us') ? 'mobile-link-active' : ''}>Why Us</Link>
          <Link href="/how-it-works" className={isActive('/how-it-works') ? 'mobile-link-active' : ''}>How It Works</Link>
          <Link href="/integrations" className={isActive('/integrations') ? 'mobile-link-active' : ''}>Integrations</Link>
          <div style={{ borderTop: '1px solid #1e1e1e', marginTop: '0.25rem' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setToolsOpen(!toolsOpen) }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                margin: 0,
              }}
            >
              <span style={{ color: toolsOpen ? '#ff6b35' : '#ccc', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.3s' }}>Tools</span>
              <span style={{ color: toolsOpen ? '#ff6b35' : '#555', fontSize: '1.1rem', transition: 'transform 0.3s, color 0.3s', transform: toolsOpen ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <div style={{
              maxHeight: toolsOpen ? '200px' : '0',
              opacity: toolsOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.2s ease',
            }}>
              <Link href="/test-form" className={isActive('/test-form') ? 'mobile-link-active' : ''} style={{ paddingLeft: '2.5rem' }}>Live Demo</Link>
              <Link href="/calculator" className={isActive('/calculator') ? 'mobile-link-active' : ''} style={{ paddingLeft: '2.5rem' }}>ROI Estimator</Link>
              <Link href="/form-audit" className={isActive('/form-audit') ? 'mobile-link-active' : ''} style={{ paddingLeft: '2.5rem' }}>Free Form Audit</Link>
            </div>
          </div>
          <Link href="/login" className={isActive('/login') ? 'mobile-link-active' : ''} style={{ color: '#ff6b35' }}>Login</Link>
          <Link href="/start-trial" className="nav-mobile-cta">Start Free Trial</Link>
        </div>
      </div>
    </>
  )
}
