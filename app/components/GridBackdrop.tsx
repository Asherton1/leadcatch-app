'use client'

import './grid-backdrop.css'

export default function GridBackdrop() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb-grid" />
      <div className="gb-scan" />
      <div className="gb-glow gb-glow-a" />
      <div className="gb-glow gb-glow-b" />
    </div>
  )
}
