export default function LedgerStats() {
  const fmt = (n: number) => n.toLocaleString('en-US')

  return (
    <div className="ledger-stats">
      <div className="ledger-stat">
        <div className="ledger-stat-num">47</div>
        <div className="ledger-stat-label">Abandoned leads</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num ledger-stat-orange">${fmt(51700)}</div>
        <div className="ledger-stat-label">Revenue at risk</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num">12</div>
        <div className="ledger-stat-label">Recovered</div>
      </div>
      <div className="ledger-stat">
        <div className="ledger-stat-num ledger-stat-orange">${fmt(13200)}</div>
        <div className="ledger-stat-label">Recovered revenue</div>
      </div>
    </div>
  )
}
