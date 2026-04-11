import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import '../blog/blog.css'

export const metadata = {
  title: 'ReCapture vs Insiteful — Form Abandonment Recovery Comparison',
  description: 'How does ReCapture compare to Insiteful for form abandonment tracking? See the differences in pricing, features, and focus for high-ticket service businesses.',
  keywords: 'ReCapture vs Insiteful, form abandonment tracking comparison, Insiteful alternative, form abandonment tool, lead recovery software',
}

export default function ComparePage() {
  return (
    <div className="blog-post">
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.9)), url("/hero-bg.jpg") center/cover no-repeat', padding: '6rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Comparison</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>ReCapture vs Insiteful</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8 }}>Both tools capture partial form data. But they&apos;re built for very different businesses. Here&apos;s how they compare.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>

        <h2>The Short Version</h2>
        <p>Insiteful is a solid form analytics and optimization tool built for marketers running A/B tests and conversion rate experiments across many form types. ReCapture is built specifically for high-ticket service businesses — med spas, dental practices, luxury real estate, property management — where a single recovered lead can be worth $1,500 to $10,000+.</p>
        <p>If you&apos;re a performance marketer optimizing e-commerce funnels, Insiteful might be the right fit. If you run a business where every lead matters and you need to see names, emails, and phone numbers from people who started your form but never submitted — ReCapture was built for you.</p>

        <div style={{ margin: '3rem 0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1e1e1e' }}>
                <th style={{ textAlign: 'left', padding: '1rem 0.75rem', color: '#888', fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.75rem', color: '#ff6b35', fontWeight: 700 }}>ReCapture</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.75rem', color: '#888', fontWeight: 600 }}>Insiteful</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Built for high-ticket services', '✓', '—'],
                ['Transparent flat-rate pricing', '✓', '—'],
                ['Free trial (no credit card)', '✓', '$7 paid trial'],
                ['Revenue-at-risk calculator', '✓', '—'],
                ['Multi-location dashboard', '✓', '—'],
                ['Enterprise tier with dedicated AM', '✓', '—'],
                ['Automated recovery emails', '✓', '✓'],
                ['Partial form capture', '✓', '✓'],
                ['CRM integrations', '✓', '✓'],
                ['Form field analytics', 'Coming soon', '✓'],
                ['Save & continue later', 'Coming soon', '✓'],
                ['Session-based pricing', 'No — flat rate', 'Yes'],
                ['Setup time', '60 seconds', '~5 minutes'],
                ['Weekly performance reports', '✓', '—'],
                ['CSV export', '✓', '✓'],
                ['White-glove onboarding', '✓ (Enterprise)', '—'],
                ['Per-location reporting', '✓', '—'],
                ['Dallas-based support', '✓', '— (Phoenix, AZ)'],
              ].map(([feature, rc, ins], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e1e1e' }}>
                  <td style={{ padding: '0.75rem', color: '#bbb' }}>{feature}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center', color: rc === '✓' ? '#ff6b35' : rc === '—' ? '#333' : '#bbb', fontWeight: rc === '✓' ? 700 : 400 }}>{rc}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center', color: ins === '✓' ? '#4a9eff' : ins === '—' ? '#333' : '#888', fontWeight: ins === '✓' ? 700 : 400 }}>{ins}</td>
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
          <p style={{ color: '#888', margin: '0 0 1.5rem 0' }}>Start your free trial — no credit card required.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/test-form" style={{ display: 'inline-block', background: '#ff6b35', color: '#000', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
            <Link href="/signup" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start Free Trial</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
