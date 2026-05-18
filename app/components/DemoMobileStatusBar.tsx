'use client'

type FormFields = {
  name: string
  email: string
  phone: string
  service: string
}

type Props = {
  hasStarted: boolean
  status: 'capturing' | 'abandoned'
  completed: number
  totalFields: number
  revenueAtRisk: number
  fields: FormFields
  industryLabel: string
  captureTime: string
}

export default function DemoMobileStatusBar({ hasStarted, status, completed, totalFields, revenueAtRisk, fields }: Props) {
  const isAbandoned = status === 'abandoned'
  const dotState = !hasStarted ? 'idle' : (isAbandoned ? 'abandoned' : 'capturing')

  return (
    <div className="dmb">
      <div className="dmb-row">
        <div className="dmb-left">
          <span className={`dmb-dot ${dotState}`} />
          <div className="dmb-text">
            <span className={`dmb-label ${dotState}`}>
              {!hasStarted ? 'Live Tracking' : (isAbandoned ? 'Abandoned' : 'Capturing')}
            </span>
            <span className="dmb-sublabel">
              {!hasStarted ? 'Start typing — data appears here' : (fields.name.trim() || 'Unknown visitor')}
            </span>
          </div>
        </div>
        <div className="dmb-right">
          {hasStarted && revenueAtRisk > 0 && (
            <div className="dmb-stat">
              <span className="dmb-stat-num revenue">${revenueAtRisk.toLocaleString()}</span>
              <span className="dmb-stat-label">At risk</span>
            </div>
          )}
          <div className="dmb-stat">
            <span className={`dmb-stat-num ${hasStarted ? 'active' : ''}`}>{completed} / {totalFields}</span>
            <span className="dmb-stat-label">Fields</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .dmb { display: none; }
        @media (max-width: 900px) {
          .dmb {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: #0d0d0d;
            border-top: 1px solid #1e1e1e;
            padding: 0.7rem 1rem;
            padding-bottom: calc(0.7rem + env(safe-area-inset-bottom, 0px));
            box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.7);
            box-sizing: border-box;
            max-width: 100vw;
            overflow: hidden;
          }
        }
        .dmb-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .dmb-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex: 1;
          min-width: 0;
        }
        .dmb-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .dmb-dot.idle { background: #333; }
        .dmb-dot.capturing {
          background: #ff6b35;
          box-shadow: 0 0 9px rgba(255,107,53,0.6);
          animation: dmbPulse 1.4s ease-in-out infinite;
        }
        .dmb-dot.abandoned {
          background: #ef4444;
          box-shadow: 0 0 9px rgba(239,68,68,0.55);
        }
        .dmb-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          min-width: 0;
        }
        .dmb-label {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          transition: color 0.4s ease;
        }
        .dmb-label.idle { color: #888; }
        .dmb-label.capturing { color: #ff6b35; }
        .dmb-label.abandoned { color: #ef4444; }
        .dmb-sublabel {
          font-size: 0.8rem;
          color: #fff;
          font-weight: 600;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .dmb-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
        }
        .dmb-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1.15;
        }
        .dmb-stat-num {
          font-size: 0.88rem;
          font-weight: 700;
          color: #555;
          font-feature-settings: 'tnum';
          white-space: nowrap;
        }
        .dmb-stat-num.active { color: #fff; }
        .dmb-stat-num.revenue { color: #ff6b35; }
        .dmb-stat-label {
          font-size: 0.52rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          margin-top: 1px;
        }
        @keyframes dmbPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
