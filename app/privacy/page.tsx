import Link from "next/link"
import BlogNav from "../components/BlogNav"
import ScrollReveal from "../components/ScrollReveal"
import Footer from "../components/Footer"
import "../blog/blog.css"
import "../landing.css"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Privacy & Data Practices — ReCapture",
  description: "Exactly what ReCapture captures and what it never touches. No keystroke logging, no session recording, contact fields only, sensitive fields excluded, EU blocked, consent respected, opt-out honored.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Data Practices — ReCapture",
    description: "What ReCapture captures, what it never captures, and the controls that back it up.",
    url: "https://www.userecapture.com/privacy",
    siteName: "ReCapture",
    type: "website",
    images: [{
      url: "https://www.userecapture.com/api/og?title=Privacy%20%26%20Data&eyebrow=Trust",
      width: 1200,
      height: 630,
      alt: "ReCapture",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Data Practices — ReCapture",
    description: "What ReCapture captures, what it never captures, and the controls that back it up.",
    images: ["https://www.userecapture.com/api/og?title=Privacy%20%26%20Data&eyebrow=Trust"],
  },
}

const sections = [
  {
    id: "principle",
    heading: "The short version",
    body: `ReCapture recovers the contact details a visitor voluntarily enters into a form but doesn't submit, so a business can follow up on a genuine inquiry. That's the entire purpose. It reads contact fields only — name, email, phone — and nothing else. It does not log keystrokes, it does not record or replay browsing sessions, and it does not store anything typed into free-text fields. Everything below is how that's enforced in the actual code, not a statement of intent.`,
  },
  {
    id: "what-we-capture",
    heading: "What ReCapture captures",
    body: `Only fields identified as contact information: name, email address, and phone number. A field's value is read after the visitor finishes entering it — the script is not watching a live stream of individual keystrokes. Capture happens when a form is started and then abandoned (the visitor leaves, switches tabs, or navigates away). If a visitor never enters a valid email or phone, no lead is created and nothing is sent.`,
  },
  {
    id: "what-we-never-capture",
    heading: "What ReCapture never captures",
    body: `Keystroke logs and session recordings — ReCapture does neither. Free-text fields — anything typed into a message box, a "tell us about your situation" field, a "describe your legal matter" or symptom field is never stored, never transmitted, and never forwarded to any alert, CRM, or webhook. Sensitive fields — passwords, Social Security numbers, credit card numbers, CVV codes and similar fields are hard-excluded at the code level and blocked before anything is read, even if a form happens to include them.`,
  },
  {
    id: "consent-geography",
    heading: "Consent and geography",
    body: `Visitors in the EU, UK, and Switzerland are not tracked at all. The script detects location and blocks capture for those regions, and fails closed — if location can't be confirmed, it does not capture. If a client's website runs a recognized consent platform (OneTrust, Cookiebot, or CookieYes) and the visitor has declined marketing or statistics tracking, ReCapture does not capture. ReCapture only runs on domains a client has explicitly authorized in their account.`,
  },
  {
    id: "opt-out",
    heading: "Opt-out and suppression",
    body: `Any contact recovered through ReCapture can opt out of further contact. Once a phone number or email is on the do-not-contact list, all future recovery actions for that person — email, SMS, and AI voice callback — are suppressed automatically before they fire.`,
  },
  {
    id: "for-clients",
    heading: "If you deploy ReCapture on your site",
    body: `We recommend two things. First, add a short disclosure near your forms so visitors know their contact details may be saved for follow-up — suggested language: "We may save the contact information you enter so we can follow up if you don't complete this form. See our Privacy Policy." Second, reflect form-abandonment recovery in your own privacy policy. We provide ready-to-paste language for that at /legal/client-privacy-template.`,
  },
  {
    id: "not-legal-advice",
    heading: "One honest caveat",
    body: `ReCapture is a tool, not a law firm, and this page isn't legal advice. Privacy rules vary by jurisdiction and by industry. What we can tell you plainly is how the technology behaves and the controls it gives you — geo-blocking, consent-platform respect, sensitive-field exclusion, contact-fields-only capture, authorized domains, and opt-out. How you deploy it, and how you disclose it to your visitors, is a decision we help you make responsibly but don't make for you.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <BlogNav />
      <ScrollReveal />
      <main className="legal-main" style={{ maxWidth: 820, margin: "0 auto", padding: "120px 24px 80px" }}>
        <div className="reveal">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 13, color: "#ff6b35", marginBottom: 12 }}>
            Trust
          </p>
          <h1 style={{ fontSize: 44, lineHeight: 1.1, marginBottom: 20 }}>Privacy &amp; Data Practices</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.8, marginBottom: 8 }}>
            A plain-language account of exactly what ReCapture reads, what it refuses to touch, and the controls that enforce it.
          </p>
          <p style={{ fontSize: 14, opacity: 0.55, marginBottom: 48 }}>
            Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="reveal" style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: 26, marginBottom: 14 }}>{s.heading}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.85, whiteSpace: "pre-line" }}>{s.body}</p>
          </section>
        ))}

        <div className="reveal" style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: 16, opacity: 0.8 }}>
            Questions about how ReCapture handles data?{" "}
            <Link href="/contact" style={{ color: "#ff6b35" }}>Get in touch</Link>{" "}
            or review the{" "}
            <Link href="/legal/client-privacy-template" style={{ color: "#ff6b35" }}>client privacy template</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
