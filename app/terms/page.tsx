import Link from "next/link"
import BlogNav from "../components/BlogNav"
import ScrollReveal from "../components/ScrollReveal"
import Footer from "../components/Footer"
import "../blog/blog.css"
import "../landing.css"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Terms of Service — ReCapture",
  description: "The terms governing use of ReCapture's form-abandonment recovery service, including subscriptions, trials, acceptable use, and each party's responsibilities.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — ReCapture",
    description: "The terms governing use of ReCapture's form-abandonment recovery service.",
    url: "https://www.userecapture.com/terms",
    siteName: "ReCapture",
    type: "website",
    images: [{ url: "https://www.userecapture.com/api/og?title=Terms%20of%20Service&eyebrow=Legal", width: 1200, height: 630, alt: "ReCapture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — ReCapture",
    description: "The terms governing use of ReCapture's form-abandonment recovery service.",
    images: ["https://www.userecapture.com/api/og?title=Terms%20of%20Service&eyebrow=Legal"],
  },
}

const sections = [
  { id: "acceptance", heading: "1. Acceptance of Terms", body: `By creating an account, installing the ReCapture tracking script, or otherwise using the ReCapture service ("the Service"), you agree to these Terms of Service. If you are agreeing on behalf of a business, you represent that you have authority to bind that business.` },
  { id: "service", heading: "2. The Service", body: `ReCapture is a form-abandonment recovery tool. It identifies visitors who begin filling out a form on your website but leave without submitting, captures the contact details they entered (name, email, phone), and enables follow-up through channels you configure, such as email, SMS, and AI voice callback. Features vary by plan.` },
  { id: "your-responsibilities", heading: "3. Your Responsibilities", body: `You are responsible for how you deploy the Service on your website and how you communicate with the contacts it recovers. This includes:

- Disclosing your use of form-abandonment recovery in your own privacy policy. We provide template language at /legal/client-privacy-template.
- Only installing the Service on domains you own or are authorized to manage.
- Ensuring your follow-up communications comply with applicable laws, including marketing, telemarketing, and messaging regulations in your jurisdiction.
- Honoring opt-out requests from your contacts.

You agree not to use the Service to capture data from forms you are not authorized to monitor, or to contact individuals who have opted out.` },
  { id: "data", heading: "4. Data and Privacy", body: `Our handling of captured data is described in our Privacy & Data Practices page. In summary, the Service captures only contact fields, excludes passwords and sensitive fields, does not log keystrokes or record sessions, does not track EU/UK/Swiss visitors, and respects recognized consent platforms. We act as a service provider processing data on your behalf and do not sell captured data or use it to train AI models.` },
  { id: "subscription", heading: "5. Subscriptions, Trials, and Billing", body: `The Service is offered on a subscription basis. Paid plans require a valid payment method. Where a free trial is offered, it requires a payment method on file, and unless you cancel before the trial ends, your subscription begins automatically at the then-current rate. Subscriptions renew on a recurring basis until cancelled. Fees are billed in advance and are non-refundable except where required by law.` },
  { id: "cancellation", heading: "6. Cancellation", body: `You may cancel your subscription at any time from your account settings. Cancellation stops future billing; it does not retroactively refund the current billing period. On cancellation, the Service stops capturing new data for your account.` },
  { id: "acceptable-use", heading: "7. Acceptable Use", body: `You agree not to misuse the Service, including by attempting to reverse-engineer it, reselling it without authorization, using it to violate the privacy or rights of any individual, or using it for any unlawful purpose. We reserve the right to suspend or terminate accounts that violate these terms.` },
  { id: "availability", heading: "8. Availability and Changes", body: `We work to keep the Service available and reliable but do not guarantee uninterrupted operation. We may modify, improve, or discontinue features over time. We will make reasonable efforts to notify you of material changes that affect your use of the Service.` },
  { id: "warranties", heading: "9. Disclaimers and Limitation of Liability", body: `The Service is provided "as is" without warranties of any kind, express or implied. ReCapture is a tool, not a law firm, and nothing in the Service constitutes legal advice regarding your compliance obligations. To the maximum extent permitted by law, ReCapture's total liability arising from your use of the Service is limited to the amount you paid for the Service in the twelve months preceding the claim.` },
  { id: "changes", heading: "10. Changes to These Terms", body: `We may update these Terms from time to time. Material changes will be reflected by an updated date on this page, and continued use of the Service after changes take effect constitutes acceptance of the revised Terms.` },
  { id: "contact", heading: "11. Contact", body: `Questions about these Terms can be directed to hello@userecapture.com or (888) 606-0630.` },
]

export default function TermsPage() {
  return (
    <div className="legal-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <BlogNav />
      <ScrollReveal />

      <div className="blog-post-header">
        <Link href="/trust" className="blog-post-back">← Back to Trust &amp; Compliance</Link>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75, marginBottom: "0.5rem" }}>
          The terms governing your use of ReCapture.
        </p>
        <p style={{ fontSize: "0.875rem", color: "#71717a", marginBottom: "1.5rem" }}>
          Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="blog-post-body" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="reveal" style={{ marginBottom: "2.75rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>{s.heading}</h2>
            <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75, whiteSpace: "pre-line" }}>{s.body}</p>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  )
}
