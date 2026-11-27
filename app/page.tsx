import Link from 'next/link'
import Image from 'next/image'
import './landing.css'
import './landing-polish.css'
import GSAPAnimations from './components/GSAPAnimations'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import LeakRows from './components/LeakRows'
import StepsFlow from './components/StepsFlow'
import IndustryDrawers from './components/IndustryDrawers'
import ScrollReveal from './components/ScrollReveal'
import ParticleNetwork from './components/ParticleNetwork'
import PhantomCapture from './components/PhantomCapture'
import HeroCapture from './components/HeroCapture'
import FeatureShowcase from './components/FeatureShowcase'
import LedgerFeed from './components/LedgerFeed'
import LedgerHeadline from './components/LedgerHeadline'
import RecoverySequence from './components/RecoverySequence'
import Logo from './components/Logo'
import GridBackdrop from './components/GridBackdrop'
import IntegrationMarquee from './components/IntegrationMarquee'
import TestimonialSpotlight from './components/TestimonialSpotlight'

export const metadata = {
  title: 'ReCapture | The Recovery Layer for High-Ticket Service Businesses',
  description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
}

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="ambient-bg" />
      <GSAPAnimations />
      <ScrollReveal />

      <GridBackdrop />

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
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built in Dallas, Texas</p>
            <h1 className="hero-animate">
              Your Best Leads<br />
              <span className="hero-highlight">Never Hit Submit.</span>
            </h1>
            <p className="hero-subtitle hero-animate-delay">
              You paid for the click. You paid for the landing page. Then they typed their
              name, their email, and something pulled them away, and every system you own
              forgot they existed. ReCapture keeps them, and tells Meta and Google those
              people were real. So the people who almost became clients get a second
              chance to.
            </p>
            <div className="cta-group hero-animate-delay2">
              <Link href="/start-trial" className="cta-primary">Start your 7-day free trial</Link>
            </div>
            <p className="hero-animate-delay2" style={{ fontSize: '0.8125rem', marginTop: '1.1rem', lineHeight: 1.6 }}>
              Contact fields only. Never keystrokes.
            </p>
          </div>
          <div className="hero-right hero-animate-delay2">
        <HeroCapture />
          </div>
        </div>
      </section>

      {/* The ledger shows the problem and the product in one image, so it
          leads. The old "Invisible Revenue Leak" section said the same thing
          again one screen later; its stat and its three rows are folded in
          below rather than given a screen of their own. */}
      <section className="lc-section ledger-section">
        <LedgerHeadline />

        <LedgerFeed />

        <div className="ledger-leakrows reveal">
          <p className="rc-eyebrow">Where it goes</p>
          <p className="ledger-leakrows-note">
            Baymard Institute puts form abandonment at 60 to 70 percent.
            Until now, you had no way to see who those people were.
          </p>
          <LeakRows />
        </div>
      </section>

      <div className="section-divider" />

      <section className="manifesto reveal">
        <div className="manifesto-inner">
          <p className="manifesto-eyebrow">Our position</p>

          <p className="mf-lead">
            Form abandonment isn&apos;t a UX problem.<br />
            <span className="mf-lead-accent">It&apos;s a business problem.</span>
          </p>

          <p className="mf-body">
            Every prospect who started typing was telling you something. That they were interested.
            That they needed what you sell. That they were ready, until life interrupted.
          </p>

          <p className="mf-pull">
            A kid screaming in the background<br className="brk-mobile" /> should not cost you a $30,000 client.
          </p>

          <p className="mf-close">ReCapture catches the intent the moment it appears.</p>
        </div>
      </section>

      <RecoverySequence />

      <section className="lc-section fs-section reveal">
        <p className="signal-eyebrow">The part nobody else does</p>
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "1.5rem" }}>
          <span className="title-muted">Most tools start at the submission.</span><br />
          This is everything around it.
        </h2>
        <p className="section-subtitle">
          Six features, one at a time. Pick any of them.
        </p>

        <FeatureShowcase />
      </section>

      <div className="section-divider" />

      <section className="lc-section how-it-works-section">
        <p className="rc-eyebrow" style={{ textAlign: 'center' }}>Setup</p>
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "0.5rem" }}>Three Steps to Recovered Revenue</h2>
        <p className="section-subtitle">No complex setup. No dev team required. Just results.</p>
        <StepsFlow />
      </section>

      <div className="section-divider" />

      <section className="lc-section">
        <p className="rc-eyebrow" style={{ textAlign: 'center' }}>Who it is for</p>
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "0.5rem" }}>Purpose-Built for High-Ticket Industries</h2>
        <p className="section-subtitle">ReCapture is not a generic form tool. Every feature was designed for businesses where a single recovered lead pays for the entire year.</p>
        <IndustryDrawers />

      </section>

      <section className="lc-section reveal" style={{ textAlign: 'center' }}>
        <p className="rc-eyebrow">Integrations</p>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Works with the tools you already use</h2>
        <p className="section-subtitle">Recovered leads flow straight into your existing stack. No rip-and-replace, no manual imports.</p>
        <IntegrationMarquee />
        <div style={{ marginTop: '2rem' }}>
          <Link href="/integrations" className="page-transition-link" style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>See all integrations &rarr;</Link>
        </div>
      </section>

      {/* Proof before price. */}
      <section className="lc-section testimonials-tone">
        <p className="rc-eyebrow" style={{ textAlign: 'center' }}>Proof</p>
        <h2 className="section-title" style={{ fontSize: "clamp(1.35rem, 5vw, 3.25rem)", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "0.5rem" }}>What Our Clients Say</h2>
        <TestimonialSpotlight />
      </section>

      <section className="pricing-band reveal">
        <div className="pricing-band-inner">
          <p className="pricing-band-eyebrow">Simple, transparent pricing</p>
          <p className="pricing-band-line">
            Plans start at <strong>$397/mo</strong><br />
            7-day free trial. Cancel anytime.
          </p>
          <Link href="/pricing" className="pricing-band-link page-transition-link">
            See all plans
          </Link>
        </div>
      </section>

      {/* The alternative path, sitting beside the price rather than
          interrupting before anyone knows what the product is. */}
      <section className="concierge-callout reveal">
        <div className="concierge-callout-inner">
          <p className="concierge-callout-eyebrow">Or skip the form entirely</p>
          <p className="concierge-callout-line">
            Call <a href="tel:+18886060630" className="concierge-callout-number">(888) 606-0630</a> and talk to Marissa, our AI concierge.
          </p>
          <ul className="concierge-callout-list">
            <li>Answers what ReCapture does, how it installs, and what it will and will not do</li>
            <li>Works out which plan fits your number of locations, and quotes that one</li>
            <li>Texts you a page built around what you told her, before you hang up</li>
          </ul>
          <p className="concierge-callout-foot">
            No hold music, no queue, and nobody will call you back unless you ask.
          </p>
        </div>
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
