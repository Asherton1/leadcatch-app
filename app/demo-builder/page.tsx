'use client'

import { useEffect } from 'react'
import './demo-builder.css'

const API_KEY = 'sk_live_prestonridge_8f3c21d9b47e0a56c8d2f91b6e4a7305'

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
    <div className="prh">
      

      <header className="prh-nav">
        <div className="prh-nav-in">
          <div className="prh-brand">
            <span className="prh-brand-name">Preston Ridge</span>
            <span className="prh-brand-rule" />
            <span className="prh-brand-sub">Homes</span>
          </div>
          <nav className="prh-nav-links">
            <a href="#">Communities</a>
            <a href="#">Floorplans</a>
            <a href="#">Move-In Ready</a>
            <a href="#" className="prh-nav-phone">(972) 555-0143</a>
          </nav>
        </div>
      </header>

      <main className="prh-hero">
        <section>
          <p className="prh-eyebrow">Request Information</p>
          <h1 className="prh-h1">The home you have been<br /><em>picturing</em> is closer than you think.</h1>
          <p className="prh-lede">
            Tell us what you are looking for and a community specialist will send pricing,
            available homesites, and floorplans for the neighborhoods that fit. No pressure,
            no obligation, and a real person on the other end.
          </p>
          <div className="prh-stats">
            <div>
              <div className="prh-stat-n">12</div>
              <div className="prh-stat-l">Communities across<br />the DFW metroplex</div>
            </div>
            <div>
              <div className="prh-stat-n">30</div>
              <div className="prh-stat-l">Years building<br />in North Texas</div>
            </div>
            <div>
              <div className="prh-stat-n">1,400+</div>
              <div className="prh-stat-l">Families moved<br />into a Preston Ridge home</div>
            </div>
          </div>
        </section>

        <section>
          <form
            className="prh-card"
            onSubmit={(e) => { e.preventDefault(); alert('Thank you — a community specialist will reach out within one business day.') }}
          >
            <div className="prh-card-head">
              <h2>Request pricing &amp; availability</h2>
              <p>We respond to every inquiry within one business day.</p>
            </div>

            <div className="prh-row">
              <div className="prh-f">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" autoComplete="given-name" />
              </div>
              <div className="prh-f">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" name="lastName" autoComplete="family-name" />
              </div>
            </div>

            <div className="prh-f">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>

            <div className="prh-f">
              <label htmlFor="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" autoComplete="tel" />
            </div>

            <div className="prh-f">
              <label htmlFor="community">Community of interest</label>
              <select id="community" name="community" defaultValue="">
                <option value="" disabled>Select a community</option>
                <option>Preston Ridge — Frisco</option>
                <option>Sterling Creek — Prosper</option>
                <option>The Reserve at Celina</option>
                <option>Wynhaven — McKinney</option>
                <option>Bell Meadow — Argyle</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div className="prh-row">
              <div className="prh-f">
                <label htmlFor="priceRange">Price range</label>
                <select id="priceRange" name="priceRange" defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>$400k – $600k</option>
                  <option>$600k – $800k</option>
                  <option>$800k – $1M</option>
                  <option>$1M+</option>
                </select>
              </div>
              <div className="prh-f">
                <label htmlFor="timeline">Timeline</label>
                <select id="timeline" name="timeline" defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Ready now</option>
                  <option>1 – 3 months</option>
                  <option>3 – 6 months</option>
                  <option>6 – 12 months</option>
                  <option>Just looking</option>
                </select>
              </div>
            </div>

            <div className="prh-f">
              <label htmlFor="notes">Anything specific?</label>
              <textarea id="notes" name="notes" rows={3} placeholder="Optional — homesite size, floorplan, school district"></textarea>
            </div>

            <button type="submit" className="prh-submit">Request Information</button>

            <p className="prh-note">
              We may save the contact details you enter so we can follow up if you do not
              complete this form. See our privacy policy.
            </p>
          </form>
        </section>
      </main>

      <section className="prh-band">
        <div className="prh-band-in">
          <div className="prh-band-item">
            <div className="prh-band-num">01</div>
            <h3>Tell us what fits</h3>
            <p>Share your community, price range, and timeline. It takes about a minute and there is no obligation.</p>
          </div>
          <div className="prh-band-item">
            <div className="prh-band-num">02</div>
            <h3>Get real numbers</h3>
            <p>A community specialist sends current pricing, available homesites, and the floorplans that match.</p>
          </div>
          <div className="prh-band-item">
            <div className="prh-band-num">03</div>
            <h3>Walk the homesite</h3>
            <p>When you are ready, tour in person. Most families visit two or three communities before deciding.</p>
          </div>
        </div>
      </section>

      <footer className="prh-foot">
        <div className="prh-foot-in">
          <div>Preston Ridge Homes · 5720 Legacy Drive, Suite 200 · Plano, Texas 75024</div>
          <div>Demonstration environment</div>
        </div>
      </footer>
    </div>
  )
}
