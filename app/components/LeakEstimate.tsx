'use client'

import { useState } from 'react'
import './leak-estimate.css'

export default function LeakEstimate({ locationCount }: { locationCount: number | null }) {
  const [perMonth, setPerMonth] = useState(locationCount ? locationCount * 25 : 50)

  // Baymard puts form abandonment at 60 to 70 percent. We show the range rather
  // than a single invented number.
  const lowLost = Math.round(perMonth * 0.6)
  const highLost = Math.round(perMonth * 0.7)

  return (
    <div className="le">
      <div className="le-head">
        <span className="le-pip" aria-hidden="true" />
        <span className="le-title">Your arithmetic</span>
      </div>

      <div className="le-body">
        <label className="le-label" htmlFor="le-range">
          Roughly how many people start a form on your site each month
          {locationCount ? <span className="le-hint"> across all {locationCount} locations</span> : null}?
        </label>

        <div className="le-value">{perMonth.toLocaleString()}</div>

        <input
          id="le-range"
          className="le-range"
          type="range"
          min={10}
          max={1000}
          step={10}
          value={perMonth}
          onChange={e => setPerMonth(Number(e.target.value))}
        />
        <div className="le-scale"><span>10</span><span>1,000</span></div>

        <div className="le-result">
          <div className="le-result-num">{lowLost.toLocaleString()} to {highLost.toLocaleString()}</div>
          <div className="le-result-label">never press submit, every month</div>
        </div>

        <p className="le-note">
          That range is Baymard Institute&apos;s figure for form abandonment, applied to your
          number. It is not a measurement of your site. The point of the trial is that after
          a week you stop estimating and know exactly how many it is.
        </p>
      </div>
    </div>
  )
}
