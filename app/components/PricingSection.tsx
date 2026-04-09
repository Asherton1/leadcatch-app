'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [showEnterprise, setShowEnterprise] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', locations: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const essentials = annual ? 127 : 150
  const pro = annual ? 167 : 200

  const handleEnterprise = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/enterprise-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSending(false)
  }

  return (
    <section className="lc-section pricing-section" id="pricing">
      <h2 className="section-title">Simple, Transparent Pricing</h2>
      <p className="section-subtitle">No setup fees. No long-term contracts. Cancel anytime.</p>

      <div className="pricing-toggle">
        <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
        <button className="toggle-switch" onClick={() => setAnnual(!annual)}>
          <div className={`toggle-knob ${annual ? 'toggled' : ''}`} />
        </button>
        <span className={annual ? 'toggle-active' : ''}>Annual <span className="save-badge">Save 15%</span></span>
      </div>

      <div className="pricing-grid pricing-grid-3">
        <div className="pricing-card">
          <div className="pricing-tier">Essentials</div>
          <div className="pricing-price">
            <span className="price-dollar">$</span>
            <span className="price-amount">{essentials}</span>
            <span className="price-period">/mo{annual ? ' · billed annually' : ''}</span>
          </div>
          <p className="pricing-desc">See every lead you’re losing. Follow up manually.</p>
          <ul className="pricing-features">
            <li><span className="check-icon">✓</span>Real-time form abandonment tracking</li>
            <li><span className="check-icon">✓</span>Lead dashboard with contact details</li>
            <li><span className="check-icon">✓</span>Lead status management</li>
            <li><span className="check-icon">✓</span>Revenue-at-risk estimation</li>
            <li><span className="check-icon">✓</span>Weekly email report</li>
            <li><span className="check-icon">✓</span>Manual follow-up (email & call)</li>
          </ul>
          <Link href="/signup?plan=essentials" className="pricing-cta pricing-cta-secondary">Start Free Trial</Link>
          <div className="pricing-upgrade-hint"><p>Want automated recovery?</p><p><Link href="/signup?plan=pro">Upgrade to Pro</Link> anytime.</p></div>
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

        <div className="pricing-card pricing-card-enterprise">
          <div className="pricing-tier">Enterprise</div>
          <div className="pricing-price">
            <span className="price-amount" style={{ fontSize: '2rem' }}>Custom</span>
          </div>
          <p className="pricing-desc">Multiple locations. One powerful dashboard. Volume pricing built for scale.</p>
          <ul className="pricing-features">
            <li><span className="check-icon check-orange">✓</span>Everything in Pro</li>
            <li><span className="check-icon check-orange">✓</span>Unlimited websites & locations</li>
            <li><span className="check-icon check-orange">✓</span>Centralized multi-location dashboard</li>
            <li><span className="check-icon check-orange">✓</span>Per-location reporting & analytics</li>
            <li><span className="check-icon check-orange">✓</span>White-glove onboarding & installation</li>
            <li><span className="check-icon check-orange">✓</span>Custom-branded recovery emails per site</li>
            <li><span className="check-icon check-orange">✓</span>Executive roll-up reports</li>
            <li><span className="check-icon check-orange">✓</span>Dedicated account manager</li>
          </ul>
          <button onClick={() => setShowEnterprise(true)} className="pricing-cta pricing-cta-primary">Contact Us</button>
        </div>
      </div>

      {showEnterprise && (
        <div className="enterprise-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowEnterprise(false) }}>
          <div className="enterprise-modal">
            <button className="enterprise-close" onClick={() => setShowEnterprise(false)}>&times;</button>
            {!submitted ? (
              <>
                <h3 className="enterprise-modal-title">Let’s build your plan</h3>
                <p className="enterprise-modal-sub">Tell us about your business and we’ll put together a custom package that fits.</p>
                <div className="enterprise-form" role="form">
                  <div className="enterprise-row">
                    <div className="enterprise-field">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Jane Smith" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="enterprise-field">
                      <label>Work Email *</label>
                      <input type="email" placeholder="jane@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="enterprise-row">
                    <div className="enterprise-field">
                      <label>Company Name *</label>
                      <input type="text" placeholder="Acme Property Group" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                    </div>
                    <div className="enterprise-field">
                      <label>Number of Locations</label>
                      <input type="text" placeholder="e.g. 12" value={formData.locations} onChange={e => setFormData({...formData, locations: e.target.value})} />
                    </div>
                  </div>
                  <div className="enterprise-field">
                    <label>What are you looking for?</label>
                    <textarea placeholder="Tell us about your needs, goals, or any questions you have..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button className="enterprise-submit" onClick={handleEnterprise} disabled={sending || !formData.name || !formData.email || !formData.company}>
                    {sending ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </div>
              </>
            ) : (
              <div className="enterprise-success">
                <div className="enterprise-success-icon">✓</div>
                <h3>We’ll be in touch</h3>
                <p>Thanks for reaching out. We’ll review your inquiry and get back to you within 24 hours.</p>
                <button className="enterprise-submit" onClick={() => setShowEnterprise(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
