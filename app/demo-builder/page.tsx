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
            <span className="wfl-logo-mark">W</span>
            <span className="wfl-logo-text">
              <span className="wfl-logo-name">Preston Ridge</span>
              <span className="wfl-logo-sub">Homes</span>
            </span>
          </a>
          <nav className="wfl-nav-links">
            <a href="#">Practice Areas</a>
            <a href="#">Attorneys</a>
            <a href="#">Results</a>
            <a href="#" className="wfl-nav-phone">(214) 555-0188</a>
          </nav>
        </div>
      </header>

      <main className="wfl-main">
        <div className="wfl-grid">

          <section className="wfl-intro">
            <p className="wfl-eyebrow">Confidential Consultation</p>
            <h1 className="wfl-h1">You do not have to decide anything today.</h1>
            <p className="wfl-lede">
              Most people who contact us are reaching out at the hardest point of a very difficult year.
              A consultation is a conversation, not a commitment. Tell us as much or as little as you want.
            </p>

            <div className="wfl-trust">
              <div className="wfl-trust-item">
                <div className="wfl-trust-num">Board</div>
                <div className="wfl-trust-lbl">Certified in Homes<br/>Texas Board of Legal Specialization</div>
              </div>
              <div className="wfl-trust-item">
                <div className="wfl-trust-num">24 yrs</div>
                <div className="wfl-trust-lbl">Representing families<br/>across North Texas</div>
              </div>
            </div>

            <p className="wfl-disclaimer">
              Please do not send confidential information through this form until an
              attorney-client relationship has been established.
            </p>
          </section>

          <section className="wfl-form-wrap">
            <form className="wfl-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you — a member of our team will contact you within one business day.') }}>
              <div className="wfl-form-head">
                <h2>Request a Consultation</h2>
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
                <label htmlFor="matterType">Type of Matter</label>
                <select id="matterType" name="matterType" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Divorce</option>
                  <option>Child Custody</option>
                  <option>Custody Modification</option>
                  <option>Property Division</option>
                  <option>Prenuptial Agreement</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="wfl-field">
                <label htmlFor="county">County</label>
                <select id="county" name="county" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Dallas</option>
                  <option>Collin</option>
                  <option>Denton</option>
                  <option>Tarrant</option>
                  <option>Rockwall</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="wfl-field">
                <label htmlFor="situation">Briefly, what is going on?</label>
                <textarea id="situation" name="situation" rows={4} placeholder="Optional. As much or as little as you would like to share."></textarea>
              </div>

              <div className="wfl-field">
                <label htmlFor="contactPref">Preferred Contact Method</label>
                <select id="contactPref" name="contactPref" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Email</option>
                  <option>Phone call</option>
                  <option>Text message</option>
                </select>
              </div>

              <button type="submit" className="wfl-submit">Request Consultation</button>

              <p className="wfl-form-note">
                Submitting this form does not create an attorney-client relationship.
              </p>
            </form>
          </section>

        </div>
      </main>

      <footer className="wfl-footer">
        <div className="wfl-footer-inner">
          <div>Preston Ridge Homes &middot; 2100 Ross Avenue, Suite 900 &middot; Dallas, Texas 75201</div>
          <div className="wfl-footer-meta">Demonstration environment</div>
        </div>
      </footer>
    </div>
  )
}
