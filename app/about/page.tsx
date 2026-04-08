import Link from 'next/link'
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
      <nav className="blog-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 36 36">
            <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
            <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
          </svg>
          <span><span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.25rem' }}>Capture</span></span>
        </Link>
        <div className="blog-nav-links">
          <Link href="/blog">Insights</Link>
          <Link href="/test-form">Demo</Link>
          <Link href="/signup">Start Trial</Link>
        </div>
      </nav>

      <div className="about-hero">
        <div className="about-hero-content">
          <h1>The leads were always there.<br /><span className="about-highlight">Nobody was watching.</span></h1>
          <p className="about-hero-sub">ReCapture was built by someone who spent over a decade running ad campaigns for high-ticket businesses — and got tired of watching good money disappear into a black hole between the first keystroke and the submit button.</p>
        </div>
      </div>

      <div className="about-story">
        <div className="about-story-section">
          <h2>The Problem I Kept Seeing</h2>
          <p>I’ve managed over $100K in monthly ad spend across 38+ clients. Med spas, dental practices, luxury real estate, high-end service businesses — the kind of companies where a single lead is worth $1,500 to $10,000.</p>
          <p>The playbook was always the same: build the funnel, run the ads, optimize the landing page, watch the leads come in. And the leads did come in. But something always nagged at me.</p>
          <p>Google Analytics showed the traffic. The CRM showed the submissions. But neither one showed me the people in between — the ones who clicked the form, started typing their name, got distracted, and disappeared. Those people were invisible. And there were a LOT of them.</p>
        </div>

        <div className="about-story-section">
          <h2>The Moment It Clicked</h2>
          <p>I was reviewing a client’s campaign performance and the numbers didn’t add up. We were driving solid traffic. The landing page was converting. But the gap between page views and form submissions was massive — way bigger than it should have been.</p>
          <p>That’s when I realized: every analytics platform on the market tracks what happens before the form and what happens after. Nobody tracks what happens during. The form itself was a complete blind spot.</p>
          <p>I went looking for a tool that could capture partial form data — names, emails, phone numbers typed but never submitted. The options were either built for e-commerce cart abandonment, required you to replace your forms entirely, or had dashboards that looked like they were built in 2014.</p>
          <p>None of them were built for the businesses I work with. So I built one.</p>
        </div>

        <div className="about-story-section">
          <h2>What ReCapture Is</h2>
          <p>ReCapture is a form abandonment recovery platform built specifically for high-ticket service businesses. One script tag on your website. No form migration. No complex setup. The moment someone starts typing into your contact form, we capture it — even if they never hit submit.</p>
          <p>You see every lead in a clean dashboard with their name, email, phone number, and the estimated dollar value they represent. Follow up manually, or let ReCapture send automated recovery emails on your behalf.</p>
          <p>It’s the tool I wished existed for the last ten years of my career. Now it does.</p>
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
          <p className="about-founder-bio">Originally from San Diego, California. Bachelor’s degree in Art & Design with a minor in Marketing and Business. Over 10 years in digital marketing and advertising, managing $100K+ in monthly ad spend across 38+ long-term clients spanning med spas, dental practices, luxury real estate, and high-end service businesses.</p>
          <p className="about-founder-bio">The same obsession with performance marketing that built a career managing campaigns for elite brands is what led to ReCapture — a product born out of seeing the same problem over and over, and finally building the solution.</p>
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
