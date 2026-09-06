'use client'

import './grid-backdrop.css'

/* Each entry is a visitor: where, when, how long, and whether we caught them. */
const VISITORS = [
  { x: 12, y: 14, d: 0,    caught: false },
  { x: 78, y: 9,  d: 2.4,  caught: false },
  { x: 34, y: 26, d: 4.1,  caught: true  },
  { x: 61, y: 33, d: 1.2,  caught: false },
  { x: 88, y: 41, d: 6.3,  caught: false },
  { x: 19, y: 47, d: 3.7,  caught: false },
  { x: 47, y: 55, d: 8.2,  caught: true  },
  { x: 72, y: 62, d: 5.1,  caught: false },
  { x: 8,  y: 68, d: 9.4,  caught: false },
  { x: 55, y: 74, d: 7.0,  caught: false },
  { x: 91, y: 79, d: 11.3, caught: true  },
  { x: 27, y: 86, d: 10.1, caught: false },
  { x: 66, y: 92, d: 12.6, caught: false },
  { x: 41, y: 6,  d: 13.8, caught: false },
]

export default function GridBackdrop() {
  return (
    <div className="gb" aria-hidden="true">
      <div className="gb-grid" />

      <div className="gb-field">
        {VISITORS.map((v, i) => (
          <span
            key={i}
            className={'gb-v' + (v.caught ? ' gb-v-caught' : '')}
            style={{
              left: v.x + '%',
              top: v.y + '%',
              animationDelay: v.d + 's',
            }}
          >
            {v.caught && <span className="gb-ring" style={{ animationDelay: v.d + 's' }} />}
          </span>
        ))}
      </div>
    </div>
  )
}
