import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Why ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'How does ReCapture compare to Insiteful and FormTracks for form abandonment tracking? See the differences in pricing, features, and focus for high-ticket service businesses.',
  keywords: 'ReCapture vs the Competition, form abandonment tracking why ReCapture, Insiteful alternative, form abandonment tool, lead recovery software',
}

const rows: [string, string | boolean, string | boolean, string | boolean][] = [
  ['Partial form capture', true, true, true],
  ['Instant SMS lead alerts', 'Pro plan', false, false],
  ['Lead scoring (hot/warm/cold)', true, false, false],
  ['Auto-recovery emails', true, true, true],
  ['Revenue-at-risk dashboard', true, false, false],
  ['ROI Estimator tool', true, false, false],
  ['Interactive live demo', true, false, false],
  ['Enterprise multi-location', true, false, false],
  ['Weekly client reports', true, false, false],
  ['Dedicated account support', true, false, false],
  ['Industry-specific focus', 'High-ticket services', 'Generic SaaS / B2B', 'Generic / all industries'],
  ['Flat monthly pricing', true, false, '?'],
  ['Transparent pricing', '$150-200/mo', 'Session-based (unclear)', 'Contact for pricing'],
  ['Free trial', '14 days', '$7 paid trial', '7 days'],
  ['Setup complexity', '1 script tag', '1 script tag', '1 script tag'],
  ['White-label option', 'Coming soon', false, 'Paid add-on'],
  ['Location', 'Dallas, TX', 'Phoenix, AZ', 'Not disclosed'],
]

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function Val({ v }: { v: string | boolean }) {
  if (v === true) return <Check />
  if (v === false) return <Cross />
  return <span style={{ fontSize: '0.825rem' }}>{v}</span>
}

export default function WhyUsPage() {
  return (
    <div className="blog-post">
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Why Us</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>ReCapture vs the Competition</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Not all form abandonment tools are created equal. Most were built for SaaS companies and eCommerce checkouts — not for the high-ticket service businesses that need them most. We built ReCapture specifically for med spas, dental practices, luxury real estate, and property management companies where a single recovered lead can mean $1,500 to $10,000 in revenue. Here&apos;s why businesses choose us over the alternatives.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <h2 className="reveal">The Short Version</h2>
        <p>Insiteful is a solid form analytics and optimization tool built for marketers running A/B tests and conversion rate experiments across many form types. ReCapture is built specifically for high-ticket service businesses — med spas, dental practices, luxury real estate, property management — where a single recovered lead can be worth $1,500 to $10,000+.</p>
        <p>If you&apos;re a performance marketer optimizing e-commerce funnels, Insiteful might be the right fit. If you run a business where every lead matters and you need to see names, emails, and phone numbers from people who started your form but never submitted — ReCapture was built for you.</p>

        {/* Desktop Table */}
        <div className="compare-desktop reveal" style={{ margin: '3rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', background: '#0d0d0d', borderRadius: '12px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 0.75rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #1a1a1a', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: '28%' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '1.25rem 0.75rem', color: '#ff6b35', fontWeight: 700, fontSize: '0.95rem', background: 'rgba(255, 107, 53, 0.06)', borderBottom: '1px solid #1a1a1a', width: '24%' }}>ReCapture</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.75rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a', width: '24%' }}>Insiteful</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.75rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a', width: '24%' }}>FormTracks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', padding: '0.875rem 0.75rem', color: '#ccc', borderBottom: '1px solid #111' }}>{row[0]}</td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', borderBottom: '1px solid #111', background: 'rgba(255, 107, 53, 0.03)' }}><Val v={row[1]} /></td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', color: '#888', borderBottom: '1px solid #111' }}><Val v={row[2]} /></td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', color: '#888', borderBottom: '1px solid #111' }}><Val v={row[3]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="compare-mobile reveal" style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {rows.map((row, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{row[0]}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem', background: 'rgba(255,107,53,0.04)', borderRadius: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ff6b35' }}>ReCapture</span>
                  <span style={{ color: row[1] === true ? '#22c55e' : row[1] === false ? '#444' : '#aaa', fontSize: '0.8rem' }}><Val v={row[1]} /></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Insiteful</span>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}><Val v={row[2]} /></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>FormTracks</span>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}><Val v={row[3]} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── What Sets Us Apart ──────────────────────────────────────── */}
        <h2 className="reveal">What Sets Us Apart</h2>
        <p className="reveal">Every competitor in this space tells you <em>where</em> people drop off. None of them give you <em>who</em> dropped off with their actual contact data — and none of them do what comes next.</p>

        {/* Feature 1: Instant SMS Alerts */}
        <div className="reveal" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>Instant SMS Lead Alerts</h3>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Coming Soon — Pro Plan</span>
            </div>
          </div>
          <p style={{ color: '#999', lineHeight: 1.8, margin: 0 }}>Your phone buzzes within 60 seconds of someone abandoning your form. Not an email you check later. A text message with their name, their email, and what they were looking for. Research shows that calling a lead within 5 minutes makes you 21x more likely to convert them. No other form abandonment tool offers real-time SMS alerts.</p>
        </div>

        {/* Feature 2: Lead Scoring */}
        <div className="reveal" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>Lead Scoring</h3>
          </div>
          <p style={{ color: '#999', lineHeight: 1.8, margin: 0 }}>Not every abandoned lead is worth the same follow-up. Someone who typed their name, email, phone number, and selected &quot;$15,000 tummy tuck&quot; is not the same as someone who typed one letter and bounced. ReCapture scores every lead as hot, warm, or cold based on fields completed, contact data provided, time on form, and form detail richness. Your team sees instantly who to call first. No other form abandonment tool does lead scoring on partial form data.</p>
        </div>

        {/* Feature 3: Auto-Recovery Emails */}
        <div className="reveal" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>Auto-Recovery Emails</h3>
          </div>
          <p style={{ color: '#999', lineHeight: 1.8, margin: 0 }}>When someone abandons your form and they entered an email, ReCapture automatically sends a branded recovery email on your behalf. Not from us — from your business, with your name and your booking link. The lead gets a message saying &quot;Looks like you didn&apos;t finish — want to pick up where you left off?&quot; and a direct link back to your form. This closes the loop without your team lifting a finger.</p>
        </div>

        <h2 className="reveal">Pricing</h2>
        <p>Insiteful&apos;s pricing is based on session volume and data retention. Their trial starts at $7, and plans scale based on traffic. For a high-traffic multi-location business, costs can escalate quickly and unpredictably.</p>
        <p>ReCapture uses simple flat-rate pricing. Essentials is $150/mo. Pro is $200/mo. Enterprise is custom. No session caps, no surprise charges, no calculator needed to figure out your bill. You know exactly what you&apos;re paying before you sign up.</p>

        <h2 className="reveal">Who ReCapture Is Built For</h2>
        <p>ReCapture was built by a digital marketing consultant who spent 10+ years managing $100K+ in monthly ad spend for med spas, dental practices, luxury real estate, and property management companies. Every feature was designed around one question: <em>what would these businesses actually need to recover lost leads and see ROI in the first week?</em></p>
        <p>That&apos;s why ReCapture includes a revenue-at-risk dashboard that shows the dollar value of every abandoned lead, plus an ROI Estimator that lets prospects see exactly how much their forms are costing them before they even sign up. It&apos;s why we built a multi-location dashboard for enterprise clients managing 10, 20, or 50+ properties. And it&apos;s why our automated recovery emails are branded to your business — not ours.</p>

        <h2 className="reveal">Who Insiteful Is Built For</h2>
        <p>Insiteful is a strong tool for performance marketers and CRO specialists who want detailed form field analytics, funnel visualizations, and A/B testing insights. If you&apos;re optimizing checkout flows or running multivariate tests on lead gen forms, Insiteful has features ReCapture doesn&apos;t — like save-and-continue-later and field-level confusion detection.</p>
        <p>But if you&apos;re a business owner who just wants to see the leads you&apos;re losing and get them back — without learning a new analytics platform — ReCapture is the simpler, more direct path to recovered revenue.</p>

        <h2 className="reveal">The Bottom Line</h2>
        <div className="reveal" style={{ borderLeft: '3px solid #ff6b35', background: '#111', borderRadius: '0 10px 10px 0', padding: '1.5rem 2rem', margin: '2rem 0' }}>
          <p style={{ color: '#bbb', lineHeight: 1.8, margin: 0 }}>Other tools help you understand <em>why</em> people abandon your forms. ReCapture captures <em>who</em> they are, scores how serious they were, alerts you in real time, and automatically tries to bring them back. That&apos;s the difference between analytics and revenue.</p>
        </div>

        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0' }}>Ready to recover your lost leads?</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0' }}>Start your free trial — full access from day one.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/test-form" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
            <Link href="/start-trial" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start Free Trial</Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
