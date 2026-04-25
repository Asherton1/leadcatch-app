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

      <div style={{ marginTop: "-4rem" }}>
        <div className="reveal"><PricingSection /></div>
      </div>
      <Footer />
    </div>
  )
}
