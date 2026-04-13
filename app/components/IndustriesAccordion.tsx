'use client'

import { useState } from 'react'
import Link from 'next/link'

const industries = [
  { label: 'Luxury Real Estate', href: '/for-luxury-real-estate', stat: '71% abandoned', value: '$12,000 avg. deal', desc: 'One recovered buyer pays for the entire year.' },
  { label: 'Luxury Auto', href: '/for-luxury-auto', stat: '74% abandoned', value: '$8,500 avg. deal', desc: 'Capture buyers before they drive to the next lot.' },
  { label: 'Plastic Surgery', href: '/for-plastic-surgery', stat: '72% abandoned', value: '$6,500 avg. procedure', desc: 'Recover patients who got cold feet.' },
  { label: 'Property Management', href: '/for-property-management', stat: '70% abandoned', value: '$3,200 avg. lease/yr', desc: 'Enterprise dashboard for 10 to 500+ properties.' },
  { label: 'Med Spas', href: '/for-med-spas', stat: '67% abandoned', value: '$2,800 avg. client', desc: 'Recover leads your ads already paid for.' },
  { label: 'Dental Practices', href: '/for-dental', stat: '65% abandoned', value: '$1,900 avg. patient', desc: 'Built for groups with 5 to 50+ offices.' },
]

export default function IndustriesAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="industries-accordion" style={{ maxWidth: '600px', margin: '2rem auto 0', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {industries.map((ind, i) => (
        <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#ff6b35', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ind.label}</span>
              <span style={{ color: '#555', fontSize: '0.75rem', marginLeft: '0.75rem' }}>{ind.stat}</span>
            </div>
            <span style={{ color: '#ff6b35', fontSize: '1.2rem', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#ff6b35', fontWeight: 600 }}>{ind.value}</span>
              </div>
              <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>{ind.desc}</p>
              <Link href={ind.href} style={{ color: '#ff6b35', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                Learn more →
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
