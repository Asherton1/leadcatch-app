import Link from 'next/link'
import DashboardMockup from '../components/DashboardMockup'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Plastic Surgery — ReCapture',
  description: 'Plastic surgery practices lose 72% of leads who start a consultation form but never submit. ReCapture captures every partial lead and recovers lost patients automatically.',
  keywords: 'form abandonment plastic surgery, plastic surgery lead recovery, cosmetic surgery lead generation, consultation form tracking',
}

export default function ForPlasticSurgery() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <ScrollReveal />
      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Plastic Surgery</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your Highest-Value Patients Are Filling Out Your Form — Then Getting Cold Feet</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>72% of people who start a plastic surgery consultation form never finish it. They were ready to take the next step. They typed their name. Then doubt crept in and they closed the tab. At $6,500+ per procedure, ReCapture ensures you never lose that patient.</p>
        </div>
      </div>
      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>
        <div className="ind-stats reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>72%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$6,500</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. procedure value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>65%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>
        <h2 className="reveal">The Consultation That Almost Happened</h2>
        <p>Plastic surgery is one of the highest-consideration decisions a person can make. They have been researching for weeks, maybe months. They found your practice, read your reviews, looked at before-and-after photos, and finally — finally — decided to fill out your consultation request form. Name. Email. Phone. The procedure they are interested in.</p>
        <p>Then they hesitate. Maybe the form asks for too much detail too soon. Maybe they suddenly feel exposed sharing this information online. Maybe their spouse walked into the room. Whatever the reason, they close the tab — and that moment of courage is gone. They may never build it up again. And you never knew they were there.</p>
        <h2 className="reveal">Why Plastic Surgery Forms Have High Abandonment</h2>
        <p>Cosmetic surgery consultation forms deal with deeply personal decisions. Patients feel vulnerable sharing procedure interests online. Forms that ask for photos, detailed medical history, or specific procedure descriptions before a patient has even spoken to your team create significant psychological friction. On top of that, 65% of your visitors are browsing on mobile — often late at night, in private, when they are most likely to research but least likely to complete a lengthy form.</p>
        <p>The result: for every 20 consultation requests you receive, roughly 51 more people started your form and abandoned. Those 51 were ready to take the next step. They just needed a lighter touch to get there.</p>
        <h2 className="reveal">How ReCapture Works for Plastic Surgery</h2>
        <p>One script tag on your website. No changes to your consultation form. No developer required. ReCapture captures patient information the moment they start typing — name, email, phone number, procedure interest — before they ever hit submit.</p>
        <p>Every abandoned consultation appears in your dashboard with contact details and the estimated procedure value. Your patient coordinator can reach out with a warm, personal call — or ReCapture sends a tasteful, branded recovery email automatically, inviting them to a no-obligation consultation.</p>
        <div className="reveal" style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>The math:</strong> A plastic surgery practice getting 20 consultation submissions per month is actually seeing ~71 form starts. That means ~51 potential patients abandoned. At $6,500 per procedure with a 28% close rate, recovering just 2 consultations per month adds $3,640 in revenue — paying for ReCapture 18x over.</p>
        </div>
        <h2 className="reveal">Built for Multi-Location Practices</h2>
        <p>If your practice operates across multiple offices or has multiple surgeons, ReCapture gives you a single dashboard showing abandoned consultations across every location. Route recovered patients to the right office or surgeon. Compare abandonment rates between locations. Deploy personalized recovery emails from each office&apos;s branded address.</p>
        
        <DashboardMockup
          abandoned={51}
          revenueAtRisk={331500}
          recovered={5}
          recoveredRevenue={32500}
          leads={[
            { name: 'Lauren M.', initials: 'LM', email: 'lauren.m@gmail.com', service: 'Rhinoplasty Consult', value: 7500, status: 'Open' },
            { name: 'Christine A.', initials: 'CA', email: 'christine.a@me.com', service: 'Breast Augmentation', value: 8200, status: 'Contacted' },
            { name: 'Jennifer T.', initials: 'JT', email: 'jennifer.t@yahoo.com', service: 'Tummy Tuck Consult', value: 9000, status: 'Recovered' },
            { name: 'Nicole F.', initials: 'NF', email: 'nicole.f@gmail.com', service: 'Facelift Consultation', value: 12000, status: 'Open' },
          ]}
        />

        <h2 className="reveal">What You Get</h2>
        <div className="ind-features reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time patient capture', 'Names, emails, phone numbers, and procedure interest captured before submit'],
            ['Revenue-at-risk dashboard', 'See the procedure value of every lead your forms are losing'],
            ['Tasteful recovery emails', 'Branded, sensitive follow-ups that invite a no-obligation consultation'],
            ['Multi-location dashboard', 'Enterprise view across all practice locations'],
            ['Weekly performance reports', 'Consultations captured, revenue at risk, and recovery stats every Monday'],
            ['60-second setup', 'One script tag. No form migration. No developer required'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
        <h2 className="reveal">See How Much Your Practice Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly revenue at risk based on your consultation volume and procedure values.</p>
        <div className="ind-ctas reveal" style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=plastic-surgery" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/test-form" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>
        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Losing Patients to Form Abandonment</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>14-day free trial. Full access from day one. See your first captured lead within 48 hours.</p>
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
