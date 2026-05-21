'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './OutreachSubNav.css'

type SubNavLink = {
  href: string
  label: string
  match: 'exact' | 'prefix'
}

const LINKS: SubNavLink[] = [
  { href: '/dashboard/outreach', label: 'Overview', match: 'exact' },
  { href: '/dashboard/outreach/manual', label: 'Cold Queue', match: 'prefix' },
  { href: '/dashboard/outreach/audits', label: 'Audit Pipeline', match: 'prefix' },
  { href: '/dashboard/outreach/partners', label: 'Partners', match: 'prefix' },
]

export default function OutreachSubNav() {
  const pathname = usePathname() || ''

  const isActive = (link: SubNavLink): boolean => {
    if (link.match === 'exact') return pathname === link.href
    return pathname === link.href || pathname.startsWith(link.href + '/')
  }

  return (
    <nav className="outreach-sub-nav">
      <div className="outreach-sub-nav-inner">
        {LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`outreach-sub-nav-pill ${isActive(link) ? 'outreach-sub-nav-pill-active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
