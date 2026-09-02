import { Fragment } from 'react'
import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import '../blog/blog.css'
import '../landing.css'
import Footer from '../components/Footer'
import RelatedPages from '../components/RelatedPages'
import WhyUsAccordion from "../components/WhyUsAccordion"
import TakedownCards from "../components/TakedownCards"

export const metadata = {
  title: 'Why ReCapture vs Podium, GoHighLevel & CartStack',
  description: 'How ReCapture compares to Podium, GoHighLevel, and CartStack for form abandonment recovery. Built for multi-location businesses where a recovered lead is worth $1,500 to $10,000.',
  keywords: 'ReCapture vs Podium, ReCapture vs GoHighLevel, form abandonment recovery, multi-location lead recovery, enterprise form tracking',
  alternates: { canonical: '/why-us' },
  openGraph: {
    title: 'Why ReCapture vs Podium, GoHighLevel & CartStack',
    description: 'How ReCapture compares for form abandonment recovery. Built for multi-location businesses where a recovered lead is worth $1,500 to $10,000.',
    url: 'https://www.userecapture.com/why-us',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Why%20ReCapture%20vs%20The%20Rest&eyebrow=Why%20ReCapture',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why ReCapture vs Podium, GoHighLevel & CartStack',
    description: 'Built for multi-location businesses where a recovered lead is worth $1,500-$10,000.',
    images: ['https://www.userecapture.com/api/og?title=Why%20ReCapture%20vs%20The%20Rest&eyebrow=Why%20ReCapture'],
  },
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
      { label: 'Instant SMS lead alerts (to staff)', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'AI voice callback (60 seconds)', recapture: true, podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Intelligence',
    rows: [
      { label: 'Live visitor tracking', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'Field-level drop-off analysis', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'Inquiry timing breakdown', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'Recovery funnel reporting', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'Configurable comparison windows', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'CSV export with filters applied', recapture: true, podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Built for Service Business',
    rows: [
      { label: 'Multi-location dashboard', recapture: true, podium: false, ghl: false, cartstack: false },
      { label: 'HIPAA-ready + BAA', recapture: 'Enterprise', podium: '$297/mo add-on', ghl: false, cartstack: false },
      { label: 'Weekly client reports', recapture: true, podium: false, ghl: false, cartstack: false },
    ],
  },
  {
    category: 'Pricing & Setup',
    rows: [
      { label: 'Transparent pricing', recapture: '$397-$1,997+/mo', podium: 'Quote only', ghl: '$297-497/mo', cartstack: '$39-169/mo' },
      { label: 'Free trial', recapture: '7 days', podium: 'None listed', ghl: '14 days', cartstack: '14 days' },
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
    <div className="blog-post why-us-page">
      <BlogNav />
      <ScrollReveal />

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Why Us</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Built for multi-location businesses.</span>{' '}
            <span className="canon-hero-headline-muted">Podium and GoHighLevel charge hundreds per month and still don&apos;t recover the leads your forms are losing. ReCapture does &mdash; across every location, every form, every industry.</span>
          </h1>
        </div>
      </section>

      <div className="blog-post-body" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem 3rem' }}>

        {/* ── What Sets Us Apart ──────────────────────────────────────── */}
        <h2 className="reveal">Everything Else Starts at Submit</h2>
        <p className="reveal">A CRM records the people who finished. Analytics counts the ones who arrived. Your ad platforms only ever learn from the ones who converted. Every one of those tools begins at the same instant &mdash; the moment somebody presses the button. Which means the majority of people who wanted what you sell are, to every system you own, indistinguishable from someone who landed on the wrong page and left.</p>
        <p className="reveal">ReCapture starts one step earlier. That single shift changes what is knowable about your demand.</p>

        <h3 className="reveal">What they typed before they left</h3>
        <p className="reveal">Name, email, phone &mdash; the contact fields, captured as they are completed rather than when the form is sent. Never keystrokes, never free-text boxes. Someone who fills four fields and gets interrupted is a real inquiry that no other system in your stack will ever record.</p>

        <h3 className="reveal">Whether they have been back</h3>
        <p className="reveal">Somebody who starts your form three times across two weeks is telling you something a first-time visitor is not. Because none of those attempts ended in a submission, no CRM has any record of the pattern. We surface the repeat visits, weight them into the lead score, and show you exactly who is circling.</p>

        <h3 className="reveal">What they did first</h3>
        <p className="reveal">The pages they read, how long they spent, whether they came from a paid campaign or a search, which page finally pushed them to the form. Context that turns a follow-up from a cold call into a conversation that starts where they left off.</p>

        <h3 className="reveal">Which channel actually produced them</h3>
        <p className="reveal">Every report you get today counts submissions. So when you ask which campaign is working, the answer is built from the minority of people who finished a form &mdash; and the channels that produce hesitant, high-consideration prospects look worse than they are.</p>
        <p className="reveal">We attribute every captured inquiry back to the channel that produced it, whether or not it was ever submitted. Paid search, paid social, organic, referral, direct, broken out by campaign name across Google and Meta. Untagged traffic is handled too: Local Services Ads and anything without UTM parameters get attributed by platform rather than dropped, which matters if somebody else is managing your tagging.</p>

        <h3 className="reveal">And what your ad platforms get back</h3>
        <p className="reveal">Every recovered inquiry is sent to Meta&apos;s Conversions API and Google Ads as a server-side conversion event &mdash; hashed, deduplicated against your existing pixel, and weighted by how much intent the person actually showed. Your campaigns stop optimizing against the fraction who finished and start learning from the full picture. What you do with better data is your team&apos;s call. Getting it there is ours.</p>

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
          <p style={{ color: '#bbb', lineHeight: 1.8, margin: 0 }}>Podium tells you who messaged you. GoHighLevel helps you follow up with submitted leads. CartStack recovers e-commerce carts. ReCapture captures <em>who</em> dropped off, scores how serious they were, alerts you in real time, calls them back with AI within 60 seconds, and automatically brings them back. That&apos;s not analytics. That&apos;s recovered revenue.</p>
        </div>

        <div className="reveal" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
          <h3 style={{ color: '#ff6b35', fontSize: '1.5rem', margin: '0 0 0.75rem 0' }}>Ready to recover your lost leads?</h3>
          <p style={{ color: '#888', margin: '0 0 1.5rem 0' }}>Start your free trial — full access from day one. No setup fees. Cancel anytime.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem' }}>Try the Live Demo</Link>
            <Link href="/start-trial" style={{ display: 'inline-block', background: 'transparent', color: '#ff6b35', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', border: '1px solid rgba(255,107,53,0.4)' }}>Start your 7-day free trial</Link>
          </div>
        </div>

      </div>
      
      <RelatedPages page="why-us" />
      <Footer />
    </div>
  )
}
