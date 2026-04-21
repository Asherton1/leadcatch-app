import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'

export const dynamic = 'force-dynamic'


export const metadata = {
  title: 'Business Associate Agreement — ReCapture',
  description: 'ReCapture Business Associate Agreement for HIPAA-compliant data handling on Pro and Enterprise plans.',
  robots: 'noindex',
}

export default function BAAPage() {
  return (
    <div className="blog-post">
      <BlogNav />

      <style>{`@media (max-width: 640px) { .baa-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
      <style>{`.baa-btns a { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }`}</style>
      <div className="blog-post-header">
        <Link href="/pricing" className="blog-post-back">← Back to Pricing</Link>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Legal</p>
        <div className="blog-post-meta">
          <span className="blog-post-date">Effective: April 17, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">Pro & Enterprise Plans</span>
        </div>
        <h1>Business Associate Agreement</h1>
        <div style={{ width: "60px", height: "3px", background: "#ff6b35", margin: "0 auto 1.5rem", borderRadius: "2px" }} />
        <p className="post-subtitle">This BAA is entered into between ReCapture and the customer upon acceptance during the Pro or Enterprise signup process. It governs the handling of Protected Health Information in compliance with HIPAA.</p>
      </div>

      <div className="blog-post-body">

        <div className="baa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', margin: '0 0 2.5rem 0', background: '#111', borderRadius: '12px', border: '1px solid #1e1e1e', overflow: 'hidden' }}>
          {[
            { label: 'Effective Date', value: 'April 17, 2026', color: '#bbb', span: false },
            { label: 'Applies To', value: 'Pro & Enterprise', color: '#bbb', span: false },
            { label: 'Status', value: 'Active', color: '#22c55e', span: false },
            { label: 'Governing Law', value: 'State of Texas', color: '#bbb', span: false },
            { label: 'Standard', value: 'HIPAA / HITECH', color: '#bbb', span: false },
            { label: 'Data Retention', value: 'Deleted on cancel', color: '#bbb', span: false },
            { label: 'Amendment Notice', value: '30 days written', color: '#bbb', span: false },
            { label: 'Breach Notification', value: 'Within 60 days', color: '#bbb', span: false },
            { label: 'Subcontractors', value: 'BAA required', color: '#bbb', span: false },
            { label: 'PHI Sales', value: 'Never', color: '#ff6b35', span: false },
          ].map((item, i) => (
            <div key={i} style={{ padding: '1.25rem 1.5rem', borderRight: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e', gridColumn: item.span ? '1 / -1' : 'auto', textAlign: item.span ? 'center' as const : 'left' as const }}>
              <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.4rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.875rem', color: item.color, fontWeight: 500, lineHeight: 1.4 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <h2>1. Definitions</h2>
        <p>Protected Health Information (PHI) means any individually identifiable health information transmitted or maintained in any form that is created, received, maintained, or transmitted by ReCapture on behalf of the Covered Entity, as defined under HIPAA (45 C.F.R. § 160.103). HIPAA means the Health Insurance Portability and Accountability Act of 1996, as amended by the HITECH Act, and all implementing regulations.</p>

        <h2>2. Obligations of ReCapture</h2>
        <p>ReCapture agrees to the following:</p>
        <p><strong>2.1 Use Limitations.</strong> Not use or disclose PHI other than as permitted by this BAA or as required by law.</p>
        <p><strong>2.2 Safeguards.</strong> Use appropriate administrative, physical, and technical safeguards to prevent unauthorized use or disclosure of PHI in compliance with the HIPAA Security Rule.</p>
        <p><strong>2.3 Subcontractors.</strong> Ensure subcontractors that handle PHI agree to the same restrictions under this BAA.</p>
        <p><strong>2.4 Breach Notification.</strong> Report any breach of unsecured PHI without unreasonable delay and no later than 60 days after discovery.</p>
        <p><strong>2.5 Government Access.</strong> Make its practices and records available to the Secretary of HHS for HIPAA compliance determination.</p>

        <h2>3. Permitted Uses and Disclosures</h2>
        <p>ReCapture may use and disclose PHI only as necessary to perform its services — including form abandonment tracking, lead capture, lead recovery, and related analytics and reporting — or as required by law. ReCapture will not use PHI for marketing purposes or sell PHI under any circumstances.</p>

        <h2>4. Obligations of Covered Entity</h2>
        <p>The customer agrees to notify ReCapture of any limitations in their Notice of Privacy Practices that may affect PHI handling, obtain all necessary consents and authorizations before ReCapture processes PHI, and not request that ReCapture use or disclose PHI in any manner that would violate HIPAA.</p>

        <h2>5. Term and Termination</h2>
        <p>This BAA is effective upon acceptance during the ReCapture signup process and remains in effect for the duration of the subscription. Upon termination, ReCapture will destroy or return all PHI received from or created on behalf of the Covered Entity. If destruction is not feasible, ReCapture will extend BAA protections to such PHI and limit further use or disclosure.</p>

        <h2>6. Miscellaneous</h2>
        <p>This BAA is governed by the laws of the State of Texas. ReCapture may amend this BAA with 30 days written notice — continued use of the service after the effective date constitutes acceptance. This BAA, together with the ReCapture Terms of Service, constitutes the entire agreement between parties regarding HIPAA compliance.</p>

        <h2>7. Contact</h2>
        <p>For questions regarding this BAA or HIPAA compliance, contact ReCapture at <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35' }}>hello@userecapture.com</a> before signing.</p>

        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2rem', margin: '3rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Questions before signing?</span>
          </div>
          <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1rem 0' }}>Contact our compliance team if you require custom BAA terms or have any questions about HIPAA data handling.</p>
          <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>hello@userecapture.com →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Link href="/signup?plan=pro" style={{ display: 'block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 1rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', textAlign: 'center' }}>Start Pro Trial</Link>
          <Link href="/pricing" style={{ display: 'block', background: 'transparent', color: '#888', fontWeight: 600, padding: '0.875rem 1rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid #1e1e1e', textAlign: 'center' }}>Back to Pricing</Link>
        </div>

      </div>
      <Footer />
    </div>
  )
}

