import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Business Associate Agreement — ReCapture',
  description: 'ReCapture Business Associate Agreement for HIPAA-compliant data handling on Pro and Enterprise plans.',
  robots: 'noindex',
}

const sections = [
  {
    number: '01',
    title: 'Definitions',
    content: 'Protected Health Information (PHI) means any individually identifiable health information transmitted or maintained in any form that is created, received, maintained, or transmitted by ReCapture on behalf of the Covered Entity, as defined under HIPAA (45 C.F.R. § 160.103). HIPAA means the Health Insurance Portability and Accountability Act of 1996, as amended by the HITECH Act, and all implementing regulations.',
  },
  {
    number: '02',
    title: 'Obligations of ReCapture',
    content: 'ReCapture agrees to: (a) not use or disclose PHI other than as permitted by this BAA or required by law; (b) use appropriate administrative, physical, and technical safeguards to prevent unauthorized use or disclosure of PHI in compliance with the HIPAA Security Rule; (c) ensure subcontractors that handle PHI agree to the same restrictions under this BAA; (d) report any breach of unsecured PHI without unreasonable delay and no later than 60 days after discovery; (e) make its practices and records available to the Secretary of HHS for HIPAA compliance determination.',
  },
  {
    number: '03',
    title: 'Permitted Uses and Disclosures',
    content: 'ReCapture may use and disclose PHI only as necessary to perform its services — including form abandonment tracking, lead capture, lead recovery, and related analytics and reporting — or as required by law. ReCapture will not use PHI for marketing purposes or sell PHI under any circumstances.',
  },
  {
    number: '04',
    title: 'Obligations of Covered Entity',
    content: 'The customer agrees to: (a) notify ReCapture of any limitations in their Notice of Privacy Practices that may affect PHI handling; (b) obtain all necessary consents and authorizations before ReCapture processes PHI; (c) not request that ReCapture use or disclose PHI in any manner that would violate HIPAA.',
  },
  {
    number: '05',
    title: 'Term and Termination',
    content: 'This BAA is effective upon acceptance during the ReCapture signup process and remains in effect for the duration of the subscription. Upon termination, ReCapture will destroy or return all PHI received from or created on behalf of the Covered Entity. If destruction is not feasible, ReCapture will extend BAA protections to such PHI and limit further use or disclosure.',
  },
  {
    number: '06',
    title: 'Miscellaneous',
    content: 'This BAA is governed by the laws of the State of Texas. ReCapture may amend this BAA with 30 days written notice — continued use of the service after the effective date constitutes acceptance. This BAA, together with the ReCapture Terms of Service, constitutes the entire agreement between parties regarding HIPAA compliance.',
  },
]

export default function BAAPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <BlogNav />

      {/* Hero */}
      <div style={{ maxWidth: '100%', background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)', borderBottom: '1px solid #1a1a1a', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '6px', padding: '0.35rem 0.75rem', marginBottom: '2rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>HIPAA Compliant</span>
          </div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', margin: '0 0 1.25rem 0' }}>Business Associate<br />Agreement</h1>
          <p style={{ fontSize: '1.0625rem', color: '#666', lineHeight: 1.8, margin: '0 0 2rem 0', maxWidth: '560px' }}>This BAA is entered into between ReCapture and the customer upon acceptance during the Pro or Enterprise signup process. It governs the handling of Protected Health Information in compliance with HIPAA.</p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.25rem' }}>Effective Date</div>
              <div style={{ fontSize: '0.9rem', color: '#bbb', fontWeight: 500 }}>April 17, 2026</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.25rem' }}>Applies To</div>
              <div style={{ fontSize: '0.9rem', color: '#bbb', fontWeight: 500 }}>Pro & Enterprise Plans</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.25rem' }}>Governing Law</div>
              <div style={{ fontSize: '0.9rem', color: '#bbb', fontWeight: 500 }}>State of Texas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 2rem' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', padding: '2.5rem 0', borderBottom: i < sections.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
            <div style={{ paddingTop: '0.2rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'inherit' }}>{s.number}</div>
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>{s.title}</h2>
              <p style={{ fontSize: '0.9375rem', color: '#777', lineHeight: 1.85, margin: 0 }}>{s.content}</p>
            </div>
          </div>
        ))}

        {/* Contact */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>Questions about this BAA?</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, margin: '0 0 1rem 0' }}>Contact our compliance team before signing if you have any questions or require custom BAA terms for your organization.</p>
          <a href="mailto:hello@userecapture.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff6b35', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>hello@userecapture.com →</a>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/signup?plan=pro" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>
            Start Pro Trial
          </Link>
          <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#888', fontWeight: 600, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid #1e1e1e' }}>
            Back to Pricing
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
