'use client'

import { useState } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

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

  const inputStyle = { width: '100%', padding: '0.875rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit' as const, boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: '0.75rem', fontWeight: 600 as const, color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.05em', display: 'block' as const, marginBottom: '0.5rem' }
  const statCardStyle = { background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.5rem', textAlign: 'center' as const }
  const statLabelStyle = { fontSize: '0.6rem', color: '#555', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 600 as const, marginBottom: '0.5rem' }
  const subStyle = { fontSize: '0.7rem', color: '#444', marginTop: '0.35rem' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>ROI Estimator</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>How Much Revenue Are Your Forms Losing?</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Studies show 60 to 74% of people who start a form never finish it. For high-ticket businesses, that translates to thousands in lost revenue every month. Enter your numbers and see the real cost.</p>
        </div>
      </div>

      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Your Business Numbers</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '2rem' }}>The more accurate your inputs, the more precise your results. Ad spend is optional but unlocks cost-per-lead insights.</p>

          <div className="calc-input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={labelStyle}>Your Industry</label>
              <select value={industry} onChange={e => handleIndustryChange(e.target.value)} style={{ ...inputStyle, color: industry ? '#fff' : '#666', cursor: 'pointer', appearance: 'none' as const }}>
                <option value="">Select industry...</option>
                {INDUSTRIES.map(ind => (<option key={ind.value} value={ind.value}>{ind.label}</option>))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Avg. Deal / Client Value ($)</label>
              <input type="text" inputMode="numeric" placeholder={selected ? formatCurrency(selected.avgDeal) : '$2,500'} value={dealValue ? formatCurrency(parseInt(dealValue.replace(/[^0-9]/g, '') || '0')).replace('$0', '') : ''} onChange={e => { setDealValue(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} style={inputStyle} />
              {selected && !dealValue && <p style={{ fontSize: '0.7rem', color: '#444', margin: '0.35rem 0 0' }}>Industry avg: {formatCurrency(selected.avgDeal)}</p>}
            </div>
            <div>
              <label style={labelStyle}>Monthly Form Submissions</label>
              <input type="text" inputMode="numeric" placeholder="e.g. 30" value={monthlySubmissions} onChange={e => { setMonthlySubmissions(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} style={inputStyle} />
              <p style={{ fontSize: '0.7rem', color: '#444', margin: '0.35rem 0 0' }}>Completed submissions you currently receive</p>
            </div>
            <div>
              <label style={labelStyle}>Monthly Ad Spend ($) <span style={{ color: '#444', textTransform: 'none', fontWeight: 400 }}>optional</span></label>
              <input type="text" inputMode="numeric" placeholder="e.g. $5,000" value={monthlyAdSpend ? formatCurrency(parseInt(monthlyAdSpend.replace(/[^0-9]/g, '') || '0')).replace('$0', '') : ''} onChange={e => { setMonthlyAdSpend(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} style={inputStyle} />
              <p style={{ fontSize: '0.7rem', color: '#444', margin: '0.35rem 0 0' }}>Unlocks cost-per-lead comparison</p>
            </div>
          </div>

          <button onClick={handleCalculate} disabled={!industry || !submissions} style={{ width: '100%', padding: '1rem', background: (!industry || !submissions) ? '#333' : '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, cursor: (!industry || !submissions) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s ease' }}>
            Calculate My Lost Revenue
          </button>
        </div>

        {showResults && submissions > 0 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>

            <h3 style={{ fontSize: '0.8rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1rem' }}>The Problem: What You Cannot See</h3>

            <div className="calc-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={statCardStyle}>
                <div style={statLabelStyle}>Total Form Starts</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{formatNum(totalFormStarts)}</div>
                <div style={subStyle}>per month</div>
              </div>
              <div style={statCardStyle}>
                <div style={statLabelStyle}>Abandoned Before Submit</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>{formatNum(abandonedLeads)}</div>
                <div style={subStyle}>{abandonmentRate}% abandonment</div>
              </div>
              <div style={{ ...statCardStyle, border: '1px solid rgba(255,107,53,0.2)' }}>
                <div style={statLabelStyle}>Revenue at Risk / Month</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>{formatCurrency(revenueAtRisk)}</div>
                <div style={subStyle}>{formatNum(abandonedLeads)} x {formatCurrency(deal)}</div>
              </div>
              <div style={{ ...statCardStyle, border: '1px solid rgba(255,107,53,0.2)' }}>
                <div style={statLabelStyle}>Annual Revenue at Risk</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35' }}>{formatCurrency(annualRevenueAtRisk)}</div>
                <div style={subStyle}>12-month projection</div>
              </div>
            </div>

            <div className="calc-context-bar" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Industry</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{selected?.label}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Abandonment</div>
                <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>{abandonmentRate}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Close Rate</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{closeRate}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Mobile Traffic</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{mobileTraffic}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Mobile Abandoned</div>
                <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>{formatNum(mobileAbandoned)}/mo</div>
              </div>
            </div>

            <h3 style={{ fontSize: '0.8rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1rem' }}>The Solution: What ReCapture Recovers</h3>

            <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 100%)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
              <div className="calc-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={statLabelStyle}>Leads Recaptured</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{formatNum(recoveredLeads)}</div>
                  <div style={subStyle}>at {recoveryRate}% recovery</div>
                </div>
                <div>
                  <div style={statLabelStyle}>Closed From Recovery</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{formatNum(closedFromRecovery)}</div>
                  <div style={subStyle}>at {closeRate}% close rate</div>
                </div>
                <div>
                  <div style={statLabelStyle}>Revenue Recovered / Mo</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{formatCurrency(recoveredRevenue)}</div>
                  <div style={subStyle}>{formatNum(closedFromRecovery)} x {formatCurrency(deal)}</div>
                </div>
                <div>
                  <div style={statLabelStyle}>Annual Recovery</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{formatCurrency(annualRecovered)}</div>
                  <div style={subStyle}>{monthlyROI > 0 ? `${formatNum(monthlyROI)}% monthly ROI` : ''}</div>
                </div>
              </div>

              <div className="calc-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(16,185,129,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Cost per Recovered Lead</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{formatCurrency(costPerRecoveredLead)}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>Pays for Itself In</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{paybackDays} day{paybackDays !== 1 ? 's' : ''}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>ReCapture Cost</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{formatCurrency(recaptureCost)}<span style={{ fontSize: '0.75rem', color: '#555' }}>/mo</span></div>
                </div>
              </div>
            </div>

            {adSpend > 0 && costPerAcquisitionNow > 0 && (
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.8rem', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Ad Spend Efficiency: Before vs. After ReCapture</h3>
                <div className="calc-vs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
                  <div>
                    <div style={statLabelStyle}>Current Cost per Lead</div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ef4444' }}>{formatCurrency(costPerAcquisitionNow)}</div>
                    <div style={subStyle}>{formatCurrency(adSpend)} / {formatNum(submissions)} leads</div>
                  </div>
                  <div style={{ fontSize: '1.5rem', color: '#333' }}>vs</div>
                  <div>
                    <div style={statLabelStyle}>With ReCapture</div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981' }}>{formatCurrency(costPerAcquisitionWith)}</div>
                    <div style={subStyle}>{formatCurrency(adSpend)} / {formatNum(submissions + recoveredLeads)} leads</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #1a1a1a' }}>
                  <span style={{ fontSize: '0.85rem', color: '#bbb' }}>Save </span>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>{formatCurrency(costPerAcquisitionNow - costPerAcquisitionWith)} per lead</span>
                  <span style={{ fontSize: '0.85rem', color: '#bbb' }}> without spending a single extra dollar on ads.</span>
                </div>
              </div>
            )}

            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ borderLeft: '3px solid #ff6b35', display: 'inline-block', textAlign: 'left', padding: '0.75rem 1.5rem', maxWidth: '640px' }}>
                <p style={{ color: '#bbb', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                  Your {selected?.label || 'business'} is losing an estimated <strong style={{ color: '#ff6b35' }}>{formatNum(abandonedLeads)} leads</strong> and <strong style={{ color: '#ff6b35' }}>{formatCurrency(revenueAtRisk)}</strong> every month to form abandonment.
                  With ReCapture, you could recover <strong style={{ color: '#10b981' }}>{formatNum(closedFromRecovery)} closed deals</strong> worth <strong style={{ color: '#10b981' }}>{formatCurrency(recoveredRevenue)}/month</strong> — a <strong style={{ color: '#fff' }}>{formatNum(monthlyROI)}% return</strong> on a {formatCurrency(recaptureCost)}/month investment.
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.7rem', color: '#333', textAlign: 'center', marginBottom: '2rem', lineHeight: 1.6 }}>
              Abandonment rates based on industry research from Baymard Institute, Zuko Analytics, and Contentsquare (2025-2026). Recovery rate of {recoveryRate}% is a conservative baseline. Actual results vary by business.
            </p>

            <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem', textAlign: 'center' }}>
              <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Leaving Money on the Table</h3>
              <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>One script tag. 60-second setup. Your first recovered lead within 48 hours.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/test-form" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
                <Link href="/start-trial" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start Free Trial</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .calc-input-grid { grid-template-columns: 1fr !important; }
          .calc-stat-grid { grid-template-columns: 1fr !important; }
          .calc-context-bar { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
          .calc-detail-grid { grid-template-columns: 1fr !important; }
          .calc-vs-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .calc-vs-grid > div:nth-child(2) { display: none; }
        }
      `}</style>
    </div>
  )
}
