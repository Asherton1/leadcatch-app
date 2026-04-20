'use client'

import { useState, useEffect } from 'react'

const features = [
  {
    title: 'Ai Voice Callback',
    text: 'Lead abandons your form with a phone number? Our Ai calls them back within 60 seconds on behalf of your business. Natural voice, real conversation, 391% higher conversion.',
    icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />'
  },
  {
    title: 'Real-Time Capture',
    text: 'The instant a visitor types into your form, their name, email, and phone are captured. Before they hit submit. Before they leave. Before you lose them.',
    icon: '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />'
  },
  {
    title: 'The Invisible Pipeline',
    text: "These leads don\u2019t exist in your CRM. They don\u2019t show up in Google Analytics. They never hit submit. But they were there \u2014 ready to book. We make them visible.",
    icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />'
  },
  {
    title: 'Automated Recovery',
    text: "ReCapture emails abandoned leads on your behalf automatically \u2014 with your branding, your name, and timing you control. They come back without you lifting a finger.",
    icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />'
  },
  {
    title: 'Lead Pipeline',
    text: "Track every lead from capture to close \u2014 Open, Contacted, Converted, or Lost. Know your exact recovery rate and see which follow-ups work.",
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />'
  },
  {
    title: 'Revenue-at-Risk Calculator',
    text: "Every abandoned lead shows its dollar value based on your average service price. Watch the revenue you\u2019re losing add up \u2014 then recover it.",
    icon: '<line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />'
  },
  {
    title: 'Analytics Dashboard',
    text: 'Real-time metrics, revenue tracking, and complete visibility into every lead. Updated the moment someone touches your form.',
    icon: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />'
  },
  {
    title: 'Connect to Any CRM',
    text: 'Send captured leads to HubSpot, Salesforce, GoHighLevel, or any tool you already use. Works with Zapier, Make, and custom webhooks.',
    icon: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />'
  },
  {
    title: 'Universal Tracking',
    text: 'One script tag works on any website \u2014 WordPress, Wix, Webflow, Squarespace, custom HTML. Install in 60 seconds.',
    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />'
  },
  {
    title: 'Weekly Reports & Export',
    text: 'Performance reports delivered to your inbox every Monday. Export your leads to CSV anytime. Your data, your way.',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />'
  },
]
export default function FeaturesAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isMobile) {
    return (
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
            </div>
            <h3 className="feature-card-title">{f.title}</h3>
            <p className="feature-card-text">{f.text}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
      {features.map((f, i) => (
        <div
          key={i}
          style={{
            borderBottom: '1px solid #1e1e1e',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#ff6b35' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'stroke 0.3s' }} dangerouslySetInnerHTML={{ __html: f.icon }} />
            <span style={{ flex: 1, fontSize: '1rem', fontWeight: 600, color: openIdx === i ? '#ff6b35' : '#fff', transition: 'color 0.3s' }}>{f.title}</span>
            <span style={{ color: openIdx === i ? '#ff6b35' : '#555', fontSize: '1.25rem', transition: 'transform 0.3s, color 0.3s', transform: openIdx === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
          </button>
          <div style={{
            maxHeight: openIdx === i ? '200px' : '0',
            opacity: openIdx === i ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
            overflow: 'hidden',
          }}>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, padding: '0 0 1.25rem 2.5rem', margin: 0 }}>{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
