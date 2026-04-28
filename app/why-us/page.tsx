import { Fragment } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import '../landing.css'
import Footer from '../components/Footer'
import WhyUsAccordion from "../components/WhyUsAccordion"
import TakedownCards from "../components/TakedownCards"

export const metadata = {
  title: 'Why ReCapture — Form Abandonment Recovery for Multi-Location Businesses',
  description: 'How ReCapture compares to Podium, GoHighLevel, and CartStack for form abandonment recovery. Built for multi-location businesses where a single recovered lead is worth $1,500 to $10,000.',
  keywords: 'ReCapture vs Podium, ReCapture vs GoHighLevel, form abandonment recovery, multi-location lead recovery, enterprise form tracking',
}

type Cell = string | boolean
type Row = { label: string; recapture: Cell; podium: Cell; ghl: Cell; cartstack: Cell }
type Section = { category: string; rows: Row[] }

const sections: Section[] = [
  {
    category: 'Capture',
    rows: [
      { label: 'Partial form capture', recapture: true, podium: 'Surveys only', ghl: true, cartstack: 'Cart fields only' },
      { label: 'Exit-intent capture', recapture: true, podium: false, ghl: false, cartstack: true },
      { label: 'Mid-field data capture', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'Lead scoring (hot/warm/cold)', recapture: true, podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Recovery & Alerts',
    rows: [
      { label: 'Auto-recovery emails', recapture: true, podium: false, ghl: true, cartstack: true },
      { label: 'Instant SMS lead alerts (to staff)', recapture: 'Pro plan', podium: false, ghl: false, cartstack: false },
      { label: 'AI voice callback (60 seconds)', recapture: 'Pro plan', podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Built for Service Business',
    rows: [
      { label: 'Multi-location dashboard', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'HIPAA-ready + BAA', recapture: 'Pro & Enterprise', podium: '$297/mo add-on', ghl: false, cartstack: false },
      { label: 'Weekly client reports', recapture: true, podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Pricing & Setup',
    rows: [
      { label: 'Transparent pricing', recapture: '$197-397/mo', podium: 'Quote only', ghl: '$150/mo', cartstack: '$39-169/mo' },
      { label: 'Free trial', recapture: '14 days', podium: 'None listed', ghl: '$7 paid trial', cartstack: '14 days' },
    ],
  },
]

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function Val({ v }: { v: string | boolean }) {
  if (v === true) return <Check />
  if (v === false) return <Cross />
  return <span style={{ fontSize: '0.825rem' }}>{v}</span>
}

export default function WhyUsPage() {
  return (
    <div className="blog-post">
      <BlogNav />
      <ScrollReveal />

      <div style={{ maxWidth: '100%', background: 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url("/hero-bg.jpg") center/cover no-repeat', padding: '8rem 2rem 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Why Us</p>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>Built for Multi-Location Businesses. Nothing Else Comes Close.</h1>
          <p style={{ fontSize: '1.0625rem', color: '#777', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>Podium charges $399+/mo to manage reviews and messaging. GoHighLevel charges $297/mo just to add HIPAA. Neither one recovers the leads your forms are losing every single day. ReCapture does — across every location, every form, every industry.</p>
        </div>
      </div>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem 3rem' }}>

        {/* ── What Sets Us Apart ──────────────────────────────────────── */}
        <h2 className="reveal">What Sets Us Apart</h2>
        <p className="reveal">Every competitor in this space tells you <em>where</em> people drop off. None of them give you <em>who</em> dropped off — with their name, email, phone number, and what they were looking for. And none of them do what comes next.</p>

      </div>

      <TakedownCards />

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem 3rem' }}>

        <WhyUsAccordion />

        <h2 className="reveal">ReCapture vs the Competition</h2>
        <p className="reveal">Here&apos;s how we stack up against the tools your enterprise clients are already evaluating.</p>

        {/* Desktop Table */}
        <div className="compare-desktop reveal" style={{ margin: '3rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', background: '#0d0d0d', borderRadius: '12px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 0.75rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #1a1a1a', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', width: '24%' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '1.25rem 0.5rem', color: '#ff6b35', fontWeight: 700, fontSize: '0.9rem', background: 'rgba(255, 107, 53, 0.06)', borderBottom: '1px solid #1a1a1a', width: '19%' }}>ReCapture</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.5rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a', width: '19%' }}>Podium</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.5rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a', width: '19%' }}>GoHighLevel</th>
                <th style={{ textAlign: 'center', padding: '1rem 0.5rem', color: '#888', fontWeight: 600, borderBottom: '1px solid #1a1a1a', width: '19%' }}>CartStack</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, sIdx) => (
                <Fragment key={sIdx}>
                  <tr>
                    <td colSpan={5} style={{ padding: '1.5rem 0.75rem 0.5rem', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.18em', color: '#ff6b35', textTransform: 'uppercase', borderBottom: '1px solid #1a1a1a' }}>
                      {section.category}
                    </td>
                  </tr>
                  {section.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td style={{ textAlign: 'left', padding: '0.875rem 0.75rem', color: '#ccc', borderBottom: '1px solid #111' }}>{row.label}</td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 0.5rem', borderBottom: '1px solid #111', background: 'rgba(255, 107, 53, 0.03)' }}><Val v={row.recapture} /></td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 0.5rem', color: '#888', borderBottom: '1px solid #111' }}><Val v={row.podium} /></td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 0.5rem', color: '#888', borderBottom: '1px solid #111' }}><Val v={row.ghl} /></td>
                      <td style={{ textAlign: 'center', padding: '0.875rem 0.5rem', color: '#888', borderBottom: '1px solid #111' }}><Val v={row.cartstack} /></td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="compare-mobile reveal" style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {sections.map((section, sIdx) => (
            <div key={sIdx}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.18em', color: '#ff6b35', textTransform: 'uppercase', margin: '0 0 0.625rem 0.25rem' }}>{section.category}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {section.rows.map((row, rIdx) => (
                  <div key={rIdx} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{row.label}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem', background: 'rgba(255,107,53,0.04)', borderRadius: 6 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ff6b35' }}>ReCapture</span>
                        <span style={{ color: row.recapture === true ? '#22c55e' : row.recapture === false ? '#444' : '#aaa', fontSize: '0.8rem' }}><Val v={row.recapture} /></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>Podium</span>
                        <span style={{ color: '#888', fontSize: '0.8rem' }}><Val v={row.podium} /></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>GoHighLevel</span>
                        <span style={{ color: '#888', fontSize: '0.8rem' }}><Val v={row.ghl} /></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>CartStack</span>
                        <span style={{ color: '#888', fontSize: '0.8rem' }}><Val v={row.cartstack} /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="reveal">The Honest Breakdown</h2>

        <p><strong style={{ color: '#fff' }}>Podium ($399-599/mo)</strong> is a strong tool for messaging, reviews, and payments — things multi-location businesses already pay for. What it doesn&apos;t do: capture partial form data, score abandoned leads, send recovery emails, or tell you who almost booked. Businesses that use Podium and ReCapture together get the full picture. Those that only use Podium are leaving invisible pipeline on the table.</p>

        <p><strong style={{ color: '#fff' }}>GoHighLevel ($97-497/mo)</strong> is an all-in-one agency platform with CRM, funnels, and automation built for marketing agencies reselling to clients. It added partial survey capture in 2025 — but only for multi-step surveys where email is collected on page 1. No exit-intent. No mid-field capture. No recovery UX. HIPAA compliance is a $297/mo add-on. For agencies who need form abandonment on top of GHL, ReCapture is the purpose-built upgrade.</p>

        <p><strong style={{ color: '#fff' }}>CartStack ($39-169/mo)</strong> is the closest form-abandonment tool to ReCapture — but built for e-commerce carts and hotel bookings, not high-ticket service forms. It recovers ~20% of abandoned shopping carts via email, SMS, and push notifications. What it doesn&apos;t do: instant SMS alerts to your staff, AI voice callback, lead scoring for service intent, multi-location dashboards across franchises, or HIPAA compliance. CartStack converts cart abandoners. ReCapture recovers $5,000 dental consults and $50,000 luxury condo leads.</p>

        <h2 className="reveal">Who ReCapture Is Built For</h2>
        <p>Any business with a contact form and more than one location losing leads every day. A dental group with 8 offices. A med spa franchise with 15 locations. A property management company with 200 units. A luxury real estate team covering three markets. The common thread: high-ticket services where a single recovered lead is worth $1,500 to $10,000 — and where 60-70% of people who start a form never finish it.</p>
        <p>ReCapture captures every partial submission, scores each lead by intent, alerts your team in real time, and automatically sends a branded recovery email — across every location, under one dashboard. No other tool does all four. Not Podium. Not GoHighLevel. Not CartStack.</p>

        <h2 className="reveal">The Bottom Line</h2>
        <div className="reveal" style={{ borderLeft: '3px solid #ff6b35', background: '#111', borderRadius: '0 10px 10px 0', padding: '1.5rem 2rem', margin: '2rem 0' }}>
          <p style={{ color: '#bbb', lineHeight: 1.8, margin: 0 }}>Podium tells you who messaged you. GoHighLevel helps you follow up with submitted leads. CartStack recovers e-commerce carts. ReCapture captures <em>who</em> dropped off, scores how serious they were, alerts you in real time, calls them back with Ai within 60 seconds, and automatically brings them back. That&apos;s not analytics. That&apos;s recovered revenue.</p>
        </div>

        <div className="reveal" style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0' }}>Ready to recover your lost leads?</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0' }}>Start your free trial — full access from day one. No setup fees. Cancel anytime.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
            <Link href="/start-trial" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start Your 7-Day Free Trial</Link>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  )
}
