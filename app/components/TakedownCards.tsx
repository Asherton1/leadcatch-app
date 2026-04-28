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

function Card({ data }: { data: Takedown }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="td-card">
      <button onClick={() => setOpen(!open)} className="td-trigger" type="button" aria-expanded={open}>
        <div className="td-meta">
          <h3>{data.name}</h3>
          <p>{data.price}</p>
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
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 1rem;
          overflow: hidden;
        }
        .td-trigger {
          width: 100%;
          background: none;
          border: none;
          padding: 1.75rem 1.75rem 1rem;
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
        .td-meta h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #fff;
        }
        .td-meta p {
          color: #ff6b35;
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.4;
        }
        .td-icon { display: none; }

        .td-content {
          padding: 0 1.75rem 1.75rem;
        }
        .td-content ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        .td-content li {
          color: #888;
          font-size: 0.875rem;
          line-height: 1.55;
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
          font-size: 0.9rem;
        }
        .td-content li.lead::before {
          font-weight: 700;
        }

        @media (max-width: 760px) {
          .td-trigger {
            cursor: pointer;
            padding: 1.25rem 1.5rem;
            align-items: center;
          }
          .td-meta h3 { font-size: 1.05rem; margin: 0 0 0.25rem; }
          .td-meta p { font-size: 0.85rem; }
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
    <>
      <div className="td-grid reveal">
        {takedowns.map((t, i) => <Card key={i} data={t} />)}
      </div>

      <style jsx>{`
        .td-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin: 2rem 0 3rem;
        }
        @media (max-width: 760px) {
          .td-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin: 1.5rem 0 2rem;
          }
        }
      `}</style>
    </>
  )
}
