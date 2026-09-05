'use client'

import { useState } from 'react'
import './integration-routes.css'

type Status = 'live' | 'webhook' | 'beta' | 'coming'
type Item = { name: string; desc: string; status: Status }
type Route = {
  id: string
  tone: string
  label: string
  headline: string
  blurb: string
  items: Item[]
}

const ROUTES: Route[] = [
  {
    id: 'team',
    tone: 'amber',
    label: 'Your team',
    headline: 'Somebody picks up the phone',
    blurb: 'The faster a person hears from you, the better this works. Alerts fire the moment an inquiry is captured, carrying the name, the contact details, and the intent score.',
    items: [
      { name: 'Slack', desc: 'Lead alerts in your team channels with one-click actions', status: 'live' },
      { name: 'SMS Alerts', desc: 'A text the moment a high-value inquiry abandons', status: 'live' },
      { name: 'Email', desc: 'Branded recovery emails sent on your behalf', status: 'live' },
      { name: 'Microsoft Teams', desc: 'Lead alerts in your Teams channels', status: 'live' },
      { name: 'AI Voice Callback', desc: 'An AI agent calls the lead back within 60 seconds. Built and tested, not yet run on live traffic.', status: 'beta' },
      { name: 'WhatsApp Business', desc: 'Recovery messages for international buyers', status: 'coming' },
      { name: 'Telegram', desc: 'Direct alerts for international clients', status: 'coming' },
    ],
  },
  {
    id: 'crm',
    tone: 'blue',
    label: 'Your CRM',
    headline: 'The record lands where your team works',
    blurb: 'No copy-pasting, no CSV imports. The inquiry appears in the system your team already has open, usually within a minute of capture.',
    items: [
      { name: 'Any CRM via webhook', desc: 'Real-time push to any endpoint, Zapier, or Make', status: 'live' },
      { name: 'GoHighLevel', desc: 'Push abandoned leads straight into GHL workflows', status: 'live' },
      { name: 'HubSpot', desc: 'Push abandoned inquiries into your HubSpot pipeline', status: 'webhook' },
      { name: 'Salesforce', desc: 'Push leads with custom field mapping', status: 'webhook' },
      { name: 'Follow Up Boss', desc: 'Auto-create contacts for real estate teams', status: 'webhook' },
      { name: 'Boulevard', desc: 'Push inquiries into your client database for med spa, plastic surgery and dermatology', status: 'webhook' },
      { name: 'AppFolio', desc: 'Push leasing inquiries into your prospect pipeline', status: 'webhook' },
      { name: 'Pipedrive', desc: 'Push abandoned inquiries into your sales pipeline', status: 'webhook' },
      { name: 'Zoho CRM', desc: 'Push leads into Zoho for international teams', status: 'webhook' },
      { name: 'Open Dental', desc: 'Recovered patients into your dental PMS', status: 'coming' },
      { name: 'Dentrix', desc: 'Enterprise dental practice management', status: 'coming' },
      { name: 'Nextech', desc: 'Plastic surgery and LASIK practice management', status: 'coming' },
      { name: 'Mindbody', desc: 'Med spa, fitness and wellness booking', status: 'coming' },
      { name: 'Vagaro', desc: 'Salon, spa and beauty booking', status: 'coming' },
      { name: 'Phreesia', desc: 'Patient intake and engagement for healthcare', status: 'coming' },
    ],
  },
  {
    id: 'calendar',
    tone: 'violet',
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
    tone: 'green',
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
  live: 'Live', webhook: 'Via webhook', beta: 'Beta', coming: 'On the roadmap',
}

function Badge({ s }: { s: Status }) {
  return <span className={'ir-badge ir-badge-' + s}>{LABEL[s]}</span>
}

export default function IntegrationRoutes() {
  const [open, setOpen] = useState<string | null>('crm')

  return (
    <div className="ir">
      <div className="ir-hub">
        <div className="ir-origin">
          <span className="ir-origin-pip" aria-hidden="true" />
          <span className="ir-origin-label">An inquiry is captured</span>
        </div>
        <div className="ir-spine" aria-hidden="true">
          <span className="ir-packet" />
          <span className="ir-packet ir-packet-2" />
        </div>
      </div>

      <div className="ir-routes">
        {ROUTES.map((r, i) => {
          const isOpen = open === r.id
          const liveCount = r.items.filter(i2 => i2.status === 'live').length
          return (
            <div
              className={'ir-route ir-tone-' + r.tone + (isOpen ? ' ir-open' : '')}
              key={r.id}
              style={{ ['--i' as string]: i }}
            >
              <span className="ir-elbow" aria-hidden="true" />
              <span className="ir-node" aria-hidden="true" />

              <button
                className="ir-trigger"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : r.id)}
              >
                <span className="ir-head">
                  <span className="ir-route-label">{r.label}</span>
                  <span className="ir-route-headline">{r.headline}</span>
                </span>
                <span className="ir-route-meta">
                  <span className="ir-count"><b>{liveCount}</b> live</span>
                  <span className="ir-count ir-count-dim">{r.items.length} total</span>
                  <span className={'ir-chev' + (isOpen ? ' up' : '')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </span>
              </button>

              <div className="ir-drawer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="ir-drawer-inner">
                  <div className="ir-drawer-body">
                    <p className="ir-blurb">{r.blurb}</p>
                    <div className="ir-items">
                      {r.items.map(it => (
                        <div className={'ir-item ir-item-' + it.status} key={it.name}>
                          <div className="ir-item-top">
                            <span className="ir-item-name">{it.name}</span>
                            <Badge s={it.status} />
                          </div>
                          <p className="ir-item-desc">{it.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
