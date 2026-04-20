'use client'

import { useState } from 'react'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import Link from 'next/link'
import '../blog/blog.css'
import '../landing.css'

function Icon({ type }: { type: string }) {
  const s = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: '#ff6b35', strokeWidth: '1.5', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch(type) {
    case 'slack': return <svg {...s}><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M14 20.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/><path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z"/><path d="M10 3.5C10 4.33 9.33 5 8.5 5S7 4.33 7 3.5 7.67 2 8.5 2s1.5.67 1.5 1.5z"/></svg>
    case 'sms': return <svg {...s}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
    case 'email': return <svg {...s}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    case 'teams': return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'whatsapp': return <svg {...s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    case 'hubspot': return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>
    case 'salesforce': return <svg {...s}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    case 'ghl': return <svg {...s}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    case 'fub': return <svg {...s}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    case 'calendly': return <svg {...s}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M10 14l2 2 4-4"/></svg>
    case 'cal': return <svg {...s}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    case 'google': return <svg {...s}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    case 'meta': return <svg {...s}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
    case 'callrail': return <svg {...s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>
    case 'boulevard': return <svg {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    case 'dental': return <svg {...s}><path d="M12 22c-4.97 0-9-2.24-9-5v-1c0-.37.07-.73.2-1.08C4.3 12.55 7.82 11 12 11s7.7 1.55 8.8 3.92c.13.35.2.71.2 1.08v1c0 2.76-4.03 5-9 5z"/><path d="M12 11V2"/><path d="M8 6l4-4 4 4"/></svg>
    case 'dentrix': return <svg {...s}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6"/><path d="M12 6v6"/><path d="M9 15h6"/></svg>
    case 'appfolio': return <svg {...s}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    case 'nextech': return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    case 'zapier': return <svg {...s}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    case 'make': return <svg {...s}><polyline points="16 3 21 3 21 8"/><line x1="4" x2="21" y1="20" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" x2="21" y1="15" y2="21"/><line x1="4" x2="9" y1="4" y2="9"/></svg>
    case 'webhook': return <svg {...s}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    case 'api': return <svg {...s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" x2="10" y1="4" y2="20"/></svg>
    default: return <svg {...s}><circle cx="12" cy="12" r="10"/></svg>
  }
}

const categoryDescriptions: Record<string, string> = {
  'Alerts & Notifications': 'Speed to lead is everything. Research shows responding within 60 seconds makes you 391% more likely to convert. When someone abandons your form, your front desk gets an instant alert with their name, email, phone, and lead score. They pick up the phone while the prospect is still thinking about you — before they book with your competitor down the street.',
  'CRM & Sales': 'Recovered leads flow directly into your existing sales pipeline. No copy-pasting, no CSV imports, no manual data entry. Your team works from the tools they already know — the lead just appears, ready to follow up.',
  'Scheduling & Booking': 'The fastest path from recovered lead to revenue is getting them on the calendar. Auto-booking eliminates the back-and-forth and captures the appointment while intent is still high.',
  'Ad Platforms': 'Most businesses waste ad spend because Google and Meta never learn which leads actually converted. Feeding recovered leads back as offline conversions means your campaigns optimize for real revenue — not just form clicks.',
  'Practice Management': 'Your PMS is where patients and clients actually live. Native integrations mean recovered leads appear directly in your booking system, not in a separate dashboard your team has to check.',
  'Automation': 'Connect ReCapture to any tool in your stack. Webhooks fire in real time, APIs give you full control, and platforms like Zapier let you build any workflow without writing code.',
}

const integrations = [
  {
    category: 'Alerts & Notifications',
    items: [
      { name: 'Slack', desc: 'Instant lead alerts in your team channels with one-click actions', status: 'live', icon: 'slack' },
      { name: 'SMS Alerts', desc: 'Text alerts the moment a high-value lead abandons', status: 'live', icon: 'sms' },
      { name: 'Email (Resend)', desc: 'Automated branded recovery emails on your behalf', status: 'live', icon: 'email' },
      { name: 'Ai Voice Callback', desc: 'Ai calls abandoned leads back within 60 seconds on your behalf', status: 'live', icon: 'callrail' },
      { name: 'Microsoft Teams', desc: 'Lead alerts with action buttons for your front desk', status: 'coming', icon: 'teams' },
      { name: 'WhatsApp Business', desc: 'Recovery messages for international luxury buyers', status: 'coming', icon: 'whatsapp' },
    ]
  },
  {
    category: 'CRM & Sales',
    items: [
      { name: 'HubSpot', desc: 'Sync recovered leads directly into your HubSpot pipeline', status: 'coming', icon: 'hubspot' },
      { name: 'Salesforce', desc: 'Push leads to Salesforce with custom field mapping', status: 'coming', icon: 'salesforce' },
      { name: 'GoHighLevel', desc: 'Native integration for GHL agency clients', status: 'coming', icon: 'ghl' },
      { name: 'Follow Up Boss', desc: 'Auto-create contacts for luxury real estate teams', status: 'coming', icon: 'fub' },
    ]
  },
  {
    category: 'Scheduling & Booking',
    items: [
      { name: 'Calendly', desc: 'Auto-book recovered leads into available slots', status: 'coming', icon: 'calendly' },
      { name: 'Cal.com', desc: 'Open-source scheduling integration', status: 'coming', icon: 'cal' },
    ]
  },
  {
    category: 'Ad Platforms',
    items: [
      { name: 'Google Ads', desc: 'Feed recovered leads back as offline conversions for smarter bidding', status: 'coming', icon: 'google' },
      { name: 'Meta Ads', desc: 'Conversions API integration for optimized ad spend', status: 'coming', icon: 'meta' },
      { name: 'CallRail', desc: 'Track calls from recovered leads back to campaigns', status: 'coming', icon: 'callrail' },
    ]
  },
  {
    category: 'Practice Management',
    items: [
      { name: 'Boulevard', desc: 'Sync leads to your med spa booking system', status: 'coming', icon: 'boulevard' },
      { name: 'Open Dental', desc: 'Push recovered patients into your dental PMS', status: 'coming', icon: 'dental' },
      { name: 'Dentrix', desc: 'Enterprise dental practice management integration', status: 'coming', icon: 'dentrix' },
      { name: 'AppFolio', desc: 'Leasing lead sync for property management', status: 'coming', icon: 'appfolio' },
      { name: 'Nextech', desc: 'Plastic surgery and LASIK practice management', status: 'coming', icon: 'nextech' },
    ]
  },
  {
    category: 'Automation',
    items: [
      { name: 'Zapier', desc: 'Connect ReCapture to 6,000+ apps with no code', status: 'live', icon: 'zapier' },
      { name: 'Make (Integromat)', desc: 'Advanced workflow automation', status: 'coming', icon: 'make' },
      { name: 'Webhooks', desc: 'Send lead data to any endpoint in real time', status: 'live', icon: 'webhook' },
      { name: 'REST API', desc: 'Full API access for custom integrations', status: 'live', icon: 'api' },
      { name: 'Ai Voice Callback', desc: 'Trigger automated Ai callbacks via API when leads abandon forms', status: 'live', icon: 'callrail' },
    ]
  },
]

function CategorySection({ group }: { group: typeof integrations[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="reveal" style={{ marginBottom: '3rem' }}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #1e1e1e', cursor: 'pointer', marginBottom: expanded ? '0' : '1.25rem' }}
        onClick={() => setExpanded(!expanded)}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '-0.01em', margin: 0 }}>{group.category}</h2>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div style={{
        maxHeight: expanded ? '300px' : '0',
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease, padding 0.3s ease',
        margin: expanded ? '0.75rem 0 1.25rem' : '0',
      }}>
        <div style={{ background: 'rgba(255,107,53,0.03)', border: '1px solid rgba(255,107,53,0.08)', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <p style={{ color: '#999', fontSize: '0.875rem', lineHeight: 1.8, margin: 0 }}>{categoryDescriptions[group.category]}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {group.items.map((item, ii) => (
          <div key={ii} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '0.75rem', padding: '1.25rem', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon type={item.icon} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>{item.name}</span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '3px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap' as const,
                background: item.status === 'live' ? 'rgba(34,197,94,0.1)' : 'transparent',
                color: item.status === 'live' ? '#22c55e' : '#555',
                border: item.status === 'live' ? '1px solid rgba(34,197,94,0.2)' : '1px solid #333',
              }}>{item.status === 'live' ? 'Live' : 'Coming Soon'}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function IntegrationsPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <BlogNav />
      <ScrollReveal />

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '10rem 2rem 4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', color: '#ff6b35', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Integrations</p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem' }}>
          Connect <span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span> to Everything
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 3rem' }}>
          Your recovered leads flow directly into the tools your team already uses. No copy-pasting. No manual imports. Real-time sync from the moment a lead is captured.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem' }}>
        {integrations.map((group, gi) => (
          <CategorySection key={gi} group={group} />
        ))}
      </section>

      <section className="reveal" style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '1rem', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: '#ff6b35', marginBottom: '0.75rem' }}>Need a Custom Integration?</h2>
          <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Our API and webhook system can connect ReCapture to any platform. Enterprise clients get white-glove integration support.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start-trial" style={{ background: '#ff6b35', color: '#fff', fontWeight: 700, fontSize: '0.9375rem', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', border: '1px solid #ff6b35' }}>Start Free Trial</Link>
            <a href="mailto:hello@userecapture.com" style={{ background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '0.9375rem', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', border: '1px solid #333' }}>Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
