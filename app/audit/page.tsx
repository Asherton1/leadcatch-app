import type { Metadata } from 'next'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import AuditForm from '../components/AuditForm'
import '../landing.css'

export const metadata: Metadata = {
  title: 'Request a complimentary ad account audit',
  description: 'Send exports from whatever period you are comfortable sharing and get back a teardown of what your Google and Meta accounts are actually doing, plus a written strategy for what to change. No charge and no obligation.',
  alternates: { canonical: '/audit' },
  openGraph: {
    title: 'Request a complimentary ad account audit',
    description: 'A teardown of what your ad accounts are actually doing, plus a written strategy for what to change. No charge and no obligation.',
    url: 'https://www.userecapture.com/audit',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Complimentary+Ad+Account+Audit&eyebrow=Consulting',
      width: 1200, height: 630, alt: 'ReCapture',
    }],
  },
}

export default function AuditPage() {
  return (
    <div className="af-page">
      <BlogNav />

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Complimentary audit</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Let me look at what your account is actually doing.</span>{' '}
            <span className="canon-hero-headline-muted">You get a teardown of what is working and what is not, and a written strategy for what I would change. No charge, and nothing attached to it.</span>
          </h1>
        </div>
      </section>

      <AuditForm />

      <Footer />
    </div>
  )
}
