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
