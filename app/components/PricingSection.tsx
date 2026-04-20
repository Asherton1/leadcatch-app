'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [showEnterprise, setShowEnterprise] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', locations: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [openTier, setOpenTier] = useState<number | null>(1)
  const [isMobile, setIsMobile] = useState(false)

  const essentials = annual ? 167 : 197
  const pro = annual ? 337 : 397

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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
      name: 'Essentials',
      price: `$${essentials}`,
      period: `/mo${annual ? ' · billed annually' : ''}`,
      desc: "See every lead you're losing. Follow up manually.",
      featured: false,
      badge: null,
      features: [
        'Real-time form abandonment tracking',
        'Exit-intent detection',
        'Lead dashboard with contact details',
        'Lead scoring (hot/warm/cold)',
        'Revenue-at-risk estimation',
        'Weekly email report',
        'Manual follow-up (email & call)',
      ],
      orangeFrom: 99,
      cta: <Link href="/signup?plan=essentials" className="pricing-cta pricing-cta-secondary" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem' }}>Start Free Trial</Link>,
      extra: <div className="pricing-upgrade-hint"><p>Want automated recovery?</p><p><Link href="/signup?plan=pro">Upgrade to Pro</Link> anytime.</p></div>,
    },
    {
      name: 'Pro',
      price: `$${pro}`,
      period: `/mo${annual ? ' · billed annually' : ''}`,
      desc: "Automated recovery. Leads come back without lifting a finger.",
      featured: true,
      badge: 'Most Popular',
      hipaa: true,
      features: [
        'Everything in Essentials',
        'Automated lead recovery emails',
        'Instant SMS lead alerts',
        'Instant Slack lead alerts',
        'Custom sender name & branding',
        'Configurable send delay timing',
        'Outbound webhooks (Zapier, Make)',
        'Ai voice callback within 60 seconds',
        'Weekly reports with trend analytics',
        'HIPAA-ready data handling + BAA available',
        'Priority support',
      ],
      orangeFrom: 1,
      cta: <Link href="/signup?plan=pro" className="pricing-cta pricing-cta-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem' }}>Start Free Trial</Link>,
      extra: null,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      hipaa: true,
      period: '',
      desc: 'Multiple locations. One powerful dashboard. Volume pricing built for scale.',
      featured: false,
      badge: null,
      features: [
        'Everything in Pro',
        'HIPAA BAA included',
        'Unlimited websites & locations',
        'Centralized multi-location dashboard',
        'Per-location reporting & analytics',
        'White-glove onboarding & installation',
        'Custom-branded recovery emails per site',
        'Free Form Audit reports for your clients',
        'Ai voice callback with custom agent per location',
        'Executive roll-up reports',
        'Dedicated account manager',
      ],
      orangeFrom: 0,
      cta: <button onClick={() => setShowEnterprise(true)} className="pricing-cta pricing-cta-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', width: '100%' }}>Contact Us</button>,
      extra: null,
    },
  ]

  const renderDesktop = () => (
    <div className="pricing-grid pricing-grid-3">
      {tiers.map((t, i) => (
        <div className={`pricing-card${t.featured ? ' pricing-card-featured' : ''}${i === 2 ? ' pricing-card-enterprise' : ''}`} key={i}>
          {t.badge ? <div className="pricing-badge">{t.badge}</div> : <div style={{ height: '28px' }}></div>}
          {'hipaa' in t && (t as {hipaa?: boolean}).hipaa ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '6px', padding: '0.25rem 0.6rem', marginBottom: '0.75rem', fontSize: '0.7rem', fontWeight: 600, color: '#22c55e', letterSpacing: '0.05em' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
              HIPAA Ready
            </div>
          ) : <div style={{ height: '26px' }}></div>}
          <div className="pricing-tier">{t.name}</div>
          <div className="pricing-price">
            {t.name !== 'Enterprise' ? (
              <>
                <span className="price-dollar">$</span>
                <span className="price-amount">{t.name === 'Essentials' ? essentials : pro}</span>
                <span className="price-period">{t.period}</span>
              </>
            ) : (
              <span className="price-amount" style={{ fontSize: '2rem' }}>Custom</span>
            )}
          </div>
          <p className="pricing-desc">{t.desc}</p>
          <ul className="pricing-features">
            {t.features.map((f, fi) => (
              <li key={fi}><span className={`check-icon${fi >= t.orangeFrom ? ' check-orange' : ''}`}>✓</span>{f}</li>
            ))}
          </ul>
          {t.cta}
          {t.extra}
        </div>
      ))}
    </div>
  )

  const renderMobile = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {tiers.map((t, i) => (
        <div key={i} style={{ borderBottom: '1px solid #1e1e1e', overflow: 'hidden' }}>
          <button
            onClick={() => setOpenTier(openTier === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {t.badge && <span style={{ fontSize: '0.65rem', background: 'rgba(255,107,53,0.15)', color: '#ff6b35', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>★</span>}
              {'hipaa' in t && (t as {hipaa?: boolean}).hipaa && <span style={{ fontSize: '0.65rem', background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}><svg width="9" height="9" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>HIPAA</span>}
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: openTier === i ? '#ff6b35' : '#fff', transition: 'color 0.3s' }}>{t.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35' }}>{t.price}<span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 400 }}>{t.period}</span></span>
              <span style={{ color: openTier === i ? '#ff6b35' : '#555', fontSize: '1.25rem', transition: 'transform 0.3s, color 0.3s', transform: openTier === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
            </div>
          </button>
          <div style={{
            maxHeight: openTier === i ? '600px' : '0',
            opacity: openTier === i ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease',
            overflow: 'hidden',
          }}>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>{t.desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
              {t.features.map((f, fi) => (
                <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.875rem', color: '#bbb' }}>
                  <span style={{ color: fi >= t.orangeFrom ? '#ff6b35' : '#555', flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {t.cta}
            {t.extra}
            <div style={{ height: '1.25rem' }} />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="lc-section pricing-section" id="pricing">
      <h2 className="section-title">Simple, Transparent Pricing</h2>
      <p className="section-subtitle">No setup fees. No long-term contracts. Cancel anytime. HIPAA-ready for healthcare and medical practices.</p>

      <div className="pricing-toggle">
        <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
        <button className="toggle-switch" onClick={() => setAnnual(!annual)}>
          <div className={`toggle-knob ${annual ? 'toggled' : ''}`} />
        </button>
        <span className={annual ? 'toggle-active' : ''}>Annual <span className="save-badge">Save 15%</span></span>
      </div>

      {isMobile ? renderMobile() : renderDesktop()}

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
                <div className="enterprise-success-icon">✓</div>
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
