'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const INSTANT_MERGE_TAGS = [
  { tag: '{name}', desc: 'Lead\u2019s name (or "Unnamed lead" if not given)' },
  { tag: '{email}', desc: 'Lead\u2019s email (only renders if valid)' },
  { tag: '{phone}', desc: 'Lead\u2019s phone (only renders if valid)' },
  { tag: '{fields_completed}', desc: 'How many fields the lead filled' },
  { tag: '{total_fields}', desc: 'Total fields in the form' },
  { tag: '{site_url}', desc: 'URL where the form was abandoned' },
]

const DEFAULT_INSTANT = 'ReCapture Lead Alert\n{name} just abandoned a form on your site.\nEmail: {email}\nPhone: {phone}\nReach out within 5 min for highest conversion.'

export default function InstantTemplateEditor() {
  const [clientId, setClientId] = useState<string | null>(null)
  const [body, setBody] = useState<string>('')
  const [original, setOriginal] = useState<string>('')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setError('Not signed in'); setLoading(false); return }
        let client: { id: string } | null = null
        const byId = await supabase.from('clients').select('id').eq('id', user.id).maybeSingle()
        client = byId.data
        if (!client && user.email) {
          const byEmail = await supabase.from('clients').select('id').eq('email', user.email).maybeSingle()
          client = byEmail.data
        }
        if (!client) { setError('No client record found for your account'); setLoading(false); return }
        setClientId(client.id)
        const { data: tpl } = await supabase
          .from('client_sms_templates')
          .select('body, updated_at')
          .eq('client_id', client.id)
          .eq('topic', 'instant')
          .maybeSingle()
        if (tpl) {
          setBody(tpl.body); setOriginal(tpl.body); setUpdatedAt(tpl.updated_at)
        } else {
          setBody(DEFAULT_INSTANT); setOriginal('')
        }
      } catch (err) {
        console.error('Load instant template failed:', err)
        setError('Failed to load instant template')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    if (!clientId) return
    setSaving(true); setError(null)
    try {
      const { error } = await supabase
        .from('client_sms_templates')
        .upsert(
          { client_id: clientId, topic: 'instant', body: body, updated_at: new Date().toISOString() },
          { onConflict: 'client_id,topic' }
        )
      if (error) throw error
      setOriginal(body); setUpdatedAt(new Date().toISOString())
      setSavedFlash(true); setTimeout(() => setSavedFlash(false), 2000)
    } catch (err) {
      console.error('Save instant failed:', err)
      setError('Failed to save instant template')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => setBody(original || DEFAULT_INSTANT)

  const renderPreview = (b: string) => b
    .replaceAll('{name}', 'Sarah Chen')
    .replaceAll('{email}', 'sarah@example.com')
    .replaceAll('{phone}', '(214) 555-0100')
    .replaceAll('{fields_completed}', '4')
    .replaceAll('{total_fields}', '6')
    .replaceAll('{site_url}', 'userecapture.com')

  const isDirty = body !== original

  if (loading) {
    return <div className="smst-loading">Loading instant alert template...</div>
  }

  return (
    <>
      <div className="smst-tags-card" style={{ borderColor: 'rgba(255,107,53,0.25)' }}>
        <div className="smst-tags-label" style={{ color: '#ff6b35' }}>Instant abandonment alert \u00b7 Merge tags</div>
        <div className="smst-tags-list">
          {INSTANT_MERGE_TAGS.map(t => (
            <div key={t.tag} className="smst-tag-row">
              <code className="smst-tag-code">{t.tag}</code>
              <span className="smst-tag-desc">{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
      {error && <div className="smst-error">{error}</div>}
      <div className="smst-template-card" style={{ borderColor: 'rgba(255,107,53,0.25)', boxShadow: '0 0 0 1px rgba(255,107,53,0.08), 0 8px 24px rgba(0,0,0,0.3)' }}>
        <div className="smst-template-header">
          <div>
            <div className="smst-template-name" style={{ color: '#ff6b35' }}>Instant Abandonment Alert</div>
            <div className="smst-template-desc">Sent to you the moment a lead abandons a form. Lines with empty merge tags are auto-dropped.</div>
          </div>
          <div className="smst-template-meta">
            {updatedAt ? 'Last updated ' + new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never saved \u00b7 using default'}
          </div>
        </div>
        <div className="smst-template-grid">
          <div className="smst-template-field">
            <div className="smst-field-label">Template</div>
            <textarea
              className="smst-textarea"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={8}
            />
            <div className="smst-char-count">
              {body.length} characters
              {body.length > 160 && <span className="smst-warn"> \u00b7 Will send as multi-part SMS</span>}
            </div>
          </div>
          <div className="smst-template-field">
            <div className="smst-field-label">Live preview</div>
            <div className="smst-preview" style={{ whiteSpace: 'pre-wrap' }}>
              {renderPreview(body)}
            </div>
            <div className="smst-preview-meta">Sample lead values shown</div>
          </div>
        </div>
        <div className="smst-template-actions">
          <button className="smst-btn smst-btn-primary" onClick={handleSave} disabled={!isDirty || saving}>
            {saving ? 'Saving...' : savedFlash ? 'Saved!' : 'Save'}
          </button>
          <button className="smst-btn smst-btn-secondary" onClick={handleReset} disabled={!isDirty}>
            Reset
          </button>
        </div>
      </div>
    </>
  )
}
