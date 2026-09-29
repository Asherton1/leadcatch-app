'use client'

import { useEffect, useRef } from 'react'
import EmptyPanel from './EmptyPanel'
import './call-flow.css'
import '../components/split-flow.css'

const STEPS = [
  {
    num: '01',
    title: 'Somebody starts your form and leaves',
    body: 'They type a name, an email, maybe a phone number. Then something interrupts them and they never press submit.',
    lit: false,
    panel: (
      <div className="sp-empty">
        <EmptyPanel variant="gone" />
        <span className="sp-empty-label">This person is now indistinguishable from a bounce.</span>
      </div>
    ),
  },
  {
    num: '02',
    title: 'ReCapture captures what they typed',
    body: 'Whatever was entered before they left, along with how far through the form they got and which pages they visited first.',
    lit: true,
    panel: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Inquiry captured</div>
        <div className="sp-rows">
          <div className="sp-row"><span>Name</span><span>Sarah Whitfield</span></div>
          <div className="sp-row"><span>Email</span><span>s.whitfield@gmail.com</span></div>
          <div className="sp-row"><span>Phone</span><span>214-555-0182</span></div>
          <div className="sp-row"><span>Reached</span><span>4 of 6 fields</span></div>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'It gets scored by intent',
    body: 'Someone who filled six fields and came back twice is not the same as someone who typed an email and left after eight seconds.',
    lit: true,
    panel: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Intent score</div>
        <div className="cf-score">
          <div className="cf-score-num">82</div>
          <div className="cf-score-tag">Hot</div>
        </div>
        <div className="cf-bar"><i style={{ width: '82%' }} /></div>
        <div className="sp-rows">
          <div className="sp-row"><span>Fields completed</span><span>4 of 6</span></div>
          <div className="sp-row"><span>Time on form</span><span>2m 14s</span></div>
          <div className="sp-row"><span>Visits</span><span>3rd time here</span></div>
        </div>
      </div>
    ),
  },
  {
    num: '04',
    title: 'Your team hears about it',
    body: 'An SMS or a Slack message the moment a high-intent inquiry drops, with the contact details attached.',
    lit: true,
    panel: (
      <div className="cf-sms">
        <div className="cf-sms-head">Message · now</div>
        <div className="cf-sms-bubble">
          <strong>ReCapture Lead Alert</strong>
          Sarah Whitfield just abandoned a form on your site.<br />
          Email: s.whitfield@gmail.com<br />
          Phone: 214-555-0182<br />
          <em>Reach out within 3 min for highest conversion.</em>
        </div>
      </div>
    ),
  },
  {
    num: '05',
    title: 'Recovery goes out automatically',
    body: 'A branded email from your own sender name, on whatever delay you set. Immediate, an hour later, whatever suits.',
    lit: true,
    panel: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Recovery email sent</div>
        <div className="cf-mail">
          <div className="cf-mail-row"><span>From</span><span>Your Business</span></div>
          <div className="cf-mail-row"><span>To</span><span>s.whitfield@gmail.com</span></div>
          <div className="cf-mail-row"><span>Subject</span><span>You were partway through</span></div>
        </div>
        <p className="cf-mail-body">Hi Sarah, looks like something came up while you were getting in touch. Here is where you left off, if you would like to pick it back up.</p>
      </div>
    ),
  },
  {
    num: '06',
    title: 'Meta and Google find out too',
    body: 'The inquiry goes back to both platforms as a server-side conversion event, weighted by how much intent the person actually showed.',
    lit: true,
    panel: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Conversion signals sent</div>
        <div className="cf-signals">
          <div className="cf-signal">
            <span className="cf-signal-name">Meta CAPI</span>
            <span className="cf-signal-state">Delivered</span>
          </div>
          <div className="cf-signal">
            <span className="cf-signal-name">Google Ads</span>
            <span className="cf-signal-state">Delivered</span>
          </div>
        </div>
        <div className="sp-rows">
          <div className="sp-row"><span>Event value</span><span>Weighted, intent 82</span></div>
          <div className="sp-row"><span>Deduplicated</span><span>Against your pixel</span></div>
        </div>
      </div>
    ),
  },
]

const WEEK = [
  { when: 'Day one', what: 'One line of code goes on your site. Same as adding Google Analytics.' },
  { when: 'Day one or two', what: 'The first captured inquiry appears. For most people this is the moment it stops being theoretical.' },
  { when: 'Day two or three', what: 'Recovery emails and alerts start going out.' },
  { when: 'End of week one', what: 'You know your actual abandonment number, not an industry estimate.' },
]

export default function CallFlow() {
  const root = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const targets = el.querySelectorAll('.sp-step, .cf-week, .cf-week-list li')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('cf-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div className="sp cf" ref={root}>
      <div className="sp-headrow">
        <div className="sp-headcol">What actually happens</div>
        <div className="sp-headcol sp-headcol-r">What you see</div>
      </div>

      {STEPS.map(s => (
        <div className={'sp-step reveal' + (s.lit ? ' sp-lit' : '')} key={s.num}>
          <div className="sp-left">
            <span className="sp-num">{s.num}</span>
            <h2 className="sp-title">{s.title}</h2>
            <p className="sp-body">{s.body}</p>
          </div>
          <div className="sp-right">{s.panel}</div>
        </div>
      ))}

      <div className="cf-week reveal">
        <div className="cf-week-label">And the first week looks like this</div>
        <ol className="cf-week-list">
          {WEEK.map(w => (
            <li key={w.when}>
              <span className="cf-week-when">{w.when}</span>
              <span className="cf-week-what">{w.what}</span>
            </li>
          ))}
        </ol>
        <p className="cf-week-note">
          The trial runs seven days for that reason. Long enough to see the real number,
          short enough that nobody has to think hard about it.
        </p>
      </div>
    </div>
  )
}
