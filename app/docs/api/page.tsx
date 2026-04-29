import BlogNav from '../../components/BlogNav'
import Footer from '../../components/Footer'
import ScrollReveal from '../../components/ScrollReveal'
import Link from 'next/link'
import '../../blog/blog.css'
import '../../landing.css'
import '../../how-it-works/how-it-works.css'
import './api-docs.css'

export const metadata = {
  title: 'API Documentation — ReCapture',
  description: 'Complete reference for the ReCapture tracking script, REST API endpoints, and webhook payloads. Built for developers and engineering teams.',
}

export default function ApiDocsPage() {
  return (
    <div className="hiw-page">
      <BlogNav />
      <ScrollReveal />

      {/* Hero */}
      <section className="hiw-hero">
        <p className="hiw-label">API Documentation</p>
        <h1 className="hiw-hero-title">Built for <span className="hiw-orange">Developers</span>, Trusted by <span className="hiw-orange">Operators</span></h1>
        <p className="hiw-hero-sub">Every ReCapture account ships with full programmatic access. Drop in the tracking script, push leads via REST, or receive real-time webhooks the second a form is abandoned. Production-ready endpoints, no rate limits on Pro and above.</p>
      </section>

      {/* Quick Start */}
      <section className="hiw-flow">

        <div className="hiw-step reveal">
          <div className="hiw-step-number">01</div>
          <div className="hiw-step-content">
            <h2>Quick Start</h2>
            <p>The fastest path to recovering abandoned form data. One script tag, deployed once. ReCapture handles capture, scoring, alerts, and recovery emails automatically.</p>

            <div className="api-step-meta">
              <span className="api-step-time">Setup time</span>
              <span className="api-step-time-value">Under 60 seconds</span>
            </div>

            <div className="api-code-block">
              <div className="api-code-label">Paste before the closing &lt;/body&gt; tag</div>
              <pre className="api-code"><code>{`<script src="https://userecapture.com/track.js?key=YOUR_API_KEY"
        async></script>`}</code></pre>
            </div>

            <p className="api-note">Find your API key in <Link href="/settings" className="hiw-orange">Settings → Integrations</Link>. The script auto-detects every form on the page — no per-form configuration required.</p>
          </div>
        </div>

        <div className="hiw-connector reveal">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* Authentication */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">02</div>
          <div className="hiw-step-content">
            <h2>Authentication</h2>
            <p>All REST requests authenticate with your client API key. Pass it in the request body as <code className="api-inline">api_key</code>. Never expose service-role keys client-side.</p>

            <div className="api-detail-row">
              <span className="api-detail-label">Base URL</span>
              <span className="api-detail-value"><code className="api-inline">https://userecapture.com</code></span>
            </div>
            <div className="api-detail-row">
              <span className="api-detail-label">Content Type</span>
              <span className="api-detail-value"><code className="api-inline">application/json</code></span>
            </div>
            <div className="api-detail-row">
              <span className="api-detail-label">Rate Limits</span>
              <span className="api-detail-value">None on Pro and Enterprise</span>
            </div>
          </div>
        </div>

        <div className="hiw-connector reveal">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* POST /api/track */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">03</div>
          <div className="hiw-step-content">
            <h2>Track an Abandoned Lead</h2>
            <p>Push a lead manually when the tracker script can&apos;t see your form — custom-rendered React forms, native mobile apps, or backend captures from third-party tools.</p>

            <div className="api-endpoint">
              <span className="api-method">POST</span>
              <span className="api-path">/api/track</span>
            </div>

            <div className="api-code-block">
              <div className="api-code-label">Request Body</div>
              <pre className="api-code"><code>{`{
  "api_key": "your_api_key",
  "session_id": "unique_session_uuid",
  "name": "Sarah Chen",
  "email": "sarah@example.com",
  "phone": "+12145551234",
  "fields_completed": 3,
  "total_fields": 5,
  "time_on_form": 47,
  "device_type": "desktop",
  "form_data": {
    "service": "Consultation",
    "preferred_date": "2026-05-04"
  }
}`}</code></pre>
            </div>

            <div className="api-code-block">
              <div className="api-code-label">Response — 200 OK</div>
              <pre className="api-code"><code>{`{
  "success": true,
  "lead_id": "9f3b0c12-..."
}`}</code></pre>
            </div>

            <p className="api-note">Required: <code className="api-inline">api_key</code>, <code className="api-inline">session_id</code>. All other fields optional. <code className="api-inline">session_id</code> doubles as the dedup key — repeat calls update the same lead instead of creating duplicates.</p>
          </div>
        </div>

        <div className="hiw-connector reveal">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* POST /api/send-recovery */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">04</div>
          <div className="hiw-step-content">
            <h2>Trigger a Recovery Email</h2>
            <p>Manually send the branded recovery email to a captured lead. Useful for custom drip sequences, second-touch automation, or recovering leads outside auto-email windows.</p>

            <div className="api-endpoint">
              <span className="api-method">POST</span>
              <span className="api-path">/api/send-recovery</span>
            </div>

            <div className="api-code-block">
              <div className="api-code-label">Request Body</div>
              <pre className="api-code"><code>{`{
  "api_key": "your_api_key",
  "lead_id": "9f3b0c12-..."
}`}</code></pre>
            </div>

            <div className="api-code-block">
              <div className="api-code-label">Response — 200 OK</div>
              <pre className="api-code"><code>{`{
  "success": true,
  "id": "resend_message_id"
}`}</code></pre>
            </div>

            <p className="api-note">Server validates that the API key owns the lead. Returns <code className="api-inline">{`{ "skipped": true }`}</code> if a recovery email has already been delivered for that lead.</p>
          </div>
        </div>

        <div className="hiw-connector reveal">
          <div className="hiw-connector-line"></div>
          <div className="hiw-connector-dot"></div>
        </div>

        {/* Webhook Payload */}
        <div className="hiw-step reveal">
          <div className="hiw-step-number">05</div>
          <div className="hiw-step-content">
            <h2>Outbound Webhook Payload</h2>
            <p>Configure a Webhook URL in <Link href="/settings" className="hiw-orange">Settings → Integrations</Link> and ReCapture POSTs every captured lead to your endpoint in real time. Standard JSON, signed with your API key&apos;s session.</p>

            <div className="api-code-block">
              <div className="api-code-label">Event — lead.abandoned</div>
              <pre className="api-code"><code>{`{
  "event": "lead.abandoned",
  "timestamp": "2026-04-28T18:42:11.207Z",
  "lead": {
    "name": "Sarah Chen",
    "email": "sarah@example.com",
    "phone": "+12145551234",
    "fields_completed": 3,
    "total_fields": 5,
    "time_on_form": 47,
    "device_type": "desktop",
    "score": "hot",
    "estimated_value": 4200,
    "form_data": {
      "service": "Consultation"
    }
  }
}`}</code></pre>
            </div>

            <p className="api-note">Score values: <code className="api-inline">hot</code> (3+ fields), <code className="api-inline">warm</code> (2 fields), <code className="api-inline">cold</code> (1 field). Estimated value is calculated from your <code className="api-inline">avg_lead_value</code> setting at capture time.</p>
          </div>
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="api-cta-section">
        <div className="api-cta-inner">
          <p className="hiw-label">Need Custom Endpoints?</p>
          <h2 className="api-cta-title">Enterprise customers get direct engineering support, custom field mapping, and white-label endpoints.</h2>
          <Link href="/pricing" className="api-cta-button">View Enterprise Plans</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
