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
  return { background: `linear-gradient(90deg, #ff6b35 ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }
}

export default function FamilyLawROI() {
  const [monthlyLeads, setMonthlyLeads] = useState(185)
  const [consultBookRate, setConsultBookRate] = useState(40)
  const [showUpRate, setShowUpRate] = useState(80)
  const [retainRate, setRetainRate] = useState(50)
  const [avgCaseValue, setAvgCaseValue] = useState(20000)
  const [abandonmentRate, setAbandonmentRate] = useState(65)
  const [recoveryRate, setRecoveryRate] = useState(10)

  const calc = useMemo(() => {
    const consults = monthlyLeads * (consultBookRate / 100)
    const shows = consults * (showUpRate / 100)
    const retained = shows * (retainRate / 100)
    const currentRevenue = retained * avgCaseValue

    const submittedShare = 1 - (abandonmentRate / 100)
    const totalStarts = submittedShare > 0 ? monthlyLeads / submittedShare : monthlyLeads
    const abandoned = totalStarts - monthlyLeads

    const recovered = abandoned * (recoveryRate / 100)
    const recoveredRetained = recovered * (consultBookRate / 100) * (showUpRate / 100) * (retainRate / 100)
    const recoveredRevenueMonthly = recoveredRetained * avgCaseValue
    const recoveredRevenueAnnual = recoveredRevenueMonthly * 12
    const roiMultiple = recoveredRevenueMonthly / 394

    return { consults, shows, retained, currentRevenue, abandoned, recovered, recoveredRetained, recoveredRevenueMonthly, recoveredRevenueAnnual, roiMultiple }
  }, [monthlyLeads, consultBookRate, showUpRate, retainRate, avgCaseValue, abandonmentRate, recoveryRate])

  const sliders = [
    { label: 'Monthly Lead Inquiries', val: monthlyLeads, set: setMonthlyLeads, min: 50, max: 500, step: 5, display: fmtNum(monthlyLeads), group: 'funnel' },
    { label: 'Booked to Paid Consult', val: consultBookRate, set: setConsultBookRate, min: 10, max: 80, step: 1, display: consultBookRate + '%', group: 'funnel' },
    { label: 'Consult Show-Up Rate', val: showUpRate, set: setShowUpRate, min: 40, max: 100, step: 1, display: showUpRate + '%', group: 'funnel' },
    { label: 'Retain the Firm', val: retainRate, set: setRetainRate, min: 20, max: 90, step: 1, display: retainRate + '%', group: 'funnel' },
    { label: 'Average Case Value', val: avgCaseValue, set: setAvgCaseValue, min: 5000, max: 50000, step: 1000, display: fmt(avgCaseValue), group: 'funnel' },
    { label: 'Form Abandonment Rate', val: abandonmentRate, set: setAbandonmentRate, min: 40, max: 80, step: 1, display: abandonmentRate + '%', group: 'leak' },
    { label: 'ReCapture Recovery Rate', val: recoveryRate, set: setRecoveryRate, min: 5, max: 15, step: 1, display: recoveryRate + '%', group: 'leak' },
  ]

  return (
    <div className="flr-page">
      <BlogNav />

      <div className="flr-container">
        <div className="flr-header">
          <div className="flr-eyebrow">Revenue Recovery Model</div>
          <h1 className="flr-title">Family Law Revenue Recovery Calculator</h1>
          <p className="flr-subtitle">
            Illustrative family-law firm benchmarks. Adjust any input to match your practice and see what your intake form is costing you.
          </p>
        </div>

        <div className="flr-grid">
          <div className="flr-inputs">
            <div className="flr-section-label">Your Funnel</div>
            {sliders.filter(s => s.group === 'funnel').map(s => (
              <div className="flr-input-group" key={s.label}>
                <div className="flr-input-head">
                  <span className="flr-input-label">{s.label}</span>
                  <span className="flr-input-value">{s.display}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.val}
                  onChange={e => s.set(+e.target.value)}
                  style={fill(s.val, s.min, s.max)}
                />
              </div>
            ))}

            <div className="flr-section-label flr-section-label-spaced">The Leak</div>
            {sliders.filter(s => s.group === 'leak').map(s => (
              <div className="flr-input-group" key={s.label}>
                <div className="flr-input-head">
                  <span className="flr-input-label">{s.label}</span>
                  <span className="flr-input-value">{s.display}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.val}
                  onChange={e => s.set(+e.target.value)}
                  style={fill(s.val, s.min, s.max)}
                />
              </div>
            ))}
          </div>

          <div className="flr-outputs">
            <div className="flr-current-box">
              <div className="flr-box-label">Current Monthly Funnel</div>
              <div className="flr-funnel">
                <div className="flr-funnel-step">
                  <span className="flr-funnel-num">{fmtNum(monthlyLeads)}</span>
                  <span className="flr-funnel-lbl">Leads</span>
                </div>
                <span className="flr-funnel-arrow">→</span>
                <div className="flr-funnel-step">
                  <span className="flr-funnel-num">{fmtNum(calc.consults)}</span>
                  <span className="flr-funnel-lbl">Consults</span>
                </div>
                <span className="flr-funnel-arrow">→</span>
                <div className="flr-funnel-step">
                  <span className="flr-funnel-num">{fmtNum(calc.retained)}</span>
                  <span className="flr-funnel-lbl">Retained</span>
                </div>
              </div>
              <div className="flr-current-rev">
                {fmt(calc.currentRevenue)}<span>current monthly revenue</span>
              </div>
            </div>

            <div className="flr-leak-box">
              <div className="flr-box-label flr-box-label-red">Hidden Leak — Abandoned Form Starts</div>
              <div className="flr-leak-value">
                {fmtNum(calc.abandoned)}<span>inquiries never submitted, every month</span>
              </div>
            </div>

            <div className="flr-hero-box">
              <div className="flr-box-label flr-box-label-orange">Recovered with ReCapture</div>
              <div className="flr-hero-monthly">{fmt(calc.recoveredRevenueMonthly)}<span>/mo</span></div>
              <div className="flr-hero-annual">{fmt(calc.recoveredRevenueAnnual)}<span>per year</span></div>
              <div className="flr-hero-detail">
                {fmtNum(calc.recovered)} recovered inquiries → {calc.recoveredRetained.toFixed(1)} additional retained cases per month
              </div>
            </div>

            <div className="flr-roi-box">
              <div className="flr-roi-multiple">{Math.round(calc.roiMultiple)}×</div>
              <div className="flr-roi-label">return on the $394/mo platform cost</div>
            </div>
          </div>
        </div>

        <p className="flr-footer-note">
          Figures are illustrative family-law benchmarks. Actual results depend on traffic volume, funnel performance, and case mix.
        </p>
      </div>

      <Footer />
    </div>
  )
}
