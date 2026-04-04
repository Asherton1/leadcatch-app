'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureClient } from '@/lib/provision'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setLoading(false); setError(err.message); return }
    if (data.session) {
      const meta = data.session.user.user_metadata ?? {}
      await ensureClient(data.session.user.id, data.session.user.email ?? email, meta.first_name as string | undefined, meta.last_name as string | undefined, meta.company_name as string | undefined)
    }
    router.replace('/dashboard')
  }

  return (
    <div style={s.page}>
      <div style={s.logoWrap}>
        <span style={s.logoText}><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span>
      </div>
      <div style={s.card}>
        <button style={s.closeBtn} onClick={() => router.push('/')}>✕</button>
        <div style={s.cardHeader}>
          <h1 style={s.title}>Welcome back</h1>
          <p style={s.subtitle}>Sign in to your Recapture dashboard</p>
        </div>
        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={s.errorMsg}>{error}</p>}
          <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
        <p style={s.footerText}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={s.footerLink}>Create one free</Link>
        </p>
      </div>
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
  subtitle: { fontSize: '0.875rem', color: '#555555', lineHeight: 1.5 },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.75rem', fontWeight: 600, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { padding: '0.75rem 1rem', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#ffffff', outline: 'none', fontFamily: 'inherit' },
  errorMsg: { fontSize: '0.8125rem', color: '#f87171', background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: '6px', padding: '0.625rem 0.875rem', lineHeight: 1.5 },
  submitBtn: { marginTop: '0.25rem', padding: '0.875rem', background: '#ff6b35', color: '#000000', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)' },
  footerText: { marginTop: '1.5rem', fontSize: '0.875rem', color: '#555555', textAlign: 'center' },
  footerLink: { color: '#ff6b35', textDecoration: 'none', fontWeight: 600 },
}
