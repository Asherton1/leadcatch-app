import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="lc-footer">
      {/* Logo + tagline */}
      <div className="footer-top">
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" />
        </Link>
        <p className="footer-tagline">
          Form abandonment recovery for high-ticket service businesses.
          <br />Capture every lead. Recover lost revenue.
        </p>
      </div>

      <div className="footer-divider" />

      {/* 4-column nav grid */}
      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-col-label">Product</p>
          <Link href="/pricing" className="footer-link">Pricing</Link>
          <Link href="/why-us" className="footer-link">Why Us</Link>
          <Link href="/how-it-works" className="footer-link">How It Works</Link>
          <Link href="/integrations" className="footer-link">Integrations</Link>
          <Link href="/demo" className="footer-link">Live Demo</Link>
          <Link href="/form-audit" className="footer-link">Free Form Audit</Link>
          <Link href="/calculator" className="footer-link">ROI Estimator</Link>
          <Link href="/docs/api" className="footer-link">API Docs</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">Company</p>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/blog" className="footer-link">Insights</Link>
          <Link href="/start-trial" className="footer-link">Start Trial</Link>
          <Link href="/login" className="footer-link">Login</Link>
          <a href="mailto:hello@userecapture.com" className="footer-link">Contact</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">Industries</p>
          <Link href="/for-med-spas" className="footer-link">Med Spas</Link>
          <Link href="/for-dental" className="footer-link">Dental</Link>
          <Link href="/for-plastic-surgery" className="footer-link">Plastic Surgery</Link>
          <Link href="/for-luxury-real-estate" className="footer-link">Luxury Real Estate</Link>
          <Link href="/for-property-management" className="footer-link">Property Mgmt</Link>
          <Link href="/for-luxury-auto" className="footer-link">Luxury Auto</Link>
          <Link href="/for-gohighlevel" className="footer-link">GoHighLevel</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">Legal</p>
          <Link href="/baa" className="footer-link">BAA</Link>
          <Link href="/privacy" className="footer-link">Privacy</Link>
          <Link href="/terms" className="footer-link">Terms</Link>
        </div>
      </div>

      <div className="footer-divider" />

      {/* Trust Badges */}
      <div className="footer-trust">
        <div className="footer-trust-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
          <span>HIPAA Compliant</span>
        </div>
        <span className="footer-trust-sep">|</span>
        <Link href="/baa" className="footer-trust-item footer-trust-link">
          <svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>BAA</span>
        </Link>
        <span className="footer-trust-sep">|</span>
        <div className="footer-trust-item">
          <svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>SSL Secured</span>
        </div>
        <span className="footer-trust-sep">|</span>
        <div className="footer-trust-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
          <span>Payments by Stripe</span>
        </div>
        <span className="footer-trust-sep">|</span>
        <div className="footer-trust-item">
          <svg width="13" height="13" viewBox="0 0 100 100" fill="currentColor"><path d="M10 10 L10 55 L25 55 L25 70 L40 85 L55 90 L70 80 L85 60 L90 40 L75 25 L75 10 L50 10 L50 20 L10 10Z"/></svg>
          <span>Dallas, TX</span>
        </div>
      </div>

      {/* Copyright row */}
      <div className="footer-bottom">
        <p>&copy; 2026 ReCapture &nbsp;&middot;&nbsp; Born &amp; Built in Dallas, Texas</p>
        <p>
          <a href="mailto:hello@userecapture.com" className="footer-bottom-link">hello@userecapture.com</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:+18886060630" className="footer-bottom-link">(888) 606-0630</a>
        </p>
      </div>
    </footer>
  )
}
