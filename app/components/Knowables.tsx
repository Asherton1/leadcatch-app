'use client'

import { useState } from 'react'
import './knowables.css'

const ITEMS = [
  {
    id: 'typed',
    num: '01',
    title: 'What they typed before they left',
    body: 'Name, email, phone — the contact fields, captured as they are completed rather than when the form is sent. Never keystrokes, never free-text boxes. Someone who fills four fields and gets interrupted is a real inquiry that no other system in your stack will ever record.',
  },
  {
    id: 'back',
    num: '02',
    title: 'Whether they have been back',
    body: 'Somebody who starts your form three times across two weeks is telling you something a first-time visitor is not. Because none of those attempts ended in a submission, no CRM has any record of the pattern. We surface the repeat visits, weight them into the lead score, and show you exactly who is circling.',
  },
  {
    id: 'first',
    num: '03',
    title: 'What they did first',
    body: 'The pages they read, how long they spent, whether they came from a paid campaign or a search, which page finally pushed them to the form. Context that turns a follow-up from a cold call into a conversation that starts where they left off.',
  },
  {
    id: 'channel',
    num: '04',
    title: 'Which channel actually produced them',
    body: 'Every report you get today counts submissions, so the channels that produce hesitant, high-consideration prospects look worse than they are. We attribute every captured inquiry back to the channel that produced it, submitted or not — paid search, paid social, organic, referral, direct, broken out by campaign across Google and Meta. Untagged traffic is handled rather than dropped, which matters when somebody else manages your tagging.',
  },
  {
    id: 'platforms',
    num: '05',
    title: 'And what your ad platforms get back',
    body: 'Every recovered inquiry goes to Meta\u2019s Conversions API and Google Ads as a server-side conversion event — hashed, deduplicated against your existing pixel, and weighted by how much intent the person showed. Your campaigns stop optimizing against the fraction who finished. What you do with better data is your team\u2019s call. Getting it there is ours.',
  },
]

export default function Knowables() {
  const [open, setOpen] = useState<string | null>('typed')

  return (
    <div className="kn">
      {ITEMS.map(it => {
        const isOpen = open === it.id
        return (
          <div className={'kn-row' + (isOpen ? ' kn-open' : '')} key={it.id}>
            <button
              className="kn-trigger"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : it.id)}
            >
              <span className="kn-num">{it.num}</span>
              <span className="kn-title">{it.title}</span>
              <span className="kn-mark" aria-hidden="true">
                <span className="kn-mark-h" />
                <span className="kn-mark-v" />
              </span>
            </button>

            <div className="kn-drawer" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="kn-drawer-inner">
                <p className="kn-body">{it.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
