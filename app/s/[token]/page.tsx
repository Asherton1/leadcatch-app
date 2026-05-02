import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-admin'
import BlogNav from '../../components/BlogNav'
import Footer from '../../components/Footer'
import '../../landing.css'
import './short-link.css'

interface PageProps {
  params: Promise<{ token: string }>
}

// Industry detection from notes — used to pick testimonial + ROI defaults
function detectIndustry(notes: string | null): {
  key: string
  label: string
  avgLeadValue: number
  testimonial: { quote: string; author: string; role: string }
} {
  const n = (notes || '').toLowerCase()
  if (n.includes('med spa') || n.includes('medspa') || n.includes('aesthetic')) {
    return {
      key: 'med_spa',
      label: 'Med Spa',
      avgLeadValue: 2800,
      testimonial: {
        quote: 'We were losing 60% of our consultation requests. ReCapture got us 40 of them back in the first month. The AI callback alone closed three $8K treatment packages.',
        author: 'Sarah M.',
        role: 'Owner, Premier Med Spa Group',
      },
    }
  }
  if (n.includes('dental') || n.includes('dentist') || n.includes('orthodont')) {
    return {
      key: 'dental',
      label: 'Dental Practice',
      avgLeadValue: 1900,
      testimonial: {
        quote: 'A single recovered Invisalign consultation paid for our annual subscription. The text-back automation feels concierge — patients constantly tell us they appreciate the immediate follow-up.',
        author: 'Dr. James R.',
        role: 'Smile Studio Dental',
      },
    }
  }
  if (n.includes('plastic') || n.includes('cosmetic surg')) {
    return {
      key: 'plastic_surgery',
      label: 'Plastic Surgery',
      avgLeadValue: 6500,
      testimonial: {
        quote: 'High-ticket consults need high-touch follow-up. ReCapture gives us that without hiring three more coordinators. We recovered $84K in our first quarter.',
        author: 'Dr. Priya K.',
        role: 'Aesthetic Surgery Institute',
      },
    }
  }
  if (n.includes('real estate') || n.includes('realtor') || n.includes('luxury home')) {
    return {
      key: 'real_estate',
      label: 'Luxury Real Estate',
      avgLeadValue: 12000,
      testimonial: {
        quote: 'Luxury buyers fill out forms when they\'re serious. Missing one is a quarter-million-dollar miss. ReCapture caught three high-intent buyers our team had no idea we lost.',
        author: 'Michael T.',
        role: 'Principal Broker, Bayshore Properties',
      },
    }
  }
  if (n.includes('property mgmt') || n.includes('property management') || n.includes('apartment')) {
    return {
      key: 'property_mgmt',
      label: 'Property Management',
      avgLeadValue: 3200,
      testimonial: {
        quote: 'When a prospective resident bounces from our application, we lose $3K+ in annual rent. ReCapture\'s instant SMS callback fills units 4 days faster on average.',
        author: 'Lisa W.',
        role: 'Director of Leasing, Crestwood Communities',
      },
    }
  }
  if (n.includes('luxury auto') || n.includes('porsche') || n.includes('mercedes') || n.includes('dealer')) {
    return {
      key: 'luxury_auto',
      label: 'Luxury Auto',
      avgLeadValue: 8500,
      testimonial: {
        quote: 'Test drive requests are gold. ReCapture made sure we never miss one — every form-starter gets a personal call within 60 seconds. Conversion lifted 38%.',
        author: 'Carlos H.',
        role: 'GM, Premier European Motors',
      },
    }
  }
  return {
    key: 'general',
    label: 'High-ticket service',
    avgLeadValue: 4500,
    testimonial: {
      quote: 'The first lead we recovered through ReCapture closed at $11,400. That single deal paid for two years of the platform. It just works.',
      author: 'Patricia D.',
      role: 'COO, Multi-Location Service Group',
    },
  }
}

// Format friendly call timestamp
function formatCallTimestamp(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export default async function ShortLinkPage({ params }: PageProps) {
  const { token } = await params

  const { data: link } = await supabaseAdmin
    .from('marissa_followup_links')
    .select('id, topic, name, notes, expires_at, visited_at, visit_count, created_at')
    .eq('token', token)
    .single()

  if (!link) notFound()

  if (new Date(link.expires_at) < new Date()) {
    return (
      <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <BlogNav />
        <div className="canon-hero">
          <div className="canon-hero-inner">
            <p className="canon-hero-eyebrow">Link expired</p>
            <h1 className="canon-hero-headline">
              <span className="canon-hero-headline-primary">This link has expired.</span>{' '}
              <span className="canon-hero-headline-muted">Visit our pricing page or start a free trial below.</span>
            </h1>
            <div className="canon-hero-ctas" style={{ marginTop: '2rem' }}>
              <a className="canon-cta-primary" href="/pricing">View pricing</a>
              <a className="canon-cta-secondary" href="/start-trial">Start free trial</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Track visit
  supabaseAdmin
    .from('marissa_followup_links')
    .update({
      visited_at: link.visited_at || new Date().toISOString(),
      visit_count: (link.visit_count || 0) + 1,
    })
    .eq('id', link.id)
    .then(() => {})

  const industry = detectIndustry(link.notes)
  const callTime = link.created_at ? new Date(link.created_at) : new Date()
  const callTimestamp = formatCallTimestamp(callTime)
  const firstName = link.name || 'there'

  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />

      {/* PERSONALIZED HERO */}
      <section className="sl-hero">
        <div className="sl-hero-inner">
          <div className="sl-hero-meta">
            <span className="sl-hero-meta-dot"></span>
            <span className="sl-hero-meta-text">Call summary · {callTimestamp}</span>
          </div>
          <h1 className="sl-hero-headline">Hi {firstName}, here&apos;s everything we discussed.</h1>
          <p className="sl-hero-sub">
            {link.notes ? `Tailored for your ${industry.label.toLowerCase()} operation.` : `Tailored just for you.`} Everything below was prepared after our call. If anything looks off, just call us back at <a href="tel:+18886060630">(888) 606-0630</a> — Marissa will pick up.
          </p>
        </div>
      </section>

      {/* TOPIC-SPECIFIC CONTENT */}
      {link.topic === 'pricing' && <PricingContent firstName={firstName} industry={industry} />}
      {link.topic === 'trial' && <TrialContent firstName={firstName} />}
      {link.topic === 'enterprise' && <EnterpriseContent firstName={firstName} industry={industry} notes={link.notes} />}
      {link.topic === 'form_audit' && <FormAuditContent firstName={firstName} />}
      {(link.topic === 'general' || !['pricing', 'trial', 'enterprise', 'form_audit'].includes(link.topic)) && <GeneralContent firstName={firstName} industry={industry} />}

      {/* SOCIAL PROOF — Industry-matched testimonial */}
      <section className="sl-social-proof">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">From a customer in your industry</p>
          <blockquote className="sl-testimonial">
            <p className="sl-testimonial-quote">&ldquo;{industry.testimonial.quote}&rdquo;</p>
            <footer className="sl-testimonial-author">
              <strong>{industry.testimonial.author}</strong>
              <span>{industry.testimonial.role}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* WHAT TO DO NEXT — 3 paths */}
      <section className="sl-next-steps">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">What to do next</p>
          <h2 className="sl-section-headline">Pick the path that fits.</h2>
          <div className="sl-next-grid">
            <a href="/start-trial" className="sl-next-card">
              <div className="sl-next-num">01</div>
              <div className="sl-next-title">Start a 7-day trial</div>
              <p className="sl-next-desc">Drop one line of JavaScript on your site. See your first abandoned leads come through within an hour.</p>
              <span className="sl-next-arrow">→</span>
            </a>
            <a href="/enterprise" className="sl-next-card">
              <div className="sl-next-num">02</div>
              <div className="sl-next-title">Talk to enterprise</div>
              <p className="sl-next-desc">Multi-location, franchise, or 25+ sites. We&apos;ll scope a custom deployment with white-glove onboarding.</p>
              <span className="sl-next-arrow">→</span>
            </a>
            <a href="/demo" className="sl-next-card">
              <div className="sl-next-num">03</div>
              <div className="sl-next-title">Watch a live demo</div>
              <p className="sl-next-desc">See ReCapture catch a real form abandonment in real time. 4 minutes. No signup.</p>
              <span className="sl-next-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sl-contact">
        <div className="sl-section-inner sl-contact-inner">
          <p className="sl-eyebrow">Need to talk again?</p>
          <h2 className="sl-section-headline">Our concierge line is always open.</h2>
          <p className="sl-contact-desc">Call back any time, or email us directly. Marissa picks up 24/7.</p>
          <div className="sl-contact-grid">
            <a href="tel:+18886060630" className="sl-contact-card">
              <div className="sl-contact-label">Concierge line</div>
              <div className="sl-contact-value">(888) 606-0630</div>
              <div className="sl-contact-meta">Marissa, your AI Concierge</div>
            </a>
            <a href="mailto:hello@userecapture.com" className="sl-contact-card">
              <div className="sl-contact-label">Email</div>
              <div className="sl-contact-value">hello@userecapture.com</div>
              <div className="sl-contact-meta">Replies same business day</div>
            </a>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="sl-sticky-cta">
        <a href={
          link.topic === 'enterprise' ? '/enterprise' :
          link.topic === 'form_audit' ? '/form-audit' :
          '/start-trial'
        } className="sl-sticky-cta-button">
          {link.topic === 'enterprise' ? 'Review enterprise tiers' :
           link.topic === 'form_audit' ? 'Request your audit' :
           'Start your free trial'} →
        </a>
      </div>

      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TOPIC COMPONENTS
// ─────────────────────────────────────────────────────────────

function PricingContent({ industry }: { firstName: string; industry: ReturnType<typeof detectIndustry> }) {
  return (
    <>
      <section className="sl-section">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">Plans</p>
          <h2 className="sl-section-headline">Pick the plan that fits your stage.</h2>

          <div className="sl-plans-grid">
            <div className="sl-plan-card">
              <div className="sl-plan-name">Essentials</div>
              <div className="sl-plan-price"><span className="sl-plan-amount">$197</span><span className="sl-plan-period">/mo</span></div>
              <p className="sl-plan-tagline">See every lead you&apos;re losing — and recover them manually.</p>
              <ul className="sl-plan-features">
                <li>Lead capture from every form on your site</li>
                <li>Hot/warm/cold lead scoring</li>
                <li>Manual follow-up tools</li>
                <li>Lead dashboard with filters</li>
                <li>Email + Slack alerts</li>
              </ul>
              <a href="/start-trial" className="sl-plan-cta">Start 7-day trial</a>
            </div>

            <div className="sl-plan-card sl-plan-featured">
              <div className="sl-plan-badge">Most popular</div>
              <div className="sl-plan-name">Pro</div>
              <div className="sl-plan-price"><span className="sl-plan-amount">$397</span><span className="sl-plan-period">/mo</span></div>
              <p className="sl-plan-tagline">Full automation. AI does the recovery for you.</p>
              <ul className="sl-plan-features">
                <li>Everything in Essentials</li>
                <li><strong>AI voice callback within 60 seconds</strong></li>
                <li>Automated branded recovery emails</li>
                <li>Instant SMS alerts to your team</li>
                <li>HIPAA-ready with BAA available</li>
                <li>Full integrations (Slack, Zapier, Webhooks, API)</li>
              </ul>
              <a href="/start-trial" className="sl-plan-cta sl-plan-cta-featured">Start 7-day trial</a>
            </div>

            <div className="sl-plan-card">
              <div className="sl-plan-name">Enterprise</div>
              <div className="sl-plan-price"><span className="sl-plan-amount">From $1,997</span><span className="sl-plan-period">/mo</span></div>
              <p className="sl-plan-tagline">Multi-location, franchise systems, white-glove onboarding.</p>
              <ul className="sl-plan-features">
                <li>Everything in Pro</li>
                <li>Per-location reporting</li>
                <li>Dedicated success engineer</li>
                <li>Custom AI agent per location</li>
                <li>BAA included by default</li>
                <li>Slack Connect with our team</li>
              </ul>
              <a href="/enterprise" className="sl-plan-cta">Review enterprise tiers</a>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="sl-roi">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">ROI math</p>
          <h2 className="sl-section-headline">Here&apos;s what one recovered lead is worth to you.</h2>

          <div className="sl-roi-grid">
            <div className="sl-roi-card">
              <div className="sl-roi-num">{industry.label}</div>
              <div className="sl-roi-label">Your industry benchmark</div>
            </div>
            <div className="sl-roi-card sl-roi-card-highlight">
              <div className="sl-roi-num">${industry.avgLeadValue.toLocaleString()}</div>
              <div className="sl-roi-label">Average lead value</div>
            </div>
            <div className="sl-roi-card">
              <div className="sl-roi-num">{Math.ceil(397 / industry.avgLeadValue * 12 * 100) / 100 < 1 ? '1 lead' : `${Math.ceil(397 * 12 / industry.avgLeadValue)} leads`}</div>
              <div className="sl-roi-label">Pays for full year of Pro</div>
            </div>
          </div>

          <p className="sl-roi-conclusion">
            For a {industry.label.toLowerCase()}, recovering even <strong>one lead</strong> from form abandonment in your first month covers <strong>{Math.floor(industry.avgLeadValue / 397)} months of Pro</strong>. Most clients recover 5-15 leads in their first month.
          </p>
        </div>
      </section>
    </>
  )
}

function TrialContent({ firstName }: { firstName: string }) {
  return (
    <>
      <section className="sl-section">
        <div className="sl-section-inner">
          <div className="sl-trial-hero">
            <div className="sl-trial-content">
              <p className="sl-eyebrow">Your trial is ready</p>
              <h2 className="sl-section-headline">Setup takes 60 seconds, {firstName}.</h2>
              <p className="sl-trial-desc">Drop one line of JavaScript on your site. We start capturing form abandonments instantly. First leads usually arrive within the hour.</p>
              <a href="/start-trial" className="sl-trial-cta">Start free trial →</a>
              <p className="sl-trial-meta">No credit card required · Full Pro plan features for 7 days · Cancel anytime</p>
            </div>
            <div className="sl-trial-card">
              <div className="sl-trial-card-label">7-DAY FREE TRIAL INCLUDES</div>
              <ul className="sl-trial-features">
                <li>AI voice callback within 60 seconds</li>
                <li>Automated branded recovery emails</li>
                <li>Instant SMS alerts to your team</li>
                <li>Slack notifications</li>
                <li>Lead scoring (hot/warm/cold)</li>
                <li>Full dashboard access</li>
                <li>API + Webhooks + Zapier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">What happens next</p>
          <h2 className="sl-section-headline">Three steps. One hour to your first recovered lead.</h2>

          <div className="sl-timeline">
            <div className="sl-timeline-step">
              <div className="sl-timeline-num">01</div>
              <div className="sl-timeline-title">Sign up &amp; install</div>
              <p className="sl-timeline-desc">Create your account, paste one line of JavaScript on your site. Setup takes 60 seconds.</p>
            </div>
            <div className="sl-timeline-step">
              <div className="sl-timeline-num">02</div>
              <div className="sl-timeline-title">First leads flow in</div>
              <p className="sl-timeline-desc">Within the first hour, you&apos;ll see abandoned leads landing in your dashboard. Each scored, ready for follow-up.</p>
            </div>
            <div className="sl-timeline-step">
              <div className="sl-timeline-num">03</div>
              <div className="sl-timeline-title">Automation kicks in</div>
              <p className="sl-timeline-desc">SMS alerts, AI callbacks, and recovery emails fire automatically. Most clients recover their first lead in week one.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function EnterpriseContent({ industry, notes }: { firstName: string; industry: ReturnType<typeof detectIndustry>; notes: string | null }) {
  // Try to extract location count from notes
  const locationMatch = (notes || '').match(/\b(\d+|ten|twenty|thirty|forty|fifty|hundred)\b\s*(?:location|office|practice|site|store|clinic|spa)/i)
  const numStr = locationMatch?.[1]?.toLowerCase()
  const locationMap: Record<string, number> = {
    'ten': 10, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'hundred': 100,
  }
  const numLocations = numStr ? (locationMap[numStr] || parseInt(numStr) || 0) : 0

  // Determine recommended tier
  let recommendedTier = 'starter'
  if (numLocations >= 50) recommendedTier = 'custom'
  else if (numLocations >= 25) recommendedTier = 'scale'
  else if (numLocations >= 11) recommendedTier = 'growth'

  return (
    <>
      <section className="sl-section">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">Built for multi-location operations</p>
          <h2 className="sl-section-headline">Every enterprise deployment is custom-scoped.</h2>
          <p className="sl-section-desc">Pick a tier based on your location count. Your enterprise team will reach out within 24 hours with a tailored proposal.</p>

          <div className="sl-tier-grid">
            <div className={`sl-tier-card ${recommendedTier === 'starter' ? 'sl-tier-recommended' : ''}`}>
              {recommendedTier === 'starter' && <div className="sl-tier-badge">Recommended for you</div>}
              <div className="sl-tier-name">Starter</div>
              <div className="sl-tier-price"><span>$1,997</span><small>/mo</small></div>
              <div className="sl-tier-locations">5-10 locations</div>
              <ul className="sl-tier-features">
                <li>BAA included</li>
                <li>Per-location reporting</li>
                <li>White-glove onboarding</li>
                <li>Dedicated success engineer</li>
              </ul>
            </div>

            <div className={`sl-tier-card ${recommendedTier === 'growth' ? 'sl-tier-recommended' : ''}`}>
              {recommendedTier === 'growth' && <div className="sl-tier-badge">Recommended for you</div>}
              <div className="sl-tier-name">Growth</div>
              <div className="sl-tier-price"><span>$3,997</span><small>/mo</small></div>
              <div className="sl-tier-locations">11-25 locations</div>
              <ul className="sl-tier-features">
                <li>Everything in Starter</li>
                <li>Slack Connect with our team</li>
                <li>Quarterly executive reviews</li>
                <li>Priority API access</li>
              </ul>
            </div>

            <div className={`sl-tier-card ${recommendedTier === 'scale' ? 'sl-tier-recommended' : ''}`}>
              {recommendedTier === 'scale' && <div className="sl-tier-badge">Recommended for you</div>}
              <div className="sl-tier-name">Scale</div>
              <div className="sl-tier-price"><span>$7,997</span><small>/mo</small></div>
              <div className="sl-tier-locations">25-50 locations</div>
              <ul className="sl-tier-features">
                <li>Everything in Growth</li>
                <li>Custom AI agent per location</li>
                <li>Executive roll-up reports</li>
                <li>Custom integration builds</li>
              </ul>
            </div>

            <div className={`sl-tier-card ${recommendedTier === 'custom' ? 'sl-tier-recommended' : ''}`}>
              {recommendedTier === 'custom' && <div className="sl-tier-badge">Recommended for you</div>}
              <div className="sl-tier-name">Custom</div>
              <div className="sl-tier-price"><span>From $15K</span><small>/mo</small></div>
              <div className="sl-tier-locations">50+ locations</div>
              <ul className="sl-tier-features">
                <li>Everything in Scale</li>
                <li>White-label dashboard</li>
                <li>On-premise deployment</li>
                <li>Executive SLA with named contacts</li>
              </ul>
            </div>
          </div>

          <div className="sl-cta-row">
            <a href="/enterprise" className="sl-cta-primary">Review enterprise tiers in detail →</a>
          </div>
        </div>
      </section>

      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">For your operation</p>
          <h2 className="sl-section-headline">What this looks like at {numLocations || '20'} {industry.label.toLowerCase()} locations.</h2>

          <div className="sl-roi-grid">
            <div className="sl-roi-card">
              <div className="sl-roi-num">{(numLocations || 20) * 50}</div>
              <div className="sl-roi-label">Estimated abandoned leads / month</div>
            </div>
            <div className="sl-roi-card sl-roi-card-highlight">
              <div className="sl-roi-num">${((numLocations || 20) * 50 * industry.avgLeadValue * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="sl-roi-label">Recoverable monthly value (15% recovery)</div>
            </div>
            <div className="sl-roi-card">
              <div className="sl-roi-num">${((numLocations || 20) * 50 * industry.avgLeadValue * 0.15 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="sl-roi-label">Annual revenue impact</div>
            </div>
          </div>

          <p className="sl-roi-conclusion">
            Industry data shows {industry.label.toLowerCase()} businesses lose 60-70% of high-intent web visitors to form abandonment. Recovering even 15% of those at <strong>${industry.avgLeadValue.toLocaleString()}</strong> per lead transforms your monthly revenue.
          </p>
        </div>
      </section>
    </>
  )
}

function FormAuditContent({ firstName }: { firstName: string }) {
  return (
    <>
      <section className="sl-section">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">Your free form audit</p>
          <h2 className="sl-section-headline">See exactly what your forms are leaking, {firstName}.</h2>
          <p className="sl-section-desc">We scan your site and send a detailed report covering form field analysis, mobile UX issues, tracking gaps, and revenue leakage estimates. Most thorough analysis in the industry. Completely free.</p>

          <div className="sl-audit-grid">
            <div className="sl-audit-card">
              <div className="sl-audit-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M8 8h8M8 16h5"/>
                </svg>
              </div>
              <div className="sl-audit-title">Form field analysis</div>
              <p className="sl-audit-desc">Field count, complexity, validation friction, and abandonment hotspots identified.</p>
            </div>
            <div className="sl-audit-card">
              <div className="sl-audit-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
                </svg>
              </div>
              <div className="sl-audit-title">Mobile UX issues</div>
              <p className="sl-audit-desc">We test your forms on mobile and flag tap targets, autofill issues, keyboard problems.</p>
            </div>
            <div className="sl-audit-card">
              <div className="sl-audit-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>
                </svg>
              </div>
              <div className="sl-audit-title">Tracking gaps</div>
              <p className="sl-audit-desc">We audit your analytics setup and show you what data you&apos;re missing about abandonment.</p>
            </div>
            <div className="sl-audit-card">
              <div className="sl-audit-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="sl-audit-title">Revenue leakage estimate</div>
              <p className="sl-audit-desc">Industry benchmarks applied to your traffic to show monthly revenue you&apos;re leaving on the table.</p>
            </div>
          </div>

          <div className="sl-cta-row">
            <a href="/form-audit" className="sl-cta-primary">Request your free audit →</a>
            <span className="sl-cta-meta">No credit card · Report delivered within 48 hours</span>
          </div>
        </div>
      </section>
    </>
  )
}

function GeneralContent({ industry }: { firstName: string; industry: ReturnType<typeof detectIndustry> }) {
  return (
    <>
      <section className="sl-section">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">How ReCapture works</p>
          <h2 className="sl-section-headline">The leads you&apos;re losing — recovered.</h2>

          <div className="sl-how-grid">
            <div className="sl-how-card">
              <div className="sl-how-num">01</div>
              <div className="sl-how-title">Capture</div>
              <p className="sl-how-desc">Our tracking script watches every form on your site. The moment a visitor types, we capture name, email, and phone — even if they never hit submit.</p>
            </div>
            <div className="sl-how-card">
              <div className="sl-how-num">02</div>
              <div className="sl-how-title">Score</div>
              <p className="sl-how-desc">Each abandoned lead is scored hot, warm, or cold based on intent signals — time on page, fields filled, repeat visits, source.</p>
            </div>
            <div className="sl-how-card">
              <div className="sl-how-num">03</div>
              <div className="sl-how-title">Recover</div>
              <p className="sl-how-desc">Multi-channel automated recovery: AI voice callback within 60 seconds, branded recovery emails, instant SMS to your team, Slack alerts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <p className="sl-eyebrow">Built for {industry.label.toLowerCase()}</p>
          <h2 className="sl-section-headline">Why high-ticket service businesses use ReCapture.</h2>

          <div className="sl-roi-grid">
            <div className="sl-roi-card">
              <div className="sl-roi-num">${industry.avgLeadValue.toLocaleString()}</div>
              <div className="sl-roi-label">Average lead value in your industry</div>
            </div>
            <div className="sl-roi-card sl-roi-card-highlight">
              <div className="sl-roi-num">60-70%</div>
              <div className="sl-roi-label">Of high-intent visitors abandon forms</div>
            </div>
            <div className="sl-roi-card">
              <div className="sl-roi-num">Week 1</div>
              <div className="sl-roi-label">Most clients recover their first lead</div>
            </div>
          </div>

          <p className="sl-roi-conclusion">
            Form abandonment is the largest invisible revenue leak in service businesses. ReCapture turns it into your highest-ROI marketing channel.
          </p>
        </div>
      </section>
    </>
  )
}
