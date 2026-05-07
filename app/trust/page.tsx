import Link from "next/link"
import Image from "next/image"
import MobileNav from "@/app/components/MobileNav"
import ScrollReveal from "@/app/components/ScrollReveal"
import Footer from "@/app/components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trust & Compliance — ReCapture",
  description: "How ReCapture handles data, compliance, security, and your responsibilities as a customer. TCPA, CAN-SPAM, GDPR, HIPAA-ready.",
}

export default function TrustPage() {
  return (
    <div className="trust-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <ScrollReveal />

      <nav className="lc-nav">
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" priority />
        </Link>
        <MobileNav />
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "8rem 2rem 3rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Trust & Compliance
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          How ReCapture handles your data, your visitors, and the laws that govern both.
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75 }}>
          ReCapture sits between your forms and your visitors. That means we take compliance seriously — not as marketing, but as a working operational discipline. This page tells you exactly what we capture, when, why, and what your responsibilities are as the customer deploying our software.
        </p>
        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "1.5rem", fontStyle: "italic" }}>
          Last updated: May 2026. Material changes will be communicated in advance to active customers.
        </p>
      </section>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 4rem" }}>

        {/* Section: What we capture and when */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            01 \u2014 What we capture
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Form abandonment data, captured before submission.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              When a visitor begins typing into a form on a customer\u2019s website, ReCapture captures: name, email, phone number, free-text fields they have filled in, the time spent on the form, the device type, and the page URL.
            </p>
            <p>
              We do not capture: passwords, payment card data, social security numbers, credit card CVVs, or any field marked sensitive by the customer or detected by our defensive filters.
            </p>
            <p>
              Capture happens on every keystroke after the first character is entered, transmitted via heartbeat at 15-second intervals and on tab close, page navigation, and exit-intent. Visitors who never start typing are never captured.
            </p>
            <p>
              EU, UK, and Swiss visitors are blocked at the tracker level via IP geolocation. We do not capture data from these regions. If our IP detection fails, the tracker fails closed (no capture).
            </p>
            <p>
              Visitors on customer sites with active cookie consent platforms (OneTrust, Cookiebot, CookieYes) are only tracked when consent has been granted.
            </p>
          </div>
        </section>

        {/* Section: Client responsibilities */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            02 \u2014 Customer responsibilities
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            ReCapture is the infrastructure. You own the relationship with your visitors.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              ReCapture provides software. Customers control the deployment, the consent flows, and the visitor relationship. As a customer, you are responsible for:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "1rem" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>Privacy policy disclosure.</strong> Your privacy policy must describe form abandonment recovery technology, the data captured, and how it is used. We provide a template at <Link href="/legal/client-privacy-template" style={{ color: "#ff6b35" }}>/legal/client-privacy-template</Link>.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>Form consent language.</strong> Your contact forms must include consent language authorizing follow-up communications via the channels you have enabled (email, SMS, AI voice).
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>AI voice callback acknowledgment.</strong> If you enable AI voice callback, you explicitly acknowledge TCPA, FCC, and Texas SB 140 compliance responsibility through the in-app disclaimer.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>BAA execution for healthcare.</strong> If you are a HIPAA-covered entity, you must execute a Business Associate Agreement with ReCapture before deploying. Available on Pro and Enterprise plans.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>Physical postal address.</strong> Required by CAN-SPAM. Your business address appears in the footer of every recovery email and must be kept accurate.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "#e4e4e7" }}>Honoring opt-outs.</strong> Our infrastructure handles opt-out detection and enforcement automatically. You agree not to manually re-contact a visitor who has opted out.
              </li>
            </ul>
          </div>
        </section>

        {/* Section: Security */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            03 \u2014 Security posture
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Encryption in transit and at rest. Row-level access controls. Audit logs.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              All data transmitted between visitor browsers, our tracker, and our backend is encrypted in transit via TLS 1.3. All data at rest in our Postgres database is encrypted using AES-256.
            </p>
            <p>
              Multi-tenant isolation is enforced at the database level via row-level security policies. A customer can only ever read or write data tied to their own account. API keys are scoped per-customer and revocable from the dashboard.
            </p>
            <p>
              We log all administrative access. We do not access individual customer lead data without a documented support request from the customer.
            </p>
            <p>
              SOC 2 Type II audit is on the roadmap for late 2026. We are happy to share our security questionnaire with enterprise prospects under NDA.
            </p>
          </div>
        </section>

        {/* Section: TCPA */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            04 \u2014 TCPA & voice callback
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            AI voice callback is opt-in, disclosed, and quiet-hours aware.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              AI voice callback is disabled by default for all new customers. Enabling it requires explicit acknowledgment of TCPA, FCC, and Texas SB 140 compliance responsibility, captured with timestamp and version in our database.
            </p>
            <p>
              When AI voice callback is enabled, every call begins with a mandatory AI disclosure within the first 15 seconds, satisfying Texas SB 140 and FCC identification requirements.
            </p>
            <p>
              Our AI concierge recognizes 14 opt-out trigger phrases (\u201cstop,\u201d \u201cdo not call,\u201d \u201cremove me,\u201d \u201cunsubscribe,\u201d and similar). When detected, the call ends immediately and the phone number is added to our master Do Not Contact list, enforced across all channels (voice, SMS, email) for that visitor going forward.
            </p>
            <p>
              Calls are placed only during the customer-configured call hours window and never during configured quiet hours. We do not place calls to numbers on the National Do Not Call Registry where the customer has indicated registry checking is required.
            </p>
          </div>
        </section>

        {/* Section: Data retention */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            05 \u2014 Data retention
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Lead data is retained as long as the customer account is active. Opt-outs are retained indefinitely.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              Lead data captured by ReCapture is retained while the customer account is active and the customer has not requested earlier deletion. Customers can request deletion of any lead at any time via the dashboard.
            </p>
            <p>
              Opt-out records (Do Not Contact entries) are retained indefinitely as a matter of regulatory compliance. Removing an opt-out record requires a written request from the visitor themselves.
            </p>
            <p>
              When a customer cancels their account, all lead data tied to that account is purged within 30 days of cancellation. Opt-out records remain.
            </p>
            <p>
              California residents may exercise CCPA rights (access, deletion, opt-out of sale) by contacting <a href="mailto:privacy@userecapture.com" style={{ color: "#ff6b35" }}>privacy@userecapture.com</a>. We do not sell visitor data to third parties.
            </p>
          </div>
        </section>

        {/* Section: Subprocessors */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            06 \u2014 Subprocessors
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Vendors that process customer or visitor data on our behalf.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem 0", color: "#71717a", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Vendor</th>
                  <th style={{ textAlign: "left", padding: "0.75rem 0", color: "#71717a", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: "0.75rem 0", color: "#71717a", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Region</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Supabase</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>Database, authentication</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Vercel</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>Application hosting & edge delivery</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Resend</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>Transactional & recovery email delivery</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Twilio</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>SMS alerts to customer staff</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Retell AI</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>AI voice callback infrastructure</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#e4e4e7", fontWeight: 600 }}>Stripe</td>
                  <td style={{ padding: "0.75rem 1rem 0.75rem 0", color: "#a1a1aa" }}>Customer billing & subscription management</td>
                  <td style={{ padding: "0.75rem 0", color: "#a1a1aa" }}>US</td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#71717a" }}>
              Material changes to our subprocessor list are communicated to active customers in advance via email.
            </p>
          </div>
        </section>

        {/* Section: HIPAA / BAA */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            07 \u2014 Healthcare & HIPAA
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            BAAs available on Pro and Enterprise plans.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              ReCapture executes Business Associate Agreements with HIPAA-covered customers on the Pro plan and above. Enterprise plans include the BAA by default.
            </p>
            <p>
              We restrict our subprocessor stack for healthcare customers to vendors that themselves offer BAAs. Healthcare deployments may require additional configuration; contact our team to scope.
            </p>
            <p>
              See our <Link href="/baa" style={{ color: "#ff6b35" }}>BAA page</Link> for the standard agreement terms.
            </p>
          </div>
        </section>

        {/* Section: Compliance contact */}
        <section className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            08 \u2014 Contact
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
            Questions, security disclosures, data subject requests.
          </h2>
          <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              For privacy questions, data subject access or deletion requests, or general compliance inquiries: <a href="mailto:privacy@userecapture.com" style={{ color: "#ff6b35", fontWeight: 600 }}>privacy@userecapture.com</a>
            </p>
            <p>
              For security disclosures or vulnerability reports: <a href="mailto:security@userecapture.com" style={{ color: "#ff6b35", fontWeight: 600 }}>security@userecapture.com</a>
            </p>
            <p>
              For BAA execution, enterprise legal review, or vendor security questionnaires: <a href="mailto:legal@userecapture.com" style={{ color: "#ff6b35", fontWeight: 600 }}>legal@userecapture.com</a>
            </p>
            <p style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "8px", fontSize: "0.875rem", color: "#71717a" }}>
              ReCapture is operated by Asherton Chraibi. Postal address available on request for legal correspondence; please email legal@userecapture.com to arrange.
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
