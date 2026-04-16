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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Link href="/about" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>About</Link>
        <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Insights</Link>
        <Link href="/pricing" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Pricing</Link>
        <Link href="/test-form" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Live Demo</Link>
        <Link href="/why-us" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Why Us</Link>
        <Link href="/calculator" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>ROI Estimator</Link>
        <Link href="/start-trial" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Start Trial</Link>
        <Link href="/baa" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>BAA</Link>
        <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
        <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Link href="/for-gohighlevel" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>GoHighLevel</Link>
        <Link href="/for-luxury-real-estate" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Real Estate</Link>
        <Link href="/for-luxury-auto" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Luxury Auto</Link>
        <Link href="/for-plastic-surgery" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Plastic Surgery</Link>
        <Link href="/for-property-management" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Property Mgmt</Link>
        <Link href="/for-med-spas" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Med Spas</Link>
        <Link href="/for-dental" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>Dental</Link>
      </div>
      <p style={{ color: '#555', fontSize: '12px' }}>&copy; 2026 ReCapture</p>
      <p style={{ color: '#555', fontSize: '12px' }}>Born &amp; Built in Dallas, Texas</p>
      <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>hello@userecapture.com</p>
    </footer>
  )
}
