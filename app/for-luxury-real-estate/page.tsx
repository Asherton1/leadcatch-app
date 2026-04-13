import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Luxury Real Estate — ReCapture',
  description: 'Luxury real estate firms lose 71% of leads who start an inquiry form but never submit. ReCapture captures every partial lead and recovers lost commissions automatically.',
  keywords: 'form abandonment real estate, luxury real estate lead recovery, real estate lead generation, property inquiry form tracking',
}

export default function ForLuxuryRealEstate() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Luxury Real Estate</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your Highest-Value Buyers Are Inquiring — Then Disappearing</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>71% of people who start a property inquiry form never finish it. In luxury real estate, where a single commission can exceed $12,000, every abandoned form is a deal you never knew existed. ReCapture makes those invisible buyers visible.</p>
        </div>
      </div>
      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>71%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$12,000</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. deal value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>52%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>
        <h2>The Hidden Cost of Luxury Real Estate Forms</h2>
        <p>Luxury buyers are researchers. They browse listings across multiple brokerages, open inquiry forms on several properties, and complete maybe one or two. Your listing was one they abandoned. They were interested enough to start typing — their name, their email, a note about scheduling a private showing — but something interrupted them. A phone call. Another tab. The thought that they would come back later.</p>
        <p>They did not come back. Your agent never received the lead. The buyer toured with a competitor instead. At $12,000+ per transaction, that single invisible drop-off could have been your best deal of the quarter.</p>
        <h2>Why Luxury Real Estate Loses More Than Most</h2>
        <p>High-end property inquiry forms often ask for specifics — budget range, timeline, financing status, preferred neighborhoods. Each question is another moment of hesitation for a buyer who is still in research mode. They are not ready to commit to a full conversation yet. They just wanted information. But your form asked for a commitment, and they bailed.</p>
        <p>Unlike med spas or dental practices where the client pool is broad, luxury real estate buyers are rare and high-value. Losing even 3 to 5 of them per month to form abandonment can mean $36,000 to $60,000 in missed commissions annually — from leads you were already attracting.</p>
        <h2>How ReCapture Works for Real Estate</h2>
        <p>One script tag on your website. No changes to your IDX, MLS integration, or existing forms. ReCapture captures buyer information the moment they start typing — name, email, phone, even which listing or neighborhood they were viewing — before they ever hit submit.</p>
        <p>Every abandoned inquiry appears in your dashboard with contact details and the estimated transaction value. Your agents can reach out within minutes with a personal call, or ReCapture sends a branded follow-up email automatically — from your brokerage name, with the specific listing they were viewing.</p>
        <div style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>Real math:</strong> A brokerage getting 20 inquiry submissions per month is actually seeing ~69 form starts. That means ~49 serious buyers started an inquiry and vanished. At $12,000 per transaction, recovering just 2 of them pays for ReCapture for the entire year — and then some.</p>
        </div>
        <h2>Built for Multi-Agent Brokerages</h2>
        <p>If your brokerage has multiple agents, teams, or office locations, ReCapture gives you one dashboard showing abandoned leads across every listing page. Route recovered leads to the right agent automatically. See which property pages have the highest abandonment rates. Track which agents follow up fastest and close the most recovered leads.</p>
        <h2>What You Get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time buyer capture', 'Names, emails, phone numbers, and listing interest captured before submit'],
            ['Revenue-at-risk dashboard', 'See the commission value of every lead your forms are losing'],
            ['Automated recovery emails', 'Branded follow-ups featuring the specific listing they viewed'],
            ['Multi-agent routing', 'Route recovered leads to the right agent or team automatically'],
            ['Weekly performance reports', 'Leads captured, revenue at risk, and recovery stats every Monday'],
            ['60-second setup', 'One script tag. Works with any IDX or website platform'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
        <h2>See How Much Your Brokerage Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly commission revenue at risk.</p>
        <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=real-estate" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/test-form" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Losing Buyers to Form Abandonment</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>7-day free trial. Full access from day one. See your first captured lead within 48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start-trial" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Start Free Trial</Link>
            <Link href="/pricing" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>View Pricing</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
