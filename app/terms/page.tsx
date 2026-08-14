import Link from "next/link"
import BlogNav from "@/app/components/BlogNav"
import ScrollReveal from "@/app/components/ScrollReveal"
import Footer from "@/app/components/Footer"
import { Metadata } from "next"
import "../blog/blog.css"
import "../landing.css"

export const metadata: Metadata = {
  title: "Terms of Service — ReCapture",
  description: "The terms governing use of ReCapture's form-abandonment recovery service: subscriptions, trials, acceptable use, data handling, and each party's responsibilities.",
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

const eyebrow = { fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }
const h2 = { fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }
const body = { color: "#a1a1aa", lineHeight: 1.8, fontSize: "0.95rem" }
const sectionStyle = { marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid #1a1a1a" }
const li = { marginBottom: "0.6rem" }

export default function TermsPage() {
  return (
    <div className="trust-page" style={{ background: "#0a0a0a", minHeight: "100vh", color: "#e4e4e7" }}>
      <BlogNav />
      <ScrollReveal />

      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "8rem 2rem 3rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem", color: "#fff" }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "1rem", color: "#a1a1aa", lineHeight: 1.75 }}>
          These terms govern your access to and use of ReCapture. By creating an account, installing the tracking script, or otherwise using the service, you agree to them.
        </p>
        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "1.5rem", fontStyle: "italic" }}>
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}. Material changes will be reflected here.
        </p>
      </section>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 4rem" }}>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>01 — The service</p>
          <h2 style={h2}>What ReCapture is.</h2>
          <div style={body}>
            <p>ReCapture is a form-abandonment recovery tool. It identifies visitors who begin filling out a form on your website but leave without submitting, captures the contact details they entered (name, email, phone), and enables follow-up through the channels you configure — email, SMS, and AI voice callback. Features vary by plan.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>02 — Your responsibilities</p>
          <h2 style={h2}>You control the deployment and the visitor relationship.</h2>
          <div style={body}>
            <p>As a customer, you are responsible for:</p>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.75rem" }}>
              <li style={li}>Disclosing your use of form-abandonment recovery in your own privacy policy. Template language is available at <Link href="/legal/client-privacy-template" style={{ color: "#ff6b35" }}>/legal/client-privacy-template</Link>.</li>
              <li style={li}>Only installing the service on domains you own or are authorized to manage.</li>
              <li style={li}>Ensuring your follow-up communications comply with applicable laws, including marketing, telemarketing, and messaging regulations in your jurisdiction.</li>
              <li style={li}>Honoring opt-out requests from your contacts.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>You agree not to use the service to capture data from forms you are not authorized to monitor, or to contact individuals who have opted out.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>03 — Data &amp; privacy</p>
          <h2 style={h2}>How captured data is handled.</h2>
          <div style={body}>
            <p>Our data handling is described in full on our <Link href="/privacy" style={{ color: "#ff6b35" }}>Privacy &amp; Data</Link> and <Link href="/trust" style={{ color: "#ff6b35" }}>Trust &amp; Compliance</Link> pages. In summary: the service captures only contact fields, excludes passwords and sensitive fields, does not log keystrokes or record sessions, does not track EU/UK/Swiss visitors, and respects recognized consent platforms. We act as a service provider processing data on your behalf, do not sell captured data, and do not use it to train AI models.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>04 — Subscriptions, trials &amp; billing</p>
          <h2 style={h2}>How payment works.</h2>
          <div style={body}>
            <p>The service is offered on a subscription basis, and paid plans require a valid payment method. Where a free trial is offered, it requires a payment method on file; unless you cancel before the trial ends, your subscription begins automatically at the then-current rate.</p>
            <p>Subscriptions renew on a recurring basis until cancelled. Fees are billed in advance and are non-refundable except where required by law.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>05 — Cancellation</p>
          <h2 style={h2}>Cancel anytime.</h2>
          <div style={body}>
            <p>You may cancel your subscription at any time from your account settings. Cancellation stops future billing; it does not retroactively refund the current billing period. On cancellation, the service stops capturing new data for your account.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>06 — Acceptable use</p>
          <h2 style={h2}>Use it lawfully.</h2>
          <div style={body}>
            <p>You agree not to misuse the service, including by attempting to reverse-engineer it, reselling it without authorization, using it to violate the privacy or rights of any individual, or using it for any unlawful purpose. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>07 — Availability &amp; changes</p>
          <h2 style={h2}>We improve the service over time.</h2>
          <div style={body}>
            <p>We work to keep the service available and reliable but do not guarantee uninterrupted operation. We may modify, improve, or discontinue features over time, and will make reasonable efforts to notify you of material changes affecting your use.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>08 — Disclaimers &amp; liability</p>
          <h2 style={h2}>Provided &quot;as is,&quot; with limited liability.</h2>
          <div style={body}>
            <p>The service is provided &quot;as is&quot; without warranties of any kind, express or implied. ReCapture is a tool, not a law firm, and nothing in the service constitutes legal advice regarding your compliance obligations. To the maximum extent permitted by law, ReCapture&apos;s total liability arising from your use of the service is limited to the amount you paid for it in the twelve months preceding the claim.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>09 — Changes to these terms</p>
          <h2 style={h2}>Updates are posted here.</h2>
          <div style={body}>
            <p>We may update these terms from time to time. Material changes will be reflected by an updated date on this page, and continued use of the service after changes take effect constitutes acceptance of the revised terms.</p>
          </div>
        </section>

        <section className="reveal" style={sectionStyle}>
          <p style={eyebrow}>10 — Contact</p>
          <h2 style={h2}>Questions about these terms.</h2>
          <div style={body}>
            <p>Reach us at <a href="mailto:hello@userecapture.com" style={{ color: "#ff6b35" }}>hello@userecapture.com</a> or <a href="tel:+18886060630" style={{ color: "#ff6b35" }}>(888) 606-0630</a>.</p>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
