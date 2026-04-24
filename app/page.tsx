import Link from 'next/link'
import ParticleNetwork from './components/ParticleNetwork'
import Image from 'next/image'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import ProblemAccordion from './components/ProblemAccordion'
import StepsAccordion from './components/StepsAccordion'
import IndustriesAccordion from './components/IndustriesAccordion'
import ScrollReveal from './components/ScrollReveal'
import GhostLeadDemoCompact from './components/GhostLeadDemoCompact'

export const metadata = {
  title: 'ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Born &amp; Built in Dallas, Texas.',
}

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="ambient-bg" />
      <GSAPAnimations />
      <ScrollReveal />

      <nav className="lc-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" priority />
          </Link>
        <MobileNav />
      </nav>

      <section className="hero">
        <ParticleNetwork />
        <div className="hero-glow-orb" />

        <div className="hero-split">
          <div className="hero-left">
            <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Born &amp; Built in Dallas, Texas</p>
            <h1 className="hero-animate">
              Your Best Leads<br />
              <span className="hero-highlight">Never Hit Submit.</span>
            </h1>
            <p className="hero-subtitle hero-animate-delay">
              Every day, high-value prospects start filling out your contact form — then vanish before hitting submit.
              ReCapture captures their info the moment they start typing and gives you a second chance to close the deal.
            </p>
            <div className="cta-group hero-animate-delay2">
              <Link href="/start-trial" className="cta-primary">Start Your 7-Day Free Trial</Link>
            </div>
          </div>
          <div className="hero-right hero-animate-delay2">
            <GhostLeadDemoCompact />
          </div>
        </div>
      </section>

      

      <section className="lc-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>The Invisible Revenue Leak</h2>
        <p className="section-subtitle">60–70% of form visitors start typing and never hit submit. Until now, you had no way to see them.</p>
        <StatsBar />
        <div className="section-divider" />
        <ProblemAccordion />
      </section>

      <div className="section-divider" />

      <section className="lc-section how-it-works-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <StepsAccordion />
      </section>

      <div className="section-divider" />

      <section className="lc-section screenshot-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Every Lost Lead. Right In Front of You.</h2>
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
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Built to Recover Revenue</h2>
        <p className="section-subtitle">One script tag. Full automation. Every feature designed to bring leads back.</p>
        <div className="top-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <div className="wow-card" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ai Voice Callback</h3>
            <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>Lead abandons your form with a phone number? Our Ai calls them back within 60 seconds on behalf of your business. Natural voice, real conversation, 391% higher conversion.</p>
          </div>
          <div className="wow-card" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Real-Time Capture</h3>
            <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>The instant a visitor types into your form, their name, email, and phone are captured. Before they hit submit. Before they leave. Before you lose them.</p>
          </div>
          <div className="wow-card" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Automated Recovery</h3>
            <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>ReCapture emails abandoned leads on your behalf automatically with your branding, your name, and timing you control. They come back without you lifting a finger.</p>
          </div>

        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/why-us" className="explore-features-link page-transition-link">
            Explore all features
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      <section className="industries-v2">
        <p className="iv2-eyebrow">§ Who it&apos;s for</p>
        <h2 className="iv2-headline">
          <span className="iv2-headline-primary">Purpose-built for industries</span>{' '}
          <span className="iv2-headline-muted">where one recovered lead pays for the entire year.</span>
        </h2>

        <div className="iv2-grid">
          <a href="/for-luxury-real-estate" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 01</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <line x1="8" y1="48" x2="48" y2="48"/>
                <line x1="12" y1="16" x2="12" y2="48"/>
                <line x1="22" y1="16" x2="22" y2="48"/>
                <line x1="34" y1="16" x2="34" y2="48"/>
                <line x1="44" y1="16" x2="44" y2="48"/>
                <polyline points="10,16 28,6 46,16"/>
                <line x1="16" y1="26" x2="18" y2="26"/>
                <line x1="26" y1="26" x2="30" y2="26"/>
                <line x1="38" y1="26" x2="40" y2="26"/>
                <line x1="16" y1="36" x2="18" y2="36"/>
                <line x1="26" y1="36" x2="30" y2="36"/>
                <line x1="38" y1="36" x2="40" y2="36"/>
              </svg>
            </div>
            <h3 className="iv2-stat">71%</h3>
            <p className="iv2-stat-caption">of property inquiries are abandoned</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Luxury Real Estate</h4>
              <p className="iv2-description">Avg. deal $12,000. One recovered buyer pays for the entire year.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>

          <a href="/for-luxury-auto" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 02</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <path d="M6 36 L12 22 L44 22 L50 36 Z"/>
                <line x1="6" y1="36" x2="50" y2="36"/>
                <circle cx="16" cy="42" r="4"/>
                <circle cx="40" cy="42" r="4"/>
                <line x1="18" y1="28" x2="38" y2="28"/>
              </svg>
            </div>
            <h3 className="iv2-stat">74%</h3>
            <p className="iv2-stat-caption">of vehicle inquiries never get submitted</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Luxury Auto</h4>
              <p className="iv2-description">Avg. deal $8,500. Capture buyers before they drive to the next lot.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>

          <a href="/for-plastic-surgery" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 03</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <circle cx="28" cy="28" r="18"/>
                <circle cx="28" cy="28" r="10"/>
                <circle cx="28" cy="28" r="1.5" fill="#ff6b35"/>
                <line x1="28" y1="4" x2="28" y2="14"/>
                <line x1="28" y1="42" x2="28" y2="52"/>
                <line x1="4" y1="28" x2="14" y2="28"/>
                <line x1="42" y1="28" x2="52" y2="28"/>
              </svg>
            </div>
            <h3 className="iv2-stat">72%</h3>
            <p className="iv2-stat-caption">of consultation forms are abandoned</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Plastic Surgery</h4>
              <p className="iv2-description">Avg. procedure $6,500. Recover patients who got cold feet.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>

          <a href="/for-property-management" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 04</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <rect x="8" y="8" width="40" height="40"/>
                <line x1="22" y1="8" x2="22" y2="48"/>
                <line x1="34" y1="8" x2="34" y2="48"/>
                <line x1="8" y1="22" x2="48" y2="22"/>
                <line x1="8" y1="34" x2="48" y2="34"/>
              </svg>
            </div>
            <h3 className="iv2-stat">70%</h3>
            <p className="iv2-stat-caption">of leasing inquiries are abandoned</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Property Management</h4>
              <p className="iv2-description">Avg. lease $3,200/yr. Enterprise dashboard for 10 to 500+ properties.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>

          <a href="/for-med-spas" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 05</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <polygon points="28,6 50,28 28,50 6,28"/>
                <polygon points="28,16 40,28 28,40 16,28"/>
                <circle cx="28" cy="28" r="2"/>
              </svg>
            </div>
            <h3 className="iv2-stat">67%</h3>
            <p className="iv2-stat-caption">of consultation forms are abandoned</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Med Spas</h4>
              <p className="iv2-description">Avg. client $2,800. Recover leads your ads already paid for.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>

          <a href="/for-dental" className="iv2-cell">
            <div className="iv2-cell-top">
              <span className="iv2-fig">FIG 06</span>
              <svg className="iv2-wireframe" viewBox="0 0 56 56" fill="none" stroke="#ff6b35" strokeWidth="1" strokeLinecap="round">
                <polyline points="8,42 14,18 22,32 28,14 34,32 42,18 48,42"/>
                <line x1="8" y1="42" x2="48" y2="42"/>
                <circle cx="14" cy="18" r="1.5" fill="#ff6b35"/>
                <circle cx="28" cy="14" r="1.5" fill="#ff6b35"/>
                <circle cx="42" cy="18" r="1.5" fill="#ff6b35"/>
              </svg>
            </div>
            <h3 className="iv2-stat">65%</h3>
            <p className="iv2-stat-caption">of appointment forms never get submitted</p>
            <div className="iv2-cell-bottom">
              <h4 className="iv2-industry">Dental Practices</h4>
              <p className="iv2-description">Avg. patient $1,900. Built for groups with 5 to 50+ offices.</p>
              <span className="iv2-link">Learn more <span className="iv2-arrow">&rarr;</span></span>
            </div>
          </a>
        </div>
      </section>



      <section className="lc-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>What Our Clients Say</h2>
        <div className="testimonials-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;We had no idea how many leads were starting our consultation form and dropping off. Within the first week, ReCapture surfaced 14 leads we never would have known about. Three of them booked. That alone paid for the year.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>R</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Richard H.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>Clear PH Design</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;As a healthcare practice, every qualified lead matters. ReCapture showed us exactly who was falling through the cracks on our intake forms. The dashboard is clean, the data is actionable, and the setup took less than two minutes.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>David M.</p>
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
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Michael T.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>3Con Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta reveal">
        <div className="final-cta-glow" />
        <h2>Stop Losing Revenue.<br />Start Recovering Leads.</h2>
        <p>7-day free trial. Cancel anytime. If you&apos;re losing leads, you&apos;ll know within 48 hours.</p>
        <div className="cta-group" style={{ justifyContent: 'center' }}>
          <Link href="/test-form" className="cta-primary">Try the Live Demo</Link>
          <Link href="/start-trial" className="cta-secondary">Start Your 7-Day Free Trial</Link>
        </div>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/pricing" className="page-transition-link" style={{ color: '#666', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>See Pricing &rarr;</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
