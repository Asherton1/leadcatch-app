'use client'

import { useEffect } from 'react'
import './demo-builder.css'


export default function DemoBuilder() {
  useEffect(() => {
    if (document.getElementById('rc-tracker')) return
    const el = document.createElement('script')
    el.id = 'rc-tracker'
    el.src = 'https://www.userecapture.com/track.js?key=sk_live_prestonridge_8f3c21d9b47e0a56c8d2f91b6e4a7305'
    el.async = true
    document.body.appendChild(el)
  }, [])

  return (
    <div className="wfl">

      <header className="wfl-nav">
        <div className="wfl-nav-inner">
          <a href="#" className="wfl-logo">
            <span className="wfl-logo-mark">P</span>
            <span className="wfl-logo-text">
              <span className="wfl-logo-name">Preston Ridge</span>
              <span className="wfl-logo-sub">Homes</span>
            </span>
          </a>
          <nav className="wfl-nav-links">
            <a href="#">Communities</a>
            <a href="#">Floorplans</a>
            <a href="#">Move-In Ready</a>
            <a href="#" className="wfl-nav-phone">(972) 555-0143</a>
          </nav>
        </div>
      </header>

      <main className="wfl-main">
        <div className="wfl-grid">

          <section className="wfl-intro">
            <p className="wfl-eyebrow">Request Information</p>
            <h1 className="wfl-h1">Find the home you have been picturing.</h1>
            <p className="wfl-lede">
              Tell us what you are looking for and a community specialist will send pricing, available homesites, and floorplans for the neighborhoods that fit. No pressure, no obligation.
            </p>

            <div className="wfl-trust">
              <div className="wfl-trust-item">
                <div className="wfl-trust-num">12</div>
                <div className="wfl-trust-lbl">Certified in Homes<br/>Texas 12 of Legal Specialization</div>
              </div>
              <div className="wfl-trust-item">
                <div className="wfl-trust-num">30 yrs</div>
                <div className="wfl-trust-lbl">Building homes<br/>across North Texas</div>
              </div>
            </div>

            <p className="wfl-disclaimer">
              A community specialist will follow up with pricing and availability for the neighborhoods you select.
            </p>
          </section>

          <section className="wfl-form-wrap">
            <form className="wfl-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you — a community specialist will reach out within one business day.') }}>
              <div className="wfl-form-head">
                <h2>Request Pricing &amp; Availability</h2>
                <p>We respond to every inquiry within one business day.</p>
              </div>

              <div className="wfl-row">
                <div className="wfl-field">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" autoComplete="given-name" />
                </div>
                <div className="wfl-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" autoComplete="family-name" />
                </div>
              </div>

              <div className="wfl-field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" autoComplete="email" />
              </div>

              <div className="wfl-field">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" autoComplete="tel" />
              </div>

              <div className="wfl-field">
                <label htmlFor="community">Community of Interest</label>
                <select id="community" name="community" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Preston Ridge &mdash; Frisco</option>
                  <option>Sterling Creek &mdash; Prosper</option>
                  <option>The Reserve at Celina</option>
                  <option>Wynhaven &mdash; McKinney</option>
                  <option>Bell Meadow &mdash; Argyle</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="wfl-field">
                <label htmlFor="priceRange">Price Range</label>
                <select id="priceRange" name="priceRange" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>$400k &ndash; $600k</option>
                  <option>$600k &ndash; $800k</option>
                  <option>$800k &ndash; $1M</option>
                  <option>$1M+</option>
                  <option>Not sure yet</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="wfl-field">
                <label htmlFor="notes">Anything specific you are looking for?</label>
                <textarea id="notes" name="notes" rows={4} placeholder="Optional — homesite size, floorplan, school district."></textarea>
              </div>

              <div className="wfl-field">
                <label htmlFor="timeline">Timeline to Purchase</label>
                <select id="timeline" name="timeline" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Ready now</option>
                  <option>1 &ndash; 3 months</option>
                  <option>3 &ndash; 6 months</option>
                </select>
              </div>

              <button type="submit" className="wfl-submit">Request Information</button>

              <p className="wfl-form-note">
                We may save the contact details you enter so we can follow up if you do not complete this form.
              </p>
            </form>
          </section>

        </div>
      </main>

      <footer className="wfl-footer">
        <div className="wfl-footer-inner">
          <div>Preston Ridge Homes &middot; 5720 Legacy Drive, Suite 200 &middot; Plano, Texas 75024</div>
          <div className="wfl-footer-meta">Demonstration environment</div>
        </div>
      </footer>
    </div>
  )
}
