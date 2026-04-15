'use client'

import { useState } from 'react'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  badge?: string
  description: string
  visual: React.ReactNode
}

function AccordionItem({ item }: { item: FeatureItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, margin: '1.25rem 0', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', gap: '12px',
        }}
        type="button"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {item.icon}
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>{item.title}</h3>
            {item.badge && (
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#ff6b35', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{item.badge}</span>
            )}
          </div>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', border: '1px solid #333',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'transform 0.3s ease, border-color 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          borderColor: open ? '#ff6b35' : '#333',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={open ? '#ff6b35' : '#666'} strokeWidth="1.75" strokeLinecap="round">
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </div>
      </button>

      <div style={{
        maxHeight: open ? '800px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <p style={{ color: '#999', lineHeight: 1.8, margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>{item.description}</p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #1e1e1e' }}>
            {item.visual}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mock Visuals ─────────────────────────────────────────────────────────── */

function SmsMockup() {
  return (
    <div style={{ background: '#0a0a0a', padding: '1.5rem', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ maxWidth: 320, margin: '0 auto' }}>
        {/* Phone frame */}
        <div style={{ background: '#1a1a1a', borderRadius: 16, padding: '1.25rem', border: '1px solid #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '0.75rem', color: '#888' }}>Text Message</span>
            <span style={{ fontSize: '0.65rem', color: '#555', marginLeft: 'auto' }}>Just now</span>
          </div>
          <div style={{ background: '#111', borderRadius: 12, padding: '1rem', border: '1px solid #1e1e1e' }}>
            <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>ReCapture Lead Alert</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.4rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}><span style={{ color: '#666' }}>Name:</span> Sarah Martinez</div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}><span style={{ color: '#666' }}>Email:</span> sarah@gmail.com</div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}><span style={{ color: '#666' }}>Phone:</span> (214) 555-9876</div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}><span style={{ color: '#666' }}>Service:</span> Botox + Filler</div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}><span style={{ color: '#666' }}>Fields:</span> 4/5</div>
            </div>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #1e1e1e', fontSize: '0.75rem', color: '#ff6b35', fontWeight: 600 }}>Form abandoned — follow up now</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.7rem', color: '#444' }}>Delivered within 60 seconds of form abandonment</div>
      </div>
    </div>
  )
}

function LeadScoringMockup() {
  const leads = [
    { name: 'Sarah Martinez', email: 'sarah@gmail.com', phone: '(214) 555-9876', score: 82, label: 'Hot', color: '#ef4444', service: 'Botox + Filler', fields: '4/5', time: '0:38s' },
    { name: 'James Cooper', email: 'jcooper@yahoo.com', phone: '—', score: 55, label: 'Warm', color: '#f59e0b', service: 'Consultation', fields: '3/5', time: '0:22s' },
    { name: 'Unknown', email: '—', phone: '—', score: 15, label: 'Cold', color: '#6b7280', service: '—', fields: '1/5', time: '0:04s' },
  ]

  return (
    <div style={{ background: '#0a0a0a', padding: '1rem', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
        {leads.map((lead, i) => (
          <div key={i} style={{ background: '#111', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
            <div style={{ minWidth: 140 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{lead.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 2 }}>{lead.email}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: lead.color, display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: lead.color }}>{lead.label} ({lead.score})</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#555' }}>{lead.fields} fields</div>
            <div style={{ fontSize: '0.7rem', color: '#555' }}>{lead.time}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.7rem', color: '#444' }}>Every lead scored automatically — your team knows who to call first</div>
    </div>
  )
}

function AutoRecoveryMockup() {
  return (
    <div style={{ background: '#0a0a0a', padding: '1.5rem', fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ maxWidth: 380, margin: '0 auto' }}>
        {/* Email preview */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, overflow: 'hidden', border: '1px solid #222' }}>
          {/* Email header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e1e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>From: Luxe MedSpa</span>
              <span style={{ fontSize: '0.6rem', color: '#555' }}>1 hour ago</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>To: sarah@gmail.com</div>
            <div style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 600, marginTop: '0.5rem' }}>Still interested? Pick up where you left off</div>
          </div>
          {/* Email body */}
          <div style={{ padding: '1.25rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#999', lineHeight: 1.7, margin: '0 0 1rem 0' }}>Hi Sarah,</p>
            <p style={{ fontSize: '0.8rem', color: '#999', lineHeight: 1.7, margin: '0 0 1rem 0' }}>We noticed you started booking a consultation but didn&apos;t get to finish. No worries — your information is saved and ready whenever you are.</p>
            <div style={{ textAlign: 'center' as const, margin: '1.25rem 0' }}>
              <div style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 700, padding: '0.6rem 1.5rem', borderRadius: 8, fontSize: '0.8rem' }}>Complete Your Booking</div>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#555', lineHeight: 1.6, margin: '1rem 0 0 0', textAlign: 'center' as const }}>Luxe MedSpa — Dallas, TX<br/>Questions? Call us at (214) 555-1200</p>
          </div>
        </div>
        {/* Status badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: '0.75rem' }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7L5.5 10L11.5 4"/></svg>
          <span style={{ fontSize: '0.7rem', color: '#444' }}>Sent automatically — branded to your business, not ours</span>
        </div>
      </div>
    </div>
  )
}

/* ── Feature Data ─────────────────────────────────────────────────────────── */

const features: FeatureItem[] = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Instant SMS Lead Alerts',
    badge: 'Coming Soon — Pro Plan',
    description: 'Your phone buzzes within 60 seconds of someone abandoning your form. Not an email you check later. A text message with their name, their email, and what they were looking for. Research shows that calling a lead within 5 minutes makes you 21x more likely to convert them. No other form abandonment tool offers real-time SMS alerts.',
    visual: <SmsMockup />,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Lead Scoring',
    description: 'Not every abandoned lead is worth the same follow-up. Someone who typed their name, email, phone number, and selected "$15,000 tummy tuck" is not the same as someone who typed one letter and bounced. ReCapture scores every lead as hot, warm, or cold based on fields completed, contact data provided, time on form, and form detail richness. Your team sees instantly who to call first. No other form abandonment tool does lead scoring on partial form data.',
    visual: <LeadScoringMockup />,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Auto-Recovery Emails',
    description: 'When someone abandons your form and they entered an email, ReCapture automatically sends a branded recovery email on your behalf. Not from us — from your business, with your name and your booking link. The lead gets a message saying "Looks like you didn\'t finish — want to pick up where you left off?" and a direct link back to your form. This closes the loop without your team lifting a finger.',
    visual: <AutoRecoveryMockup />,
  },
]

export default function WhyUsAccordion() {
  return (
    <div>
      {features.map((item, i) => (
        <AccordionItem key={i} item={item} />
      ))}
    </div>
  )
}
