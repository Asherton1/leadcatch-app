import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import DashboardMockup from '../components/DashboardMockup'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'ReCapture for GoHighLevel Agencies — Form Abandonment Recovery Add-On',
  description: 'GoHighLevel captures submitted leads. ReCapture captures the ones who never submitted. Add form abandonment recovery to any GHL client site with one script tag.',
  keywords: 'GoHighLevel form abandonment, GHL lead recovery, GoHighLevel add-on, HighLevel partial form capture, GHL agency tools',
}

export default function ForGoHighLevel() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>For GoHighLevel Agencies</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>GHL Captures Submitted Leads. ReCapture Gets the Ones Who Never Hit Submit.</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>GoHighLevel is built to nurture and close leads after they submit. But 60-70% of your clients&apos; website visitors start a form and abandon it before submitting. GHL never sees those people. ReCapture does — and brings them back automatically.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 2rem 3rem' }}>

        <div className="ind-stats reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', margin: '2rem 0 3rem' }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>67%</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Avg. form abandonment rate</div>
          </div>
          <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>$0</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>GHL revenue from these leads</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>1</div>
            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.35rem' }}>Script tag to fix it</div>
          </div>
        </div>

        <h2 className="reveal">The Gap in Your GHL Stack</h2>
        <p>GoHighLevel is one of the most powerful all-in-one platforms for agencies. Funnels, CRM, email automation, SMS follow-up — it handles the entire lead nurture journey. But there is a blind spot at the very top of the funnel that GHL does not solve.</p>
        <p>When a prospect lands on your client&apos;s contact form, starts typing their name and email, then closes the tab — GoHighLevel never creates a contact. There is no trigger, no workflow, no follow-up sequence. That person does not exist in the system. Your client&apos;s ad spend brought them to the door, and they walked away without a trace.</p>
        <p>GoHighLevel&apos;s partial survey capture — added in 2025 — only works on multi-step GHL surveys where email is collected on page 1. It does not work on standard HTML forms, WordPress forms, Webflow forms, or any third-party form builder. For most agency clients, it captures almost nothing.</p>

        <h2 className="reveal">What ReCapture Adds to Your GHL Stack</h2>
        <p>ReCapture installs in 60 seconds with a single script tag on any website — WordPress, Webflow, Wix, Squarespace, or custom HTML. It works alongside GoHighLevel, not instead of it. The moment a visitor starts typing into any contact form, ReCapture captures their data in real time, even if they never submit.</p>
        <p>Those leads appear in your client&apos;s ReCapture dashboard with their name, email, phone number, and what they were looking for. ReCapture then sends automated recovery emails on the client&apos;s behalf — branded to their business, timed the way they want. Your client gets more leads from the same ad spend. You look like the agency that delivers results nobody else can.</p>

        <div className="reveal" style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 12, padding: '1.5rem 2rem', margin: '2.5rem 0' }}>
          <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}><strong style={{ color: '#ff6b35' }}>The math:</strong> A med spa client getting 40 form submissions per month is actually getting ~121 form starts. That means ~81 people typed something and left. At $2,800 per client lifetime value, that is $226,800 in potential revenue your GHL stack is missing every single month — per client.</p>
        </div>

        <h2 className="reveal">Built for Agencies Managing Multiple Clients</h2>
        <p>ReCapture&apos;s enterprise dashboard was built with agencies in mind. Each client gets their own API key, their own branded recovery emails, and their own dashboard. You manage everything from a single admin view. Add a new client in minutes, deploy their script tag, and start capturing leads the same day.</p>
        <p>Every client gets weekly performance reports delivered to their inbox — showing abandoned leads captured, revenue at risk, and recoveries made. That is a deliverable your competitors are not sending. That is your agency looking irreplaceable.</p>

        <DashboardMockup
          abandoned={34}
          revenueAtRisk={95200}
          recovered={6}
          recoveredRevenue={16800}
          leads={[
            { name: 'Marcus T.', initials: 'MT', email: 'marcus.t@gmail.com', service: 'Dental Implant Inquiry', value: 4500, status: 'Open' },
            { name: 'Priya S.', initials: 'PS', email: 'priya.s@icloud.com', service: 'Med Spa Consultation', value: 2800, status: 'Contacted' },
            { name: 'James R.', initials: 'JR', email: 'james.r@yahoo.com', service: 'Leasing Inquiry - 2BR', value: 3200, status: 'Recovered' },
            { name: 'Lauren K.', initials: 'LK', email: 'lauren.k@gmail.com', service: 'Cosmetic Consult', value: 6500, status: 'Open' },
          ]}
        />

        <h2 className="reveal">Why Agencies Add ReCapture to Their Stack</h2>
        <div className="ind-features reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['New revenue from existing traffic', 'Recover leads your clients are already paying for — no extra ad spend required'],
            ['Works on any website', 'WordPress, Webflow, Wix, Squarespace, custom HTML — one script tag works everywhere'],
            ['Branded to your client', 'Recovery emails go out under your client\'s name, not ours. White-label ready'],
            ['Enterprise multi-client dashboard', 'Manage every client from one admin view — leads, revenue, and recovery rates'],
            ['HIPAA-ready for healthcare clients', 'Dental, med spa, plastic surgery, fertility — BAA included on Pro and Enterprise'],
            ['Measurable ROI every week', 'Automated weekly reports your clients can hold in their hands'],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#ff6b35', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 0.35rem 0' }}>{title}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="reveal">ReCapture vs GHL Partial Capture</h2>
        <div className="reveal" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden', margin: '1.5rem 0 2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #1a1a1a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capability</th>
                <th style={{ textAlign: 'center', padding: '1rem 1.25rem', color: '#ff6b35', fontWeight: 700, borderBottom: '1px solid #1a1a1a', background: 'rgba(255,107,53,0.04)' }}>ReCapture</th>
                <th style={{ textAlign: 'center', padding: '1rem 1.25rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a' }}>GHL Partial Capture</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Works on any HTML form', true, false],
                ['Works on GHL surveys', true, true],
                ['Exit-intent detection', true, false],
                ['Mid-field real-time capture', true, false],
                ['Auto-recovery emails', true, false],
                ['Lead scoring (hot/warm/cold)', true, false],
                ['Revenue-at-risk dashboard', true, false],
                ['HIPAA-ready + BAA', true, '$297/mo add-on'],
                ['Weekly client reports', true, false],
                ['Multi-client admin dashboard', true, false],
              ].map(([label, rc, ghl], i) => (
                <tr key={i}>
                  <td style={{ padding: '0.875rem 1.25rem', color: '#ccc', borderBottom: '1px solid #111' }}>{label}</td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 1.25rem', borderBottom: '1px solid #111', background: 'rgba(255,107,53,0.02)' }}>
                    {rc === true ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{rc}</span>}
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.875rem 1.25rem', borderBottom: '1px solid #111' }}>
                    {ghl === true ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : ghl === false ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> : <span style={{ fontSize: '0.8rem', color: '#888' }}>{ghl}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="reveal">How to Add ReCapture to a GHL Client</h2>
        <p>Adding ReCapture to any GoHighLevel client takes under 60 seconds:</p>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0 2.5rem' }}>
          {[
            ['01', 'Create a client account in ReCapture — they get a unique API key instantly'],
            ['02', 'Drop one script tag into their website header — works in GHL sites, WordPress, Webflow, anywhere'],
            ['03', 'Configure their recovery email branding and delay timing — takes 2 minutes'],
            ['04', 'ReCapture starts capturing abandoned leads immediately — no form changes needed'],
          ].map(([num, step], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: 10 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.1em', flexShrink: 0, marginTop: '2px' }}>{num}</span>
              <span style={{ color: '#bbb', fontSize: '0.9rem', lineHeight: 1.6 }}>{step}</span>
            </div>
          ))}
        </div>

        <div className="ind-ctas reveal" style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0 2.5rem', flexWrap: 'wrap' }}>
          <Link href="/start-trial" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Start Your 7-Day Free Trial</Link>
          <Link href="/demo" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Try the Live Demo</Link>
        </div>

        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem', textAlign: 'center', margin: '3rem 0 0' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Ready to Offer Form Abandonment Recovery to Every Client?</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>14-day free trial. Full access from day one. Add your first client in under 60 seconds.</p>
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
