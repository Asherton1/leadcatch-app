import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import Link from 'next/link'
import '../blog/blog.css'
import '../landing.css'
import './how-it-works.css'

export const metadata = {
  title: 'How ReCapture Works — Form Abandonment Recovery in 3 Steps',
  description: 'See exactly how ReCapture captures abandoned form data, scores leads, and recovers lost revenue — all from one script tag. No dev team required.',
}

export default function HowItWorksPage() {
  return (
    <div className="hiw-page">
      <BlogNav />
      <ScrollReveal />

      {/* Hero */}
      <section className="hiw-hero">
        <p className="hiw-label">How It Works</p>
        <h1 className="hiw-hero-title">From <span className="hiw-orange">Abandoned Form</span> to <span className="hiw-orange">Recovered Revenue</span></h1>
        <p className="hiw-hero-sub">Most form tools only see completed submissions. ReCapture sees everything — the moment a visitor starts typing, we capture their data, score the lead, alert your team, and send recovery emails automatically.</p>
      </section>

      {/* Visual Flow */}
      <section className="hiw-flow">

        {/* Step 1 */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">01</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
            <h2>Visitor Lands on Your Website</h2>
            <p>A potential client finds your website through Google, an ad, a referral, or social media. They navigate to your contact form, consultation request, or appointment booking page.</p>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* Step 2 */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">02</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </div>
            <h2>They Start Filling Out Your Form</h2>
            <p>They type their name, email address, phone number, maybe select a service or write a message. At this exact moment, <strong>ReCapture's tracking script activates</strong> and begins capturing every field in real time.</p>
            <div className="hiw-detail-card">
              <div className="hiw-detail-label">What gets captured</div>
              <div className="hiw-detail-items">
                <span>Name</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Service Interest</span>
                <span>Form URL</span>
                <span>Timestamp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* Step 3 */}
        <div className="hiw-step hiw-step-alert reveal">
          <div className="hiw-step-number">03</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </div>
            <h2>They Abandon the Form</h2>
            <p>Their phone buzzes. They switch tabs. They get distracted. They close the browser. Whatever the reason, they leave without submitting. Your CRM never sees them. Your analytics never records them.</p>
            <div className="hiw-abandon-stat">
              <span className="hiw-abandon-number">60-80%</span>
              <span className="hiw-abandon-text">of visitors abandon before submitting</span>
            </div>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line hiw-connector-orange"></div>
          <div className="hiw-connector-dot hiw-connector-dot-orange"></div>
        </div>

        {/* Step 4 - ReCapture activates */}
        <div className="hiw-step hiw-step-capture reveal">
          <div className="hiw-step-number hiw-step-number-orange">04</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon hiw-icon-orange-bg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h2>ReCapture Fires Instantly</h2>
            <p>The moment the visitor shows signs of leaving — exit intent, tab close, page unload — ReCapture sends all captured form data to your dashboard. Three detection methods ensure nothing slips through:</p>
            <div className="hiw-triggers">
              <div className="hiw-trigger">
                <div className="hiw-trigger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div>
                  <strong>Exit-Intent Detection</strong>
                  <p>Mouse moves toward closing the tab</p>
                </div>
              </div>
              <div className="hiw-trigger">
                <div className="hiw-trigger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </div>
                <div>
                  <strong>Page Unload</strong>
                  <p>Browser tab closes or navigates away</p>
                </div>
              </div>
              <div className="hiw-trigger">
                <div className="hiw-trigger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <strong>15-Second Heartbeat</strong>
                  <p>Periodic sync catches idle abandonment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line hiw-connector-orange"></div>
          <div className="hiw-connector-dot hiw-connector-dot-orange"></div>
        </div>

        {/* Step 5 */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number hiw-step-number-orange">05</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon hiw-icon-orange-bg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <h2>Lead Scored and Stored</h2>
            <p>Every captured lead is automatically scored based on how much of the form they completed. Your team instantly knows which leads are worth pursuing first.</p>
            <div className="hiw-scores">
              <div className="hiw-score hiw-score-hot">
                <div className="hiw-score-dot"></div>
                <div>
                  <strong>Hot</strong>
                  <p>3+ fields completed — high intent</p>
                </div>
              </div>
              <div className="hiw-score hiw-score-warm">
                <div className="hiw-score-dot"></div>
                <div>
                  <strong>Warm</strong>
                  <p>2 fields — showed real interest</p>
                </div>
              </div>
              <div className="hiw-score hiw-score-cold">
                <div className="hiw-score-dot"></div>
                <div>
                  <strong>Cold</strong>
                  <p>1 field — early drop-off</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line hiw-connector-orange"></div>
          <div className="hiw-connector-dot hiw-connector-dot-orange"></div>
        </div>

        {/* Step 6 - Three parallel actions */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number hiw-step-number-orange">06</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon hiw-icon-orange-bg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </div>
            <h2>Three Things Happen Simultaneously</h2>
            <p>The moment a lead is captured, ReCapture triggers three actions at once to maximize your chances of recovery.</p>
            <div className="hiw-parallel">
              <div className="hiw-parallel-card">
                <div className="hiw-parallel-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                </div>
                <h3>Recovery Email</h3>
                <p>A branded email sends automatically on your behalf, inviting the lead back to complete their request.</p>
              </div>
              <div className="hiw-parallel-card">
                <div className="hiw-parallel-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <h3>SMS Alert</h3>
                <p>Your team gets an instant text message with the lead's name, contact info, and what they were looking for. <em>(Pro plan)</em></p>
              </div>
              <div className="hiw-parallel-card">
                <div className="hiw-parallel-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <h3>Dashboard Update</h3>
                <p>The lead appears in your dashboard with full contact details, revenue-at-risk estimate, and recovery status.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw-connector">
          <div className="hiw-connector-line hiw-connector-green"></div>
          <div className="hiw-connector-dot hiw-connector-dot-green"></div>
        </div>

        {/* Step 7 - Revenue recovered */}
        <div className="hiw-step hiw-step-final reveal">
          <div className="hiw-step-number hiw-step-number-green">07</div>
          <div className="hiw-step-content">
            <div className="hiw-step-icon hiw-icon-green-bg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h2>Revenue Recovered</h2>
            <p>The lead comes back, books the appointment, signs up for the service. Revenue that would have vanished is now in your pipeline. Every Monday at 8am, you receive a performance report with leads captured, revenue at risk, and recovery metrics.</p>
            <div className="hiw-roi-card">
              <div className="hiw-roi-line">
                <span className="hiw-roi-label">Avg. leads recovered per month</span>
                <span className="hiw-roi-value">3-8 leads</span>
              </div>
              <div className="hiw-roi-line">
                <span className="hiw-roi-label">Avg. client value</span>
                <span className="hiw-roi-value">$1,500 - $10,000</span>
              </div>
              <div className="hiw-roi-line hiw-roi-total">
                <span className="hiw-roi-label">Monthly revenue recovered</span>
                <span className="hiw-roi-value">$4,500 - $80,000</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Setup section */}
      <section className="hiw-setup">
        <h2 className="hiw-setup-title reveal">Setup Takes <span className="hiw-orange">Less Than 2 Minutes</span></h2>
        <p className="hiw-setup-sub reveal">One line of code. No form changes. No developer required.</p>
        <div className="hiw-code-block reveal">
          <div className="hiw-code-header">
            <span className="hiw-code-dot red"></span>
            <span className="hiw-code-dot yellow"></span>
            <span className="hiw-code-dot green"></span>
            <span className="hiw-code-filename">your-website.html</span>
          </div>
          <code>&lt;script src=&quot;https://userecapture.com/track.js?key=YOUR_API_KEY&quot;&gt;&lt;/script&gt;</code>
        </div>
        <p className="hiw-setup-compat reveal">Works on WordPress, Webflow, Wix, Squarespace, Shopify, and any custom-built website.</p>
      </section>

      {/* CTA */}
      <section className="hiw-cta reveal">
        <h2>Ready to See What You're Missing?</h2>
        <p>Start your 7-day free trial. If you're losing leads, you'll know within 48 hours.</p>
        <div className="hiw-cta-buttons">
          <Link href="/test-form" className="hiw-cta-primary">Try the Live Demo</Link>
          <Link href="/start-trial" className="hiw-cta-secondary">Start Free Trial</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
