'use client'

import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

const TOTAL_FIELDS = 5
type FormFields = { name: string; email: string; phone: string; service: string; message: string }
const EMPTY: FormFields = { name: '', email: '', phone: '', service: '', message: '' }
function countCompleted(f: FormFields) { return Object.values(f).filter(v => v.trim().length > 0).length }

export default function TestForm() {
  const router = useRouter()
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

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.logoWrap}><span style={s.logoText}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span></span></div>
        <div style={s.card}>
          <h2 style={s.successTitle}><span style={{ color: '#10b981' }}>✓</span> Request Received</h2>
          <p style={s.successText}>We've received your request and will be in touch within 24 hours. Unlike traditional CRMs that only track completed submissions, ReCapture captures the leads your business never knew existed — turning silent abandonment into recovered revenue.</p>
          <button style={s.resetBtn} onClick={() => { setFields(EMPTY); setSubmitted(false) }}>Submit another</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script src="https://userecapture.com/track.js?key=esd_1ab9b0af-2401-4f0e-81f9-77ec683c7afb" strategy="afterInteractive" />
      <div style={s.page}>
        <div style={s.logoWrap}><span style={s.logoText}>
            <span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span></span></span></div>
        <div style={s.card}>
          <button style={s.closeBtn} onClick={() => router.push('/')}>✕</button>
          <div style={s.cardHeader}>
            <h1 style={s.title}>Request a Demo</h1>
            <p style={s.subtitle}>See how much revenue you&apos;re losing to form abandonment</p>
          </div>
          <div style={s.progressWrap}>
            <div style={s.progressMeta}>
              <span style={s.progressLabel}>Fields completed</span>
              <span style={s.progressCount}>{completed} / {TOTAL_FIELDS}</span>
            </div>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: `${(completed / TOTAL_FIELDS) * 100}%` }} />
            </div>
          </div>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} type="text" name="name" placeholder="Jane Smith" value={fields.name} onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Email Address</label>
              <input style={s.input} type="email" name="email" placeholder="jane@example.com" value={fields.email} onChange={e => handleChange('email', e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Phone Number</label>
              <input style={s.input} type="tel" name="phone" placeholder="(214) 555-0100" value={fields.phone} onChange={e => handleChange('phone', e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Business Type</label>
              <select style={s.select} name="service" value={fields.service} onChange={e => handleChange('service', e.target.value)}>
                <option value="">Select your industry…</option>
                <option value="medspa">Med Spa</option>
                <option value="dental">Dental Practice</option>
                <option value="plastic-surgery">Plastic Surgery</option>
                <option value="wellness">Wellness / Health Clinic</option>
                <option value="legal">Legal Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Message <span style={s.optional}>(optional)</span></label>
              <textarea style={s.textarea} name="message" rows={4} placeholder="Tell us about your business and what you're looking to improve…" value={fields.message} onChange={e => handleChange('message', e.target.value)} />
            </div>
            <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
              {loading ? 'Submitting…' : 'Request Demo →'}
            </button>
          </form>
          <p style={s.hint}>🧪 <strong>Demo hint:</strong> Fill 3+ fields then close or navigate away — it will appear as a partial submission in your <a href="/dashboard" style={s.hintLink}>Recapture dashboard</a>.</p>
        </div>
      </div>
    </>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", WebkitFontSmoothing: 'antialiased' },
  logoWrap: { marginBottom: '1.75rem' },
  logoText: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' },
  card: { position: 'relative', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '520px' },
  closeBtn: { position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#666', fontSize: '1rem', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' },
  cardHeader: { marginBottom: '1.5rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem', letterSpacing: '-0.02em' },
  subtitle: { fontSize: '0.875rem', color: '#555555', lineHeight: 1.5 },
  progressWrap: { marginBottom: '2rem' },
  progressMeta: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  progressLabel: { fontSize: '0.75rem', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 },
  progressCount: { fontSize: '0.75rem', color: '#ff6b35', fontWeight: 700 },
  progressTrack: { height: '6px', background: '#111111', borderRadius: '3px', overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #ff6b35, #4a9eff)', borderRadius: '3px', transition: 'width 0.3s ease' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600, color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '0.05em' },
  optional: { fontWeight: 400, color: '#737373', textTransform: 'none', letterSpacing: 0 },
  input: { padding: '0.75rem 1rem', background: '#111111', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#ffffff', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' },
  select: { padding: '0.75rem 1rem', background: '#111111', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#ffffff', outline: 'none', fontFamily: 'inherit', cursor: 'pointer', appearance: 'none' },
  textarea: { padding: '0.75rem 1rem', background: '#111111', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 },
  submitBtn: { marginTop: '0.5rem', padding: '0.875rem', background: '#ff6b35', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)' },
  successTitle: { fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  successText: { color: '#737373', marginBottom: '1.5rem' },
  resetBtn: { padding: '0.625rem 1.25rem', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', color: '#b3b3b3' },
  hint: { marginTop: '1.5rem', fontSize: '0.8125rem', color: '#737373', lineHeight: 1.6 },
  hintLink: { color: '#ff6b35', textDecoration: 'none' },
}
