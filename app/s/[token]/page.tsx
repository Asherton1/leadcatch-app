import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-admin'
import BlogNav from '../../components/BlogNav'
import Footer from '../../components/Footer'
import '../../landing.css'
import './short-link.css'

const TOPIC_CONFIG: Record<string, {
  eyebrow: string
  headline: string
  description: string
  primaryCtaLabel: string
  primaryCtaUrl: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
  bullets: string[]
}> = {
  pricing: {
    eyebrow: 'As promised',
    headline: 'Your ReCapture pricing',
    description: 'Most clients recover their first lead in week one — that single recovered lead usually pays for the entire year.',
    primaryCtaLabel: 'Start your 7-day free trial',
    primaryCtaUrl: '/start-trial',
    secondaryCtaLabel: 'See full pricing page',
    secondaryCtaUrl: '/pricing',
    bullets: [
      'Essentials — $197/mo · See every lead you are losing, manual follow-up tools, lead dashboard',
      'Pro — $397/mo · Everything in Essentials + AI voice callback, recovery emails, SMS alerts, Slack',
      'Enterprise — from $1,997/mo · Multi-location, custom integrations, white-glove onboarding',
      '7-day free trial on Essentials and Pro · No setup fees · Cancel anytime',
    ],
  },
  trial: {
    eyebrow: 'Your trial is ready',
    headline: 'Start your 7-day free trial',
    description: 'Drop one line of JavaScript on your site. See your first abandoned leads come through within an hour.',
    primaryCtaLabel: 'Start free trial',
    primaryCtaUrl: '/start-trial',
    secondaryCtaLabel: 'Watch the live demo',
    secondaryCtaUrl: '/demo',
    bullets: [
      'Setup takes 60 seconds',
      'Full Pro plan features for 7 days',
      'No credit card required to start',
      'Cancel anytime in your dashboard',
      'Recovery emails fire automatically — no manual setup',
    ],
  },
  enterprise: {
    eyebrow: 'Enterprise inquiry',
    headline: 'Built for multi-location operations',
    description: 'Every enterprise deployment is custom-priced based on locations, integrations, and reporting needs. Your enterprise team will reach out within 24 hours.',
    primaryCtaLabel: 'Review enterprise tiers',
    primaryCtaUrl: '/enterprise',
    bullets: [
      'Starter — $1,997/mo · 5-10 locations · BAA included',
      'Growth — $3,997/mo · 11-25 locations · per-location reporting',
      'Scale — $7,997/mo · 25-50 locations · custom AI agent per location',
      'Custom — $15K+/mo · 50+ locations · white-label dashboard, on-premise options',
    ],
  },
  form_audit: {
    eyebrow: 'Free form audit',
    headline: 'See exactly what your forms are leaking',
    description: 'We scan your site and send a detailed report covering field count, mobile UX issues, tracking gaps, and revenue leakage estimates. Most thorough analysis in the industry. Completely free.',
    primaryCtaLabel: 'Request your free audit',
    primaryCtaUrl: '/form-audit',
    bullets: [
      'Form field count and complexity analysis',
      'Mobile UX issue detection',
      'Tracking gaps and analytics blind spots',
      'Industry-specific abandonment benchmarks',
      'Estimated monthly revenue leakage',
      'No credit card required',
    ],
  },
  general: {
    eyebrow: 'About ReCapture',
    headline: 'The leads you are losing — recovered',
    description: 'ReCapture watches every form on your site, captures who started filling them out, and reaches out automatically before they go to a competitor.',
    primaryCtaLabel: 'See how it works',
    primaryCtaUrl: '/how-it-works',
    secondaryCtaLabel: 'Start free trial',
    secondaryCtaUrl: '/start-trial',
    bullets: [
      'Built for high-ticket service businesses',
      'AI voice callback within 60 seconds',
      'Lead scoring (hot, warm, cold)',
      'Real-time SMS and Slack alerts',
      'Automated recovery emails',
      'HIPAA-ready with BAA available',
    ],
  },
}

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function ShortLinkPage({ params }: PageProps) {
  const { token } = await params

  // Look up the token
  const { data: link } = await supabaseAdmin
    .from('marissa_followup_links')
    .select('id, topic, name, expires_at, visited_at, visit_count')
    .eq('token', token)
    .single()

  if (!link) notFound()

  // Check expiration
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
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Track visit (fire and forget)
  supabaseAdmin
    .from('marissa_followup_links')
    .update({
      visited_at: link.visited_at || new Date().toISOString(),
      visit_count: (link.visit_count || 0) + 1,
    })
    .eq('id', link.id)
    .then(() => {})

  const config = TOPIC_CONFIG[link.topic] || TOPIC_CONFIG.general
  const greeting = link.name ? `Hi ${link.name},` : 'Hi there,'

  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />

      <section className="shortlink-hero">
        <div className="shortlink-inner">
          <p className="shortlink-eyebrow">{config.eyebrow}</p>
          <h1 className="shortlink-headline">{config.headline}</h1>
          <p className="shortlink-greeting">{greeting} as promised on our call — here is everything we discussed.</p>
          <p className="shortlink-description">{config.description}</p>
        </div>
      </section>

      <section className="shortlink-content">
        <div className="shortlink-inner">
          <div className="shortlink-bullets">
            {config.bullets.map((b, i) => (
              <div key={i} className="shortlink-bullet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="shortlink-ctas">
            <a href={config.primaryCtaUrl} className="shortlink-cta-primary">
              {config.primaryCtaLabel} →
            </a>
            {config.secondaryCtaLabel && config.secondaryCtaUrl && (
              <a href={config.secondaryCtaUrl} className="shortlink-cta-secondary">
                {config.secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="shortlink-followup">
        <div className="shortlink-inner shortlink-followup-inner">
          <p className="shortlink-eyebrow">Need to talk again?</p>
          <h2 className="shortlink-followup-headline">Our concierge line is open.</h2>
          <p className="shortlink-followup-desc">Call back any time, or email us directly.</p>
          <div className="shortlink-followup-grid">
            <a href="tel:+18886060630" className="shortlink-followup-card">
              <div className="shortlink-followup-label">Concierge line</div>
              <div className="shortlink-followup-value">(888) 606-0630</div>
            </a>
            <a href="mailto:hello@userecapture.com" className="shortlink-followup-card">
              <div className="shortlink-followup-label">Email</div>
              <div className="shortlink-followup-value">hello@userecapture.com</div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
