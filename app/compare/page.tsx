import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'ReCapture vs the Competition — Form Abandonment Recovery Comparison',
  description: 'How does ReCapture compare to Insiteful and FormTracks for form abandonment tracking? See the differences in pricing, features, and focus for high-ticket service businesses.',
  keywords: 'ReCapture vs the Competition, form abandonment tracking comparison, Insiteful alternative, form abandonment tool, lead recovery software',
}

const rows: [string, string | boolean, string | boolean, string | boolean][] = [
  ['Partial form capture', true, true, true],
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
  ['Free trial', '7 days', '$7 paid trial', '7 days'],
  ['Setup complexity', '1 script tag', '1 script tag', '1 script tag'],
  ['White-label option', 'Coming soon', false, 'Paid add-on'],
  ['Location', 'Dallas, TX', 'Phoenix, AZ', 'Not disclosed'],
]

function Val({ v }: { v: string | boolean }) {
  if (v === true) return <span style={{ color: '#22c55e', fontSize: '1.1rem' }}>✓</span>
  if (v === false) return <span style={{ color: '#444', fontSize: '1.1rem' }}>✗</span>
  return <span style={{ fontSize: '0.825rem' }}>{v}</span>
}

export default function ComparePage() {
  return (
    <div className="blog-post">
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Comparison</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>ReCapture vs the Competition</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Not all form abandonment tools are created equal. Most were built for SaaS companies and eCommerce checkouts — not for the high-ticket service businesses that need them most. We built ReCapture specifically for med spas, dental practices, luxury real estate, and property management companies where a single recovered lead can mean $1,500 to $10,000 in revenue. Here&apos;s how we compare to the alternatives.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <h2>The Short Version</h2>
        <p>Insiteful is a solid form analytics and optimization tool built for marketers running A/B tests and conversion rate experiments across many form types. ReCapture is built specifically for high-ticket service businesses — med spas, dental practices, luxury real estate, property management — where a single recovered lead can be worth $1,500 to $10,000+.</p>
        <p>If you&apos;re a performance marketer optimizing e-commerce funnels, Insiteful might be the right fit. If you run a business where every lead matters and you need to see names, emails, and phone numbers from people who started your form but never submitted — ReCapture was built for you.</p>

        {/* Desktop Table */}
        <div className="compare-desktop" style={{ margin: '3rem 0' }}>
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
        <div className="compare-mobile" style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

        <h2>Pricing</h2>
        <p>Insiteful&apos;s pricing is based on session volume and data retention. Their trial starts at $7, and plans scale based on traffic. For a high-traffic multi-location business, costs can escalate quickly and unpredictably.</p>
        <p>ReCapture uses simple flat-rate pricing. Essentials is $150/mo. Pro is $200/mo. Enterprise is custom. No session caps, no surprise charges, no calculator needed to figure out your bill. You know exactly what you&apos;re paying before you sign up.</p>

        <h2>Who ReCapture Is Built For</h2>
        <p>ReCapture was built by a digital marketing consultant who spent 10+ years managing $100K+ in monthly ad spend for med spas, dental practices, luxury real estate, and property management companies. Every feature was designed around one question: <em>what would these businesses actually need to recover lost leads and see ROI in the first week?</em></p>
        <p>That&apos;s why ReCapture includes a revenue-at-risk dashboard that shows the dollar value of every abandoned lead, plus an ROI Estimator that lets prospects see exactly how much their forms are costing them before they even sign up. It&apos;s why we built a multi-location dashboard for enterprise clients managing 10, 20, or 50+ properties. And it&apos;s why our automated recovery emails are branded to your business — not ours.</p>

        <h2>Who Insiteful Is Built For</h2>
        <p>Insiteful is a strong tool for performance marketers and CRO specialists who want detailed form field analytics, funnel visualizations, and A/B testing insights. If you&apos;re optimizing checkout flows or running multivariate tests on lead gen forms, Insiteful has features ReCapture doesn&apos;t — like save-and-continue-later and field-level confusion detection.</p>
        <p>But if you&apos;re a business owner who just wants to see the leads you&apos;re losing and get them back — without learning a new analytics platform — ReCapture is the simpler, more direct path to recovered revenue.</p>

        <h2>The Bottom Line</h2>
        <div style={{ borderLeft: '3px solid #ff6b35', background: '#111', borderRadius: '0 10px 10px 0', padding: '1.5rem 2rem', margin: '2rem 0' }}>
          <p style={{ color: '#bbb', lineHeight: 1.8, margin: 0 }}>Insiteful helps you understand <em>why</em> people abandon your forms. ReCapture helps you <em>recover</em> the people who do. If you need both, start with recovery — because understanding why someone left doesn&apos;t pay the bills. Getting them back does.</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
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
