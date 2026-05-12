import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Luxury Auto — ReCapture',
  description: 'Average auto dealer response time is 42-47 hours. Responding within 5 minutes makes you 21-100x more likely to convert. ReCapture captures every visitor who started typing on your inquiry form.',
  keywords: 'form abandonment luxury auto, dealership lead recovery, auto lead generation',
}

const SAMPLE_LEADS = [
  { name: 'Robert H.', initials: 'RH', email: 'r.hayes@gmail.com', service: 'Range Rover Sport - test drive', value: 12500, status: 'Recovered' as const },
  { name: 'Catherine M.', initials: 'CM', email: 'c.m@outlook.com', service: 'Porsche Macan - inquiry', value: 11200, status: 'Contacted' as const },
  { name: 'Trevor L.', initials: 'TL', email: 't.l@yahoo.com', service: 'BMW X7 - finance pre-qual', value: 14800, status: 'Open' as const },
]

export default function ForLuxuryAuto() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — two-column editorial. Text left, dashboard mockup right. */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Luxury Auto
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              Average dealer takes 42 hours. The first 5 minutes are 100x more valuable.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              Strolid's 2024 analysis of 2.3 million auto leads found dealers responding within 5 minutes are 21-100x more likely to convert than those waiting 30 minutes. Yet the industry average response time is 42 hours. Every abandoned form is a buyer driving to your competitor.
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
              abandoned={52}
              revenueAtRisk={442000}
              recovered={14}
              recoveredRevenue={119000}
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
            The conversion gap between 5 minutes and 30 minutes is 21x. Most dealers wait 42 hours.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              Demand Local's 2026 dealership benchmark study and Strolid's analysis of 2.3 million auto leads paint a brutal picture: the average dealer takes 42-47 hours to respond to internet leads. The data is consistent across thousands of dealerships and multiple research firms.
            </p>
            <p>
              Meanwhile, dealerships responding within 5 minutes are 21-100x more likely to convert. Wait 30 minutes and lead effectiveness drops by 21x. The decay curve is logarithmic and unforgiving.
            </p>
            <p>
              Combine that with a Pied Piper 2026 study finding that only 51% of dealers deliver a 'perfect response' within 15 minutes, and you have an industry-wide opportunity for any dealer willing to respond first.
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
            $42 average cost-per-lead. Recovering 5 leads pays for the year.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="math-grid">
            <div>
              <div style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1rem' }}>
                42 hrs
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Average dealer response time (Strolid, 2024)
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '2rem 0' }} />
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.75rem' }}>
                21x
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Conversion lift at 5-min response
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                According to Demand Local's 2026 benchmarks, the average dealership cost-per-lead is <strong style={{ color: '#fff' }}>$42.95</strong>, with internet leads closing at 6% within 30 days. Phone leads close at 14%. <strong style={{ color: '#fff' }}>Phone leads convert at more than double the rate of internet leads.</strong>
              </p>
              <p>
                For a dealership generating 200 monthly form starts, an 8-22% recovery rate via 5-minute callback translates to <strong style={{ color: '#fff' }}>16-44 additional phone-quality leads per month</strong>. At a 14% close rate and average deal value, that's 2-6 additional vehicle sales monthly from leads you already had.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Sources: Demand Local 2026 Dealership Conversion Benchmarks; Strolid 2024 Lead Response Time Analysis (2.3M leads); Pied Piper PSI 2026 Internet Lead Effectiveness Study.
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
              ReCapture is a single line of JavaScript on your dealership site. The moment a visitor types into your test drive request, finance pre-qual, or vehicle inquiry form, we capture the field. If they leave without submitting, your sales floor gets an SMS within seconds, and Marissa places a callback within five minutes.
            </p>
            <p>
              For luxury auto, the recovery scene turns an abandoned internet form into a phone-quality lead — the kind that closes at 14% instead of 6%.
            </p>
          </div>

          {/* The Marissa scene — editorial chat transcript */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · 3 min 04 sec
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>4:23 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Robert is on Sewell's site, lands on the test drive form for a Range Rover Sport. Types his name and phone. Gets pulled into a meeting. Closes the tab.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>4:23 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Sales floor SMS fires automatically with Robert's contact and the specific vehicle. Marissa is queued for callback within five minutes.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>4:27 PM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Marissa, AI voice concierge</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi Robert, this is Marissa, an AI concierge with Sewell. I saw you were just looking at the Range Rover Sport. Would you like me to schedule a test drive this weekend, or have one of our specialists call you back today?&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>4:30 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Robert asks about availability. Marissa confirms there's a vehicle on the lot, books a Saturday test drive, and texts the appointment.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>4:31 PM</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Lead status: Recovered. Estimated deal value: $12,500.
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
            04 — Built for luxury auto specifics
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Test-drive specific, multi-rooftop, finance-aware.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Test-drive specific
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Optimized for the highest-value form on your site.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Test drive request forms generate the most qualified leads. Our tracker captures preferred date, vehicle of interest, and trade-in fields. Marissa converts the abandonment into a confirmed appointment.
              </p>
            </div>

            <div style={{ padding: '2rem', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Multi-rooftop
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Group dealership support, built in.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Run multiple stores under one dashboard with per-rooftop lead segmentation. Each rooftop can route SMS alerts to its own sales floor and configure its own call hours.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Finance-aware
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Pre-qual abandonment is the highest-value recovery.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                When a buyer abandons a finance pre-qual form, the lead value is significantly higher than a generic inquiry. Our scoring system flags these leads as priority callbacks.
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
              <strong style={{ color: '#e4e4e7' }}>Essentials</strong> at $197/mo for single-rooftop dealerships with under 1,000 monthly visitors. Includes recovery dashboard, tracker, automated follow-up emails.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo for established dealerships with consistent ad spend. Adds SMS alerts to sales floor, AI voice callback (Marissa), and weekly performance reports.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for multi-rooftop groups, dealer groups, and high lead volume sites. Custom pricing, dedicated account manager, multi-rooftop dashboard.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            Be the first dealer to call back.
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
