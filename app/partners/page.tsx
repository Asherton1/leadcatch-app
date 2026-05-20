'use client'

import { useState } from 'react'

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    agency: '',
    email: '',
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
            <span className="canon-hero-headline-primary">For agencies running ads </span>
            <span className="canon-hero-headline-muted">for high-ticket service businesses.</span>
          </h1>
        </div>
      </section>

      {/* The Pitch */}
      <section className="partners-pitch">
        <p className="partners-pitch-body">
          You drive paid traffic to your clients&rsquo; sites. <strong>60&ndash;70% of that traffic abandons the form before submitting.</strong> The lead never makes it to the CRM. The ad spend never shows attribution. The client never knows.
        </p>
        <p className="partners-pitch-body">
          ReCapture catches those leads in real time. <strong>You get the credit. And 20% of every dollar.</strong>
        </p>
      </section>

      {/* The Number Moment */}
      <section className="partners-number">
        <div className="partners-number-num">20%</div>
        <p className="partners-number-caption">Recurring on every install. Monthly.</p>
        <p className="partners-number-sub">
          No expiration. No clawback. No cap. As long as your clients pay, you earn &mdash; for the life of the account.
        </p>
      </section>

      {/* The Offer */}
      <section className="partners-rows">
        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Rev Share</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            20% of monthly recurring revenue, paid out monthly via ACH or Stripe. <strong>You don&rsquo;t handle billing, refunds, or churn &mdash; I do.</strong> Every client who signs through your link pays ReCapture directly, and your commission lands the following cycle.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">White-Label</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Your branding on the client dashboard. Your name on the recovery emails. Your domain on the portal. <strong>ReCapture stays invisible if you want it to.</strong> Available to partners with three or more active accounts.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">Founder-Led Onboarding</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            I personally install the tracking script and configure your first three client accounts. <strong>No support queue. No tier-1 deflection.</strong> You learn the system by watching me set it up live.
          </p>
        </div>

        <div className="partners-row">
          <div className="partners-row-head">
            <p className="partners-row-name">No Commitment</p>
          </div>
          <div className="partners-row-divider" />
          <p className="partners-row-desc">
            Zero monthly fee to be a partner. No minimum client count. No annual contract. <strong>If the program doesn&rsquo;t work for you, you stop selling it.</strong> What you&rsquo;ve already earned stays yours.
          </p>
        </div>
      </section>

      {/* Who this fits */}
      <section className="partners-fit">
        <p className="partners-fit-eyebrow">Who this fits</p>
        <p className="partners-fit-body">
          You&rsquo;re a <strong>boutique agency owner or operator</strong>, somewhere between solo and 30 employees. Your clients are <strong>high-ticket service businesses</strong> &mdash; med spas, plastic surgery, dental groups, fertility, LASIK, cosmetic dermatology, luxury real estate, multifamily leasing. You run their <strong>Meta and Google ads</strong>, and you care about ROAS because their renewal depends on it. You&rsquo;d rather <strong>add a recurring revenue line</strong> than fight for project fees. And you&rsquo;re willing to tell your clients about a tool that makes their numbers better, even if you didn&rsquo;t build it.
        </p>
      </section>

      {/* Apply */}
      <section className="partners-apply">
        <div className="partners-apply-inner">
          <p className="partners-apply-eyebrow">Apply</p>
          <h2 className="partners-apply-headline">Let&rsquo;s see if this fits.</h2>
          <p className="partners-apply-sub">
            15-minute intro call with me directly. No pitch deck. No sales motion.
          </p>

          {status === 'success' ? (
            <div className="partners-success">
              <h3 className="partners-success-headline">Application received.</h3>
              <p className="partners-success-body">
                I&rsquo;ll review it within 24 hours and reach back with calendar windows. Thanks for the interest.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partners-form">
              <div className="partners-field">
                <label className="partners-field-label" htmlFor="name">Name</label>
                <input
                  className="partners-field-input"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="partners-field">
                <label className="partners-field-label" htmlFor="agency">Agency</label>
                <input
                  className="partners-field-input"
                  id="agency"
                  type="text"
                  name="agency"
                  value={formData.agency}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="partners-field">
                <label className="partners-field-label" htmlFor="email">Email</label>
                <input
                  className="partners-field-input"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="partners-field">
                <label className="partners-field-label" htmlFor="message">Anything I should know (optional)</label>
                <textarea
                  className="partners-field-textarea"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {error && <p className="partners-error">{error}</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="partners-submit"
              >
                {status === 'submitting' ? 'Sending...' : 'Apply'}
              </button>

              <p className="partners-footnote">
                No automation. I read every application myself.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
