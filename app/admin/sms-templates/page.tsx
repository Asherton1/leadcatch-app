'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useIsAdmin } from '@/lib/use-is-admin'
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer'
import InstantTemplateEditor from '../../components/InstantTemplateEditor'
import '../../landing.css'
import './sms-templates.css'

interface Template {
  topic: string
  body: string
  updated_at: string
}

const TOPIC_INFO: Record<string, { label: string; description: string }> = {
  pricing: { label: 'Pricing', description: 'Sent when caller asks for pricing details' },
  trial: { label: 'Trial', description: 'Sent when caller wants to start a free trial' },
  enterprise: { label: 'Enterprise', description: 'Sent when caller asks about multi-location/enterprise' },
  form_audit: { label: 'Form Audit', description: 'Sent when caller wants the free form audit' },
  general: { label: 'General', description: 'Default — anything else / general info' },
}

const MERGE_TAGS = [
  { tag: '{name}', desc: "Caller\u2019s first name (or \"there\" if not given)" },
  { tag: '{topic}', desc: 'Topic label (e.g. "pricing", "trial info")' },
  { tag: '{shortlink}', desc: 'Generated short URL (always populated)' },
  { tag: '{phone}', desc: "Caller\u2019s phone number (E.164 format)" },
  { tag: '{caller_phone}', desc: 'Phone they called from (often same as {phone})' },
]

export default function SmsTemplatesAdminPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState<string | null>(null)
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const { loading: authLoading, isAdmin } = useIsAdmin()

  useEffect(() => {
    if (!isAdmin) return
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('sms_templates')
          .select('topic, body, updated_at')
          .order('topic')
        if (error) throw error
        setTemplates(data || [])
        const initial: Record<string, string> = {}
        ;(data || []).forEach(t => { initial[t.topic] = t.body })
        setEdits(initial)
      } catch (err) {
        console.error('Load failed:', err)
        setError('Failed to load templates')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isAdmin])

  const handleSave = async (topic: string) => {
    setSaving(topic)
    setError(null)
    try {
      const { error } = await supabase
        .from('sms_templates')
        .update({ body: edits[topic], updated_at: new Date().toISOString() })
        .eq('topic', topic)
      if (error) throw error
      setTemplates(prev => prev.map(t =>
        t.topic === topic
          ? { ...t, body: edits[topic], updated_at: new Date().toISOString() }
          : t
      ))
      setSavedFlash(topic)
      setTimeout(() => setSavedFlash(null), 2000)
    } catch (err) {
      console.error('Save failed:', err)
      setError(`Failed to save ${topic}`)
    } finally {
      setSaving(null)
    }
  }

  const handleReset = (topic: string) => {
    const original = templates.find(t => t.topic === topic)
    if (original) setEdits(prev => ({ ...prev, [topic]: original.body }))
  }

  const isDirty = (topic: string) => {
    const original = templates.find(t => t.topic === topic)
    return original && edits[topic] !== original.body
  }

  const renderPreview = (body: string) => {
    return body
      .replaceAll('{name}', 'Sarah')
      .replaceAll('{topic}', 'pricing')
      .replaceAll('{shortlink}', 'userecapture.com/s/abc12345')
      .replaceAll('{phone}', '+12145551234')
      .replaceAll('{caller_phone}', '+12145551234')
  }

  if (authLoading) {
    return (
      <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <AdminNav />
        <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#888' }}>Checking access...</div>
        <Footer />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <AdminNav />
        <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Access denied</h1>
          <p style={{ color: '#888' }}>This page is restricted to admin only.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="landing" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <AdminNav />
      <section className="smst-hero">
        <div className="smst-hero-inner">
          <p className="smst-eyebrow">Admin · SMS Templates</p>
          <h1 className="smst-headline">
            <span className="smst-headline-primary">Manage your SMS templates.</span>{' '}
            <span className="smst-headline-muted">Abandonment alerts and Marissa\u2019s voice replies. Changes apply immediately.</span>
          </h1>
        </div>
      </section>
      <section className="smst-section">
        <div className="smst-inner">
          <InstantTemplateEditor />
          <div style={{ borderTop: '1px solid #1a1a1a', margin: '3.5rem 0 2rem', paddingTop: '2rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Marissa \u00b7 Voice Assistant Replies</div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>Outbound SMS sent during or after AI voice callbacks</div>
          </div>
          <div className="smst-tags-card">
            <div className="smst-tags-label">Available merge tags</div>
            <div className="smst-tags-list">
              {MERGE_TAGS.map(t => (
                <div key={t.tag} className="smst-tag-row">
                  <code className="smst-tag-code">{t.tag}</code>
                  <span className="smst-tag-desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="smst-error">{error}</div>}
          {loading ? (
            <div className="smst-loading">Loading templates...</div>
          ) : (
            <div className="smst-templates">
              {Object.keys(TOPIC_INFO).map(topic => {
                const t = templates.find(x => x.topic === topic)
                if (!t) return null
                return (
                  <div key={topic} className="smst-template-card">
                    <div className="smst-template-header">
                      <div>
                        <div className="smst-template-name">{TOPIC_INFO[topic].label}</div>
                        <div className="smst-template-desc">{TOPIC_INFO[topic].description}</div>
                      </div>
                      <div className="smst-template-meta">
                        Last updated {new Date(t.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="smst-template-grid">
                      <div className="smst-template-field">
                        <div className="smst-field-label">Template</div>
                        <textarea
                          className="smst-textarea"
                          value={edits[topic] || ''}
                          onChange={e => setEdits(prev => ({ ...prev, [topic]: e.target.value }))}
                          rows={6}
                        />
                        <div className="smst-char-count">
                          {(edits[topic] || '').length} characters
                          {(edits[topic] || '').length > 160 && <span className="smst-warn"> · Will send as multi-part SMS</span>}
                        </div>
                      </div>
                      <div className="smst-template-field">
                        <div className="smst-field-label">Live preview</div>
                        <div className="smst-preview">
                          {renderPreview(edits[topic] || '')}
                        </div>
                        <div className="smst-preview-meta">As it would appear with sample values</div>
                      </div>
                    </div>
                    <div className="smst-template-actions">
                      <button
                        className="smst-btn smst-btn-primary"
                        onClick={() => handleSave(topic)}
                        disabled={!isDirty(topic) || saving === topic}
                      >
                        {saving === topic ? 'Saving...' : savedFlash === topic ? 'Saved!' : 'Save'}
                      </button>
                      <button
                        className="smst-btn smst-btn-secondary"
                        onClick={() => handleReset(topic)}
                        disabled={!isDirty(topic)}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
