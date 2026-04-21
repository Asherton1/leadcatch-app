"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import "../dashboard/dashboard.css"
import "./settings.css"

interface ClientSettings {
  id: string
  company_name: string | null
  website_url: string | null
  contact_email: string | null
  contact_phone: string | null
  booking_url: string | null
  business_address: string | null
  business_hours: string | null
  avg_lead_value: number
  auto_email_enabled: boolean
  email_delay_minutes: number
  sender_name: string | null
  email_header: string | null
  from_email: string | null
  reply_to_email: string | null
  email_footer: string | null
  message_template: string | null
  sms_enabled: boolean
  sms_phone: string | null
  email_alert_enabled: boolean
  email_alert_address: string | null
  slack_webhook_url: string | null
  ai_callback_enabled: boolean
  ai_agent_name: string | null
  ai_services_list: string | null
  ai_call_hours_start: string | null
  ai_call_hours_end: string | null
  quiet_hours_start: string | null
  quiet_hours_end: string | null
  webhook_url: string | null
  api_key: string
  plan: string | null
  trial_ends_at: string | null
  retell_agent_id: string | null
  min_lead_score: number
  auto_mark_contacted: boolean
  lead_notification_email: string | null
  brand_color: string | null
  company_tagline: string | null
  business_name: string | null
}

const DELAY_OPTIONS = [
  { value: 0, label: "Immediately" },
  { value: 5, label: "5 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 120, label: "2 hours" },
]

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 || 12
  const ampm = i < 12 ? "AM" : "PM"
  return { value: `${String(i).padStart(2, "0")}:00`, label: `${h}:00 ${ampm}` }
})

const SCORE_OPTIONS = [
  { value: 0, label: "All leads (no minimum)" },
  { value: 30, label: "Warm & Hot only (30+)" },
  { value: 70, label: "Hot leads only (70+)" },
]

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${on ? "on" : "off"}`}
      onClick={() => !disabled && onChange(!on)}
      disabled={disabled}
      aria-label={on ? "Enabled" : "Disabled"}
    >
      <div className="settings-toggle-thumb" />
    </button>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="settings-copy-btn"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#10b981" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const presets = ["#ff6b35", "#4a9eff", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4"]
  return (
    <div className="settings-color-picker">
      {presets.map(c => (
        <button
          key={c}
          type="button"
          className={`settings-color-swatch ${value === c ? "active" : ""}`}
          style={{ background: c }}
          onClick={() => onChange(c)}
        />
      ))}
      <input type="color" value={value || "#ff6b35"} onChange={e => onChange(e.target.value)} className="settings-color-custom" />
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState<ClientSettings | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace("/login"); return }
      setUserEmail(session.user.email ?? "")
      setAuthed(true)

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", session.user.id)
        .single()

      if (!error && data) {
        setSettings(data as ClientSettings)
        setIsPro(data.plan === "pro" || data.plan === "enterprise")
      }
      setLoading(false)
    })
  }, [router])

  async function handleSave() {
    if (!settings) return
    setSaving(true)
    const { error } = await supabase
      .from("clients")
      .update({
        company_name: settings.company_name,
        website_url: settings.website_url,
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
        booking_url: settings.booking_url,
        business_address: settings.business_address,
        business_hours: settings.business_hours,
        avg_lead_value: settings.avg_lead_value,
        auto_email_enabled: settings.auto_email_enabled,
        email_delay_minutes: settings.email_delay_minutes,
        sender_name: settings.sender_name,
        email_header: settings.email_header,
        from_email: settings.from_email,
        reply_to_email: settings.reply_to_email,
        email_footer: settings.email_footer,
        message_template: settings.message_template,
        sms_enabled: settings.sms_enabled,
        sms_phone: settings.sms_phone,
        email_alert_enabled: settings.email_alert_enabled,
        email_alert_address: settings.email_alert_address,
        slack_webhook_url: settings.slack_webhook_url,
        ai_callback_enabled: settings.ai_callback_enabled,
        ai_agent_name: settings.ai_agent_name,
        ai_services_list: settings.ai_services_list,
        ai_call_hours_start: settings.ai_call_hours_start,
        ai_call_hours_end: settings.ai_call_hours_end,
        quiet_hours_start: settings.quiet_hours_start,
        quiet_hours_end: settings.quiet_hours_end,
        webhook_url: settings.webhook_url,
        min_lead_score: settings.min_lead_score,
        auto_mark_contacted: settings.auto_mark_contacted,
        lead_notification_email: settings.lead_notification_email,
        brand_color: settings.brand_color,
        company_tagline: settings.company_tagline,
      })
      .eq("id", settings.id)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  function update(field: keyof ClientSettings, value: unknown) {
    if (!settings) return
    setSettings({ ...settings, [field]: value })
  }

  if (authed === null || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ color: "#333", fontSize: "0.875rem" }}>Loading settings...</div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ color: "#666", fontSize: "0.875rem" }}>No account found. <a href="/dashboard" style={{ color: "#ff6b35" }}>Go to Dashboard</a></div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg>
            <span><span style={{ color: "#fff", fontWeight: 700 }}>Re</span><span style={{ color: "#ff6b35", fontWeight: 700 }}>Capture</span></span>
          </span>
        </div>
        <div className="header-right">
          <a href="/dashboard" className="settings-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Dashboard
          </a>
          <span className="client-name">{userEmail}</span>
        </div>
      </header>

      <div className="settings-container">
        <div className="settings-header">
          <div>
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Configure how ReCapture works for your business</p>
          </div>
          <button className="settings-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
          </button>
        </div>

        {/* ── Business Profile ──────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Business Profile</h2>
              <p className="settings-section-desc">Your business details used across ReCapture</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-field">
              <label className="settings-label">Company Name</label>
              <input type="text" className="settings-input" value={settings.company_name ?? ""} onChange={e => update("company_name", e.target.value)} placeholder="Your Business Name" />
            </div>
            <div className="settings-field">
              <label className="settings-label">Website URL</label>
              <input type="url" className="settings-input" value={settings.website_url ?? ""} onChange={e => update("website_url", e.target.value)} placeholder="https://yourbusiness.com" />
            </div>
            <div className="settings-row">
              <div className="settings-field">
                <label className="settings-label">Contact Email</label>
                <input type="email" className="settings-input" value={settings.contact_email ?? ""} onChange={e => update("contact_email", e.target.value)} placeholder="hello@yourbusiness.com" />
              </div>
              <div className="settings-field">
                <label className="settings-label">Contact Phone</label>
                <input type="tel" className="settings-input" value={settings.contact_phone ?? ""} onChange={e => update("contact_phone", e.target.value)} placeholder="(214) 555-1234" />
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Business Address</label>
              <input type="text" className="settings-input" value={settings.business_address ?? ""} onChange={e => update("business_address", e.target.value)} placeholder="123 Main St, Dallas, TX 75201" />
            </div>
            <div className="settings-row">
              <div className="settings-field">
                <label className="settings-label">Booking URL</label>
                <input type="url" className="settings-input" value={settings.booking_url ?? ""} onChange={e => update("booking_url", e.target.value)} placeholder="Link included in recovery emails" />
              </div>
              <div className="settings-field">
                <label className="settings-label">Average Lead Value</label>
                <div className="settings-input-prefix">
                  <span className="settings-prefix">$</span>
                  <input type="number" className="settings-input" value={settings.avg_lead_value ?? 0} onChange={e => update("avg_lead_value", parseInt(e.target.value) || 0)} />
                </div>
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Business Hours</label>
              <input type="text" className="settings-input" value={settings.business_hours ?? ""} onChange={e => update("business_hours", e.target.value)} placeholder="Mon-Fri 9am-5pm, Sat 10am-2pm" />
              <span className="settings-hint">Used by Ai Voice Callback to know when to call leads</span>
            </div>
          </div>
        </div>

        {/* ── Branding ─────────────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="17" r="2"/><circle cx="6" cy="12" r="2.5"/><path d="M12 22s8-4 8-12c0-3.31-2.69-6-6-6"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Branding</h2>
              <p className="settings-section-desc">Customize how ReCapture represents your business</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-field">
              <label className="settings-label">Company Tagline</label>
              <input type="text" className="settings-input" value={settings.company_tagline ?? ""} onChange={e => update("company_tagline", e.target.value)} placeholder="Your trusted partner in dental care" />
              <span className="settings-hint">Used in recovery email footers and Ai voice introductions</span>
            </div>
            <div className="settings-field">
              <label className="settings-label">Brand Color</label>
              <ColorPicker value={settings.brand_color ?? "#ff6b35"} onChange={v => update("brand_color", v)} />
              <span className="settings-hint">Applied to recovery email buttons and accents</span>
            </div>
          </div>
        </div>

        {/* ── Recovery Emails ──────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Recovery Emails</h2>
              <p className="settings-section-desc">Automatically email leads who abandon your forms</p>
            </div>
            <Toggle on={settings.auto_email_enabled} onChange={v => update("auto_email_enabled", v)} />
          </div>
          {settings.auto_email_enabled && (
            <div className="settings-fields">
              <div className="settings-row">
                <div className="settings-field">
                  <label className="settings-label">Sender Name</label>
                  <input type="text" className="settings-input" value={settings.sender_name ?? ""} onChange={e => update("sender_name", e.target.value)} placeholder="Your Business Name" />
                  <span className="settings-hint">Shows as the &ldquo;from&rdquo; name in the recovery email</span>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Email Subject Prefix</label>
                  <input type="text" className="settings-input" value={settings.email_header ?? ""} onChange={e => update("email_header", e.target.value)} placeholder="Lead Recovery" />
                </div>
              </div>
              <div className="settings-row">
                <div className="settings-field">
                  <label className="settings-label">From Email</label>
                  <input type="email" className="settings-input" value={settings.from_email ?? ""} onChange={e => update("from_email", e.target.value)} placeholder="hello@yourbusiness.com" />
                  <span className="settings-hint">Custom sender email (requires domain verification)</span>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Reply-To Email</label>
                  <input type="email" className="settings-input" value={settings.reply_to_email ?? ""} onChange={e => update("reply_to_email", e.target.value)} placeholder="hello@yourbusiness.com" />
                  <span className="settings-hint">Where replies to recovery emails are sent</span>
                </div>
              </div>
              <div className="settings-field">
                <label className="settings-label">Send Delay</label>
                <select className="settings-select" value={settings.email_delay_minutes} onChange={e => update("email_delay_minutes", parseInt(e.target.value))}>
                  {DELAY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span className="settings-hint">How long after abandonment to send the recovery email</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">Custom Recovery Message</label>
                <textarea className="settings-textarea" value={settings.message_template ?? ""} onChange={e => update("message_template", e.target.value)} placeholder="Hi {name}, we noticed you were looking at our services..." rows={3} />
                <span className="settings-hint">Use &#123;name&#125; to insert the lead&apos;s name. Leave blank for default template.</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">Email Footer</label>
                <input type="text" className="settings-input" value={settings.email_footer ?? ""} onChange={e => update("email_footer", e.target.value)} placeholder="123 Main St, Dallas TX | (214) 555-1234" />
                <span className="settings-hint">Custom footer text at the bottom of recovery emails</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Alerts & Notifications ───────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Alerts & Notifications</h2>
              <p className="settings-section-desc">Get notified instantly when a lead abandons your form</p>
            </div>
          </div>
          <div className="settings-fields">
            {/* Email Alerts */}
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <div className="settings-toggle-label">Email Lead Alerts</div>
                <div className="settings-toggle-desc">Receive an email notification for every captured lead</div>
              </div>
              <Toggle on={settings.email_alert_enabled} onChange={v => update("email_alert_enabled", v)} />
            </div>
            {settings.email_alert_enabled && (
              <div className="settings-field settings-indent">
                <label className="settings-label">Notification Email</label>
                <input type="email" className="settings-input" value={settings.email_alert_address ?? ""} onChange={e => update("email_alert_address", e.target.value)} placeholder="alerts@yourbusiness.com" />
                <span className="settings-hint">Where lead alert emails are delivered</span>
              </div>
            )}

            {/* SMS */}
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <div className="settings-toggle-label">
                  SMS Alerts
                  <span className="settings-badge-pro">Pro</span>
                </div>
                <div className="settings-toggle-desc">Get a text message within 60 seconds of form abandonment</div>
              </div>
              <Toggle on={settings.sms_enabled} onChange={v => update("sms_enabled", v)} disabled={!isPro} />
            </div>
            {settings.sms_enabled && (
              <div className="settings-field settings-indent">
                <label className="settings-label">Phone Number</label>
                <input type="tel" className="settings-input" value={settings.sms_phone ?? ""} onChange={e => update("sms_phone", e.target.value)} placeholder="(214) 555-1234" />
              </div>
            )}

            {/* Slack */}
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <div className="settings-toggle-label">
                  Slack Alerts
                  <span className="settings-badge-pro">Pro</span>
                </div>
                <div className="settings-toggle-desc">Post lead details to your Slack channel instantly</div>
              </div>
              <Toggle on={!!settings.slack_webhook_url} onChange={v => { if (!v) update("slack_webhook_url", null) }} disabled={!isPro} />
            </div>
            {settings.slack_webhook_url !== null && (
              <div className="settings-field settings-indent">
                <label className="settings-label">Slack Webhook URL</label>
                <input type="url" className="settings-input" value={settings.slack_webhook_url ?? ""} onChange={e => update("slack_webhook_url", e.target.value)} placeholder="https://hooks.slack.com/services/..." />
              </div>
            )}

            {/* Quiet Hours */}
            <div className="settings-toggle-row" style={{ borderBottom: "none" }}>
              <div className="settings-toggle-info">
                <div className="settings-toggle-label">Quiet Hours</div>
                <div className="settings-toggle-desc">Pause SMS and Ai callbacks during off-hours (emails still send)</div>
              </div>
              <Toggle on={!!settings.quiet_hours_start} onChange={v => { if (v) { update("quiet_hours_start", "21:00"); update("quiet_hours_end", "08:00") } else { update("quiet_hours_start", null); update("quiet_hours_end", null) } }} />
            </div>
            {settings.quiet_hours_start && (
              <div className="settings-row settings-indent">
                <div className="settings-field">
                  <label className="settings-label">Quiet From</label>
                  <select className="settings-select" value={settings.quiet_hours_start ?? "21:00"} onChange={e => update("quiet_hours_start", e.target.value)}>
                    {HOUR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Quiet Until</label>
                  <select className="settings-select" value={settings.quiet_hours_end ?? "08:00"} onChange={e => update("quiet_hours_end", e.target.value)}>
                    {HOUR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            )}

            {!isPro && (
              <div className="settings-upgrade-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
                SMS, Slack, and Ai Voice Callback require the <a href="/pricing">Pro plan</a>
              </div>
            )}
          </div>
        </div>

        {/* ── Ai Voice Callback ────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Ai Voice Callback</h2>
              <p className="settings-section-desc">Our Ai calls abandoned leads back within 60 seconds on behalf of your business</p>
            </div>
            <Toggle on={settings.ai_callback_enabled} onChange={v => update("ai_callback_enabled", v)} disabled={!isPro} />
          </div>
          {settings.ai_callback_enabled && (
            <div className="settings-fields">
              <div className="settings-field">
                <label className="settings-label">Agent Name</label>
                <input type="text" className="settings-input" value={settings.ai_agent_name ?? "Sarah"} onChange={e => update("ai_agent_name", e.target.value)} placeholder="Sarah" />
                <span className="settings-hint">The name the Ai introduces herself as: &ldquo;Hi, this is {settings.ai_agent_name || "Sarah"} from {settings.company_name || "your business"}&rdquo;</span>
              </div>
              <div className="settings-field">
                <label className="settings-label">Your Services</label>
                <textarea className="settings-textarea" value={settings.ai_services_list ?? ""} onChange={e => update("ai_services_list", e.target.value)} placeholder="Botox, dermal fillers, laser hair removal, CoolSculpting, chemical peels, HydraFacials..." rows={3} />
                <span className="settings-hint">List your services so the Ai can answer questions about what you offer</span>
              </div>
              <div className="settings-row">
                <div className="settings-field">
                  <label className="settings-label">Call Hours Start</label>
                  <select className="settings-select" value={settings.ai_call_hours_start ?? "09:00"} onChange={e => update("ai_call_hours_start", e.target.value)}>
                    {HOUR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Call Hours End</label>
                  <select className="settings-select" value={settings.ai_call_hours_end ?? "18:00"} onChange={e => update("ai_call_hours_end", e.target.value)}>
                    {HOUR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
              <span className="settings-hint">Ai will only call leads during these hours. Outside these hours, leads are queued for the next available window.</span>
              {!isPro && (
                <div className="settings-upgrade-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"/></svg>
                  Ai Voice Callback requires the <a href="/pricing">Pro plan</a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Lead Preferences ─────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Lead Preferences</h2>
              <p className="settings-section-desc">Control which leads trigger alerts and how they are managed</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-field">
              <label className="settings-label">Minimum Lead Score for Alerts</label>
              <select className="settings-select" value={settings.min_lead_score} onChange={e => update("min_lead_score", parseInt(e.target.value))}>
                {SCORE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="settings-hint">Only trigger SMS, Slack, and Ai callbacks for leads above this score</span>
            </div>
            <div className="settings-toggle-row">
              <div className="settings-toggle-info">
                <div className="settings-toggle-label">Auto-Mark as Contacted</div>
                <div className="settings-toggle-desc">Automatically change lead status to &ldquo;Contacted&rdquo; after a recovery email is sent</div>
              </div>
              <Toggle on={settings.auto_mark_contacted} onChange={v => update("auto_mark_contacted", v)} />
            </div>
            <div className="settings-field">
              <label className="settings-label">Lead Notification Email</label>
              <input type="email" className="settings-input" value={settings.lead_notification_email ?? ""} onChange={e => update("lead_notification_email", e.target.value)} placeholder="manager@yourbusiness.com" />
              <span className="settings-hint">Daily lead summary sent to this address (separate from instant alerts)</span>
            </div>
          </div>
        </div>

        {/* ── Integrations ─────────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Integrations</h2>
              <p className="settings-section-desc">Connect ReCapture to your existing tools</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-field">
              <label className="settings-label">Outbound Webhook URL</label>
              <input type="url" className="settings-input" value={settings.webhook_url ?? ""} onChange={e => update("webhook_url", e.target.value)} placeholder="https://hooks.zapier.com/..." />
              <span className="settings-hint">Sends lead data to Zapier, Make, or any endpoint in real time</span>
            </div>
            <div className="settings-field">
              <label className="settings-label">API Key</label>
              <div className="settings-api-row">
                <code className="settings-api-key">{settings.api_key}</code>
                <CopyButton text={settings.api_key} />
              </div>
              <span className="settings-hint">Use this key in your tracking script to connect your website</span>
            </div>
          </div>
        </div>

        {/* ── Plan & Billing ───────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Plan & Billing</h2>
              <p className="settings-section-desc">Manage your subscription and billing details</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-plan-card">
              <div className="settings-plan-info">
                <div className="settings-plan-name">{(settings.plan ?? "essentials").charAt(0).toUpperCase() + (settings.plan ?? "essentials").slice(1)}</div>
                <div className="settings-plan-price">
                  {settings.plan === "enterprise" ? "Custom pricing" : settings.plan === "pro" ? "$397/mo" : "$197/mo"}
                </div>
                {settings.trial_ends_at && (
                  <div className="settings-plan-trial">
                    Trial ends {new Date(settings.trial_ends_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                )}
              </div>
              {settings.plan !== "pro" && settings.plan !== "enterprise" && (
                <a href="/pricing" className="settings-upgrade-btn">Upgrade to Pro</a>
              )}
            </div>
          </div>
        </div>

        {/* ── Tracking Script ──────────────────────────────────────────── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div>
              <h2 className="settings-section-title">Tracking Script</h2>
              <p className="settings-section-desc">Add this to your website to start capturing abandoned leads</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="settings-code-block">
              <div className="settings-code-header">
                <span>HTML</span>
                <CopyButton text={'<script src="https://userecapture.com/tracker.js" data-key="' + settings.api_key + '"></script>'} />
              </div>
              <pre className="settings-code">{'<script\n  src="https://userecapture.com/tracker.js"\n  data-key="' + settings.api_key + '"\n></script>'}</pre>
            </div>
            <span className="settings-hint">Paste this before the closing &lt;/body&gt; tag on every page with a form</span>
          </div>
        </div>

      </div>

      {/* Floating save bar */}
      <div className="settings-save-bar">
        <button className="settings-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
