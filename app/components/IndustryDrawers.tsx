'use client'

import { useState } from 'react'
import './industry-drawers.css'

type Industry = {
  slug: string
  label: string
  headline: string
  value: string
  detail: string[]
  icon: React.ReactNode
}

const INDUSTRIES: Industry[] = [
  {
    slug: '/for-legal',
    label: 'Law Firms',
    headline: 'Most intake forms are never submitted',
    value: 'Typical matter: $20,000. One recovered case covers the year many times over.',
    detail: [
      'Legal intake forms are long by necessity — matter type, county, a description of the situation. People start them at eleven at night, after something happened, and often stop partway through.',
      'Recovery holds for conflict-check review, so nothing goes out until your intake team clears it. Messages never reference the matter type or anything the person typed about their circumstances.',
    ],
    icon: <><path d="M12 3v18"/><path d="M5 7h14"/><path d="M6.5 7 4 14h5z"/><path d="M17.5 7 15 14h5z"/><path d="M4 14a2.5 2.5 0 0 0 5 0"/><path d="M15 14a2.5 2.5 0 0 0 5 0"/><path d="M8 21h8"/></>,
  },
  {
    slug: '/for-luxury-real-estate',
    label: 'Luxury Real Estate',
    headline: 'Property inquiries leak before they reach your CRM',
    value: 'Typical commission: $12,000. One recovered buyer pays for the entire year.',
    detail: [
      'Buyers browse listings across days and devices before they inquire. The ones who start a form and get pulled away are frequently the most serious — they were far enough along to type their details.',
      'Every recovered inquiry carries the listing they were looking at and the campaign that brought them, so follow-up starts where they left off rather than from scratch.',
    ],
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  },
  {
    slug: '/for-plastic-surgery',
    label: 'Plastic Surgery',
    headline: 'Consultation forms are where hesitation shows up',
    value: 'Typical procedure: $6,500. Recover the patients who got cold feet.',
    detail: [
      'Elective procedures involve real deliberation. Someone starts a consultation request, hesitates, and closes the tab — then comes back a week later and starts again. Both attempts are invisible to your practice.',
      'We surface the repeat visits, so your coordinator knows which enquiries are genuinely considering rather than browsing. Contact fields only, never anything typed into a free-text box.',
    ],
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
  },
  {
    slug: '/for-property-management',
    label: 'Property Management',
    headline: 'Leasing inquiries abandon on mobile, constantly',
    value: 'Typical lease: $3,200/yr. One dashboard across 10 to 500+ properties.',
    detail: [
      'Renters inquire from phones, usually in the evening, often across several properties in one session. Tour request forms are long, and most people do not finish them.',
      'Every property reports into one console with its own view, so a regional manager sees the whole portfolio and each site sees only itself.',
    ],
    icon: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></>,
  },
  {
    slug: '/for-med-spas',
    label: 'Med Spas',
    headline: 'You already paid to acquire the people who did not finish',
    value: 'Typical client value: $2,800. Recover the leads your ads bought.',
    detail: [
      'Med spa traffic is overwhelmingly paid and overwhelmingly mobile. When someone abandons a consultation form, that click has already cost you — and your ad platforms never learn that person was interested.',
      'Recovered inquiries go back to Meta and Google as conversion events, so campaigns optimise against real demand rather than the fraction who submitted.',
    ],
    icon: <><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></>,
  },
  {
    slug: '/for-dental',
    label: 'Dental Practices',
    headline: 'Appointment requests start after hours and stall',
    value: 'Typical patient value: $1,500+. Most inquiries arrive when nobody is at the desk.',
    detail: [
      'Dental appointment forms get started in the evening, when the practice is closed and nobody is answering. By morning the person has often booked somewhere else.',
      'Recovery runs on the schedule you set, so follow-up lands the moment the office opens rather than three days later.',
    ],
    icon: <><path d="M7 2C4 2 2 5 2 8c0 3 1 5 2 7s2 5 3 7c.5 1 1.5 1 2 0 .5-1.5 1-3 3-3s2.5 1.5 3 3c.5 1 1.5 1 2 0 1-2 2-5 3-7s2-4 2-7c0-3-2-6-5-6-1.5 0-2.5.5-3 2-.5-1.5-1.5-2-3-2z"/></>,
  },
]

export default function IndustryDrawers() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="ind-grid">
      {INDUSTRIES.map(ind => {
        const isOpen = open === ind.slug
        return (
          <div className={'ind-card' + (isOpen ? ' ind-open' : '')} key={ind.slug}>
            <button
              className="ind-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : ind.slug)}
            >
              <span className="ind-tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ind.icon}</svg>
                {ind.label}
              </span>
              <span className="ind-headline">{ind.headline}</span>
              <span className="ind-value">{ind.value}</span>
              <span className="ind-more">
                {isOpen ? 'Less' : 'More'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ind-chev">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </button>

            <div className="ind-drawer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="ind-drawer-inner">
                <div className="ind-drawer-body">
                  {ind.detail.map((d, i) => <p key={i}>{d}</p>)}
                  <a href={ind.slug} className="ind-link">
                    See how it works for {ind.label.toLowerCase()}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
