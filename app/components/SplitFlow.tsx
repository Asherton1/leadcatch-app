'use client'

import './split-flow.css'

type Step = {
  num: string
  title: string
  body: string
  visible: boolean
  right: React.ReactNode
}

const Empty = ({ label, variant }: { label: string; variant: 'blip' | 'ghost' | 'gone' }) => (
  <div className={'sp-empty sp-empty-' + variant}>
    <div className="sp-mock" aria-hidden="true">
      <div className="sp-mock-head">
        <span className="sp-mock-dot" /><span className="sp-mock-dot" /><span className="sp-mock-dot" />
        <span className="sp-mock-title">Your CRM</span>
      </div>

      {variant === 'blip' && (
        <div className="sp-mock-body">
          <span className="sp-mock-empty">No records</span>
        </div>
      )}

      {variant === 'ghost' && (
        <div className="sp-mock-body">
          <div className="sp-fields">
            <span className="sp-field"><b>Name</b><i className="sp-typing">Sarah Whitfi<span className="sp-caret" /></i></span>
            <span className="sp-field"><b>Email</b><i>s.whitfield@gm</i></span>
          </div>
          <span className="sp-mock-empty">Still no records</span>
        </div>
      )}

      {variant === 'gone' && (
        <div className="sp-mock-body">
          <span className="sp-mock-empty sp-mock-fade">No records</span>
        </div>
      )}
    </div>
    <span className="sp-empty-label">{label}</span>
  </div>
)

const STEPS: Step[] = [
  {
    num: '01',
    title: 'A visitor lands on your site',
    body: 'They arrive from Google, an ad, a referral, or social. They navigate to your contact form, consultation request, or booking page.',
    visible: false,
    right: <Empty variant="blip" label="One anonymous pageview. No identity, no intent." />,
  },
  {
    num: '02',
    title: 'They start filling it in',
    body: 'Name. Email. Phone. Maybe a service selection. Real information, typed by a real person who wants something from you.',
    visible: false,
    right: <Empty variant="ghost" label="Still nothing. Analytics does not watch inside a form." />,
  },
  {
    num: '03',
    title: 'Something pulls them away',
    body: 'Their phone rings. They switch tabs. They lose their nerve. Whatever the reason, they leave without pressing submit.',
    visible: false,
    right: <Empty variant="gone" label="This person is now indistinguishable from a bounce." />,
  },
  {
    num: '04',
    title: 'ReCapture fires',
    body: 'On exit intent, tab close, page unload, or a periodic check while the form sits incomplete, everything they entered is sent to your dashboard.',
    visible: true,
    right: (
      <div className="sp-card">
        <div className="sp-card-head">
          <span className="sp-pip" aria-hidden="true" />
          Inquiry captured
        </div>
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
    num: '05',
    title: 'The lead is scored',
    body: 'Fields completed, time on form, whether they have started before. Your team knows who to call first without reading a single row.',
    visible: true,
    right: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Intent score</div>
        <div className="sp-score">
          <span className="sp-score-num">78</span>
          <span className="sp-score-tag">Hot</span>
        </div>
        <div className="sp-bars">
          <div className="sp-bar"><span>Fields completed</span><i style={{ width: '67%' }} /></div>
          <div className="sp-bar"><span>Time on form</span><i style={{ width: '80%' }} /></div>
          <div className="sp-bar"><span>Returning visitor</span><i style={{ width: '100%' }} /></div>
        </div>
      </div>
    ),
  },
  {
    num: '06',
    title: 'Recovery runs on your terms',
    body: 'A branded email, an SMS to your intake team, an AI callback, or nothing at all until someone reviews it. You choose which channels fire and when.',
    visible: true,
    right: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Channels</div>
        <div className="sp-chans">
          <div className="sp-chan on"><span>Recovery email</span><span className="sp-toggle" /></div>
          <div className="sp-chan on"><span>SMS to intake</span><span className="sp-toggle" /></div>
          <div className="sp-chan"><span>AI voice callback</span><span className="sp-toggle" /></div>
          <div className="sp-chan on"><span>Dashboard only</span><span className="sp-toggle" /></div>
        </div>
      </div>
    ),
  },
  {
    num: '07',
    title: 'The signal goes back to your ad platforms',
    body: 'Meta and Google only ever learn from people who press submit. We send them the ones who did not — hashed, deduplicated against your pixel, and weighted by how much intent each one showed.',
    visible: true,
    right: (
      <div className="sp-card">
        <div className="sp-card-head"><span className="sp-pip" aria-hidden="true" />Conversions sent</div>
        <div className="sp-rows">
          <div className="sp-row"><span>Meta CAPI</span><span>Lead &middot; weighted 1.8&times;</span></div>
          <div className="sp-row"><span>Google Ads</span><span>Offline conversion</span></div>
          <div className="sp-row"><span>Deduplicated</span><span>Against existing pixel</span></div>
          <div className="sp-row"><span>Attributed to</span><span>paid search &middot; brand-dfw</span></div>
        </div>
      </div>
    ),
  },
  {
    num: '08',
    title: 'It becomes revenue',
    body: 'They come back, they book, they sign. And when they do, the real value goes back to your ad platforms so your campaigns learn from the inquiries that actually closed.',
    visible: true,
    right: (
      <div className="sp-card sp-card-win">
        <div className="sp-card-head"><span className="sp-pip sp-pip-green" aria-hidden="true" />Closed</div>
        <div className="sp-win">
          <span className="sp-win-num">$8,400</span>
          <span className="sp-win-label">pushed back as a purchase conversion</span>
        </div>
      </div>
    ),
  },
]

export default function SplitFlow() {
  return (
    <div className="sp">
      <div className="sp-headrow">
        <div className="sp-headcol">What actually happens</div>
        <div className="sp-headcol sp-headcol-r">What your systems see</div>
      </div>

      {STEPS.map(s => (
        <div className={'sp-step reveal' + (s.visible ? ' sp-lit' : '')} key={s.num}>
          <div className="sp-left">
            <span className="sp-num">{s.num}</span>
            <h2 className="sp-title">{s.title}</h2>
            <p className="sp-body">{s.body}</p>
          </div>
          <div className="sp-right">{s.right}</div>
        </div>
      ))}

      <p className="sp-foot">
        The first three rows are the whole problem. Every tool you own starts counting at row four.
      </p>
    </div>
  )
}
