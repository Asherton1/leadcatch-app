import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Dental Practices — ReCapture',
  description: '32% of dental practice phone calls go unanswered and the average appointment confirmation rate is just 44%. ReCapture captures every visitor who started typing on your appointment form and recovers them in under five minutes.',
  keywords: 'form abandonment dental, dental practice lead recovery, dental lead generation, patient intake form tracking',
}

const SAMPLE_LEADS = [
  { name: 'Daniel S.', initials: 'DS', email: 'd.smith@gmail.com', service: 'Cosmetic consultation', value: 4200, status: 'Recovered' as const },
  { name: 'Linda K.', initials: 'LK', email: 'l.kim@outlook.com', service: 'Invisalign inquiry', value: 5500, status: 'Contacted' as const },
  { name: 'Marcus T.', initials: 'MT', email: 'm.t@yahoo.com', service: 'Implants consultation', value: 7800, status: 'Open' as const },
]

export default function ForDental() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — two-column editorial. Text left, dashboard mockup right. */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Dental Practices
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              When the patient calls and nobody answers, they call your competitor.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              32% of dental practice calls go to voicemail or hang up. The average appointment confirmation rate is just 44%. Every unanswered inquiry is a patient your practice spent ad budget acquiring, then handed to the dental office down the street.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
                Start your 7-day free trial
              </Link>
              <Link href="/demo" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
                See live demo
              </Link>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <DashboardMockup
              abandoned={38}
              revenueAtRisk={72200}
              recovered={9}
              recoveredRevenue={17100}
              leads={SAMPLE_LEADS}
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BAND */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 01 — The problem */}
        <section className="reveal" style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            01 — The problem
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Form abandonment is the silent leak in every dental ad budget.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              You spent thousands on Google Ads driving prospective patients to your appointment request page. Some of them filled out the form. Most of them did not.
            </p>
            <p>
              According to Henry Schein One's 2024 Industry Report, the average dental practice has a 44% appointment confirmation rate — meaning more than half of opportunities never reach the chair. Add to that the 32% of calls that go unanswered (Arini AI 2025), and the picture becomes clear: most dental practices are losing patients before the front desk ever sees them.
            </p>
            <p>
              Your CRM never registered them. Your reports never showed them. Your practice spent the marketing dollars to bring them to your site, and the only people equipped to bring them back never knew they existed.
            </p>
          </div>
        </section>

      </div>

      {/* SECTION 02 — Full-width architectural stat scene */}
      <section className="reveal stat-band" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem', margin: '2rem 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            02 — The math
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            $1,900 average new patient value. Three recoveries pays for the year.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="math-grid">
            <div>
              <div style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1rem' }}>
                32%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Of dental calls unanswered (Arini, 2025)
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '2rem 0' }} />
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.75rem' }}>
                44%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Avg appointment confirmation rate
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                The average dental new patient lifetime value is approximately <strong style={{ color: '#fff' }}>$1,900</strong> across cleanings, restorative work, and cosmetic procedures (Henry Schein One, 2024). Pro plan ReCapture costs <strong style={{ color: '#fff' }}>$397/month</strong>. Three recovered patients across the year covers the entire annual subscription.
              </p>
              <p>
                Realistic recovery rates for tracked partial submissions sit between <strong style={{ color: '#fff' }}>8% and 22%</strong> depending on follow-up speed. For a practice generating 100 form starts per month, that's <strong style={{ color: '#fff' }}>8 to 22 additional patients monthly</strong> — patients who already showed buying intent and would otherwise be invisible.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Sources: Henry Schein One 2024 Industry Report; Arini AI Receptionist 2025 dental call analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BAND continues */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 03 — The recovery layer */}
        <section className="reveal" style={{ marginBottom: '3rem', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            03 — The recovery layer
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Capture every visitor who started typing. Recover them in under five minutes.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2.5rem' }}>
            <p>
              ReCapture is a single line of JavaScript on your site. The moment a visitor types into your appointment form, we capture the field. If they leave without submitting, your front desk gets an SMS within seconds, and our AI voice concierge — Marissa — places a callback within five minutes if the lead provided a phone number.
            </p>
            <p>
              Here is what that scene actually looks like.
            </p>
          </div>

          {/* The Marissa scene — editorial chat transcript */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · 3 min 18 sec
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>3:14 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Daniel lands on Bright Smiles Dental's cosmetic consultation page. Types &ldquo;Daniel&rdquo; into the name field. Types his phone number. Closes the tab to grab a meeting.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>3:14 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Front desk SMS fires automatically. Marissa is queued for callback in five minutes.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>3:18 PM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Marissa, AI voice concierge</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi Daniel, this is Marissa, an AI concierge with Bright Smiles Dental. I noticed you were just looking at our cosmetic consultation page. Would you like me to find a time that works for you this week?&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>3:21 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Daniel confirms a Thursday morning appointment. Marissa logs the booking and sends confirmation text.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>3:22 PM</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Lead status: Recovered. Estimated value: $4,200.
                </div>
              </div>
            </div>
          </div>

          <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '1rem', fontStyle: 'italic', textAlign: 'center' }}>
            No form migration. No platform replacement. Drop the script tag, configure your services and call hours, and the recovery layer activates on top of every contact form on your site.
          </p>
        </section>

      </div>

      {/* SECTION 04 — Specifics 2x2 grid, full-width band */}
      <section className="reveal specs-band" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem', margin: '2rem 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            04 — Built for dental practice specifics
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Multi-location, HIPAA-ready, insurance-aware.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Multi-location
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Group practice support, built in.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Run multiple offices under one dashboard with per-site lead segmentation. Each location can route SMS alerts and configure its own call hours independently.
              </p>
            </div>

            <div style={{ padding: '2rem', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                HIPAA compliance
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                HIPAA-ready by design.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Architecture, subprocessor stack, and BAA template are in place. For practices handling Protected Health Information, BAA execution is available on Enterprise plans, activated upon signed contract. See our <Link href="/trust" style={{ color: '#ff6b35' }}>trust page</Link>.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Insurance-aware
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Recovery messaging respects insurance complexity.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Marissa is configured to acknowledge insurance verification needs without making promises. Recovery scripts route insurance questions to your front desk during business hours.
              </p>
            </div>

            <div style={{ padding: '2rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                AI voice compliance
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                TCPA + Texas SB 140 compliant.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Marissa identifies herself as automated within the first 15 seconds of every call, satisfying federal and state requirements. Voice callback is optional and disabled by default.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BAND continues — Pricing + closing */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 05 — Pricing */}
        <section className="reveal" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            05 — Pricing
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Plans start at $197/mo. 7-day free trial.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Essentials</strong> at $197/mo for single-office practices with under 1,000 monthly visitors. Includes recovery dashboard, tracker, automated follow-up emails.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo for established practices with consistent ad spend. Adds SMS alerts to front desk, AI voice callback (Marissa), and weekly performance reports.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for multi-office groups (DSOs), BAA-required HIPAA deployments, and high lead volume sites. Custom pricing, dedicated account manager.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            See your invisible patients.
          </h2>
          <p style={{ color: '#a1a1aa', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem', maxWidth: '560px' }}>
            Drop the tracker. Watch your first abandoned consultation come through within an hour. 7-day free trial. Card required, not charged until day 8.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
              Start your 7-day free trial
            </Link>
            <Link href="/pricing" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
              See full pricing
            </Link>
          </div>
        </section>

      </div>

      <Footer />

      {/* Mobile responsive overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes recovered-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        .recovered-dot-pulse {
          animation: recovered-pulse 2s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .math-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .specs-grid {
            grid-template-columns: 1fr !important;
          }
          .specs-grid > div {
            border-right: none !important;
          }
          .specs-grid > div:last-child {
            border-bottom: none !important;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 6rem 1.25rem 2.5rem !important;
          }
          .hero-h1 {
            font-size: 1.75rem !important;
            line-height: 1.15 !important;
          }
          .hero-sub {
            font-size: 1rem !important;
          }
          .content-band {
            padding: 1.25rem !important;
          }
          .stat-band, .specs-band {
            padding: 3.5rem 1.25rem !important;
          }
          .section-h2 {
            font-size: 1.375rem !important;
          }
          .stat-big {
            font-size: 4rem !important;
          }
          .stat-secondary {
            font-size: 2rem !important;
          }
          .closing-h2 {
            font-size: 1.625rem !important;
          }
          .marissa-timeline-row {
            grid-template-columns: 50px 1fr !important;
            gap: 0.5rem !important;
          }
          .marissa-quote-block {
            padding: 0.75rem !important;
          }
          .specs-cell {
            padding: 1.5rem !important;
          }
        }
      ` }} />

      <RelatedPages page="for-dental" />

    </div>
  )
}
