'use client'

import { useState, useMemo } from 'react'
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

  return (
    <div className="flr-page">
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
          {/* LEFT — inputs */}
          <section className="flr-panel">
            <div className="flr-panel-head">Your Funnel</div>
            <div className="flr-sliders">{funnelSliders.map(Slider)}</div>

            <div className="flr-panel-head flr-panel-head-alt">The Leak</div>
            <div className="flr-sliders">{leakSliders.map(Slider)}</div>
          </section>

          {/* RIGHT — current state */}
          <section className="flr-panel flr-panel-right">
            <div className="flr-panel-head">Current Monthly Funnel</div>

            <div className="flr-funnel">
              <div className="flr-funnel-step">
                <span className="flr-funnel-num">{fmtNum(monthlyLeads)}</span>
                <span className="flr-funnel-lbl">Leads</span>
              </div>
              <span className="flr-funnel-arrow">→</span>
              <div className="flr-funnel-step">
                <span className="flr-funnel-num">{fmtNum(c.consults)}</span>
                <span className="flr-funnel-lbl">Consults</span>
              </div>
              <span className="flr-funnel-arrow">→</span>
              <div className="flr-funnel-step">
                <span className="flr-funnel-num">{fmtNum(c.shows)}</span>
                <span className="flr-funnel-lbl">Show Up</span>
              </div>
              <span className="flr-funnel-arrow">→</span>
              <div className="flr-funnel-step">
                <span className="flr-funnel-num">{fmtNum(c.retained)}</span>
                <span className="flr-funnel-lbl">Retained</span>
              </div>
            </div>

            <div className="flr-rev-row">
              <span className="flr-rev-value">{fmt(c.currentRevenue)}</span>
              <span className="flr-rev-label">current monthly revenue</span>
            </div>

            <div className="flr-leak">
              <div className="flr-leak-head">Hidden Leak</div>
              <div className="flr-leak-body">
                <div className="flr-leak-stat">
                  <span className="flr-leak-num">{fmtNum(c.totalStarts)}</span>
                  <span className="flr-leak-lbl">Form starts</span>
                </div>
                <div className="flr-leak-divider" />
                <div className="flr-leak-stat">
                  <span className="flr-leak-num flr-leak-num-red">{fmtNum(c.abandoned)}</span>
                  <span className="flr-leak-lbl">Abandoned before submitting</span>
                </div>
              </div>
              <p className="flr-leak-note">
                These inquiries never reach the CRM. No missed call, no callback list, no record — they simply do not exist on paper.
              </p>
            </div>
          </section>

          {/* FULL-WIDTH — the result */}
          <section className="flr-hero">
            <div className="flr-hero-head">Recovered with ReCapture</div>
            <div className="flr-hero-stats">
              <div className="flr-hero-stat">
                <span className="flr-hero-num">{fmt(c.monthly)}</span>
                <span className="flr-hero-lbl">Additional revenue / month</span>
              </div>
              <div className="flr-hero-divider" />
              <div className="flr-hero-stat">
                <span className="flr-hero-num flr-hero-num-orange">{fmt(c.annual)}</span>
                <span className="flr-hero-lbl">Additional revenue / year</span>
              </div>
              <div className="flr-hero-divider" />
              <div className="flr-hero-stat">
                <span className="flr-hero-num flr-hero-num-green">{Math.round(c.roi)}×</span>
                <span className="flr-hero-lbl">Return on $394 / month</span>
              </div>
            </div>
            <div className="flr-hero-foot">
              {fmtNum(c.recovered)} recovered inquiries per month → {c.recoveredRetained.toFixed(1)} additional retained cases
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
