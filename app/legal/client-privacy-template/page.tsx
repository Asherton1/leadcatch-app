import Link from "next/link"
import BlogNav from "../../components/BlogNav"
import ScrollReveal from "../../components/ScrollReveal"
import Footer from "../../components/Footer"
import CopySection from "./CopySection"
import "../../blog/blog.css"
import "../../landing.css"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Client Privacy Policy Template — ReCapture",
  description: "Copy-paste privacy policy language for businesses deploying ReCapture. Add this to your existing privacy policy to disclose form abandonment recovery technology.",
}

const sections = [
  {
    id: "intro",
    heading: "Form Abandonment Recovery Technology",
    body: `We use form abandonment recovery technology provided by ReCapture (userecapture.com) to identify visitors who begin filling out forms on our website but do not complete submission. This technology helps us follow up with potential customers who showed interest but were interrupted before completing their inquiry.`,
  },
  {
    id: "capture",
    heading: "What We Capture",
    body: `When you begin typing into a form on our website, the following information may be captured before you submit the form: name, email address, phone number, free-text fields you have filled in, time spent on the form, device type, and the page URL.

We do not capture passwords, payment card data, social security numbers, credit card security codes, or any other sensitive fields. Visitors who never start typing into a form are not captured.`,
  },
  {
    id: "channels",
    heading: "Communication Channels",
    body: `If you begin filling out a form on our website but do not complete submission, we may follow up with you using the contact information you provided through one or more of the following channels:

- Email recovery messages reminding you of your inquiry
- Text message (SMS) alerts to our team or follow-up messages to you
- Automated voice calls using AI voice technology, where you have provided consent for automated communications

You may opt out of these communications at any time by replying "STOP" to any text message, clicking the unsubscribe link in any email, or telling our representative to stop contacting you on any phone call.`,
  },
  {
    id: "rights",
    heading: "Your Rights",
    body: `You have the right to:

- Request access to the personal information we have collected about you
- Request deletion of your personal information
- Opt out of any future communications from us
- Request that we correct any inaccurate information we have collected

If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what categories of personal information we have collected, the right to know whether we sell your personal information (we do not), and the right to non-discrimination for exercising these rights.

To exercise any of these rights, please contact us using the information at the bottom of this section.`,
  },
  {
    id: "sharing",
    heading: "Data Sharing and Service Providers",
    body: `We use ReCapture as a service provider to process the data described in this section. ReCapture acts on our behalf and is contractually restricted from using your information for any purpose other than providing the form recovery service to us.

ReCapture does not use visitor data to train AI models or for any purpose other than fulfilling the recovery workflows we have configured. ReCapture\'s subprocessors may include cloud hosting, email delivery, SMS, voice infrastructure, and database providers — all of which are bound by data processing agreements requiring confidentiality and limited-purpose use.

We do not sell your personal information to any third party.`,
  },
  {
    id: "retention",
    heading: "Data Retention",
    body: `Information captured through form abandonment recovery is retained while we maintain an active business relationship with you or while it is needed for the purposes described above. If you opt out of communications, your contact information will be retained on a do-not-contact list to ensure we honor your opt-out request indefinitely.

You may request earlier deletion of your information at any time using the contact information below.`,
  },
  {
    id: "contact",
    heading: "Contact for Privacy Questions",
    body: `If you have questions about this privacy policy, want to exercise any of the rights described above, or want to opt out of any future communications, please contact us:

[YOUR BUSINESS NAME]
[YOUR PHYSICAL POSTAL ADDRESS]
Email: [YOUR PRIVACY CONTACT EMAIL]
Phone: [YOUR CONTACT PHONE NUMBER]

We will respond to your request within a reasonable time, typically within 30 days.`,
  },
]

export default function ClientPrivacyTemplate() {
  const fullTemplate = sections.map(s => s.heading + "\n\n" + s.body).join("\n\n---\n\n")

  return (
    <div className="legal-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <BlogNav />
      <ScrollReveal />

      <div className="blog-post-header">
        <Link href="/trust" className="blog-post-back">← Back to Trust & Compliance</Link>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Privacy Policy Template
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          Copy-paste privacy policy language for your website.
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75, marginBottom: "1.5rem" }}>
          If you deploy ReCapture on your website, your privacy policy should describe the form abandonment recovery technology you are using. Copy the sections below into your existing privacy policy. Replace bracketed placeholders with your business information.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#a1a1aa", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          This template is provided as a starting point. We recommend reviewing the final language with your own legal counsel before publishing. ReCapture does not provide legal advice.
        </p>
        <p style={{ fontSize: "0.85rem", color: "#666", fontStyle: "italic" }}>
          Last updated: May 2026
        </p>
      </div>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 2rem" }}>
        <CopySection
          variant="full"
          label="Copy entire template"
          text={fullTemplate}
        />
      </div>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        {sections.map((section, idx) => (
          <section key={section.id} className="reveal" style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {String(idx + 1).padStart(2, "0")} — Section
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
              {section.heading}
            </h2>
            <div style={{ color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-wrap", marginBottom: "1.25rem" }}>
              {section.body}
            </div>
            <CopySection
              variant="section"
              label="Copy this section"
              text={section.heading + "\n\n" + section.body}
            />
          </section>
        ))}

        <div style={{ marginTop: "4rem", padding: "1.5rem", background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "8px", color: "#a1a1aa", fontSize: "0.875rem", lineHeight: 1.65 }}>
          <p style={{ margin: 0, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#fff" }}>Need more compliance information?</strong>
          </p>
          <p style={{ margin: 0 }}>
            Visit our <Link href="/trust" style={{ color: "#ff6b35", fontWeight: 600 }}>Trust & Compliance</Link> page for the full breakdown of how ReCapture handles data, security, TCPA, retention, and subprocessors.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
