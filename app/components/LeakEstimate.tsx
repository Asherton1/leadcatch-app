'use client'

import { useState } from 'react'
import './leak-estimate.css'

export default function LeakEstimate({ locationCount }: { locationCount: number | null }) {
  const [perMonth, setPerMonth] = useState(locationCount ? locationCount * 10 : 25)

  // They know their submissions. They cannot know how many started, which is the
  // whole point. So work backwards: if 60 to 70 percent abandon, submissions are
  // the remaining 30 to 40 percent of everyone who started.
  const lowLost = Math.round(perMonth / 0.4 - perMonth)   // at 60% abandonment
  const highLost = Math.round(perMonth / 0.3 - perMonth)  // at 70% abandonment

  return (
    <div className="le">
      <div className="le-head">
        <span className="le-pip" aria-hidden="true" />
        <span className="le-title">Your arithmetic</span>
      </div>

      <div className="le-body">
        <label className="le-label" htmlFor="le-range">
          Roughly how many form submissions do you get each month
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
          <div className="le-result-label">more started a form and never finished it</div>
        </div>

        <p className="le-note">
          You know your submissions. You cannot know how many people started and left,
          because nothing currently records them. This works backwards from Baymard
          Institute&apos;s 60 to 70 percent abandonment figure. It is arithmetic, not a
          measurement of your site. After a week of the trial you stop estimating.
        </p>
      </div>
    </div>
  )
}
