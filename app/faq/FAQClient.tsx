'use client'

import { useState, useEffect, useRef, type MouseEvent } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import '../landing.css'
import './faq.css'
import { faqCategories } from './faqs'

export default function FAQClient() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const toggle = (key: string) => setOpenKey(openKey === key ? null : key)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    sectionRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const jump = (idx: number) => {
    setActive(idx)
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleGlow = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="faq-page">
      <BlogNav />
      <ScrollReveal />

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="faq-hero-eyebrow">FAQ</p>
          <h1 className="faq-hero-headline">
            <span className="faq-hero-headline-primary">Frequently asked.</span>{' '}
            <span className="faq-hero-headline-muted">Honestly answered.</span>
          </h1>
          <p className="faq-hero-sub">
            Everything about ReCapture &mdash; setup, the AI voice callback, compliance, and billing. No fluff.
          </p>
        </div>
      </section>

      {/* Two-column knowledge base */}
      <div className="faq-layout">
        {/* Category rail */}
        <aside className="faq-rail" aria-label="FAQ categories">
          <div className="faq-rail-sticky">
            {faqCategories.map((cat, i) => (
              <button
                key={i}
                className={`faq-rail-item ${active === i ? 'is-active' : ''}`}
                onClick={() => jump(i)}
              >
                <span className="faq-rail-name">{cat.name}</span>
                <span className="faq-rail-count">{cat.faqs.length}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Accordions */}
        <div className="faq-content">
          {faqCategories.map((cat, catIdx) => (
            <section
              key={catIdx}
              className="faq-cat"
              data-idx={catIdx}
              ref={(el) => {
                sectionRefs.current[catIdx] = el
              }}
            >
              <h2 className="faq-cat-title">
                <span className="faq-cat-title-bar" />
                {cat.name}
              </h2>
              <div className="faq-list">
                {cat.faqs.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`
                  const isOpen = openKey === key
                  return (
                    <div
                      key={key}
                      className={`faq-item ${isOpen ? 'is-open' : ''}`}
                      onMouseMove={handleGlow}
                    >
                      <button
                        className="faq-q"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-chevron" aria-hidden="true">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap">
                        <div className="faq-a-inner">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="faq-cta">
        <div className="faq-cta-inner">
          <h2 className="faq-cta-headline">Still have questions?</h2>
          <p className="faq-cta-sub">
            Book a 15-minute demo and we&rsquo;ll walk through your specific setup.
          </p>
          <div className="faq-cta-actions">
            <a
              href="https://cal.com/userecapture"
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta-primary"
            >
              Book a demo
            </a>
            <Link href="/signup" className="faq-cta-secondary">
              Start your 7-day free trial
            </Link>
          </div>
        </div>
      </section>

      <RelatedPages page="faq" />
      <Footer />
    </div>
  )
}
