'use client'

import { useState, useEffect, useRef, useMemo, type MouseEvent } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import '../landing.css'
import './faq.css'
import { faqCategories } from './faqs'

function Highlight({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${esc})`, 'gi'))
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === term.toLowerCase() ? (
          <mark key={i} className="faq-mark">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  )
}

export default function FAQClient() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  const [active, setActive] = useState(0)
  const [query, setQuery] = useState('')
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const searchRef = useRef<HTMLInputElement | null>(null)

  const q = query.trim().toLowerCase()
  const searching = q.length > 0

  const toggle = (key: string) => setOpenKey(openKey === key ? null : key)

  const filtered = useMemo(() => {
    if (!q) return faqCategories
    return faqCategories
      .map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.faqs.length > 0)
  }, [q])

  const resultCount = useMemo(
    () => filtered.reduce((n, c) => n + c.faqs.length, 0),
    [filtered]
  )

  // scroll-spy for the rail (browse mode only)
  useEffect(() => {
    if (searching) return
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
  }, [searching])

  // keyboard: "/" focuses search, Esc clears
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === 'Escape' && tag === 'INPUT') {
        setQuery('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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

          <div className="faq-search">
            <span className="faq-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQ"
            />
            {query ? (
              <button className="faq-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ) : (
              <span className="faq-search-hint" aria-hidden="true">/</span>
            )}
          </div>
        </div>
      </section>

      {searching ? (
        /* ── Search results ── */
        <div className="faq-results">
          <p className="faq-results-count">
            {resultCount === 0
              ? `No matches for “${query}”`
              : `${resultCount} result${resultCount === 1 ? '' : 's'} for “${query}”`}
          </p>

          {resultCount === 0 ? (
            <div className="faq-empty">
              <p>Nothing matched that. The answer might be quicker over a quick call.</p>
              <a href="https://cal.com/userecapture" target="_blank" rel="noopener noreferrer" className="faq-cta-primary">
                Book a 15-min demo
              </a>
            </div>
          ) : (
            filtered.map((cat) => (
              <section className="faq-cat" key={cat.name}>
                <h2 className="faq-cat-title">
                  <span className="faq-cat-title-bar" />
                  {cat.name}
                </h2>
                <div className="faq-list">
                  {cat.faqs.map((faq, i) => (
                    <div className="faq-item is-open faq-item-static" key={i} onMouseMove={handleGlow}>
                      <div className="faq-q faq-q-static">
                        <span className="faq-q-text"><Highlight text={faq.q} term={query} /></span>
                      </div>
                      <div className="faq-a-wrap">
                        <div className="faq-a-inner">
                          <p><Highlight text={faq.a} term={query} /></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      ) : (
        /* ── Browse mode: two-column knowledge base ── */
        <div className="faq-layout">
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
                        <button className="faq-q" onClick={() => toggle(key)} aria-expanded={isOpen}>
                          <span className="faq-q-text">{faq.q}</span>
                          <span className="faq-chevron" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      )}

      {/* CTA */}
      <section className="faq-cta">
        <div className="faq-cta-inner">
          <h2 className="faq-cta-headline">Still have questions?</h2>
          <p className="faq-cta-sub">
            Book a 15-minute demo and we&rsquo;ll walk through your specific setup.
          </p>
          <div className="faq-cta-actions">
            <a href="https://cal.com/userecapture" target="_blank" rel="noopener noreferrer" className="faq-cta-primary">
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
