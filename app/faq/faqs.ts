export interface FAQ {
  q: string
  a: string
}

export interface FAQCategory {
  name: string
  faqs: FAQ[]
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'Getting Started',
    faqs: [
      {
        q: 'What does ReCapture actually do?',
        a: 'ReCapture watches every form on your site and detects when a visitor starts filling it out but leaves without submitting. We capture the email and partial info they entered, score the lead, and (on Pro) automatically reach out via SMS, email, or AI voice callback within 60 seconds — recovering revenue that would otherwise vanish.',
      },
      {
        q: 'Does it work with my existing forms?',
        a: 'Yes. ReCapture works with any HTML form — Webflow, WordPress, Squarespace, custom-built sites, marketing landing pages, anything. Setup is a single line of JavaScript. No form rebuilds, no plugins, no API integration required.',
      },
      {
        q: 'How long does setup take?',
        a: 'About 5 minutes. You drop one line of JavaScript on your website (or paste it into Google Tag Manager). We send a welcome email with the exact code and a setup video. Most clients are seeing live abandonment data within an hour of signing up.',
      },
      {
        q: 'Will it slow down my website?',
        a: 'No. The ReCapture script is under 10KB, loads asynchronously, and adds zero measurable page load time. It does not block rendering, does not run on pages without forms, and has zero impact on Core Web Vitals or SEO.',
      },
    ],
  },
  {
    name: 'The AI Voice Callback',
    faqs: [
      {
        q: 'How does the AI voice callback work?',
        a: 'When a high-value lead abandons your form, our AI agent calls them within 60 seconds using the phone number they entered. The voice is natural, the script is custom to your business, and the goal is to either book the appointment on the call or warm them up for your team. Most clients see a 3-5x increase in lead-to-booking conversion.',
      },
      {
        q: 'What exactly does Marissa say to my leads?',
        a: "Marissa identifies herself as your business's automated assistant calling about the inquiry they started but didn't finish. She references the specific service they were asking about, answers basic questions, and offers to book a consultation directly. She does not pretend to be human.",
      },
      {
        q: 'Can I customize the AI voice script?',
        a: "Yes. Pro and Enterprise plans get full script editing in the dashboard. You set the greeting, the qualifying questions, the booking flow, and the closing. Marissa speaks your business's tone, knows your services, and respects your guardrails (for example: don't quote pricing on the call).",
      },
      {
        q: 'Will this annoy my customers? Is it creepy?',
        a: 'No. We only capture what visitors voluntarily typed into your form fields — the same data they would have sent if they finished. AI callbacks include one-keypress opt-out. Most prospects appreciate a fast follow-up when they meant to submit but got interrupted.',
      },
      {
        q: 'What about Do Not Call lists and TCPA compliance?',
        a: 'ReCapture checks every callback against the FTC DNC registry before dialing. We respect state-level DNC, internal Do Not Contact flags, and one-keypress opt-outs. AI callbacks only fire when a prospect actively started your contact form — express interest is documented for TCPA compliance.',
      },
    ],
  },
  {
    name: 'Integrations',
    faqs: [
      {
        q: 'How is this different from a CRM like HubSpot or Salesforce?',
        a: "ReCapture isn't a CRM — it's the recovery layer that feeds your CRM. CRMs manage leads who already submitted; ReCapture captures the 60-70% who never submit. We push everything we recover into your existing CRM via webhook so your team works in the tools they already know.",
      },
      {
        q: 'Which CRMs and platforms do you integrate with?',
        a: 'GoHighLevel and webhook-to-any-CRM are live. HubSpot, Salesforce, Follow Up Boss, AppFolio, Boulevard, Pipedrive, and Zoho route via Zapier or Make. Plus Slack, SMS, email, Google Ads offline conversions, Meta Conversions API, and Cal.com / Calendly for booking.',
      },
      {
        q: "What if my CRM isn't listed?",
        a: "Use Zapier, Make, or our generic webhook endpoint. ReCapture pushes lead data as standard JSON — any tool that can receive a webhook can integrate. For native integrations we don't yet have, we'll build them for Enterprise customers.",
      },
    ],
  },
  {
    name: 'Pricing & Trial',
    faqs: [
      {
        q: 'What happens during the 7-day trial?',
        a: "You get full access to every feature on the Pro plan for 7 days. A card is required to start (so there's no friction when you decide to continue), but you can cancel anytime in your dashboard before day 7 and you won't be charged. After day 7, billing starts automatically at $397/mo.",
      },
      {
        q: "What's the difference between Essentials, Pro, and Enterprise?",
        a: 'Essentials ($197/mo) — form capture, dashboard, email/SMS alerts, webhook integrations, 1 website. Pro ($397/mo) — adds AI voice callback, lead scoring, weekly performance reports, branded recovery emails, 3 websites. Enterprise (from $1,997/mo) — unlimited websites, HIPAA + BAA, dedicated account manager, white-glove setup, custom integrations.',
      },
      {
        q: 'Do you offer an annual discount?',
        a: 'Yes — 2 months free on annual plans for Pro and Enterprise. Email hello@userecapture.com to set it up.',
      },
      {
        q: 'What if I have multiple websites?',
        a: 'Pro covers up to 3 sites. For 4+ sites, Enterprise is more cost-effective and includes a centralized dashboard with per-site reporting, custom-branded recovery emails per site, and a dedicated account manager.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. One click in your account dashboard. No retention call, no "are you sure" gauntlet, no surprise charges. If you cancel mid-cycle, your access continues through the end of the paid period.',
      },
    ],
  },
  {
    name: 'Privacy & Compliance',
    faqs: [
      {
        q: 'Is my data really HIPAA-compliant?',
        a: 'ReCapture is HIPAA-ready by design across all plans — our subprocessor stack and architecture support healthcare deployments. Business Associate Agreements (BAAs) are executed for Enterprise customers upon signed contract. If you handle PHI, contact hello@userecapture.com to discuss Enterprise deployment.',
      },
      {
        q: 'Are you GDPR / CCPA compliant?',
        a: 'Yes. ReCapture supports explicit consent flags, right-to-be-forgotten deletion within 72 hours, full audit logs, and zero third-party data sharing. We never sell or rent data. Ask about our DPA (Data Processing Agreement) if your business operates in the EU or California.',
      },
      {
        q: 'Who owns the lead data?',
        a: 'You do. 100%. ReCapture is the processor; you are the controller. All captured leads are exportable as CSV anytime. If you cancel, we delete all data within 30 days — or immediately on written request.',
      },
    ],
  },
  {
    name: 'Results & Support',
    faqs: [
      {
        q: "What's a typical recovery rate?",
        a: 'Conservative benchmark: 10% of abandoned forms convert to qualified leads. Some verticals run higher (medical/wellness 12-15%) — depends on your offer, your follow-up speed, and AI voice activation. Most clients see ROI break-even within 60 days.',
      },
      {
        q: "Who's behind ReCapture?",
        a: 'Built by Asherton Chraibi, founder, based in Dallas, TX. 10+ years running digital marketing for high-ticket service businesses across plastic surgery, dermatology, fertility, dental, luxury real estate, and multifamily. Built ReCapture solo after seeing the same problem at every client: thousands of dollars in ad spend lost to invisible form abandonment.',
      },
    ],
  },
]
