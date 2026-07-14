import Link from 'next/link'
import Image from 'next/image'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import BlogCardEffects from '../components/BlogCardEffects'
import Footer from '../components/Footer'
import './blog.css'
import '../landing.css'

export const metadata = {
  title: 'ReCapture Blog — Form Abandonment Recovery, Lead Strategy',
  description: 'Strategy, data, and tactics on form abandonment recovery, AI voice callbacks, and lead conversion for high-ticket service businesses.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'ReCapture Blog — Form Abandonment Recovery, Lead Strategy',
    description: 'Strategy, data, and tactics on form abandonment recovery, AI voice callbacks, and lead conversion for high-ticket service businesses.',
    url: 'https://www.userecapture.com/blog',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=ReCapture%20Blog%20%E2%80%94%20Insights%20on%20Lead%20Recovery&eyebrow=Insights',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Blog — Form Abandonment Recovery, Lead Strategy',
    description: 'Strategy, data, and tactics on form abandonment recovery, AI voice callbacks, and lead conversion.',
    images: ['https://www.userecapture.com/api/og?title=ReCapture%20Blog%20%E2%80%94%20Insights%20on%20Lead%20Recovery&eyebrow=Insights'],
  },
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <BlogNav />
      <ScrollReveal />
      <BlogCardEffects />

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
        <Link href="/blog/why-pre-construction-condo-inquiries-leak" className="blog-featured-card">
          <div className="blog-featured-visual" style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/blog-preconstruction-condos.webp" alt="Why pre-construction condo inquiries leak at the sales gallery level" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="blog-featured-content">
            <div className="blog-featured-tag">Pre-Construction Condo</div>
            <div className="blog-featured-meta">
              <span className="blog-featured-date">July 14, 2026</span>
              <span className="blog-featured-dot" />
              <span className="blog-featured-readtime">8 min read</span>
            </div>
            <div className="blog-featured-title">Why Pre-Construction Condo Inquiries Leak at the Sales Gallery Level</div>
            <div className="blog-featured-excerpt">Pre-construction condo buyers research for months, then vanish mid-inquiry. Here is the form-abandonment math behind why developers lose their warmest prospects during the exact moment the sales gallery should be closing them.</div>
            <span className="blog-featured-cta">Read article <span>→</span></span>
          </div>
        </Link>
      </div>

      <div className="blog-divider" aria-hidden="true"><span></span></div>

      <div className="blog-more reveal" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <h2 style={{ color: '#ff6b35', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 2rem 0' }}>More Insights</h2>
        <div className="blog-bento">
          <Link href="/blog/why-luxury-real-estate-leads-disappear" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-luxury-real-estate.webp" alt="Why luxury real estate leads disappear" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Luxury Real Estate</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>July 6, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>7 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why Luxury Real Estate Leads Disappear Before the First Showing</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Luxury buyers research deeply, decide fast, and move on faster. Here is the form-abandonment math behind why high-ticket brokerages lose their best prospects before the conversation ever starts.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/why-med-spa-leads-vanish-after-hours" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-medspa-after-hours.jpg" alt="Why med spa leads vanish after hours" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Med Spa &amp; Aesthetics</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>June 11, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>7 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why Med Spa Leads Vanish After Hours — And What It Costs You</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Aesthetic inquiries arrive after 5 PM, on mobile, with zero patience. Here is the form-abandonment math behind why med spas lose their highest-intent leads.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/form-abandonment-at-scale" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-form-abandonment-at-scale.jpg" alt="Form abandonment at scale" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Revenue Recovery</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>June 2, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>8 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Form Abandonment at Scale: The Math Changes at 10, 100, and 500 Locations</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Single-practice form abandonment is annoying. Multi-location form abandonment is structural. Here is the math at scale.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/mobile-form-abandonment-is-different" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-mobile-abandonment.webp" alt="Mobile form abandonment is different" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Mobile UX</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>May 18, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>8 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why Mobile Form Abandonment Is Different (And Why Most Recovery Tools Miss It)</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Mobile drives the majority of inbound inquiries for most service businesses. The form recovery tools they use were built for desktop browsers.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/hidden-cost-of-form-abandonment" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-form-abandonment.webp" alt="The hidden cost of form abandonment" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Revenue</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>April 3, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>7 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>The Hidden Cost of Form Abandonment</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Most businesses track traffic and ad spend but ignore the leads that start a form and never finish — and that blind spot is quietly expensive.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/the-form-abandonment-compliance-problem" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-compliance-problem.webp" alt="Compliance and legal infrastructure" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Compliance &amp; Legal</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}><span>May 8, 2026</span><span style={{ margin: '0 0.5rem' }}>·</span><span>8 min read</span></div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>The Form Abandonment Compliance Problem (and How We Solved It)</div>
              <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>Most form abandonment tools were built before the laws caught up. TCPA, CAN-SPAM, GDPR, and HIPAA all matter now.</div>
              <span style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
          <Link href="/blog/ai-voice-callbacks-form-abandonment" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '0', textDecoration: 'none', transition: 'border-color 0.2s', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src="/blog-ai-voice-callbacks.webp" alt="AI voice callback technology" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>AI Voice Technology</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.75rem' }}>
                <span>April 22, 2026</span>
                <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                <span>6 min read</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>Why AI Voice Callbacks Convert 391% More Abandoned Leads</div>
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
