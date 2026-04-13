import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="lc-footer">
      <div className="footer-logo">
        <Link href="/" className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
            <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
            <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
          </svg>
          <span><span style={{ color: '#fff' }}>Re</span><span className="logo-accent">Capture</span></span>
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
        <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
        <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
      </div>
      <p style={{ color: '#555', fontSize: '12px' }}>&copy; 2026 ReCapture</p>
      <p style={{ color: '#555', fontSize: '12px' }}>Born &amp; Built in Dallas, Texas</p>
      <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>hello@userecapture.com</p>
    </footer>
  )
}
