import Link from 'next/link'
import DashboardMockup from '../components/DashboardMockup'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Luxury Auto — ReCapture',
  description: 'Luxury auto dealerships lose 74% of leads who start an inquiry form but never submit. ReCapture captures every partial lead and recovers lost sales automatically.',
  keywords: 'form abandonment luxury auto, dealership lead recovery, auto lead generation, vehicle inquiry form tracking',
}

export default function ForLuxuryAuto() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <ScrollReveal />
      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Luxury Auto</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your Buyers Are Building Deals in Their Head — Then Leaving Your Form</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>74% of people who start a vehicle inquiry or test drive form never finish it. At $8,500+ per deal, every abandoned form is a sale your team never got a chance to close. ReCapture captures them before they drive to the next lot.</p>
        </div>
      </div>
      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>
        <div className="ind-stats reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>74%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$8,500</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. deal value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>55%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>
        <h2 className="reveal">The Test Drive That Never Happened</h2>
        <p>Luxury auto buyers do their research online before ever walking into a showroom. They browse inventory, compare trims, check financing options, and when they find the right vehicle, they start your inquiry form — name, phone, the model they want, maybe a trade-in question. Then they pause. Maybe they want to check another dealership first. Maybe the form asked for too much too soon. Maybe they just got distracted.</p>
        <p>They close the tab. Your sales team never sees the lead. That buyer walks into a competitor&apos;s showroom because they were the ones who followed up first — except you did not even know there was someone to follow up with.</p>
        <h2 className="reveal">Why Luxury Auto Has the Highest Abandonment</h2>
        <p>At 74%, luxury auto has one of the highest form abandonment rates of any industry. The reasons are structural: high-consideration purchases create longer decision cycles. Buyers are comparison shopping across multiple dealerships simultaneously. And vehicle inquiry forms often ask for trade-in details, financing preferences, and timeline — information buyers are not ready to share until they have spoken to someone first.</p>
        <p>The result: for every 20 inquiries your team receives, roughly 57 more people started the form and disappeared. Those 57 were actively shopping for your inventory. They just were not ready to commit to a full form — yet.</p>
        <h2 className="reveal">How ReCapture Works for Luxury Auto</h2>
        <p>One script tag on your dealership website. No changes to your existing forms or DMS integration. ReCapture captures buyer information the moment they start typing — name, email, phone number, even which vehicle they were viewing — before they ever hit submit.</p>
        <p>Every abandoned inquiry appears in your dashboard with contact details and the estimated deal value. Your sales team can call within minutes, or ReCapture sends a branded recovery email automatically — from your dealership name, referencing the specific vehicle they were looking at.</p>
        <div className="reveal" style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>The math:</strong> A luxury dealership getting 20 form submissions per month is actually seeing ~77 form starts. That is ~57 serious buyers who disappeared. At $8,500 per deal, recovering just 1 per month more than pays for ReCapture for the entire year.</p>
        </div>
        
        <DashboardMockup
          abandoned={57}
          revenueAtRisk={484500}
          recovered={5}
          recoveredRevenue={42500}
          leads={[
            { name: 'Michael R.', initials: 'MR', email: 'michael.r@gmail.com', service: '2025 Porsche Cayenne', value: 9800, status: 'Open' },
            { name: 'Jonathan K.', initials: 'JK', email: 'jon.k@icloud.com', service: '2026 Range Rover Sport', value: 11200, status: 'Contacted' },
            { name: 'Diana P.', initials: 'DP', email: 'diana.p@outlook.com', service: '2025 Mercedes GLE', value: 7800, status: 'Recovered' },
            { name: 'Andrew S.', initials: 'AS', email: 'andrew.s@gmail.com', service: '2026 BMW X7', value: 8500, status: 'Open' },
          ]}
        />

        <h2 className="reveal">What You Get</h2>
        <div className="ind-features reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time buyer capture', 'Names, emails, phone numbers, and vehicle interest captured before submit'],
            ['Revenue-at-risk dashboard', 'See the deal value of every lead your forms are losing monthly'],
            ['Automated recovery emails', 'Branded follow-ups referencing the specific vehicle they viewed'],
            ['Sales team routing', 'Route recovered leads to the right salesperson instantly'],
            ['Weekly performance reports', 'Leads captured, revenue at risk, and recovery stats every Monday'],
            ['60-second setup', 'One script tag. Works with any dealership website platform'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
        <h2 className="reveal">See How Much Your Dealership Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly revenue at risk.</p>
        <div className="ind-ctas reveal" style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=luxury-auto" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/test-form" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>
        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
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
