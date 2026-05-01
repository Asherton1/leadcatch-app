'use client'

import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'
import '../enterprise/enterprise.css'
import './enterprise-welcome.css'

const ONBOARDING_TIMELINE = [
  {
    day: 'Day 1',
    title: 'Kickoff invitation',
    desc: 'Your dedicated success engineer reaches out with a calendar link to schedule your kickoff call within 24 hours.',
  },
  {
    day: 'Days 2-3',
    title: 'Discovery & scoping',
    desc: 'On the kickoff call we map your locations, existing tools, integration needs, and reporting requirements. You leave with a written deployment plan.',
  },
  {
    day: 'Days 4-7',
    title: 'Installation & configuration',
    desc: 'Our team handles the tracking script installation across all your locations, configures your dashboard, and sets up integrations with your existing systems.',
  },
  {
    day: 'Day 8',
    title: 'Live operation',
    desc: 'Your first abandoned leads start flowing into the dashboard. Real-time alerts go to your team. Recovery emails fire automatically.',
  },
]

const WHITE_GLOVE_INCLUDES = [
  'Tracking script installation across every location',
  'Custom AI voice agent configuration per location',
  'CRM and practice management system integrations',
  'Branded recovery email templates per site',
  'Dashboard configuration with per-location filtering',
  'Slack Connect channel between your team and ours',
  'Training session for your front-desk and operations teams',
  'Quarterly executive review meetings',
]

export default function EnterpriseWelcomePage() {
  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />

      {/* Hero */}
      <section className="welcome-hero">
        <div className="welcome-hero-inner">
          <div className="welcome-hero-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="welcome-hero-eyebrow">Subscription active</p>
          <h1 className="welcome-hero-headline">Welcome to ReCapture.</h1>
          <p className="welcome-hero-sub">
            Your enterprise account is now live. A confirmation email is on its way to your inbox with your account details and next steps.
          </p>
        </div>
      </section>

      {/* Onboarding timeline */}
      <section className="welcome-section">
        <div className="welcome-section-inner">
          <p className="welcome-section-eyebrow">Your onboarding timeline</p>
          <h2 className="welcome-section-headline">From signed contract to live operation in 8 days.</h2>

          <div className="welcome-timeline">
            {ONBOARDING_TIMELINE.map(stage => (
              <div key={stage.day} className="welcome-timeline-item">
                <div className="welcome-timeline-day">{stage.day}</div>
                <div className="welcome-timeline-content">
                  <div className="welcome-timeline-title">{stage.title}</div>
                  <p className="welcome-timeline-desc">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White-glove inclusions */}
      <section className="welcome-section welcome-section-alt">
        <div className="welcome-section-inner">
          <p className="welcome-section-eyebrow">What is included</p>
          <h2 className="welcome-section-headline">Everything we handle for you in onboarding.</h2>

          <div className="welcome-includes-grid">
            {WHITE_GLOVE_INCLUDES.map(item => (
              <div key={item} className="welcome-includes-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="welcome-section">
        <div className="welcome-section-inner">
          <p className="welcome-section-eyebrow">Your first 7 days</p>
          <h2 className="welcome-section-headline">What to expect this week.</h2>

          <div className="welcome-expect-grid">
            <div className="welcome-expect-card">
              <div className="welcome-expect-num">01</div>
              <div className="welcome-expect-title">Calendar invitation arrives within 24 hours</div>
              <p className="welcome-expect-desc">Your dedicated success engineer will email you to schedule the kickoff call. Pick the time that works for you and your operations team.</p>
            </div>
            <div className="welcome-expect-card">
              <div className="welcome-expect-num">02</div>
              <div className="welcome-expect-title">Slack Connect channel opens</div>
              <p className="welcome-expect-desc">A shared Slack channel between your team and our enterprise team. Your direct line to us during onboarding and beyond.</p>
            </div>
            <div className="welcome-expect-card">
              <div className="welcome-expect-num">03</div>
              <div className="welcome-expect-title">Account portal access</div>
              <p className="welcome-expect-desc">Your dashboard credentials arrive once your tracking script goes live across your locations. You will have full visibility from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="welcome-contact">
        <div className="welcome-contact-inner">
          <p className="welcome-contact-eyebrow">Need to reach us</p>
          <h2 className="welcome-contact-headline">Your enterprise team is one message away.</h2>
          <p className="welcome-contact-desc">
            Direct concierge access for enterprise customers. We respond same-day during business hours.
          </p>
          <div className="welcome-contact-grid">
            <div className="welcome-contact-card">
              <div className="welcome-contact-card-label">Email</div>
              <a href="mailto:hello@userecapture.com" className="welcome-contact-card-value">hello@userecapture.com</a>
            </div>
            <div className="welcome-contact-card">
              <div className="welcome-contact-card-label">Concierge line</div>
              <a href="tel:+18886060630" className="welcome-contact-card-value">(888) 606-0630</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
