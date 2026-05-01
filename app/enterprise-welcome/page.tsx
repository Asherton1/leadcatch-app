'use client'

import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'
import '../enterprise/enterprise.css'

export default function EnterpriseWelcomePage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />

      <section className="enterprise-contact" style={{ paddingTop: '8rem' }}>
        <div className="enterprise-contact-inner enterprise-contact-success">
          <div className="enterprise-contact-success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="enterprise-contact-eyebrow">Welcome to enterprise</p>
          <h2 className="enterprise-contact-headline">Your subscription is active.</h2>
          <p className="enterprise-contact-desc">
            Ash, our founder, will personally reach out within one business day to begin your white-glove onboarding. Check your inbox for a welcome email with the kickoff timeline.
          </p>
          <p className="enterprise-contact-fineprint">
            Need to reach us right away? <a href="mailto:hello@userecapture.com">hello@userecapture.com</a> or <a href="tel:+18886060630">(888) 606-0630</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
