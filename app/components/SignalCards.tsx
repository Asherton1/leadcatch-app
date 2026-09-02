'use client'

import { useState } from 'react'

const CARDS = [
  {
    id: 'see',
    kicker: 'The platforms',
    title: 'What they see',
    body: 'The people who finished. Every optimization decision, every lookalike audience, every dollar of budget gets made from that group alone.',
  },
  {
    id: 'miss',
    kicker: 'The platforms',
    title: 'What they miss',
    body: 'Everyone who typed their name, their email, their phone number, and then got pulled away. Real intent, demonstrated and then invisible.',
  },
  {
    id: 'do',
    kicker: 'ReCapture',
    title: 'What we do',
    body: 'We send them to Meta and Google as server-side conversion events — hashed, deduplicated against your existing pixel, and weighted by how much intent each one showed. A third-time returner does not look like a bounce.',
  },
  {
    id: 'you',
    kicker: 'Your dashboard',
    title: 'What you see',
    body: 'Every inquiry attributed to the channel that produced it — paid search, paid social, organic, referral, direct — broken out by campaign. Including the ones that never submitted.',
  },
]

export default function SignalCards() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="signal-grid">
      {CARDS.map(c => (
        <div className="signal-col" key={c.id}>
          <p className="signal-col-kicker">{c.kicker}</p>
          <p className="signal-col-label">{c.title}</p>

          <button
            className="sfl-toggle"
            type="button"
            aria-expanded={open === c.id}
            onClick={() => setOpen(open === c.id ? null : c.id)}
          >
            <span className="sfl-toggle-label">{open === c.id ? 'Close' : 'Read more'}</span>
            <span className={'sfl-chev' + (open === c.id ? ' up' : '')} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>

          <div className="sfl-drawer" style={{ gridTemplateRows: open === c.id ? '1fr' : '0fr' }}>
            <div className="sfl-drawer-inner">
              <p className="signal-col-body">{c.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
