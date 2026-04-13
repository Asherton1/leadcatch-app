'use client'

import { useState, useEffect } from 'react'

const steps = [
  {
    num: '01',
    title: 'Install in 60 Seconds',
    text: "Copy one line of code into your website. Works with WordPress, Wix, Webflow, Squarespace, or any custom site. Takes less time than making coffee."
  },
  {
    num: '02',
    title: 'Capture Every Lead',
    text: "The instant a visitor types into your form, ReCapture captures their name, email, and phone \u2014 even if they close the tab, get distracted, or abandon halfway through."
  },
  {
    num: '03',
    title: 'Recover Lost Revenue',
    text: "Reach out manually from your dashboard or let ReCapture send automated recovery emails on your behalf. Turn invisible drop-offs into booked appointments and closed revenue."
  },
]

export default function StepsAccordion() {
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
      <div className="how-it-works-grid">
        {steps.map((s, i) => (
          <div className="how-step" key={i}>
            <div className="how-step-num">{s.num}</div>
            <h3 className="how-step-title">{s.title}</h3>
            <p className="how-step-text">{s.text}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ borderBottom: '1px solid #1e1e1e' }}>
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
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35', fontFamily: 'monospace', flexShrink: 0, transition: 'color 0.3s' }}>{s.num}</span>
            <span style={{ flex: 1, fontSize: '1rem', fontWeight: 600, color: openIdx === i ? '#ff6b35' : '#fff', transition: 'color 0.3s' }}>{s.title}</span>
            <span style={{ color: openIdx === i ? '#ff6b35' : '#555', fontSize: '1.25rem', transition: 'transform 0.3s, color 0.3s', transform: openIdx === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
          </button>
          <div style={{
            maxHeight: openIdx === i ? '200px' : '0',
            opacity: openIdx === i ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
            overflow: 'hidden',
          }}>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, padding: '0 0 1.25rem 2.25rem', margin: 0 }}>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
