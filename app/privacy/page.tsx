import Link from "next/link"
import BlogNav from "@/app/components/BlogNav"
import ScrollReveal from "@/app/components/ScrollReveal"
import Footer from "@/app/components/Footer"
import { Metadata } from "next"
import "../blog/blog.css"
import "../landing.css"

export const metadata: Metadata = {
  title: "Privacy & Data Practices — ReCapture",
  description: "Exactly what ReCapture captures and what it never touches: contact fields only, no keystroke logging, no session recording, sensitive fields excluded, EU blocked, consent respected, opt-out honored.",
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

const eyebrow = { fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }
const h2 = { fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }
const body = { color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }
const sectionStyle = { marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }

export default function PrivacyPage() {
  return (
    <div className="trust-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <BlogNav />
      <ScrollReveal />

      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "8rem 2rem 3rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Privacy &amp; Data
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          Exactly what ReCapture reads — and what it refuses to touch.
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75 }}>
          A plain-language account of what is captured, what is never captured, and the controls that enforce it. Everything here reflects how the software actually behaves — not a statement of intent.
        </p>
        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "1.5rem", fontStyle: "italic" }}>
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}. Material changes will be reflected here.
        </p>
      </section>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 4rem" }}>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>01 — What we capture</p>
          <h2 style={h2}>Contact details only. Nothing else.</h2>
          <div style={body}>
            <p>ReCapture captures only the fields it identifies as contact information: name, email address, and phone number — along with non-content metadata like time spent on the form, device type, and page URL.</p>
            <p>A field&apos;s value is read after the visitor finishes entering it. Captured details are transmitted when a form is abandoned — on tab close, page navigation, exit-intent, or a periodic check while the form sits incomplete. If a visitor never enters a valid email or phone, no lead is created and nothing is sent.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>02 — What we never capture</p>
          <h2 style={h2}>No keystroke logs. No session recording. No free-text.</h2>
          <div style={body}>
            <p>ReCapture does not log individual keystrokes and does not record or replay browsing sessions. It reads completed contact fields — it is not watching a live stream of typing.</p>
            <p>Free-text fields are never captured. Anything typed into a message box, a &quot;tell us about your situation&quot; field, or a &quot;describe your legal matter&quot; or symptom field is never stored, never transmitted, and never forwarded to any alert, CRM, or webhook.</p>
            <p>Sensitive fields — passwords, Social Security numbers, credit card numbers, CVV codes and similar — are hard-excluded at the code level and blocked before anything is read, even if a form happens to include them.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>03 — Consent &amp; geography</p>
          <h2 style={h2}>EU blocked. Consent platforms respected. Authorized domains only.</h2>
          <div style={body}>
            <p>Visitors in the EU, UK, and Switzerland are not tracked at all. The tracker detects location and blocks capture for those regions, and fails closed — if location cannot be confirmed, it does not capture.</p>
            <p>On sites running a recognized consent platform (OneTrust, Cookiebot, CookieYes), ReCapture captures only when the visitor has granted consent. And it runs only on domains a customer has explicitly authorized in their account.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>04 — Opt-out &amp; suppression</p>
          <h2 style={h2}>Any recovered contact can opt out — permanently.</h2>
          <div style={body}>
            <p>Once a phone number or email is on the do-not-contact list, all future recovery actions for that person — email, SMS, and AI voice callback — are suppressed automatically before they fire, across every channel.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>05 — If you deploy ReCapture</p>
          <h2 style={h2}>Disclose it, and reflect it in your own policy.</h2>
          <div style={body}>
            <p>We recommend adding a short disclosure near your forms so visitors know their contact details may be saved for follow-up — for example: &quot;We may save the contact information you enter so we can follow up if you don&apos;t complete this form. See our Privacy Policy.&quot;</p>
            <p>We also recommend reflecting form-abandonment recovery in your own privacy policy. Ready-to-paste language is available at <Link href="/legal/client-privacy-template" style={{ color: "#ff6b35" }}>/legal/client-privacy-template</Link>.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>06 — One honest caveat</p>
          <h2 style={h2}>We are a tool, not a law firm.</h2>
          <div style={body}>
            <p>This page is not legal advice. Privacy rules vary by jurisdiction and industry. What we can tell you plainly is how the technology behaves and the controls it gives you — geo-blocking, consent-platform respect, sensitive-field exclusion, contact-fields-only capture, authorized domains, and opt-out. How you deploy and disclose it is a decision we help you make responsibly but do not make for you.</p>
            <p style={{ marginTop: "1.5rem" }}>
              Questions? <Link href="/contact" style={{ color: "#ff6b35" }}>Get in touch</Link>, or see our full <Link href="/trust" style={{ color: "#ff6b35" }}>Trust &amp; Compliance</Link> page.
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
