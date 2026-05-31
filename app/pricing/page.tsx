'use client'

import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import PricingSection from '../components/PricingSection'
import MathSection from '../components/MathSection'
import Link from 'next/link'
import PricingFAQ from '../components/PricingFAQ'
import '../blog/blog.css'
import '../landing.css'


export default function PricingPage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />
      <ScrollReveal />

      <div className="pricing-hero-v2">
        <div className="pricing-hero-v2-inner">
          <p className="pricing-hero-v2-eyebrow">Pricing</p>
          <h1 className="pricing-hero-v2-headline">
            <span className="pricing-hero-v2-headline-primary">Plans that pay for themselves.</span>{' '}
            <span className="pricing-hero-v2-headline-muted">A single recovered lead from a med spa, dental practice, or property management company can be worth $1,500 to $10,000.</span>
          </h1>
        </div>
      </div>





      <MathSection />

      <div style={{ marginTop: "0" }}>
        <div className="reveal"><PricingSection /></div>
      </div>

      <section className="pricing-baseline reveal">
        <div className="pricing-baseline-inner">
          <p className="pricing-baseline-eyebrow">Included in every plan</p>
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
              <div className="pricing-baseline-title">BAA on Enterprise</div>
              <div className="pricing-baseline-desc">For healthcare practices.</div>
            </div>
            <div className="pricing-baseline-cell">
              <div className="pricing-baseline-title">US-based support</div>
              <div className="pricing-baseline-desc">Real humans. Real response.</div>
            </div>
          </div>
        </div>
      </section>

            <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <Link href="/faq" className="pricing-faq-card" style={{ display: 'block', textDecoration: 'none', background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff6b35', margin: '0 0 1rem' }}>FAQ</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>Still have questions?</h2>
            <p style={{ fontSize: '1rem', color: '#888', lineHeight: 1.6, margin: '0 0 1.5rem' }}>Setup, the AI voice callback, compliance, billing &mdash; every answer, searchable, in one place.</p>
            <span className="pricing-faq-card-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ff6b35', fontWeight: 600, fontSize: '0.95rem' }}>Browse the full FAQ <span aria-hidden="true">&rarr;</span></span>
          </Link>
        </div>
      </section>
      <RelatedPages page="pricing" />
      <Footer />
    </div>
  )
}
