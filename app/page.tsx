import Link from 'next/link'
import SignalFlow from './components/SignalFlow'
import Image from 'next/image'
import './landing.css'
import StatsBar from './components/StatsBar'
import GSAPAnimations from './components/GSAPAnimations'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import ProblemAccordion from './components/ProblemAccordion'
import StepsFlow from './components/StepsFlow'
import IndustryDrawers from './components/IndustryDrawers'
import SignalCards from './components/SignalCards'
import LiveVisitorsDemo from './components/LiveVisitorsDemo'
import ScrollReveal from './components/ScrollReveal'
import ParticleNetwork from './components/ParticleNetwork'
import PhantomCapture from './components/PhantomCapture'
import HeroCapture from './components/HeroCapture'
import LedgerStats from './components/LedgerStats'
import LedgerRows from './components/LedgerRows'
import Logo from './components/Logo'
import IntegrationMarquee from './components/IntegrationMarquee'
import TestimonialSpotlight from './components/TestimonialSpotlight'

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
            <Logo />
          </Link>
        <MobileNav />
      </nav>

      <section className="hero">
        <div className="hero-particles" aria-hidden="true"><ParticleNetwork /></div>
        <PhantomCapture />
        <div className="hero-scanline" aria-hidden="true"></div>
        <div className="hero-glow-orb" />

        <div className="hero-split">
          <div className="hero-left">
            <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Born &amp; Built in Dallas, Texas</p>
            <h1 className="hero-animate">
              Your Best Leads<br />
              <span className="hero-highlight">Never Hit Submit.</span>
            </h1>
            <p className="hero-subtitle hero-animate-delay">
              You paid for the click. You paid for the landing page. Then they typed their
              name, their email, and something pulled them away &mdash; and every system you
              own forgot they existed. ReCapture keeps them. Contact fields only, never
              keystrokes, sent back to your ad platforms as real signal. So the people who
              almost became clients get a second chance to.
            </p>
            <div className="cta-group hero-animate-delay2">
              <Link href="/start-trial" className="cta-primary">Start your 7-day free trial</Link>
            </div>
          </div>
          <div className="hero-right hero-animate-delay2">
        <HeroCapture />
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
        <p className="section-subtitle">Baymard Institute puts form abandonment at 60-70%. Until now, you had no way to see who those people were.</p>
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

      <section className="lc-section signal-section reveal">
        <p className="signal-eyebrow">The part nobody else does</p>
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>
          Your ad platforms are learning from a fraction of your demand.
        </h2>
        <p className="section-subtitle">
          Meta and Google only find out someone was interested when they press submit.
        </p>

        <SignalFlow />

        <SignalCards />

        <p className="signal-close">
          You keep running your campaigns exactly as you do now. The platforms just stop
          working from the leftovers &mdash; and you finally know which ones are working.
        </p>
      </section>

      <div className="section-divider" />

      <section className="lc-section how-it-works-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <StepsFlow />
      </section>

      <div className="section-divider" />



      <section className="lc-section reveal">
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="lv-grid">
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Live Visitors
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Not just who you lost. Who is on your site right now.
              </h2>
              <div style={{ color: '#a0a0a0', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '1rem' }}>
                  Recovery is the second half. The first is seeing the people who are still deciding. Live Visitors shows who is on your site at this moment, what page they are on, where they came from, and how engaged they are.
                </p>
                <p style={{ margin: 0 }}>
                  When someone opens your form, you see it happen. When they leave without submitting, you already know who they were.
                </p>
              </div>
            </div>
            <LiveVisitorsDemo />
          </div>
        </div>
      </section>

      <section className="lc-section">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>Purpose-Built for High-Ticket Industries</h2>
        <p className="section-subtitle">ReCapture is not a generic form tool. Every feature was designed for businesses where a single recovered lead pays for the entire year.</p>
        <IndustryDrawers />

      </section>



      <section className="lc-section reveal" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ff6b35', marginBottom: '0.75rem' }}>Integrations</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>Works with the tools you already use</h2>
        <p style={{ fontSize: '1rem', color: '#888', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>Recovered leads flow straight into your existing stack — no rip-and-replace, no manual imports.</p>
        <IntegrationMarquee />
        <div style={{ marginTop: '2rem' }}>
          <Link href="/integrations" className="page-transition-link" style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>See all integrations &rarr;</Link>
        </div>
      </section>

      <section className="pricing-band reveal">
        <div className="pricing-band-inner">
          <p className="pricing-band-eyebrow">Simple, transparent pricing</p>
          <p className="pricing-band-line">
            Plans start at <strong>$397/mo</strong> · 7-day free trial · Cancel anytime
          </p>
          <Link href="/pricing" className="pricing-band-link page-transition-link">
            See all plans &rarr;
          </Link>
        </div>
      </section>

      <section className="lc-section testimonials-tone">
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>What Our Clients Say</h2>
        <TestimonialSpotlight />
      </section>

      <section className="final-cta reveal">
        <div className="final-cta-glow" />
        <h2>Stop Losing Revenue.<br />Start Recovering Leads.</h2>
        <p>7-day free trial. Cancel anytime. If you&apos;re losing leads, you&apos;ll know within 48 hours.</p>
        <div className="cta-group" style={{ justifyContent: 'center' }}>
          <Link href="/start-trial" className="cta-primary">Start your 7-day free trial</Link>
        </div>
        <div className="final-cta-sublinks" style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demo" className="page-transition-link" style={{ color: '#888', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Try the Live Demo &rarr;</Link>
          <Link href="/pricing" className="page-transition-link" style={{ color: '#888', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>See Pricing &rarr;</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
