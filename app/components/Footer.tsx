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
      <p style={{ color: '#7a7f8e', fontSize: '14px', marginBottom: '20px', maxWidth: '700px', margin: '12px auto 20px' }}>
        Form abandonment recovery for high-ticket service businesses.<br />Capture every lead. Recover lost revenue.
      </p>

      {/* Nav links — hidden on mobile */}
      <div className="footer-nav-links" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <Link href="/about" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>About</Link>
        <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Insights</Link>
        <Link href="/pricing" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Pricing</Link>
        <Link href="/demo" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Live Demo</Link>
        <Link href="/why-us" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Why Us</Link>
        <Link href="/how-it-works" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>How It Works</Link>
        <Link href="/integrations" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Integrations</Link>
        <Link href="/docs/api" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>API Docs</Link>
        <Link href="/form-audit" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Free Form Audit</Link>
        <Link href="/calculator" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>ROI Estimator</Link>
        <Link href="/start-trial" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Start Trial</Link>
        <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
        <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>      </div>
      <div style={{ borderTop: '1px solid #1e1e1e', maxWidth: '500px', margin: '0 auto' }} className="footer-nav-links" />

      {/* Vertical pages — hidden on mobile */}
      <div className="footer-nav-links" style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px auto', flexWrap: 'wrap' }}>
        <Link href="/for-gohighlevel" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>GoHighLevel</Link>
        <Link href="/for-luxury-real-estate" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Real Estate</Link>
        <Link href="/for-luxury-auto" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Luxury Auto</Link>
        <Link href="/for-plastic-surgery" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Plastic Surgery</Link>
        <Link href="/for-property-management" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Property Mgmt</Link>
        <Link href="/for-med-spas" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Med Spas</Link>
        <Link href="/for-dental" style={{ color: '#555', textDecoration: 'none', fontSize: '11px' }}>Dental</Link>
      </div>
      <div style={{ borderTop: '1px solid #1e1e1e', maxWidth: '500px', margin: '0 auto' }} className="footer-nav-links" />

      {/* Trust Badges — always visible */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '24px 0', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
          <span style={{ color: '#444', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>HIPAA Compliant</span>
        </div>
        <span style={{ color: '#2a2a2a', fontSize: '11px' }}>|</span>
        <Link href="/baa" style={{ color: '#444', textDecoration: 'none', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>BAA</Link>
        <span style={{ color: '#2a2a2a', fontSize: '11px' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{ color: '#444', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>SSL Secured</span>
        </div>
        <span style={{ color: '#2a2a2a', fontSize: '11px' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#444"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
          <span style={{ color: '#444', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>Payments by Stripe</span>
        </div>
        <span style={{ color: '#2a2a2a', fontSize: '11px' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="13" height="13" viewBox="0 0 100 100" fill="#444"><path d="M10 10 L10 55 L25 55 L25 70 L40 85 L55 90 L70 80 L85 60 L90 40 L75 25 L75 10 L50 10 L50 20 L10 10Z"/></svg>
          <span style={{ color: '#444', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>Dallas, TX</span>
        </div>
      </div>
      <p style={{ color: '#555', fontSize: '12px' }}>&copy; 2026 ReCapture</p>
      <p style={{ color: '#555', fontSize: '12px' }}>Born &amp; Built in Dallas, Texas</p>
      <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>hello@userecapture.com</p>
      <p style={{ color: '#555', fontSize: '12px' }}><a href="tel:+18886060630" style={{ color: '#555', textDecoration: 'none' }}>(888) 606-0630</a></p>
    </footer>
  )
}
