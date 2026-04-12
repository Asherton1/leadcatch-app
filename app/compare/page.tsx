import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import '../blog/blog.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'ReCapture vs the Competition — Form Abandonment Recovery Comparison',
  description: 'How does ReCapture compare to Insiteful and FormTracks for form abandonment tracking? See the differences in pricing, features, and focus for high-ticket service businesses.',
  keywords: 'ReCapture vs the Competition, form abandonment tracking comparison, Insiteful alternative, form abandonment tool, lead recovery software',
}

export default function ComparePage() {
  const check = <span style={{ color: '#22c55e', fontSize: '1.1rem' }}>✓</span>
  const cross = <span style={{ color: '#444', fontSize: '1.1rem' }}>✗</span>

  return (
    <div className="blog-post">
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Comparison</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>ReCapture vs the Competition</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Three tools that capture partial form data — built for very different businesses. See how they stack up.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 2rem' }}>

        <h2>The Short Version</h2>
        <p>Insiteful is a solid form analytics and optimization tool built for marketers running A/B tests and conversion rate experiments across many form types. ReCapture is built specifically for high-ticket service businesses — med spas, dental practices, luxury real estate, property management — where a single recovered lead can be worth $1,500 to $10,000+.</p>
        <p>If you&apos;re a performance marketer optimizing e-commerce funnels, Insiteful might be the right fit. If you run a business where every lead matters and you need to see names, emails, and phone numbers from people who started your form but never submitted — ReCapture was built for you.</p>

        <div style={{ margin: '3rem 0', overflowX: 'auto' }}>
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
              {[
                ['Partial form capture', check, check, check],
                ['Auto-recovery emails', check, check, check],
                ['Revenue-at-risk calculator', check, cross, cross],
                ['Enterprise multi-location', check, cross, cross],
                ['Flat monthly pricing', check, cross, '?'],
                ['Industry-specific focus', 'High-ticket services', 'Generic SaaS / B2B', 'Generic / all industries'],
                ['Free trial', '7 days', '$7 paid trial', '7 days'],
                ['Setup complexity', '1 script tag', '1 script tag', '1 script tag'],
                ['Weekly client reports', check, cross, cross],
                ['Dedicated account support', check, cross, cross],
                ['White-label option', 'Coming soon', cross, 'Paid add-on'],
                ['Transparent pricing', '$150-200/mo', 'Session-based (unclear)', 'Contact for pricing'],
                ['Location', 'Dallas, TX', 'Phoenix, AZ', 'Not disclosed'],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'left', padding: '0.875rem 0.75rem', color: '#ccc', borderBottom: '1px solid #111' }}>{row[0]}</td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', borderBottom: '1px solid #111', background: 'rgba(255, 107, 53, 0.03)' }}>{typeof row[1] === 'string' ? <span style={{ color: '#aaa', fontSize: '0.825rem' }}>{row[1]}</span> : row[1]}</td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', color: '#888', borderBottom: '1px solid #111' }}>{typeof row[2] === 'string' ? <span style={{ fontSize: '0.825rem' }}>{row[2]}</span> : row[2]}</td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', color: '#888', borderBottom: '1px solid #111' }}>{typeof row[3] === 'string' ? <span style={{ fontSize: '0.825rem' }}>{row[3]}</span> : row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Pricing</h2>
        <p>Insiteful&apos;s pricing is based on session volume and data retention. Their trial starts at $7, and plans scale based on traffic. For a high-traffic multi-location business, costs can escalate quickly and unpredictably.</p>
        <p>ReCapture uses simple flat-rate pricing. Essentials is $150/mo. Pro is $200/mo. Enterprise is custom. No session caps, no surprise charges, no calculator needed to figure out your bill. You know exactly what you&apos;re paying before you sign up.</p>

        <h2>Who ReCapture Is Built For</h2>
        <p>ReCapture was built by a digital marketing consultant who spent 10+ years managing $100K+ in monthly ad spend for med spas, dental practices, luxury real estate, and property management companies. Every feature was designed around one question: <em>what would these businesses actually need to recover lost leads and see ROI in the first week?</em></p>
        <p>That&apos;s why ReCapture includes a revenue-at-risk calculator that shows the dollar value of every abandoned lead. It&apos;s why we built a multi-location dashboard for enterprise clients managing 10, 20, or 50+ properties. And it&apos;s why our automated recovery emails are branded to your business — not ours.</p>

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
            <Link href="/test-form" style={{ display: 'inline-block', background: '#ff6b35', color: '#000', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
            <Link href="/signup" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start Free Trial</Link>
          </div>
        </div>

      </div>
          <Footer />
    </div>
  )
}
