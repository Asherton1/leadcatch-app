'use client'

type Props = {
  hasStarted: boolean
  status: 'capturing' | 'abandoned'
  completed: number
  totalFields: number
  revenueAtRisk: number
}

export default function DemoMobileStatusBar({ hasStarted, status, completed, totalFields, revenueAtRisk }: Props) {
  const isAbandoned = status === 'abandoned'

  return (
    <div
      className="demo-mobile-status"
      style={{ transform: hasStarted ? 'translateY(0)' : 'translateY(-100%)' }}
      aria-hidden={!hasStarted}
    >
      <div className="demo-mobile-status-inner">
        <div className="demo-mobile-status-left">
          <span
            className="demo-mobile-status-dot"
            style={{
              background: isAbandoned ? '#ef4444' : '#ff6b35',
              animation: isAbandoned ? 'none' : 'msbPulse 1.4s ease-in-out infinite',
            }}
          />
          <span
            className="demo-mobile-status-label"
            style={{ color: isAbandoned ? '#ef4444' : '#ff6b35' }}
          >
            {isAbandoned ? 'Abandoned' : 'Capturing'}
          </span>
        </div>
        <div className="demo-mobile-status-center">
          <span className="demo-mobile-status-progress">{completed} / {totalFields}</span>
          <span className="demo-mobile-status-progress-label">Fields</span>
        </div>
        {revenueAtRisk > 0 ? (
          <div className="demo-mobile-status-right">
            <span className="demo-mobile-status-revenue">${revenueAtRisk.toLocaleString()}</span>
            <span className="demo-mobile-status-revenue-label">At risk</span>
          </div>
        ) : (
          <div className="demo-mobile-status-right">
            <span className="demo-mobile-status-revenue-placeholder">Live</span>
            <span className="demo-mobile-status-revenue-label">Tracking</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .demo-mobile-status {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: rgba(10, 10, 10, 0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #1e1e1e;
          padding: 0.65rem 1rem;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          display: none;
        }
        @media (max-width: 900px) {
          .demo-mobile-status { display: block; }
        }
        .demo-mobile-status-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 0.75rem;
          max-width: 540px;
          margin: 0 auto;
        }
        .demo-mobile-status-left {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          justify-self: start;
        }
        .demo-mobile-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          transition: background 0.4s ease;
        }
        .demo-mobile-status-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color 0.4s ease;
        }
        .demo-mobile-status-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          gap: 3px;
        }
        .demo-mobile-status-progress {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          font-feature-settings: 'tnum';
        }
        .demo-mobile-status-progress-label {
          font-size: 0.55rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .demo-mobile-status-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1;
          gap: 3px;
          justify-self: end;
        }
        .demo-mobile-status-revenue {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ff6b35;
          font-feature-settings: 'tnum';
        }
        .demo-mobile-status-revenue-placeholder {
          font-size: 0.7rem;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .demo-mobile-status-revenue-label {
          font-size: 0.55rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        @keyframes msbPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  )
}
