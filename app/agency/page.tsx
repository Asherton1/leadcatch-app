'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminNav from '../components/AdminNav'
import '../dashboard/dashboard.css'
import './agency.css'

interface Agency {
  id: string
  name: string
  logo_url: string | null
  brand_color: string | null
  white_label: boolean
}

interface ClientRow {
  id: string
  name: string | null
  company_name: string | null
  active: boolean
  avg_lead_value: number | null
}

interface LeadRow {
  client_id: string
  status: string | null
  estimated_value: number | null
  converted_value: number | null
  created_at: string
  meta_conversion_sent: boolean | null
  suppressed_at: string | null
  email: string | null
  phone: string | null
  id?: string
  name?: string | null
}

function money(n: number): string {
  return '$' + Math.round(n).toLocaleString()
}

export default function AgencyConsole() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [agency, setAgency] = useState<Agency | null>(null)
  const [clients, setClients] = useState<ClientRow[]>([])
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [notAgency, setNotAgency] = useState(false)
  const [attnOpen, setAttnOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      const { data: ag } = await supabase
        .from('agencies')
        .select('id, name, logo_url, brand_color, white_label')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!ag) { if (!cancelled) { setNotAgency(true); setLoading(false) } return }

      const { data: cl } = await supabase
        .from('clients')
        .select('id, name, company_name, active, avg_lead_value')
        .eq('agency_id', (ag as Agency).id)
        .order('company_name')

      const ids = ((cl ?? []) as ClientRow[]).map(c => c.id)
      let ld: LeadRow[] = []
      if (ids.length > 0) {
        const { data } = await supabase
          .from('leads')
          .select('id, client_id, name, status, estimated_value, converted_value, created_at, meta_conversion_sent, suppressed_at, email, phone')
          .in('client_id', ids)
        ld = (data ?? []) as LeadRow[]
      }

      if (!cancelled) {
        setAgency(ag as Agency)
        setClients((cl ?? []) as ClientRow[])
        setLeads(ld)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [router])

  const byClient = useMemo(() => {
    const m = new Map<string, LeadRow[]>()
    for (const l of leads) {
      const arr = m.get(l.client_id) ?? []
      arr.push(l)
      m.set(l.client_id, arr)
    }
    return m
  }, [leads])

  const totals = useMemo(() => {
    const captured = leads.length
    const signals = leads.filter(l => l.meta_conversion_sent).length
    const suppressed = leads.filter(l => l.suppressed_at).length
    const converted = leads.filter(l => l.status === 'converted')
    const recovered = converted.reduce((s, l) => s + (l.converted_value ?? l.estimated_value ?? 0), 0)
    const identity = new Map<string, number>()
    for (const l of leads) {
      const k = (l.email ?? l.phone ?? '').trim().toLowerCase()
      if (!k) continue
      identity.set(k, (identity.get(k) ?? 0) + 1)
    }
    const returning = [...identity.values()].filter(n => n > 1).length
    return { captured, signals, suppressed, recovered, returning }
  }, [leads])

  const waiting = useMemo(() => {
    const nameFor = new Map(clients.map(c => [c.id, c.company_name || c.name || 'Client']))
    const rows = leads
      .filter(l => {
        const untouched = !['contacted', 'converted', 'lost'].includes(l.status ?? '')
        const recent = Date.now() - new Date(l.created_at).getTime() < 48 * 3600 * 1000
        return untouched && recent && (l.email || l.phone)
      })
      .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
      .map(l => ({ ...l, clientName: nameFor.get(l.client_id) ?? 'Client' }))
    return {
      count: rows.length,
      value: rows.reduce((s, l) => s + (l.estimated_value ?? 0), 0),
      rows,
    }
  }, [leads, clients])

  function relTime(iso: string): string {
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return mins + 'm ago'
    const h = Math.floor(mins / 60)
    if (h < 24) return h + 'h ago'
    return Math.floor(h / 24) + 'd ago'
  }

  function clientStats(id: string) {
    const rows = byClient.get(id) ?? []
    const hotWaiting = rows.filter(l => {
      const untouched = !['contacted', 'converted', 'lost'].includes(l.status ?? '')
      const recent = Date.now() - new Date(l.created_at).getTime() < 48 * 3600 * 1000
      return untouched && recent
    }).length
    const converted = rows.filter(l => l.status === 'converted')

    const identity = new Map<string, number>()
    for (const l of rows) {
      const k = (l.email ?? l.phone ?? '').trim().toLowerCase()
      if (!k) continue
      identity.set(k, (identity.get(k) ?? 0) + 1)
    }
    const returning = [...identity.values()].filter(n => n > 1).length

    const latest = rows.length > 0
      ? rows.reduce((a, b) => new Date(a.created_at) > new Date(b.created_at) ? a : b).created_at
      : null

    return {
      captured: rows.length,
      signals: rows.filter(l => l.meta_conversion_sent).length,
      recovered: converted.reduce((s, l) => s + (l.converted_value ?? l.estimated_value ?? 0), 0),
      convertedCount: converted.length,
      returning,
      latest,
      hotWaiting,
    }
  }

  function ago(iso: string | null): string {
    if (!iso) return 'no captures yet'
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return mins + 'm ago'
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return hrs + 'h ago'
    const days = Math.floor(hrs / 24)
    return days + (days === 1 ? ' day ago' : ' days ago')
  }

  if (loading) {
    return <div className="ag-wrap"><AdminNav /><div className="ag-loading">Loading console…</div></div>
  }

  if (notAgency) {
    return (
      <div className="ag-wrap">
        <AdminNav />
        <div className="ag-empty">
          <h1>Agency console</h1>
          <p>This account is not set up as an agency. If you manage ReCapture for multiple clients and want a single console across your book, get in touch and we will switch it on.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ag-wrap">
      <AdminNav />

      <header className="ag-header">
        <div>
          <p className="ag-eyebrow">Agency Console</p>
          <h1 className="ag-title">{agency?.name}</h1>
          <p className="ag-sub">
            {clients.length} client{clients.length === 1 ? '' : 's'} under management
          </p>
        </div>
      </header>

      {waiting.count > 0 && (
        <div className="ag-attn-outer">
        <div className={'attn-wrap' + (attnOpen ? ' open' : '')}>
          <button className="attn-strip" type="button" onClick={() => setAttnOpen(o => !o)}>
            <span className="attn-pulse" />
            <span className="attn-text">
              <b>{waiting.count} inquir{waiting.count === 1 ? 'y' : 'ies'}</b>
              {' across your book from the last 48 hours '}
              {waiting.count === 1 ? 'has' : 'have'} not been contacted
              <span className="attn-value">{money(waiting.value)} in pipeline</span>
            </span>
            <span className="attn-cta">
              {attnOpen ? 'Hide' : 'Review'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: attnOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>

          {attnOpen && (
            <div className="attn-body">
              {waiting.rows.map(l => (
                <button
                  key={l.id ?? l.created_at}
                  className="attn-row"
                  type="button"
                  onClick={() => router.push(`/dashboard?client=${l.client_id}`)}
                >
                  <span className="attn-row-main">
                    <span className="attn-row-name">{l.name || 'Unknown'}</span>
                    <span className="attn-row-contact">{l.email || l.phone}</span>
                  </span>
                  <span className="attn-row-meta">
                    <span className="ag-attn-client">{l.clientName}</span>
                    <span className="attn-row-time">{relTime(l.created_at)}</span>
                    <span className="attn-row-value">{money(l.estimated_value ?? 0)}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="attn-row-arrow">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              ))}
              <div className="attn-foot">
                Oldest waiting {waiting.rows.length > 0 ? relTime(waiting.rows[0].created_at) : ''} &middot; opens that client&apos;s dashboard
              </div>
            </div>
          )}
        </div>
        </div>
      )}

      <section className="ag-totals">
        <div className="ag-total">
          <div className="ag-total-value">{totals.captured.toLocaleString()}</div>
          <div className="ag-total-label">Inquiries captured</div>
        </div>
        <div className="ag-total">
          <div className="ag-total-value">{totals.signals.toLocaleString()}</div>
          <div className="ag-total-label">Signals sent to ad platforms</div>
        </div>
        <div className="ag-total">
          <div className="ag-total-value">{totals.returning.toLocaleString()}</div>
          <div className="ag-total-label">Returning prospects</div>
        </div>
        <div className="ag-total">
          <div className="ag-total-value">{money(totals.recovered)}</div>
          <div className="ag-total-label">Recovered value</div>
        </div>
      </section>

      <section className="ag-clients">
        {clients.length === 0 && (
          <div className="ag-none">No clients attached to this agency yet.</div>
        )}

        {clients.map(c => {
          const st = clientStats(c.id)
          return (
            <button
              key={c.id}
              className={'ag-card' + (st.hotWaiting > 0 ? ' ag-card-has-waiting' : '')}
              type="button"
              onClick={() => router.push(`/dashboard?client=${c.id}`)}
            >
              <div className="ag-card-top">
                <div className="ag-card-name">
                  <span className={'ag-dot' + (c.active ? ' on' : '')} />
                  {c.company_name || c.name || 'Unnamed client'}
                </div>
                <span className="ag-card-open">
                  Open
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </div>

              <div className="ag-card-metrics">
                <div className="ag-metric">
                  <span className="ag-metric-value">{st.captured}</span>
                  <span className="ag-metric-label">captured</span>
                </div>
                <div className="ag-metric">
                  <span className="ag-metric-value">{st.signals}</span>
                  <span className="ag-metric-label">signals sent</span>
                </div>
                <div className="ag-metric">
                  <span className="ag-metric-value">{st.returning}</span>
                  <span className="ag-metric-label">returning</span>
                </div>
                <div className="ag-metric">
                  <span className="ag-metric-value">{money(st.recovered)}</span>
                  <span className="ag-metric-label">
                    recovered{st.convertedCount > 0 ? ` · ${st.convertedCount} closed` : ''}
                  </span>
                </div>
              </div>

              <div className="ag-card-foot">
                <span className="ag-card-last">Last capture {ago(st.latest)}</span>
                {st.hotWaiting > 0 && (
                  <span className="ag-card-alert">
                    {st.hotWaiting} inquir{st.hotWaiting === 1 ? 'y' : 'ies'} waiting on contact
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </section>

      <p className="ag-foot">
        Waiting shows inquiries captured in the last 48 hours that nobody has contacted yet.
        Open a client to work their queue.
      </p>
    </div>
  )
}
