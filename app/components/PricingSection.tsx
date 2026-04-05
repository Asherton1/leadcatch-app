'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  const essentials = annual ? 127 : 150
  const pro = annual ? 167 : 200

  return (
    <section className="lc-section pricing-section">
      <div className="section-label">PRICING</div>
      <h2 className="section-title">Simple, Transparent Pricing</h2>
      <p className="section-subtitle">No setup fees. No long-term contracts. Cancel anytime.</p>

      <div className="pricing-toggle">
        <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
        <button className="toggle-switch" onClick={() => setAnnual(!annual)}>
          <div className={`toggle-knob ${annual ? 'toggled' : ''}`} />
        </button>
        <span className={annual ? 'toggle-active' : ''}>Annual <span className="save-badge">Save 15%</span></span>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <div className="pricing-tier">Essentials</div>
          <div className="pricing-price">
            <span className="price-dollar">$</span>
            <span className="price-amount">{essentials}</span>
            <span className="price-period">/mo{annual ? ' · billed annually' : ''}</span>
          </div>
          <p className="pricing-desc">See every lead you're losing. Follow up manually.</p>
          <ul className="pricing-features">
            <li><span className="check-icon">✓</span>Real-time form abandonment tracking</li>
            <li><span className="check-icon">✓</span>Lead dashboard with contact details</li>
            <li><span className="check-icon">✓</span>Lead status management</li>
            <li><span className="check-icon">✓</span>Revenue-at-risk estimation</li>
            <li><span className="check-icon">✓</span>Weekly email report</li>
            <li><span className="check-icon">✓</span>Manual follow-up (email & call)</li>
          </ul>
          <Link href="/signup?plan=essentials" className="pricing-cta pricing-cta-secondary">Start Free Trial</Link>
        </div>

        <div className="pricing-card pricing-card-featured">
          <div className="pricing-badge">Most Popular</div>
          <div className="pricing-tier">Pro</div>
          <div className="pricing-price">
            <span className="price-dollar">$</span>
            <span className="price-amount">{pro}</span>
            <span className="price-period">/mo{annual ? ' · billed annually' : ''}</span>
          </div>
          <p className="pricing-desc">Automated recovery. Leads come back without lifting a finger.</p>
          <ul className="pricing-features">
            <li><span className="check-icon">✓</span>Everything in Essentials</li>
            <li><span className="check-icon check-orange">✓</span>Automated lead recovery emails</li>
            <li><span className="check-icon check-orange">✓</span>Custom sender name & branding</li>
            <li><span className="check-icon check-orange">✓</span>Configurable send delay timing</li>
            <li><span className="check-icon check-orange">✓</span>Weekly reports with trend analytics</li>
            <li><span className="check-icon check-orange">✓</span>Priority support</li>
          </ul>
          <Link href="/signup?plan=pro" className="pricing-cta pricing-cta-primary">Start Free Trial</Link>
        </div>
      </div>
    </section>
  )
}
