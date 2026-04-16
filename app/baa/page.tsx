import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Business Associate Agreement — ReCapture',
  description: 'ReCapture Business Associate Agreement for HIPAA-compliant data handling.',
  robots: 'noindex',
}

export default function BAAPage() {
  return (
    <div className="blog-post">
      <BlogNav />
      <div className="blog-post-header">
        <Link href="/pricing" className="blog-post-back">← Back to Pricing</Link>
        <div className="blog-post-tag">Legal</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">Effective: April 17, 2026</span>
        </div>
        <h1>Business Associate Agreement</h1>
        <p className="post-subtitle">This Business Associate Agreement is entered into between ReCapture and the customer and is incorporated into the ReCapture Terms of Service.</p>
      </div>
      <div className="blog-post-body">
        <h2>1. Definitions</h2>
        <p>Protected Health Information or PHI means any individually identifiable health information transmitted or maintained in any form that is created, received, maintained, or transmitted by ReCapture on behalf of the Covered Entity, as defined under HIPAA (45 C.F.R. 160.103).</p>
        <h2>2. Obligations of ReCapture</h2>
        <p><strong>2.1 Use Limitations.</strong> ReCapture will not use or disclose PHI other than as permitted by this BAA or as required by law.</p>
        <p><strong>2.2 Safeguards.</strong> ReCapture will use appropriate administrative, physical, and technical safeguards to prevent unauthorized use or disclosure of PHI in compliance with the HIPAA Security Rule.</p>
        <p><strong>2.3 Subcontractors.</strong> ReCapture will ensure subcontractors that handle PHI agree to the same restrictions under this BAA.</p>
        <p><strong>2.4 Breach Notification.</strong> ReCapture will report any breach of unsecured PHI without unreasonable delay and no later than 60 days after discovery.</p>
        <p><strong>2.5 Government Access.</strong> ReCapture will make its practices and records available to the Secretary of HHS for HIPAA compliance determination.</p>
        <h2>3. Permitted Uses</h2>
        <p>ReCapture may use and disclose PHI only as necessary to perform its services — including form abandonment tracking, lead capture, lead recovery, and related reporting — or as required by law.</p>
        <h2>4. Obligations of Covered Entity</h2>
        <p>The customer agrees to notify ReCapture of any limitations that may affect PHI handling, obtain all necessary authorizations, and not request that ReCapture use or disclose PHI in violation of HIPAA.</p>
        <h2>5. Term and Termination</h2>
        <p>This BAA is effective upon acceptance during signup and remains in effect for the duration of the ReCapture subscription. Upon termination, ReCapture will destroy or return all PHI, or extend BAA protections if destruction is not feasible.</p>
        <h2>6. Miscellaneous</h2>
        <p>This BAA is governed by the laws of the State of Texas and constitutes the entire agreement between parties regarding HIPAA compliance. ReCapture may amend this BAA with 30 days written notice.</p>
        <h2>7. Contact</h2>
        <p>Questions regarding this BAA: <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35' }}>hello@userecapture.com</a></p>
        <div style={{ background: '#111', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '1.5rem 2rem', margin: '3rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
          <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>By accepting this BAA during signup you are entering into a legally binding agreement. Questions before signing? Email <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35' }}>hello@userecapture.com</a>.</p>
        </div>
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none' }}>Back to Signup</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
