'use client'

import { useEffect, useRef, useState } from 'react'
import './integration-routes.css'

type Status = 'live' | 'webhook' | 'beta' | 'coming'
type Item = { name: string; desc: string; status: Status }
type Dest = { id: string; label: string; headline: string; blurb: string; items: Item[] }

const DESTS: Dest[] = [
  {
    id: 'team',
    label: 'Your team',
    headline: 'Somebody picks up the phone',
    blurb: 'The faster a person hears from you, the better this works. Alerts fire the moment an inquiry is captured, carrying the name, the contact details, and the intent score.',
    items: [
      { name: 'Slack', desc: 'Lead alerts in your team channels with one-click actions', status: 'live' },
      { name: 'SMS Alerts', desc: 'A text the moment a high-value inquiry abandons', status: 'live' },
      { name: 'Email', desc: 'Branded recovery emails sent on your behalf', status: 'live' },
      { name: 'Microsoft Teams', desc: 'Lead alerts in your Teams channels', status: 'live' },
      { name: 'AI Voice Callback', desc: 'An AI agent calls back within 60 seconds. Built and tested, not yet run on live traffic.', status: 'beta' },
      { name: 'WhatsApp Business', desc: 'Recovery messages for international buyers', status: 'coming' },
      { name: 'Telegram', desc: 'Direct alerts for international clients', status: 'coming' },
    ],
  },
  {
    id: 'crm',
    label: 'Your CRM',
    headline: 'The record lands where your team works',
    blurb: 'No copy-pasting, no CSV imports. The inquiry appears in the system your team already has open, usually within a minute of capture.',
    items: [
      { name: 'Any CRM via webhook', desc: 'Real-time push to any endpoint, Zapier, or Make', status: 'live' },
      { name: 'GoHighLevel', desc: 'Push abandoned leads straight into GHL workflows', status: 'live' },
      { name: 'HubSpot', desc: 'Push inquiries into your HubSpot pipeline', status: 'webhook' },
      { name: 'Salesforce', desc: 'Push leads with custom field mapping', status: 'webhook' },
      { name: 'Follow Up Boss', desc: 'Auto-create contacts for real estate teams', status: 'webhook' },
      { name: 'Boulevard', desc: 'Push inquiries into your med spa client database', status: 'webhook' },
      { name: 'AppFolio', desc: 'Push leasing inquiries into your prospect pipeline', status: 'webhook' },
      { name: 'Pipedrive', desc: 'Push inquiries into your sales pipeline', status: 'webhook' },
      { name: 'Zoho CRM', desc: 'Push leads into Zoho for international teams', status: 'webhook' },
      { name: 'Open Dental', desc: 'Recovered patients into your dental PMS', status: 'coming' },
      { name: 'Dentrix', desc: 'Enterprise dental practice management', status: 'coming' },
      { name: 'Nextech', desc: 'Plastic surgery and LASIK practice management', status: 'coming' },
      { name: 'Mindbody', desc: 'Med spa, fitness and wellness booking', status: 'coming' },
      { name: 'Vagaro', desc: 'Salon, spa and beauty booking', status: 'coming' },
      { name: 'Phreesia', desc: 'Patient intake for healthcare practices', status: 'coming' },
    ],
  },
  {
    id: 'calendar',
    label: 'Your calendar',
    headline: 'They book without a back-and-forth',
    blurb: 'Drop your booking link in once. Every recovery message becomes a direct path to a held appointment rather than an email thread.',
    items: [
      { name: 'Calendly', desc: 'Recovery emails link straight to your booking page', status: 'live' },
      { name: 'Cal.com', desc: 'Recovery emails link straight to your booking page', status: 'live' },
    ],
  },
  {
    id: 'ads',
    label: 'Your ad platforms',
    headline: 'The campaign learns from it',
    blurb: 'Meta and Google only ever see the people who press submit. We send them the ones who did not, hashed and deduplicated against your existing pixel, weighted by how much intent each person showed.',
    items: [
      { name: 'Meta Ads', desc: 'Conversions API, deduplicated and intent-weighted', status: 'live' },
      { name: 'Google Ads', desc: 'Offline conversion import for smarter bidding', status: 'live' },
      { name: 'CallRail', desc: 'Track calls from recovered inquiries back to campaigns', status: 'coming' },
    ],
  },
]

const EXTRAS: Item[] = [
  { name: 'Zapier', desc: 'Connect to 6,000+ apps with no code', status: 'live' },
  { name: 'Make', desc: 'Advanced workflow automation, fires in real time', status: 'live' },
  { name: 'Webhooks', desc: 'Send lead data to any endpoint in real time', status: 'live' },
  { name: 'REST API', desc: 'Full API access for custom integrations', status: 'live' },
]

const LABEL: Record<Status, string> = {
  live: 'Live', webhook: 'Via webhook', beta: 'Beta', coming: 'Roadmap',
}

/* four bezier paths fanning from one point to four */
const PATHS = [
  'M 500 0 C 500 46, 125 44, 125 96',
  'M 500 0 C 500 46, 375 44, 375 96',
  'M 500 0 C 500 46, 625 44, 625 96',
  'M 500 0 C 500 46, 875 44, 875 96',
]

function Panel({ d }: { d: Dest }) {
  return (
    <>
      <p className="ir-blurb">{d.blurb}</p>
      <div className="ir-items">
        {d.items.map((it, n) => (
          <div className={'ir-item ir-item-' + it.status} key={it.name} style={{ ['--n' as string]: n }}>
            <div className="ir-item-top">
              <span className="ir-item-name">{it.name}</span>
              <span className={'ir-badge ir-badge-' + it.status}>{LABEL[it.status]}</span>
            </div>
            <p className="ir-item-desc">{it.desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default function IntegrationRoutes() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [on, setOn] = useState(false)
  const [open, setOpen] = useState<string>('team')

  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [on])

  const active = DESTS.find(d => d.id === open)!

  return (
    <div className={'ir' + (on ? ' ir-on' : '')} ref={ref}>

      {/* The inquiry */}
      <div className="ir-arrival">
        <div className="ir-card">
          <div className="ir-card-head">
            <span className="ir-card-pip" aria-hidden="true" />
            Inquiry captured
            <span className="ir-card-time">just now</span>
          </div>
          <div className="ir-card-name">Sarah Whitfield</div>
          <div className="ir-card-meta">s.whitfield@gmail.com &middot; 214-555-0182 &middot; 4 of 6 fields</div>
        </div>
        <p className="ir-arrival-note">She never pressed submit. Here is everywhere she goes next &mdash; all of it at once.</p>
      </div>

      {/* The branch */}
      <svg className="ir-branch" viewBox="0 0 1000 96" preserveAspectRatio="none" aria-hidden="true">
        {PATHS.map((d, i) => (
          <g key={i}>
            <path d={d} className="ir-path" style={{ ['--d' as string]: i * 0.12 + 's' }} />
            <circle r="3.5" className="ir-dot">
              <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.45}s`} path={d} />
            </circle>
          </g>
        ))}
      </svg>

      {/* The destinations */}
      <div className="ir-dests">
        {DESTS.map((d, i) => {
          const live = d.items.filter(x => x.status === 'live').length
          return (
            <div className="ir-slot" key={d.id}>
            <button
              className={'ir-dest' + (open === d.id ? ' ir-active' : '')}
              style={{ ['--i' as string]: i }}
              onClick={() => setOpen(d.id)}
              type="button"
            >
              <span className="ir-dest-label">{d.label}</span>
              <span className="ir-dest-headline">{d.headline}</span>
              <span className="ir-dest-count"><b>{live}</b> live &middot; {d.items.length} total</span>
            </button>
            {open === d.id && (
              <div className="ir-panel ir-panel-inline">
                <Panel d={d} />
              </div>
            )}
            </div>
          )
        })}
      </div>

      {/* Detail — desktop position, below the row */}
      <div className="ir-panel ir-panel-below" key={active.id}>
        <Panel d={active} />
      </div>

      <div className="ir-extras">
        <div className="ir-extras-head">And anything else you run</div>
        <div className="ir-extras-grid">
          {EXTRAS.map(it => (
            <div className="ir-extra" key={it.name}>
              <span className="ir-extra-name">{it.name}</span>
              <span className="ir-extra-desc">{it.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
