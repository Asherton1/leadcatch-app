import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import FAQSection from '../components/FAQSection'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Plastic Surgery — ReCapture',
  description: 'Cosmetic surgery practices spend $100+ per lead and only 22% convert to procedures. ReCapture captures every visitor who started typing on your consultation form and recovers them in under five minutes.',
  keywords: 'form abandonment plastic surgery, plastic surgery lead recovery, cosmetic surgery lead generation',
}

const SAMPLE_LEADS = [
  { name: 'Rachel M.', initials: 'RM', email: 'r.m@gmail.com', service: 'Rhinoplasty consultation', value: 8500, status: 'Recovered' as const },
  { name: 'Ashley P.', initials: 'AP', email: 'a.park@outlook.com', service: 'Breast augmentation', value: 9200, status: 'Contacted' as const },
  { name: 'Sophia L.', initials: 'SL', email: 's.l@yahoo.com', service: 'BBL inquiry', value: 15000, status: 'Open' as const },
]

const FAQS: { question: string; answer: string }[] = [
  { question: "Is ReCapture HIPAA compliant for plastic surgery practices?", answer: "Yes — HIPAA-eligible on Enterprise plans with a Business Associate Agreement (BAA). Cosmetic surgery consultation forms collect highly sensitive PHI (areas of concern, body imaging interest, medical history). ReCapture handles that with the same standards as your EMR." },
  { question: "How much revenue can a plastic surgery practice expect to recover?", answer: "Plastic surgery practices spend an average of $100+ per lead with only 22% converting to procedures. ReCapture clients in this vertical recover 6-10% of abandoned consultation form starters. For a single-location practice with 100 form abandonments per month and average procedure value of $15,000, that is $90,000-$150,000 in monthly recovery." },
  { question: "Will my consultation forms still work the same way?", answer: "Yes, exactly the same. ReCapture is a passive tracking layer — it does not alter your form UI, validation, or submission flow. Visitors who complete the form still route to your booking system. ReCapture only acts when someone abandons." },
]

export default function ForPlasticSurgery() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — two-column editorial. Text left, dashboard mockup right. */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Plastic Surgery
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              $100 per lead. Only 22% become procedures.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              Cosmetic surgery has the highest cost-per-lead in elective medicine and one of the lowest conversion rates. Every abandoned consultation form is ad spend you already paid for, walking out the door before your coordinator ever sees it.
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
              abandoned={29}
              revenueAtRisk={232000}
              recovered={7}
              recoveredRevenue={56000}
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
            Cosmetic surgery has the most expensive leads in healthcare, and the worst follow-up.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              According to InfluxMD's 2025 Medical Practice Lead Conversion analysis, cosmetic surgery clinics face an average $100 cost-per-lead with only a 3.92% conversion rate. CuFinder's 2026 plastic surgery benchmarks show that even when a lead becomes a consultation, only 22% of leads ultimately undergo a procedure.
            </p>
            <p>
              The leak is rarely the surgery itself. It's the gap between intent and contact. A prospective patient lands on your website at 2:47 PM, types her name into your rhinoplasty consultation form, hesitates on the price, and closes the tab. Your coordinator never knew she existed.
            </p>
            <p>
              You paid $100 to bring her there. Your competitor down the street will get the next click and call her back faster.
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
            $12,500 average patient lifetime value. One recovery covers two years of subscription.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="math-grid">
            <div>
              <div style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1rem' }}>
                $100
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Cost per cosmetic lead (InfluxMD, 2025)
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', margin: '2rem 0' }} />
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.75rem' }}>
                22%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Lead-to-procedure conversion rate
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                The average plastic surgery patient lifetime value is <strong style={{ color: '#fff' }}>$12,500+ over three years</strong> (CuFinder 2026), with single high-ticket procedures like BBL exceeding <strong style={{ color: '#fff' }}>$15,000 in lifetime value</strong>. Pro plan ReCapture costs <strong style={{ color: '#fff' }}>$397/month</strong>. One recovered procedure pays for two years of subscription.
              </p>
              <p>
                For a practice generating 200 monthly form starts, an 8-22% recovery rate translates to <strong style={{ color: '#fff' }}>16 to 44 additional procedure consults monthly</strong> — from leads you already paid $20,000 in ad spend to acquire.
              </p>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1.5rem', fontStyle: 'italic' }}>
                Sources: InfluxMD 2025 Medical Practice Lead Conversion Crisis Report; CuFinder Plastic Surgery Industry Marketing Benchmarks 2026.
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
              ReCapture is a single line of JavaScript on your site. The moment a visitor types into your consultation form, we capture the field. If they leave without submitting, your coordinator gets an SMS, and Marissa — our AI voice concierge — places a callback within five minutes.
            </p>
            <p>
              For plastic surgery, discretion matters. Marissa is configured to never discuss specifics that would compromise patient privacy. She references the page they visited and offers to schedule a private consultation, nothing more.
            </p>
          </div>

          {/* The Marissa scene — editorial chat transcript */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · 2 min 47 sec
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>11:32 AM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Rachel lands on Premier Aesthetics' rhinoplasty consultation page. Types her first name and phone. Hesitates at the procedure budget question and closes the tab.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>11:32 AM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Coordinator SMS fires automatically. Marissa is queued for discreet callback in five minutes.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>11:35 AM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Marissa, AI voice concierge</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi Rachel, this is Marissa, an AI concierge with Premier Aesthetics. I saw you were just looking at our consultation page. Would you like me to set up a private call with one of our patient coordinators this week?&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>11:38 AM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Rachel agrees. Marissa books a private consultation with the practice coordinator for Friday afternoon.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>11:39 AM</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Lead status: Recovered. Estimated value: $8,500.
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
            04 — Built for plastic surgery specifics
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Discretion-first, HIPAA-ready, high-touch.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Privacy-first messaging
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Discretion is default.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Recovery messaging never references specific procedures by name in SMS or email subject lines. Marissa offers private consultations rather than discussing details on first contact.
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
                Architecture, subprocessor stack, and BAA template are in place. BAA execution is available on Enterprise plans, activated upon signed contract. See our <Link href="/trust" style={{ color: '#ff6b35' }}>trust page</Link>.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                High-ticket follow-up
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Configurable for $5K-$30K consultations.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Lead value scoring routes high-ticket inquiries (BBL, mommy makeover, multi-procedure) to your senior coordinator first. Standard inquiries route to your general intake queue.
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
              <strong style={{ color: '#e4e4e7' }}>Essentials</strong> at $197/mo for solo-practitioner clinics with under 1,000 monthly visitors. Includes recovery dashboard, tracker, automated follow-up emails.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo for established plastic surgery practices with consistent ad spend. Adds SMS alerts to coordinator, AI voice callback (Marissa), and weekly performance reports.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for multi-surgeon practices, BAA-required HIPAA deployments, and high lead volume sites. Custom pricing, dedicated account manager.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            See your invisible consultations.
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

      <FAQSection faqs={FAQS} />
      <RelatedPages page="for-plastic-surgery" />

    </div>
  )
}
