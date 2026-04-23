import Link from 'next/link'
import ParticleNetwork from './components/ParticleNetwork'
import Image from 'next/image'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import StepsAccordion from './components/StepsAccordion'
import IndustriesAccordion from './components/IndustriesAccordion'
import ScrollReveal from './components/ScrollReveal'
import GhostLeadDemo from './components/GhostLeadDemo'

export const metadata = {
  title: 'ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Born & Built in Dallas, Texas.',
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

      {/* HERO */}
      <section className="hero">
        <ParticleNetwork />
        <div className="hero-glow-orb" />
        <p className="hero-eyebrow">Born & Built in Dallas, Texas</p>
        <h1 className="hero-animate">
          Your Best Leads<br />
          <span className="hero-highlight">Never Hit Submit.</span>
        </h1>
        <p className="hero-subtitle hero-animate-delay">
          Every day, high-value prospects start filling out your contact form — then vanish before hitting submit.
          ReCapture captures their info the moment they start typing and gives you a second chance to close the deal.
        </p>
        <div className="cta-group hero-animate-delay2">
          <Link href="/test-form" className="cta-primary">Try the Live Demo</Link>
          <Link href="/start-trial" className="cta-secondary">Start Your 7-Day Free Trial</Link>
        </div>

        <div className="hero-video-wrap">
          <div className="dashboard-video-wrap">
            <video src="/dashboard-demo.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <p className="hero-video-caption">Live dashboard — leads captured the moment they start typing</p>
        </div>
      </section>

      <StatsBar />

      {/* THE PROBLEM — ghost demo IS the problem visualization */}
      <section className="lc-section section-problem">
        <div className="section-inner-narrow">
          <p className="section-eyebrow">The Invisible Revenue Leak</p>
          <h2 className="section-title-editorial">
            60–70% of form visitors start typing.<br />
            <span className="section-title-muted">Most businesses never know they existed.</span>
          </h2>
        </div>
        <GhostLeadDemo />
        <div className="section-cta-inline">
          <Link href="/test-form" className="cta-primary">Try It Yourself</Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* HOW IT WORKS — steps */}
      <section className="lc-section">
        <div className="section-inner-narrow">
          <p className="section-eyebrow">How It Works</p>
          <h2 className="section-title-editorial">
            Three steps.<br />
            <span className="section-title-muted">Recovered revenue on autopilot.</span>
          </h2>
        </div>
        <StepsAccordion />
      </section>

      <div className="section-divider" />

      {/* FEATURES — unified */}
      <section className="lc-section">
        <div className="section-inner-narrow">
          <p className="section-eyebrow">Built for Recovery</p>
          <h2 className="section-title-editorial">
            Every feature.<br />
            <span className="section-title-muted">Designed to bring leads back.</span>
          </h2>
        </div>
        <div className="feature-grid-refined">
          <div className="feature-card-refined reveal">
            <div className="feature-icon-refined">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3>Ai Voice Callback</h3>
            <p>An Ai assistant calls back your abandoned leads within 60 seconds — sounds like your front desk, books appointments, answers questions.</p>
          </div>
          <div className="feature-card-refined reveal">
            <div className="feature-icon-refined">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3>Real-Time Capture</h3>
            <p>Captures name, email, and phone the moment a visitor starts typing — before they leave the page. No submit button required.</p>
          </div>
          <div className="feature-card-refined reveal">
            <div className="feature-icon-refined">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3>Automated Recovery</h3>
            <p>Personalized recovery emails fire automatically with your branding, your voice, and your offer — all tied to each client's settings.</p>
          </div>
        </div>
        <div className="section-cta-inline">
          <Link href="/how-it-works" className="cta-secondary-minimal">Explore all features &nbsp;→</Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* INDUSTRIES */}
      <section className="lc-section">
        <div className="section-inner-narrow">
          <p className="section-eyebrow">Who It's For</p>
          <h2 className="section-title-editorial">
            Purpose-built.<br />
            <span className="section-title-muted">For high-ticket businesses.</span>
          </h2>
        </div>
        <IndustriesAccordion />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }} className="industries-grid">
          <a href="/for-luxury-real-estate" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Luxury Real Estate</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>71% of property inquiries are abandoned</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. deal: $12,000. One recovered buyer pays for the entire year.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
          <a href="/for-luxury-auto" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h8l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Luxury Auto</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>74% of vehicle inquiries never get submitted</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. deal: $8,500. Capture buyers before they drive to the next lot.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
          <a href="/for-plastic-surgery" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Plastic Surgery</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>72% of consultation forms are abandoned</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. procedure: $6,500. Recover patients who got cold feet.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
          <a href="/for-property-management" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Property Management</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>70% of leasing inquiries are abandoned</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. lease: $3,200/yr. Enterprise dashboard for 10 to 500+ properties.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
          <a href="/for-med-spas" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Med Spas</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>67% of consultation forms are abandoned</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. client: $2,800. Recover leads your ads already paid for.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
          <a href="/for-dental" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2C4 2 2 5 2 8c0 3 1 5 2 7s2 5 3 7c.5 1 1.5 1 2 0 .5-1.5 1-3 3-3s2.5 1.5 3 3c.5 1 1.5 1 2 0 1-2 2-5 3-7s2-4 2-7c0-3-2-6-5-6-1.5 0-2.5.5-3 2-.5-1.5-1.5-2-3-2z"/></svg>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dental Practices</span>
            </div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>65% of appointment forms never get submitted</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>Avg. patient: $1,900. Built for groups with 5 to 50+ offices.</p>
            <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Learn more &rarr;</span>
          </a>
        </div>
        <IndustriesAccordion />
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
          <Link href="/pricing" className="page-transition-link" style={{ color: '#666', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>See Pricing &rarr;</Link></div>
      </section>

      <div className="section-divider" />

      {/* FINAL CTA */}
      <section className="final-cta reveal">
        
        <p className="section-eyebrow">Ready to Stop Losing Leads</p>
        <h2>
          Every abandoned form is<br />
          <span className="hero-highlight">money on the table.</span>
        </h2>
        <p className="final-cta-sub">Start your 7-day free trial. No credit card required. One line of code. Leads recovered from day one.</p>
        <div className="cta-group">
          <Link href="/start-trial" className="cta-primary">Start Your Free Trial</Link>
          <Link href="/test-form" className="cta-secondary">Try the Live Demo</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
