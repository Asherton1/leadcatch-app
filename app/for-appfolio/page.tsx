import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'ReCapture for AppFolio — Push Leasing Prospects Into Your Pipeline',
  description: 'AppFolio tracks submitted leasing inquiries. ReCapture captures the 70% who started an inquiry and never finished. Push abandoned prospects into AppFolio in real-time via webhook.',
  keywords: 'AppFolio form abandonment, AppFolio lead recovery, AppFolio integration, multifamily lead capture, property management leasing forms, multifamily Zapier',
}

const SAMPLE_LEADS = [
  { name: 'Sarah K.', initials: 'SK', email: 'sarah.k@gmail.com', service: 'Tour request', value: 36000, status: 'Recovered' as const },
  { name: 'Mark T.', initials: 'MT', email: 'mark.t@outlook.com', service: '2BR availability', value: 42000, status: 'Contacted' as const },
  { name: 'Jessica R.', initials: 'JR', email: 'jess.r@gmail.com', service: 'Floor plan inquiry', value: 30000, status: 'Open' as const },
]

export default function ForAppFolio() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — two-column editorial. Text left, dashboard mockup right. */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              For Multifamily Property Managers on AppFolio
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              AppFolio tracks the prospects who hit submit. We capture the 70% of leasing inquiries who didn't.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              Baymard Institute's research shows 60-70% of website visitors abandon contact forms before submitting — and multifamily leasing inquiries run as high as 70%. AppFolio tracks the prospects who finish. ReCapture is the layer that captures the rest — and pushes them straight into AppFolio in real-time.
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
              abandoned={142}
              revenueAtRisk={298400}
              recovered={38}
              recoveredRevenue={79800}
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
            AppFolio is the lease. ReCapture is the catch.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              AppFolio is the operating system for property management companies of every size. It runs the leasing pipeline, the prospect tracking, the application flows, the lease signing, the resident communication, the accounting. It is genuinely excellent at converting prospects who submitted a leasing inquiry.
            </p>
            <p>
              The problem: Baymard Institute's 2024 research shows 60-70% of website visitors who start a form never submit it — and multifamily leasing inquiries run higher, up to 70%. AppFolio never sees those people. They show up in your site analytics as bounce-rate or unattributed traffic. Your ad budget paid for the click. The prospect disappeared. Your unit stays vacant.
            </p>
            <p>
              ReCapture is the layer that captures them — before they leave the site. One script tag per client. The lead lands in their dashboard. Recovery via SMS or AI voice callback fires automatically.
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
            70% of leasing inquiries are abandoned. AppFolio only sees the rest.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="math-grid">
            <div>
              <div style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1rem' }}>
                60-70%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Of form starts never submit (Baymard, 2024)
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '2rem 0' }} />
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.75rem' }}>
                1 line
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Of JavaScript per site
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                For a multifamily portfolio with 200 units and ~800 monthly leasing inquiry starters across your site, that's roughly <strong style={{ color: '#fff' }}>500-560 abandoned inquiries per month</strong>. Even at a conservative 10% recovery rate, you're capturing <strong style={{ color: '#fff' }}>50-56 additional qualified prospects monthly</strong> — feeding the top of your AppFolio leasing pipeline with applicants who would otherwise have disappeared into your bounce rate.
              </p>
              <p>
                ReCapture pushes captured prospects directly into AppFolio via webhook. One install on your leasing site, real-time sync, and your existing AppFolio prospect workflows fire as if the inquiry submitted normally. No automation rebuild, no migration, no platform switch.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Source: Baymard Institute 2024 form abandonment research.
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
              Drop the ReCapture tracker on your leasing site (works with AppFolio's built-in marketing sites, Knock, Rently, RentCafe, Funnel, or any custom builds). The moment a visitor types into a leasing inquiry form, we capture the field. If they leave without submitting, the prospect lands in your ReCapture dashboard, fires a webhook into AppFolio as a new prospect, an SMS fires to your leasing team, and Marissa — our AI voice concierge — places a callback within five minutes.
            </p>
            <p>
              Prospect webhook-routes into your existing AppFolio leasing pipeline and triggers your existing workflows. No re-platforming. No AppFolio replacement. Pure additive layer that captures the leases you were already losing to vacant units.
            </p>
          </div>

          {/* The Marissa scene — editorial chat transcript */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · 1 min 47 sec
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>2:14 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  A visitor on your client's site (Bella Med Spa) starts the Botox consultation form. Types name and email. Closes the tab.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>2:14 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Prospect is captured in ReCapture dashboard, webhook fires to AppFolio creating a new prospect record with source attribution. SMS to your leasing team fires.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>2:18 PM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Marissa, AI voice concierge</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi there, this is Marissa, an AI concierge with Bella Med Spa. I saw you were just looking at our Botox consultation. Want me to find a time this week?&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>2:21 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Prospect schedules a tour. Recovered status syncs to AppFolio prospect record. Leasing team sees a new qualified applicant in their pipeline before they tour the competing property down the street.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>2:21 PM</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Prospect status: Recovered. Synced to AppFolio.
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
            04 — Built for AppFolio property managers
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Real-time, AppFolio-native, no rebuild required.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                White-label ready
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Your brand. Our infrastructure.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Custom recovery email branding, custom SMS sender ID, your company name throughout. Prospects who get the recovery email see your brand, not ours.
              </p>
            </div>

            <div style={{ padding: '2rem', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Multi-client dashboard
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                All your clients, one screen.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Single dashboard for your entire team. Real-time recovery metrics, ROI tracking, and weekly performance reports delivered every Monday.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                AppFolio webhook integration
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Real-time prospect routing into your AppFolio leasing pipeline.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Captured prospects webhook directly into AppFolio as new prospect records via Zapier or Make. Your existing prospect workflows, source attribution, and leasing team routing fire as if the inquiry submitted normally. No automation rebuild required.
              </p>
            </div>

            <div style={{ padding: '2rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Compatible with any AppFolio plan
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Resell at your markup or pass through at cost.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Works with AppFolio Core and AppFolio Plus, from single-property managers up to 500+ unit portfolios. No upgrade required to start capturing abandoned inquiries. ReCapture is plan-agnostic.
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
              <strong style={{ color: '#e4e4e7' }}>Per-client Pro</strong> at $397/mo per managed client site. Includes recovery dashboard, tracker, AI voice callback, SMS alerts.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Multi-site teams</strong> discounts available for 3+ properties. Contact us for custom pricing.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for multi-location businesses, dedicated account manager, BAA included, white-glove onboarding. Custom pricing.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            Add the recovery layer to your AppFolio leasing pipeline.
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

    </div>
  )
}
