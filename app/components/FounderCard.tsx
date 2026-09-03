'use client'

import { useState } from 'react'
import Image from 'next/image'
import './founder-card.css'

export default function FounderCard() {
  const [open, setOpen] = useState(false)

  return (
    <div className={'fc' + (open ? ' fc-open' : '')}>
      <button
        className="fc-top"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="fc-photo">
          <Image
            src="/founder.png"
            alt="Asherton Chraibi, founder of ReCapture"
            width={400}
            height={400}
            className="fc-img"
          />
        </span>

        <span className="fc-head">
          <span className="fc-eyebrow">Founder</span>
          <span className="fc-name">Asherton Chraibi</span>
          <span className="fc-loc">
            <span className="fc-dot" aria-hidden="true" />
            Dallas, Texas
          </span>
          <span className="fc-intro">
            A decade running paid acquisition for high-ticket businesses, and roughly $1M
            in managed ad spend across 38+ long-term client relationships. Not an agency.
            Not a freelancer. A partner who stays.
          </span>
          <span className="fc-cue">
            {open ? 'Close' : 'Read the rest'}
            <span className={'fc-chev' + (open ? ' up' : '')} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </span>
        </span>
      </button>

      <div className="fc-drawer" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="fc-drawer-inner">
          <div className="fc-bio" style={{ fontSize: '0.9rem', lineHeight: 1.72 }}>
            <p>I started in art and design with a minor in marketing and business, then spent the next decade running digital campaigns for high-ticket businesses. Med spas. Dental practices. Luxury real estate. Property management.</p>
            <p>I am equal parts creative and analytical &mdash; the kind of person who sees most of a form&rsquo;s traffic vanish before submit and cannot sleep until I understand why. Then builds the system to fix it. I am obsessed with the intersection of technology, behavioural psychology, and design that actually converts.</p>
            <p>Dallas became home, not because it was planned but because the city matched the energy. Most mornings start on the Katy Trail. Every other weekend I will try a restaurant I have not been to yet, or get lost in a conversation that goes longer than it should. The rest of the time, I am building. That same restless curiosity is what built ReCapture.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
