import Link from 'next/link'
import DashboardMockup from '../components/DashboardMockup'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Med Spas — ReCapture',
  description: 'Med spas lose 67% of leads who start a consultation form but never submit. ReCapture captures every partial lead in real time and recovers lost revenue automatically.',
  keywords: 'form abandonment med spa, med spa lead recovery, med spa lead generation, consultation form tracking, med spa marketing',
}

export default function ForMedSpas() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Med Spas</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your Botox Leads Are Disappearing Before They Book</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>67% of people who start your consultation form never finish it. They typed their name, their email, maybe even their phone number — then got distracted and closed the tab. You never knew they existed. ReCapture changes that.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <div className="ind-stats reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>67%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$2,800</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. client lifetime value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>72%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>

        <h2 className="reveal">The Problem No Med Spa Talks About</h2>
        <p>You spend thousands on Google Ads, Instagram campaigns, and SEO to drive traffic to your website. Potential clients land on your consultation request form. They start filling it out — name, email, maybe what treatment they want. Then their phone rings, or their kid screams, or they think &quot;I&apos;ll finish this later.&quot;</p>
        <p>They never come back. And you never knew they were there.</p>
        <p>Google Analytics shows you the page view. Your CRM shows you the submission. But neither one shows you the person in between — the one who was 80% through your form and vanished. For a med spa where a single Botox client is worth $2,800+ over their lifetime, that invisible drop-off is costing you real money every single month.</p>

        <h2 className="reveal">Why Med Spas Lose More Leads Than Most</h2>
        <p>Med spa consultation forms ask for sensitive information — treatment interests, skin concerns, sometimes even photos. That creates hesitation. On top of that, 72% of your traffic is on mobile, where form completion rates are significantly lower than desktop. Small screens, tiny fields, auto-correct nightmares — your potential client was ready to book, but the experience lost them.</p>
        <p>The med spa industry is projected to reach $49 billion by 2030, growing at 15% annually. Competition is fierce. Every lost lead is a client walking into the practice down the street.</p>

        <h2 className="reveal">How ReCapture Works for Med Spas</h2>
        <p>One script tag on your website. No form changes. No developer needed. The moment someone starts typing into your consultation form, ReCapture captures their information in real time — name, email, phone number, treatment interest — even if they never hit submit.</p>
        <p>You see every abandoned lead in a clean dashboard with their contact information and the estimated revenue they represent. Follow up manually with a personal call, or let ReCapture send branded recovery emails on your behalf — automatically, with your practice name and your tone.</p>

        <div className="reveal" style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>Real example:</strong> A med spa getting 30 form submissions per month is actually getting ~91 form starts. That means ~61 people typed something into the form and left. At $2,800 per client, that is $170,800 in potential revenue walking away every month — invisible to every analytics tool except ReCapture.</p>
        </div>

        <h2 className="reveal">Built for Multi-Location Med Spas</h2>
        <p>If you operate 5, 10, or 50+ locations, ReCapture gives you a single enterprise dashboard that shows abandoned leads across every property. See which locations are leaking the most revenue, compare recovery rates, and send automated follow-ups from each location&apos;s branded email. No extra setup per location — one script tag per site, one dashboard for everything.</p>

        
        <DashboardMockup
          abandoned={47}
          revenueAtRisk={131600}
          recovered={7}
          recoveredRevenue={19600}
          leads={[
            { name: 'Sarah M.', initials: 'SM', email: 'sarah.m@gmail.com', service: 'Botox Consultation', value: 2800, status: 'Open' },
            { name: 'Jessica L.', initials: 'JL', email: 'jess.l@icloud.com', service: 'Laser Hair Removal', value: 3200, status: 'Contacted' },
            { name: 'Amanda R.', initials: 'AR', email: 'amanda.r@yahoo.com', service: 'Chemical Peel', value: 1800, status: 'Recovered' },
            { name: 'Rachel K.', initials: 'RK', email: 'rachel.k@gmail.com', service: 'Body Contouring', value: 4500, status: 'Open' },
          ]}
        />

        <h2 className="reveal">What You Get</h2>
        <div className="ind-features reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time partial form capture', 'Names, emails, and phone numbers captured the instant they are typed'],
            ['Revenue-at-risk dashboard', 'See the dollar value of every lead you are losing each month'],
            ['Automated recovery emails', 'Branded follow-ups sent on your behalf — your name, your tone'],
            ['Multi-location dashboard', 'One view across all your med spa locations'],
            ['Weekly performance reports', 'Delivered every Monday with leads captured, revenue at risk, and recoveries'],
            ['60-second setup', 'One script tag. No form migration. No developer required'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="reveal">See How Much Your Med Spa Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly revenue at risk based on your form traffic, average client value, and industry benchmarks.</p>
        <div className="ind-ctas reveal" style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=medspa" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/demo" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>

        <div className="reveal" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '2rem 0' }}>
          <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1rem 0', fontStyle: 'italic' }}>&quot;We had no idea how many leads were starting our consultation form and dropping off. Within the first week, ReCapture surfaced 14 leads we never would have known about. Three of them booked. That alone paid for the year.&quot;</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#ff6b35' }}>R</div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.8rem' }}>Richard H.</p>
              <p style={{ margin: 0, color: '#666', fontSize: '0.75rem' }}>Clear PH Design</p>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Losing Clients to Form Abandonment</h3>
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
