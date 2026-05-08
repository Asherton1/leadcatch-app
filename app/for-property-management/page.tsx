import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Property Management — ReCapture',
  description: '60%+ of renters request a tour within 24 hours of discovering a property and 41% prefer automated booking. ReCapture captures every visitor who started filling out a tour or contact form on your property websites.',
  keywords: 'form abandonment property management, apartment lead recovery, multifamily lead generation',
}

const SAMPLE_LEADS = [
  { name: 'Tyler J.', initials: 'TJ', email: 'tyler.j@gmail.com', service: '2BR tour - The Landmark', value: 28800, status: 'Recovered' as const },
  { name: 'Priya K.', initials: 'PK', email: 'p.k@outlook.com', service: '1BR pricing - Park Vista', value: 22200, status: 'Contacted' as const },
  { name: 'Jordan B.', initials: 'JB', email: 'j.b@yahoo.com', service: '3BR availability - Heights', value: 35400, status: 'Open' as const },
]

export default function ForPropertyManagement() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — two-column editorial. Text left, dashboard mockup right. */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Property Management
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              Most renters book the same day they find your property.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              60% of renters request a tour within 24 hours of finding a listing. 41% prefer automated booking. The leasing companies that respond first win the tour. The ones that take 15 hours never get a callback.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
                Start free trial
              </Link>
              <Link href="/demo" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
                See live demo
              </Link>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <DashboardMockup
              abandoned={64}
              revenueAtRisk={1843200}
              recovered={18}
              recoveredRevenue={518400}
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
            The leasing funnel leaks at the tour-request form, not the application.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              According to Apartments.com's 2025 renter behavior data, more than 60% of renters request a tour within 24 hours of discovering a property — and nearly 25% reach out within just a few hours. Speed-to-lead defines who gets the tour.
            </p>
            <p>
              The catch: 41% of renters across all age groups now prefer automated tools to book tours (rising to 59% for renters aged 18-24, per NMHC 2025). Tour-request forms are the most common entry point. They are also the most abandoned.
            </p>
            <p>
              For a multifamily portfolio with 200 monthly tour-request form starters, the leak is enormous. Industry-wide inquiry-to-lease conversion sits between 0.4% and 1.2%. Recovering even 10% of the abandoned form starts moves the needle on every property.
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
            $24,000 annual lease value. One recovery covers five years of subscription.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="math-grid">
            <div>
              <div style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1rem' }}>
                60%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Of renters tour within 24 hours
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '2rem 0' }} />
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.75rem' }}>
                $24K
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Average annual lease value
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                The average multifamily annual lease value is <strong style={{ color: '#fff' }}>$24,000+ at $2,000/month</strong>, with luxury units exceeding $48,000/year. Pro plan ReCapture is $397/month. <strong style={{ color: '#fff' }}>One recovered lease pays for five years of subscription.</strong>
              </p>
              <p>
                Across a 10-property portfolio generating 500+ monthly form starts, an 8-22% recovery rate translates to <strong style={{ color: '#fff' }}>40-110 additional tour bookings monthly</strong>. At industry-average application-to-lease rates, that's 3-8 additional signed leases per month from leads you already had.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Sources: Apartments.com 2025 Renter Behavior Report; NMHC 2025 Renter Preferences Survey; CBRE 2025 Multifamily Outlook.
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
              ReCapture is a single line of JavaScript on your property websites. The moment a prospective renter types into your tour request or contact form, we capture the field. If they leave without submitting, your leasing team gets an SMS within seconds, and Marissa — our AI voice concierge — places a callback within five minutes.
            </p>
            <p>
              For multifamily, the recovery scene is purpose-built around speed-to-tour.
            </p>
          </div>

          {/* The Marissa scene — editorial chat transcript */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · 2 min 14 sec
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>6:18 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Tyler is on Apartments.com, lands on The Landmark's tour request form. Types his name and phone. Gets distracted by another listing in his feed. Closes the tab.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>6:18 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Leasing office SMS fires automatically. Marissa is queued for callback within five minutes.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>6:22 PM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Marissa, AI voice concierge</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi Tyler, this is Marissa with The Landmark. I saw you were just looking at our 2-bedroom availability. Would you like me to schedule a tour for this weekend or next week?&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>6:25 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Tyler agrees to a Saturday morning tour. Marissa books it directly into the leasing calendar and texts confirmation.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>6:26 PM</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Lead status: Recovered. Estimated lease value: $28,800.
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
            04 — Built for property management specifics
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Multi-property dashboard, tour-first, leasing-team SMS.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Multi-property
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Portfolio support, built in.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Run 10, 50, or 500+ properties under one dashboard with per-property lead segmentation. Each property can route SMS alerts to its leasing team independently.
              </p>
            </div>

            <div style={{ padding: '2rem', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Tour-request specific
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Optimized for the most-abandoned form on your sites.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Tour-request forms have the highest abandonment rate in multifamily. Our tracker captures move-in date, bedroom count, and price range fields specifically.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Leasing-team SMS
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                First responder advantage automated.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Multifamily prospects pick whoever responds first. Your leasing team gets SMS alerts the second a form is abandoned, with the prospect's name, contact info, and which unit type they were viewing.
              </p>
            </div>

            <div style={{ padding: '2rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Concession-aware
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Recovery scripts respect your specials.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Marissa is configured to acknowledge current move-in specials and concessions without overpromising. Pricing-specific questions route to your leasing team.
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
              <strong style={{ color: '#e4e4e7' }}>Essentials</strong> at $197/mo for single-property managers with under 1,000 monthly visitors. Includes recovery dashboard, tracker, automated follow-up emails.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo for established multifamily operators with consistent traffic. Adds SMS alerts to leasing team, AI voice callback (Marissa), and weekly performance reports.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for portfolio operators (10+ properties), institutional multifamily, and high lead volume sites. Custom pricing, dedicated account manager, multi-property dashboard.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            See your invisible tours.
          </h2>
          <p style={{ color: '#a1a1aa', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem', maxWidth: '560px' }}>
            Drop the tracker. Watch your first abandoned consultation come through within an hour. 7-day free trial. Card required, not charged until day 8.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
              Start free trial
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

    </div>
  )
}
