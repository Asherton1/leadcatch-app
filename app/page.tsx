import Link from 'next/link'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import PricingSection from './components/PricingSection'

export const metadata = {
  title: 'ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
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
        <Link href="/login" className="nav-cta">Login</Link>
      </nav>

      <section className="hero">
        
        <div className="hero-badge">
          <div className="badge-dot" />
          <span>Born in Dallas · Built for Elite Service Businesses</span>
        </div>
        <h1 className="hero-animate">
          You&apos;re Losing<br />
          <span className="hero-highlight">60% of Your Leads</span><br />
          Here&apos;s the Proof.
        </h1>
        <p className="hero-subtitle hero-animate-delay">
          Every day, prospects start filling out your form — then vanish before hitting submit.
          ReCapture catches them and shows you exactly where revenue is slipping away.
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
            <h3 className="problem-title">They Start, Then Disappear</h3>
            <p className="problem-text">
              A prospect finds your site, clicks your form, enters their name and email—then their phone rings.
              They switch tabs. They never return. You never knew they were there.
            </p>
          </div>
          <div className="problem-card fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="problem-number">02</div>
            <h3 className="problem-title">Your Form is Too Long</h3>
            <p className="problem-text">
              Five fields might seem reasonable, but data shows most people abandon after three.
              Every additional field is a conversion barrier you can&apos;t see—until now.
            </p>
          </div>
          <div className="problem-card fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="problem-number">03</div>
            <h3 className="problem-title">Leads Turn Into Ghosts</h3>
            <p className="problem-text">
              If 100 visitors start your form and 60 don&apos;t finish, that&apos;s 15–20 lost bookings per month.
              For a $1,500 average service, that&apos;s $22k–$30k walking out the door. Every single month.
            </p>
          </div>
        </div>
      </section>

      <section className="lc-section how-it-works-section">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-title">Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <div className="how-it-works-grid">
          <div className="how-step">
            <div className="how-step-num">01</div>
            
            <h3 className="how-step-title">Install in 60 Seconds</h3>
            <p className="how-step-text">Paste one script tag before your closing body tag. Works on any website — WordPress, Wix, Webflow, custom HTML. No developer needed.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">02</div>
            
            <h3 className="how-step-title">Capture Every Lead</h3>
            <p className="how-step-text">The moment someone types their name or email into your form, ReCapture saves it — even if they close the tab, get distracted, or never hit submit.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">03</div>
            
            <h3 className="how-step-title">Recover Lost Revenue</h3>
            <p className="how-step-text">Follow up directly from your dashboard or let automated emails do it for you. Turn silent abandonment into booked appointments and closed deals.</p>
          </div>
        </div>
      </section>

      <section className="lc-section screenshot-section">
        <div className="section-label">THE DASHBOARD</div>
        <h2 className="section-title">Every Lost Lead. Right In Front of You.</h2>
        <p className="section-subtitle">Real names. Real emails. Real money you can recover.</p>
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
        <div className="section-label">PRODUCT</div>
        <h2 className="section-title">How ReCapture Works</h2>
        <p className="section-subtitle">A single script tag on your website. Everything else is automated.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Universal Tracking</h3>
            <p className="feature-card-text">Works on any website, any form builder. One script tag, zero configuration.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/><path d="M13 2.05A10 10 0 0 1 22 12"/><path d="M11 21.95A10 10 0 0 1 2 12"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Real-Time Capture</h3>
            <p className="feature-card-text">Name, email, and phone captured the moment typed—even if the form is never submitted.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Revenue Estimation</h3>
            <p className="feature-card-text">See the exact dollar value of every abandoned lead based on your average client value.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Email Auto-Recovery</h3>
            <p className="feature-card-text">Automated follow-up emails sent immediately or on a custom delay.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Status Tracking</h3>
            <p className="feature-card-text">Mark leads as Open, Contacted, Converted, or Lost. Track your recovery rate.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Analytics Dashboard</h3>
            <p className="feature-card-text">Clean dashboard with real-time data, revenue metrics, and complete lead visibility.</p>
          </div>
        </div>
      </section>

      <PricingSection />



      <section className="final-cta">
        <div className="final-cta-glow" />
        <div className="section-label">GET STARTED</div>
        <h2>Stop Losing Revenue.<br />Start Recovering Leads.</h2>
        <p>Free 2-week trial. No credit card required to start. If you&apos;re losing leads, you&apos;ll know within 48 hours.</p>
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
          <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
          <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
        </div>
        <p style={{ color: '#555', fontSize: '12px' }}>© 2026 ReCapture</p>
        <p style={{ color: '#555', fontSize: '12px' }}>Born & Built in Dallas, Texas 🤘</p>
      </footer>
    </div>
  )
}
