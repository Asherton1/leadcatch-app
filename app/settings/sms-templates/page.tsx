"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import "../../dashboard/dashboard.css"
import "../settings.css"
import "./sms-templates.css"
import Footer from '../../components/Footer'
import '../../landing.css'

interface ClientTemplate {
  topic: string
  body: string
  updated_at: string | null
}

interface GlobalTemplate {
  topic: string
  body: string
}

const PRO_TIERS = ['pro', 'enterprise_starter', 'enterprise_growth', 'enterprise_scale', 'enterprise_custom']

const TOPIC_INFO: Record<string, { label: string; description: string }> = {
  instant: { label: 'Instant Alert', description: 'SMS sent to your phone the moment a lead abandons a form on your site' },
  high_value: { label: 'High-Value Alert', description: 'SMS sent when a lead matches your high-value criteria (4+ fields completed or premium service mentioned)' },
  daily_digest: { label: 'Daily Digest', description: 'Summary SMS sent at end of day with all abandoned leads from that day' },
  weekend: { label: 'Weekend Alert', description: 'Different format for SMS sent on Saturday and Sunday' },
  general: { label: 'General Fallback', description: 'Default template used when no other alert type applies' },
}

const MERGE_TAGS = [
  { tag: '{name}', desc: 'Lead\u2019s name (or "Unnamed lead" if not captured)' },
  { tag: '{email}', desc: 'Lead\u2019s email address' },
  { tag: '{phone}', desc: 'Lead\u2019s phone number' },
  { tag: '{form_data}', desc: 'Other form fields the lead filled out' },
  { tag: '{fields_completed}', desc: 'Number of fields they completed (e.g. "3")' },
  { tag: '{total_fields}', desc: 'Total fields in the form (e.g. "5")' },
  { tag: '{site_url}', desc: 'URL of the page where they abandoned' },
]

const TOPIC_ORDER = ['instant', 'high_value', 'daily_digest', 'weekend', 'general']

export default function ClientSmsTemplatesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [clientId, setClientId] = useState<string | null>(null)
  const [clientPlan, setClientPlan] = useState<string | null>(null)
  const [companyName, setCompanyName] = useState<string>('')
  const [clientTemplates, setClientTemplates] = useState<ClientTemplate[]>([])
  const [globalTemplates, setGlobalTemplates] = useState<GlobalTemplate[]>([])
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTextarea, setActiveTextarea] = useState<string | null>(null)

  const isProPlus = clientPlan ? PRO_TIERS.includes(clientPlan) : false

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: client, error: clientErr } = await supabase
        .from('clients')
        .select('id, plan, company_name')
        .eq('user_id', user.id)
        .maybeSingle()

      if (clientErr || !client) {
        setError('Could not load your account. Try refreshing.')
        setAuthChecked(true)
        setLoading(false)
        return
      }

      setClientId(client.id)
      setClientPlan(client.plan)
      setCompanyName(client.company_name || '')

      const [{ data: clientRows }, { data: globalRows }] = await Promise.all([
        supabase.from('client_sms_templates').select('topic, body, updated_at').eq('client_id', client.id),
        supabase.from('sms_templates').select('topic, body').order('topic'),
      ])

      setClientTemplates((clientRows || []) as ClientTemplate[])
      setGlobalTemplates((globalRows || []) as GlobalTemplate[])
      setAuthChecked(true)
      setLoading(false)
    }
    init().catch(err => {
      console.error(err)
      setError('Something went wrong loading templates.')
      setAuthChecked(true)
      setLoading(false)
    })
  }, [router])

  const getCurrentBody = (topic: string): string => {
    if (edits[topic] !== undefined) return edits[topic]
    const own = clientTemplates.find(t => t.topic === topic)
    if (own) return own.body
    const fallback = globalTemplates.find(t => t.topic === topic)
    return fallback?.body || ''
  }

  const isCustomized = (topic: string): boolean => {
    return clientTemplates.some(t => t.topic === topic)
  }

  const handleEdit = (topic: string, value: string) => {
    if (!isProPlus) return
    setEdits(prev => ({ ...prev, [topic]: value }))
  }

  const handleSave = async (topic: string) => {
    if (!clientId || !isProPlus) return
    const newBody = edits[topic]
    if (newBody === undefined || newBody.trim() === '') return

    setSaving(topic)
    setError(null)

    try {
      const { error: upsertErr } = await supabase
        .from('client_sms_templates')
        .upsert(
          { client_id: clientId, topic, body: newBody, updated_at: new Date().toISOString() },
          { onConflict: 'client_id,topic' }
        )

      if (upsertErr) throw upsertErr

      const { data: refreshed } = await supabase
        .from('client_sms_templates')
        .select('topic, body, updated_at')
        .eq('client_id', clientId)

      setClientTemplates((refreshed || []) as ClientTemplate[])
      setEdits(prev => {
        const next = { ...prev }
        delete next[topic]
        return next
      })
      setSavedFlash(topic)
      setTimeout(() => setSavedFlash(null), 1800)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed'
      setError(msg)
    } finally {
      setSaving(null)
    }
  }

  const handleResetToDefault = async (topic: string) => {
    if (!clientId || !isProPlus) return
    if (!confirm('Reset this template to the ReCapture default? Your custom version will be deleted.')) return

    setSaving(topic)
    try {
      const { error: delErr } = await supabase
        .from('client_sms_templates')
        .delete()
        .eq('client_id', clientId)
        .eq('topic', topic)

      if (delErr) throw delErr

      setClientTemplates(prev => prev.filter(t => t.topic !== topic))
      setEdits(prev => {
        const next = { ...prev }
        delete next[topic]
        return next
      })
      setSavedFlash(topic)
      setTimeout(() => setSavedFlash(null), 1800)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Reset failed'
      setError(msg)
    } finally {
      setSaving(null)
    }
  }

  const insertMergeTag = (topic: string, tag: string) => {
    if (!isProPlus) return
    const current = getCurrentBody(topic)
    handleEdit(topic, current + tag)
  }

  if (loading || !authChecked) {
    return (
      <div className="settings-page" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <div className="sms-tpl-loading">Loading templates&hellip;</div>
      </div>
    )
  }

  return (
    <div className="settings-page" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <div className="sms-tpl-container">
        <div className="sms-tpl-header">
          <a href="/settings" className="sms-tpl-back">&larr; Back to Settings</a>
          <h1 className="sms-tpl-title">SMS Templates</h1>
          <p className="sms-tpl-subtitle">
            Customize the alert SMS that ReCapture sends to your phone when leads abandon your forms.
          </p>
        </div>

        {!isProPlus && (
          <div className="sms-tpl-locked">
            <div className="sms-tpl-locked-badge">PRO FEATURE</div>
            <h2 className="sms-tpl-locked-title">Custom SMS Templates is a Pro feature</h2>
            <p className="sms-tpl-locked-desc">
              You\u2019re currently on the {clientPlan === 'essentials' ? 'Essentials' : 'Free'} plan.
              Upgrade to Pro ($397/mo) to customize the alert messages you receive when leads abandon your forms.
              Until then, your leads get our proven default templates.
            </p>
            <a href="/pricing" className="sms-tpl-upgrade-cta">Upgrade to Pro &rarr;</a>
          </div>
        )}

        {error && <div className="sms-tpl-error">{error}</div>}

        <div className="sms-tpl-merge-bar">
          <div className="sms-tpl-merge-label">Available merge tags:</div>
          <div className="sms-tpl-merge-tags">
            {MERGE_TAGS.map(t => (
              <span key={t.tag} className="sms-tpl-merge-tag" title={t.desc}>{t.tag}</span>
            ))}
          </div>
        </div>

        <div className="sms-tpl-list">
          {TOPIC_ORDER.map(topic => {
            const info = TOPIC_INFO[topic]
            const body = getCurrentBody(topic)
            const customized = isCustomized(topic)
            const hasUnsaved = edits[topic] !== undefined
            const charCount = body.length

            return (
              <div key={topic} className="sms-tpl-card">
                <div className="sms-tpl-card-head">
                  <div>
                    <div className="sms-tpl-card-label">
                      {info.label}
                      {customized && <span className="sms-tpl-badge sms-tpl-badge-custom">Custom</span>}
                      {!customized && isProPlus && <span className="sms-tpl-badge sms-tpl-badge-default">Using default</span>}
                    </div>
                    <div className="sms-tpl-card-desc">{info.description}</div>
                  </div>
                  <div className="sms-tpl-charcount" style={{ color: charCount > 160 ? '#ff6b35' : '#666' }}>
                    {charCount} / 160
                  </div>
                </div>

                <textarea
                  className="sms-tpl-textarea"
                  value={body}
                  onChange={e => handleEdit(topic, e.target.value)}
                  onFocus={() => setActiveTextarea(topic)}
                  disabled={!isProPlus}
                  rows={4}
                  placeholder="Type your message here&hellip;"
                />

                {isProPlus && (
                  <div className="sms-tpl-card-actions">
                    <div className="sms-tpl-quick-tags">
                      {MERGE_TAGS.map(t => (
                        <button
                          key={t.tag}
                          type="button"
                          className="sms-tpl-quick-tag"
                          onClick={() => insertMergeTag(topic, t.tag)}
                          title={t.desc}
                        >
                          + {t.tag}
                        </button>
                      ))}
                    </div>
                    <div className="sms-tpl-buttons">
                      {customized && (
                        <button
                          type="button"
                          className="sms-tpl-btn sms-tpl-btn-secondary"
                          onClick={() => handleResetToDefault(topic)}
                          disabled={saving === topic}
                        >
                          Reset to default
                        </button>
                      )}
                      <button
                        type="button"
                        className="sms-tpl-btn sms-tpl-btn-primary"
                        onClick={() => handleSave(topic)}
                        disabled={!hasUnsaved || saving === topic}
                      >
                        {saving === topic ? 'Saving&hellip;' : (savedFlash === topic ? 'Saved!' : 'Save')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
