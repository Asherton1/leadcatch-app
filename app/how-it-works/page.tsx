import BlogNav from '../components/BlogNav'
import SplitFlow from '../components/SplitFlow'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import ScrollReveal from '../components/ScrollReveal'
import HiwSpine from '../components/HiwSpine'
import Link from 'next/link'
import '../blog/blog.css'
import '../landing.css'
import './how-it-works.css'

export const metadata = {
  title: 'How ReCapture Works — Form Abandonment Recovery in 3 Steps',
  description: 'See exactly how ReCapture captures abandoned form data, scores leads, and recovers lost revenue — all from one script tag. No dev team required.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How ReCapture Works — Form Abandonment Recovery in 3 Steps',
    description: 'See exactly how ReCapture captures abandoned form data, scores leads, and recovers lost revenue — all from one script tag. No dev team required.',
    url: 'https://www.userecapture.com/how-it-works',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=How%20ReCapture%20Works%20%E2%80%94%20Recovery%20in%203%20Steps&eyebrow=How%20It%20Works',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How ReCapture Works — Form Abandonment Recovery in 3 Steps',
    description: 'See exactly how ReCapture captures abandoned form data, scores leads, and recovers lost revenue.',
    images: ['https://www.userecapture.com/api/og?title=How%20ReCapture%20Works%20%E2%80%94%20Recovery%20in%203%20Steps&eyebrow=How%20It%20Works'],
  },
}


export default function HowItWorksPage() {
  return (
    <div className="hiw-page">
      <BlogNav />
      <ScrollReveal />
      <HiwSpine />

      {/* Hero */}
      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">How It Works</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">From abandoned form to recovered revenue.</span>{' '}
            <span className="canon-hero-headline-muted">Most form tools only see completed submissions. ReCapture sees everything &mdash; the moment a visitor starts typing, we capture their data, score the lead, alert your team, and send recovery emails automatically.</span>
          </h1>
        </div>
      </section>

      {/* Visual Flow */}
      <SplitFlow />

      <section className="hiw-setup">
        <h2 className="hiw-setup-title reveal">Setup Takes <span className="hiw-orange">Less Than 2 Minutes</span></h2>
        <p className="hiw-setup-sub reveal">One line of code. No form changes. No developer required.</p>
        <div className="hiw-code-block reveal">
          <div className="hiw-code-header">
            <span className="hiw-code-dot red"></span>
            <span className="hiw-code-dot yellow"></span>
            <span className="hiw-code-dot green"></span>
            <span className="hiw-code-filename">your-website.html</span>
          </div>
          <code>&lt;script src=&quot;https://userecapture.com/track.js?key=YOUR_API_KEY&quot;&gt;&lt;/script&gt;</code>
        </div>
        <p className="hiw-setup-compat reveal">Works on WordPress, Webflow, Wix, Squarespace, Shopify, and any custom-built website.</p>
      </section>

      {/* CTA */}
      <section className="hiw-cta reveal">
        <h2>Ready to See What You're Missing?</h2>
        <p>Start your 7-day free trial. If you're losing leads, you'll know within 48 hours.</p>
        <div className="hiw-cta-buttons">
          <Link href="/demo" className="hiw-cta-primary">Try the Live Demo</Link>
          <Link href="/start-trial" className="hiw-cta-secondary">Start your 7-day free trial</Link>
        </div>
      </section>

      <RelatedPages page="how-it-works" />
      <Footer />
    </div>
  )
}
