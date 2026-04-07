import Link from 'next/link'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import PricingSection from './components/PricingSection'

export const metadata = {
  title: 'ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Born &amp; Built in Dallas, Texas.',
}

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="ambient-bg" />
      <GSAPAnimations />

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link href="/blog" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500 }}>Insights</Link>
          <Link href="/login" className="nav-cta">Login</Link>
        </div>
      </nav>

      <section className="hero">
        
        <p className="hero-eyebrow">Born &amp; Built in Dallas, Texas</p>
        <h1 className="hero-animate">
          You&apos;re Losing<br />
          <span className="hero-highlight">60% of Your Leads</span><br />
          Here&apos;s the Proof.
        </h1>
        <p className="hero-subtitle hero-animate-delay">
          Every day, high-value prospects start filling out your contact form — then vanish before hitting submit.
          ReCapture captures their info the moment they start typing and gives you a second chance to close the deal.
        </p>
        <div className="cta-group hero-animate-delay2">
          <Link href="/test-form" className="cta-primary">Try the Live Demo</Link>
          <Link href="/signup" className="cta-secondary">Start Free Trial</Link>
        </div>

        {/* Dashboard Demo GIF */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '160px auto 80px',
          padding: '0 20px',
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            boxShadow: '0 0 60px rgba(255, 107, 53, 0.08), 0 0 120px rgba(255, 107, 53, 0.04)',
          }}>
            <video
              src="/dashboard-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#7a7f8e',
            marginTop: '16px',
            letterSpacing: '0.3px',
          }}>
            Live dashboard — leads captured the moment they start typing
          </p>
        </div>
      </section>

      <div className="stats-bridge">
        <StatsBar />
      </div>

      <section className="lc-section">
        <h2 className="section-title">The Invisible Revenue Leak</h2>
        <div className="problem-grid">
          <div className="problem-card fade-up">
            <div className="problem-number">01</div>
            <h3 className="problem-title">They Start. Then Vanish.</h3>
            <p className="problem-text">
              A prospect finds your site, opens your form, types their name and email — then their phone buzzes.
              They switch tabs. They never come back. And you never knew they existed.
            </p>
          </div>
          <div className="problem-card fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="problem-number">02</div>
            <h3 className="problem-title">Every Extra Field Costs You</h3>
            <p className="problem-text">
              Five fields might seem reasonable — but data shows most visitors abandon after three.
              Every extra field is a silent conversion killer. And until now, you had no way to see it.
            </p>
          </div>
          <div className="problem-card fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="problem-number">03</div>
            <h3 className="problem-title">Ghost Leads Are Bleeding You Dry</h3>
            <p className="problem-text">
              If 100 visitors start your form and 60 don&apos;t finish, that&apos;s 15–20 lost bookings per month.
              For a $1,500 average service, that&apos;s $22k–$30k walking out the door. Every single month.
            </p>
          </div>
        </div>
      </section>

      <section className="lc-section how-it-works-section">
        <h2 className="section-title">Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <div className="how-it-works-grid">
          <div className="how-step">
            <div className="how-step-num">01</div>
            
            <h3 className="how-step-title">Install in 60 Seconds</h3>
            <p className="how-step-text">Copy one line of code into your website. Works with WordPress, Wix, Webflow, Squarespace, or any custom site. Takes less time than making coffee.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">02</div>
            
            <h3 className="how-step-title">Capture Every Lead</h3>
            <p className="how-step-text">The instant a visitor types into your form, ReCapture captures their name, email, and phone — even if they close the tab, get distracted, or abandon halfway through.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">03</div>
            
            <h3 className="how-step-title">Recover Lost Revenue</h3>
            <p className="how-step-text">Reach out manually from your dashboard or let ReCapture send automated recovery emails on your behalf. Turn invisible drop-offs into booked appointments and closed revenue.</p>
          </div>
        </div>
      </section>

      <section className="lc-section screenshot-section">
        <h2 className="section-title">Every Lost Lead. Right In Front of You.</h2>
        <p className="section-subtitle">Names. Emails. Phone numbers. Dollar amounts. Every lead that slipped away — now right in front of you.</p>
        <div className="screenshot-glow-wrap">
          <div className="screenshot-glow" />
          <div className="screenshot-mock">
            <div className="mock-bar">
              <span /><span /><span />
            </div>
            <div className="mock-content">
              <div className="mock-stat"><div className="mock-num">47</div><div className="mock-label">Abandoned Leads</div></div>
              <div className="mock-stat"><div className="mock-num orange">$51,700</div><div className="mock-label">Revenue at Risk</div></div>
              <div className="mock-stat"><div className="mock-num">12</div><div className="mock-label">Recovered</div></div>
              <div className="mock-stat"><div className="mock-num">$13,200</div><div className="mock-label">Recovered Revenue</div></div>
            </div>
            <div className="mock-rows">
              {['Sarah M.', 'James R.', 'Kelsey T.', 'David L.'].map((name, i) => (
                <div className="mock-row" key={i}>
                  <div className="mock-avatar">{name[0]}</div>
                  <div className="mock-info">
                    <div className="mock-name">{name}</div>
                    <div className="mock-email">{name.toLowerCase().replace(' ', '.')}@gmail.com</div>
                  </div>
                  <div className={`mock-status ${i === 0 ? 'status-converted' : i === 1 ? 'status-contacted' : 'status-open'}`}>
                    {i === 0 ? 'Converted' : i === 1 ? 'Contacted' : 'Open'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lc-section">
        <h2 className="section-title">Built to Recover Revenue</h2>
        <p className="section-subtitle">One script tag. Full automation. Every feature designed to bring leads back.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Universal Tracking</h3>
            <p className="feature-card-text">One script tag works on any website — WordPress, Wix, Webflow, custom HTML. Zero configuration required.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/><path d="M13 2.05A10 10 0 0 1 22 12"/><path d="M11 21.95A10 10 0 0 1 2 12"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Real-Time Capture</h3>
            <p className="feature-card-text">Contact details captured the instant a visitor starts typing — even if they never hit submit.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Revenue Estimation</h3>
            <p className="feature-card-text">Every abandoned lead shows its dollar value based on your average service price. See exactly how much revenue is walking out the door.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Email Auto-Recovery</h3>
            <p className="feature-card-text">ReCapture automatically emails abandoned leads on your behalf — instantly or on a delay you set.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Status Tracking</h3>
            <p className="feature-card-text">Track every lead through your pipeline — Open, Contacted, Converted, or Lost. Know your exact recovery rate at a glance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Analytics Dashboard</h3>
            <p className="feature-card-text">Real-time metrics, revenue tracking, and complete visibility into every lead — updated the moment someone touches your form.</p>
          </div>
        </div>
      </section>

      <PricingSection />



      <section className="final-cta">
        <div className="final-cta-glow" />
        <h2>Stop Losing Revenue.<br />Start Recovering Leads.</h2>
        <p>7-day free trial. Cancel anytime. If you&apos;re losing leads, you&apos;ll know within 48 hours.</p>
        <div className="cta-group" style={{ justifyContent: 'center' }}>
          <Link href="/test-form" className="cta-primary">Try the Live Demo</Link>
          <Link href="/signup" className="cta-secondary">Start Free Trial</Link>
        </div>
      </section>

      <footer className="lc-footer">
        <div className="footer-logo">
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
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
          <Link href="/signup" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Start Free Trial</Link>
          <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Insights</Link>
          <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
          <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
        </div>
        <p style={{ color: '#555', fontSize: '12px' }}>© 2026 ReCapture</p>
        <p style={{ color: '#555', fontSize: '12px' }}>Born & Built in Dallas, Texas 🤘</p>
      </footer>
    </div>
  )
}
