'use client'

import { useState, useEffect } from 'react'

const problems = [
  {
    num: '01',
    title: 'They Start. Then Vanish.',
    text: "A prospect finds your site, opens your form, types their name and email \u2014 then their phone buzzes. They switch tabs. They never come back. And you never knew they existed."
  },
  {
    num: '02',
    title: 'Every Extra Field Costs You',
    text: "Five fields might seem reasonable \u2014 but data shows most visitors abandon after three. Every extra field is a silent conversion killer. And until now, you had no way to see it."
  },
  {
    num: '03',
    title: 'Ghost Leads Are Bleeding You Dry',
    text: "If 100 visitors start your form and 60 don\u2019t finish, that\u2019s 15\u201320 lost bookings per month. For a $1,500 average service, that\u2019s $22k\u2013$30k walking out the door. Every single month."
  },
]

export default function ProblemAccordion() {
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
      <div className="problem-grid">
        {problems.map((p, i) => (
          <div className="problem-card fade-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="problem-number">{p.num}</div>
            <h3 className="problem-title">{p.title}</h3>
            <p className="problem-text">{p.text}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {problems.map((p, i) => (
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
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ff6b35', fontFamily: 'monospace', flexShrink: 0, transition: 'color 0.3s' }}>{p.num}</span>
            <span style={{ flex: 1, fontSize: '1rem', fontWeight: 600, color: openIdx === i ? '#ff6b35' : '#fff', transition: 'color 0.3s' }}>{p.title}</span>
            <span style={{ color: openIdx === i ? '#ff6b35' : '#555', fontSize: '1.25rem', transition: 'transform 0.3s, color 0.3s', transform: openIdx === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
          </button>
          <div style={{
            maxHeight: openIdx === i ? '200px' : '0',
            opacity: openIdx === i ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
            overflow: 'hidden',
          }}>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, padding: '0 0 1.25rem 2.25rem', margin: 0 }}>{p.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
