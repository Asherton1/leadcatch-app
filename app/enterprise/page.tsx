'use client'

import { useState } from 'react'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'
import './enterprise.css'

const STRIPE_LINKS = {
  starter: 'https://buy.stripe.com/fZu3cxa6p1uP6olezvd7q06',
  growth:  'https://buy.stripe.com/4gM3cx2DX7Td3c9ezvd7q05',
  scale:   'https://buy.stripe.com/dRm28t1zTehB285fDzd7q04',
  custom:  'https://buy.stripe.com/3cI4gB5Q9ddx7sp4YVd7q03',
}

const TIERS = [
  {
    key: 'starter',
    name: 'Starter',
    price: '$1,997',
    locations: '5 to 10 locations',
    headline: 'For groups stepping into multi-location.',
    href: STRIPE_LINKS.starter,
    bullets: [
      'Multi-location dashboard',
      'BAA included',
      'White-glove onboarding',
      'Per-location reporting',
      'Dedicated account manager',
      'Priority support',
      'AI voice callback for all locations',
      'Custom-branded recovery emails',
    ],
  },
  {
    key: 'growth',
    name: 'Growth',
    price: '$3,997',
    locations: '11 to 25 locations',
    headline: 'For established multi-location practices.',
    featured: true,
    href: STRIPE_LINKS.growth,
    bullets: [
      'Everything in Starter',
      'Per-location reporting & analytics',
      'Custom-branded recovery emails per site',
      'Quarterly executive review with founder',
      'Custom AI agent voice per region',
      'Free Form Audit reports for clients',
      'Priority API access',
      'Slack Connect channel with our team',
    ],
  },
  {
    key: 'scale',
    name: 'Scale',
    price: '$7,997',
    locations: '25 to 50 locations',
    headline: 'For franchise systems and large groups.',
    href: STRIPE_LINKS.scale,
    bullets: [
      'Everything in Growth',
      'Custom AI voice agent per location',
      'Executive roll-up reports',
      'Dedicated success engineer',
      'Custom integration builds',
      'Monthly strategy calls with founder',
      'Multi-region call routing',
      'Branded mobile dashboard (coming soon)',
    ],
  },
  {
    key: 'custom',
    name: 'Custom',
    price: '$15,000+',
    locations: '50+ locations',
    headline: 'For enterprise systems and franchises with national reach.',
    href: STRIPE_LINKS.custom,
    bullets: [
      'Everything in Scale',
      'White-label dashboard with your branding',
      'On-premise deployment options',
      'Custom integrations (any platform)',
      'Executive SLA with named contacts',
      'Dedicated infrastructure',
      'Custom data residency',
      'Quarterly business reviews',
    ],
  },
]

type TierFlags = [boolean, boolean, boolean, boolean]
interface FeatureGroup {
  name: string
  features: Array<{ feature: string; tiers: TierFlags }>
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    name: 'Foundation',
    features: [
      { feature: 'Multi-location dashboard',         tiers: [true, true, true, true] },
      { feature: 'BAA & HIPAA compliance',           tiers: [true, true, true, true] },
      { feature: 'White-glove onboarding',           tiers: [true, true, true, true] },
      { feature: 'Dedicated account manager',        tiers: [true, true, true, true] },
      { feature: 'Unlimited websites & locations',   tiers: [true, true, true, true] },
    ],
  },
  {
    name: 'Reporting & Analytics',
    features: [
      { feature: 'Per-location reporting',           tiers: [true, true, true, true] },
      { feature: 'Quarterly executive reviews',      tiers: [false, true, true, true] },
      { feature: 'Executive roll-up reports',        tiers: [false, false, true, true] },
      { feature: 'Custom data residency',            tiers: [false, false, false, true] },
    ],
  },
  {
    name: 'AI & Automation',
    features: [
      { feature: 'AI voice callback',                tiers: [true, true, true, true] },
      { feature: 'Custom AI agent per location',     tiers: [false, false, true, true] },
      { feature: 'Custom-branded recovery emails',   tiers: [false, true, true, true] },
      { feature: 'Priority API access',              tiers: [false, true, true, true] },
      { feature: 'Custom integration builds',        tiers: [false, false, true, true] },
    ],
  },
  {
    name: 'White-Glove Service',
    features: [
      { feature: 'Dedicated success engineer',       tiers: [false, false, true, true] },
      { feature: 'Slack Connect with our team',      tiers: [false, true, true, true] },
      { feature: 'Monthly strategy calls',           tiers: [false, false, true, true] },
      { feature: 'White-label dashboard',            tiers: [false, false, false, true] },
      { feature: 'On-premise deployment',            tiers: [false, false, false, true] },
      { feature: 'Executive SLA with named contacts',tiers: [false, false, false, true] },
    ],
  },
]

function EnterpriseInquirySection() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    locations: '',
    industry: '',
    leadVolume: '',
    phone: '',
    bestTime: '',
    message: '',
  })
  const [website, setWebsite] = useState('') // honeypot

  const update = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/enterprise-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: [
            formData.message,
            formData.industry && ('Industry: ' + formData.industry),
            formData.leadVolume && ('Estimated lead volume: ' + formData.leadVolume),
            formData.phone && ('Phone: ' + formData.phone),
            formData.bestTime && ('Best time to talk: ' + formData.bestTime),
          ].filter(Boolean).join('\n\n'),
          website,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      console.error('Enterprise inquiry error:', err)
      setError('Something went wrong. Please email hello@userecapture.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="enterprise-contact reveal">
        <div className="enterprise-contact-inner enterprise-contact-success">
          <div className="enterprise-contact-success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="enterprise-contact-eyebrow">Inquiry received</p>
          <h2 className="enterprise-contact-headline">Thank you. Ash will personally reply within 24 hours.</h2>
          <p className="enterprise-contact-desc">
            Keep an eye on your inbox — Ash will send a tailored proposal and schedule a kickoff call. If urgent, you can also call our concierge line.
          </p>
          <p className="enterprise-contact-fineprint">
            Concierge line: <a href="tel:+18886060630">(888) 606-0630</a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="enterprise-contact reveal">
      <div className="enterprise-contact-inner">
        <p className="enterprise-contact-eyebrow">Talk to the founder</p>
        <h2 className="enterprise-contact-headline">Every enterprise deployment starts with a conversation.</h2>
        <p className="enterprise-contact-desc">
          Tell us about your operation — number of locations, current tools, what you are trying to recover — and Ash, our founder, will personally reply within 24 hours with a tailored proposal.
        </p>

        <form onSubmit={handleSubmit} className="enterprise-form">
          {/* Honeypot — hidden, real users never fill */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            aria-hidden="true"
          />

          <div className="enterprise-form-row">
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Your name *</label>
              <input type="text" required className="enterprise-form-input" value={formData.name} onChange={update('name')} placeholder="Jane Smith" />
            </div>
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Work email *</label>
              <input type="email" required className="enterprise-form-input" value={formData.email} onChange={update('email')} placeholder="jane@company.com" />
            </div>
          </div>

          <div className="enterprise-form-row">
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Company *</label>
              <input type="text" required className="enterprise-form-input" value={formData.company} onChange={update('company')} placeholder="Smith Dental Group" />
            </div>
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Number of locations *</label>
              <input type="text" required className="enterprise-form-input" value={formData.locations} onChange={update('locations')} placeholder="e.g. 25" />
            </div>
          </div>

          <div className="enterprise-form-row">
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Industry</label>
              <select className="enterprise-form-select" value={formData.industry} onChange={update('industry')}>
                <option value="">Select an industry</option>
                <option value="Med Spa">Med Spa</option>
                <option value="Dental">Dental</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
                <option value="Luxury Real Estate">Luxury Real Estate</option>
                <option value="Property Management">Property Management</option>
                <option value="Luxury Auto">Luxury Auto</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Estimated abandoned leads / month</label>
              <input type="text" className="enterprise-form-input" value={formData.leadVolume} onChange={update('leadVolume')} placeholder="e.g. 1,500" />
            </div>
          </div>

          <div className="enterprise-form-row">
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Phone</label>
              <input type="tel" className="enterprise-form-input" value={formData.phone} onChange={update('phone')} placeholder="(214) 555-1234" />
            </div>
            <div className="enterprise-form-field">
              <label className="enterprise-form-label">Best time to talk</label>
              <input type="text" className="enterprise-form-input" value={formData.bestTime} onChange={update('bestTime')} placeholder="Weekday mornings CST" />
            </div>
          </div>

          <div className="enterprise-form-field enterprise-form-field-full">
            <label className="enterprise-form-label">Anything else we should know?</label>
            <textarea className="enterprise-form-textarea" rows={4} value={formData.message} onChange={update('message')} placeholder="Current tools, integration needs, timing, etc." />
          </div>

          {error && <div className="enterprise-form-error">{error}</div>}

          <button type="submit" className="enterprise-form-submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send to Ash'}
          </button>

          <p className="enterprise-form-fineprint">
            Or call our concierge line: <a href="tel:+18886060630">(888) 606-0630</a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default function EnterprisePage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO */}
      <div className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Enterprise</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Built for groups recovering more leads in a week than most tools recover all year.</span>{' '}
            <span className="canon-hero-headline-muted">Custom-priced for multi-location practices, franchise systems, and high-volume operations.</span>
          </h1>
        </div>
      </div>

      {/* ROI ANCHOR */}
      <section className="enterprise-roi reveal">
        <div className="enterprise-roi-inner">
          <p className="enterprise-roi-eyebrow">The ROI math at scale</p>
          <h2 className="enterprise-roi-headline">A 30-location dental group sees roughly $7.2M in annual recovery potential.</h2>
          <div className="enterprise-roi-grid">
            <div className="enterprise-roi-cell">
              <div className="enterprise-roi-num">30</div>
              <div className="enterprise-roi-label">Locations</div>
            </div>
            <div className="enterprise-roi-cell">
              <div className="enterprise-roi-num">60</div>
              <div className="enterprise-roi-label">Abandoned leads / location / month</div>
            </div>
            <div className="enterprise-roi-cell">
              <div className="enterprise-roi-num">$4,000</div>
              <div className="enterprise-roi-label">Average procedure value</div>
            </div>
            <div className="enterprise-roi-cell enterprise-roi-cell-highlight">
              <div className="enterprise-roi-num">$7.2M</div>
              <div className="enterprise-roi-label">Annual recovery potential</div>
            </div>
          </div>
          <p className="enterprise-roi-fineprint">Math assumes 10% recovery rate. Most enterprise clients exceed this within the first 90 days.</p>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="enterprise-tiers reveal">
        <div className="enterprise-tiers-inner">
          <p className="enterprise-tiers-eyebrow">The four enterprise tiers</p>
          <h2 className="enterprise-tiers-headline">Every plan is bespoke. Pricing scales with your locations and integration needs.</h2>

          <div className="enterprise-tiers-grid">
            {TIERS.map(tier => (
              <div
                key={tier.key}
                className={`enterprise-tier-card ${tier.featured ? 'enterprise-tier-card-featured' : ''}`}
              >
                {tier.featured && <div className="enterprise-tier-badge">Most popular</div>}
                <div className="enterprise-tier-name">{tier.name}</div>
                <div className="enterprise-tier-locations">{tier.locations}</div>
                <div className="enterprise-tier-price">
                  <span className="enterprise-tier-price-currency">$</span>
                  <span className="enterprise-tier-price-amount">{tier.price.replace('$','').replace('+','')}</span>
                  {tier.price.includes('+') && <span className="enterprise-tier-price-plus">+</span>}
                  <span className="enterprise-tier-price-period">/ mo</span>
                </div>
                <p className="enterprise-tier-headline">{tier.headline}</p>
                <ul className="enterprise-tier-bullets">
                  {tier.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
                <a className="enterprise-tier-cta" href={tier.href} target="_blank" rel="noopener noreferrer">
                  Begin onboarding →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE MATRIX */}
      <section className="enterprise-matrix reveal">
        <div className="enterprise-matrix-inner">
          <p className="enterprise-matrix-eyebrow">Feature breakdown</p>
          <h2 className="enterprise-matrix-headline">What is included at each tier.</h2>

          {/* Desktop: grouped table */}
          <div className="enterprise-matrix-desktop">
            <div className="enterprise-matrix-header">
              <div className="enterprise-matrix-header-feature">Feature</div>
              <div className="enterprise-matrix-header-tier">Starter</div>
              <div className="enterprise-matrix-header-tier">Growth</div>
              <div className="enterprise-matrix-header-tier">Scale</div>
              <div className="enterprise-matrix-header-tier">Custom</div>
            </div>
            {FEATURE_GROUPS.map(group => (
              <div key={group.name} className="enterprise-matrix-group">
                <div className="enterprise-matrix-group-name">{group.name}</div>
                {group.features.map(row => (
                  <div key={row.feature} className="enterprise-matrix-row">
                    <div className="enterprise-matrix-row-feature">{row.feature}</div>
                    {row.tiers.map((on, i) => (
                      <div key={i} className="enterprise-matrix-row-cell">
                        {on ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Included">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <span className="enterprise-matrix-row-dash">—</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: per-tier stacked cards */}
          <div className="enterprise-matrix-mobile">
            {TIERS.map((tier, ti) => (
              <div key={tier.key} className={`enterprise-matrix-mcard ${tier.featured ? 'enterprise-matrix-mcard-featured' : ''}`}>
                <div className="enterprise-matrix-mcard-name">{tier.name}</div>
                <div className="enterprise-matrix-mcard-locations">{tier.locations}</div>
                {FEATURE_GROUPS.map(group => {
                  const includedFeatures = group.features.filter(f => f.tiers[ti])
                  if (includedFeatures.length === 0) return null
                  return (
                    <div key={group.name} className="enterprise-matrix-mcard-group">
                      <div className="enterprise-matrix-mcard-group-name">{group.name}</div>
                      <ul className="enterprise-matrix-mcard-list">
                        {includedFeatures.map(f => (
                          <li key={f.feature}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>{f.feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA — Enterprise Inquiry Form */}
      <EnterpriseInquirySection />

      <Footer />
    </div>
  )
}
