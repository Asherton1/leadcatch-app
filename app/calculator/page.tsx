'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import '../blog/blog.css'
import '../landing.css'
import './calculator.css'

const INDUSTRIES: { value: string; label: string; avgDeal: number; abandonmentRate: number; avgCloseRate: number; mobileTraffic: number }[] = [
  { value: 'medspa', label: 'Med Spa', avgDeal: 2800, abandonmentRate: 67, avgCloseRate: 35, mobileTraffic: 72 },
  { value: 'dental', label: 'Dental Practice', avgDeal: 1900, abandonmentRate: 65, avgCloseRate: 40, mobileTraffic: 68 },
  { value: 'plastic-surgery', label: 'Plastic Surgery', avgDeal: 6500, abandonmentRate: 72, avgCloseRate: 28, mobileTraffic: 65 },
  { value: 'dermatology', label: 'Dermatology', avgDeal: 2200, abandonmentRate: 64, avgCloseRate: 38, mobileTraffic: 70 },
  { value: 'wellness', label: 'Wellness Clinic', avgDeal: 1600, abandonmentRate: 60, avgCloseRate: 42, mobileTraffic: 74 },
  { value: 'property-mgmt', label: 'Property Management', avgDeal: 3200, abandonmentRate: 70, avgCloseRate: 30, mobileTraffic: 58 },
  { value: 'luxury-auto', label: 'Luxury Auto', avgDeal: 8500, abandonmentRate: 74, avgCloseRate: 22, mobileTraffic: 55 },
  { value: 'real-estate', label: 'Luxury Real Estate', avgDeal: 12000, abandonmentRate: 71, avgCloseRate: 18, mobileTraffic: 52 },
  { value: 'home-services', label: 'Home Services', avgDeal: 1400, abandonmentRate: 62, avgCloseRate: 45, mobileTraffic: 76 },
  { value: 'legal', label: 'Legal Services', avgDeal: 4500, abandonmentRate: 68, avgCloseRate: 25, mobileTraffic: 60 },
]

function formatCurrency(n: number) { return '$' + Math.round(n).toLocaleString() }
function formatNum(n: number) { return Math.round(n).toLocaleString() }

function CountUp({ value, run, format }: { value: number; run: boolean; format: (n: number) => string }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) { setV(0); return }
    let raf = 0
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setV(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, run])
  return <>{format(v)}</>
}

export default function CalculatorPage() {
  const [industry, setIndustry] = useState('')
  const [dealValue, setDealValue] = useState('')
  const [monthlySubmissions, setMonthlySubmissions] = useState('')
  const [monthlyAdSpend, setMonthlyAdSpend] = useState('')
  const [showResults, setShowResults] = useState(false)

  const selected = INDUSTRIES.find(i => i.value === industry)
  const deal = dealValue ? parseInt(dealValue.replace(/[^0-9]/g, '') || '0') : (selected?.avgDeal || 0)
  const submissions = monthlySubmissions ? parseInt(monthlySubmissions.replace(/[^0-9]/g, '') || '0') : 0
  const adSpend = monthlyAdSpend ? parseInt(monthlyAdSpend.replace(/[^0-9]/g, '') || '0') : 0
  const abandonmentRate = selected?.abandonmentRate || 66
  const closeRate = selected?.avgCloseRate || 30
  const mobileTraffic = selected?.mobileTraffic || 65

  const abandonedLeads = Math.round(submissions * (abandonmentRate / (100 - abandonmentRate)))
  const totalFormStarts = submissions + abandonedLeads
  const revenueAtRisk = abandonedLeads * deal
  const annualRevenueAtRisk = revenueAtRisk * 12
  const mobileAbandoned = Math.round(abandonedLeads * (mobileTraffic / 100))

  const recoveryRate = 15
  const recoveredLeads = Math.round(abandonedLeads * (recoveryRate / 100))
  const closedFromRecovery = Math.round(recoveredLeads * (closeRate / 100))
  const recoveredRevenue = closedFromRecovery * deal
  const annualRecovered = recoveredRevenue * 12
  const recaptureCost = 200
  const monthlyROI = recoveredRevenue > 0 ? Math.round(((recoveredRevenue - recaptureCost) / recaptureCost) * 100) : 0
  const costPerRecoveredLead = recoveredLeads > 0 ? Math.round(recaptureCost / recoveredLeads) : 0
  const costPerAcquisitionNow = adSpend > 0 && submissions > 0 ? Math.round(adSpend / submissions) : 0
  const costPerAcquisitionWith = adSpend > 0 && (submissions + recoveredLeads) > 0 ? Math.round(adSpend / (submissions + recoveredLeads)) : 0
  const paybackDays = recoveredRevenue > 0 ? Math.max(1, Math.round((recaptureCost / recoveredRevenue) * 30)) : 0

  function handleIndustryChange(val: string) {
    setIndustry(val)
    const ind = INDUSTRIES.find(i => i.value === val)
    if (ind && !dealValue) setDealValue(ind.avgDeal.toString())
    setShowResults(false)
  }

  function handleCalculate() {
    if (industry && submissions) setShowResults(true)
  }

  return (
    <div className="calc-page">
      <BlogNav />
      <ScrollReveal />

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">ROI Estimator</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">How much revenue are your forms losing?</span>{' '}
            <span className="canon-hero-headline-muted">Studies show 60 to 74% of people who start a form never finish it. For high-ticket businesses, that translates to thousands in lost revenue every month. Enter your numbers and see the real cost.</span>
          </h1>
        </div>
      </section>

      <div className="calc-wrap">
        <div className="calc-card reveal">
          <h2 className="calc-card-title">Your Business Numbers</h2>
          <p className="calc-card-sub">The more accurate your inputs, the more precise your results. Ad spend is optional but unlocks cost-per-lead insights.</p>

          <div className="calc-input-grid">
            <div className="calc-field">
              <label className="calc-label">Your Industry</label>
              <div className="calc-select-wrap">
                <select className="calc-input calc-select" value={industry} onChange={e => handleIndustryChange(e.target.value)} style={{ color: industry ? '#fff' : '#666' }}>
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map(ind => (<option key={ind.value} value={ind.value}>{ind.label}</option>))}
                </select>
                <span className="calc-select-chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
            </div>
            <div className="calc-field">
              <label className="calc-label">Avg. Deal / Client Value ($)</label>
              <input className="calc-input" type="text" inputMode="numeric" placeholder={selected ? formatCurrency(selected.avgDeal) : '$2,500'} value={dealValue ? formatCurrency(parseInt(dealValue.replace(/[^0-9]/g, '') || '0')).replace('$0', '') : ''} onChange={e => { setDealValue(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} />
              {selected && !dealValue && <p className="calc-hint">Industry avg: {formatCurrency(selected.avgDeal)}</p>}
            </div>
            <div className="calc-field">
              <label className="calc-label">Monthly Form Submissions</label>
              <input className="calc-input" type="text" inputMode="numeric" placeholder="e.g. 30" value={monthlySubmissions} onChange={e => { setMonthlySubmissions(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} />
              <p className="calc-hint">Completed submissions you currently receive</p>
            </div>
            <div className="calc-field">
              <label className="calc-label">Monthly Ad Spend ($) <span className="calc-label-opt">optional</span></label>
              <input className="calc-input" type="text" inputMode="numeric" placeholder="e.g. $5,000" value={monthlyAdSpend ? formatCurrency(parseInt(monthlyAdSpend.replace(/[^0-9]/g, '') || '0')).replace('$0', '') : ''} onChange={e => { setMonthlyAdSpend(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} />
              <p className="calc-hint">Unlocks cost-per-lead comparison</p>
            </div>
          </div>

          <button className="calc-btn" onClick={handleCalculate} disabled={!industry || !submissions}>
            Calculate My Lost Revenue
          </button>
        </div>

        {showResults && submissions > 0 && (
          <div className="calc-results">

            <h3 className="calc-section-label calc-label-red">The Problem: What You Cannot See</h3>

            <div className="calc-stat-grid calc-grid-4">
              <div className="calc-stat">
                <div className="calc-stat-label">Total Form Starts</div>
                <div className="calc-stat-num"><CountUp value={totalFormStarts} run={showResults} format={formatNum} /></div>
                <div className="calc-stat-sub">per month</div>
              </div>
              <div className="calc-stat">
                <div className="calc-stat-label">Abandoned Before Submit</div>
                <div className="calc-stat-num calc-num-red"><CountUp value={abandonedLeads} run={showResults} format={formatNum} /></div>
                <div className="calc-stat-sub">{abandonmentRate}% abandonment</div>
              </div>
              <div className="calc-stat calc-stat-accent">
                <div className="calc-stat-label">Revenue at Risk / Month</div>
                <div className="calc-stat-num calc-num-orange"><CountUp value={revenueAtRisk} run={showResults} format={formatCurrency} /></div>
                <div className="calc-stat-sub">{formatNum(abandonedLeads)} &times; {formatCurrency(deal)}</div>
              </div>
              <div className="calc-stat calc-stat-accent">
                <div className="calc-stat-label">Annual Revenue at Risk</div>
                <div className="calc-stat-num calc-num-orange"><CountUp value={annualRevenueAtRisk} run={showResults} format={formatCurrency} /></div>
                <div className="calc-stat-sub">12-month projection</div>
              </div>
            </div>

            <div className="calc-context-bar">
              <div className="calc-context-item"><div className="calc-context-label">Industry</div><div className="calc-context-val">{selected?.label}</div></div>
              <div className="calc-context-item"><div className="calc-context-label">Abandonment</div><div className="calc-context-val calc-val-red">{abandonmentRate}%</div></div>
              <div className="calc-context-item"><div className="calc-context-label">Close Rate</div><div className="calc-context-val">{closeRate}%</div></div>
              <div className="calc-context-item"><div className="calc-context-label">Mobile Traffic</div><div className="calc-context-val">{mobileTraffic}%</div></div>
              <div className="calc-context-item"><div className="calc-context-label">Mobile Abandoned</div><div className="calc-context-val calc-val-red">{formatNum(mobileAbandoned)}/mo</div></div>
            </div>

            <h3 className="calc-section-label calc-label-green">The Solution: What ReCapture Recovers</h3>

            <div className="calc-solution">
              <div className="calc-stat-grid calc-grid-4 calc-grid-plain">
                <div className="calc-stat-plain">
                  <div className="calc-stat-label">Leads Recaptured</div>
                  <div className="calc-stat-num calc-num-green"><CountUp value={recoveredLeads} run={showResults} format={formatNum} /></div>
                  <div className="calc-stat-sub">at {recoveryRate}% recovery</div>
                </div>
                <div className="calc-stat-plain">
                  <div className="calc-stat-label">Closed From Recovery</div>
                  <div className="calc-stat-num calc-num-green"><CountUp value={closedFromRecovery} run={showResults} format={formatNum} /></div>
                  <div className="calc-stat-sub">at {closeRate}% close rate</div>
                </div>
                <div className="calc-stat-plain">
                  <div className="calc-stat-label">Revenue Recovered / Mo</div>
                  <div className="calc-stat-num calc-num-green"><CountUp value={recoveredRevenue} run={showResults} format={formatCurrency} /></div>
                  <div className="calc-stat-sub">{formatNum(closedFromRecovery)} &times; {formatCurrency(deal)}</div>
                </div>
                <div className="calc-stat-plain">
                  <div className="calc-stat-label">Annual Recovery</div>
                  <div className="calc-stat-num calc-num-green"><CountUp value={annualRecovered} run={showResults} format={formatCurrency} /></div>
                  <div className="calc-stat-sub">{monthlyROI > 0 ? `${formatNum(monthlyROI)}% monthly ROI` : ''}</div>
                </div>
              </div>

              <div className="calc-detail-grid">
                <div className="calc-detail">
                  <div className="calc-context-label">Cost per Recovered Lead</div>
                  <div className="calc-detail-num">{formatCurrency(costPerRecoveredLead)}</div>
                </div>
                <div className="calc-detail">
                  <div className="calc-context-label">Pays for Itself In</div>
                  <div className="calc-detail-num">{paybackDays} day{paybackDays !== 1 ? 's' : ''}</div>
                </div>
                <div className="calc-detail">
                  <div className="calc-context-label">ReCapture Cost</div>
                  <div className="calc-detail-num">{formatCurrency(recaptureCost)}<span className="calc-detail-unit">/mo</span></div>
                </div>
              </div>
            </div>

            {adSpend > 0 && costPerAcquisitionNow > 0 && (
              <div className="calc-vs-card">
                <h3 className="calc-section-label calc-label-orange calc-vs-title">Ad Spend Efficiency: Before vs. After ReCapture</h3>
                <div className="calc-vs-grid">
                  <div>
                    <div className="calc-stat-label">Current Cost per Lead</div>
                    <div className="calc-vs-num calc-num-red">{formatCurrency(costPerAcquisitionNow)}</div>
                    <div className="calc-stat-sub">{formatCurrency(adSpend)} / {formatNum(submissions)} leads</div>
                  </div>
                  <div className="calc-vs-sep">vs</div>
                  <div>
                    <div className="calc-stat-label">With ReCapture</div>
                    <div className="calc-vs-num calc-num-green">{formatCurrency(costPerAcquisitionWith)}</div>
                    <div className="calc-stat-sub">{formatCurrency(adSpend)} / {formatNum(submissions + recoveredLeads)} leads</div>
                  </div>
                </div>
                <div className="calc-vs-foot">
                  <span>Save </span>
                  <span className="calc-hl-green">{formatCurrency(costPerAcquisitionNow - costPerAcquisitionWith)} per lead</span>
                  <span> without spending a single extra dollar on ads.</span>
                </div>
              </div>
            )}

            <div className="calc-summary">
              <div className="calc-summary-inner">
                <p>
                  Your {selected?.label || 'business'} is losing an estimated <strong className="calc-hl-orange">{formatNum(abandonedLeads)} leads</strong> and <strong className="calc-hl-orange">{formatCurrency(revenueAtRisk)}</strong> every month to form abandonment.
                  With ReCapture, you could recover <strong className="calc-hl-green">{formatNum(closedFromRecovery)} closed deals</strong> worth <strong className="calc-hl-green">{formatCurrency(recoveredRevenue)}/month</strong> &mdash; a <strong className="calc-hl-white">{formatNum(monthlyROI)}% return</strong> on a {formatCurrency(recaptureCost)}/month investment.
                </p>
              </div>
            </div>

            <p className="calc-disclaimer">
              Abandonment rates based on industry research from Baymard Institute, Zuko Analytics, and Contentsquare (2025-2026). Recovery rate of {recoveryRate}% is a conservative baseline. Actual results vary by business.
            </p>

            <div className="calc-cta">
              <h3 className="calc-cta-title">Stop Leaving Money on the Table</h3>
              <p className="calc-cta-sub">One script tag. 60-second setup. Your first recovered lead within 48 hours.</p>
              <div className="calc-cta-actions">
                <Link href="/demo" className="calc-cta-primary">Try the Live Demo</Link>
                <Link href="/start-trial" className="calc-cta-secondary">Start your 7-day free trial</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <RelatedPages page="calculator" />
      <Footer />
    </div>
  )
}
