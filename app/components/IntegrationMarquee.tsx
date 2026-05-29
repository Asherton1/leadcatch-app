import './integration-marquee.css'

const s = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#ff6b35',
  strokeWidth: '1.5',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const ITEMS = [
  { name: 'Slack', svg: <svg {...s}><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M14 20.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/><path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z"/><path d="M10 3.5C10 4.33 9.33 5 8.5 5S7 4.33 7 3.5 7.67 2 8.5 2s1.5.67 1.5 1.5z"/></svg> },
  { name: 'HubSpot', svg: <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg> },
  { name: 'Salesforce', svg: <svg {...s}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { name: 'Google Ads', svg: <svg {...s}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
  { name: 'Meta Ads', svg: <svg {...s}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg> },
  { name: 'Calendly', svg: <svg {...s}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M10 14l2 2 4-4"/></svg> },
  { name: 'Cal.com', svg: <svg {...s}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg> },
  { name: 'Zapier', svg: <svg {...s}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { name: 'Make', svg: <svg {...s}><polyline points="16 3 21 3 21 8"/><line x1="4" x2="21" y1="20" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" x2="21" y1="15" y2="21"/><line x1="4" x2="9" y1="4" y2="9"/></svg> },
  { name: 'Webhooks', svg: <svg {...s}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
  { name: 'Follow Up Boss', svg: <svg {...s}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { name: 'Boulevard', svg: <svg {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { name: 'AppFolio', svg: <svg {...s}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
  { name: 'Microsoft Teams', svg: <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { name: 'REST API', svg: <svg {...s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" x2="10" y1="4" y2="20"/></svg> },
  { name: 'Pipedrive', svg: <svg {...s}><path d="M3 3v18l9-7 9 7V3z"/></svg> },
]

export default function IntegrationMarquee() {
  const mid = Math.ceil(ITEMS.length / 2)
  const rows = [ITEMS.slice(0, mid), ITEMS.slice(mid)]
  return (
    <div className="im-wrap" aria-hidden="true">
      {rows.map((row, ri) => (
        <div key={ri} className={ri === 1 ? 'im-row rev' : 'im-row'}>
          {[...row, ...row].map((it, idx) => (
            <div key={idx} className="im-chip">
              <div className="im-icon">{it.svg}</div>
              <span>{it.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
