'use client'

import { useState } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import '../blog/blog.css'

const INDUSTRIES: { value: string; label: string; avgDeal: number; avgAbandonment: number }[] = [
  { value: 'medspa', label: 'Med Spa', avgDeal: 2800, avgAbandonment: 67 },
  { value: 'dental', label: 'Dental Practice', avgDeal: 1900, avgAbandonment: 65 },
  { value: 'plastic-surgery', label: 'Plastic Surgery', avgDeal: 6500, avgAbandonment: 72 },
  { value: 'dermatology', label: 'Dermatology', avgDeal: 2200, avgAbandonment: 64 },
  { value: 'wellness', label: 'Wellness Clinic', avgDeal: 1600, avgAbandonment: 60 },
  { value: 'property-mgmt', label: 'Property Management', avgDeal: 3200, avgAbandonment: 70 },
  { value: 'luxury-auto', label: 'Luxury Auto', avgDeal: 8500, avgAbandonment: 74 },
  { value: 'real-estate', label: 'Luxury Real Estate', avgDeal: 12000, avgAbandonment: 71 },
  { value: 'home-services', label: 'Home Services', avgDeal: 1400, avgAbandonment: 62 },
  { value: 'legal', label: 'Legal Services', avgDeal: 4500, avgAbandonment: 68 },
]

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export default function CalculatorPage() {
  const [industry, setIndustry] = useState('')
  const [dealValue, setDealValue] = useState('')
  const [monthlySubmissions, setMonthlySubmissions] = useState('')
  const [showResults, setShowResults] = useState(false)

  const selected = INDUSTRIES.find(i => i.value === industry)
  const deal = dealValue ? parseInt(dealValue.replace(/[^0-9]/g, '') || '0') : (selected?.avgDeal || 0)
  const submissions = monthlySubmissions ? parseInt(monthlySubmissions.replace(/[^0-9]/g, '') || '0') : 0
  const abandonmentRate = selected?.avgAbandonment || 66
  const abandonedLeads = Math.round(submissions * (abandonmentRate / (100 - abandonmentRate)))
  const revenueAtRisk = abandonedLeads * deal
  const recoveryRate = 15
  const recoveredLeads = Math.round(abandonedLeads * (recoveryRate / 100))
  const recoveredRevenue = recoveredLeads * deal
  const annualRecovered = recoveredRevenue * 12
  const recaptureCost = 200 * 12
  const roi = annualRecovered > 0 ? Math.round(((annualRecovered - recaptureCost) / recaptureCost) * 100) : 0

  function handleIndustryChange(val: string) {
    setIndustry(val)
    const ind = INDUSTRIES.find(i => i.value === val)
    if (ind && !dealValue) {
      setDealValue(ind.avgDeal.toString())
    }
    setShowResults(false)
  }

  function handleCalculate() {
    if (industry && submissions) {
      setShowResults(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 4rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>ROI Calculator</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>How Much Revenue Are Your Forms Losing?</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Most businesses lose 60 to 70% of leads who start their forms but never submit. Enter your numbers below and see exactly how much that costs you — and how much ReCapture can bring back.</p>
        </div>
      </div>

      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Enter Your Numbers</h2>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '2rem' }}>We will calculate your estimated revenue at risk and what ReCapture could recover.</p>

          <div className="calc-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Your Industry</label>
              <select value={industry} onChange={e => handleIndustryChange(e.target.value)} style={{ width: '100%', padding: '0.875rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: industry ? '#fff' : '#666', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none' as const }}>
                <option value="">Select industry...</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind.value} value={ind.value}>{ind.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Avg. Deal Value ($)</label>
              <input type="text" inputMode="numeric" placeholder={selected ? formatCurrency(selected.avgDeal) : '$2,500'} value={dealValue ? formatCurrency(parseInt(dealValue.replace(/[^0-9]/g, '') || '0')).replace('$0', '') : ''} onChange={e => { setDealValue(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} style={{ width: '100%', padding: '0.875rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              {selected && !dealValue && <p style={{ fontSize: '0.7rem', color: '#444', margin: '0.35rem 0 0' }}>Industry avg: {formatCurrency(selected.avgDeal)}</p>}
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Monthly Form Submissions</label>
              <input type="text" inputMode="numeric" placeholder="e.g. 30" value={monthlySubmissions} onChange={e => { setMonthlySubmissions(e.target.value.replace(/[^0-9]/g, '')); setShowResults(false) }} style={{ width: '100%', padding: '0.875rem 1rem', background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.9375rem', color: '#fff', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              <p style={{ fontSize: '0.7rem', color: '#444', margin: '0.35rem 0 0' }}>How many form submissions you get per month</p>
            </div>
          </div>

          <button onClick={handleCalculate} disabled={!industry || !submissions} style={{ width: '100%', padding: '1rem', background: (!industry || !submissions) ? '#333' : '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, cursor: (!industry || !submissions) ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s ease' }}>
            Calculate My Lost Revenue
          </button>
        </div>

        {showResults && submissions > 0 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem' }}>Estimated Abandoned Leads / Month</div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#ef4444' }}>{abandonedLeads}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>Based on {abandonmentRate}% abandonment rate for {selected?.label}</div>
              </div>
              <div style={{ background: '#111', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem' }}>Revenue at Risk / Month</div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#ff6b35' }}>{formatCurrency(revenueAtRisk)}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>{abandonedLeads} leads x {formatCurrency(deal)} avg. deal value</div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 100%)', border: '1px solid rgba(255,107,53,0.15)', borderRadius: 16, padding: '2.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>What ReCapture Could Recover</h3>
              <div className="calc-recovery" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.5rem' }}>Recovered Leads / Month</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981' }}>{recoveredLeads}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.25rem' }}>at {recoveryRate}% recovery rate</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.5rem' }}>Recovered Revenue / Month</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981' }}>{formatCurrency(recoveredRevenue)}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.25rem' }}>{recoveredLeads} leads x {formatCurrency(deal)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.5rem' }}>Annual Recovered Revenue</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#10b981' }}>{formatCurrency(annualRecovered)}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.25rem' }}>{roi > 0 ? `${roi.toLocaleString()}% ROI` : ''}</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ borderLeft: '3px solid #ff6b35', display: 'inline-block', textAlign: 'left', padding: '0.75rem 1.5rem' }}>
                <p style={{ color: '#bbb', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                  You are currently losing an estimated <strong style={{ color: '#ff6b35' }}>{formatCurrency(revenueAtRisk)}/month</strong> to form abandonment.
                  ReCapture could recover <strong style={{ color: '#10b981' }}>{formatCurrency(recoveredRevenue)}/month</strong> — paying for itself
                  {recoveredRevenue > 200 ? <> <strong style={{ color: '#fff' }}>{Math.round(recoveredRevenue / 200)}x over</strong> in the first month alone.</> : <> within the first month.</>}
                </p>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2.5rem', textAlign: 'center' }}>
              <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0', fontWeight: 700 }}>Stop Leaving Money on the Table</h3>
              <p style={{ color: '#888', margin: '0 0 1.5rem 0', fontSize: '0.95rem', lineHeight: 1.7 }}>One script tag. 60-second setup. See your first captured lead within 48 hours.</p>
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
          .calc-fields {
            grid-template-columns: 1fr !important;
          }
          .calc-recovery {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
