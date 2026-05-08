import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Form Abandonment Recovery for Med Spas — ReCapture',
  description: 'Med spas lose two-thirds of consultation form starters before they submit. ReCapture is the recovery layer for high-ticket service businesses — capture every visitor who started typing, recover them in under five minutes.',
  keywords: 'form abandonment med spa, med spa lead recovery, med spa lead generation, consultation form tracking, med spa marketing',
}

export default function ForMedSpas() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e4e4e7' }}>
      <BlogNav />
      <ScrollReveal />

      {/* HERO — left-aligned, editorial, no background image, no centered formula */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '8rem 2rem 3rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Med Spas
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
          When the consultation form fails, the patient is gone.
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#a1a1aa', lineHeight: 1.7 }}>
          Two out of every three people who start a consultation form on a med spa website never finish it. They typed their name. They got distracted by a text, a kid, a meeting. They closed the tab. The marketing budget that drove them there does not get a refund.
        </p>
      </section>

      {/* MAIN CONTENT BAND */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>

        {/* Section 01 — The problem */}
        <section className="reveal" style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            01 — The problem
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            Form abandonment is the silent leak in every med spa ad budget.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p>
              You spent $4,000 on Meta ads last month. Drove 2,000 visitors to your Botox consultation page. Your analytics dashboard reported 60 form submissions. You felt fine about the spend.
            </p>
            <p>
              The number you did not see: 180 more people started filling out the form. They typed a name. Some typed an email. A handful even typed a phone number. None of them submitted.
            </p>
            <p>
              Your CRM never registered them. Your marketing reports never showed them. Your front desk never called them. They walked out of your funnel completely invisible to the only people in your business equipped to bring them back.
            </p>
          </div>
        </section>

        {/* Section 02 — The math */}
        <section className="reveal" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            02 — The math
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            $2,800 per recovered patient. Five recoveries pays for the year.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p>
              The average med spa client lifetime value is $2,800 across Botox, fillers, laser, and skin care touchpoints. The Pro plan of ReCapture costs $397 per month. Five recovered patients in a year — total — covers the entire annual subscription.
            </p>
            <p>
              The realistic recovery rate for tracked partial submissions sits between 8% and 22% depending on follow-up speed. On 180 monthly form starters, that is between 14 and 40 additional patients per month — patients who already showed buying intent on your site and would otherwise have been forgotten.
            </p>
          </div>

          {/* Editorial stat callout — single composite, NOT a triplet card grid */}
          <div style={{ marginTop: '2rem', padding: '2rem', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff6b35', letterSpacing: '-0.02em', lineHeight: 1 }}>67%</span>
              <span style={{ fontSize: '0.95rem', color: '#888', fontWeight: 500 }}>industry average form abandonment rate</span>
            </div>
            <div style={{ height: '1px', background: '#1a1a1a', margin: '1rem 0' }} />
            <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>
              On a med spa site driving 2,000 visitors per month, that translates to roughly 180 invisible leads. At a $2,800 average lifetime value and a conservative 12% recovery rate, the unrealized monthly revenue exceeds <strong style={{ color: '#fff' }}>$60,000</strong>.
            </p>
          </div>
        </section>

        {/* Section 03 — The recovery layer */}
        <section className="reveal" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            03 — The recovery layer
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            Capture every visitor who started typing. Recover them in under five minutes.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p>
              ReCapture is a single line of JavaScript on your site. The moment a visitor types into your form, we capture the field. If they leave without submitting, we send the lead to your dashboard with a value estimate based on the service they were inquiring about.
            </p>
            <p>
              Your front desk gets an SMS within seconds with the lead name, phone, and the service they were on the verge of booking. Your AI voice concierge — Marissa — places a callback within five minutes if the lead is high-value and the prospect provided a phone number. She introduces herself, references the service, and offers to confirm the booking on the call.
            </p>
            <p>
              No form migration. No platform replacement. Drop the script tag, configure your services and call hours, and the recovery layer activates on top of every contact form on your site.
            </p>
          </div>
        </section>

        {/* Section 04 — Built for med-spa concerns */}
        <section className="reveal" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            04 — Built for med spa specifics
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            Mobile-first, multi-location, healthcare-adjacent.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Mobile-first.</strong> Roughly 65% of med spa traffic comes from mobile devices. Our tracker is built to capture partial form data on touch keyboards where dropoff is highest, including the autocomplete and autofill paths that other recovery tools miss.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Multi-location.</strong> If you run a group practice across multiple locations, our dashboard segments leads by site automatically. Each location can have its own front desk SMS recipient and call hours configuration.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Healthcare-adjacent compliance.</strong> ReCapture is HIPAA-ready by design. Our architecture, subprocessor stack, and BAA template are in place. For practices that handle Protected Health Information, BAA execution is available on Enterprise plans, activated upon signed contract. See our <Link href="/trust" style={{ color: '#ff6b35' }}>trust page</Link> for the full compliance posture.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>AI voice callback compliance.</strong> Marissa identifies herself as automated within the first 15 seconds of every call, satisfying TCPA and Texas SB 140 requirements. Voice callback is optional and disabled by default.
            </p>
          </div>
        </section>

        {/* Section 05 — Pricing */}
        <section className="reveal" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            05 — Pricing
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            Plans start at $197/mo. 7-day free trial.
          </h2>
          <div style={{ color: '#a1a1aa', lineHeight: 1.8, fontSize: '0.95rem' }}>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Essentials</strong> at $197/mo for single-location med spas with under 1,000 monthly visitors. Includes recovery dashboard, tracker, automated follow-up emails.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Pro</strong> at $397/mo for established med spas with consistent ad spend. Adds SMS alerts to front desk, AI voice callback (Marissa), and weekly performance reports.
            </p>
            <p>
              <strong style={{ color: '#e4e4e7' }}>Enterprise</strong> for multi-location groups, BAA-required healthcare practices, and sites with high lead volume. Custom pricing, dedicated account manager.
            </p>
          </div>
        </section>

        {/* Closing CTA — editorial, not centered button-spam */}
        <section className="reveal" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #1a1a1a', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            See your invisible leads.
          </h2>
          <p style={{ color: '#a1a1aa', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '560px' }}>
            Drop the tracker. Watch your first abandoned consultation come through within an hour. 7-day free trial. Card required, not charged until day 8.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#0a0a0a', fontWeight: 700, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>
              Start free trial
            </Link>
            <Link href="/pricing" style={{ display: 'inline-block', background: 'transparent', color: '#a1a1aa', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid #1e1e1e' }}>
              See full pricing
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
