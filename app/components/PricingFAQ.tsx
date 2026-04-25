'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What does ReCapture actually do?',
    a: 'ReCapture watches every form on your site and detects when a visitor starts filling it out but leaves without submitting. We capture the email and partial info they entered, score the lead, and (on Pro) automatically reach out via SMS, email, or AI voice callback within 60 seconds — recovering revenue that would otherwise vanish.',
  },
  {
    q: 'How does the AI voice callback work?',
    a: 'When a high-value lead abandons your form, our AI agent calls them within 60 seconds using the phone number they entered. The voice is natural, the script is custom to your business, and the goal is to either book the appointment on the call or warm them up for your team. Most clients see a 3-5x increase in lead-to-booking conversion.',
  },
  {
    q: 'Does it work with my existing forms?',
    a: 'Yes. ReCapture works with any HTML form — Webflow, WordPress, Squarespace, custom-built sites, marketing landing pages, anything. Setup is a single line of JavaScript. No form rebuilds, no plugins, no API integration required.',
  },
  {
    q: 'What happens during the 7-day trial?',
    a: 'You get full access to every feature on the Pro plan for 7 days. A card is required to start (so there\u2019s no friction when you decide to continue), but you can cancel anytime in your dashboard before day 7 and you won\u2019t be charged. After day 7, billing starts automatically at $397/mo.',
  },
  {
    q: 'Is my data really HIPAA-compliant?',
    a: 'Pro and Enterprise are HIPAA-ready. We sign Business Associate Agreements (BAAs) for healthcare practices that need them — email hello@userecapture.com after signing up to start the process. Enterprise includes the BAA by default. Essentials is not HIPAA-ready and shouldn\u2019t be used for protected health information.',
  },
  {
    q: 'What if I have multiple websites?',
    a: 'Pro covers one site. If you run 3 or more sites, Enterprise is more cost-effective and includes a centralized dashboard with per-site reporting, custom-branded recovery emails per site, and a dedicated account manager. For 2 sites, you can run two Pro accounts or contact us about a multi-site Pro plan.',
  },
  {
    q: 'How long does setup take?',
    a: 'About 5 minutes. You drop one line of JavaScript on your website (or paste it into Google Tag Manager). We send a welcome email with the exact code and a setup video. Most clients are seeing live abandonment data within an hour of signing up.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. One click in your account dashboard. No retention call, no "are you sure" gauntlet, no surprise charges. If you cancel mid-cycle, your access continues through the end of the paid period.',
  },
]

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="pricing-faq">
      <div className="pricing-faq-inner">
        <p className="pricing-faq-eyebrow">§ FAQ</p>
        <h2 className="pricing-faq-headline">Frequently Asked Questions</h2>

        <div className="pricing-faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`pricing-faq-item ${openIndex === i ? 'pricing-faq-item-open' : ''}`}
            >
              <button
                className="pricing-faq-trigger"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <span className="pricing-faq-icon">+</span>
              </button>
              <div className="pricing-faq-answer">
                <p className="pricing-faq-answer-text">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
