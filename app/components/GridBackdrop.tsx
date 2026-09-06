'use client'

import './grid-backdrop.css'

export default function GridBackdrop() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb-field" />
      <div className="gb-grid" />
      <div className="gb-vignette" />
      <div className="gb-grain" />
    </div>
  )
}
