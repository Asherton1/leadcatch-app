'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureClient, ClientRecord } from '@/lib/provision'

export default function GetStartedPage() {
  const router = useRouter()
  const [client, setClient] = useState<ClientRecord | null>(null)
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/login'); return }
      const record = await ensureClient(session.user.id, session.user.email ?? '')
      setClient(record)
      setAuthed(true)
    })
  }, [router])

  if (authed === null) {
    return <div style={s.page}><div style={s.loadingDot} /></div>
  }

  const scriptTag = client
    ? `<script src="https://userecapture.com/track.js" data-api-key="${client.api_key}"></script>`
    : ''

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(scriptTag)
    } catch {
      const el = document.createElement('textarea')
      el.value = scriptTag
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div style={s.page}>
      <div style={s.logoWrap}>
        <span style={s.logoText}>
            <span><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span></span></span></span></span>
      </div>

      <div style={s.card}>
        <div style={s.successBadge}>
          <span style={s.checkmark}>✓</span>
          Account created
        </div>

        <h1 style={s.heading}>
          You&apos;re All Set!<br />
          <span style={s.headingAccent}>Here&apos;s Your Tracking Script</span>
        </h1>

        <p style={s.subheading}>
          Add this single line of code to your website to start capturing abandoned leads.
        </p>

        <div style={s.codeWrap}>
          <div style={s.codeHeader}>
            <span style={s.codeLabel}>HTML</span>
            <button
              style={{ ...s.copyBtn, ...(copied ? s.copyBtnDone : {}) }}
              onClick={handleCopy}
            >
              {copied
                ? <><span style={s.copyIcon}>✓</span>Copied!</>
                : <><span style={s.copyIcon}>⎘</span>Copy</>}
            </button>
          </div>
          <pre style={s.codeBlock}><code style={s.code}>{scriptTag}</code></pre>
        </div>

        <div style={s.stepsWrap}>
          <p style={s.stepsTitle}>Installation — 3 steps, 2 minutes:</p>
          <ol style={s.steps}>
            <li style={s.step}>
              <span style={s.stepNum}>1</span>
              <span style={s.stepText}><strong style={s.stepStrong}>Copy</strong> the script tag above</span>
            </li>
            <li style={s.step}>
              <span style={s.stepNum}>2</span>
              <span style={s.stepText}>
                <strong style={s.stepStrong}>Paste</strong> it before the closing{' '}
                <code style={s.inlineCode}>&lt;/body&gt;</code> tag on your website
              </span>
            </li>
            <li style={s.step}>
              <span style={s.stepNum}>3</span>
              <span style={s.stepText}>
                <strong style={s.stepStrong}>Done</strong> — leads will appear in your dashboard within minutes
              </span>
            </li>
          </ol>
        </div>

        <Link href="/dashboard" style={s.dashBtn}>Go to Dashboard →</Link>
        <p style={s.skipNote}>You can always find this script again in your dashboard settings.</p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', background: '#0a0a0a', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '3rem 1rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    WebkitFontSmoothing: 'antialiased',
  },
  loadingDot: { width: '8px', height: '8px', background: '#ff6b35', borderRadius: '50%', opacity: 0.4 },
  logoWrap: { marginBottom: '2rem' },
  logoText: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' },
  card: {
    background: '#141414', border: '1px solid #1e1e1e', borderRadius: '16px',
    padding: '2.5rem', width: '100%', maxWidth: '600px',
  },
  successBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)',
    borderRadius: '2rem', padding: '0.375rem 0.875rem', fontSize: '0.75rem',
    fontWeight: 600, color: '#34d399', letterSpacing: '0.04em',
    textTransform: 'uppercase', marginBottom: '1.5rem',
  },
  checkmark: { fontSize: '0.875rem' },
  heading: { fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.75rem' },
  headingAccent: { color: '#ff6b35' },
  subheading: { fontSize: '0.9375rem', color: '#555', lineHeight: 1.65, marginBottom: '2rem' },
  codeWrap: { background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' },
  codeHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.625rem 1rem', borderBottom: '1px solid #1e1e1e', background: '#111',
  },
  codeLabel: { fontSize: '0.6875rem', fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em' },
  copyBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
    background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '5px',
    color: '#888', fontSize: '0.75rem', fontWeight: 600, padding: '0.3rem 0.75rem',
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', letterSpacing: '0.02em',
  },
  copyBtnDone: { borderColor: 'rgba(52,211,153,0.4)', color: '#34d399', background: 'rgba(52,211,153,0.06)' },
  copyIcon: { fontSize: '0.875rem' },
  codeBlock: { margin: 0, padding: '1.25rem', overflowX: 'auto' },
  code: { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.8125rem', color: '#e2e2e2', lineHeight: 1.6, whiteSpace: 'pre' },
  stepsWrap: { background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' },
  stepsTitle: { fontSize: '0.75rem', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.125rem' },
  steps: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 },
  step: { display: 'flex', alignItems: 'flex-start', gap: '0.875rem' },
  stepNum: {
    width: '24px', height: '24px', minWidth: '24px',
    background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)',
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.6875rem', fontWeight: 700, color: '#ff6b35', marginTop: '0.125rem',
  },
  stepText: { fontSize: '0.9375rem', color: '#888', lineHeight: 1.55 },
  stepStrong: { color: '#ccc', fontWeight: 600 },
  inlineCode: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem',
    color: '#ff6b35', background: 'rgba(255,107,53,0.08)', padding: '0.1rem 0.375rem', borderRadius: '3px',
  },
  dashBtn: {
    display: 'block', textAlign: 'center', padding: '0.9375rem', background: '#ff6b35',
    color: '#000', borderRadius: '8px', fontWeight: 700, fontSize: '0.9375rem',
    textDecoration: 'none', boxShadow: '0 4px 16px rgba(255,107,53,0.25)',
    letterSpacing: '-0.01em', marginBottom: '1rem',
  },
  skipNote: { fontSize: '0.8125rem', color: '#333', textAlign: 'center', lineHeight: 1.5 },
}
