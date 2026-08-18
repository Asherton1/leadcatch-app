'use client'

import { useEffect } from 'react'

const API_KEY = 'sk_live_prestonridge_8f3c21d9b47e0a56c8d2f91b6e4a7305'

export default function DemoBuilder() {
  useEffect(() => {
    if (document.getElementById('rc-tracker')) return
    const el = document.createElement('script')
    el.id = 'rc-tracker'
    el.src = `https://www.userecapture.com/track.js?key=${API_KEY}`
    el.async = true
    document.body.appendChild(el)
  }, [])

  return (
    <div className="prh">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

        .prh {
          --stone: #f6f4f0;
          --ink: #1c1a17;
          --muted: #6b665e;
          --line: #ded9d1;
          --brass: #9a7b4f;
          --white: #fffefc;
          background: var(--stone);
          min-height: 100vh;
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .prh * { box-sizing: border-box; }

        .prh-nav {
          border-bottom: 1px solid var(--line);
          background: rgba(255,254,252,0.9);
          backdrop-filter: blur(8px);
          position: sticky; top: 0; z-index: 20;
        }
        .prh-nav-in {
          max-width: 1180px; margin: 0 auto; padding: 1.4rem 2.5rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .prh-brand { display: flex; align-items: baseline; gap: 0.9rem; }
        .prh-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.65rem; font-weight: 500; letter-spacing: 0.02em;
        }
        .prh-brand-rule { width: 1px; height: 22px; background: var(--line); }
        .prh-brand-sub {
          font-size: 0.63rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--brass); font-weight: 500;
        }
        .prh-nav-links { display: flex; gap: 2.2rem; align-items: center; }
        .prh-nav-links a {
          font-size: 0.82rem; color: var(--muted); text-decoration: none;
          letter-spacing: 0.04em; transition: color .2s;
        }
        .prh-nav-links a:hover { color: var(--ink); }
        .prh-nav-phone { color: var(--ink) !important; font-weight: 500; }

        .prh-hero {
          max-width: 1180px; margin: 0 auto; padding: 5.5rem 2.5rem 0;
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 5rem; align-items: start;
        }
        .prh-eyebrow {
          font-size: 0.63rem; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--brass); font-weight: 600; margin-bottom: 1.6rem;
        }
        .prh-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5vw, 4rem); line-height: 1.06;
          font-weight: 400; letter-spacing: -0.015em; margin: 0 0 1.6rem;
        }
        .prh-h1 em { font-style: italic; color: var(--brass); }
        .prh-lede {
          font-size: 1.02rem; line-height: 1.85; color: var(--muted);
          font-weight: 300; max-width: 46ch; margin: 0 0 3rem;
        }
        .prh-stats { display: flex; gap: 3.5rem; padding-top: 2.2rem; border-top: 1px solid var(--line); }
        .prh-stat-n {
          font-family: 'Cormorant Garamond', serif; font-size: 2.1rem;
          font-weight: 500; line-height: 1; margin-bottom: 0.45rem;
        }
        .prh-stat-l {
          font-size: 0.75rem; color: var(--muted); line-height: 1.55;
          letter-spacing: 0.02em;
        }

        .prh-card {
          background: var(--white);
          border: 1px solid var(--line);
          padding: 2.6rem 2.4rem;
          box-shadow: 0 1px 2px rgba(28,26,23,.03), 0 12px 40px -12px rgba(28,26,23,.08);
        }
        .prh-card-head { margin-bottom: 2rem; padding-bottom: 1.4rem; border-bottom: 1px solid var(--line); }
        .prh-card-head h2 {
          font-family: 'Cormorant Garamond', serif; font-size: 1.75rem;
          font-weight: 500; margin: 0 0 0.45rem; letter-spacing: -0.01em;
        }
        .prh-card-head p { font-size: 0.85rem; color: var(--muted); margin: 0; font-weight: 300; }

        .prh-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .prh-f { margin-bottom: 1.15rem; }
        .prh-f label {
          display: block; font-size: 0.68rem; letter-spacing: 0.11em;
          text-transform: uppercase; color: var(--muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .prh-f input, .prh-f select, .prh-f textarea {
          width: 100%; padding: 0.78rem 0.85rem;
          border: 1px solid var(--line); border-radius: 2px;
          font-size: 0.93rem; font-family: inherit; color: var(--ink);
          background: var(--white); transition: border-color .18s, box-shadow .18s;
        }
        .prh-f input:focus, .prh-f select:focus, .prh-f textarea:focus {
          outline: none; border-color: var(--brass);
          box-shadow: 0 0 0 3px rgba(154,123,79,.09);
        }
        .prh-f textarea { resize: vertical; font-weight: 300; }
        .prh-f select { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%239a7b4f' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>"); background-repeat: no-repeat; background-position: right 1rem center; }

        .prh-submit {
          width: 100%; padding: 1rem; margin-top: 0.6rem;
          background: var(--ink); color: var(--stone);
          border: none; border-radius: 2px; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 0.78rem;
          letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600;
          transition: background .2s;
        }
        .prh-submit:hover { background: var(--brass); }
        .prh-note {
          font-size: 0.72rem; color: var(--muted); margin: 1.1rem 0 0;
          text-align: center; line-height: 1.6; font-weight: 300;
        }

        .prh-band {
          margin-top: 6rem; border-top: 1px solid var(--line);
          background: var(--white);
        }
        .prh-band-in {
          max-width: 1180px; margin: 0 auto; padding: 3.5rem 2.5rem;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem;
        }
        .prh-band-item h3 {
          font-family: 'Cormorant Garamond', serif; font-size: 1.25rem;
          font-weight: 500; margin: 0 0 0.6rem;
        }
        .prh-band-item p { font-size: 0.87rem; line-height: 1.75; color: var(--muted); margin: 0; font-weight: 300; }
        .prh-band-num {
          font-size: 0.63rem; letter-spacing: 0.2em; color: var(--brass);
          font-weight: 600; margin-bottom: 0.9rem;
        }

        .prh-foot { border-top: 1px solid var(--line); }
        .prh-foot-in {
          max-width: 1180px; margin: 0 auto; padding: 2rem 2.5rem;
          display: flex; justify-content: space-between;
          font-size: 0.76rem; color: var(--muted); font-weight: 300;
        }

        @media (max-width: 900px) {
          .prh-hero { grid-template-columns: 1fr; gap: 3rem; padding: 3rem 1.5rem 0; }
          .prh-nav-in { padding: 1.1rem 1.5rem; }
          .prh-nav-links a:not(.prh-nav-phone) { display: none; }
          .prh-band-in { grid-template-columns: 1fr; gap: 2.2rem; padding: 2.5rem 1.5rem; }
          .prh-foot-in { flex-direction: column; gap: 0.5rem; padding: 1.5rem; }
          .prh-card { padding: 2rem 1.5rem; }
        }
      `}</style>

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
