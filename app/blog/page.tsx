import Link from 'next/link'
import './blog.css'

export const metadata = {
  title: 'Insights \u2014 ReCapture Blog',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
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

      <div className="blog-hero">
        <h1><span style={{ color: "#fff" }}>In</span><span style={{ color: "#ff6b35" }}>sights</span></h1>
        <p className="blog-hero-sub">Straight talk on form abandonment, lead recovery, and the revenue most businesses don&apos;t know they&apos;re losing.</p>
        <div className="blog-hero-line" />
      </div>

      <div className="blog-featured">
        <Link href="/blog/hidden-cost-of-form-abandonment" className="blog-featured-card">
          <div className="blog-featured-visual">
            <div className="blog-featured-visual-text">60%</div>
          </div>
          <div className="blog-featured-content">
            <div className="blog-featured-tag">Revenue Recovery</div>
            <div className="blog-featured-meta">
              <span className="blog-featured-date">April 7, 2026</span>
              <span className="blog-featured-dot" />
              <span className="blog-featured-readtime">7 min read</span>
            </div>
            <div className="blog-featured-title">The Hidden Cost of Form Abandonment (And What It&apos;s Really Costing Your Business)</div>
            <div className="blog-featured-excerpt">Most businesses obsess over traffic and ad spend. Almost none of them track the leads that start filling out a form and never finish.</div>
            <span className="blog-featured-cta">Read article <span>→</span></span>
          </div>
        </Link>
      </div>
    </div>
  )
}
