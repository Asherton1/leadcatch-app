'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Footer from '../../components/Footer'
import '../../landing.css'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [linkInvalid, setLinkInvalid] = useState(false)

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (!hash || !hash.includes('access_token')) {
      setLinkInvalid(true)
      return
    }

    const params = new URLSearchParams(hash.replace(/^#/, ''))
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const type = params.get('type')

    if (type !== 'recovery' || !accessToken || !refreshToken) {
      setLinkInvalid(true)
      return
    }

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error: err }) => {
        if (err) {
          setLinkInvalid(true)
        } else {
          setReady(true)
        }
      })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (err) {
      setError(err.message)
      return
    }

    router.replace('/dashboard')
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

      <div style={s.card}>
        <button style={s.closeBtn} onClick={() => router.push('/login')}>X</button>

        {linkInvalid ? (
          <>
            <div style={s.cardHeader}>
              <h1 style={s.title}>Link expired or invalid</h1>
              <p style={s.subtitle}>This reset link is no longer valid. Request a new one to continue.</p>
            </div>
            <Link href="/forgot-password" style={s.inlineButton}>Request a new link</Link>
          </>
        ) : !ready ? (
          <>
            <div style={s.cardHeader}>
              <h1 style={s.title}>Verifying...</h1>
              <p style={s.subtitle}>One moment while we confirm your reset link.</p>
            </div>
          </>
        ) : (
          <>
            <div style={s.cardHeader}>
              <h1 style={s.title}>Set a new password</h1>
              <p style={s.subtitle}>Choose a strong password you have not used before.</p>
            </div>
            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.field}>
                <label style={s.label}>New Password</label>
                <input
                  style={s.input}
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Confirm Password</label>
                <input
                  style={s.input}
                  type="password"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
              </div>
              {error && <p style={s.errorMsg}>{error}</p>}
              <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}

        <p style={s.footerText}>
          <Link href="/login" style={s.footerLink}>Back to sign in</Link>
        </p>
      </div>
      <Footer />
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", WebkitFontSmoothing: 'antialiased' },
  logoWrap: { marginBottom: '1.75rem' },
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
  inlineButton: { display: 'inline-block', padding: '0.875rem 1.5rem', background: '#ff6b35', color: '#000', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)' },
}
