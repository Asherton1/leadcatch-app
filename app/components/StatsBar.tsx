export default function StatsBar() {
  return (
    <div className="stats-hero">
      {/* Dominant featured stat */}
      <div className="stats-hero-featured">
        <p className="stats-hero-eyebrow">Estimated revenue lost per month</p>
        <p className="stats-hero-number">$18,800</p>
        <p className="stats-hero-context">
          Per high-ticket business · From form abandonment alone · Industry average
        </p>
      </div>

      {/* Supporting context stats — smaller, side-by-side below */}
      <div className="stats-hero-supporting">
        <div className="stats-hero-stat">
          <span className="stats-hero-stat-num">60–80%</span>
          <span className="stats-hero-stat-label">of form visitors abandon before submit</span>
        </div>
        <div className="stats-hero-divider"></div>
        <div className="stats-hero-stat">
          <span className="stats-hero-stat-num">2 min</span>
          <span className="stats-hero-stat-label">to install one script tag</span>
        </div>
      </div>
    </div>
  )
}
