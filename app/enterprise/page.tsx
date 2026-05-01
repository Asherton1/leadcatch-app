'use client'

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

const FEATURE_MATRIX: Array<{ feature: string; tiers: [boolean, boolean, boolean, boolean] }> = [
  { feature: 'Multi-location dashboard',         tiers: [true, true, true, true] },
  { feature: 'BAA & HIPAA compliance',           tiers: [true, true, true, true] },
  { feature: 'White-glove onboarding',           tiers: [true, true, true, true] },
  { feature: 'Dedicated account manager',        tiers: [true, true, true, true] },
  { feature: 'Per-location reporting',           tiers: [true, true, true, true] },
  { feature: 'AI voice callback',                tiers: [true, true, true, true] },
  { feature: 'Custom-branded recovery emails',   tiers: [false, true, true, true] },
  { feature: 'Quarterly executive reviews',      tiers: [false, true, true, true] },
  { feature: 'Custom AI agent per location',     tiers: [false, false, true, true] },
  { feature: 'Executive roll-up reports',        tiers: [false, false, true, true] },
  { feature: 'Dedicated success engineer',       tiers: [false, false, true, true] },
  { feature: 'White-label dashboard',            tiers: [false, false, false, true] },
  { feature: 'On-premise deployment',            tiers: [false, false, false, true] },
  { feature: 'Custom data residency',            tiers: [false, false, false, true] },
  { feature: 'Executive SLA',                    tiers: [false, false, false, true] },
]

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

          <div className="enterprise-matrix-table-wrap">
            <table className="enterprise-matrix-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th>Growth</th>
                  <th>Scale</th>
                  <th>Custom</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_MATRIX.map(row => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    {row.tiers.map((on, i) => (
                      <td key={i} className="enterprise-matrix-cell">
                        {on ? <span className="enterprise-matrix-check">Included</span> : <span className="enterprise-matrix-dash">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="enterprise-contact reveal">
        <div className="enterprise-contact-inner">
          <p className="enterprise-contact-eyebrow">Talk to the founder</p>
          <h2 className="enterprise-contact-headline">Every enterprise deployment starts with a conversation.</h2>
          <p className="enterprise-contact-desc">
            Send a note describing your operation — number of locations, current tools, what you are trying to recover — and Ash, our founder, will personally reply within 24 hours with a tailored proposal.
          </p>
          <a className="enterprise-contact-button" href="mailto:hello@userecapture.com?subject=Enterprise%20Inquiry">
            hello@userecapture.com
          </a>
          <p className="enterprise-contact-fineprint">
            Or call our concierge line: <a href="tel:+18886060630">(888) 606-0630</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
