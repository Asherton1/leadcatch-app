'use client'

import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import '../blog/blog.css'


function IconCheck() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
}

function IconClock() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
function IconCard() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> }
function IconCode() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> }
function IconBar() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> }
function IconMail() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,7 12,13 2,7" /></svg> }
function IconUsers() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> }

const whyItems = [
  { Icon: IconClock, title: '14-Day Free Trial', desc: 'Full access to every feature. See the ROI before you pay a cent.' },
  { Icon: IconCard, title: 'No Credit Card Required', desc: 'Start immediately. No commitments, no payment info needed.' },
  { Icon: IconCode, title: '60-Second Setup', desc: 'Paste one script tag on your site. Works with any CMS or form builder.' },
  { Icon: IconBar, title: 'Revenue-at-Risk Dashboard', desc: 'Instantly see the dollar value of leads you\'re losing to form abandonment.' },
  { Icon: IconMail, title: 'Auto-Recovery Emails', desc: 'Abandoned leads get a follow-up email automatically — sent on your behalf.' },
  { Icon: IconUsers, title: 'Built for Your Industry', desc: 'Purpose-built for med spas, dental, property management, and high-ticket services.' },
]

const essentials = ['Real-time form capture', 'Abandoned lead dashboard', 'Revenue-at-risk calculator', 'Email notifications', 'Unlimited forms', 'Weekly performance reports']
const pro = ['Everything in Essentials', 'Automated recovery emails', 'Trend arrows & analytics', 'Priority support', 'Multi-location dashboard', 'Custom branding']

export default function StartTrial() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />

      <div className="trial-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

        <div style={{ paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Start Your Free Trial</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>Stop Losing Leads.<br />Start Recovering Revenue.</h1>
          <p style={{ fontSize: '1rem', color: '#888', lineHeight: 1.8, marginBottom: '2.5rem' }}>Every day you wait, high-value prospects are filling out your forms, getting distracted, and leaving forever. ReCapture catches them the moment they start typing.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {whyItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,107,53,0.08)', borderRadius: 8, marginTop: 2 }}><item.Icon /></div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 0.2rem 0' }}>{item.title}</p>
                  <p style={{ color: '#666', fontSize: '0.825rem', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Essentials */}
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: '2rem', position: 'relative' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Essentials</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>$150</span>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>/month</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '1.25rem' }}>after 14-day free trial</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {essentials.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <IconCheck /><span style={{ color: '#bbb', fontSize: '0.85rem' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/signup?plan=essentials" style={{ display: 'block', textAlign: 'center', padding: '0.875rem', background: 'transparent', border: '1px solid #1e1e1e', borderRadius: 8, color: '#bbb', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none' }}>Start Essentials Trial</Link>
          </div>

          {/* Pro */}
          <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.03), #111 60%)', border: '1px solid rgba(255,107,53,0.25)', borderRadius: 16, padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: '1.5rem', background: '#ff6b35', color: '#fff', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.3rem 0.75rem', borderRadius: '0 0 6px 6px' }}>Recommended</div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>$200</span>
              <span style={{ fontSize: '0.85rem', color: '#555' }}>/month</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '1.25rem' }}>after 14-day free trial</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {pro.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <IconCheck /><span style={{ color: '#bbb', fontSize: '0.85rem' }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/signup?plan=pro" style={{ display: 'block', textAlign: 'center', padding: '0.875rem', background: '#ff6b35', borderRadius: 8, color: '#fff', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 12px rgba(255,107,53,0.25)' }}>Start Pro Trial</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .trial-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 1rem 1.25rem 3rem !important;
          }
          .trial-grid h1 {
            font-size: 1.75rem !important;
          }
          .trial-grid > div:first-child {
            padding-top: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .trial-grid h1 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
