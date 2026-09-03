'use client'

import { useState } from 'react'
import Link from 'next/link'
import './story-timeline.css'

type Chapter = {
  id: string
  num: string
  eyebrow: string
  title: string
  body: React.ReactNode
}

const CHAPTERS: Chapter[] = [
  {
    id: 'problem',
    num: '01',
    eyebrow: 'The problem',
    title: 'The thing that kept nagging me.',
    body: (
      <>
        <p>For over a decade I ran campaigns for med spas, dental practices, luxury real estate, and high-end service businesses &mdash; the kind of companies where a single lead is worth $1,500 to $10,000.</p>
        <p>The playbook was always the same: build the funnel, run the ads, optimise the landing page, watch the leads come in. And the leads did come in. But something always nagged at me.</p>
        <p>Google Analytics showed the traffic. The CRM showed the submissions. Neither one showed me the people in between &mdash; the ones who clicked the form, started typing their name, got distracted, and disappeared. Those people were invisible. And there were a lot of them.</p>
      </>
    ),
  },
  {
    id: 'turning',
    num: '02',
    eyebrow: 'The turning point',
    title: 'The form was the blind spot.',
    body: (
      <>
        <p>I was reviewing a client&rsquo;s campaign performance and the numbers did not add up. We were driving solid traffic. The landing page was converting. But the gap between page views and form submissions was massive &mdash; far bigger than it should have been.</p>
        <p>That is when it landed: every analytics platform on the market tracks what happens <em>before</em> the form and what happens <em>after</em>. Nobody tracks what happens <em>during</em>. The form itself was a complete blind spot.</p>
        <p>I went looking for a tool that could capture partial form data. The options were either built for e-commerce carts, required replacing your forms entirely, or had dashboards that looked like they were built in 2014. None were built for the businesses I work with.</p>
        <p>So I built one.</p>
      </>
    ),
  },
  {
    id: 'why',
    num: '03',
    eyebrow: 'Why ReCapture',
    title: 'Capture the intent before it is lost.',
    body: (
      <>
        <p>ReCapture is the recovery layer for high-ticket service businesses. One script tag captures the contact details a visitor enters into your form &mdash; name, email, phone &mdash; even if they never press submit. No form migration. No complex setup.</p>
        <p>You see every lead in a clean dashboard with their contact details and the estimated value they represent. Follow up manually, or let recovery run automatically on the schedule you set.</p>
        <p>Form abandonment is the entry point. The underlying capability &mdash; capturing intent before it is lost and acting on it within sixty seconds &mdash; applies across the whole service business stack. Phone abandonment. Booking drop-off. Quote requests. Live chat exits.</p>
        <p>It is the platform I wished existed for ten years. Now it does.</p>
      </>
    ),
  },
  {
    id: 'compliance',
    num: '04',
    eyebrow: 'Why we built it different',
    title: 'Compliance was the foundation, not the afterthought.',
    body: (
      <>
        <p>Most form abandonment tools were built between 2018 and 2023 &mdash; before TCPA tightened in April 2025, before state privacy laws started enforcing meaningfully, before HIPAA enforcement reached marketing technology vendors. Most bolted compliance on afterwards, if at all.</p>
        <p>I took the opposite approach and built the guardrails in from the start: contact-fields-only capture, never keystrokes and never free text. EU, UK and Switzerland geo-blocking. A master do-not-contact list enforced across SMS, email and voice. An AI voice agent that identifies itself as automated within the first fifteen seconds of every call. HIPAA-ready by design, with a BAA available for Enterprise healthcare deployments.</p>
        <p>I built it that way because I have sat across the table from enterprise legal teams. They ask the same five questions every time, and the vendors who cannot answer them credibly do not close the deal.</p>
        <p>Everything is published openly on our <Link href="/trust" className="st-link">trust page</Link> &mdash; what we capture, what we do not, our subprocessors, our retention policy. No NDAs, no sales call required.</p>
      </>
    ),
  },
  {
    id: 'data',
    num: '05',
    eyebrow: 'The part I did not expect',
    title: 'It turned out to be a data problem.',
    body: (
      <>
        <p>I built ReCapture to recover leads. Catch the people who start a form and leave, follow up before the intent goes cold. It worked, and for a while I thought that was the product.</p>
        <p>Then something occurred to me that I should have seen a decade earlier. Meta and Google only ever learn from people who press submit. Every campaign I had ever run had been optimising against a fraction of the people who actually wanted something &mdash; and the channels producing careful, high-consideration prospects had been scoring worst the whole time, because hesitation looks like failure on a report that only counts submissions.</p>
        <p>So ReCapture sends those people back. Every recovered inquiry goes to Meta&rsquo;s Conversions API and Google Ads as a server-side conversion, hashed and deduplicated, weighted by how much intent the person showed. And every inquiry is attributed to the channel that produced it, submitted or not.</p>
        <p>That part was not in the plan. It came out of ten years of buying media and finally being in a position to fix something I had been living with the whole time.</p>
      </>
    ),
  },
]

export default function StoryTimeline() {
  const [open, setOpen] = useState<string | null>('problem')

  return (
    <div className="st">
      <span className="st-rail" aria-hidden="true" />

      {CHAPTERS.map(c => {
        const isOpen = open === c.id
        return (
          <div className={'st-chapter' + (isOpen ? ' st-open' : '')} key={c.id}>
            <button
              className="st-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : c.id)}
            >
              <span className="st-node" aria-hidden="true">
                <span className="st-node-num">{c.num}</span>
              </span>

              <span className="st-head">
                <span className="st-eyebrow">{c.eyebrow}</span>
                <span className="st-title">{c.title}</span>
              </span>

              <span className="st-chev" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div className="st-drawer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="st-drawer-inner">
                <div className="st-body">{c.body}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
