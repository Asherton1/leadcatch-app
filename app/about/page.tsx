import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Image from 'next/image'
import '../blog/blog.css'
import '../landing.css'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import StatCounter from '../components/StatCounter'
import FounderCard from '../components/FounderCard'
import StoryTimeline from '../components/StoryTimeline'
import './about.css'
import StoryAccordion from '../components/StoryAccordion'

export const metadata = {
  title: 'About ReCapture — Form Abandonment Recovery Built in Dallas, TX',
  description: 'The story behind ReCapture — built by a digital marketing veteran in Dallas who spent a decade watching high-value leads slip through the cracks.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ReCapture — Form Abandonment Recovery Built in Dallas, TX',
    description: 'The story behind ReCapture — built by a digital marketing veteran in Dallas who spent a decade watching high-value leads slip through the cracks.',
    url: 'https://www.userecapture.com/about',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=The%20leads%20were%20always%20there&eyebrow=About',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ReCapture — Built in Dallas, TX',
    description: 'The story behind ReCapture — a decade of watching high-value leads slip through the cracks.',
    images: ['https://www.userecapture.com/api/og?title=The%20leads%20were%20always%20there&eyebrow=About'],
  },
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <StoryAccordion />
      <BlogNav />
      <ScrollReveal />

      {/* HERO — editorial treatment matching pricing/ledger */}
      <section className="about-hero-v2">
        <div className="about-hero-v2-inner">
          <p className="about-hero-v2-eyebrow">About</p>
          <h1 className="about-hero-v2-headline">
            <span className="about-hero-v2-headline-primary">The leads were always there.</span>{' '}
            <span className="about-hero-v2-headline-muted">Nobody was watching.</span>
          </h1>
          <p className="about-hero-v2-sub">I spent over a decade running ad campaigns for high-ticket businesses and got tired of watching good money disappear into a black hole between the moment someone starts a form and the moment they submit it.</p>
        </div>
      </section>

      {/* FOUNDER — moved up to position 2, redesigned */}
      <section className="about-founder-v2 reveal">
        <div className="about-founder-v2-inner">
          <FounderCard />
        </div>
      </section>

      <section className="about-story-v2">
        <div className="about-story-v2-inner">
          <StoryTimeline />
        </div>
      </section>

      {/* WHO I WORK WITH — editorial client list */}
      <section className="about-clients reveal">
        <div className="about-clients-inner">
          <p className="about-clients-eyebrow">The work</p>
          <h2 className="about-clients-headline">A decade in the trenches.</h2>
          <p className="about-clients-lede">Before ReCapture, I spent ten years running paid acquisition for the kind of businesses where a single lead is worth thousands &mdash; med spas, dental groups, luxury real estate, high-end services. I watched the money go in and the leads come out, and I watched a huge share of them vanish in the gap nobody measured. ReCapture is what a decade of that gap taught me to build.</p>

          <StatCounter />

          <p className="about-clients-closer">
            <span className="about-clients-closer-accent">One ReCapture</span>, born out of all of it.
          </p>
        </div>
      </section>

      {/* VALUES — rebuilt to match pricing baseline language */}
      <section className="about-values-v2 reveal">
        <div className="about-values-v2-inner">
          <p className="about-values-v2-eyebrow">The principles</p>
          <h2 className="about-values-v2-headline">What I believe.</h2>
          <div className="about-values-v2-grid">
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Every lead matters</div>
              <div className="about-values-v2-desc">You paid for that click. If someone starts your form, you deserve to know about it &mdash; whether they finish or not.</div>
            </div>
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Simple beats complicated</div>
              <div className="about-values-v2-desc">One script tag. No migration. No developer needed. If it takes more than 60 seconds to install, it&apos;s too complicated.</div>
            </div>
            <div className="about-values-v2-cell">
              <div className="about-values-v2-title">Built for real businesses</div>
              <div className="about-values-v2-desc">Not for startups chasing vanity metrics. For businesses where a single recovered lead pays for the entire year of service.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — editorial, text + arrow */}
      <section className="about-final-cta reveal">
        <div className="about-final-cta-inner">
          <h2 className="about-final-cta-headline">See it work on your forms.</h2>
          <p className="about-final-cta-sub">7-day free trial. About 5 minutes to set up. Card required, not charged until day 8.</p>
          <Link href="/signup" className="about-final-cta-link">
            Begin your trial <span className="about-final-cta-arrow">&rarr;</span>
          </Link>
        </div>
      </section>

      <RelatedPages page="about" />
      <Footer />
    </div>
  )
}
