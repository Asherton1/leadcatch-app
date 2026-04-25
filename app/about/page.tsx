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
          <p className="about-hero-v2-eyebrow">§ About</p>
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
          <p className="about-founder-v2-eyebrow">§ Founder</p>
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

      {/* STORY SECTIONS — kept as-is for Commit 1, will rewrite in Commit 2 */}
      <div className="about-story">
        <div className="about-story-section reveal">
          <h2>The Problem We Kept Seeing</h2>
          <p>We&apos;ve managed over $100K in monthly ad spend across 38+ clients. Med spas, dental practices, luxury real estate, high-end service businesses &mdash; the kind of companies where a single lead is worth $1,500 to $10,000.</p>
          <p>The playbook was always the same: build the funnel, run the ads, optimize the landing page, watch the leads come in. And the leads did come in. But something always nagged at us.</p>
          <p>Google Analytics showed the traffic. The CRM showed the submissions. But neither one showed us the people in between &mdash; the ones who clicked the form, started typing their name, got distracted, and disappeared. Those people were invisible. And there were a LOT of them.</p>
        </div>

        <div className="about-story-section reveal">
          <h2>The Moment It Clicked</h2>
          <p>We were reviewing a client&apos;s campaign performance and the numbers didn&apos;t add up. We were driving solid traffic. The landing page was converting. But the gap between page views and form submissions was massive &mdash; way bigger than it should have been.</p>
          <p>That&apos;s when we realized: every analytics platform on the market tracks what happens before the form and what happens after. Nobody tracks what happens during. The form itself was a complete blind spot.</p>
          <p>We went looking for a tool that could capture partial form data &mdash; names, emails, phone numbers typed but never submitted. The options were either built for e-commerce cart abandonment, required you to replace your forms entirely, or had dashboards that looked like they were built in 2014.</p>
          <p>None of them were built for the businesses we work with. So we built one.</p>
        </div>

        <div className="about-story-section reveal">
          <h2>What ReCapture Is</h2>
          <p>ReCapture is a form abandonment recovery platform built specifically for high-ticket service businesses. One script tag on your website. No form migration. No complex setup. The moment someone starts typing into your contact form, we capture it &mdash; even if they never hit submit.</p>
          <p>You see every lead in a clean dashboard with their name, email, phone number, and the estimated dollar value they represent. Follow up manually, or let ReCapture send automated recovery emails on your behalf.</p>
          <p>It&apos;s the tool we wished existed for the last ten years. Now it does.</p>
        </div>
      </div>

      {/* VALUES + CTA — kept for Commit 1, will rebuild in Commit 3 */}
      <div className="about-values reveal">
        <h2>What We Believe</h2>
        <div className="about-values-grid">
          <div className="about-value">
            <h3>Every lead matters</h3>
            <p>You paid for that click. If someone starts your form, you deserve to know about it &mdash; whether they finish or not.</p>
          </div>
          <div className="about-value">
            <h3>Simple beats complicated</h3>
            <p>One script tag. No migration. No developer needed. If it takes more than 60 seconds to install, it&apos;s too complicated.</p>
          </div>
          <div className="about-value">
            <h3>Built for real businesses</h3>
            <p>Not for startups chasing vanity metrics. For businesses where a single recovered lead pays for the entire year of service.</p>
          </div>
        </div>
      </div>

      <div className="about-cta reveal">
        <h2>See what your forms are missing</h2>
        <p>Try the live demo and watch ReCapture capture a lead in real time.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/test-form" className="about-cta-btn">Try the Live Demo</Link>
          <Link href="/signup" className="about-cta-btn-outline">Start Your 7-Day Free Trial</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
