import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="lc-footer">
      <div className="footer-logo">
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" />
        </Link>
      </div>
      <p style={{ color: '#7a7f8e', fontSize: '14px', marginBottom: '20px', maxWidth: '400px', margin: '12px auto 20px' }}>
        Form abandonment recovery for high-ticket service businesses. Capture every lead. Recover lost revenue.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Link href="/test-form" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Live Demo</Link>
        <Link href="/start-trial" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Start Free Trial</Link>
        <Link href="/about" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>About</Link>
        <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Insights</Link>
        <Link href="/compare" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Compare</Link>
        <Link href="/calculator" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>ROI Calculator</Link>
        <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
        <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
      </div>
      <p style={{ color: '#555', fontSize: '12px' }}>&copy; 2026 ReCapture</p>
      <p style={{ color: '#555', fontSize: '12px' }}>Born &amp; Built in Dallas, Texas</p>
      <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>hello@userecapture.com</p>
    </footer>
  )
}
