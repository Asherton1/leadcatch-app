import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import Link from 'next/link'
import '../blog/blog.css'
import '../landing.css'

export const metadata = {
  title: 'Integrations — Connect ReCapture to Your Existing Tools',
  description: 'ReCapture integrates with Slack, HubSpot, Salesforce, Google Ads, Zapier, and 3,000+ apps. Connect your lead recovery pipeline to the tools your team already uses.',
}

const integrations = [
  {
    category: 'Alerts & Notifications',
    items: [
      { name: 'Slack', desc: 'Instant lead alerts in your team channels with one-click actions', status: 'live', icon: 'chat' },
      { name: 'SMS (Twilio)', desc: 'Text alerts the moment a high-value lead abandons', status: 'live', icon: 'phone' },
      { name: 'Email (Resend)', desc: 'Automated branded recovery emails on your behalf', status: 'live', icon: 'mail' },
      { name: 'Microsoft Teams', desc: 'Lead alerts with action buttons for your front desk', status: 'coming', icon: 'teams' },
      { name: 'WhatsApp Business', desc: 'Recovery messages for international luxury buyers', status: 'coming', icon: 'chat' },
    ]
  },
  {
    category: 'CRM & Sales',
    items: [
      { name: 'HubSpot', desc: 'Sync recovered leads directly into your HubSpot pipeline', status: 'coming', icon: 'hub' },
      { name: 'Salesforce', desc: 'Push leads to Salesforce with custom field mapping', status: 'coming', icon: 'cloud' },
      { name: 'GoHighLevel', desc: 'Native integration for GHL agency clients', status: 'coming', icon: 'bolt' },
      { name: 'Follow Up Boss', desc: 'Auto-create contacts for luxury real estate teams', status: 'coming', icon: 'home' },
    ]
  },
  {
    category: 'Scheduling & Booking',
    items: [
      { name: 'Calendly', desc: 'Auto-book recovered leads into available slots', status: 'coming', icon: 'cal' },
      { name: 'Cal.com', desc: 'Open-source scheduling integration', status: 'coming', icon: 'cal' },
    ]
  },
  {
    category: 'Ad Platforms',
    items: [
      { name: 'Google Ads', desc: 'Feed recovered leads back as offline conversions for smarter bidding', status: 'coming', icon: 'chart' },
      { name: 'Meta Ads', desc: 'Conversions API integration for optimized ad spend', status: 'coming', icon: 'meta' },
      { name: 'CallRail', desc: 'Track calls from recovered leads back to campaigns', status: 'coming', icon: 'callrail' },
    ]
  },
  {
    category: 'Practice Management',
    items: [
      { name: 'Boulevard', desc: 'Sync leads to your med spa booking system', status: 'coming', icon: 'spa' },
      { name: 'Open Dental', desc: 'Push recovered patients into your dental PMS', status: 'coming', icon: 'dental' },
      { name: 'Dentrix', desc: 'Enterprise dental practice management integration', status: 'coming', icon: 'dental' },
      { name: 'AppFolio', desc: 'Leasing lead sync for property management', status: 'coming', icon: 'building' },
      { name: 'Nextech', desc: 'Plastic surgery and LASIK practice management', status: 'coming', icon: 'eye' },
    ]
  },
  {
    category: 'Automation',
    items: [
      { name: 'Zapier', desc: 'Connect ReCapture to 6,000+ apps with no code', status: 'coming', icon: 'bolt' },
      { name: 'Make (Integromat)', desc: 'Advanced workflow automation', status: 'coming', icon: 'sync' },
      { name: 'Webhooks', desc: 'Send lead data to any endpoint in real time', status: 'live', icon: 'link' },
      { name: 'REST API', desc: 'Full API access for custom integrations', status: 'live', icon: 'api' },
    ]
  },
]

export default function IntegrationsPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <BlogNav />
      <ScrollReveal />

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '10rem 2rem 4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.2em', color: '#ff6b35', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Integrations</p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem' }}>
          Connect <span style={{ color: '#ff6b35' }}>ReCapture</span> to Everything
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 3rem' }}>
          Your recovered leads flow directly into the tools your team already uses. No copy-pasting. No manual imports. Real-time sync from the moment a lead is captured.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem' }}>
        {integrations.map((group, gi) => (
          <div key={gi} className="reveal" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ff6b35', letterSpacing: '-0.01em', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1e1e1e' }}>{group.category}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {group.items.map((item, ii) => (
                <div key={ii} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '0.75rem', padding: '1.25rem', transition: 'border-color 0.2s', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{item.name}</span>
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: item.status === 'live' ? 'rgba(34,197,94,0.1)' : 'rgba(255,107,53,0.1)',
                      color: item.status === 'live' ? '#22c55e' : '#ff6b35',
                      border: `1px solid ${item.status === 'live' ? 'rgba(34,197,94,0.2)' : 'rgba(255,107,53,0.2)'}`,
                    }}>{item.status === 'live' ? 'Live' : 'Coming Soon'}</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="reveal" style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem 4rem', textAlign: 'center' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '1rem', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: '#ff6b35', marginBottom: '0.75rem' }}>Need a Custom Integration?</h2>
          <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Our API and webhook system can connect ReCapture to any platform. Enterprise clients get white-glove integration support.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/start-trial" style={{ background: '#ff6b35', color: '#fff', fontWeight: 700, fontSize: '0.9375rem', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', border: '1px solid #ff6b35' }}>Start Free Trial</Link>
            <a href="mailto:hello@userecapture.com" style={{ background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '0.9375rem', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', border: '1px solid #333' }}>Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
