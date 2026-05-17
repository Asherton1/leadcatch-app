'use client'

import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import FAQSection from '../components/FAQSection'
import PricingSection from '../components/PricingSection'
import MathSection from '../components/MathSection'
import Link from 'next/link'
import PricingFAQ from '../components/PricingFAQ'
import '../blog/blog.css'
import '../landing.css'

const FAQS: { question: string; answer: string }[] = [
  { question: "What is included in the 7-day free trial?", answer: "Full access to every feature on your selected plan — AI voice callback (Pro), Slack alerts, weekly reports, CRM webhooks, and dashboard analytics. No credit card required to start, and you will not be charged until day 8 if you stay." },
  { question: "What is the difference between Essentials and Pro?", answer: "Both plans include form abandonment tracking, recovery emails, SMS recovery, Slack alerts, and CRM webhooks. Pro adds AI voice callback — the highest-converting recovery channel — which alone typically pays for the upgrade within the first month." },
  { question: "Do I need a developer to install ReCapture?", answer: "No. ReCapture is one script tag added to your site head. Most clients install it in under 5 minutes by copy-pasting the snippet into their CMS (WordPress, Webflow, Wix, Squarespace, or custom). We provide step-by-step guides for every platform." },
  { question: "Can I cancel anytime?", answer: "Yes, cancel anytime with one click in your dashboard. No long-term contracts, no cancellation fees, no penalties. If you cancel mid-billing-cycle, you keep access until the end of that cycle." },
  { question: "What if I have multiple websites?", answer: "Pro covers up to 3 websites included. Enterprise plans include unlimited websites. If you are on Essentials and need to add a site, you can upgrade in your dashboard or contact us for a custom plan." },
]

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

      <FAQSection faqs={FAQS} />
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Have more questions?</p>
        <Link href="/faq" style={{ color: '#ff6b35', fontWeight: 500, fontSize: '1.0625rem', textDecoration: 'none' }}>View our full FAQ &rarr;</Link>
      </section>
      <RelatedPages page="pricing" />
      <Footer />
    </div>
  )
}
