import Link from 'next/link'
import PlusField from './components/PlusField'
import Logo from './components/Logo'
import MobileNav from './components/MobileNav'
import ScrollReveal from './components/ScrollReveal'
import Spotlight from './components/Spotlight'
import Magnetic from './components/Magnetic'
import RecoverySequence from './components/RecoverySequence'
import LiveCaptureDemo from './components/LiveCaptureDemo'
import LedgerFeed from './components/LedgerFeed'
import LeakRows from './components/LeakRows'
import FeatureShowcase from './components/FeatureShowcase'
import StepsFlow from './components/StepsFlow'
import IndustryDrawers from './components/IndustryDrawers'
import IntegrationMarquee from './components/IntegrationMarquee'
import TestimonialSpotlight from './components/TestimonialSpotlight'
import Footer from './components/Footer'
import './landing.css'
import './landing-polish.css'
import './direction.css'
import './direction-components.css'

// PlusField is a client component whose markup is an empty div, so it
// server renders harmlessly and the WebGL context is only ever created
// inside its effect. ssr:false is not permitted from a server component
// in the app router, and is not needed here.

export const metadata = {
  title: 'ReCapture | The Recovery Layer for High-Ticket Service Businesses',
  description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
}

export default function LandingPage() {
  return (
    <div className="landing dir">
      <ScrollReveal />
      <Spotlight />
      <Magnetic />

      <nav className="lc-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo />
        </Link>
        <MobileNav />
      </nav>

      <div className="dir-stage" data-field-drive>
        <div className="dir-stage-canvas"><PlusField /></div>

      {/* ---------- Hero ---------- */}
      <section className="dir-hero">
        <div className="dir-hero-inner">
          <p className="dir-eyebrow dir-fade">The recovery layer</p>
          <h1 className="dir-h1">
            <span className="ln"><span>Your best leads</span></span>
            <span className="ln"><span>never hit <em>submit.</em></span></span>
          </h1>
          <p className="dir-sub dir-fade d1">
            Between sixty and seventy percent of the people who start your forms never
            finish them. ReCapture keeps the ones that matter, gets them back on your
            behalf, and tells Meta and Google they were real.
          </p>
          <div className="dir-actions dir-fade d2">
            <Link href="/start-trial" className="dir-primary" data-magnetic>Start your 7-day free trial</Link>
            <Link href="/demo" className="dir-ghost">See the live demo</Link>
          </div>
          <div className="dir-legend dir-fade d3">
            <span><i className="kept" /> One script tag, 60 second install</span>
            <span><i className="kept" /> Contact fields only, never keystrokes</span>
          </div>
        </div>
      </section>

      {/* ---------- The ledger ---------- */}
      <section className="dir-sec alt">
        <div className="dir-wrap">
          <div className="dir-head">
            <p className="dir-eyebrow">The proof</p>
            <h2 className="dir-h2">
              Every lost lead. Every dollar.<br />
              <span className="q">Sitting in front of you every single morning.</span>
            </h2>
            <p className="dir-lede">
              Baymard Institute puts form abandonment at 60 to 70 percent. Until now you
              had no way to see who those people were.
            </p>
          </div>

          <div className="dir-window">
            <div className="dir-window-bar">
              <i /><i /><i />
              <span className="dir-window-label">Your dashboard, tonight</span>
            </div>
            <LedgerFeed />
          </div>
        </div>
      </section>

      {/* ---------- Where it goes ---------- */}
      <section className="dir-sec tight">
        <div className="dir-wrap">
          <div className="dir-head center">
            <p className="dir-eyebrow">Where it goes</p>
            <h2 className="dir-h2">Three ways a lead disappears.</h2>
          </div>
          <LeakRows />
        </div>
      </section>

      {/* ---------- Manifesto ---------- */}
      <section className="dir-sec dir-manifesto">
        <div className="dir-wrap">
          <p className="dir-eyebrow">Our position</p>
          <p className="dir-mf-lead">
            Form abandonment isn&apos;t a UX problem.
            <span>It&apos;s a business problem.</span>
          </p>
          <p className="dir-mf-body">
            Every prospect who started typing was telling you something. That they were
            interested. That they needed what you sell. That they were ready, until life
            interrupted.
          </p>
          <p className="dir-mf-pull">
            A kid screaming in the background should not cost you a $30,000 client.
          </p>
          <p className="dir-mf-close">ReCapture catches the intent the moment it appears.</p>
        </div>
      </section>

      {/* ---------- The sequence ---------- */}
      <RecoverySequence />


      {/* ---------- Prove it on the reader ---------- */}
      <section className="dir-sec lcd">
        <div className="dir-wrap">
          <div className="dir-head center">
            <p className="dir-eyebrow">Try it on yourself</p>
            <h2 className="dir-h2">
              <span className="q">Reading about it proves nothing.</span><br />
              So run it on you.
            </h2>
            <p className="dir-lede">
              Start filling in the form. Then try to leave, the way a real prospect
              would. Watch what your team would have received.
            </p>
          </div>
          <LiveCaptureDemo />
        </div>
      </section>

      {/* ---------- What it does ---------- */}
      <section className="dir-sec alt">
        <div className="dir-wrap">
          <div className="dir-head">
            <p className="dir-eyebrow">The part nobody else does</p>
            <h2 className="dir-h2">
              <span className="q">Most tools start at the submission.</span><br />
              This is everything around it.
            </h2>
            <p className="dir-lede">Six features, one at a time. Pick any of them.</p>
          </div>
          <FeatureShowcase />
        </div>
      </section>

      {/* ---------- Setup ---------- */}
      <section className="dir-sec how-it-works-section">
        <div className="dir-wrap">
          <div className="dir-head center">
            <p className="dir-eyebrow">Setup</p>
            <h2 className="dir-h2">Three steps to recovered revenue.</h2>
            <p className="dir-lede">No complex setup. No dev team required.</p>
          </div>
          <StepsFlow />
        </div>
      </section>

      <hr className="dir-rule" />

      {/* ---------- Industries ---------- */}
      <section className="dir-sec">
        <div className="dir-wrap">
          <div className="dir-head">
            <p className="dir-eyebrow">Who it is for</p>
            <h2 className="dir-h2">Built for businesses where one recovered lead pays for the year.</h2>
            <p className="dir-lede">
              ReCapture is not a generic form tool. Every feature was designed around
              high-ticket enquiries.
            </p>
          </div>
          <IndustryDrawers />
        </div>
      </section>

      {/* ---------- Integrations ---------- */}
      <section className="dir-sec alt tight">
        <div className="dir-wrap">
          <div className="dir-head center">
            <p className="dir-eyebrow">Integrations</p>
            <h2 className="dir-h2">Works with the tools you already use.</h2>
            <p className="dir-lede">
              Recovered leads flow straight into your existing stack. No rip and replace,
              no manual imports.
            </p>
          </div>
          <IntegrationMarquee />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/integrations" className="dir-ghost">See all integrations</Link>
          </div>
        </div>
      </section>

      {/* ---------- Proof ---------- */}
      <section className="dir-sec">
        <div className="dir-wrap">
          <div className="dir-head center">
            <p className="dir-eyebrow">Proof</p>
            <h2 className="dir-h2">What the people using it say.</h2>
          </div>
          <TestimonialSpotlight />
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="dir-sec dir-pricing">
        <div className="dir-wrap">
          <p className="dir-eyebrow">Simple, transparent pricing</p>
          <p className="dir-price">$397<small> / month</small></p>
          <p className="dir-price-note">
            One website, every page and form included. 7-day free trial. Cancel anytime.
          </p>
          <div className="dir-actions" style={{ justifyContent: 'center' }}>
            <Link href="/start-trial" className="dir-primary" data-magnetic>Start your 7-day free trial</Link>
            <Link href="/pricing" className="dir-ghost">See all plans</Link>
          </div>
        </div>
      </section>

      {/* ---------- Concierge ---------- */}
      <section className="dir-sec alt">
        <div className="dir-wrap">
          <div className="dir-concierge-grid">
            <div>
              <p className="dir-eyebrow">Or skip the form entirely</p>
              <a href="tel:+18886060630" className="dir-phone">(888) 606-0630</a>
              <p className="dir-lede">
                Talk to Marissa, our AI concierge. No hold music, no queue, and nobody
                will call you back unless you ask.
              </p>
            </div>
            <ul className="dir-list">
              <li>Answers what ReCapture does, how it installs, and what it will and will not do</li>
              <li>Works out which plan fits your number of locations, and quotes that one</li>
              <li>Texts you a page built around what you told her, before you hang up</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Final ---------- */}
      <section className="dir-sec dir-final">
        <div className="dir-wrap">
          <h2>Stop losing revenue.<br />Start recovering leads.</h2>
          <p>7-day free trial. If you&apos;re losing leads, you&apos;ll know within 48 hours.</p>
          <div className="dir-actions" style={{ justifyContent: 'center' }}>
            <Link href="/start-trial" className="dir-primary" data-magnetic>Start your 7-day free trial</Link>
          </div>
          <div className="dir-sublinks">
            <Link href="/demo">Try the live demo</Link>
            <Link href="/pricing">See pricing</Link>
            <Link href="/how-it-works">How it works</Link>
          </div>
        </div>
      </section>


      <Footer />
      </div>{/* /dir-stage */}
    </div>
  )
}
