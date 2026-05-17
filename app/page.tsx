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
import GhostFunnel from './components/GhostFunnel'
import LedgerStats from './components/LedgerStats'
import LedgerRows from './components/LedgerRows'

export const metadata = {
  title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
  description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
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
        <GhostFunnel />

        <div className="hero-split">
          <div className="hero-left">
            <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Born &amp; Built in Dallas, Texas</p>
            <h1 className="hero-animate">
              Your Best Leads<br />
              <span className="hero-highlight">Never Hit Submit.</span>
            </h1>
            <p className="hero-subtitle hero-animate-delay">
              High-value prospects start filling out your form, then vanish before submitting.
              ReCapture captures their info the moment they start typing — giving you a second chance to close.
            </p>
            <p className="hero-platform-line hero-animate-delay" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
              Form abandonment is the start. ReCapture is building the recovery layer for high-ticket service businesses.
            </p>
            <div className="cta-group hero-animate-delay2">
              <Link href="/start-trial" className="cta-primary">Start your 7-day free trial</Link>
            </div>
          </div>
          <div className="hero-right hero-animate-delay2">
            <GhostLeadDemoCompact />
          </div>
        </div>
      </section>

      <section className="concierge-callout reveal">
        <div className="concierge-callout-inner">
          <p className="concierge-callout-eyebrow">Want to skip the form?</p>
          <p className="concierge-callout-line">
            Call <a href="tel:+18886060630" className="concierge-callout-number">(888) 606-0630</a> — our AI concierge answers your questions and texts you a tailored proposal for your business in 60 seconds.
          </p>
        </div>
      </section>

      <section className="lc-section ledger-section">
        <p className="ledger-eyebrow">The proof</p>
        <h2 className="ledger-headline">
          <span className="ledger-headline-primary">Every lost lead. Every dollar.</span>{' '}
          <span className="ledger-headline-muted">Right in front of you, every morning.</span>
        </h2>

        <LedgerStats />

        <div className="ledger-divider" />

        <LedgerRows />
      </section>

      <div className="section-divider" />

      <section className="lc-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>The Invisible Revenue Leak</h2>
        <p className="section-subtitle">60–75% of form visitors start typing and never hit submit. Until now, you had no way to see them.</p>
        <ProblemAccordion />
      </section>

      <section className="manifesto reveal">
        <div className="manifesto-inner">
          <p className="manifesto-eyebrow">our position</p>
          <p className="manifesto-body manifesto-body-emphasis">
            Form abandonment isn&apos;t a UX problem. It&apos;s a business problem.
          </p>
          <p className="manifesto-body">
            Every prospect who started typing was telling you something: that they&apos;re interested, that they need what you sell, that they were ready, until life interrupted. We don&apos;t believe a kid screaming in the background should cost you a $30,000 client.
          </p>
          <p className="manifesto-body manifesto-body-emphasis">
            ReCapture catches the intent the moment it appears.
          </p>
        </div>
      </section>

      <section className="lc-section how-it-works-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <StepsAccordion />
      </section>

      <div className="section-divider" />



      <section className="lc-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Purpose-Built for High-Ticket Industries</h2>
        <p className="section-subtitle">ReCapture is not a generic form tool. Every feature was designed for businesses where a single recovered lead pays for the entire year.</p>
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



      <section className="pricing-band reveal">
        <div className="pricing-band-inner">
          <p className="pricing-band-eyebrow">Simple, transparent pricing</p>
          <p className="pricing-band-line">
            Plans start at <strong>$197/mo</strong> · 7-day free trial · Cancel anytime
          </p>
          <Link href="/pricing" className="pricing-band-link page-transition-link">
            See all plans &rarr;
          </Link>
        </div>
      </section>

      <section className="lc-section testimonials-tone">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>What Our Clients Say</h2>
        <div className="testimonials-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;We had no idea how many leads were starting our consultation form and dropping off. Within the first week, ReCapture surfaced 14 leads we never would have known about. Three of them booked. That alone paid for the year.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>R</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Sarah K.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>Practice Director, DFW</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;As a healthcare practice, every qualified lead matters. ReCapture showed us exactly who was falling through the cracks on our intake forms. The dashboard is clean, the data is actionable, and the setup took less than two minutes.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>David M.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>ESD Health</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontStyle: 'italic' }}>&quot;I was skeptical at first — another tracking tool? But ReCapture is different. It captures the leads that literally don&apos;t exist anywhere else. We recovered three high-value clients in the first month that we would have completely lost.&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.875rem' }}>Dillon R.</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>Business Owner</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
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
          <Link href="/start-trial" className="cta-primary">Start your 7-day free trial</Link>
        </div>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demo" className="page-transition-link" style={{ color: '#888', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Try the Live Demo &rarr;</Link>
          <Link href="/pricing" className="page-transition-link" style={{ color: '#888', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>See Pricing &rarr;</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
