'use client'

import { useState } from 'react'

type Bullet = { lead?: boolean; text: string }
type Takedown = { name: string; price: string; bullets: Bullet[] }

const takedowns: Takedown[] = [
  {
    name: 'Podium',
    price: '$399-599/mo + $50 per extra location',
    bullets: [
      { lead: true, text: 'Reported 8+ month implementation timelines — slowest in this comparison' },
      { text: 'No form abandonment capture at all — messaging and reviews only' },
      { text: "Quote-gated pricing — you can't see what you'll pay until you book a sales call" },
      { text: 'No revenue-at-risk dashboard, no lead scoring, no recovery emails' },
    ],
  },
  {
    name: 'GoHighLevel',
    price: '$297/mo + $297 HIPAA = $594/mo',
    bullets: [
      { lead: true, text: 'HIPAA add-on is irrevocable — once enabled, it cannot be canceled, refunded, or removed' },
      { text: 'No native integrations with Dentrix, Boulevard, AppFolio, or Nextech' },
      { text: 'Partial capture only on multi-step surveys where email is collected on page 1' },
      { text: 'Built for agencies — steep DIY learning curve for in-house teams' },
    ],
  },
  {
    name: 'CartStack',
    price: '$39-169/mo',
    bullets: [
      { lead: true, text: 'Built for Shopify carts and hotel bookings — not high-ticket service forms' },
      { text: 'No HIPAA, no BAA — disqualified for any healthcare practice' },
      { text: 'SMS goes to the abandoner — your staff never finds out' },
      { text: 'No multi-location dashboard, no AI voice callback, no service-intent scoring' },
    ],
  },
]

function Card({ data, index }: { data: Takedown; index: number }) {
  const [open, setOpen] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="td-card wow-card">
      <button onClick={() => setOpen(!open)} className="td-trigger" type="button" aria-expanded={open}>
        <div className="td-meta">
          <div className="td-num">{num}</div>
          <h3>{data.name}</h3>
          <p className="td-price">{data.price}</p>
        </div>
        <div className={`td-icon ${open ? 'td-icon-open' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </div>
      </button>
      <div className={`td-content ${open ? 'td-content-open' : ''}`}>
        <ul>
          {data.bullets.map((b, i) => (
            <li key={i} className={b.lead ? 'lead' : ''}>{b.text}</li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .td-card {
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
        }
        .td-trigger {
          width: 100%;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          font-family: inherit;
          color: inherit;
          cursor: default;
        }
        .td-meta { flex: 1; min-width: 0; }
        .td-num {
          width: 40px;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 107, 53, 0.3);
          font-family: 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #ff6b35;
          letter-spacing: 0.1em;
        }
        .td-meta h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #fff;
        }
        .td-price {
          color: #ff6b35;
          font-size: 0.875rem;
          font-weight: 700;
          margin: 0 0 1.25rem;
          line-height: 1.4;
        }
        .td-icon { display: none; }

        .td-content ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .td-content li {
          color: #888;
          font-size: 0.875rem;
          line-height: 1.6;
          padding-left: 1.5rem;
          position: relative;
        }
        .td-content li::before {
          content: '×';
          position: absolute;
          left: 0;
          color: #ef4444;
        }
        .td-content li.lead {
          color: #bbb;
        }
        .td-content li.lead::before {
          font-weight: 700;
        }

        @media (max-width: 760px) {
          .td-card {
            padding: 0;
          }
          .td-trigger {
            cursor: pointer;
            padding: 1.25rem 1.5rem;
            align-items: center;
          }
          .td-num {
            display: none;
          }
          .td-meta h3 { font-size: 1.05rem; margin: 0 0 0.25rem; }
          .td-price { font-size: 0.85rem; margin: 0; }
          .td-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #333;
            flex-shrink: 0;
            color: #666;
            transition: transform 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          }
          .td-icon-open {
            transform: rotate(45deg);
            border-color: #ff6b35;
            color: #ff6b35;
          }
          .td-content {
            max-height: 0;
            overflow: hidden;
            padding: 0 1.5rem;
            transition: max-height 0.4s ease, padding 0.4s ease;
          }
          .td-content-open {
            max-height: 800px;
            padding: 0 1.5rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default function TakedownCards() {
  return (
    <section className="lc-section reveal">
      <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', lineHeight: 1.2, marginBottom: '0.75rem', textAlign: 'center' }}>
        What They Don&apos;t Tell You
      </h2>
      <p className="section-subtitle" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        Three tools your clients are evaluating right now. Here&apos;s what their sales reps won&apos;t mention on the demo call.
      </p>

      <div className="td-grid">
        {takedowns.map((t, i) => <Card key={i} data={t} index={i} />)}
      </div>

      <div className="td-summary">
        <p>
          ReCapture starts at <strong>$197/mo</strong>. Transparent pricing, no add-ons, HIPAA included on Pro with no lock-in, one-day install. Built specifically for high-ticket service businesses — the buyers these tools weren&apos;t designed for.
        </p>
      </div>

      <style jsx>{`
        .td-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 3rem auto 0;
          padding: 0 2rem;
        }
        .td-summary {
          max-width: 1100px;
          margin: 2.5rem auto 0;
          padding: 0 2rem;
        }
        .td-summary p {
          border-left: 3px solid #ff6b35;
          background: #0d0d0d;
          border-radius: 0 10px 10px 0;
          padding: 1.5rem 2rem;
          margin: 0;
          color: #ccc;
          line-height: 1.75;
          font-size: 0.95rem;
        }
        .td-summary strong {
          color: #ff6b35;
        }
        @media (max-width: 760px) {
          .td-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin: 2rem auto 0;
            padding: 0 1.25rem;
          }
          .td-summary {
            margin: 2rem auto 0;
            padding: 0 1.25rem;
          }
          .td-summary p {
            padding: 1.25rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  )
}
