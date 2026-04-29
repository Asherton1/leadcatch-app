import Link from 'next/link'
import Image from 'next/image'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import './blog.css'
import '../landing.css'

export const metadata = {
  title: 'Insights — ReCapture Blog',
  description: 'Insights on form abandonment, lead recovery, and revenue optimization for high-ticket service businesses.',
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <BlogNav />
      <ScrollReveal />

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Insights</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Straight talk on lead recovery.</span>{' '}
            <span className="canon-hero-headline-muted">Form abandonment, revenue optimization, and the leads most businesses don&apos;t know they&apos;re losing.</span>
          </h1>
        </div>
      </section>

      <div className="blog-featured reveal">
        <Link href="/blog/ai-voice-callbacks-form-abandonment" className="blog-featured-card">
          <div className="blog-featured-visual" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/blog-ai-voice-callbacks.webp" alt="Ai voice callback technology" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="blog-featured-content">
            <div className="blog-featured-tag">Ai Voice Technology</div>
            <div className="blog-featured-meta">
              <span className="blog-featured-date">April 22, 2026</span>
              <span className="blog-featured-dot" />
              <span className="blog-featured-readtime">6 min read</span>
            </div>
            <div className="blog-featured-title">Why Ai Voice Callbacks Convert 391% More Abandoned Leads</div>
            <div className="blog-featured-excerpt">Emails get ignored. Texts get swiped. But a phone call within 60 seconds of form abandonment? That converts.</div>
            <span className="blog-featured-cta">Read article <span>→</span></span>
          </div>
        </Link>
      </div>

      <div className="blog-more reveal" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 style={{ color: '#ff6b35', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 2rem 0' }}>More Insights</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          <Link href="/blog/hidden-cost-of-form-abandonment" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-ai-voice-callbacks.webp" alt="Ai voice callback technology" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Revenue Recovery</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}>
                <span>April 7, 2026</span>
                <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                <span>7 min read</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why Ai Voice Callbacks Convert 391% More Abandoned Leads</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Emails get ignored. Texts get swiped. But a phone call within 60 seconds of form abandonment? That converts.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article <span>&rarr;</span></span>
            </div>
          </Link>
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
          <Link href="/blog/five-minute-follow-up-rule" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-speed-to-lead.webp" alt="Speed to lead follow up" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Lead Recovery</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>April 17, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>6 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>The 5-Minute Follow-Up Rule: Why Speed to Lead Wins Every Time</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>A lead that fills out your contact form is at peak interest the moment they start typing. Every minute you wait, that interest cools.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
