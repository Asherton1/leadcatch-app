'use client'

import { useState } from 'react'
import Link from 'next/link'

function IconHome() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function IconCar() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h8l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg> }
function IconScissors() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> }
function IconBuilding() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg> }
function IconSparkle() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg> }
function IconTooth() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2C4 2 2 5 2 8c0 3 1 5 2 7s2 5 3 7c.5 1 1.5 1 2 0 .5-1.5 1-3 3-3s2.5 1.5 3 3c.5 1 1.5 1 2 0 1-2 2-5 3-7s2-4 2-7c0-3-2-6-5-6-1.5 0-2.5.5-3 2-.5-1.5-1.5-2-3-2z"/></svg> }

const industries = [
  { Icon: IconHome, label: 'Luxury Real Estate', shortLabel: 'Real Estate', href: '/for-luxury-real-estate', stat: '71% abandoned', value: '$12,000 avg. deal', desc: 'One recovered buyer pays for the entire year.' },
  { Icon: IconCar, label: 'Luxury Auto', shortLabel: 'Luxury Auto', href: '/for-luxury-auto', stat: '74% abandoned', value: '$8,500 avg. deal', desc: 'Capture buyers before they drive to the next lot.' },
  { Icon: IconScissors, label: 'Plastic Surgery', shortLabel: 'Plastic Surgery', href: '/for-plastic-surgery', stat: '72% abandoned', value: '$6,500 avg. procedure', desc: 'Recover patients who got cold feet.' },
  { Icon: IconBuilding, label: 'Property Mgmt', shortLabel: 'Property Mgmt', href: '/for-property-management', stat: '70% abandoned', value: '$3,200 avg. lease/yr', desc: 'Enterprise dashboard for 10 to 500+ properties.' },
  { Icon: IconSparkle, label: 'Med Spas', shortLabel: 'Med Spas', href: '/for-med-spas', stat: '67% abandoned', value: '$2,800 avg. client', desc: 'Recover leads your ads already paid for.' },
  { Icon: IconTooth, label: 'Dental Practices', shortLabel: 'Dental', href: '/for-dental', stat: '65% abandoned', value: '$1,900 avg. patient', desc: 'Built for groups with 5 to 50+ offices.' },
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ind.Icon />
              <span style={{ color: '#ff6b35', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ind.shortLabel}</span>
              <span style={{ color: '#555', fontSize: '0.75rem' }}>{ind.stat}</span>
            </div>
            <span style={{ color: '#ff6b35', fontSize: '1.2rem', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              <p style={{ color: '#ff6b35', fontSize: '0.8rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{ind.value}</p>
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
