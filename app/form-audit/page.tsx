'use client'

import { useState } from 'react'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'

export default function FormAuditPage() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!url || !email) return
    try {
      await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Form Audit Request',
          email: email,
          website: url,
          message: 'Free Form Audit requested for: ' + url + ' — send report to: ' + email,
        }),
      })
    } catch {}
    setSubmitted(true)
  }

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <BlogNav />

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '10rem 2rem 4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', color: '#ff6b35', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Free Tool</p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem' }}>
          How Many Leads Is Your Form <span style={{ color: '#ff6b35' }}>Losing</span>?
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 3rem' }}>
          Enter your website URL and we will audit your forms for abandonment risk, mobile UX issues, field count optimization, and projected revenue loss. Free, no obligation.
        </p>

        {!submitted ? (
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  background: '#111',
                  border: '1px solid #333',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  width: '100%',
                }}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: '#111',
                  border: '1px solid #333',
                  borderRadius: '0.5rem',
                  padding: '0.875rem 1rem',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  width: '100%',
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  background: '#ff6b35',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                Audit My Forms
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#555' }}>Takes 24-48 hours. You will receive a detailed PDF report via email.</p>
          </div>
        ) : (
          <div style={{ background: '#111', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '1rem', padding: '2.5rem', maxWidth: 480, margin: '0 auto' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', display: 'block' }}><path d="M20 6L9 17l-5-5"/></svg>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Audit Request Received</h2>
            <p style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.7 }}>We are analyzing <strong style={{ color: '#ff6b35' }}>{url}</strong> now. You will receive your personalized Form Audit Report within 24-48 hours.</p>
          </div>
        )}
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem', letterSpacing: '-0.02em' }}>What Your Audit Covers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'Form Field Count', desc: 'Are you asking too many questions? Fewer fields = more completions.' },
            { title: 'Mobile UX', desc: 'How your forms look and function on mobile devices where 60%+ of traffic comes from.' },
            { title: 'Load Speed', desc: 'Slow forms lose leads. We measure how fast your forms render.' },
            { title: 'Error Handling', desc: 'Do your forms show clear error messages or silently frustrate visitors?' },
            { title: 'Abandonment Estimate', desc: 'Projected drop-off rate based on your form complexity and industry benchmarks.' },
            { title: 'Revenue Impact', desc: 'Estimated monthly revenue you are losing to form abandonment.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
