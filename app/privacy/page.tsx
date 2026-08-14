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
    images: [{ url: "https://www.userecapture.com/api/og?title=Privacy%20%26%20Data&eyebrow=Trust", width: 1200, height: 630, alt: "ReCapture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Data Practices — ReCapture",
    description: "What ReCapture captures, what it never captures, and the controls that back it up.",
    images: ["https://www.userecapture.com/api/og?title=Privacy%20%26%20Data&eyebrow=Trust"],
  },
}

const sections = [
  { id: "principle", heading: "The short version", body: `ReCapture recovers the contact details a visitor voluntarily enters into a form but doesn't submit, so a business can follow up on a genuine inquiry. That's the entire purpose. It reads contact fields only — name, email, phone — and nothing else. It does not log keystrokes, it does not record or replay browsing sessions, and it does not store anything typed into free-text fields. Everything below is how that's enforced in the actual code, not a statement of intent.` },
  { id: "what-we-capture", heading: "What ReCapture captures", body: `Only fields identified as contact information: name, email address, and phone number. A field's value is read after the visitor finishes entering it — the script is not watching a live stream of individual keystrokes. Capture happens when a form is started and then abandoned (the visitor leaves, switches tabs, or navigates away). If a visitor never enters a valid email or phone, no lead is created and nothing is sent.` },
  { id: "what-we-never-capture", heading: "What ReCapture never captures", body: `Keystroke logs and session recordings — ReCapture does neither. Free-text fields — anything typed into a message box, a "tell us about your situation" field, a "describe your legal matter" or symptom field is never stored, never transmitted, and never forwarded to any alert, CRM, or webhook. Sensitive fields — passwords, Social Security numbers, credit card numbers, CVV codes and similar are hard-excluded at the code level and blocked before anything is read, even if a form happens to include them.` },
  { id: "consent-geography", heading: "Consent and geography", body: `Visitors in the EU, UK, and Switzerland are not tracked at all. The script detects location and blocks capture for those regions, and fails closed — if location can't be confirmed, it does not capture. If a client's website runs a recognized consent platform (OneTrust, Cookiebot, or CookieYes) and the visitor has declined marketing or statistics tracking, ReCapture does not capture. ReCapture only runs on domains a client has explicitly authorized in their account.` },
  { id: "opt-out", heading: "Opt-out and suppression", body: `Any contact recovered through ReCapture can opt out of further contact. Once a phone number or email is on the do-not-contact list, all future recovery actions for that person — email, SMS, and AI voice callback — are suppressed automatically before they fire.` },
  { id: "for-clients", heading: "If you deploy ReCapture on your site", body: `We recommend two things. First, add a short disclosure near your forms so visitors know their contact details may be saved for follow-up — suggested language: "We may save the contact information you enter so we can follow up if you don't complete this form. See our Privacy Policy." Second, reflect form-abandonment recovery in your own privacy policy. We provide ready-to-paste language for that at /legal/client-privacy-template.` },
  { id: "not-legal-advice", heading: "One honest caveat", body: `ReCapture is a tool, not a law firm, and this page isn't legal advice. Privacy rules vary by jurisdiction and by industry. What we can tell you plainly is how the technology behaves and the controls it gives you — geo-blocking, consent-platform respect, sensitive-field exclusion, contact-fields-only capture, authorized domains, and opt-out. How you deploy it, and how you disclose it to your visitors, is a decision we help you make responsibly but don't make for you.` },
]

export default function PrivacyPage() {
  return (
    <div className="legal-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <BlogNav />
      <ScrollReveal />

      <div className="blog-post-header">
        <Link href="/trust" className="blog-post-back">← Back to Trust &amp; Compliance</Link>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Privacy &amp; Data
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          Exactly what ReCapture reads — and what it refuses to touch.
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75, marginBottom: "0.5rem" }}>
          A plain-language account of what's captured, what's never captured, and the controls that enforce it.
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

        <div className="reveal" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75 }}>
            Questions about how ReCapture handles data?{" "}
            <Link href="/contact" style={{ color: "#ff6b35" }}>Get in touch</Link>{" "}
            or review the{" "}
            <Link href="/legal/client-privacy-template" style={{ color: "#ff6b35" }}>client privacy template</Link>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
