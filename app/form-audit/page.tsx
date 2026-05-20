'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../landing.css'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import GSAPAnimations from '../components/GSAPAnimations'
import ScrollReveal from '../components/ScrollReveal'
import RelatedPages from '../components/RelatedPages'

export default function FormAuditPage() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!url || !email) {
      setError('Please enter both your website URL and email.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/form-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      })
      if (!res.ok) {
        throw new Error('Audit request failed')
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Try again or email hello@userecapture.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="landing">
      <div className="ambient-bg" />
      <GSAPAnimations />
      <ScrollReveal />

      <nav className="lc-nav">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logo.png" alt="ReCapture" width={160} height={41} className="nav-logo-img" priority />
        </Link>
        <MobileNav />
      </nav>

      {/* Hero + form */}
      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Free Form Audit</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">See the exact dollar amount your contact form is costing you. </span>
            <span className="canon-hero-headline-muted">60-second analysis. Industry-specific. Delivered to your inbox.</span>
          </h1>
        </div>

        {submitted ? (
          <div className="audit-success">
            <svg className="audit-success-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <h2 className="audit-success-headline">Audit started.</h2>
            <p className="audit-success-body">
              We&rsquo;re analyzing <strong>{url}</strong> right now. Your report lands in your inbox within the next 2&ndash;3 hours.
            </p>
          </div>
        ) : (
          <div className="audit-form-block">
            <div className="audit-form-inputs">
              <div className="audit-form-field">
                <label className="audit-form-label" htmlFor="audit-url">Website URL</label>
                <input
                  className="audit-form-input"
                  id="audit-url"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="audit-form-field">
                <label className="audit-form-label" htmlFor="audit-email">Email</label>
                <input
                  className="audit-form-input"
                  id="audit-email"
                  type="email"
                  placeholder="you@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="audit-form-error">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="audit-form-submit"
              >
                {submitting ? 'Starting audit...' : 'Run my audit'}
              </button>
            </div>
            <p className="audit-form-footnote">
              Delivered within 2&ndash;3 hours. No spam. One-click unsubscribe.
            </p>
          </div>
        )}
      </section>

      {/* Sample Report Preview */}
      <section className="audit-preview">
        <div className="audit-preview-inner">
          <p className="audit-preview-eyebrow">What you&apos;ll get</p>
          <h2 className="audit-preview-headline">A real report. Real numbers. Real findings.</h2>
          <p className="audit-preview-sub">
            Here&rsquo;s a preview of what your audit looks like &mdash; modeled on a real report we sent to a Texas med spa earlier this month.
          </p>

          <div className="audit-preview-card">
            <div className="audit-preview-card-header">
              <p className="audit-preview-card-logo">
                <span style={{color: '#ff6b35'}}>[&bull;]</span>&nbsp;Re<span style={{color: '#ff6b35'}}>Capture</span>
              </p>
              <h3 className="audit-preview-card-title">Your Form Audit Report</h3>
              <p className="audit-preview-card-prepared">
                Prepared for <strong>examplemedspa.com</strong>
              </p>
            </div>

            <div className="audit-preview-card-body">
              <div className="audit-preview-grade-box">
                <p className="audit-preview-grade-label">Form Health Score</p>
                <p className="audit-preview-grade-letter">D</p>
                <p className="audit-preview-grade-num">55 / 100</p>
              </div>

              <div className="audit-preview-table-block">
                <p className="audit-preview-table-heading">Revenue at Risk</p>
                <table className="audit-preview-table">
                  <tbody>
                    <tr className="audit-preview-table-row">
                      <td className="audit-preview-table-label">Est. Abandonment Rate</td>
                      <td className="audit-preview-table-value">72%</td>
                    </tr>
                    <tr className="audit-preview-table-row">
                      <td className="audit-preview-table-label">Est. Monthly Leads Lost</td>
                      <td className="audit-preview-table-value">54</td>
                    </tr>
                    <tr className="audit-preview-table-row">
                      <td className="audit-preview-table-label">Est. Monthly Revenue Lost</td>
                      <td className="audit-preview-table-value audit-preview-table-value-big">$151,200</td>
                    </tr>
                    <tr className="audit-preview-table-row">
                      <td className="audit-preview-table-label">Est. Annual Revenue Lost</td>
                      <td className="audit-preview-table-value audit-preview-table-value-big">$1,814,400</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="audit-preview-findings">
                <p className="audit-preview-findings-heading">Findings</p>
                <p className="audit-preview-finding">
                  Your form has 8 fields. Research shows each field beyond 4 increases abandonment by 5&ndash;10%.
                </p>
                <p className="audit-preview-finding">
                  No mobile viewport detected. Forms may not render properly on mobile devices where 60%+ of traffic originates.
                </p>
                <p className="audit-preview-finding">
                  No Google Analytics or Tag Manager detected. You have zero visibility into form interactions.
                </p>
              </div>
            </div>

            <div className="audit-preview-fade">
              <p className="audit-preview-fade-text">+ Industry Benchmarks &middot; Recommendations &middot; Action Plan</p>
            </div>
          </div>

          <p className="audit-preview-footnote">
            Your report arrives within <strong>2&ndash;3 hours of submission</strong>. Fully personalized to your actual site, your detected industry, and your current setup.
          </p>
        </div>
      </section>

      {/* What the audit covers */}
      <section className="audit-covers">
        <div className="audit-covers-header">
          <p className="audit-covers-eyebrow">What the audit covers</p>
          <h2 className="audit-covers-headline">Six dimensions. Every one rated.</h2>
          <p className="audit-covers-sub">
            We don&rsquo;t guess. We pull your live site, parse your forms, and grade every variable that affects lead conversion.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Industry Detection</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Auto-detected from your site&rsquo;s content. <strong>Med spa, dental, plastic surgery, real estate, fertility, LASIK &mdash; each has a different average lead value.</strong> We use your industry&rsquo;s actual numbers, not a generic average.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Form Health Score (A&ndash;F)</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            <strong>A single letter grade based on form length, mobile optimization, HTTPS, tracking infrastructure, and friction signals.</strong> Most service businesses score C or below. The report tells you exactly which inputs are dragging your grade down.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Revenue at Risk</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Estimated monthly and annual revenue you&rsquo;re losing to abandonment, calculated against <strong>your industry&rsquo;s average lead value</strong>. Not a hypothetical &mdash; a dollar figure you can take to your next ad budget meeting.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Tracking Audit</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Google Analytics, Tag Manager, Meta Pixel, CAPTCHA presence, HTTPS status. <strong>Most sites are flying blind without realizing it.</strong> We tell you exactly what&rsquo;s installed and what&rsquo;s missing.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Industry Benchmarks</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Side-by-side comparison: <strong>how your form stacks up against other med spas, dental groups, fertility clinics, or real estate firms</strong> on field count, abandonment rate, and average lead value.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Action Plan</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            <strong>Specific recommendations, ranked by impact.</strong> Not &ldquo;improve your form&rdquo; &mdash; actual changes you can make in 30 minutes. Field removal targets, tracking install steps, mobile fixes.
          </p>
        </div>
      </section>

      {/* Trust line */}
      <section className="audit-trust">
        <p className="audit-trust-text">
          Built by <strong>Asherton Chraibi</strong>, founder of ReCapture and ten-year digital marketing operator. The audit you receive is the same one I&rsquo;d send to a paying client.
        </p>
      </section>

      <RelatedPages page="form-audit" />
      <Footer />
    </div>
  )
}
