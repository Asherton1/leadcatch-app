'use client'

import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import PricingSection from '../components/PricingSection'
import '../blog/blog.css'
import '../landing.css'

export default function PricingPage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />
      <div style={{ paddingTop: '5rem' }}>
        <PricingSection />
      </div>
      <Footer />
    </div>
  )
}
