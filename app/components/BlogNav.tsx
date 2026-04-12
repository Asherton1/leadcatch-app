import Link from 'next/link'
import MobileNav from './MobileNav'

export default function BlogNav() {
  return (
    <nav className="lc-nav">
      <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
          <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
          <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
        </svg>
        <span><span style={{ color: '#fff' }}>Re</span><span className="logo-accent">Capture</span></span>
      </Link>
      <MobileNav />
    </nav>
  )
}
