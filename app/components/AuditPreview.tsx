'use client'

import { useState } from 'react'
import './audit-preview.css'

const TEARDOWN = [
  { n: '01', h: 'Where the money went', d: 'Spend by channel and campaign against what each one actually produced. Usually the first place the story stops matching the monthly report.' },
  { n: '02', h: 'What is being counted', d: 'Whether your conversion tracking fires on the actions that matter, fires twice, or quietly stopped firing after a site change nobody connected to it.' },
  { n: '03', h: 'Cost per lead vs cost per client', d: 'The two numbers separated. When they point in opposite directions, the campaign winning on the report is usually the one to cut.' },
  { n: '04', h: 'Where the budget drifted', d: 'Geography, device and placement. Budget migrates toward cheap clicks on its own, and cheap clicks are rarely where the good customers are.' },
  { n: '05', h: 'What the search terms say', d: 'The actual queries you paid for, not the keywords you bid on. This is where most wasted spend is hiding in plain sight.' },
  { n: '06', h: 'The landing experience', d: 'Where the click lands, how fast it loads, how long the form is, and whether anything is broken between the ad and the inquiry.' },
]

const STRATEGY = [
  { n: '01', h: 'What I would change first', d: 'Ranked by what it costs you now, not by what is easiest to do. Usually two or three things account for most of the waste.' },
  { n: '02', h: 'Where the budget belongs', d: 'Whether the split across platforms reflects where your customers actually come from. Often it does not, and the reasons are historical rather than deliberate.' },
  { n: '03', h: 'The measurement to put in place', d: 'What needs to be tracked, sent back to the platforms, and reported on so the next quarter is judged on real outcomes.' },
  { n: '04', h: 'What I would leave alone', d: 'The parts that are working. Changing things that are already earning is the most common way an account gets worse after a handover.' },
]

export default function AuditPreview() {
  const [tab, setTab] = useState<'teardown' | 'strategy'>('teardown')
  const rows = tab === 'teardown' ? TEARDOWN : STRATEGY

  return (
    <div className="ap">
      <div className="ap-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'teardown'}
          className={'ap-tab' + (tab === 'teardown' ? ' is-on' : '')}
          onClick={() => setTab('teardown')}
        >
          <span className="ap-tab-num">01</span>
          <span className="ap-tab-label">The teardown</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'strategy'}
          className={'ap-tab' + (tab === 'strategy' ? ' is-on' : '')}
          onClick={() => setTab('strategy')}
        >
          <span className="ap-tab-num">02</span>
          <span className="ap-tab-label">The strategy</span>
        </button>
      </div>

      <div className="ap-panel" key={tab}>
        <div className="ap-panel-head">
          <span className="ap-pip" aria-hidden="true" />
          {tab === 'teardown'
            ? 'What your account is doing right now'
            : 'What I would do about it'}
        </div>

        <div className="ap-rows">
          {rows.map((r, i) => (
            <div className="ap-row" key={r.n} style={{ ['--i' as string]: i }}>
              <span className="ap-row-num">{r.n}</span>
              <div className="ap-row-body">
                <h4>{r.h}</h4>
                <p>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
