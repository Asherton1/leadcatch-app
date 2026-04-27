import Link from 'next/link'
import DashboardMockup from '../components/DashboardMockup'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Property Management — ReCapture',
  description: 'Property management companies lose 70% of prospective tenants who start a contact form but never submit. ReCapture captures every partial lead across all your properties.',
  keywords: 'form abandonment property management, apartment lead recovery, multifamily lead generation, leasing form tracking, property management marketing',
}

export default function ForPropertyManagement() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Property Management</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your Best Prospects Are Touring Themselves Out the Door</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>70% of prospective tenants who start a contact or tour request form on your property websites never finish it. They were ready to schedule a tour. They typed their name. Then they moved on to the next listing. ReCapture captures them before they disappear.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <div className="ind-stats reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>70%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$3,200</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. annual lease value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>58%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>

        <h2 className="reveal">The Leasing Leak Nobody Is Measuring</h2>
        <p>Apartment hunters are comparison shoppers. They open 10 tabs, start forms on 5 properties, and submit maybe 2. Your property was one of the 3 they abandoned. They liked your floor plans. They started typing their name. But your form asked for move-in date, budget range, number of occupants, and a message — and they moved on to the next listing that only asked for name and email.</p>
        <p>Your leasing team never knew that prospect existed. They cannot follow up on a lead they never received. Meanwhile, the property that made it easiest to inquire gets the tour, gets the application, gets the signed lease.</p>

        <h2 className="reveal">Why Property Management Forms Bleed Leads</h2>
        <p>Leasing inquiry forms are often longer than they need to be. Move-in date, floor plan preference, number of pets, budget range, employer information — every additional field is another chance for the prospect to bail. And unlike someone booking a med spa appointment, an apartment hunter has dozens of options open simultaneously. If your form creates even a moment of friction, they are gone.</p>
        <p>The stakes are high. A single signed lease represents $3,200+ in annual revenue. For a property management company running 20 communities, losing just 5 prospects per property per month to form abandonment means 100 lost leads and over $320,000 in annual lease revenue at risk — across the portfolio.</p>

        <h2 className="reveal">How ReCapture Works for Property Management</h2>
        <p>One script tag per property website. No changes to your existing forms or your property management software. ReCapture captures prospect information the moment they start typing — name, email, phone number, even which floor plan or property they were looking at — before they ever hit submit.</p>
        <p>Every abandoned prospect appears in your dashboard with their contact details and the estimated lease value they represent. Your leasing team can call them within minutes, or ReCapture sends a branded recovery email automatically — from your property name, with a link to schedule a tour.</p>

        <div className="reveal" style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>At scale:</strong> A property management company with 20 communities averaging 15 form submissions per property per month is actually seeing ~50 form starts per property. That is 700 abandoned prospects across the portfolio every month. At $3,200 per lease, that is $2.24 million in annual lease revenue at risk — invisible to every tool except ReCapture.</p>
        </div>

        <h2 className="reveal">The Enterprise Multi-Location Advantage</h2>
        <p>This is where ReCapture was built to shine. One enterprise dashboard shows abandoned leads, revenue at risk, and recovery rates across every property in your portfolio. Your regional managers see their communities. Your corporate team sees the big picture. Every property sends recovery emails from its own branded address. No extra setup per community — one script tag per site, one dashboard for the entire portfolio.</p>
        <p>Companies managing 10, 50, or 500+ properties get the same visibility into every leasing form on every website. Compare which properties are losing the most prospects. Identify which form layouts are causing the highest abandonment. Route recovered leads directly to each property&apos;s leasing office.</p>

        
        <DashboardMockup
          abandoned={83}
          revenueAtRisk={265600}
          recovered={12}
          recoveredRevenue={38400}
          leads={[
            { name: 'Tyler W.', initials: 'TW', email: 'tyler.w@gmail.com', service: '2BR Unit — The Vue', value: 3200, status: 'Open' },
            { name: 'Priya S.', initials: 'PS', email: 'priya.s@outlook.com', service: 'Studio — Park West', value: 2400, status: 'Contacted' },
            { name: 'Marcus J.', initials: 'MJ', email: 'marcus.j@icloud.com', service: '1BR Unit — Skyline', value: 2800, status: 'Recovered' },
            { name: 'Ashley C.', initials: 'AC', email: 'ashley.c@gmail.com', service: '3BR Townhome', value: 4200, status: 'Open' },
          ]}
        />

        <h2 className="reveal">What You Get</h2>
        <div className="ind-features reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time prospect capture', 'Names, emails, phone numbers, and property interest captured before submit'],
            ['Revenue-at-risk dashboard', 'See lease revenue at risk across your entire portfolio'],
            ['Automated recovery emails', 'Branded follow-ups from each property with tour scheduling links'],
            ['Multi-location dashboard', 'Enterprise view across 10, 50, or 500+ communities'],
            ['Weekly performance reports', 'Portfolio-wide leads captured, revenue at risk, and recovery rates every Monday'],
            ['60-second setup per property', 'One script tag per site. No form migration. No IT project'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="reveal">See How Much Your Portfolio Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly revenue at risk across your properties.</p>
        <div className="ind-ctas reveal" style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=property-mgmt" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/demo" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>

        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Losing Tenants to Form Abandonment</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>14-day free trial. Full access from day one. See your first captured lead within 48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start-trial" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Start Your 7-Day Free Trial</Link>
            <Link href="/pricing" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>View Pricing</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
