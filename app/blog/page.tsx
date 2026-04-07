import Link from 'next/link'
import './blog.css'

export const metadata = {
  title: 'Blog — ReCapture',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

const posts = [
  {
    slug: 'hidden-cost-of-form-abandonment',
    title: "The Hidden Cost of Form Abandonment (And What It's Really Costing Your Business)",
    date: 'April 7, 2026',
    excerpt: "Most businesses obsess over traffic and ad spend. Almost none of them track the leads that start filling out a form and never finish. Here's why that blind spot is costing more than your entire marketing budget.",
  },
]

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <nav style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 36 36">
            <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
            <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
            <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
          </svg>
          <span><span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.25rem' }}>Capture</span></span>
        </Link>
      </nav>

      <div className="blog-header">
        <h1>Blog</h1>
        <p>Straight talk on form abandonment, lead recovery, and the revenue most businesses don&apos;t know they&apos;re losing.</p>
      </div>

      <div className="blog-grid">
        {posts.map(post => (
          <Link href={'/blog/' + post.slug} className="blog-card" key={post.slug}>
            <div className="blog-card-date">{post.date}</div>
            <div className="blog-card-title">{post.title}</div>
            <div className="blog-card-excerpt">{post.excerpt}</div>
            <span className="blog-card-read">Read more \u2192</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
