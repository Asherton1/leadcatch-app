'use client'

import { useState, useMemo } from 'react'

function sliderFill(val: number, min: number, max: number) {
  const pct = ((val - min) / (max - min)) * 100
  return { background: `linear-gradient(90deg, #ff6b35 ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }
}
import './family-law-roi.css'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString() }
function fmtNum(n: number) { return Math.round(n).toLocaleString() }

export default function FamilyLawROI() {
  // Inputs — defaults reflect typical family-law firm benchmarks
  const [monthlyLeads, setMonthlyLeads] = useState(185)
  const [consultBookRate, setConsultBookRate] = useState(40)
  const [showUpRate, setShowUpRate] = useState(80)
  const [retainRate, setRetainRate] = useState(50)
  const [avgCaseValue, setAvgCaseValue] = useState(20000)
  const [abandonmentRate, setAbandonmentRate] = useState(65)
  const [recoveryRate, setRecoveryRate] = useState(10)

  const calc = useMemo(() => {
    // Current funnel (visible leads — the ones who submitted)
    const consults = monthlyLeads * (consultBookRate / 100)
    const shows = consults * (showUpRate / 100)
    const retained = shows * (retainRate / 100)
    const currentRevenue = retained * avgCaseValue

    // Abandoned form starts — the invisible leak
    // If monthlyLeads = submitted leads, abandoned = submitted / (1 - abandonRate) * abandonRate
    const submittedShare = 1 - (abandonmentRate / 100)
    const totalStarts = submittedShare > 0 ? monthlyLeads / submittedShare : monthlyLeads
    const abandoned = totalStarts - monthlyLeads

    // Recovered leads flow through the SAME funnel
    const recovered = abandoned * (recoveryRate / 100)
    const recoveredConsults = recovered * (consultBookRate / 100)
    const recoveredShows = recoveredConsults * (showUpRate / 100)
    const recoveredRetained = recoveredShows * (retainRate / 100)
    const recoveredRevenueMonthly = recoveredRetained * avgCaseValue
    const recoveredRevenueAnnual = recoveredRevenueMonthly * 12

    const cost = 394
    const roiMultiple = cost > 0 ? recoveredRevenueMonthly / cost : 0

    return {
      consults, shows, retained, currentRevenue,
      abandoned, recovered, recoveredRetained,
      recoveredRevenueMonthly, recoveredRevenueAnnual,
      roiMultiple,
    }
  }, [monthlyLeads, consultBookRate, showUpRate, retainRate, avgCaseValue, abandonmentRate, recoveryRate])

  return (
    <div className="flr-page">
      <div className="flr-container">
        <div className="flr-header">
          <div className="flr-brand">
            <span className="flr-mark">+</span>
            <span className="flr-brand-name">ReCapture</span>
          </div>
          <div className="flr-title">Family Law Revenue Recovery Calculator</div>
          <div className="flr-subtitle">Hypothetical family-law firm benchmarks. Adjust any number to match your practice.</div>
        </div>

        <div className="flr-grid">
          {/* INPUTS */}
          <div className="flr-inputs">
            <div className="flr-section-label">Your Funnel</div>

            <div className="flr-input-group">
              <label>Monthly Leads (form inquiries)</label>
              <div className="flr-input-row">
                <input type="range" min="50" max="500" value={monthlyLeads} onChange={e => setMonthlyLeads(+e.target.value)} style={sliderFill(monthlyLeads, 50, 500)} />
                <span className="flr-input-value">{fmtNum(monthlyLeads)}</span>
              </div>
            </div>

            <div className="flr-input-group">
              <label>Booked to Paid Consult</label>
              <div className="flr-input-row">
                <input type="range" min="10" max="80" value={consultBookRate} onChange={e => setConsultBookRate(+e.target.value)} style={sliderFill(consultBookRate, 10, 80)} />
                <span className="flr-input-value">{consultBookRate}%</span>
              </div>
            </div>

            <div className="flr-input-group">
              <label>Consult Show-Up Rate</label>
              <div className="flr-input-row">
                <input type="range" min="40" max="100" value={showUpRate} onChange={e => setShowUpRate(+e.target.value)} style={sliderFill(showUpRate, 40, 100)} />
                <span className="flr-input-value">{showUpRate}%</span>
              </div>
            </div>

            <div className="flr-input-group">
              <label>Retain the Firm (after consult)</label>
              <div className="flr-input-row">
                <input type="range" min="20" max="90" value={retainRate} onChange={e => setRetainRate(+e.target.value)} style={sliderFill(retainRate, 20, 90)} />
                <span className="flr-input-value">{retainRate}%</span>
              </div>
            </div>

            <div className="flr-input-group">
              <label>Average Case Value</label>
              <div className="flr-input-row">
                <input type="range" min="5000" max="50000" step="1000" value={avgCaseValue} onChange={e => setAvgCaseValue(+e.target.value)} style={sliderFill(avgCaseValue, 5000, 50000)} />
                <span className="flr-input-value">{fmt(avgCaseValue)}</span>
              </div>
            </div>

            <div className="flr-section-label" style={{ marginTop: '1.5rem' }}>The Leak</div>

            <div className="flr-input-group">
              <label>Form Abandonment Rate</label>
              <div className="flr-input-row">
                <input type="range" min="40" max="80" value={abandonmentRate} onChange={e => setAbandonmentRate(+e.target.value)} style={sliderFill(abandonmentRate, 40, 80)} />
                <span className="flr-input-value">{abandonmentRate}%</span>
              </div>
            </div>

            <div className="flr-input-group">
              <label>ReCapture Recovery Rate</label>
              <div className="flr-input-row">
                <input type="range" min="5" max="15" value={recoveryRate} onChange={e => setRecoveryRate(+e.target.value)} style={sliderFill(recoveryRate, 5, 15)} />
                <span className="flr-input-value">{recoveryRate}%</span>
              </div>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="flr-outputs">
            <div className="flr-current-box">
              <div className="flr-current-label">Your Current Monthly Funnel</div>
              <div className="flr-funnel">
                <div className="flr-funnel-step"><span className="flr-funnel-num">{fmtNum(monthlyLeads)}</span><span className="flr-funnel-lbl">Leads</span></div>
                <div className="flr-funnel-arrow">→</div>
                <div className="flr-funnel-step"><span className="flr-funnel-num">{fmtNum(calc.consults)}</span><span className="flr-funnel-lbl">Consults</span></div>
                <div className="flr-funnel-arrow">→</div>
                <div className="flr-funnel-step"><span className="flr-funnel-num">{fmtNum(calc.retained)}</span><span className="flr-funnel-lbl">Retained</span></div>
              </div>
              <div className="flr-current-rev">{fmt(calc.currentRevenue)}<span>/mo current revenue</span></div>
            </div>

            <div className="flr-leak-box">
              <div className="flr-leak-label">Hidden Leak — Abandoned Form Starts</div>
              <div className="flr-leak-value">{fmtNum(calc.abandoned)}<span> inquiries/mo never submitted</span></div>
            </div>

            <div className="flr-hero-box">
              <div className="flr-hero-label">Additional Revenue Recovered with ReCapture</div>
              <div className="flr-hero-monthly">{fmt(calc.recoveredRevenueMonthly)}<span>/month</span></div>
              <div className="flr-hero-annual">{fmt(calc.recoveredRevenueAnnual)} <span>per year</span></div>
              <div className="flr-hero-detail">
                {fmtNum(calc.recovered)} recovered inquiries → {calc.recoveredRetained.toFixed(1)} additional retained cases/mo
              </div>
            </div>

            <div className="flr-roi-box">
              <div className="flr-roi-multiple">{Math.round(calc.roiMultiple)}x</div>
              <div className="flr-roi-label">return on ReCapture&apos;s $394/mo — recovered revenue vs cost</div>
            </div>
          </div>
        </div>

        <div className="flr-footer-note">
          Figures are illustrative family-law benchmarks. Actual results depend on traffic, funnel performance, and case mix.
        </div>
      </div>
    </div>
  )
}
