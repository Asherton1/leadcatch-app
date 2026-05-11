'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin', label: 'Admin' },
    { href: '/dashboard/outreach', label: 'Outreach' },
    { href: '/admin/sms-templates', label: 'SMS Templates' },
  ]

  return (
    <nav style={{
      background: '#0a0a0a',
      borderBottom: '1px solid #1a1a1a',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/dashboard" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        marginRight: '0.5rem',
      }}>
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
          <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
        </svg>
        <span style={{ fontSize: '1rem', fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isActive ? '#0a0a0a' : '#ff6b35',
                background: isActive ? '#ff6b35' : 'rgba(255,107,53,0.1)',
                border: '1px solid rgba(255,107,53,0.3)',
                borderRadius: '6px',
                padding: '6px 12px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <Link href="/settings" style={{
          color: '#888',
          fontSize: '0.8125rem',
          fontWeight: 500,
          textDecoration: 'none',
          marginRight: '1rem',
        }}>
          Settings
        </Link>
        <Link href="/" style={{
          color: '#888',
          fontSize: '0.8125rem',
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          Public Site
        </Link>
      </div>
    </nav>
  )
}
