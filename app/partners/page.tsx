'use client'

import { useState } from 'react'

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    role: '',
    email: '',
    phone: '',
    clientCount: '',
    verticals: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.agency || !formData.email) {
      setError('Name, agency, and email are required.')
      return
    }
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/partners/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  return (
    <main className="landing">
      {/* Hero */}
      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Partner Program</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Built for agencies running ads </span>
            <span className="canon-hero-headline-muted">for high-ticket service businesses.</span>
          </h1>
          <p className="canon-hero-sub">
            Capture every lead your clients&apos; forms lose. Earn 20% recurring on every install.
          </p>
        </div>
      </section>

      {/* Six pillars */}
      <section className="pricing-baseline revealed">
        <div className="pricing-baseline-inner">
          <p className="pricing-baseline-eyebrow">The Program</p>
          <h2 className="pricing-baseline-headline">Six reasons agencies sign up &mdash; and stay.</h2>
          <div className="pricing-baseline-grid">
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">20% Recurring Rev Share</h3>
              <p className="pricing-baseline-desc">
                On every active client account, paid monthly. No expiration. No clawback. As long as they pay, you earn.
              </p>
            </div>
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">White-Label Option</h3>
              <p className="pricing-baseline-desc">
                Your branding on the dashboard, your name on recovery emails. ReCapture stays invisible if you want.
              </p>
            </div>
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">Direct Founder Access</h3>
              <p className="pricing-baseline-desc">
                Questions come straight to me, not a support queue. You&apos;re a partner, not a ticket.
              </p>
            </div>
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">Sticky Retainers</h3>
              <p className="pricing-baseline-desc">
                Clients don&apos;t churn when you&apos;re recovering leads they didn&apos;t know they had. Recovered revenue becomes your proof of value.
              </p>
            </div>
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">Better ROAS Story</h3>
              <p className="pricing-baseline-desc">
                Same ad spend, more captured leads, stronger monthly reports. The recovery shows up as your win.
              </p>
            </div>
            <div className="pricing-baseline-cell">
              <h3 className="pricing-baseline-title">First Three On Me</h3>
              <p className="pricing-baseline-desc">
                I install and onboard your first three client accounts myself. You learn the system without burning hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Fits */}
      <section className="lc-section">
        <p className="section-label">Who This Fits</p>
        <h2 className="section-title">For boutique agencies who actually drive client revenue.</h2>
        <p className="section-subtitle">
          ReCapture isn&apos;t a fit for every agency. It IS a fit if you check most of these boxes.
        </p>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'left', padding: '0 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff6b35', fontWeight: 700 }}>&mdash;</span>
              <span style={{ color: '#ccc', lineHeight: 1.6 }}>You serve high-ticket service businesses (med spas, plastic surgery, dental, multifamily leasing, luxury real estate, fertility, LASIK, cosmetic dermatology).</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff6b35', fontWeight: 700 }}>&mdash;</span>
              <span style={{ color: '#ccc', lineHeight: 1.6 }}>You run paid media (Meta, Google, programmatic) and care about ROAS reporting.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff6b35', fontWeight: 700 }}>&mdash;</span>
              <span style={{ color: '#ccc', lineHeight: 1.6 }}>Agency size: solo to ~30 employees. We work with operators, not holdcos.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff6b35', fontWeight: 700 }}>&mdash;</span>
              <span style={{ color: '#ccc', lineHeight: 1.6 }}>You&apos;d rather add a recurring revenue line than fight for one-off project fees.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff6b35', fontWeight: 700 }}>&mdash;</span>
              <span style={{ color: '#ccc', lineHeight: 1.6 }}>Your clients know what form abandonment costs them &mdash; or are open to seeing the numbers.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <div className="pricing-faq-inner">
          <p className="pricing-faq-eyebrow">FAQ</p>
          <h2 className="pricing-faq-headline">Common questions from agency owners.</h2>
          <div className="pricing-faq-list">
            <FaqItem
              q="How does the 20% rev share actually work?"
              a="Every client account that signs up through your link or referral pays ReCapture directly. We send you a 20% commission on the monthly recurring revenue, paid out monthly via ACH or Stripe. You don't handle billing, refunds, or churn — we do."
            />
            <FaqItem
              q="What happens if a client churns?"
              a="You stop earning on that account when they cancel. There's no clawback for past months and no penalty. Most ReCapture accounts don't churn because they're capturing leads the client didn't know they had — but if they do, you keep what you've already been paid."
            />
            <FaqItem
              q="Can I white-label the dashboard and emails?"
              a="Yes. White-label includes the client portal (your logo, your colors, your domain), the recovery emails (your client's branding, your agency referenced as the implementer), and the optional Ai concierge phone line under a number you control."
            />
            <FaqItem
              q="Who handles client support?"
              a="For the first three client accounts, I handle implementation and support directly so your team learns by watching. After that, you can either keep me on as the technical layer, or your team handles tier-1 support and escalates technical issues to me."
            />
            <FaqItem
              q="What's the minimum commitment?"
              a="Zero. There's no minimum number of clients, no monthly fee to be a partner, no annual contract. If the program doesn't work for you, you stop selling it. We just don't claw back what you've already earned."
            />
            <FaqItem
              q="Can I demo it before pitching to clients?"
              a="Yes. Every approved partner gets a fully-functional sandbox account they can use to demo the dashboard, recovery emails, and Ai concierge to prospects. Free, no time limit."
            />
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="lc-section" id="apply" style={{ paddingTop: '3rem' }}>
        <p className="section-label">Apply</p>
        <h2 className="section-title">Let&apos;s see if this fits.</h2>
        <p className="section-subtitle">
          15-minute intro call with me directly. No pitch deck, no sales motion. Just a conversation to see if it makes sense for both sides.
        </p>

        {status === 'success' ? (
          <div style={{ maxWidth: 560, margin: '2rem auto', textAlign: 'center', background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '1rem', padding: '3rem 2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Application received.</h3>
            <p style={{ fontSize: '0.9375rem', color: '#888', lineHeight: 1.6, margin: 0 }}>
              I&apos;ll review it within 24 hours and reach out with calendar windows for an intro call. Thanks for the interest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField label="Name *" name="name" value={formData.name} onChange={handleChange} required />
              <FormField label="Agency *" name="agency" value={formData.agency} onChange={handleChange} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField label="Role" name="role" value={formData.role} onChange={handleChange} />
              <FormField label="Client count" name="clientCount" value={formData.clientCount} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
            <FormField label="Primary verticals (med spa, dental, real estate, etc.)" name="verticals" value={formData.verticals} onChange={handleChange} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Anything else</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                style={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9375rem', fontFamily: 'inherit', resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
                placeholder="What&apos;s interesting about this for your agency?"
              />
            </div>

            {error && <p style={{ color: '#f87171', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{ background: '#ff6b35', color: '#000', fontWeight: 700, padding: '0.875rem', borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', opacity: status === 'submitting' ? 0.5 : 1, marginTop: '0.5rem', fontFamily: 'inherit' }}
            >
              {status === 'submitting' ? 'Sending...' : 'Apply for the Partner Program'}
            </button>

            <p style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center', margin: '0.5rem 0 0' }}>
              No automation. I read every application myself and reply personally.
            </p>
          </form>
        )}
      </section>
    </main>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9375rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
      />
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'pricing-faq-item' + (open ? ' pricing-faq-item-open' : '')}>
      <button type="button" className="pricing-faq-trigger" onClick={() => setOpen(!open)}>
        {q}
        <span className="pricing-faq-icon">+</span>
      </button>
      <div className="pricing-faq-answer">
        <p className="pricing-faq-answer-text">{a}</p>
      </div>
    </div>
  )
}
