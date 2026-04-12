import Link from 'next/link'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import PricingSection from './components/PricingSection'
import MobileNav from './components/MobileNav'
import FeaturesAccordion from './components/FeaturesAccordion'
import ProblemAccordion from './components/ProblemAccordion'
import StepsAccordion from './components/StepsAccordion'

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
        <MobileNav />
      </nav>

      <section className="hero">
        
        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>Born &amp; Built in Dallas, Texas</p>
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
          margin: '80px auto 60px',
          padding: '0 10px',
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 107, 53, 0.25)',
            boxShadow: '0 0 80px rgba(255, 107, 53, 0.12), 0 0 160px rgba(255, 107, 53, 0.06)',
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
        <ProblemAccordion />
      </section>

      <section className="lc-section how-it-works-section">
        <h2 className="section-title">Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <StepsAccordion />
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
        <FeaturesAccordion />
      </section>

      <PricingSection />

      <section className="lc-section">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;We had no idea how many leads were starting our consultation form and dropping off. Within the first week, ReCapture surfaced 14 leads we never would have known about. Three of them booked. That alone paid for the year.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>R</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Richie H.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>Clear PH Design</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;As a healthcare practice, every qualified lead matters. ReCapture showed us exactly who was falling through the cracks on our intake forms. The dashboard is clean, the data is actionable, and the setup took less than two minutes.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Dave M.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>ESD Health</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;I was skeptical at first — another tracking tool? But ReCapture is different. It captures the leads that literally don&apos;t exist anywhere else. We recovered three high-value clients in the first month that we would have completely lost.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Dillon R.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>Business Owner</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;We run lead gen across multiple verticals and the drop-off between form views and submissions was always a black box. ReCapture opened that box. Now we see every lead that touches a form — and the ROI data makes reporting to stakeholders effortless.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>M</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Mike T.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>3Con Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <Link href="/about" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>About</Link>
          <Link href="/blog" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Insights</Link>
          <Link href="/compare" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Compare</Link>
          <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
          <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
        </div>
        <p style={{ color: '#555', fontSize: '12px' }}>© 2026 ReCapture</p>
        <p style={{ color: '#555', fontSize: '12px' }}>Born & Built in Dallas, Texas</p>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '8px' }}>hello@userecapture.com</p>
      </footer>
    </div>
  )
}
