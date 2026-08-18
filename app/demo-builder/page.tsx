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
    <div style={{ background: '#faf9f7', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#1a1a1a' }}>

      <header style={{ borderBottom: '1px solid #e5e2dd', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 38, height: 38, background: '#8b6f47', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', borderRadius: 2 }}>PR</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>Preston Ridge Homes</div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b6f47' }}>New Construction &middot; North Texas</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem', fontSize: '0.9rem', alignItems: 'center' }}>
            <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Communities</a>
            <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Floorplans</a>
            <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Move-In Ready</a>
            <a href="#" style={{ color: '#8b6f47', textDecoration: 'none', fontWeight: 600 }}>(972) 555-0143</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '3.5rem 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          <section>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8b6f47', fontWeight: 700, marginBottom: '1rem' }}>Request Information</p>
            <h1 style={{ fontSize: '2.4rem', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 800, marginBottom: '1.25rem' }}>
              Find the home you have been picturing.
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#555', marginBottom: '2.5rem' }}>
              Tell us what you are looking for and a community specialist will send pricing,
              available lots, and floorplans for the neighborhoods that fit. No pressure, no obligation.
            </p>

            <div style={{ display: 'flex', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #e5e2dd' }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#8b6f47' }}>12</div>
                <div style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.4 }}>Communities across<br/>the DFW metroplex</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#8b6f47' }}>30 yrs</div>
                <div style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.4 }}>Building in<br/>North Texas</div>
              </div>
            </div>
          </section>

          <section>
            <form
              onSubmit={(e) => { e.preventDefault(); alert('Thank you — a community specialist will reach out within one business day.') }}
              style={{ background: '#fff', border: '1px solid #e5e2dd', borderRadius: 6, padding: '2rem' }}
            >
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem' }}>Request Pricing &amp; Availability</h2>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>We respond to every inquiry within one business day.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>First Name</label>
                  <input type="text" id="firstName" name="firstName" autoComplete="given-name" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Last Name</label>
                  <input type="text" id="lastName" name="lastName" autoComplete="family-name" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Email Address</label>
                <input type="email" id="email" name="email" autoComplete="email" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="phone" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Phone Number</label>
                <input type="tel" id="phone" name="phone" autoComplete="tel" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="community" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Community of Interest</label>
                <select id="community" name="community" defaultValue="" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem', background: '#fff' }}>
                  <option value="" disabled>Select a community</option>
                  <option>Preston Ridge &mdash; Frisco</option>
                  <option>Sterling Creek &mdash; Prosper</option>
                  <option>The Reserve at Celina</option>
                  <option>Wynhaven &mdash; McKinney</option>
                  <option>Bell Meadow &mdash; Argyle</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="priceRange" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Price Range</label>
                <select id="priceRange" name="priceRange" defaultValue="" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem', background: '#fff' }}>
                  <option value="" disabled>Select a range</option>
                  <option>$400,000 &ndash; $600,000</option>
                  <option>$600,000 &ndash; $800,000</option>
                  <option>$800,000 &ndash; $1,000,000</option>
                  <option>$1,000,000+</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="timeline" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Timeline to Purchase</label>
                <select id="timeline" name="timeline" defaultValue="" style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem', background: '#fff' }}>
                  <option value="" disabled>Select a timeline</option>
                  <option>Ready now</option>
                  <option>1 &ndash; 3 months</option>
                  <option>3 &ndash; 6 months</option>
                  <option>6 &ndash; 12 months</option>
                  <option>Just starting to look</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="notes" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>Anything specific you are looking for?</label>
                <textarea id="notes" name="notes" rows={3} placeholder="Optional — lot size, floorplan, school district, etc." style={{ width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: 4, fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" style={{ width: '100%', padding: '0.9rem', background: '#8b6f47', color: '#fff', border: 'none', borderRadius: 4, fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                Request Information
              </button>

              <p style={{ fontSize: '0.78rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
                We may save the contact details you enter so we can follow up if you do not complete this form.
              </p>
            </form>
          </section>

        </div>
      </main>

      <footer style={{ borderTop: '1px solid #e5e2dd', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#777' }}>
          <div>Preston Ridge Homes &middot; 5720 Legacy Drive, Suite 200 &middot; Plano, Texas 75024</div>
          <div>Demonstration environment</div>
        </div>
      </footer>
    </div>
  )
}
