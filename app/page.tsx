import Link from 'next/link'
import './landing.css'
import StatsBar from './components/StatsBar'

export const metadata = {
  title: 'Recapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
}

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="ambient-bg" />

      {/* Navigation */}
      <nav className="lc-nav">
        <Link href="/" className="logo">
          <span style={{ color: '#fff' }}>Re</span><span className="logo-accent">Capture</span>
        </Link>
        <Link href="/login" className="nav-cta">Login</Link>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <div className="badge-dot" />
          <span>For Elite Service Businesses</span>
        </div>

        <h1>
          You&apos;re Losing<br />
          <span className="hero-highlight">60% of Your Leads</span><br />
          Here&apos;s the Proof.
        </h1>

        <p className="hero-subtitle">
          Every day, prospects start your contact form—and vanish. You never knew they existed.
          Recapture catches what you&apos;re missing and shows you exactly where revenue is slipping away.
        </p>

        <div className="cta-group">
          <Link href="/test-form" className="cta-primary">See Live Demo</Link>
          <Link href="/dashboard" className="cta-secondary">View Dashboard</Link>
        </div>
      </section>

      {/* Stats Bridge */}
      <div className="stats-bridge">
        <StatsBar />
      </div>

      {/* Problem Section */}
      <section className="lc-section">
        <h2 className="section-title">The Invisible Revenue Leak</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-number">01</div>
            <h3 className="problem-title">They Start, Then Disappear</h3>
            <p className="problem-text">
              A prospect finds your site, clicks your form, enters their name and email—then their phone rings.
              They switch tabs. They never return. You never knew they were there.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-number">02</div>
            <h3 className="problem-title">Your Form is Too Long</h3>
            <p className="problem-text">
              Five fields might seem reasonable, but data shows most people abandon after three.
              Every additional field is a conversion barrier you can&apos;t see—until now.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-number">03</div>
            <h3 className="problem-title">Leads Turn Into Ghosts</h3>
            <p className="problem-text">
              If 100 visitors start your form and 60 don&apos;t finish, that&apos;s 15–20 lost bookings per month.
              For a $400 service, you&apos;re leaving $6k–8k on the table. Every single month.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="lc-section">
        <div className="section-label">PRODUCT</div>
        <h2 className="section-title">How Recapture Works</h2>
        <p className="section-subtitle">
          A single script tag on your website. Everything else is automatic.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Universal Tracking</h3>
            <p className="feature-card-text">
              Works on any website, any form builder—WordPress, Wix, custom HTML. One script tag, zero configuration.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/><path d="M13 2.05A10 10 0 0 1 22 12"/><path d="M11 21.95A10 10 0 0 1 2 12"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Real-Time Capture</h3>
            <p className="feature-card-text">
              Name, email, and phone number captured the moment they&apos;re typed—even if the form is never submitted.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Revenue Estimation</h3>
            <p className="feature-card-text">
              See the exact dollar value of every abandoned lead based on your average client value. Know what you&apos;re losing.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Email Auto-Recovery</h3>
            <p className="feature-card-text">
              Automated follow-up emails sent immediately or on a custom delay. Personalized templates that convert.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Status Tracking</h3>
            <p className="feature-card-text">
              Mark leads as Open, Contacted, Converted, or Lost. Track your recovery rate and close more deals.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <h3 className="feature-card-title">Analytics Dashboard</h3>
            <p className="feature-card-text">
              Clean, intuitive dashboard with real-time data, revenue metrics, and complete lead visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="lc-section pricing-section">
        <div className="section-label">PRICING</div>
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-subtitle">No setup fees. No long-term contracts. Cancel anytime.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Essentials</div>
            <div className="pricing-price">
              <span className="price-dollar">$</span>
              <span className="price-amount">150</span>
              <span className="price-period">/month</span>
            </div>
            <p className="pricing-desc">Everything you need to capture and manage abandoned leads.</p>
            <ul className="pricing-features">
              <li><span className="check-icon">✓</span>Form tracking &amp; lead capture</li>
              <li><span className="check-icon">✓</span>Real-time dashboard</li>
              <li><span className="check-icon">✓</span>Revenue estimation</li>
              <li><span className="check-icon">✓</span>Manual follow-up tools</li>
              <li><span className="check-icon">✓</span>Email support</li>
            </ul>
            <Link href="/signup" className="pricing-cta pricing-cta-secondary">Start Free Trial</Link>
          </div>

          <div className="pricing-card pricing-card-featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-tier">Pro</div>
            <div className="pricing-price">
              <span className="price-dollar">$</span>
              <span className="price-amount">200</span>
              <span className="price-period">/month</span>
            </div>
            <p className="pricing-desc">Full automation. Recover leads while you sleep.</p>
            <ul className="pricing-features">
              <li><span className="check-icon">✓</span>Everything in Essentials</li>
              <li><span className="check-icon check-orange">✓</span>Auto-email recovery</li>
              <li><span className="check-icon check-orange">✓</span>Custom email templates</li>
              <li><span className="check-icon check-orange">✓</span>Custom send delay timing</li>
              <li><span className="check-icon check-orange">✓</span>Priority support</li>
            </ul>
            <Link href="/signup" className="pricing-cta pricing-cta-primary">Start Free Trial</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="lc-section">
        <div className="section-label">SOCIAL PROOF</div>
        <h2 className="section-title">Trusted by Elite Practices</h2>
        <div className="testimonials">
          <div className="testimonial">
            <div className="quote-stars">★★★★★</div>
            <p className="quote-text">
              &quot;I had no idea we were losing this many leads. First week revealed 14 partial submissions.
              We recovered three of them—that&apos;s $1,200 we would have lost.&quot;
            </p>
            <div className="author">
              <div className="author-avatar">DM</div>
              <div className="author-info"><h4>Dr. Michael Chen</h4><p>Brilliant Smiles Dental</p></div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote-stars">★★★★★</div>
            <p className="quote-text">
              &quot;We were spending $8k/month on Google Ads. Turns out 60% of people who clicked started our form
              but didn&apos;t finish. Now we&apos;re recovering those leads. The ROI is undeniable.&quot;
            </p>
            <div className="author">
              <div className="author-avatar">SL</div>
              <div className="author-info"><h4>Sarah Lopez</h4><p>Elite Med Spa Dallas</p></div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote-stars">★★★★★</div>
            <p className="quote-text">
              &quot;Installation took two minutes. First partial lead appeared 20 minutes later.
              Now I follow up directly. Simple, effective, essential.&quot;
            </p>
            <div className="author">
              <div className="author-avatar">JT</div>
              <div className="author-info"><h4>James Thompson</h4><p>Thompson Plastic Surgery</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-glow" />
        <div className="section-label">GET STARTED</div>
        <h2>Stop Losing Revenue.<br />Start Recovering Leads.</h2>
        <p>
          Free 2-week trial. No credit card required to start. We install the tracker, you see the data.
          If you&apos;re losing leads, you&apos;ll know within 48 hours.
        </p>
        <Link href="/test-form" className="cta-primary">See Live Demo</Link>
        <p className="final-cta-note">
          Trusted by 100+ med spas, dental practices, and luxury service businesses
        </p>
      </section>

      {/* Footer */}
      <footer className="lc-footer">
        <div className="footer-logo">
          <span style={{ color: '#fff' }}>Re</span><span className="logo-accent">Capture</span>
        </div>
        <p>© 2026 Recapture · userecapture.com · Form Abandonment Recovery Platform</p>
        <p>Built in Dallas, Texas</p>
      </footer>
    </div>
  )
}
