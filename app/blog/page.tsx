import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import './blog.css'

export const metadata = {
  title: 'Insights \u2014 ReCapture Blog',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <BlogNav />

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
