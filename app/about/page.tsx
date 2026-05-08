import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Image from 'next/image'
import '../blog/blog.css'
import '../landing.css'
import Footer from '../components/Footer'
import './about.css'

export const metadata = {
  title: 'About ReCapture — Born & Built in Dallas, Texas',
  description: 'The story behind ReCapture. Built by a digital marketing veteran who spent a decade managing ad campaigns and saw firsthand how many leads were slipping through the cracks.',
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <BlogNav />
      <ScrollReveal />

      {/* HERO — editorial treatment matching pricing/ledger */}
      <section className="about-hero-v2">
        <div className="about-hero-v2-inner">
          <p className="about-hero-v2-eyebrow">About</p>
          <h1 className="about-hero-v2-headline">
            <span className="about-hero-v2-headline-primary">The leads were always there.</span>{' '}
            <span className="about-hero-v2-headline-muted">Nobody was watching.</span>
          </h1>
          <p className="about-hero-v2-sub">I spent over a decade running ad campaigns for high-ticket businesses and got tired of watching good money disappear into a black hole between the first keystroke and the submit button.</p>
        </div>
      </section>

      {/* FOUNDER — moved up to position 2, redesigned */}
      <section className="about-founder-v2 reveal">
        <div className="about-founder-v2-inner">
          <p className="about-founder-v2-eyebrow">Founder</p>
          <div className="about-founder-v2-grid">
            <div className="about-founder-v2-image">
              <Image src="/founder.png" alt="Asherton Chraibi — Founder of ReCapture" width={400} height={400} style={{ objectFit: 'cover', filter: 'grayscale(100%)', borderRadius: '4px', width: '100%', height: 'auto' }} />
            </div>
            <div className="about-founder-v2-info">
              <h2 className="about-founder-v2-name">Asherton Chraibi</h2>
              <div className="about-founder-v2-location">
                <span className="about-founder-v2-dot"></span>
                Dallas, Texas
              </div>
              <p className="about-founder-v2-bio">I started in art and design with a minor in marketing and business — and spent the next decade running digital campaigns for high-ticket businesses. Med spas. Dental practices. Luxury real estate. Property management. I&apos;ve managed over $100K in monthly ad spend across 38+ long-term client relationships. Not an agency. Not a freelancer. A partner who stays.</p>
              <p className="about-founder-v2-bio">I&apos;m equal parts creative and analytical &mdash; the kind of person who sees a 68% form abandonment rate and can&apos;t sleep until I understand why. Then builds the system to fix it. I&apos;m obsessed with the intersection of technology, behavioral psychology, and design that actually converts.</p>
              <p className="about-founder-v2-bio">Dallas became home &mdash; not because it was planned, but because the city matched the energy. Most mornings start on the Katy Trail. Every other weekend I&apos;ll try a restaurant I haven&apos;t been to yet or get lost in a conversation that goes longer than it should. The rest of the time, I&apos;m building. That same restless curiosity is what built ReCapture &mdash; a decade of watching leads slip through the cracks and finally deciding to do something about it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY V2 — first-person, numbered eyebrows, hairline dividers */}
      <section className="about-story-v2">
        <div className="about-story-v2-inner">

          <div className="about-story-v2-section reveal">
            <p className="about-story-v2-eyebrow">01 — The problem</p>
            <h2 className="about-story-v2-headline">The thing that kept nagging me.</h2>
            <div className="about-story-v2-body">
              <p>I&apos;ve managed over $100K in monthly ad spend across 38+ clients. Med spas, dental practices, luxury real estate, high-end service businesses &mdash; the kind of companies where a single lead is worth $1,500 to $10,000.</p>
              <p>The playbook was always the same: build the funnel, run the ads, optimize the landing page, watch the leads come in. And the leads did come in. But something always nagged at me.</p>
              <p>Google Analytics showed the traffic. The CRM showed the submissions. But neither one showed me the people in between &mdash; the ones who clicked the form, started typing their name, got distracted, and disappeared. Those people were invisible. And there were a LOT of them.</p>
            </div>
          </div>

          <div className="about-story-v2-divider" />

          <div className="about-story-v2-section reveal">
            <p className="about-story-v2-eyebrow">02 — The turning point</p>
            <div className="about-story-v2-body">
              <p>I was reviewing a client&apos;s campaign performance and the numbers didn&apos;t add up. We were driving solid traffic. The landing page was converting. But the gap between page views and form submissions was massive &mdash; way bigger than it should have been.</p>
              <p>That&apos;s when I realized: every analytics platform on the market tracks what happens <em>before</em> the form and what happens <em>after</em>. Nobody tracks what happens <em>during</em>. The form itself was a complete blind spot.</p>
              <p>I went looking for a tool that could capture partial form data &mdash; names, emails, phone numbers typed but never submitted. The options were either built for e-commerce cart abandonment, required you to replace your forms entirely, or had dashboards that looked like they were built in 2014.</p>
              <p>None of them were built for the businesses I work with. So I built one.</p>
            </div>
          </div>

          <div className="about-story-v2-divider" />

          <div className="about-story-v2-section reveal">
            <p className="about-story-v2-eyebrow">03 — Why ReCapture</p>
            <div className="about-story-v2-body">
              <p>ReCapture is the recovery layer for high-ticket service businesses. We started with form abandonment because it&apos;s the most tangible problem to solve &mdash; one script tag, capture every visitor who starts typing into your contact form, even if they never hit submit. No form migration. No complex setup.</p>
              <p>You see every lead in a clean dashboard with their name, email, phone number, and the estimated dollar value they represent. Follow up manually, or let ReCapture send automated recovery emails on your behalf.</p>
              <p>But form abandonment is just the entry point. The underlying capability &mdash; capturing intent before it&apos;s lost and acting on it within 60 seconds &mdash; applies across the entire service business stack. Phone abandonment. Booking funnel drop-off. Quote requests. Live chat exits. Every recovery surface high-ticket businesses are losing right now.</p>
              <p>It&apos;s the platform I wished existed for the last ten years. Now it does.</p>
            </div>
          </div>

          <div className="about-story-v2-divider" />

          <div className="about-story-v2-section reveal">
            <p className="about-story-v2-eyebrow">04 — Why we built it different</p>
            <h2 className="about-story-v2-headline">Compliance was the foundation, not the afterthought.</h2>
            <div className="about-story-v2-body">
              <p>Most form abandonment tools were built between 2018 and 2023, before TCPA tightened in April 2025, before state privacy laws started enforcing meaningfully, before HIPAA enforcement actions started reaching marketing technology vendors. Most of them bolted compliance on after the fact, if at all.</p>
              <p>I took the opposite approach. ReCapture has a master do-not-contact list that enforces opt-outs across SMS, email, and voice automatically. Our tracker geo-blocks 32 countries (EU, UK, Switzerland, EEA) at the IP level &mdash; we don&apos;t capture data we shouldn&apos;t have. Our AI voice agent identifies herself as automated within the first 15 seconds of every call. Every recovery email includes a CAN-SPAM-compliant footer with a one-click unsubscribe link signed against forgery. Pro plan and above include a Business Associate Agreement for healthcare customers.</p>
              <p>I built it that way because I&apos;ve sat across the table from enterprise legal teams. They have the same five questions every time. The vendors who can&apos;t answer those questions credibly don&apos;t close the deal. I wanted to be the vendor who could.</p>
              <p>Everything is published openly at our <Link href="/trust" style={{ color: '#ff6b35', textDecoration: 'none', fontWeight: 600 }}>trust page</Link> &mdash; what we capture, what we don&apos;t, our subprocessor list, our security posture, our retention policies. No NDAs. No sales calls required. Read it yourself.</p>
            </div>
          </div>

        </div>
      </section>

      {/* WHO I WORK WITH — editorial client list */}
      <section className="about-clients reveal">
        <div className="about-clients-inner">
          <p className="about-clients-eyebrow">The work</p>
          <h2 className="about-clients-headline">I&apos;ve built campaigns and lead systems for:</h2>

          <div className="about-clients-list">
            <div className="about-clients-row">
              <span className="about-clients-name">ESD Health</span>
              <span className="about-clients-desc">Pilot sleep diagnostics</span>
            </div>
            <div className="about-clients-row">
              <span className="about-clients-name">HerScan</span>
              <span className="about-clients-desc">Mobile breast ultrasound screening</span>
            </div>
            <div className="about-clients-row">
              <span className="about-clients-name">DECA Dental</span>
              <span className="about-clients-desc">Multi-location dental</span>
            </div>
            <div className="about-clients-row">
              <span className="about-clients-name">Ideal Dental</span>
              <span className="about-clients-desc">Multi-location dental</span>
            </div>
          </div>

          <p className="about-clients-closer">
            $10M+ in managed ad spend. <span className="about-clients-closer-accent">38+ long-term client relationships.</span>
            <br />
            One ReCapture, born out of all of it.
          </p>
        </div>
      </section>

      {/* VALUES — rebuilt to match pricing baseline language */}
      <section className="about-values-v2 reveal">
        <div className="about-values-v2-inner">
          <p className="about-values-v2-eyebrow">The principles</p>
          <h2 className="about-values-v2-headline">What I believe.</h2>
          <div className="about-values-v2-grid">
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Every lead matters</div>
              <div className="about-values-v2-desc">You paid for that click. If someone starts your form, you deserve to know about it &mdash; whether they finish or not.</div>
            </div>
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Simple beats complicated</div>
              <div className="about-values-v2-desc">One script tag. No migration. No developer needed. If it takes more than 60 seconds to install, it&apos;s too complicated.</div>
            </div>
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Built for real businesses</div>
              <div className="about-values-v2-desc">Not for startups chasing vanity metrics. For businesses where a single recovered lead pays for the entire year of service.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — editorial, text + arrow */}
      <section className="about-final-cta reveal">
        <div className="about-final-cta-inner">
          <h2 className="about-final-cta-headline">See it work on your forms.</h2>
          <p className="about-final-cta-sub">7-day free trial. About 5 minutes to set up. Card required, not charged until day 8.</p>
          <Link href="/signup" className="about-final-cta-link">
            Begin your trial <span className="about-final-cta-arrow">&rarr;</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
