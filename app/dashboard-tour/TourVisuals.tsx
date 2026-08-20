'use client'

import { useEffect, useRef, useState } from 'react'
import './tour-visuals.css'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return { ref, seen }
}

function Counter({ to, prefix = '', suffix = '', run }: { to: number; prefix?: string; suffix?: string; run: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let f: number
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1)
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [run, to])
  return <>{prefix}{v.toLocaleString()}{suffix}</>
}

/* ─── The ten-card grid ─────────────────────────────── */
export function CardGrid() {
  const { ref, seen } = useInView<HTMLDivElement>()

  const row1 = [
    { label: 'Live Visitors', node: <Counter to={3} run={seen} />, live: true },
    { label: 'Leads Captured', node: <Counter to={47} run={seen} /> },
    { label: 'Completion Rate', node: <Counter to={58} suffix="%" run={seen} /> },
    { label: 'Avg. Time on Form', node: '2:14m' },
    { label: 'Peak Inquiry Hour', node: '9 PM', sub: '11 leads' },
  ]
  const row2 = [
    { label: 'Pipeline at Risk', node: <Counter to={94} prefix="$" suffix="k" run={seen} />, red: true },
    { label: 'Recovered Revenue', node: <Counter to={40} prefix="$" suffix="k" run={seen} />, green: true },
    { label: 'Recovery Rate', node: <Counter to={11} suffix="%" run={seen} /> },
    { label: 'After Hours', node: <Counter to={73} suffix="%" run={seen} />, sub: 'before 8am or after 6pm' },
    { label: 'On Mobile', node: <Counter to={68} suffix="%" run={seen} />, sub: 'of captured inquiries' },
  ]

  const Card = (c: { label: string; node: React.ReactNode; live?: boolean; green?: boolean; red?: boolean; sub?: string }) => (
    <div className="tv-card" key={c.label}>
      <div className="tv-card-head">
        <span className="tv-card-label">
          {c.live && <span className="tv-live-dot" />}
          {c.label}
        </span>
      </div>
      <div className={'tv-card-value' + (c.green ? ' green' : '') + (c.red ? ' red' : '')}>{c.node}</div>
      {c.sub && <div className="tv-card-sub">{c.sub}</div>}
    </div>
  )

  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-grid">{row1.map(Card)}</div>
      <div className="tv-grid">{row2.map(Card)}</div>
    </div>
  )
}

/* ─── Field drop-off ────────────────────────────────── */
export function DropoffChart() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const fields = [
    { name: 'First Name', pct: 100 },
    { name: 'Last Name', pct: 94 },
    { name: 'Email Address', pct: 81 },
    { name: 'Phone Number', pct: 52, drop: true },
    { name: 'Type of Matter', pct: 38 },
    { name: 'Briefly, what is going on?', pct: 12, drop: true },
  ]
  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">Where People Stop</div>
      {fields.map((f, i) => (
        <div className="tv-drop" key={f.name}>
          <div className="tv-drop-head">
            <span className="tv-drop-name">{f.name}</span>
            <span className="tv-drop-pct">{f.pct}%</span>
          </div>
          <div className="tv-drop-track">
            <span
              className="tv-drop-bar"
              style={{ width: seen ? f.pct + '%' : '0%', transitionDelay: i * 90 + 'ms' }}
            />
          </div>
          {f.drop && i > 0 && (
            <div className="tv-drop-note">
              &minus;{fields[i - 1].pct - f.pct}% dropped here
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── 24-hour timing ────────────────────────────────── */
export function TimingChart() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const hours = [1,0,0,0,0,0,1,2,3,4,3,5,6,4,3,4,5,7,9,12,14,11,7,3]
  const peak = Math.max(...hours)

  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">When Inquiries Arrive</div>
      <div className="tv-hours-summary">
        <div><span className="tv-hours-num">73%</span><span className="tv-hours-lbl">Outside 8am&ndash;6pm</span></div>
        <div><span className="tv-hours-num">9 PM</span><span className="tv-hours-lbl">Busiest hour</span></div>
        <div><span className="tv-hours-num">68%</span><span className="tv-hours-lbl">On mobile</span></div>
      </div>
      <div className="tv-hours-chart">
        {hours.map((c, h) => (
          <div className="tv-hour-col" key={h}>
            <span
              className={'tv-hour-bar' + (h < 8 || h >= 18 ? ' after' : '')}
              style={{
                height: seen ? Math.max(3, (c / peak) * 100) + '%' : '2%',
                transitionDelay: h * 28 + 'ms',
              }}
            />
          </div>
        ))}
      </div>
      <div className="tv-hours-axis"><span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>11p</span></div>
      <div className="tv-hours-legend">
        <span><i className="tv-sw biz" /> Business hours</span>
        <span><i className="tv-sw aft" /> After hours</span>
      </div>
    </div>
  )
}

/* ─── Needs-attention strip ─────────────────────────── */
export function AttentionStrip() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!seen) return
    const t = setTimeout(() => setOpen(true), 700)
    return () => clearTimeout(t)
  }, [seen])

  const rows = [
    { name: 'M. Alvarez', contact: 'm.alvarez@gmail.com', score: 'Hot 88', time: '4h ago', value: '$22,000' },
    { name: 'D. Whitfield', contact: '(214) 555-0119', score: 'Hot 81', time: '11h ago', value: '$15,000' },
    { name: 'R. Okafor', contact: 'r.okafor@yahoo.com', score: 'Hot 74', time: '1d ago', value: '$28,000' },
  ]

  return (
    <div className={'tv-attn' + (open ? ' open' : '')} ref={ref}>
      <div className="tv-attn-bar">
        <span className="tv-attn-dot" />
        <span className="tv-attn-text">
          <b>3 hot inquiries</b> from the last 48 hours have not been contacted
          <span className="tv-attn-value">$65,000 in pipeline</span>
        </span>
        <span className="tv-attn-cta">Review</span>
      </div>
      {open && (
        <div className="tv-attn-body">
          {rows.map(r => (
            <div className="tv-attn-row" key={r.name}>
              <span className="tv-attn-row-main">
                <span className="tv-attn-name">{r.name}</span>
                <span className="tv-attn-contact">{r.contact}</span>
              </span>
              <span className="tv-attn-meta">
                <span className="tv-attn-score">{r.score}</span>
                <span className="tv-attn-time">{r.time}</span>
                <span className="tv-attn-val">{r.value}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Pipeline by intent ────────────────────────────── */
export function PipelineBands() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const bands = [
    { label: 'Hot', color: '#ef4444', value: '$52,000', pct: 55, count: '9 inquiries' },
    { label: 'Warm', color: '#f59e0b', value: '$28,000', pct: 30, count: '14 inquiries' },
    { label: 'Cool', color: '#6b7280', value: '$14,000', pct: 15, count: '24 inquiries' },
  ]
  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">Pipeline at Risk &mdash; by intent</div>
      {bands.map((b, i) => (
        <div className="tv-band" key={b.label}>
          <div className="tv-band-head">
            <span className="tv-band-dot" style={{ background: b.color }} />
            <span className="tv-band-label">{b.label}</span>
            <span className="tv-band-value">{b.value}</span>
          </div>
          <div className="tv-band-track">
            <span style={{ width: seen ? b.pct + '%' : '0%', background: b.color, transitionDelay: i * 110 + 'ms' }} />
          </div>
          <div className="tv-band-meta">{b.count} &middot; {b.pct}% of value</div>
        </div>
      ))}
    </div>
  )
}

/* ─── Recovery funnel ───────────────────────────────── */
export function RecoveryFunnel() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const steps = [
    { name: 'Captured', pct: 100, count: '47 of 47', note: 'Started but never submitted' },
    { name: 'Recovery email sent', pct: 89, count: '42 of 47', note: 'Follow-up delivered' },
    { name: 'Contacted', pct: 34, count: '16 of 47', note: 'Your team reached out' },
    { name: 'Converted', pct: 11, count: '5 of 47', note: 'Became a client' },
  ]
  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">Recovery Funnel</div>
      {steps.map((s, i) => (
        <div className="tv-drop" key={s.name}>
          <div className="tv-drop-head">
            <span className="tv-drop-name">{s.name}</span>
            <span className="tv-drop-pct">{s.pct}%</span>
          </div>
          <div className="tv-drop-track">
            <span className="tv-drop-bar" style={{ width: seen ? s.pct + '%' : '0%', transitionDelay: i * 110 + 'ms' }} />
          </div>
          <div className="tv-funnel-meta">
            <span>{s.count}</span><span>{s.note}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Intent signals sent to ad platforms ───────────── */
export function IntentSignals() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const rows = [
    { platform: 'Meta Conversions API', to: 47, note: 'Server-side Lead events' },
    { platform: 'Google Ads', to: 47, note: 'Offline conversion import' },
  ]
  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">Intent Signals Sent</div>

      <div className="tv-sig-compare">
        <div className="tv-sig-side">
          <div className="tv-sig-side-label">Submitted the form</div>
          <div className="tv-sig-side-num tv-sig-dim"><Counter to={18} run={seen} /></div>
          <div className="tv-sig-side-note">What your ad platforms already knew</div>
        </div>
        <div className="tv-sig-plus">+</div>
        <div className="tv-sig-side">
          <div className="tv-sig-side-label">Started and left</div>
          <div className="tv-sig-side-num tv-sig-accent"><Counter to={47} run={seen} /></div>
          <div className="tv-sig-side-note">What they never saw until now</div>
        </div>
      </div>

      <div className="tv-sig-rows">
        {rows.map((r, i) => (
          <div className="tv-sig-row" key={r.platform} style={{ transitionDelay: i * 140 + 'ms', opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(6px)' }}>
            <span className="tv-sig-dot" />
            <span className="tv-sig-platform">{r.platform}</span>
            <span className="tv-sig-note">{r.note}</span>
            <span className="tv-sig-count"><Counter to={r.to} run={seen} /> sent</span>
          </div>
        ))}
      </div>

      <div className="tv-sig-foot">Hashed before they leave. Deduplicated against your existing pixel.</div>
    </div>
  )
}

/* ─── Reporting window + export ─────────────────────── */
export function ReportingWindow() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const [active, setActive] = useState(2)
  const windows = ['7d', '14d', '30d', '90d', 'MTD']
  const data = [
    { leads: 12, rate: 61, delta: '+9%' },
    { leads: 24, rate: 58, delta: '+4%' },
    { leads: 47, rate: 62, delta: '+18%' },
    { leads: 138, rate: 60, delta: '+12%' },
    { leads: 31, rate: 63, delta: '+7%' },
  ]

  useEffect(() => {
    if (!seen) return
    const seq = [0, 1, 2]
    let i = 0
    const iv = setInterval(() => { i += 1; setActive(seq[i % seq.length]) }, 1800)
    return () => clearInterval(iv)
  }, [seen])

  const d = data[active]

  return (
    <div className="tv-frame" ref={ref}>
      <div className="tv-frame-title">Reporting Window</div>

      <div className="tv-rep-chips">
        {windows.map((w, i) => (
          <span key={w} className={'tv-rep-chip' + (i === active ? ' on' : '')}>{w}</span>
        ))}
      </div>

      <div className="tv-rep-stats">
        <div className="tv-rep-stat">
          <div className="tv-rep-num">{d.leads}</div>
          <div className="tv-rep-label">Leads captured</div>
        </div>
        <div className="tv-rep-stat">
          <div className="tv-rep-num">{d.rate}%</div>
          <div className="tv-rep-label">Avg completion</div>
        </div>
        <div className="tv-rep-stat">
          <div className="tv-rep-num tv-rep-delta">{d.delta}</div>
          <div className="tv-rep-label">vs prior period</div>
        </div>
      </div>

      <div className="tv-rep-export">
        <span className="tv-rep-export-label">Export</span>
        <span className="tv-rep-export-file">leads_{windows[active].toLowerCase()}.csv</span>
        <span className="tv-rep-export-cols">16 columns</span>
      </div>
    </div>
  )
}
