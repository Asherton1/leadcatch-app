'use client'

import { useState } from 'react'
import Link from 'next/link'
import '../landing.css'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import GSAPAnimations from '../components/GSAPAnimations'
import ScrollReveal from '../components/ScrollReveal'
import RelatedPages from '../components/RelatedPages'
import Logo from '../components/Logo'

const INQUIRY_TYPES = [
  {
    value: 'sales',
    label: 'Sales inquiry',
    placeholder: 'Tell us about your business and what you are hoping ReCapture can help with. Industry, locations, current lead flow — whatever is useful.',
  },
  {
    value: 'demo',
    label: 'Demo request',
    placeholder: 'What does your current form flow look like? Any specific scenarios you want to see ReCapture handle?',
  },
  {
    value: 'partnership',
    label: 'Partnership',
    placeholder: 'What kind of partnership are you imagining? Agency, integration, co-marketing — give us the picture.',
  },
  {
    value: 'support',
    label: 'Support',
    placeholder: 'What is the issue? Include error messages, screenshots, or anything else that helps us dig in fast.',
  },
  {
    value: 'other',
    label: 'Other',
    placeholder: 'What is on your mind?',
  },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [inquiryType, setInquiryType] = useState('sales')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const currentType = INQUIRY_TYPES.find(t => t.value === inquiryType) || INQUIRY_TYPES[0]

  const handleSubmit = async () => {
    // Browser autofill writes directly to the DOM without firing React's
    // onChange, so controlled state can be stale. Pull live values from
    // the DOM with state as fallback.
    const getDomValue = (id: string, fallback: string): string => {
      if (typeof document === 'undefined') return fallback
      const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null
      return (el?.value || fallback).trim()
    }

    const nameVal = getDomValue('contact-name', name)
    const emailVal = getDomValue('contact-email', email)
    const companyVal = getDomValue('contact-company', company)
    const phoneVal = getDomValue('contact-phone', phone)
    const messageVal = getDomValue('contact-message', message)

    // Sync React state so the form visually reflects what was submitted
    if (nameVal !== name) setName(nameVal)
    if (emailVal !== email) setEmail(emailVal)
    if (companyVal !== company) setCompany(companyVal)
    if (phoneVal !== phone) setPhone(phoneVal)
    if (messageVal !== message) setMessage(messageVal)

    if (!nameVal || !emailVal || !messageVal) {
      setError('Name, email, and message are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setError('Please enter a valid email address.')
      return
    }
    if (messageVal.length < 10) {
      setError('Please add a bit more detail to your message.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          company: companyVal,
          phone: phoneVal,
          inquiryType,
          message: messageVal,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }
      setSubmitted(true)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg + '. Try again or email hello@userecapture.com.')
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
          <Logo />
        </Link>
        <MobileNav />
      </nav>

      {/* HERO */}
      <section className="contact-hero">
        <p className="contact-eyebrow">Contact</p>
        <h1 className="contact-headline">
          Skip the maze.<br />
          Talk to a <span className="contact-headline-accent">real human</span>.
        </h1>
        <p className="contact-sub">
          Every message gets a real reply. Most come same-day.
        </p>
      </section>

      {/* MAIN: two-column */}
      <section className="contact-main">
        <aside className="contact-direct">
          <p className="contact-section-label">Direct</p>

          <div className="contact-path">
            <div className="contact-path-label">Concierge line</div>
            <a href="tel:+18886060630" className="contact-path-value">(888) 606-0630</a>
            <div className="contact-path-meta">
              <span className="contact-availability-dot" />
              <span>8a&ndash;8p CT, Monday&ndash;Friday</span>
            </div>
          </div>

          <div className="contact-path">
            <div className="contact-path-label">Email</div>
            <a href="mailto:hello@userecapture.com" className="contact-path-value">hello@userecapture.com</a>
            <div className="contact-path-meta">
              <span>Reply within 24 hours</span>
            </div>
          </div>

          <div className="contact-path-divider" />

          <div className="contact-stats">
            <div className="contact-stat">
              <div className="contact-stat-value">&lt;24h</div>
              <div className="contact-stat-label">Avg response</div>
            </div>
            <div className="contact-stat">
              <div className="contact-stat-value">100%</div>
              <div className="contact-stat-label">Human-written</div>
            </div>
          </div>
        </aside>

        <div className="contact-form-wrap">
          <p className="contact-section-label">Send a message</p>

          {submitted ? (
            <div className="contact-success">
              <svg className="contact-success-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              <h2 className="contact-success-headline">Message received.</h2>
              <p className="contact-success-body">
                Thanks <strong>{name}</strong>&mdash; we&rsquo;ll get back to you within 24 hours. Check your inbox for a confirmation.
              </p>
            </div>
          ) : (
            <div className="audit-form-block">
              <div className="audit-form-inputs">
                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-name">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="audit-form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={submitting}
                    autoComplete="name"
                  />
                </div>

                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-email">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="audit-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={submitting}
                    autoComplete="email"
                  />
                </div>

                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    className="audit-form-input"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                    disabled={submitting}
                    autoComplete="organization"
                  />
                </div>

                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-phone">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="audit-form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                    disabled={submitting}
                    autoComplete="tel"
                  />
                </div>

                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-type">What can we help with?</label>
                  <select
                    id="contact-type"
                    className="audit-form-input"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    disabled={submitting}
                  >
                    {INQUIRY_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="audit-form-field">
                  <label className="audit-form-label" htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    className="audit-form-input"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={currentType.placeholder}
                    disabled={submitting}
                  />
                </div>

                {error && <div className="audit-form-error">{error}</div>}

                <button
                  type="button"
                  className="audit-form-submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHO RESPONDS */}
      <section className="contact-who">
        <div className="contact-who-inner">
          <p className="contact-eyebrow">Who responds</p>
          <h2 className="contact-who-headline">
            Real humans. <span className="contact-who-headline-muted">No funnel.</span>
          </h2>
          <p className="contact-who-body">
            No SDR funnel, no chatbot pretending to be human, no &ldquo;someone from our team will be in touch&rdquo;
            auto-reply that goes nowhere. We read every message, write every reply, and respond same-day on most days.
            If you reach out on a weekend, we may be a bit slower &mdash; but you&rsquo;ll still hear back.
          </p>
          <div className="contact-who-meta">
            <span className="contact-who-meta-bar" />
            Based in the Harwood District, Dallas, TX
          </div>
        </div>
      </section>

      <RelatedPages page="contact" />
      <Footer />
    </div>
  )
}
