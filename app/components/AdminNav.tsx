'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './AdminNav.css'

export default function AdminNav() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin', label: 'Admin' },
    { href: '/dashboard/outreach', label: 'Outreach' },
    { href: '/admin/sms-templates', label: 'SMS' },
  ]

  return (
    <nav className="admin-nav">
      <Link href="/dashboard" className="admin-nav-logo">
        <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
          <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
          <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
        </svg>
        <span className="admin-nav-logo-text">
          <span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span>
        </span>
      </Link>

      <div className="admin-nav-pills">
        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-pill ${isActive ? 'admin-nav-pill-active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      <div className="admin-nav-right">
        <Link href="/settings" className="admin-nav-link">Settings</Link>
        <Link href="/" className="admin-nav-link admin-nav-link-public-site">Public Site</Link>
      </div>
    </nav>
  )
}
