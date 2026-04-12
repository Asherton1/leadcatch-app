'use client'

import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import PricingSection from '../components/PricingSection'
import '../blog/blog.css'
import '../landing.css'

export default function StartTrial() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Start Your Free Trial</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Stop Losing Leads. Start Recovering Revenue.</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>7-day free trial. No credit card required. One script tag, 60-second setup. See exactly how many leads your forms are losing — then start getting them back.</p>
        </div>
      </div>

      <div style={{ marginTop: "-7rem" }}>
        <PricingSection />
      </div>
      <Footer />
    </div>
  )
}
