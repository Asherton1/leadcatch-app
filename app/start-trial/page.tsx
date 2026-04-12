'use client'

import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import '../blog/blog.css'

function IconCheck() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> }
function IconClock() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
function IconCard() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> }
function IconCode() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> }
function IconBar() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> }
function IconMail() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,7 12,13 2,7" /></svg> }
function IconUsers() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> }
function IconBuilding() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /><line x1="9" y1="18" x2="15" y2="18" /></svg> }

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
const enterprise = ['Everything in Pro', 'Unlimited locations', 'Dedicated account manager', 'Custom integrations', 'SLA & priority onboarding', 'Volume pricing']

export default function StartTrial() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <BlogNav />

      <div className="trial-wrap">
        {/* Hero */}
        <div className="trial-hero">
          <p className="trial-eyebrow">Start Your Free Trial</p>
          <h1 className="trial-h1">Stop Losing Leads. Start Recovering Revenue.</h1>
          <p className="trial-desc">Every day you wait, high-value prospects are filling out your forms, getting distracted, and leaving forever. ReCapture catches them the moment they start typing — so you never lose another lead.</p>
        </div>

        {/* Why ReCapture */}
        <div className="trial-features">
          {whyItems.map((item, i) => (
            <div key={i} className="trial-feature">
              <div className="trial-icon"><item.Icon /></div>
              <div>
                <p className="trial-ft">{item.title}</p>
                <p className="trial-fd">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#1a1a1a', margin: '3rem 0' }} />

        {/* Plans */}
        <div className="trial-plans-header">
          <h2 className="trial-plans-h2">Choose Your Plan</h2>
          <p className="trial-plans-sub">Every plan starts with a 14-day free trial. No credit card required.</p>
        </div>

        <div className="trial-plans">
          {/* Essentials */}
          <div className="trial-plan">
            <p className="trial-plan-label">Essentials</p>
            <div className="trial-price-row">
              <span className="trial-price">$150</span>
              <span className="trial-price-unit">/month</span>
            </div>
            <p className="trial-price-note">after 14-day free trial</p>
            <div className="trial-checklist">
              {essentials.map((f, i) => (
                <div key={i} className="trial-check-item"><IconCheck /><span>{f}</span></div>
              ))}
            </div>
            <Link href="/signup?plan=essentials" className="trial-btn-outline">Start Essentials Trial</Link>
          </div>

          {/* Pro */}
          <div className="trial-plan trial-plan-pro">
            <div className="trial-badge">Recommended</div>
            <p className="trial-plan-label" style={{ color: '#ff6b35' }}>Pro</p>
            <div className="trial-price-row">
              <span className="trial-price">$200</span>
              <span className="trial-price-unit">/month</span>
            </div>
            <p className="trial-price-note">after 14-day free trial</p>
            <div className="trial-checklist">
              {pro.map((f, i) => (
                <div key={i} className="trial-check-item"><IconCheck /><span>{f}</span></div>
              ))}
            </div>
            <Link href="/signup?plan=pro" className="trial-btn-primary">Start Pro Trial</Link>
          </div>

          {/* Enterprise */}
          <div className="trial-plan">
            <div className="trial-plan-ent-icon"><IconBuilding /></div>
            <p className="trial-plan-label">Enterprise</p>
            <div className="trial-price-row">
              <span className="trial-price">Custom</span>
            </div>
            <p className="trial-price-note">for multi-location businesses</p>
            <div className="trial-checklist">
              {enterprise.map((f, i) => (
                <div key={i} className="trial-check-item"><IconCheck /><span>{f}</span></div>
              ))}
            </div>
            <a href="mailto:hello@userecapture.com" className="trial-btn-outline">Contact Us</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trial-wrap { max-width: 900px; margin: 0 auto; padding: 4rem 2rem 5rem; }
        .trial-hero { margin-bottom: 3rem; }
        .trial-eyebrow { font-size: 0.875rem; font-weight: 600; color: #ff6b35; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.25rem; }
        .trial-h1 { font-size: 2.75rem; font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1.25rem; }
        .trial-desc { font-size: 1.0625rem; color: #888; line-height: 1.8; max-width: 640px; }
        .trial-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 3rem; }
        .trial-feature { display: flex; gap: 1rem; align-items: flex-start; }
        .trial-icon { flex-shrink: 0; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: rgba(255,107,53,0.08); border-radius: 8px; margin-top: 2px; }
        .trial-ft { color: #fff; font-weight: 600; font-size: 0.9rem; margin: 0 0 0.2rem 0; }
        .trial-fd { color: #666; font-size: 0.825rem; margin: 0; line-height: 1.6; }
        .trial-plans-header { text-align: center; margin-bottom: 2.5rem; }
        .trial-plans-h2 { font-size: 1.75rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .trial-plans-sub { font-size: 0.95rem; color: #666; }
        .trial-plans { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }
        .trial-plan { background: #111; border: 1px solid #1e1e1e; border-radius: 16px; padding: 2rem; position: relative; display: flex; flex-direction: column; }
        .trial-plan-pro { border-color: rgba(255,107,53,0.25); background: linear-gradient(135deg, rgba(255,107,53,0.03), #111 60%); }
        .trial-badge { position: absolute; top: -1px; right: 1.5rem; background: #ff6b35; color: #fff; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 0.3rem 0.75rem; border-radius: 0 0 6px 6px; }
        .trial-plan-label { font-size: 0.7rem; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
        .trial-price-row { display: flex; align-items: baseline; gap: 0.25rem; }
        .trial-price { font-size: 2rem; font-weight: 800; color: #fff; }
        .trial-price-unit { font-size: 0.85rem; color: #555; }
        .trial-price-note { font-size: 0.8rem; color: #666; margin-top: 0.25rem; margin-bottom: 1.25rem; }
        .trial-checklist { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; flex: 1; }
        .trial-check-item { display: flex; gap: 0.6rem; align-items: center; color: #bbb; font-size: 0.85rem; }
        .trial-plan-ent-icon { margin-bottom: 0.5rem; }
        .trial-btn-primary { display: block; text-align: center; padding: 0.875rem; background: #ff6b35; border-radius: 8px; color: #fff; font-size: 0.9375rem; font-weight: 600; text-decoration: none; box-shadow: 0 4px 12px rgba(255,107,53,0.25); transition: opacity 0.2s, transform 0.15s; }
        .trial-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .trial-btn-outline { display: block; text-align: center; padding: 0.875rem; background: transparent; border: 1px solid #1e1e1e; border-radius: 8px; color: #bbb; font-size: 0.9375rem; font-weight: 600; text-decoration: none; transition: border-color 0.2s; }
        .trial-btn-outline:hover { border-color: #333; }
        @media (max-width: 768px) {
          .trial-wrap { padding: 2.5rem 1.25rem 3rem; }
          .trial-h1 { font-size: 1.75rem; }
          .trial-desc { font-size: 0.9rem; }
          .trial-features { grid-template-columns: 1fr; gap: 1.25rem; }
          .trial-plans { grid-template-columns: 1fr; }
          .trial-plan { padding: 1.5rem 1.25rem; }
        }
        @media (max-width: 480px) {
          .trial-wrap { padding: 2rem 1rem 3rem; }
          .trial-h1 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  )
}
