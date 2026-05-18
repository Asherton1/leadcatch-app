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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  if (parts[0]?.length > 0) return parts[0][0].toUpperCase()
  return '?'
}

export default function DemoMobileStatusBar({ hasStarted, status, completed, totalFields, revenueAtRisk, fields, industryLabel, captureTime }: Props) {
  const isAbandoned = status === 'abandoned'
  const dotState = !hasStarted ? 'idle' : (isAbandoned ? 'abandoned' : 'capturing')

  return (
    <div className="dmlp">
      <div className="dmlp-bar">
        <div className="dmlp-bar-left">
          <span className={`dmlp-dot ${dotState}`} />
          <span className={`dmlp-bar-label ${dotState}`}>
            {!hasStarted ? 'Live Tracking' : (isAbandoned ? 'Abandoned' : 'Capturing')}
          </span>
        </div>
        <span className="dmlp-bar-right">ReCapture Dashboard</span>
      </div>

      {!hasStarted ? (
        <div className="dmlp-empty">
          Start typing in the form below — your data will appear here in real time.
        </div>
      ) : (
        <div className="dmlp-card">
          <div className="dmlp-card-header">
            <div className="dmlp-avatar">{fields.name.trim() ? getInitials(fields.name) : '?'}</div>
            <div className="dmlp-card-id">
              <div className="dmlp-card-name">{fields.name.trim() || 'Unknown Visitor'}</div>
              <div className="dmlp-card-time">Captured at {captureTime}</div>
            </div>
          </div>
          <div className="dmlp-card-grid">
            <div className="dmlp-card-cell">
              <div className="dmlp-card-cell-label">Email</div>
              <div className={`dmlp-card-cell-value ${fields.email.trim() ? '' : 'empty'}`}>
                {fields.email.trim() || '—'}
              </div>
            </div>
            <div className="dmlp-card-cell">
              <div className="dmlp-card-cell-label">Phone</div>
              <div className={`dmlp-card-cell-value ${fields.phone.trim() ? '' : 'empty'}`}>
                {fields.phone.trim() || '—'}
              </div>
            </div>
            <div className="dmlp-card-cell">
              <div className="dmlp-card-cell-label">Industry</div>
              <div className={`dmlp-card-cell-value ${industryLabel ? '' : 'empty'}`}>
                {industryLabel || '—'}
              </div>
            </div>
            <div className="dmlp-card-cell">
              <div className="dmlp-card-cell-label">Est. Value</div>
              <div className={`dmlp-card-cell-value revenue ${revenueAtRisk > 0 ? '' : 'empty'}`}>
                {revenueAtRisk > 0 ? `$${revenueAtRisk.toLocaleString()}` : '—'}
              </div>
            </div>
          </div>
          <div className="dmlp-progress-wrap">
            <div className="dmlp-progress-track">
              <div className="dmlp-progress-fill" style={{ width: `${(completed / totalFields) * 100}%` }} />
            </div>
            <span className="dmlp-progress-count">{completed} / {totalFields} fields</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .dmlp {
          display: none;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 900px) {
          .dmlp { display: block; }
        }
        .dmlp-bar {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dmlp-bar-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
        }
        .dmlp-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .dmlp-dot.idle { background: #333; }
        .dmlp-dot.capturing {
          background: #ff6b35;
          box-shadow: 0 0 8px rgba(255, 107, 53, 0.5);
          animation: dmlpPulse 1.4s ease-in-out infinite;
        }
        .dmlp-dot.abandoned {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
        }
        .dmlp-bar-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: color 0.4s ease;
        }
        .dmlp-bar-label.idle { color: #444; }
        .dmlp-bar-label.capturing { color: #ff6b35; }
        .dmlp-bar-label.abandoned { color: #ef4444; }
        .dmlp-bar-right {
          font-size: 0.62rem;
          color: #444;
          font-weight: 500;
          flex-shrink: 0;
        }
        .dmlp-empty {
          padding: 1.85rem 1rem;
          color: #555;
          font-size: 0.78rem;
          text-align: center;
          line-height: 1.5;
        }
        .dmlp-card {
          padding: 1.1rem;
        }
        .dmlp-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .dmlp-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35, #e85d2c);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .dmlp-card-id {
          flex: 1;
          min-width: 0;
        }
        .dmlp-card-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dmlp-card-time {
          font-size: 0.68rem;
          color: #555;
          margin-top: 1px;
        }
        .dmlp-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem;
          margin-bottom: 0.9rem;
        }
        .dmlp-card-cell {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          padding: 0.6rem 0.7rem;
          min-width: 0;
        }
        .dmlp-card-cell-label {
          font-size: 0.55rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .dmlp-card-cell-value {
          font-size: 0.76rem;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dmlp-card-cell-value.empty { color: #333; }
        .dmlp-card-cell-value.revenue { color: #ff6b35; font-weight: 700; }
        .dmlp-card-cell-value.revenue.empty { color: #333; font-weight: 500; }
        .dmlp-progress-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .dmlp-progress-track {
          flex: 1;
          height: 4px;
          background: #1e1e1e;
          border-radius: 2px;
          overflow: hidden;
        }
        .dmlp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b35, #ff8f5e);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .dmlp-progress-count {
          font-size: 0.65rem;
          font-weight: 700;
          color: #ff6b35;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        @keyframes dmlpPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
