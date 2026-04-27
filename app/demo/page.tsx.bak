'use client'

import { useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

const TOTAL_FIELDS = 5
type FormFields = { name: string; email: string; phone: string; service: string; message: string; website: string }
const EMPTY: FormFields = { name: '', email: '', phone: '', service: '', message: '', website: '' }
function countCompleted(f: FormFields) { const { website, ...real } = f; return Object.values(real).filter(v => v.trim().length > 0).length }

function IconBolt() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> }
function IconChart() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> }
function IconMail() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,7 12,13 2,7" /></svg> }
function IconPlug() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a6 6 0 0 1-6 6v0a6 6 0 0 1-6-6V8Z" /></svg> }
function IconShield() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> }

const features = [
  { Icon: IconBolt, title: 'Real-Time Capture', desc: 'Names, emails, and phone numbers captured the instant they\'re typed — before submit is ever clicked.' },
  { Icon: IconChart, title: 'Revenue-at-Risk Dashboard', desc: 'See the dollar value of every lead you\'re losing each month.' },
  { Icon: IconMail, title: 'Automated Recovery Emails', desc: 'Lost leads get personalized follow-up emails automatically — sent on your behalf.' },
  { Icon: IconPlug, title: '60-Second Install', desc: 'One script tag. Any website. No developer needed.' },
  { Icon: IconShield, title: 'Built for High-Ticket', desc: 'Purpose-built for med spas, dental, luxury real estate, and property management.' },
]

export default function TestForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const completed = countCompleted(fields)

  function handleChange(field: keyof FormFields, value: string) { setFields(prev => ({ ...prev, [field]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <Script src="https://userecapture.com/track.js?key=clearph_86a88a7241f8206c217a206f" strategy="afterInteractive" />
      <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <BlogNav />

        {/* Hero — same spacing as Compare/About */}
        <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Demo</p>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>See ReCapture in Action</h1>
            <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Fill out the form below, then close this tab without submitting. Your partial data would appear in your ReCapture dashboard — that&apos;s real-time form capture.</p>
          </div>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>
          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {features.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,107,53,0.08)', borderRadius: 8, marginTop: 2 }}><item.Icon /></div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.2rem 0' }}>{item.title}</p>
                  <p style={{ color: '#666', fontSize: '0.825rem', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)', borderRadius: 10, marginBottom: '3rem' }}>
            <p style={{ color: '#bbb', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#ff6b35' }}>How it works:</strong> Start typing in the form. Every keystroke is captured in real time. If the visitor leaves without submitting, you still have their info — ready for follow-up.</p>
          </div>

          {/* Form */}
          {!submitted ? (
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>Request a Demo</h2>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.75rem' }}>See how much revenue you&apos;re losing to form abandonment</p>

              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  <span>Fields completed</span>
                  <span style={{ color: '#ff6b35', fontWeight: 700 }}>{completed} / {TOTAL_FIELDS}</span>
                </div>
                <div style={{ height: 4, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b35, #ff8f5e)', borderRadius: 2, transition: 'width 0.3s ease', width: `${(completed / TOTAL_FIELDS) * 100}%` }} />
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="demo-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><label className="demo-lbl" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Full Name</label><input className="demo-inp" type="text" name="name" placeholder="Jane Smith" value={fields.name} onChange={e => handleChange('name', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                  <div><label className="demo-lbl" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Email Address</label><input className="demo-inp" type="email" name="email" placeholder="jane@example.com" value={fields.email} onChange={e => handleChange('email', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                </div>
                <div className="demo-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><label className="demo-lbl" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Phone Number</label><input className="demo-inp" type="tel" name="phone" placeholder="(214) 555-0100" value={fields.phone} onChange={e => handleChange('phone', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                  <div><label className="demo-lbl" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Business Type</label><select name="service" value={fields.service} onChange={e => handleChange('service', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none' as const }}><option value="">Select your industry…</option><option value="medspa">Med Spa</option><option value="dental">Dental Practice</option><option value="plastic-surgery">Plastic Surgery</option><option value="dermatology">Dermatology</option><option value="wellness">Wellness / Health Clinic</option><option value="property-mgmt">Property Management</option><option value="luxury-auto">Luxury Auto</option><option value="real-estate">Real Estate</option><option value="home-services">Home Services</option><option value="legal">Legal Services</option><option value="other">Other</option></select></div>
                </div>
                <div><label className="demo-lbl" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Message <span style={{ fontWeight: 400, color: '#444', textTransform: 'none' }}>(optional)</span></label><textarea name="message" rows={3} placeholder="Tell us about your business…" value={fields.message} onChange={e => handleChange('message', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' as const, lineHeight: 1.5 }} /></div>
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}><input type="text" name="website" autoComplete="off" value={fields.website} onChange={e => handleChange('website', e.target.value)} /></div>
                <button type="submit" disabled={loading} style={{ padding: '0.875rem', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,107,53,0.25)', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Submitting…' : 'Request Demo'}</button>
              </form>
            </div>
          ) : (
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '3rem 2.5rem', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Request Received</h2>
              <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9rem' }}>We&apos;ll be in touch within 24 hours to walk you through ReCapture and show you exactly how many leads your forms are losing.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/" style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 8, color: '#bbb', textDecoration: 'none', fontSize: '0.875rem' }}>Back to Home</Link>
                <button onClick={() => { setFields(EMPTY); setSubmitted(false) }} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 8, color: '#bbb', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}>Submit Another</button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .demo-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
