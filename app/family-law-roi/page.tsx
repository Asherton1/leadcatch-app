'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../landing.css'
import './family-law-roi.css'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString() }
function fmtNum(n: number) { return Math.round(n).toLocaleString() }
function fill(val: number, min: number, max: number) {
  const pct = ((val - min) / (max - min)) * 100
  return { background: `linear-gradient(90deg, #ff6b35 ${pct}%, rgba(255,255,255,0.09) ${pct}%)` }
}

/* Smoothly animates between old and new value */
function useCountUp(target: number, duration = 550) {
  const [display, setDisplay] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const delta = target - from
    if (delta === 0) return
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = from + delta * eased
      setDisplay(val)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

function Money({ value, className }: { value: number; className?: string }) {
  const v = useCountUp(value)
  return <span className={className}>{fmt(v)}</span>
}

function Count({ value, className }: { value: number; className?: string }) {
  const v = useCountUp(value)
  return <span className={className}>{fmtNum(v)}</span>
}

export default function FamilyLawROI() {
  const [monthlyLeads, setMonthlyLeads] = useState(185)
  const [consultBookRate, setConsultBookRate] = useState(40)
  const [showUpRate, setShowUpRate] = useState(80)
  const [retainRate, setRetainRate] = useState(50)
  const [avgCaseValue, setAvgCaseValue] = useState(20000)
  const [abandonmentRate, setAbandonmentRate] = useState(65)
  const [recoveryRate, setRecoveryRate] = useState(10)

  const c = useMemo(() => {
    const consults = monthlyLeads * (consultBookRate / 100)
    const shows = consults * (showUpRate / 100)
    const retained = shows * (retainRate / 100)
    const currentRevenue = retained * avgCaseValue
    const submittedShare = 1 - (abandonmentRate / 100)
    const totalStarts = submittedShare > 0 ? monthlyLeads / submittedShare : monthlyLeads
    const abandoned = totalStarts - monthlyLeads
    const recovered = abandoned * (recoveryRate / 100)
    const recoveredRetained = recovered * (consultBookRate / 100) * (showUpRate / 100) * (retainRate / 100)
    const monthly = recoveredRetained * avgCaseValue
    return {
      consults, shows, retained, currentRevenue, totalStarts, abandoned, recovered, recoveredRetained,
      monthly, annual: monthly * 12, roi: monthly / 394,
    }
  }, [monthlyLeads, consultBookRate, showUpRate, retainRate, avgCaseValue, abandonmentRate, recoveryRate])

  const funnelSteps = [
    { label: 'Leads', value: monthlyLeads },
    { label: 'Consults', value: c.consults },
    { label: 'Show Up', value: c.shows },
    { label: 'Retained', value: c.retained },
  ]

  const funnelSliders = [
    { label: 'Monthly Lead Inquiries', val: monthlyLeads, set: setMonthlyLeads, min: 50, max: 500, step: 5, display: fmtNum(monthlyLeads) },
    { label: 'Booked to Paid Consult', val: consultBookRate, set: setConsultBookRate, min: 10, max: 80, step: 1, display: consultBookRate + '%' },
    { label: 'Consult Show-Up Rate', val: showUpRate, set: setShowUpRate, min: 40, max: 100, step: 1, display: showUpRate + '%' },
    { label: 'Retain the Firm', val: retainRate, set: setRetainRate, min: 20, max: 90, step: 1, display: retainRate + '%' },
    { label: 'Average Case Value', val: avgCaseValue, set: setAvgCaseValue, min: 5000, max: 50000, step: 1000, display: fmt(avgCaseValue) },
  ]

  const leakSliders = [
    { label: 'Form Abandonment Rate', val: abandonmentRate, set: setAbandonmentRate, min: 40, max: 80, step: 1, display: abandonmentRate + '%' },
    { label: 'ReCapture Recovery Rate', val: recoveryRate, set: setRecoveryRate, min: 5, max: 15, step: 1, display: recoveryRate + '%' },
  ]

  const Slider = (s: typeof funnelSliders[0]) => (
    <div className="flr-slider" key={s.label}>
      <div className="flr-slider-head">
        <span className="flr-slider-label">{s.label}</span>
        <span className="flr-slider-value">{s.display}</span>
      </div>
      <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
        onChange={e => s.set(+e.target.value)} style={fill(s.val, s.min, s.max)} />
    </div>
  )

  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    let dir = 1
    let raf: number | null = null

    v.playbackRate = 0.55

    const onEnd = () => {
      dir = -1
      v.pause()
      const step = () => {
        if (dir !== -1 || !v.duration) return
        v.currentTime = Math.max(0, v.currentTime - 0.022)
        if (v.currentTime <= 0.05) {
          dir = 1
          v.play().catch(() => {})
          return
        }
        raf = requestAnimationFrame(step)
      }
      step()
    }

    v.addEventListener('ended', onEnd)
    v.play().catch(() => {})

    return () => {
      v.removeEventListener('ended', onEnd)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="flr-page">
      <div className="flr-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="flr-video"
          src="/family-law-bg.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="flr-video-scrim" />
      </div>
      <div className="flr-noise" aria-hidden="true" />
      <div className="flr-vignette" aria-hidden="true" />

      <BlogNav />

      <div className="flr-container">
        <header className="flr-header">
          <div className="flr-eyebrow">Revenue Recovery Model</div>
          <h1 className="flr-title">Family Law Revenue Recovery Calculator</h1>
          <p className="flr-subtitle">
            Illustrative family-law benchmarks. Adjust any input to match a practice and see what the intake form is costing every month.
          </p>
        </header>

        <div className="flr-grid">
          <section className="flr-panel">
            <div className="flr-panel-head">Your Funnel</div>
            <div className="flr-sliders">{funnelSliders.map(Slider)}</div>
            <div className="flr-panel-head flr-panel-head-alt">The Leak</div>
            <div className="flr-sliders">{leakSliders.map(Slider)}</div>
          </section>

          <section className="flr-panel flr-panel-right">
            <div className="flr-panel-head">Current Monthly Funnel</div>

            <div className="flr-funnel-viz">
              {funnelSteps.map((step, i) => {
                const pct = monthlyLeads > 0 ? (step.value / monthlyLeads) * 100 : 0
                return (
                  <div className="flr-fstep" key={step.label}>
                    <div className="flr-fstep-top">
                      <span className="flr-fstep-label">{step.label}</span>
                      <Count value={step.value} className="flr-fstep-num" />
                    </div>
                    <div className="flr-fstep-track">
                      <div
                        className="flr-fstep-bar"
                        style={{ width: `${Math.max(2, pct)}%`, animationDelay: `${i * 60}ms` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flr-rev-row">
              <Money value={c.currentRevenue} className="flr-rev-value" />
              <span className="flr-rev-label">current monthly revenue</span>
            </div>

            <div className="flr-leak">
              <div className="flr-leak-head">Hidden Leak</div>
              <div className="flr-leak-body">
                <div className="flr-leak-stat">
                  <Count value={c.totalStarts} className="flr-leak-num" />
                  <span className="flr-leak-lbl">Form starts</span>
                </div>
                <div className="flr-leak-divider" />
                <div className="flr-leak-stat">
                  <Count value={c.abandoned} className="flr-leak-num flr-leak-num-red" />
                  <span className="flr-leak-lbl">Abandoned before submitting</span>
                </div>
              </div>
              <p className="flr-leak-note">
                These inquiries never reach the CRM. No missed call, no callback list, no record — they simply do not exist on paper.
              </p>
            </div>
          </section>

          <section className="flr-hero">
            <div className="flr-hero-head">Recovered with ReCapture</div>
            <div className="flr-hero-stats">
              <div className="flr-hero-stat">
                <Money value={c.monthly} className="flr-hero-num" />
                <span className="flr-hero-lbl">Additional revenue / month</span>
              </div>
              <div className="flr-hero-divider" />
              <div className="flr-hero-stat">
                <Money value={c.annual} className="flr-hero-num flr-hero-num-orange" />
                <span className="flr-hero-lbl">Additional revenue / year</span>
              </div>
              <div className="flr-hero-divider" />
              <div className="flr-hero-stat">
                <span className="flr-hero-num flr-hero-num-green">
                  <Count value={c.roi} />×
                </span>
                <span className="flr-hero-lbl">Return on $394 / month</span>
              </div>
            </div>
            <div className="flr-hero-foot">
              <Count value={c.recovered} /> recovered inquiries per month → {c.recoveredRetained.toFixed(1)} additional retained cases
            </div>
          </section>
        </div>

        <p className="flr-note">
          Figures are illustrative family-law benchmarks. Actual results depend on traffic volume, funnel performance, and case mix.
        </p>
      </div>

      <Footer />
    </div>
  )
}
