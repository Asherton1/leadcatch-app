import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Image from 'next/image'
import '../blog/blog.css'
import './about.css'

export const metadata = {
  title: 'About ReCapture — Born & Built in Dallas, Texas',
  description: 'The story behind ReCapture. Built by a digital marketing veteran who spent a decade managing ad campaigns and saw firsthand how many leads were slipping through the cracks.',
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <BlogNav />

      <div className="about-hero">
        <div className="about-hero-content">
          <h1>The leads were always there.<br /><span className="about-highlight">Nobody was watching.</span></h1>
          <p className="about-hero-sub">We spent over a decade running ad campaigns for high-ticket businesses and got tired of watching good money disappear into a black hole between the first keystroke and the submit button.</p>
        </div>
      </div>

      <div className="about-story">
        <div className="about-story-section">
          <h2>The Problem We Kept Seeing</h2>
          <p>We’ve managed over $100K in monthly ad spend across 38+ clients. Med spas, dental practices, luxury real estate, high-end service businesses — the kind of companies where a single lead is worth $1,500 to $10,000.</p>
          <p>The playbook was always the same: build the funnel, run the ads, optimize the landing page, watch the leads come in. And the leads did come in. But something always nagged at us.</p>
          <p>Google Analytics showed the traffic. The CRM showed the submissions. But neither one showed us the people in between — the ones who clicked the form, started typing their name, got distracted, and disappeared. Those people were invisible. And there were a LOT of them.</p>
        </div>

        <div className="about-story-section">
          <h2>The Moment It Clicked</h2>
          <p>We were reviewing a client’s campaign performance and the numbers didn’t add up. We were driving solid traffic. The landing page was converting. But the gap between page views and form submissions was massive — way bigger than it should have been.</p>
          <p>That’s when we realized: every analytics platform on the market tracks what happens before the form and what happens after. Nobody tracks what happens during. The form itself was a complete blind spot.</p>
          <p>We went looking for a tool that could capture partial form data — names, emails, phone numbers typed but never submitted. The options were either built for e-commerce cart abandonment, required you to replace your forms entirely, or had dashboards that looked like they were built in 2014.</p>
          <p>None of them were built for the businesses we work with. So we built one.</p>
        </div>

        <div className="about-story-section">
          <h2>What ReCapture Is</h2>
          <p>ReCapture is a form abandonment recovery platform built specifically for high-ticket service businesses. One script tag on your website. No form migration. No complex setup. The moment someone starts typing into your contact form, we capture it — even if they never hit submit.</p>
          <p>You see every lead in a clean dashboard with their name, email, phone number, and the estimated dollar value they represent. Follow up manually, or let ReCapture send automated recovery emails on your behalf.</p>
          <p>It’s the tool we wished existed for the last ten years. Now it does.</p>
        </div>
      </div>

      <div className="about-founder">
        <div className="about-founder-inner">
        <div className="about-founder-image">
          <Image src="/founder.png" alt="Asherton C. — Founder of ReCapture" width={400} height={400} style={{ objectFit: 'cover', filter: 'grayscale(100%)', borderRadius: '10px', width: '100%', height: 'auto' }} />
        </div>
        <div className="about-founder-info">
          <p className="about-founder-label">Founder</p>
          <h2>Asherton C.</h2>
          <p className="about-founder-bio">Holds a Bachelor&apos;s degree in Art & Design with a minor in Marketing and Business. Over 10 years deep in digital marketing and advertising, managing $100K+ in monthly ad spend across 38+ long-term clients spanning med spas, dental practices, luxury real estate, and high-end service businesses.</p>
          <p className="about-founder-bio">Equal parts creative and analytical — the kind of person who reverse-engineers why people do what they do online and builds systems around it. Fascinated by the intersection of technology, behavioral science, and design. Outside of work, you&apos;ll find him somewhere in Dallas he hasn&apos;t been yet — a new restaurant, a good conversation, or just enjoying what this city continues to surprise him with.</p>
          <p className="about-founder-bio">That same obsession with performance and precision is what led to ReCapture — born and built in Dallas, TX, from a decade of watching the same problem play out across every client, and finally deciding to build the solution.</p>
          <div className="about-founder-location">
            <span className="about-founder-dot"></span>
            Dallas, Texas
          </div>
        </div>
        </div>
      </div>

      <div className="about-values">
        <h2>What We Believe</h2>
        <div className="about-values-grid">
          <div className="about-value">
            <h3>Every lead matters</h3>
            <p>You paid for that click. If someone starts your form, you deserve to know about it — whether they finish or not.</p>
          </div>
          <div className="about-value">
            <h3>Simple beats complicated</h3>
            <p>One script tag. No migration. No developer needed. If it takes more than 60 seconds to install, it’s too complicated.</p>
          </div>
          <div className="about-value">
            <h3>Built for real businesses</h3>
            <p>Not for startups chasing vanity metrics. For businesses where a single recovered lead pays for the entire year of service.</p>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>See what your forms are missing</h2>
        <p>Try the live demo and watch ReCapture capture a lead in real time.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/test-form" className="about-cta-btn">Try the Live Demo</Link>
          <Link href="/signup" className="about-cta-btn-outline">Start Free Trial</Link>
        </div>
      </div>

      <footer style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <a href="https://userecapture.com" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#444', fontSize: '12px' }}>ReCapture · Born & Built in Dallas, Texas</span>
        </a>
      </footer>
    </div>
  )
}
