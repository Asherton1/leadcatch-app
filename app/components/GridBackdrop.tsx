'use client'

import './grid-backdrop.css'

export default function GridBackdrop() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb-grid" />

      {/* edge rulers */}
      <div className="gb-ruler gb-ruler-l" />
      <div className="gb-ruler gb-ruler-r" />

      {/* the reticle — narrows in, acquires, releases */}
      <div className="gb-reticle">
        <span className="gb-c gb-c-tl" />
        <span className="gb-c gb-c-tr" />
        <span className="gb-c gb-c-bl" />
        <span className="gb-c gb-c-br" />
        <span className="gb-cross gb-cross-h" />
        <span className="gb-cross gb-cross-v" />
      </div>

      {/* a second, slower reticle sweeping a different region */}
      <div className="gb-reticle gb-reticle-2">
        <span className="gb-c gb-c-tl" />
        <span className="gb-c gb-c-tr" />
        <span className="gb-c gb-c-bl" />
        <span className="gb-c gb-c-br" />
      </div>
    </div>
  )
}
