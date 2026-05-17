'use client'

const LINES = [
  { top: '12%', delay: '0s' },
  { top: '28%', delay: '1.4s' },
  { top: '44%', delay: '2.8s' },
  { top: '60%', delay: '4.2s' },
  { top: '76%', delay: '5.6s' },
]

export default function Heartbeat() {
  return (
    <div className="heartbeat" aria-hidden="true">
      {LINES.map((line, i) => (
        <div key={i} className="heartbeat-row" style={{ top: line.top }}>
          <div className="heartbeat-line" />
          <div className="heartbeat-pulse" style={{ animationDelay: line.delay }}>
            <svg viewBox="0 0 60 20" preserveAspectRatio="none">
              <path
                d="M0,10 L18,10 L22,12 L25,4 L28,16 L31,10 L60,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
