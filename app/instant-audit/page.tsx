'use client'

import { useState, useEffect, useRef } from 'react'
import '../landing.css'
import './instant-audit.css'

interface AuditResult {
  detectedIndustry: string
  grade: string
  healthScore: number
  totalFields: number
  estAbandonment: number
  monthlyRevenueLost: number
  yearlyRevenueLost: number
}

const LOADING_STEPS = [
  'Fetching your site',
  'Counting form fields',
  'Detecting your industry',
  'Estimating abandonment',
  'Calculating lost revenue',
]

const CAL_LINK = 'https://cal.com/userecapture/demo'

function useCountUp(target: number, active: boolean, duration = 1700) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (!active) { setValue(0); return }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, active, duration])
  return value
}

export default function InstantAuditPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1))
    }, 650)
    return () => clearInterval(interval)
  }, [loading])

  const yearlyCount = useCountUp(result?.yearlyRevenueLost ?? 0, !!result)
  const monthlyCount = useCountUp(result?.monthlyRevenueLost ?? 0, !!result)

  async function handleAnalyze() {
    const trimmed = url.trim()
    if (!trimmed) { setError('Enter your website URL to begin'); return }
    setError('')
    setResult(null)
    setLoading(true)
    setLoadingStep(0)
    try {
      const res = await fetch('/api/form-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed, email: 'preview@userecapture.com', dryRun: true }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError('Could not analyze that URL. Double-check it and try again.')
        setLoading(false)
        return
      }
      setTimeout(() => {
        setResult({
          detectedIndustry: data.detectedIndustry,
          grade: data.grade,
          healthScore: data.healthScore,
          totalFields: data.totalFields,
          estAbandonment: data.estAbandonment,
          monthlyRevenueLost: data.monthlyRevenueLost,
          yearlyRevenueLost: data.yearlyRevenueLost,
        })
        setLoading(false)
      }, 2400)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  function reset() {
    setResult(null)
    setUrl('')
    setError('')
  }

  const gradeColor = result
    ? result.healthScore >= 80 ? '#22c55e' : result.healthScore >= 60 ? '#f59e0b' : '#ef4444'
    : '#ffffff'

  const gradeStatus = result
    ? result.healthScore >= 90 ? 'Excellent'
      : result.healthScore >= 80 ? 'Strong'
      : result.healthScore >= 70 ? 'Above average'
      : result.healthScore >= 60 ? 'Room to grow'
      : result.healthScore >= 50 ? 'Needs work'
      : 'Critical'
    : ''

  return (
    <div className="ia-root">
      <div className="ia-container">

        {!result && !loading && (
          <div className="ia-input-state">
            <p className="ia-eyebrow">Free Form Audit</p>
            <h1 className="ia-headline">
              See exactly what your<br />contact form is costing you.
            </h1>
            <p className="ia-subhead">
              A 60-second, industry-specific analysis of your lead form.
              No email required. Just your URL.
            </p>

            <div className="ia-form">
              <input
                className="ia-input"
                type="url"
                inputMode="url"
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAnalyze() }}
                autoFocus
              />
              <button className="ia-analyze-btn" onClick={handleAnalyze}>
                Analyze My Form
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {error && <p className="ia-error">{error}</p>}

            <div className="ia-trust-row">
              <span className="ia-trust-item"><span className="ia-dot" /> Industry-specific</span>
              <span className="ia-trust-item"><span className="ia-dot" /> Instant results</span>
              <span className="ia-trust-item"><span className="ia-dot" /> No signup</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="ia-loading-state">
            <div className="ia-scanner">
              <div className="ia-scanner-ring" />
              <div className="ia-scanner-ring ia-scanner-ring-2" />
              <div className="ia-scanner-core" />
            </div>
            <div className="ia-loading-steps">
              {LOADING_STEPS.map((step, i) => (
                <p
                  key={i}
                  className={
                    'ia-loading-step' +
                    (i === loadingStep ? ' ia-loading-step-active' : '') +
                    (i < loadingStep ? ' ia-loading-step-done' : '')
                  }
                >
                  {i < loadingStep && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7.5l2.5 2.5L11 4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="ia-results-state">
            <p className="ia-results-eyebrow">Audit Complete</p>

            <div className="ia-grade-block">
              <div className="ia-grade-letter" style={{ color: gradeColor }}>
                {result.grade}
              </div>
              <div className="ia-grade-meta">
                <p className="ia-grade-score">
                  {result.healthScore}<span className="ia-grade-score-max"> / 100</span>
                </p>
                <p className="ia-grade-status" style={{ color: gradeColor }}>{gradeStatus}</p>
                <div className="ia-grade-bar">
                  <div className="ia-grade-bar-fill" style={{ width: result.healthScore + '%', background: gradeColor }} />
                </div>
              </div>
            </div>

            <div className="ia-facts">
              <div className="ia-fact">
                <p className="ia-fact-label">Industry</p>
                <p className="ia-fact-value">{result.detectedIndustry}</p>
              </div>
              <div className="ia-fact">
                <p className="ia-fact-label">Form Fields</p>
                <p className="ia-fact-value">{result.totalFields || '\u2014'}</p>
              </div>
              <div className="ia-fact">
                <p className="ia-fact-label">Est. Abandonment</p>
                <p className="ia-fact-value ia-fact-value-red">{result.estAbandonment}%</p>
              </div>
            </div>

            <div className="ia-reveal">
              <p className="ia-reveal-label">Your forms are losing an estimated</p>
              <p className="ia-reveal-number">${yearlyCount.toLocaleString()}</p>
              <p className="ia-reveal-period">per year</p>
              <p className="ia-reveal-monthly">
                That&apos;s <strong>${monthlyCount.toLocaleString()}</strong> every month walking out the door.
              </p>
            </div>

            <p className="ia-methodology">
              Based on 500 monthly visitors, a 15% form-start rate, and average {result.detectedIndustry} client value.
              Your actual numbers may be higher.
            </p>

            <div className="ia-cta-block">
              <h2 className="ia-cta-headline">Let&apos;s get that revenue back.</h2>
              <p className="ia-cta-sub">
                Book a free 15-minute Recovery Strategy Session. I&apos;ll show you exactly which
                leads you&apos;re losing and the fastest way to recover them &mdash; no pitch, just the plan.
              </p>
              <a className="ia-cta-btn" href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                Book My Recovery Session
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button className="ia-reset" onClick={reset}>Analyze another site</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
