'use client'

export default function Heartbeat() {
  return (
    <div className="heartbeat" aria-hidden="true">
      <div className="heartbeat-line" />
      <div className="heartbeat-pulse">
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
  )
}
