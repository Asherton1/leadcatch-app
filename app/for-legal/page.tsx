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
  title: 'Form Abandonment Recovery for Law Firms — ReCapture',
  description: 'Law firms lose two-thirds of intake form starters before they submit. At family law and personal injury case values, a single recovered inquiry pays for years of recovery infrastructure.',
  keywords: 'law firm lead recovery, legal intake form abandonment, family law marketing, personal injury lead recovery, law firm intake software',
  alternates: { canonical: '/for-legal' },
  openGraph: {
    title: 'Form Abandonment Recovery for Law Firms — ReCapture',
    description: 'Law firms lose two-thirds of intake form starters before they submit. ReCapture captures and recovers them in under five minutes.',
    url: 'https://www.userecapture.com/for-legal',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Form%20Recovery%20for%20Law%20Firms&eyebrow=For%20Law%20Firms',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form Abandonment Recovery for Law Firms — ReCapture',
    description: 'Most intake form starters never submit. ReCapture recovers them in under five minutes.',
    images: ['https://www.userecapture.com/api/og?title=Form%20Recovery%20for%20Law%20Firms&eyebrow=For%20Law%20Firms'],
  },
}

const SAMPLE_LEADS = [
  { name: 'M. Alvarez', initials: 'MA', email: 'm.alvarez@gmail.com', service: 'Divorce consultation', value: 22000, status: 'Recovered' as const },
  { name: 'D. Whitfield', initials: 'DW', email: 'd.whitfield@outlook.com', service: 'Custody modification', value: 15000, status: 'Contacted' as const },
  { name: 'R. Okafor', initials: 'RO', email: 'r.okafor@yahoo.com', service: 'Property division', value: 28000, status: 'Open' as const },
]

const FAQS: { question: string; answer: string }[] = [
  { question: "Is ReCapture compliant with the Texas DTPA?", answer: "Yes. Every recovery message clearly identifies the firm as the sender, references the specific inquiry the visitor voluntarily started on the firm's own website, and includes clear opt-out language. There is no misrepresentation, no false urgency, and no bait-and-switch. The visitor initiated the conversation — the follow-up completes it. We provide template consent language for the intake form to remove any ambiguity." },
  { question: "What about TCPA for text and voice follow-up?", answer: "Prior express consent is established when a visitor voluntarily enters a phone number into the firm's intake form alongside clear consent language on the form. Quiet hours are enforced by default. The National Do Not Call Registry and the firm's internal DNC list are cross-referenced before any message is sent. AI voice callbacks disclose that they are automated and honor an in-call opt-out. Every communication is logged with a full consent audit trail." },
  { question: "Does ReCapture integrate with Lawmatics and Clio?", answer: "Yes. Recovered inquiries push into Lawmatics or Clio Grow as new leads with all captured fields — name, phone, email, matter type, and completed form data — via webhook or Zapier. The lead lands in the same intake pipeline the firm already uses, so no one has to change how they work or watch a second dashboard." },
  { question: "Is it appropriate to follow up on a family law inquiry?", answer: "Discretion is the default. Recovery messages never reference the practice area, the matter type, or anything the visitor typed about their situation. They reference only that the visitor reached out to the firm and offer a way to continue. For sensitive verticals, firms typically use email-only recovery and disable voice callback entirely — that is a per-firm setting." },
  { question: "What recovery rate should a law firm expect?", answer: "Between 8% and 12% of abandoned intake form starters, depending on follow-up speed and channel mix. On a firm seeing roughly 340 form starts per month, that is 18 to 26 recovered inquiries monthly flowing into the existing consult pipeline." },
  { question: "Will our intake form change in any way?", answer: "No. ReCapture is a passive layer on top of the form you already have. It does not alter the UI, the validation, the routing, or the submission flow. Visitors who submit normally continue exactly as they do today. ReCapture only acts when someone abandons." },
]

export default function ForLegal() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO */}
      <section className="hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '7rem 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Law Firms
            </p>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
              The case walked in at 9:47 PM. The intake form lost it.
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.0625rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
              Legal inquiries do not arrive during business hours. They arrive after the accident, after the fight, after the diagnosis. Someone opens your intake form at their kitchen table on a Sunday night, types four fields, and gets interrupted. To your CRM, that person never existed.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
                Start your 7-day free trial
              </Link>
              <Link href="/family-law-roi" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
                Run the numbers
              </Link>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <DashboardMockup
              abandoned={118}
              revenueAtRisk={2360000}
              recovered={11}
              recoveredRevenue={220000}
              leads={SAMPLE_LEADS}
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BAND */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 01 */}
        <section className="reveal" style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            01 — The problem
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Your intake form was designed by lawyers, for lawyers.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              The form captures what the intake coordinator needs to open a file. Matter type. Date of incident. Opposing party. Prior counsel. Whether there are children. Whether assets are contested. Whether a police report was filed.
            </p>
            <p>
              That is a checklist a firm wants. It is not what a person sitting at their kitchen table at 9:47 PM wants to fill out about the worst week of their life. The gap between what the form asks and what the prospect is willing to give — on a phone, at night, while upset — is the entire mechanism of legal form abandonment.
            </p>
            <p>
              Nothing about that person appears in your CRM. No missed call. No callback list. No line item in the monthly report. Your paid search worked exactly as designed and delivered them to the door. The form is where they were lost, and it is the one part of the funnel nobody is measuring.
            </p>
          </div>
        </section>

      </div>

      {/* SECTION 02 — stat band */}
      <section className="reveal stat-band" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem', margin: '2rem 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            02 — The math
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            One recovered case covers the year fifty times over.
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
                $20K
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Blended value per retained matter
              </div>
            </div>
            <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
              <p>
                A contested divorce runs <strong style={{ color: '#fff' }}>$22,000</strong>. Custody and modification matters run closer to <strong style={{ color: '#fff' }}>$15,000</strong>. Personal injury runs from <strong style={{ color: '#fff' }}>$50,000</strong> to seven figures. ReCapture costs <strong style={{ color: '#fff' }}>$397</strong> per month.
              </p>
              <p>
                A single recovered matter — one, in an entire year — returns roughly <strong style={{ color: '#fff' }}>fifty times</strong> the annual cost of the platform. There is no other line item in a firm&apos;s marketing budget where the math is this lopsided, because there is no other line item where the asset being recovered is worth five figures on its own.
              </p>
              <p>
                <Link href="/family-law-roi" style={{ color: '#ff6b35' }}>Model your own numbers →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BAND continues */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 03 */}
        <section className="reveal" style={{ marginBottom: '3rem', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            03 — The recovery layer
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Reach them while they are still on the couch.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2.5rem' }}>
            <p>
              ReCapture is a single line of JavaScript on your site. The moment a visitor types into your intake form, the field is captured server-side. If they leave without submitting, the inquiry appears in your dashboard and pushes into Lawmatics or Clio as a new lead — with an estimated matter value based on the practice area they were inquiring about.
            </p>
            <p>
              Recovery messages are discreet by default. They never reference the practice area or anything the visitor typed about their situation. Here is what that actually looks like.
            </p>
          </div>

          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Recovery scene · Sunday, 9:47 PM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div className="recovered-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recovered</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>9:47 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  A prospective client opens the firm&apos;s intake form on her phone. Types her name. Types her email. Starts the third field and stops.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>9:48 PM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  She closes the tab. ReCapture captures the partial inquiry and pushes it into Lawmatics as a new lead. Quiet hours are active — nothing fires tonight.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>8:02 AM</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Recovery email — discreet template</div>
                  <div style={{ color: '#e4e4e7', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;Hi — we saw you reached out to our office over the weekend but the form did not come through. If it would be helpful, you can reply here or call us directly and we will find a time that works. No obligation either way.&rdquo;
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem' }}>8:26 AM</div>
                <div style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  She replies. Intake calls at 8:40. Paid consultation booked for Thursday. The lead status updates in Lawmatics automatically.
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'Menlo, Monaco, monospace', paddingTop: '0.15rem', fontWeight: 700 }}>Thursday</div>
                <div style={{ color: '#10b981', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                  Consultation held. Firm retained. Estimated matter value: $22,000.
                </div>
              </div>
            </div>
          </div>

          <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '1rem', fontStyle: 'italic', textAlign: 'center' }}>
            No form migration. No change to your intake process. Drop the script tag, connect your CRM, and the recovery layer activates on every form on the site.
          </p>
        </section>

      </div>

      {/* SECTION 04 — specs */}
      <section className="reveal specs-band" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '5rem 2rem', margin: '2rem 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            04 — Built for legal specifics
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '3rem', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '720px' }}>
            After hours, on mobile, and discreet by default.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }} className="specs-grid">
            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                After-hours reality
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Most legal inquiries arrive when nobody is at the desk.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Family law inquiries cluster on Sunday nights and Monday mornings. Personal injury arrives whenever the accident did. Recovery runs on a schedule the firm sets, so the follow-up lands the moment the office opens rather than three days later.
              </p>
            </div>

            <div style={{ padding: '2rem', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                CRM integration
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Lawmatics and Clio, natively.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Recovered inquiries push straight into the intake pipeline the firm already runs, carrying every captured field. No second dashboard to watch, no manual export, no change to how the intake team works.
              </p>
            </div>

            <div style={{ padding: '2rem', borderRight: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Discretion
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Sensitive matters, handled sensitively.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Recovery messages never reference the practice area or anything the visitor typed about their situation. Firms handling family law and criminal defense typically run email-only recovery with voice disabled — a per-firm setting, not a workaround.
              </p>
            </div>

            <div style={{ padding: '2rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Compliance
              </p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                TCPA, DTPA, and CAN-SPAM aligned.
              </h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Truthful sender identification, reference to a real visitor-initiated inquiry, clear opt-out, enforced quiet hours, DNC cross-reference, and a full consent audit trail on every message. See our <Link href="/trust" style={{ color: '#ff6b35' }}>trust page</Link> for the complete posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing + closing */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        <section className="reveal" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            05 — Pricing
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            $397 per month. 7-day free trial.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '1rem' }}>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo includes the recovery dashboard, the tracker, automated follow-up email, live visitor tracking with intent scoring, CRM push to Lawmatics or Clio, and instant SMS or Slack alerts to the intake team.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> from $1,997/mo for multi-office firms and high-volume practices. Unlimited sites, dedicated account manager, and per-office lead segmentation.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Card required at signup, not charged until day 8. Cancel anytime during the trial.
            </p>
          </div>
        </section>

        <section className="reveal" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            See the cases you are already losing.
          </h2>
          <p style={{ color: '#a1a1aa', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem', maxWidth: '560px' }}>
            Drop the tracker and watch the first abandoned intake come through the same day. Or run a free audit on your intake form first and see the numbers before you decide.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
              Start your 7-day free trial
            </Link>
            <Link href="/form-audit" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
              Free form audit
            </Link>
          </div>
        </section>

      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes recovered-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        .recovered-dot-pulse { animation: recovered-pulse 2s ease-in-out infinite; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .math-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .specs-grid { grid-template-columns: 1fr !important; }
          .specs-grid > div { border-right: none !important; }
          .specs-grid > div:last-child { border-bottom: none !important; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 6rem 1.25rem 2.5rem !important; }
          .hero-h1 { font-size: 1.75rem !important; line-height: 1.15 !important; }
          .hero-sub { font-size: 1rem !important; }
          .stat-band, .specs-band { padding: 3.5rem 1.25rem !important; }
        }
      ` }} />

      <FAQSection faqs={FAQS} />
      <RelatedPages page="for-legal" />

    </div>
  )
}
