'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [showEnterprise, setShowEnterprise] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', locations: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [visible, setVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const essentials = annual ? 167 : 197
  const pro = annual ? 337 : 397

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

  const tiers = [
    {
      name: 'ESSENTIALS',
      price: essentials,
      priceDisplay: `$${essentials}`,
      period: '/ mo',
      desc: "See every lead you\u2019re losing. Follow up manually.",
      hipaa: false,
      features: [
        'Real-time form abandonment tracking',
        'Exit-intent detection',
        'Lead dashboard with contact details',
        'Lead scoring (hot/warm/cold) with breakdown',
        'Status filters (Open / Contacted / Converted / Lost)',
        'Recovered Revenue counter (live ROI tracking)',
        'Revenue-at-risk estimation',
        'Onboarding & trial guidance emails',
        'Weekly email report',
        'Manual follow-up (email & call)',
      ],
      cta: { label: 'Begin your 7-day trial', href: '/signup?plan=essentials', isModal: false },
      isPro: false,
    },
    {
      name: 'PRO',
      price: pro,
      priceDisplay: `$${pro}`,
      period: '/ mo',
      desc: "Automated recovery. Leads come back without lifting a finger.",
      hipaa: true,
      features: [
        'Everything in Essentials',
        'Ai voice callback within 60 seconds',
        'Automated lead recovery emails',
        'Instant SMS lead alerts',
        'Instant Slack lead alerts',
        'Custom sender name & branding',
        'Custom email templates with merge tags (coming soon)',
        'Configurable send delay timing',
        'Outbound webhooks (Zapier, Make)',
        'Weekly reports with trend analytics',
        'HIPAA-ready data handling + BAA available',
        'Priority support',
      ],
      cta: { label: 'Begin your 7-day trial', href: '/signup?plan=pro', isModal: false },
      isPro: true,
    },
    {
      name: 'ENTERPRISE',
      price: null,
      priceLeader: 'from',
      priceDisplay: '1,997',
      period: '/ mo',
      desc: 'For multi-location groups, franchise systems, and high-volume practices. Custom-priced based on locations and integrations.',
      hipaa: true,
      features: [
        'Everything in Pro',
        'Ai voice callback with custom agent per location',
        'HIPAA BAA included',
        'Unlimited websites & locations',
        'Centralized multi-location dashboard',
        'Per-location reporting & analytics',
        'White-glove onboarding & installation',
        'Custom-branded recovery emails per site',
        'White-label dashboard (your branding) (coming soon)',
        'Direct API access for custom integrations (coming soon)',
        'Free Form Audit reports for your clients',
        'Executive roll-up reports',
        'Dedicated account manager',
      ],
      cta: { label: 'Contact Sales', href: '', isModal: true },
      isPro: false,
    },
  ]

  return (
    <section className="lc-section pricing-section" id="pricing">
      <div className="pricing-toggle">
        <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
        <button className="toggle-switch" onClick={() => setAnnual(!annual)}>
          <div className={`toggle-knob ${annual ? 'toggled' : ''}`} />
        </button>
        <span className={annual ? 'toggle-active' : ''}>Annual <span className="save-badge">Save 15%</span></span>
      </div>

      <div ref={wrapRef} className={`pricing-menu ${visible ? 'pricing-menu-visible' : ''}`}>
        {tiers.map((t, i) => (
          <div className={`pricing-row ${t.isPro ? 'pricing-row-pro' : ''}`} key={i}>
            <div className="pricing-row-head">
              <div className="pricing-row-name-group">
                <span className="pricing-row-name">{t.name}</span>
                {t.hipaa && <span className="pricing-row-hipaa">HIPAA-READY</span>}
              </div>
              <div className="pricing-row-price">
                {t.price !== null ? (
                  <>
                    <span className="pricing-row-price-currency">$</span>
                    <span className="pricing-row-price-amount">{t.price}</span>
                    <span className="pricing-row-price-period">{t.period}</span>
                  </>
                ) : (
                  <>
                    {('priceLeader' in t) && (t as { priceLeader?: string }).priceLeader && (
                      <span className="pricing-row-price-period" style={{ marginRight: '0.4rem' }}>{(t as { priceLeader?: string }).priceLeader}</span>
                    )}
                    <span className="pricing-row-price-currency">$</span>
                    <span className="pricing-row-price-amount">{t.priceDisplay}</span>
                    <span className="pricing-row-price-period">{t.period}</span>
                  </>
                )}
              </div>
            </div>

            <div className="pricing-row-divider" />

            <p className="pricing-row-desc">{t.desc}</p>

            <p className="pricing-row-features">
              {t.features.join(' \u2014 ')}
            </p>

            <div className="pricing-row-cta-wrap">
              {t.cta.isModal ? (
                <button onClick={() => setShowEnterprise(true)} className="pricing-row-cta">
                  {t.cta.label} <span className="pricing-row-cta-arrow">&rarr;</span>
                </button>
              ) : (
                <Link href={t.cta.href} className="pricing-row-cta">
                  {t.cta.label} <span className="pricing-row-cta-arrow">&rarr;</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {showEnterprise && (
        <div className="enterprise-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowEnterprise(false) }}>
          <div className="enterprise-modal">
            <button className="enterprise-close" onClick={() => setShowEnterprise(false)}>&times;</button>
            {!submitted ? (
              <>
                <h3 className="enterprise-modal-title">Let&apos;s build your plan</h3>
                <p className="enterprise-modal-sub">Tell us about your business and we&apos;ll put together a custom package that fits.</p>
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
                <div className="enterprise-success-icon">&#10003;</div>
                <h3>We&apos;ll be in touch</h3>
                <p>Thanks for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours.</p>
                <button className="enterprise-submit" onClick={() => setShowEnterprise(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
