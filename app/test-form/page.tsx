'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

const TOTAL_FIELDS = 5
type FormFields = { name: string; email: string; phone: string; service: string; message: string; website: string }
const EMPTY: FormFields = { name: '', email: '', phone: '', service: '', message: '', website: '' }
function countCompleted(f: FormFields) { const { website, ...real } = f; return Object.values(real).filter(v => v.trim().length > 0).length }

const REVENUE_MAP: Record<string, number> = {
  'medspa': 2800,
  'dental': 1900,
  'plastic-surgery': 6500,
  'dermatology': 2200,
  'wellness': 1600,
  'property-mgmt': 3200,
  'luxury-auto': 8500,
  'real-estate': 12000,
  'home-services': 1400,
  'legal': 4500,
  'other': 2000,
}

const INDUSTRY_LABELS: Record<string, string> = {
  'medspa': 'Med Spa',
  'dental': 'Dental Practice',
  'plastic-surgery': 'Plastic Surgery',
  'dermatology': 'Dermatology',
  'wellness': 'Wellness Clinic',
  'property-mgmt': 'Property Management',
  'luxury-auto': 'Luxury Auto',
  'real-estate': 'Real Estate',
  'home-services': 'Home Services',
  'legal': 'Legal Services',
  'other': 'Other',
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  if (parts[0]?.length > 0) return parts[0][0].toUpperCase()
  return '?'
}

function formatTime() {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${m} ${ampm}`
}

export default function TestForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [captureTime, setCaptureTime] = useState('')
  const [showDashPulse, setShowDashPulse] = useState(false)
  const completed = countCompleted(fields)
  const revenueAtRisk = fields.service ? REVENUE_MAP[fields.service] || 2000 : 0
  const fieldsCapture = completed

  function handleChange(field: keyof FormFields, value: string) {
    setFields(prev => ({ ...prev, [field]: value }))
    if (!hasStarted && value.trim().length > 0) {
      setHasStarted(true)
      setCaptureTime(formatTime())
      setShowDashPulse(true)
      setTimeout(() => setShowDashPulse(false), 1500)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (fields.website) return
    if (fields.name.trim().length < 3) return
    const digits = fields.phone.replace(/\D/g, '')
    if (digits.length > 0 && new Set(digits.split('')).size === 1) return
    setLoading(true)
    await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) })
    setLoading(false)
    setSubmitted(true)
  }

  const dashActive = hasStarted

  return (
    <>
      <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <BlogNav />

        {/* Hero */}
        <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Demo</p>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>See ReCapture in Action</h1>
            <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Start typing in the form. Watch the dashboard update with your data in real time — before you ever hit submit.</p>
          </div>
        </div>

        {/* Main Content — Form + Live Dashboard */}
        <div className="demo-split" style={{ maxWidth: '1140px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>

          {/* LEFT: Form */}
          <div className="demo-form-col">
            {!submitted ? (
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>Try It Yourself</h2>
                <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.75rem' }}>Type anything — real or fake. Watch the dashboard update live.</p>

                {/* Progress bar */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    <span>Fields captured</span>
                    <span style={{ color: '#ff6b35', fontWeight: 700 }}>{completed} / {TOTAL_FIELDS}</span>
                  </div>
                  <div style={{ height: 4, background: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b35, #ff8f5e)', borderRadius: 2, transition: 'width 0.3s ease', width: `${(completed / TOTAL_FIELDS) * 100}%` }} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="demo-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Full Name</label>
                      <input type="text" name="name" placeholder="Jane Smith" value={fields.name} onChange={e => handleChange('name', e.target.value)} autoComplete="off" style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Email Address</label>
                      <input type="email" name="email" placeholder="jane@example.com" value={fields.email} onChange={e => handleChange('email', e.target.value)} autoComplete="off" style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div className="demo-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Phone Number</label>
                      <input type="tel" name="phone" placeholder="(214) 555-0100" value={fields.phone} onChange={e => handleChange('phone', e.target.value)} autoComplete="off" style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Business Type</label>
                      <select name="service" value={fields.service} onChange={e => handleChange('service', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: fields.service ? '#fff' : '#666', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none' as const }}>
                        <option value="">Select your industry…</option>
                        <option value="medspa">Med Spa</option>
                        <option value="dental">Dental Practice</option>
                        <option value="plastic-surgery">Plastic Surgery</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="wellness">Wellness / Health Clinic</option>
                        <option value="property-mgmt">Property Management</option>
                        <option value="luxury-auto">Luxury Auto</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="home-services">Home Services</option>
                        <option value="legal">Legal Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Message <span style={{ fontWeight: 400, color: '#444', textTransform: 'none' }}>(optional)</span></label>
                    <textarea name="message" rows={3} placeholder="Tell us about your business…" value={fields.message} onChange={e => handleChange('message', e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' as const, lineHeight: 1.5 }} />
                  </div>
                  {/* Honeypot */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                    <input type="text" name="website" autoComplete="off" value={fields.website} onChange={e => handleChange('website', e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading} style={{ padding: '0.875rem', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,107,53,0.25)', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>
                    {loading ? 'Submitting…' : 'Request a Demo'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '3rem 2.5rem', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Demo Request Received</h2>
                <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9rem' }}>We&apos;ll be in touch within 24 hours. In the meantime, look at the dashboard to the right — that&apos;s your data, captured before you ever hit submit.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/" style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 8, color: '#bbb', textDecoration: 'none', fontSize: '0.875rem' }}>Back to Home</Link>
                  <Link href="/start-trial" style={{ padding: '0.75rem 1.5rem', background: '#ff6b35', border: 'none', borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Start Free Trial</Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Dashboard */}
          <div className="demo-dash-col">
            <div style={{
              background: '#111',
              border: dashActive ? '1px solid rgba(255,107,53,0.3)' : '1px solid #1e1e1e',
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
              boxShadow: dashActive ? '0 0 40px rgba(255,107,53,0.08)' : 'none',
            }}>
              {/* Dashboard top bar */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dashActive ? '#10b981' : '#333', transition: 'background 0.4s ease', boxShadow: dashActive ? '0 0 8px rgba(16,185,129,0.5)' : 'none' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: dashActive ? '#10b981' : '#444', transition: 'color 0.4s ease', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {dashActive ? 'Live Tracking' : 'Waiting for Input'}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#444', fontWeight: 500 }}>ReCapture Dashboard</span>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderRight: '1px solid #1a1a1a' }}>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>Abandoned Leads</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: dashActive ? '#fff' : '#333', transition: 'color 0.4s ease' }}>{dashActive ? '1' : '0'}</div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', borderRight: '1px solid #1a1a1a' }}>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>Revenue at Risk</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: dashActive && revenueAtRisk > 0 ? '#ff6b35' : '#333', transition: 'color 0.4s ease' }}>
                    {dashActive && revenueAtRisk > 0 ? `$${revenueAtRisk.toLocaleString()}` : '$0'}
                  </div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.5rem' }}>Fields Captured</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: dashActive ? '#fff' : '#333', transition: 'color 0.4s ease' }}>{dashActive ? fieldsCapture : 0}<span style={{ fontSize: '0.875rem', color: '#555', fontWeight: 500 }}> / 5</span></div>
                </div>
              </div>

              {/* Lead row */}
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Captured Leads</span>
                  {dashActive && (
                    <span style={{ background: 'rgba(255,107,53,0.12)', color: '#ff6b35', padding: '0.2rem 0.6rem', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700 }}>1 NEW</span>
                  )}
                </div>

                {!dashActive ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1a1a1a', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
                    </div>
                    <p style={{ color: '#444', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>Start typing in the form to see<br />your data appear here in real time</p>
                  </div>
                ) : (
                  <div style={{
                    background: '#0d0d0d',
                    border: '1px solid #1a1a1a',
                    borderRadius: 12,
                    padding: '1.25rem',
                    animation: showDashPulse ? 'dashPulse 1.5s ease' : 'none',
                  }}>
                    {/* Lead card header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff6b35, #e85d2c)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                      }}>
                        {fields.name.trim() ? getInitials(fields.name) : '?'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
                          {fields.name.trim() || 'Unknown Visitor'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#555' }}>
                          Captured at {captureTime}
                        </div>
                      </div>
                      <div style={{
                        padding: '0.25rem 0.6rem',
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 6,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Abandoned
                      </div>
                    </div>

                    {/* Lead data grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div style={{ background: '#111', borderRadius: 8, padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Email</div>
                        <div style={{ fontSize: '0.8rem', color: fields.email.trim() ? '#fff' : '#333', fontWeight: 500, wordBreak: 'break-all' }}>
                          {fields.email.trim() || '—'}
                        </div>
                      </div>
                      <div style={{ background: '#111', borderRadius: 8, padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Phone</div>
                        <div style={{ fontSize: '0.8rem', color: fields.phone.trim() ? '#fff' : '#333', fontWeight: 500 }}>
                          {fields.phone.trim() || '—'}
                        </div>
                      </div>
                      <div style={{ background: '#111', borderRadius: 8, padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Industry</div>
                        <div style={{ fontSize: '0.8rem', color: fields.service ? '#fff' : '#333', fontWeight: 500 }}>
                          {fields.service ? INDUSTRY_LABELS[fields.service] : '—'}
                        </div>
                      </div>
                      <div style={{ background: '#111', borderRadius: 8, padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Est. Value</div>
                        <div style={{ fontSize: '0.8rem', color: revenueAtRisk > 0 ? '#ff6b35' : '#333', fontWeight: 700 }}>
                          {revenueAtRisk > 0 ? `$${revenueAtRisk.toLocaleString()}` : '—'}
                        </div>
                      </div>
                    </div>

                    {/* Message if present */}
                    {fields.message.trim() && (
                      <div style={{ marginTop: '0.75rem', background: '#111', borderRadius: 8, padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Message</div>
                        <div style={{ fontSize: '0.8rem', color: '#aaa', fontWeight: 400, lineHeight: 1.5 }}>
                          {fields.message}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dashboard footer */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#333' }}>
                  {dashActive ? 'This is what your dashboard looks like when a lead abandons your form.' : ''}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#333' }}>userecapture.com</span>
              </div>
            </div>

            {/* CTA below dashboard */}
            {dashActive && (
              <div style={{
                marginTop: '1.25rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,107,53,0.04)',
                border: '1px solid rgba(255,107,53,0.12)',
                borderRadius: 12,
                textAlign: 'center',
              }}>
                <p style={{ color: '#bbb', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                  <strong style={{ color: '#ff6b35' }}>That&apos;s a captured lead.</strong> Without ReCapture, this person would have vanished without a trace.
                </p>
                <Link href="/start-trial" style={{
                  display: 'inline-block',
                  padding: '0.625rem 1.5rem',
                  background: '#ff6b35',
                  color: '#fff',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  Start Your 7-Day Trial
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 2rem 4rem', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 12, padding: '2.5rem' }}>
            <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>How many leads are your forms losing?</h3>
            <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>One script tag. 60-second setup. See your first captured lead within 48 hours.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/start-trial" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Start Free Trial</Link>
              <Link href="/compare" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Compare Plans</Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <style jsx>{`
        .demo-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .demo-dash-col {
          position: sticky;
          top: 100px;
        }
        @keyframes dashPulse {
          0% { box-shadow: 0 0 0 0 rgba(255,107,53,0.3); }
          50% { box-shadow: 0 0 20px 4px rgba(255,107,53,0.15); }
          100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); }
        }
        @media (max-width: 900px) {
          .demo-split {
            grid-template-columns: 1fr !important;
          }
          .demo-form-row {
            grid-template-columns: 1fr !important;
          }
          .demo-dash-col {
            position: static !important;
          }
        }
      `}</style>
    </>
  )
}
