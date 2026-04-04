'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { supabase } from '@/lib/supabase'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

const CARD_OPTIONS = {
  style: {
    base: { fontSize: '16px', color: '#ffffff', fontFamily: "'Inter', system-ui, sans-serif", fontSmoothing: 'antialiased', '::placeholder': { color: '#555555' } },
    invalid: { color: '#ff6b35' },
  },
  hidePostalCode: true,
}

const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function SignupPage() {
  return <Elements stripe={stripePromise}><SignupForm /></Elements>
}

function SignupForm() {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cardError, setCardError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setError(''); setCardError(''); setLoading(true)
    const { data, error: authErr } = await supabase.auth.signUp({
      email, password,
      options: { data: { first_name: firstName.trim(), last_name: lastName.trim(), company_name: companyName.trim() || null } },
    })
    if (authErr) { setError(authErr.message); setLoading(false); return }
    const session = data.session
    const cardElement = elements.getElement(CardElement)
    if (!cardElement) { setError('Card element not found — please refresh and try again.'); setLoading(false); return }
    const { paymentMethod, error: pmErr } = await stripe.createPaymentMethod({
      type: 'card', card: cardElement,
      billing_details: { name: `${firstName} ${lastName}`.trim(), email },
    })
    if (pmErr) { setCardError(pmErr.message ?? 'Invalid card details.'); setLoading(false); return }
    const setupRes = await fetch('/api/stripe/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: session?.access_token, paymentMethodId: paymentMethod.id, firstName: firstName.trim(), lastName: lastName.trim(), companyName: companyName.trim() || null }),
    })
    if (!setupRes.ok) { const json = await setupRes.json().catch(() => ({})); console.error('[signup] setup failed:', json.error) }
    router.replace('/get-started')
  }

  return (
    <div style={s.page}>
      <div style={s.logoWrap}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg>
            <span><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span></span></span>
        </span>
      </div>
      <div style={s.card}>
        <button style={s.closeBtn} onClick={() => router.push('/')}>✕</button>
        <div style={s.cardHeader}>
          <h1 style={s.title}>Create your account</h1>
          <p style={s.subtitle}>Start your 14-day free trial — no charge today</p>
        </div>
        <form onSubmit={handleSubmit} style={s.form} noValidate>
          <p style={s.sectionLabel}>Your Info</p>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>First Name <span style={s.req}>*</span></label>
              <input style={s.input} type="text" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} required autoFocus />
            </div>
            <div style={s.field}>
              <label style={s.label}>Last Name <span style={s.req}>*</span></label>
              <input style={s.input} type="text" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Company Name <span style={s.optional}>(optional)</span></label>
            <input style={s.input} type="text" placeholder="Acme Med Spa" value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>
          <div style={s.divider} />
          <p style={s.sectionLabel}>Login</p>
          <div style={s.field}>
            <label style={s.label}>Email Address <span style={s.req}>*</span></label>
            <input style={s.input} type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password <span style={s.req}>*</span></label>
            <input style={s.input} type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
          </div>
          <div style={s.divider} />
          <p style={s.sectionLabel}>Payment Method</p>
          <div style={s.field}>
            <label style={s.label}>Card Details <span style={s.req}>*</span></label>
            <div style={s.cardWrap}>
              <CardElement options={CARD_OPTIONS} onChange={e => setCardError(e.error?.message ?? '')} />
            </div>
            {cardError && <span style={s.fieldErr}>{cardError}</span>}
          </div>
          <div style={s.trialBox}>
            <div style={s.trialBoxTop}>
              <span style={s.trialIcon}>🔒</span>
              <span style={s.trialTitle}>Free Trial — No Charge Today</span>
            </div>
            <p style={s.trialSub}>
              Your card will be charged <strong style={s.trialAmount}>$200/month</strong> on <strong style={s.trialAmount}>{trialEndDate}</strong>. Cancel anytime before then and you won&apos;t be billed.
            </p>
          </div>
          {error && <p style={s.errorMsg}>{error}</p>}
          <button type="submit" style={{ ...s.submitBtn, opacity: loading ? 0.65 : 1 }} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>
        <p style={s.footerText}>
          Already have an account?{' '}
          <Link href="/login" style={s.footerLink}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", WebkitFontSmoothing: 'antialiased' },
  logoWrap: { marginBottom: '2rem' },
  card: { position: 'relative', background: '#141414', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '500px' },
  closeBtn: { position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#666', fontSize: '1rem', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' },
  cardHeader: { marginBottom: '1.75rem' },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.02em' },
  subtitle: { fontSize: '0.875rem', color: '#555', lineHeight: 1.5 },
  form: { display: 'flex', flexDirection: 'column', gap: '1.125rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  divider: { height: '1px', background: '#1e1e1e', margin: '0.25rem 0' },
  sectionLabel: { fontSize: '0.6875rem', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '-0.25rem' },
  label: { fontSize: '0.75rem', fontWeight: 600, color: '#777', textTransform: 'uppercase', letterSpacing: '0.08em' },
  req: { color: '#ff6b35', fontWeight: 700 },
  optional: { color: '#444', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' },
  input: { padding: '0.75rem 1rem', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '8px', fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s' },
  cardWrap: { padding: '0.75rem 1rem', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '8px' },
  fieldErr: { fontSize: '0.75rem', color: '#f87171', marginTop: '0.125rem' },
  trialBox: { background: '#161616', borderLeft: '3px solid #ff6b35', borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem' },
  trialBoxTop: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
  trialIcon: { fontSize: '0.9375rem', lineHeight: 1 },
  trialTitle: { fontSize: '0.9375rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' },
  trialSub: { fontSize: '0.8125rem', color: '#666', lineHeight: 1.6 },
  trialAmount: { color: '#ccc', fontWeight: 600 },
  errorMsg: { fontSize: '0.8125rem', color: '#f87171', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '0.625rem 0.875rem', lineHeight: 1.5 },
  submitBtn: { marginTop: '0.375rem', padding: '0.9375rem', background: '#ff6b35', color: '#000', border: 'none', borderRadius: '8px', fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', boxShadow: '0 4px 16px rgba(255,107,53,0.25)', transition: 'opacity 0.2s' },
  footerText: { marginTop: '1.5rem', fontSize: '0.875rem', color: '#484848', textAlign: 'center' },
  footerLink: { color: '#ff6b35', textDecoration: 'none', fontWeight: 600 },
}
