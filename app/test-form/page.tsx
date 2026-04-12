'use client'

import { useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'

const TOTAL_FIELDS = 5
type FormFields = { name: string; email: string; phone: string; service: string; message: string; website: string }
const EMPTY: FormFields = { name: '', email: '', phone: '', service: '', message: '', website: '' }
function countCompleted(f: FormFields) { const { website, ...real } = f; return Object.values(real).filter(v => v.trim().length > 0).length }

export default function TestForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(field: keyof FormFields, value: string) {
    setFields(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    setLoading(false)
    setSubmitted(true)
  }

  const completed = countCompleted(fields)

  return (
    <>
      <Script src="https://userecapture.com/track.js?key=clearph_86a88a7241f8206c217a206f" strategy="afterInteractive" />

      <div style={{ minHeight: '100vh', background: 'linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.92)), url("/hero-bg.jpg") center/cover no-repeat', fontFamily: "'Inter', -apple-system, sans-serif" }}>

        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 36 36">
              <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg>
            <span><span style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>Re</span><span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.25rem' }}>Capture</span></span>
          </Link>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Home</Link>
        </nav>

        {/* Main content */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left side - selling points */}
          <div style={{ paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Demo</p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem' }}>See ReCapture<br />in Action</h1>
            <p style={{ fontSize: '1rem', color: '#888', lineHeight: 1.8, marginBottom: '2.5rem' }}>Fill out the form and watch what happens. Every field you type into is captured in real time — even if you never hit submit. That&apos;s the power of ReCapture.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: '⚡', title: 'Real-Time Capture', desc: 'Names, emails, and phone numbers captured the instant they\'re typed.' },
                { icon: '📊', title: 'Revenue-at-Risk', desc: 'See the dollar value of every lead you\'re losing.' },
                { icon: '✉️', title: 'Automated Recovery', desc: 'Lost leads get follow-up emails automatically — on your behalf.' },
                { icon: '🔌', title: '60-Second Install', desc: 'One script tag. Any website. No developer needed.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.25rem 0' }}>{item.title}</p>
                    <p style={{ color: '#666', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.15)', borderRadius: '10px' }}>
              <p style={{ color: '#bbb', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#ff6b35' }}>Try it yourself:</strong> Start typing in the form, then close this tab without submitting. Your partial data would appear in your ReCapture dashboard — ready for follow-up.
              </p>
            </div>
          </div>

          {/* Right side - form */}
          <div>
            {!submitted ? (
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>Request a Demo</h2>
                <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.75rem' }}>See how much revenue you&apos;re losing to form abandonment</p>

                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Fields completed</span>
                    <span style={{ fontSize: '0.7rem', color: '#ff6b35', fontWeight: 700 }}>{completed} / {TOTAL_FIELDS}</span>
                  </div>
                  <div style={{ height: '4px', background: '#1e1e1e', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b35, #ff8f5e)', borderRadius: '2px', transition: 'width 0.3s ease', width: `${(completed / TOTAL_FIELDS) * 100}%` }} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} type="text" name="name" placeholder="Jane Smith" value={fields.name} onChange={e => handleChange('name', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" name="email" placeholder="jane@example.com" value={fields.email} onChange={e => handleChange('email', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle} type="tel" name="phone" placeholder="(214) 555-0100" value={fields.phone} onChange={e => handleChange('phone', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Business Type</label>
                    <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }} name="service" value={fields.service} onChange={e => handleChange('service', e.target.value)}>
                      <option value="">Select your industry…</option>
                      <option value="medspa">Med Spa</option>
                      <option value="dental">Dental Practice</option>
                      <option value="plastic-surgery">Plastic Surgery</option>
                      <option value="wellness">Wellness / Health Clinic</option>
                      <option value="property-mgmt">Property Management</option>
                      <option value="luxury-auto">Luxury Auto</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="home-services">Home Services</option>
                      <option value="legal">Legal Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message <span style={{ fontWeight: 400, color: '#444', textTransform: 'none' }}>(optional)</span></label>
                    <textarea style={{ ...inputStyle, resize: 'vertical' as const, lineHeight: 1.5 }} name="message" rows={3} placeholder="Tell us about your business…" value={fields.message} onChange={e => handleChange('message', e.target.value)} />
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                    <label>Website</label>
                    <input type="text" name="website" autoComplete="off" value={fields.website} onChange={e => handleChange('website', e.target.value)} />
                  </div>
                  <button type="submit" style={{ padding: '0.875rem', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)', opacity: loading ? 0.6 : 1 }} disabled={loading}>
                    {loading ? 'Submitting…' : 'Request Demo →'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '3rem 2.5rem', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>✓</div>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Request Received</h2>
                <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9rem' }}>We&apos;ll be in touch within 24 hours to walk you through ReCapture and show you exactly how many leads your forms are losing.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/" style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: '8px', color: '#bbb', textDecoration: 'none', fontSize: '0.875rem' }}>Back to Home</Link>
                  <button onClick={() => { setFields(EMPTY); setSubmitted(false) }} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: '8px', color: '#bbb', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}>Submit Another</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 2rem 1.25rem 3rem !important;
          }
          nav {
            padding: 1.25rem 1.5rem !important;
          }
        }
      `}</style>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '0.375rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: '#0a0a0a',
  border: '1px solid #1e1e1e',
  borderRadius: '8px',
  fontSize: '0.9375rem',
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}
