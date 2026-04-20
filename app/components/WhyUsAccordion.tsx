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
        maxHeight: open ? '1200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <p style={{ color: '#999', lineHeight: 1.8, margin: '0 0 1.25rem 0', fontSize: '0.9rem' }}>{item.description}</p>
          {item.visual}
        </div>
      </div>
    </div>
  )
}

/* ── Mock Visuals ─────────────────────────────────────────────────────────── */

function SmsMockup() {
  return (
    <div style={{ background: '#0d0d0d', borderRadius: 10, padding: '1.5rem 1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.75rem' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: '0.7rem', color: '#666' }}>Text Message</span>
        <span style={{ fontSize: '0.65rem', color: '#444', marginLeft: 'auto' }}>Just now</span>
      </div>
      <div style={{ background: '#151515', borderRadius: 8, padding: '1.25rem' }}>
        <div style={{ fontSize: '0.7rem', color: '#ff6b35', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>ReCapture Lead Alert</div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#bbb' }}><span style={{ color: '#555' }}>Name: </span>Sarah Martinez</div>
          <div style={{ fontSize: '0.75rem', color: '#bbb' }}><span style={{ color: '#555' }}>Email: </span>sarah@gmail.com</div>
          <div style={{ fontSize: '0.75rem', color: '#bbb' }}><span style={{ color: '#555' }}>Phone: </span>(214) 555-9876</div>
          <div style={{ fontSize: '0.75rem', color: '#bbb' }}><span style={{ color: '#555' }}>Service: </span>Botox + Filler</div>
          <div style={{ fontSize: '0.75rem', color: '#bbb' }}><span style={{ color: '#555' }}>Fields: </span>4/5</div>
        </div>
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #1e1e1e', fontSize: '0.7rem', color: '#ff6b35', fontWeight: 600 }}>Form abandoned — follow up now</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.65rem', color: '#444' }}>Delivered within 60 seconds of form abandonment</div>
    </div>
  )
}

function LeadScoringMockup() {
  const leads = [
    { name: 'Sarah Martinez', email: 'sarah@gmail.com', score: 82, label: 'Hot', color: '#ef4444', service: 'Botox + Filler', fields: '4/5', time: '0:38s' },
    { name: 'James Cooper', email: 'jcooper@yahoo.com', score: 55, label: 'Warm', color: '#f59e0b', service: 'Consultation', fields: '3/5', time: '0:22s' },
    { name: 'Unknown', email: 'No contact info', score: 15, label: 'Cold', color: '#6b7280', service: '—', fields: '1/5', time: '0:04s' },
  ]

  return (
    <div style={{ background: '#0d0d0d', borderRadius: 10, padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
        {leads.map((lead, i) => (
          <div key={i} style={{ background: '#151515', borderRadius: 8, padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' as const, gap: '0.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{lead.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: lead.color, display: 'inline-block' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: lead.color }}>{lead.label} ({lead.score})</span>
              </div>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#555', marginBottom: '0.4rem' }}>{lead.email}</div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.65rem', color: '#444' }}>
              <span>{lead.service}</span>
              <span>{lead.fields}</span>
              <span>{lead.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.65rem', color: '#444' }}>Every lead scored automatically — your team knows who to call first</div>
    </div>
  )
}

function AutoRecoveryMockup() {
  return (
    <div style={{ background: '#0d0d0d', borderRadius: 10, padding: '1.25rem' }}>
      <div style={{ background: '#151515', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#ccc' }}>From: Luxe MedSpa</span>
            <span style={{ fontSize: '0.6rem', color: '#444' }}>1 hour ago</span>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#555' }}>To: sarah@gmail.com</div>
          <div style={{ fontSize: '0.75rem', color: '#bbb', fontWeight: 600, marginTop: '0.4rem' }}>Still interested? Pick up where you left off</div>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.7, margin: '0 0 0.75rem 0' }}>Hi Sarah,</p>
          <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.7, margin: '0 0 1rem 0' }}>We noticed you started booking a consultation but didn&apos;t get to finish. No worries — your information is saved and ready whenever you are.</p>
          <div style={{ textAlign: 'center' as const, margin: '1rem 0' }}>
            <div style={{ display: 'inline-block', background: '#ff6b35', color: '#fff', fontWeight: 600, padding: '0.5rem 1.25rem', borderRadius: 6, fontSize: '0.7rem' }}>Complete Your Booking</div>
          </div>
          <p style={{ fontSize: '0.6rem', color: '#444', lineHeight: 1.6, margin: '0.75rem 0 0 0', textAlign: 'center' as const }}>Luxe MedSpa — Dallas, TX<br/>Questions? Call us at (214) 555-1200</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: '0.75rem' }}>
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7L5.5 10L11.5 4"/></svg>
        <span style={{ fontSize: '0.65rem', color: '#444' }}>Sent automatically — branded to your business, not ours</span>
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
    title: 'Ai Voice Callback in 60 Seconds',
    description: 'This is the feature nobody else has. When someone abandons your form and leaves a phone number, ReCapture\'s Ai calls them back within 60 seconds. Not an email. Not a text. A real phone call with a warm, natural-sounding voice that introduces itself as your front desk, offers to help, and collects their booking preferences. Responding within one minute makes you 391% more likely to convert. No other form recovery tool on the market does this.',
    visual: null,
    badge: 'Pro Plan',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Instant SMS Lead Alerts',
    badge: 'Pro Plan',
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
    description: 'Not every abandoned lead is worth the same follow-up. Someone who typed their name, email, phone number, and selected "$15,000 tummy tuck" is not the same as someone who typed one letter and bounced. ReCapture scores every lead as hot, warm, or cold based on fields completed, contact data provided, time on form, and form detail richness. Your team sees instantly who to call first.',
    visual: <LeadScoringMockup />,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Auto-Recovery Emails',
    description: 'When someone abandons your form and they entered an email, ReCapture automatically sends a branded recovery email on your behalf. Not from us — from your business, with your name and your booking link. This closes the loop without your team lifting a finger.',
    visual: <AutoRecoveryMockup />,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
      </svg>
    ),
    title: 'Real-Time Slack Alerts',
    description: 'The moment someone abandons your form, your entire team sees it in Slack. Name, email, phone, lead score, timestamp. No checking dashboards, no waiting for reports. Your front desk picks up the phone and calls the lead back while they are still thinking about you. Speed to lead is everything — responding within 60 seconds makes you 391% more likely to convert.',
    visual: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Free Form Audit Report',
    description: 'Before you even become a client, we scan your website and send you a detailed audit report — form field count, mobile UX issues, tracking gaps, industry-specific abandonment benchmarks, and exactly how much revenue your forms are leaking every month. It is the most thorough form analysis in the industry and it is completely free. No other competitor offers anything like it.',
    visual: null,
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