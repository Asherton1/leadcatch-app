import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'

export default function BlogNav() {
  return (
    <nav className="lc-nav">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" priority />
      </Link>
      <MobileNav />
    </nav>
  )
}
