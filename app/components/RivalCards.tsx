'use client'

import './rival-cards.css'

const RIVALS = [
  {
    name: 'Podium',
    price: '$399\u2013599/mo',
    kind: 'Messaging & reviews',
    good: 'Strong at messaging, reviews, and payments \u2014 things multi-location businesses already pay for and genuinely need.',
    gap: [
      'No partial form capture',
      'No scoring of abandoned leads',
      'No recovery messaging',
      'Cannot tell you who almost booked',
    ],
    close: 'Businesses running both get the full picture. Podium alone leaves invisible pipeline on the table.',
  },
  {
    name: 'GoHighLevel',
    price: '$97\u2013497/mo',
    kind: 'All-in-one agency platform',
    good: 'CRM, funnels, and automation built for agencies reselling to clients. Added partial survey capture in 2025.',
    gap: [
      'Capture only on multi-step surveys',
      'Requires email collected on page one',
      'No exit intent, no mid-field capture',
      'HIPAA is a $297/mo add-on',
    ],
    close: 'For agencies who need real form abandonment on top of GHL, ReCapture is the purpose-built upgrade.',
  },
  {
    name: 'CartStack',
    price: '$39\u2013169/mo',
    kind: 'Cart abandonment',
    good: 'The closest tool to what we do \u2014 recovers around 20% of abandoned shopping carts via email, SMS, and push.',
    gap: [
      'Built for e-commerce carts, not service forms',
      'No instant SMS alerts to staff',
      'No AI voice callback',
      'No multi-location dashboard, no HIPAA',
    ],
    close: 'CartStack converts cart abandoners. ReCapture recovers $5,000 consults and $50,000 property inquiries.',
  },
]

export default function RivalCards() {
  return (
    <div className="rv">
      {RIVALS.map(r => (
        <div className="rv-card" key={r.name}>
          <div className="rv-head">
            <span className="rv-name">{r.name}</span>
            <span className="rv-price">{r.price}</span>
          </div>
          <div className="rv-kind">{r.kind}</div>

          <p className="rv-good">{r.good}</p>

          <div className="rv-gap-label">What it does not do</div>
          <ul className="rv-gap">
            {r.gap.map(g => <li key={g}>{g}</li>)}
          </ul>

          <p className="rv-close">{r.close}</p>
        </div>
      ))}
    </div>
  )
}
