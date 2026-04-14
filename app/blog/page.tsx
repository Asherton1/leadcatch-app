import Link from 'next/link'
import Image from 'next/image'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import './blog.css'

export const metadata = {
  title: 'Insights — ReCapture Blog',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Insights</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Straight Talk on Lead Recovery</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Form abandonment, revenue optimization, and the leads most businesses don&apos;t know they&apos;re losing.</p>
        </div>
      </div>

      <div className="blog-featured">
        <Link href="/blog/hidden-cost-of-form-abandonment" className="blog-featured-card">
          <div className="blog-featured-visual" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/blog-form-abandonment.webp" alt="Form abandonment visualization" fill style={{ objectFit: 'cover' }} />
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

      <div className="blog-more" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 style={{ color: '#ff6b35', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 2rem 0' }}>More Insights</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          <Link href="/blog/google-analytics-form-conversions" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-ga-lying.webp" alt="Broken analytics dashboard" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Analytics</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}>
                <span>April 10, 2026</span>
                <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                <span>6 min read</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why Your Google Analytics Is Lying to You About Form Conversions</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>You&apos;re measuring traffic in and submissions out. But nobody is measuring what happens in between.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article <span>→</span></span>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
