'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'


const FEATURE_INFO: Record<string, string> = {
  'Meta CAPI + Google Ads conversion signals': 'Recovered inquiries go back to Meta and Google as server-side conversion events, hashed and deduplicated against your existing pixel so nothing double counts.',
  'Intent-weighted conversion values': 'Someone who filled five fields is worth more than someone who filled two. Each event carries a value reflecting how far they actually got.',
  'Returning visitor detection': 'Spots when the same person starts your form more than once across days or weeks, and weights their score accordingly.',
  'Closed-won attribution back to ad platforms': 'When a recovered lead becomes a customer, the real revenue goes back to Meta and Google so campaigns optimise toward money rather than form fills.',
  'Channel and campaign attribution reporting': 'Every captured inquiry traced to the channel and campaign that produced it, including untagged and Local Services traffic.',
  'One website — every page and form included': 'No per-form or per-page limits. One script tag covers the whole site, subdomains included.',
  'Full session journey per lead': 'See every page someone visited before they started your form, in order, with time on each.',
  'AI voice callback within 60 seconds': 'An AI agent calls the abandoned lead back and identifies itself as automated. Currently in beta.',
  'Automated lead recovery emails': 'A branded email goes out on your behalf on whatever delay you set, from your own sender name.',
  'Instant SMS lead alerts': 'A text to your team the moment a high-intent inquiry abandons, with the name and contact details attached.',
  'Instant Slack lead alerts': 'Lead alerts posted straight into your team channel, with one-click actions.',
  'Custom sender name & branding': 'Recovery emails come from your business, not from us. Your logo, your colours, your reply-to address.',
  'Configurable send delay timing': 'Choose how long to wait before recovery fires. Immediate for high-intent categories, longer where a fast follow-up would feel intrusive.',
  'Outbound webhooks (Zapier, Make)': 'Push every captured lead to any endpoint in real time, or into Zapier and Make for anything else you run.',
  'Weekly reports with trend analytics': 'A weekly summary of what was captured, what was recovered, and how it moved against previous weeks.',
  'HIPAA-ready data handling + BAA available': 'Contact fields only, never free text. Sensitive fields hard excluded at the code level. BAA available for healthcare deployments.',
  'Priority support': 'Direct access rather than a ticket queue, with same-day response on anything blocking.',
  'Everything in Pro': 'Every capability from the Pro plan, applied across all of your locations.',
  'One dashboard across every location': 'All sites in one view, with the ability to drill into any single location without switching accounts.',
  'HIPAA BAA included': 'A Business Associate Agreement executed as part of the plan rather than an add-on.',
  'Unlimited websites & locations': 'No cap on sites within your plan tier. Add a location without adding a subscription.',
  'Centralized multi-location dashboard': 'Rolled-up numbers across every site, with attention flags on the locations that have inquiries waiting.',
  'Per-location reporting & analytics': 'Capture and recovery broken out by site, so you can see which locations are converting and which are not.',
  'White-glove onboarding & installation': 'We install the tracker and configure every form ourselves rather than handing you documentation.',
  'Custom-branded recovery emails per site': 'Each location sends under its own name and branding, not a single corporate template.',
  'Free Form Audit reports for your clients': 'A written audit of any form on your sites, covering what it captures, where it leaks, and what to change.',
  'Executive roll-up reports': 'A single report across every location, built for someone who needs the number rather than the detail.',
  'Dedicated account manager': 'One named person who knows your account, rather than whoever picks up the ticket.',
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const [showEnterprise, setShowEnterprise] = useState(false)
  const [openTier, setOpenTier] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', locations: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [visible, setVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

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
      name: 'PRO',
      price: pro,
      priceDisplay: `$${pro}`,
      period: '/ mo',
      desc: "Everything you need on one website. Partial inquiries captured the moment someone abandons your form, scored by intent, with recovery running automatically and every lead attributed back to the campaign that produced it.",
      hipaa: true,
      features: [
        'Meta CAPI + Google Ads conversion signals',
        'Intent-weighted conversion values',
        'Returning visitor detection',
        'Closed-won attribution back to ad platforms',
        'Channel and campaign attribution reporting',
        'One website \u2014 every page and form included',
        'Full session journey per lead',
        'AI voice callback within 60 seconds',
        'Automated lead recovery emails',
        'Instant SMS lead alerts',
        'Instant Slack lead alerts',
        'Custom sender name & branding',
        'Configurable send delay timing',
        'Outbound webhooks (Zapier, Make)',
        'Weekly reports with trend analytics',
        'HIPAA-ready data handling + BAA available',
        'Priority support',
      ],
      cta: { label: 'Start your 7-day free trial', href: '/signup?plan=pro', isModal: false },
      isPro: false,
    },
    {
      name: 'GROUP',
      price: null,
      priceLeader: 'from',
      priceDisplay: '897',
      period: '/ mo',
      desc: 'More than one location? Pricing scales with your footprint \u2014 $897 for two to four locations, up through franchise systems and groups. Every plan includes one rolled-up dashboard across every site.',
      hipaa: true,
      features: [
        'Everything in Pro',
        'One dashboard across every location',
        'HIPAA BAA included',
        'Unlimited websites & locations',
        'Centralized multi-location dashboard',
        'Per-location reporting & analytics',
        'White-glove onboarding & installation',
        'Custom-branded recovery emails per site',
        'Free Form Audit reports for your clients',
        'Executive roll-up reports',
        'Dedicated account manager',
      ],
      cta: { label: 'Start your 7-day free trial', href: '/signup?plan=group', isModal: false },
      isPro: true,
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

            <button
              className={'pricing-drawer-toggle' + (openTier === i ? ' is-open' : '')}
              type="button"
              onClick={() => setOpenTier(openTier === i ? null : i)}
              aria-expanded={openTier === i}
            >
              <span>What&apos;s included</span>
              <span className="pricing-drawer-count">{t.features.length}</span>
              <span className="pricing-drawer-chev">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </button>

            <div className="pricing-drawer" style={{ gridTemplateRows: openTier === i ? '1fr' : '0fr' }}>
              <div className="pricing-drawer-inner">
                <ul className="pricing-feature-list">
                  {t.features.map((f, fi) => {
                    const info = FEATURE_INFO[f]
                    return (
                      <li key={fi} className={info ? 'has-info' : ''}>
                        <span className="pf-label">{f}</span>
                        {info && <span className="pf-tip" role="tooltip">{info}</span>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

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

      <p className="pricing-ladder-note">
        More than four locations? Plans run from $1,997 for five to eight sites, up through
        franchise systems and groups. <a href="/enterprise">See every plan &rarr;</a>
      </p>

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
