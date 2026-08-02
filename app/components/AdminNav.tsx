'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import './AdminNav.css'
import Logo from './Logo'

const ADMIN_EMAILS = ['hello@userecapture.com', 'asherton@userecapture.com']

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email && ADMIN_EMAILS.includes(data.user.email)) {
        setIsAdmin(true)
      }
    })
  }, [])

  const allLinks = [
    { href: '/dashboard', label: 'Dashboard', adminOnly: false },
    { href: '/admin', label: 'Admin', adminOnly: true },
    { href: '/dashboard/outreach', label: 'Outreach', adminOnly: true },
    { href: '/admin/sms-templates', label: 'SMS', adminOnly: true },
  ]

  const links = allLinks.filter(link => !link.adminOnly || isAdmin)

  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (err) {
      console.error('Sign out failed:', err)
      setSigningOut(false)
    }
  }

  return (
    <nav className="admin-nav">
      <Link href="/dashboard" className="admin-nav-logo">
        <Logo />
      </Link>

      {links.length > 1 && <div className="admin-nav-pills">
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
      </div>}

      <div className="admin-nav-right">
        <Link href="/settings" className="admin-nav-link">Settings</Link>
        <Link href="/" className="admin-nav-link admin-nav-link-public-site">Public Site</Link>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="admin-nav-link admin-nav-link-signout"
          type="button"
        >
          {signingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </nav>
  )
}
