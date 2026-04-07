import Link from 'next/link'
import './blog.css'

export const metadata = {
  title: 'Blog — ReCapture',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

const featured = {
  slug: 'hidden-cost-of-form-abandonment',
  title: "The Hidden Cost of Form Abandonment (And What It's Really Costing Your Business)",
  date: 'April 7, 2026',
  readTime: '7 min read',
  excerpt: "Most businesses obsess over traffic and ad spend. Almost none of them track the leads that start filling out a form and never finish. Here's why that blind spot is costing more than your entire marketing budget.",
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
          <Link href="/blog">Blog</Link>
          <Link href="/test-form">Demo</Link>
          <Link href="/signup">Start Trial</Link>
        </div>
      </nav>

      <div className="blog-hero">
        <h1>Insights</h1>
        <p className="blog-hero-sub">Straight talk on form abandonment, lead recovery, and the revenue most businesses don&apos;t know they&apos;re losing.</p>
      </div>

      <div className="blog-featured">
        <div className="blog-featured-label">Latest</div>
        <Link href={'/blog/' + featured.slug} className="blog-featured-card">
          <div className="blog-featured-meta">
            <span className="blog-featured-date">{featured.date}</span>
            <span className="blog-featured-dot" />
            <span className="blog-featured-readtime">{featured.readTime}</span>
          </div>
          <div className="blog-featured-title">{featured.title}</div>
          <div className="blog-featured-excerpt">{featured.excerpt}</div>
          <span className="blog-featured-cta">Read article <span>→</span></span>
        </Link>
      </div>
    </div>
  )
}
