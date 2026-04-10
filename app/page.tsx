import Link from 'next/link'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import PricingSection from './components/PricingSection'
import MobileNav from './components/MobileNav'

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
          {/* ROW 1 — The wow */}
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="feature-card-title">Real-Time Capture</h3>
            <p className="feature-card-text">The instant a visitor types into your form, their name, email, and phone are captured. Before they hit submit. Before they leave. Before you lose them.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="feature-card-title">The Invisible Pipeline</h3>
            <p className="feature-card-text">These leads don&apos;t exist in your CRM. They don&apos;t show up in Google Analytics. They never hit submit. But they were there — typing, interested, ready to book. We make them visible.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="feature-card-title">Revenue-at-Risk Calculator</h3>
            <p className="feature-card-text">Every abandoned lead shows its dollar value based on your average service price. Watch in real time as the revenue you&apos;re losing adds up — then recover it.</p>
          </div>

          {/* ROW 2 — The engine */}
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="feature-card-title">Universal Tracking</h3>
            <p className="feature-card-text">One script tag works on any website — WordPress, Wix, Webflow, Squarespace, custom HTML. Install in 60 seconds. Zero configuration.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="feature-card-title">Automated Recovery</h3>
            <p className="feature-card-text">ReCapture emails abandoned leads on your behalf automatically — with your branding, your name, and timing you control. They come back without you lifting a finger.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="feature-card-title">Lead Pipeline</h3>
            <p className="feature-card-text">Track every lead from capture to close — Open, Contacted, Converted, or Lost. Know your exact recovery rate and see which follow-ups are working.</p>
          </div>

          {/* ROW 3 — The intelligence */}
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
            </div>
            <h3 className="feature-card-title">Analytics Dashboard</h3>
            <p className="feature-card-text">Real-time metrics, revenue tracking, and complete visibility into every lead. Updated the moment someone touches your form. No guessing.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h3 className="feature-card-title">Connect to Any CRM</h3>
            <p className="feature-card-text">Send captured leads to HubSpot, Salesforce, GoHighLevel, or any tool you already use. Works with Zapier, Make, and custom webhooks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3 className="feature-card-title">Weekly Reports & Export</h3>
            <p className="feature-card-text">Performance reports delivered to your inbox every Monday. Export your leads to CSV anytime. Your data, your way, always accessible.</p>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="lc-section">
        <h2 className="section-title">What Our Clients Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }}>
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
          <Link href="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Login</Link>
          <a href="mailto:hello@userecapture.com" style={{ color: '#aaa', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
        </div>
        <p style={{ color: '#555', fontSize: '12px' }}>© 2026 ReCapture</p>
        <p style={{ color: '#555', fontSize: '12px' }}>Born & Built in Dallas, Texas 🤘</p>
      </footer>
    </div>
  )
}
