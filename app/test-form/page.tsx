'use client'

import { useEffect, useRef, useState } from 'react'

const API_KEY = 'esd_1ab9b0af-2401-4f0e-81f9-77ec683c7afb'
const TRACK_URL = '/api/track'
const TOTAL_FIELDS = 5

type FormFields = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const EMPTY: FormFields = { name: '', email: '', phone: '', service: '', message: '' }

function getDeviceType() {
  if (typeof navigator === 'undefined') return 'desktop'
  return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

export default function TestForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  // Refs so event listeners always read current values (no stale closure)
  const fieldsRef = useRef<FormFields>(EMPTY)
  const startTimeRef = useRef<number | null>(null)
  const hasInteractedRef = useRef(false)
  const sessionId = useRef(
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  )

  function countCompleted(f: FormFields) {
    return Object.values(f).filter(v => v.trim().length > 0).length
  }

  function buildPayload(f: FormFields) {
    return {
      api_key: API_KEY,
      session_id: sessionId.current,
      name: f.name || null,
      email: f.email || null,
      phone: f.phone || null,
      fields_completed: countCompleted(f),
      total_fields: TOTAL_FIELDS,
      time_on_form: startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : 0,
      device_type: getDeviceType(),
      form_data: f,
    }
  }

  // sendBeacon — reliable on page unload (fires even if the tab closes)
  function sendBeacon(f: FormFields) {
    if (!hasInteractedRef.current) return
    const blob = new Blob([JSON.stringify(buildPayload(f))], { type: 'application/json' })
    navigator.sendBeacon(TRACK_URL, blob)
  }

  // Regular fetch — used for periodic heartbeat while user is active
  async function sendFetch(f: FormFields) {
    if (!hasInteractedRef.current) return
    try {
      await fetch(TRACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(f)),
      })
    } catch {
      // Silently swallow — tracking should never break the form
    }
  }

  function handleChange(field: keyof FormFields, value: string) {
    const updated = { ...fieldsRef.current, [field]: value }
    fieldsRef.current = updated
    setFields(updated)

    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true
      startTimeRef.current = Date.now()
    }
  }

  useEffect(() => {
    // beforeunload — user navigates away, closes tab, etc.
    function onUnload() {
      sendBeacon(fieldsRef.current)
    }

    // visibilitychange — catches mobile tab switching / backgrounding
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        sendBeacon(fieldsRef.current)
      }
    }

    window.addEventListener('beforeunload', onUnload)
    document.addEventListener('visibilitychange', onVisibilityChange)

    // Heartbeat every 15s — captures data even if unload events don't fire
    const heartbeat = setInterval(() => {
      sendFetch(fieldsRef.current)
    }, 15000)

    return () => {
      window.removeEventListener('beforeunload', onUnload)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearInterval(heartbeat)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Send final complete submission
    await sendFetch(fieldsRef.current)
    setSubmitted(true)
  }

  const completed = countCompleted(fields)

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.successIcon}>✓</div>
          <h2 style={s.successTitle}>Request Received</h2>
          <p style={s.successText}>
            Thank you! Our team will reach out within 24 hours.
          </p>
          <button style={s.resetBtn} onClick={() => { setFields(EMPTY); fieldsRef.current = EMPTY; setSubmitted(false) }}>
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.cardHeader}>
          <h1 style={s.title}>Request a Consultation</h1>
          <p style={s.subtitle}>ESD Health — Sleep Diagnostics</p>
        </div>

        {/* Progress indicator (visible so you can verify tracking) */}
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
            <input
              style={s.input}
              type="text"
              placeholder="Jane Smith"
              value={fields.name}
              onChange={e => handleChange('name', e.target.value)}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input
              style={s.input}
              type="email"
              placeholder="jane@example.com"
              value={fields.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Phone Number</label>
            <input
              style={s.input}
              type="tel"
              placeholder="(214) 555-0100"
              value={fields.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Service Interest</label>
            <select
              style={s.select}
              value={fields.service}
              onChange={e => handleChange('service', e.target.value)}
            >
              <option value="">Select a service…</option>
              <option value="sleep-study">Sleep Study / Diagnosis</option>
              <option value="cpap">CPAP Consultation</option>
              <option value="pediatric">Pediatric Sleep</option>
              <option value="insomnia">Insomnia Treatment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={s.field}>
            <label style={s.label}>Message <span style={s.optional}>(optional)</span></label>
            <textarea
              style={s.textarea}
              placeholder="Tell us a bit about what you're experiencing…"
              rows={4}
              value={fields.message}
              onChange={e => handleChange('message', e.target.value)}
            />
          </div>

          <button type="submit" style={s.submitBtn}>
            Request Consultation →
          </button>
        </form>

        {/* Test helper */}
        <p style={s.hint}>
          🧪 <strong>Test hint:</strong> Fill 3+ fields then close or navigate away — it will appear as a partial submission in your{' '}
          <a href="/dashboard" style={s.hintLink}>LeadCatch dashboard</a>.
        </p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '520px',
  },
  cardHeader: { marginBottom: '1.5rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: '0.25rem' },
  subtitle: { fontSize: '0.875rem', color: '#888' },

  progressWrap: { marginBottom: '2rem' },
  progressMeta: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  progressLabel: { fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 },
  progressCount: { fontSize: '0.75rem', color: '#ff6b35', fontWeight: 700 },
  progressTrack: { height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #ff6b35, #4a9eff)', borderRadius: '2px', transition: 'width 0.3s ease' },

  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.875rem', fontWeight: 600, color: '#333' },
  optional: { fontWeight: 400, color: '#aaa' },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    color: '#111',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    color: '#111',
    outline: 'none',
    background: '#fff',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    color: '#111',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  },
  submitBtn: {
    marginTop: '0.5rem',
    padding: '0.875rem',
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  successIcon: { fontSize: '2.5rem', marginBottom: '1rem', color: '#10b981' },
  successTitle: { fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' },
  successText: { color: '#666', marginBottom: '1.5rem' },
  resetBtn: {
    padding: '0.625rem 1.25rem',
    background: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: '#555',
  },

  hint: { marginTop: '1.5rem', fontSize: '0.8125rem', color: '#999', lineHeight: 1.6 },
  hintLink: { color: '#ff6b35', textDecoration: 'none' },
}
