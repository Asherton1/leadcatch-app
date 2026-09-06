'use client'

import './grid-backdrop.css'

function Rail({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={'gb-rail gb-rail-' + side}>
      <span className="gb-ticks" />
      <span className="gb-line" />
      <span className="gb-bracket">
        <i className="gb-b gb-b-t" />
        <i className="gb-b gb-b-b" />
      </span>
      <span className="gb-mark gb-mark-1" />
      <span className="gb-mark gb-mark-2" />
    </div>
  )
}

export default function GridBackdrop() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb-grid" />
      <Rail side="l" />
      <Rail side="r" />
    </div>
  )
}
