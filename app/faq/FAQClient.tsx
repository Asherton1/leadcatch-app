'use client'

import { useState } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import '../landing.css'
import { faqCategories } from './faqs'

export default function FAQClient() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key)
  }

  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <BlogNav />
      <ScrollReveal />
      <main style={{ color: '#fff' }}>
      {/* Hero */}
      <section
        style={{
          padding: '6rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p
            style={{
              color: '#ff6b35',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            FAQ
          </p>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#fff',
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about ReCapture &mdash; the recovery layer for high-ticket service businesses.
          </p>
        </div>
      </section>

      {/* Categorized FAQs */}
      <div style={{ padding: '4rem 1.5rem', maxWidth: '780px', margin: '0 auto' }}>
        {faqCategories.map((cat, catIdx) => (
          <section
            key={catIdx}
            style={{ marginBottom: catIdx === faqCategories.length - 1 ? '0' : '3rem' }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(255,107,53,0.3)',
              }}
            >
              {cat.name}
            </h2>
            <div className="pricing-faq-list">
              {cat.faqs.map((faq, faqIdx) => {
                const key = `${catIdx}-${faqIdx}`
                const isOpen = openKey === key
                return (
                  <div
                    key={key}
                    className={`pricing-faq-item ${isOpen ? 'pricing-faq-item-open' : ''}`}
                  >
                    <button
                      className="pricing-faq-trigger"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="pricing-faq-icon">+</span>
                    </button>
                    <div className="pricing-faq-answer">
                      <p className="pricing-faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section
        style={{
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            Still have questions?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Book a 15-minute demo and we&rsquo;ll walk through your specific setup.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://cal.com/userecapture"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#ff6b35',
                color: '#fff',
                padding: '0.875rem 1.75rem',
                borderRadius: '6px',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Book a demo
            </a>
            <Link
              href="/signup"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '0.875rem 1.75rem',
                borderRadius: '6px',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Start your 7-day free trial
            </Link>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </div>
  )
}
