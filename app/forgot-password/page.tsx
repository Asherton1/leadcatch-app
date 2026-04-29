'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Footer from '../components/Footer'
import '../landing.css'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/reset`
        : 'https://www.userecapture.com/auth/reset'

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

    setLoading(false)
    if (err) {
      setError(err.message)
      return
    }
    setSent(true)
  }

  return (
    <div style={s.page}>
      <div style={s.logoWrap}>
        <span style={s.logoText}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg>
            <span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span>
          </span>
        </span>
      </div>

      <div style={s.cardWrap}>
      <div style={s.card}>
        <button style={s.closeBtn} onClick={() => router.push('/login')}>✕</button>

        {!sent ? (
          <>
            <div style={s.cardHeader}>
              <h1 style={s.title}>Reset your password</h1>
              <p style={s.subtitle}>Enter your email and we&apos;ll send you a secure reset link.</p>
            </div>
            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.field}>
                <label style={s.label}>Email Address</label>
                <input
                  style={s.input}
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {error && <p style={s.errorMsg}>{error}</p>}
              <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link →'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div style={s.cardHeader}>
              <h1 style={s.title}>Check your email</h1>
              <p style={s.subtitle}>
                We sent a reset link to <strong style={{ color: '#fff' }}>{email}</strong>. The link expires in 1 hour.
              </p>
            </div>
            <p style={s.subtitle}>
              Didn&apos;t get it? Check your spam folder, or{' '}
              <button onClick={() => setSent(false)} style={s.inlineLink}>try a different email</button>.
            </p>
          </>
        )}

        <p style={s.footerText}>
          Remember your password?{' '}
          <Link href="/login" style={s.footerLink}>Back to sign in</Link>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '2.5rem 1rem 0', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", WebkitFontSmoothing: 'antialiased' },
  logoWrap: { marginBottom: '1.75rem' },
  cardWrap: { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '2rem 0' },
  logoText: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' },
  card: { position: 'relative', background: '#141414', border: '1px solid #222222', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '440px' },
  closeBtn: { position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#666', fontSize: '1rem', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' },
  cardHeader: { marginBottom: '2rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem', letterSpacing: '-0.02em' },
  subtitle: { fontSize: '0.875rem', color: '#888', lineHeight: 1.6 },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.75rem', fontWeight: 600, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { padding: '0.75rem 1rem', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#ffffff', outline: 'none', fontFamily: 'inherit' },
  errorMsg: { fontSize: '0.8125rem', color: '#f87171', background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: '6px', padding: '0.625rem 0.875rem', lineHeight: 1.5 },
  submitBtn: { marginTop: '0.25rem', padding: '0.875rem', background: '#ff6b35', color: '#000000', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)' },
  footerText: { marginTop: '1.5rem', fontSize: '0.875rem', color: '#555555', textAlign: 'center' },
  footerLink: { color: '#ff6b35', textDecoration: 'none', fontWeight: 600 },
  inlineLink: { background: 'none', border: 'none', color: '#ff6b35', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', padding: 0 },
}
