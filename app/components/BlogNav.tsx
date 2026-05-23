import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import Logo from './Logo'

export default function BlogNav() {
  return (
    <nav className="lc-nav">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Logo />
      </Link>
      <MobileNav />
    </nav>
  )
}
