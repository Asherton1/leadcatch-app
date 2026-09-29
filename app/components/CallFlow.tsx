'use client'

import './call-flow.css'
import '../components/split-flow.css'

const STEPS = [
  {
    num: '01',
    title: 'Somebody starts your form and leaves',
    body: 'They type a name, an email, maybe a phone number. Then something interrupts them and they never press submit.',
    right: 'Nothing. No record anywhere.',
    rightSub: 'Your CRM has no row. Analytics counted a page view. Nobody on your team knows this person existed.',
    lit: false,
  },
  {
    num: '02',
    title: 'ReCapture captures what they typed',
    body: 'Whatever was entered before they left, along with how far through the form they got and which pages they visited first.',
    right: 'A new inquiry in your dashboard',
    rightSub: 'Name, email, phone, fields completed, and the campaign that brought them.',
    lit: true,
  },
  {
    num: '03',
    title: 'It gets scored by intent',
    body: 'Someone who filled six fields and came back twice is not the same as someone who typed an email and left after eight seconds.',
    right: 'Hot, warm or cold',
    rightSub: 'So your team knows which ones are worth a call this afternoon.',
    lit: true,
  },
  {
    num: '04',
    title: 'Your team hears about it',
    body: 'An SMS or a Slack message the moment a high-intent inquiry drops, with the contact details attached.',
    right: 'A text, within seconds',
    rightSub: 'Or a Slack message in whichever channel your team actually watches.',
    lit: true,
  },
  {
    num: '05',
    title: 'Recovery goes out automatically',
    body: 'A branded email from your own sender name, on whatever delay you set. Immediate, an hour later, whatever suits.',
    right: 'An email they did not expect',
    rightSub: 'From your business, not from us.',
    lit: true,
  },
  {
    num: '06',
    title: 'Meta and Google find out too',
    body: 'The inquiry goes back to both platforms as a server-side conversion event, weighted by how much intent the person actually showed.',
    right: 'Campaigns optimising on real demand',
    rightSub: 'Rather than on the fraction of people who happened to finish.',
    lit: true,
  },
]

const WEEK = [
  { when: 'Day one', what: 'One line of code goes on your site. Same as adding Google Analytics.' },
  { when: 'Day one or two', what: 'The first captured inquiry appears. For most people this is the moment it stops being theoretical.' },
  { when: 'Day two or three', what: 'Recovery emails and alerts start going out.' },
  { when: 'End of week one', what: 'You know your actual abandonment number, not an industry estimate.' },
]

export default function CallFlow() {
  return (
    <div className="sp cf">
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
          <div className="sp-right">
            <div className={'cf-panel' + (s.lit ? ' cf-panel-lit' : ' cf-panel-dead')}>
              <span className="cf-panel-main">{s.right}</span>
              <span className="cf-panel-sub">{s.rightSub}</span>
            </div>
          </div>
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
