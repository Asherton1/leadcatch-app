import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Form Abandonment Recovery for Dental Practices — ReCapture',
  description: 'Dental practices lose 65% of leads who start an appointment form but never submit. ReCapture captures every partial lead and recovers lost patients automatically.',
  keywords: 'form abandonment dental, dental practice lead recovery, dental lead generation, patient intake form tracking, dental marketing',
}

export default function ForDental() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Built for Dental Practices</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Your New Patients Are Filling Out Your Form — Then Vanishing</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>65% of people who start your appointment request form never finish it. They were ready to book. They typed their name. Then something pulled them away. You paid for that click — ReCapture makes sure you see it.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>65%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$1,900</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. patient lifetime value</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>68%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Traffic from mobile</div>
          </div>
        </div>

        <h2>The Invisible Leak in Your Patient Pipeline</h2>
        <p>You invest in Google Ads, SEO, and maybe even mailers to drive new patients to your website. They land on your appointment request page. They start the form — name, phone number, insurance information, maybe the reason for their visit. Then they hesitate. The form asks too many questions. Their phone buzzes. They tell themselves they will finish it later.</p>
        <p>They do not come back. And your front desk never knows they tried.</p>
        <p>For a dental practice where a single new patient is worth $1,900 in lifetime value — cleanings, crowns, orthodontics, referrals — every one of those invisible drop-offs is money walking out the door.</p>

        <h2>Why Dental Forms Lose More Leads</h2>
        <p>Dental intake forms tend to be longer than average — insurance details, medical history, preferred appointment times. Every additional field increases abandonment. And with 68% of your visitors on mobile, those long forms become scrolling nightmares on a small screen. Studies show that asking for a phone number alone reduces form completion by 5%. Asking for insurance information pushes it even higher.</p>
        <p>The result: for every 30 patients who submit your form, roughly 56 more started it and gave up. Those 56 people were actively looking for a dentist. They chose your practice. They just did not make it across the finish line.</p>

        <h2>How ReCapture Works for Dental Practices</h2>
        <p>One script tag on your website. No changes to your existing forms. No IT department required. ReCapture captures patient information the moment they start typing — name, email, phone number, even which service they selected — before they ever hit submit.</p>
        <p>Every abandoned lead appears in your dashboard with their contact details and estimated patient value. Your front desk can call them directly, or ReCapture sends a branded recovery email automatically — from your practice name, with your scheduling link, in your voice.</p>

        <div style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>The math:</strong> A practice with 30 monthly submissions is losing ~56 additional leads to form abandonment. At a 15% recovery rate with a 40% close rate, that is 3 new patients per month worth $5,700 — from leads you are currently paying for but never seeing.</p>
        </div>

        <h2>Built for Multi-Location Dental Groups</h2>
        <p>MINT Dentistry has 50+ locations. Thrive Dental has 6. Aspen Dental has hundreds. If you manage multiple practices, ReCapture gives you one enterprise dashboard showing abandoned leads, revenue at risk, and recovery rates across every location. See which offices are leaking the most patients. Deploy automated recovery from each location&apos;s branded email. One script tag per site, one dashboard for the entire group.</p>

        <h2>What You Get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['Real-time patient capture', 'Names, emails, phone numbers, and service interest captured before submit'],
            ['Revenue-at-risk dashboard', 'See exactly how much patient revenue your forms are losing monthly'],
            ['Automated recovery emails', 'Branded follow-ups with your practice name and scheduling link'],
            ['Multi-location dashboard', 'Enterprise view across all your dental offices'],
            ['Weekly performance reports', 'Leads captured, revenue at risk, and recovery stats every Monday'],
            ['60-second setup', 'One script tag. No form changes. No developer needed'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h2>See How Much Your Practice Is Losing</h2>
        <p>Use our free ROI Estimator to calculate your monthly revenue at risk based on your patient volume and industry benchmarks.</p>
        <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/calculator?industry=dental" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Run Your ROI Estimate</Link>
          <Link href="/test-form" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>

        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '2rem 0' }}>
          <p style={{ color: '#bbb', lineHeight: 1.8, fontSize: '0.95rem', margin: '0 0 1rem 0', fontStyle: 'italic' }}>&quot;As a healthcare practice, every qualified lead matters. ReCapture showed us exactly who was falling through the cracks on our intake forms. The dashboard is clean, the data is actionable, and the setup took less than two minutes.&quot;</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#ff6b35' }}>D</div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: '#ff6b35', fontSize: '0.8rem' }}>Dave M.</p>
              <p style={{ margin: 0, color: '#666', fontSize: '0.75rem' }}>ESD Health</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Losing Patients to Form Abandonment</h3>
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
