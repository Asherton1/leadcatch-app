import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'

export default function BlogNav() {
  return (
    <nav className="lc-nav">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image src="/logo.png" alt="ReCapture" width={130} height={34} style={{ height: '28px', width: 'auto' }} priority />
      </Link>
      <MobileNav />
    </nav>
  )
}
