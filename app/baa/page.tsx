import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

export const metadata = {
  title: 'Business Associate Agreement — ReCapture',
  description: 'ReCapture Business Associate Agreement (BAA) for HIPAA-compliant data handling on the Pro and Enterprise plans.',
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
        <p className="post-subtitle">This Business Associate Agreement (&quot;BAA&quot;) is entered into between ReCapture (&quot;Business Associate&quot;) and the customer (&quot;Covered Entity&quot;) and is incorporated into the ReCapture Terms of Service.</p>
      </div>

      <div className="blog-post-body">

        <h2>1. Definitions</h2>
        <p>&quot;Protected Health Information&quot; or &quot;PHI&quot; means any individually identifiable health information transmitted or maintained in any form or medium that is created, received, maintained, or transmitted by Business Associate on behalf of Covered Entity, as defined under HIPAA (45 C.F.R. § 160.103).</p>
        <p>&quot;HIPAA&quot; means the Health Insurance Portability and Accountability Act of 1996, as amended by the Health Information Technology for Economic and Clinical Health (HITECH) Act, and all implementing regulations.</p>

        <h2>2. Obligations of Business Associate</h2>
        <p>ReCapture agrees to:</p>
        <p><strong>2.1 Use Limitations.</strong> Not use or disclose PHI other than as permitted or required by this BAA or as required by law.</p>
        <p><strong>2.2 Safeguards.</strong> Use appropriate administrative, physical, and technical safeguards, and comply with HIPAA Security Rule requirements, to prevent unauthorized use or disclosure of PHI.</p>
        <p><strong>2.3 Subcontractors.</strong> Ensure that any subcontractors that create, receive, maintain, or transmit PHI on behalf of ReCapture agree to the same restrictions and conditions that apply to ReCapture under this BAA.</p>
        <p><strong>2.4 Breach Notification.</strong> Report to Covered Entity any use or disclosure of PHI not provided for by this BAA, including breaches of unsecured PHI, without unreasonable delay and in no case later than 60 days after discovery of a breach.</p>
        <p><strong>2.5 Access.</strong> Make PHI available to Covered Entity as necessary to satisfy Covered Entity&apos;s obligations under HIPAA.</p>
        <p><strong>2.6 Amendment.</strong> Make PHI available for amendment and incorporate any amendments to PHI in accordance with HIPAA requirements.</p>
        <p><strong>2.7 Accounting.</strong> Maintain and make available information required for Covered Entity to provide an accounting of disclosures of PHI.</p>
        <p><strong>2.8 Government Access.</strong> Make its internal practices, books, and records relating to the use and disclosure of PHI available to the Secretary of the U.S. Department of Health and Human Services for purposes of determining compliance with HIPAA.</p>

        <h2>3. Permitted Uses and Disclosures</h2>
        <p>ReCapture may use and disclose PHI only as necessary to perform services described in the ReCapture Terms of Service, including form abandonment tracking, lead capture, lead recovery, and related analytics and reporting. ReCapture may also use and disclose PHI as required by law.</p>

        <h2>4. Obligations of Covered Entity</h2>
        <p>Covered Entity agrees to:</p>
        <p><strong>4.1</strong> Notify ReCapture of any limitations in Covered Entity&apos;s Notice of Privacy Practices that may affect ReCapture&apos;s use or disclosure of PHI.</p>
        <p><strong>4.2</strong> Obtain any consents or authorizations necessary for ReCapture to perform its services under the Terms of Service.</p>
        <p><strong>4.3</strong> Not request that ReCapture use or disclose PHI in any manner that would violate HIPAA.</p>

        <h2>5. Term and Termination</h2>
        <p>This BAA is effective upon the date Covered Entity accepts it during the ReCapture signup process and remains in effect for the duration of the ReCapture subscription. Upon termination of the subscription, ReCapture will, at the direction of Covered Entity, destroy or return all PHI received from or created on behalf of Covered Entity. If return or destruction is not feasible, ReCapture will extend the protections of this BAA to such PHI and limit further use or disclosure.</p>

        <h2>6. Miscellaneous</h2>
        <p><strong>6.1 Amendment.</strong> This BAA may be amended by ReCapture upon 30 days written notice. Continued use of the service after the amendment effective date constitutes acceptance.</p>
        <p><strong>6.2 Interpretation.</strong> This BAA shall be interpreted as broadly as necessary to implement and comply with HIPAA.</p>
        <p><strong>6.3 Governing Law.</strong> This BAA shall be governed by the laws of the State of Texas.</p>
        <p><strong>6.4 Entire Agreement.</strong> This BAA, together with the ReCapture Terms of Service, constitutes the entire agreement between the parties with respect to the subject matter hereof.</p>

        <h2>7. Contact</h2>
        <p>For questions regarding this BAA or HIPAA compliance, contact ReCapture at <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35' }}>hello@userecapture.com</a>.</p>

        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem 2rem', margin: '3rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
          <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>By accepting this BAA during signup, you are entering into a legally binding agreement with ReCapture. If you have questions before signing, email us at <a href="mailto:hello@userecapture.com" style={{ color: '#ff6b35' }}>hello@userecapture.com</a>.</p>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link href="/signup?plan=pro" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Back to Signup</Link>
        </div>

      </div>
      <Footer />
    </div>
  )
}
