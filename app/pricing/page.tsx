'use client'

import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import PricingSection from '../components/PricingSection'
import '../blog/blog.css'
import '../landing.css'

export default function PricingPage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />
      <ScrollReveal />

      <div className="pricing-hero-v2">
        <div className="pricing-hero-v2-inner">
          <p className="pricing-hero-v2-eyebrow">§ Pricing</p>
          <h1 className="pricing-hero-v2-headline">
            <span className="pricing-hero-v2-headline-primary">Plans that pay for themselves.</span>{' '}
            <span className="pricing-hero-v2-headline-muted">A single recovered lead from a med spa, dental practice, or property management company can be worth $1,500 to $10,000.</span>
          </h1>
        </div>
      </div>

      <section className="pricing-baseline reveal">
        <div className="pricing-baseline-inner">
          <p className="pricing-baseline-eyebrow">§ Included in every plan</p>
          <h2 className="pricing-baseline-headline">Real things, in writing. No asterisks. No hidden fees.</h2>

          <div className="pricing-baseline-grid">
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">7-day free trial</div>
              <div className="pricing-baseline-desc">Full access for 7 days.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">No setup fees</div>
              <div className="pricing-baseline-desc">No credit card gymnastics.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">Cancel anytime</div>
              <div className="pricing-baseline-desc">No long-term contracts.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">HIPAA-ready data handling</div>
              <div className="pricing-baseline-desc">Compliant from day one.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">BAA available</div>
              <div className="pricing-baseline-desc">For practices that need it.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">US-based support</div>
              <div className="pricing-baseline-desc">Real humans. Real response.</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "0" }}>
        <div className="reveal"><PricingSection /></div>
      </div>
      <Footer />
    </div>
  )
}
