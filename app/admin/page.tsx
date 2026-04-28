'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Footer from '../components/Footer'
import '../landing.css'

interface DemoRequest { id: string; name: string; email: string; phone: string; service: string; message: string; created_at: string }
interface Client { id: string; name: string | null; email: string | null; first_name: string | null; last_name: string | null; company_name: string | null; api_key: string; active: boolean; trial_ends_at: string | null; stripe_customer_id: string | null; created_at: string }
type Tab = 'demos' | 'signups' | 'activity'

function formatDate(d: string) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
function timeAgo(d: string) { const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000); if (mins < 60) return `${mins}m ago`; const hrs = Math.floor(mins / 60); if (hrs < 24) return `${hrs}h ago`; return `${Math.floor(hrs / 24)}d ago` }
function daysUntil(d: string | null) { if (!d) return null; return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) }

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: 4, color: copied ? '#10b981' : '#555', fontSize: '0.6rem', padding: '2px 6px', cursor: 'pointer', fontFamily: 'inherit', marginLeft: '0.5rem' }}>{copied ? 'Copied' : 'Copy'}</button>
}

function DetailRow({ label, value, copy, mono }: { label: string; value: string; copy?: boolean; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1a1a1a' }}>
      <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: mono ? '0.7rem' : '0.8rem', color: '#fff', fontFamily: mono ? 'monospace' : 'inherit', display: 'flex', alignItems: 'center', wordBreak: 'break-all', textAlign: 'right', maxWidth: '60%' }}>{value || '—'}{copy && value && <CopyBtn text={value} />}</span>
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [demos, setDemos] = useState<DemoRequest[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [tab, setTab] = useState<Tab>('demos')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/'); return }
      // Check is_admin flag in clients table
      const { data: meRow } = await supabase
        .from('clients')
        .select('is_admin')
        .eq('user_id', session.user.id)
        .single()
      if (!meRow?.is_admin) { router.replace('/'); return }
      setAuthorized(true)
      const { data: demoData } = await supabase.from('demo_requests').select('*').order('created_at', { ascending: false })
      const { data: clientData } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
      setDemos(demoData ?? [])
      setClients(clientData ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  const compedEmails = ['david.mann@esdhealth.net', 'richardhughes@clearph.com', 'asherton.c@me.com']
  const activeClients = clients.filter(c => c.active)
  const payingClients = activeClients.filter(c => !compedEmails.includes(c.email?.toLowerCase() || ''))
  const mrr = payingClients.length * 200
  const trialsExpiring = clients.filter(c => { const d = daysUntil(c.trial_ends_at); return d !== null && d >= 0 && d <= 3 })
  const convRate = demos.length > 0 ? Math.round((clients.length / demos.length) * 100) : 0

  const fDemos = demos.filter(d => !search || d.name?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase()))
  const fClients = clients.filter(c => !search || c.email?.toLowerCase().includes(search.toLowerCase()) || c.company_name?.toLowerCase().includes(search.toLowerCase()) || c.first_name?.toLowerCase().includes(search.toLowerCase()))
  const activity = [...demos.map(d => ({ type: 'demo' as const, date: d.created_at, data: d })), ...clients.map(c => ({ type: 'signup' as const, date: c.created_at, data: c }))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const fActivity = activity.filter(a => { if (!search) return true; if (a.type === 'demo') { const d = a.data as DemoRequest; return d.name?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase()) } const c = a.data as Client; return c.email?.toLowerCase().includes(search.toLowerCase()) || c.company_name?.toLowerCase().includes(search.toLowerCase()) })

  function toggle(id: string) { setExpandedId(expandedId === id ? null : id) }

  if (!authorized) return null

  const sty = { stat: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.25rem' } }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="admin-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 50, flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image src="/logo.png" alt="ReCapture" width={120} height={31} style={{ height: '24px', width: 'auto' }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#ff6b35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 4, padding: '2px 6px' }}>ADMIN</span>
        </div>
        <div className="admin-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="https://userecapture.com" target="_blank" style={{ fontSize: '0.7rem', color: '#555', textDecoration: 'none', padding: '0.35rem 0.6rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>Site</a>
          <a href="https://resend.com" target="_blank" style={{ fontSize: '0.7rem', color: '#555', textDecoration: 'none', padding: '0.35rem 0.6rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>Resend</a>
          <a href="https://dashboard.stripe.com" target="_blank" style={{ fontSize: '0.7rem', color: '#555', textDecoration: 'none', padding: '0.35rem 0.6rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>Stripe</a>
          <button style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 6, color: '#666', fontSize: '0.7rem', padding: '0.35rem 0.6rem', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => supabase.auth.signOut().then(() => router.push('/'))}>Sign Out</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats */}
        <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{demos.length}</div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Demo Requests</div></div>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{clients.length}</div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Signups</div></div>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ff6b35' }}>{activeClients.length}</div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Active</div></div>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#22c55e' }}>${mrr}<span style={{ fontSize: '0.7rem', color: '#555' }}>/mo</span></div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>MRR</div></div>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: trialsExpiring.length > 0 ? '#f59e0b' : '#333' }}>{trialsExpiring.length}</div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Trials Exp.</div></div>
          <div style={sty.stat}><div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{convRate}%</div><div style={{ fontSize: '0.65rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Conversion</div></div>
        </div>

        {/* Tabs + Search */}
        <div className="admin-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {([['demos', `Demos (${demos.length})`], ['signups', `Signups (${clients.length})`], ['activity', 'Activity']] as [Tab, string][]).map(([t, l]) => (
              <button key={t} style={{ padding: '0.45rem 0.9rem', background: tab === t ? '#1a1a1a' : 'transparent', border: tab === t ? '1px solid #333' : '1px solid #1e1e1e', borderRadius: 8, color: tab === t ? '#fff' : '#555', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }} onClick={() => { setTab(t); setExpandedId(null) }}>{l}</button>
            ))}
          </div>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '0.45rem 0.9rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.75rem', color: '#fff', outline: 'none', fontFamily: 'inherit', width: '220px', boxSizing: 'border-box' }} />
        </div>

        {/* List */}
        {loading ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

            {tab === 'demos' && (fDemos.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No demo requests found.</p> : fDemos.map(d => (
              <div key={d.id}>
                <div onClick={() => toggle(d.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: expandedId === d.id ? '#1a1a1a' : '#111', border: expandedId === d.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: expandedId === d.id ? '10px 10px 0 0' : 10, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{d.name || '—'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#555' }}>{d.email} · {d.service || '—'}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#444' }}>{timeAgo(d.created_at)}</span>
                    <span style={{ color: '#ff6b35', fontSize: '1rem', transition: 'transform 0.2s', transform: expandedId === d.id ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </div>
                </div>
                {expandedId === d.id && (
                  <div style={{ background: '#141414', border: '1px solid #ff6b35', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '1.25rem', animation: 'fadeDown 0.2s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <DetailRow label="Name" value={d.name} />
                      <DetailRow label="Email" value={d.email} copy />
                      <DetailRow label="Phone" value={d.phone} copy />
                      <DetailRow label="Business Type" value={d.service} />
                      <DetailRow label="Message" value={d.message || 'None'} />
                      <DetailRow label="Submitted" value={formatDate(d.created_at)} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <a href={`mailto:${d.email}`} style={{ flex: 1, padding: '0.6rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Reply via Email</a>
                      {d.phone && <a href={`tel:${d.phone}`} style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Call</a>}
                    </div>
                  </div>
                )}
              </div>
            )))}

            {tab === 'signups' && (fClients.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No signups found.</p> : fClients.map(c => {
              const trialDays = daysUntil(c.trial_ends_at)
              const expiring = trialDays !== null && trialDays >= 0 && trialDays <= 3
              const clientName = [c.first_name, c.last_name].filter(Boolean).join(' ') || c.name || c.email || '—'
              return (
                <div key={c.id}>
                  <div onClick={() => toggle(c.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: expandedId === c.id ? '#1a1a1a' : '#111', border: expandedId === c.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: expandedId === c.id ? '10px 10px 0 0' : 10, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {clientName}
                        <span style={{ fontSize: '0.55rem', fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: c.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: c.active ? '#22c55e' : '#666' }}>{c.active ? 'Active' : 'Inactive'}</span>
                        {expiring && <span style={{ fontSize: '0.55rem', fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Trial {trialDays}d</span>}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#555' }}>{c.company_name || 'No company'}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.65rem', color: '#444' }}>{timeAgo(c.created_at)}</span>
                      <span style={{ color: '#ff6b35', fontSize: '1rem', transition: 'transform 0.2s', transform: expandedId === c.id ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                    </div>
                  </div>
                  {expandedId === c.id && (
                    <div style={{ background: '#141414', border: '1px solid #ff6b35', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '1.25rem', animation: 'fadeDown 0.2s ease' }}>
                      <div className="admin-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <DetailRow label="Name" value={clientName} />
                        <DetailRow label="Email" value={c.email || '—'} copy />
                        <DetailRow label="Company" value={c.company_name || '—'} />
                        <DetailRow label="Status" value={c.active ? 'Active' : 'Inactive'} />
                        <DetailRow label="Trial Ends" value={c.trial_ends_at ? formatDate(c.trial_ends_at) : '—'} />
                        <DetailRow label="Stripe ID" value={c.stripe_customer_id || '—'} copy mono />
                        <DetailRow label="API Key" value={c.api_key} copy mono />
                        <DetailRow label="Signed Up" value={formatDate(c.created_at)} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <a href={`mailto:${c.email}`} style={{ flex: 1, padding: '0.6rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Email Client</a>
                        {c.stripe_customer_id && <a href={`https://dashboard.stripe.com/customers/${c.stripe_customer_id}`} target="_blank" style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Stripe</a>}
                      </div>
                    </div>
                  )}
                </div>
              )
            }))}

            {tab === 'activity' && (fActivity.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No activity found.</p> : fActivity.map((a, i) => {
              const id = a.type === 'demo' ? `d-${(a.data as DemoRequest).id}` : `c-${(a.data as Client).id}`
              if (a.type === 'demo') {
                const d = a.data as DemoRequest
                return (
                  <div key={id}>
                    <div onClick={() => toggle(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: expandedId === id ? '#1a1a1a' : '#111', border: expandedId === id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: expandedId === id ? '10px 10px 0 0' : 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.55rem', fontWeight: 700, padding: '3px 6px', borderRadius: 4, background: 'rgba(255,107,53,0.1)', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>Demo</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{d.name || '—'}</div>
                        <div style={{ fontSize: '0.65rem', color: '#555' }}>{d.email}</div>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#444' }}>{timeAgo(d.created_at)}</span>
                      <span style={{ color: '#ff6b35', fontSize: '1rem', transition: 'transform 0.2s', transform: expandedId === id ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                    </div>
                    {expandedId === id && (
                      <div style={{ background: '#141414', border: '1px solid #ff6b35', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '1.25rem', animation: 'fadeDown 0.2s ease' }}>
                        <div className="admin-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          <DetailRow label="Name" value={d.name} />
                          <DetailRow label="Email" value={d.email} copy />
                          <DetailRow label="Phone" value={d.phone} copy />
                          <DetailRow label="Service" value={d.service} />
                          <DetailRow label="Message" value={d.message || 'None'} />
                          <DetailRow label="Date" value={formatDate(d.created_at)} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                          <a href={`mailto:${d.email}`} style={{ flex: 1, padding: '0.6rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Reply</a>
                          {d.phone && <a href={`tel:${d.phone}`} style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Call</a>}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              const c = a.data as Client
              const cn = [c.first_name, c.last_name].filter(Boolean).join(' ') || c.name || c.email || '—'
              return (
                <div key={id}>
                  <div onClick={() => toggle(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: expandedId === id ? '#1a1a1a' : '#111', border: expandedId === id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: expandedId === id ? '10px 10px 0 0' : 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, padding: '3px 6px', borderRadius: 4, background: 'rgba(34,197,94,0.1)', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>Signup</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{cn} <span style={{ fontSize: '0.5rem', fontWeight: 700, padding: '2px 5px', borderRadius: 999, background: c.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: c.active ? '#22c55e' : '#666' }}>{c.active ? 'Active' : 'Inactive'}</span></div>
                      <div style={{ fontSize: '0.65rem', color: '#555' }}>{c.email}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#444' }}>{timeAgo(c.created_at)}</span>
                    <span style={{ color: '#ff6b35', fontSize: '1rem', transition: 'transform 0.2s', transform: expandedId === id ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </div>
                  {expandedId === id && (
                    <div style={{ background: '#141414', border: '1px solid #ff6b35', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '1.25rem', animation: 'fadeDown 0.2s ease' }}>
                      <div className="admin-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <DetailRow label="Name" value={cn} />
                        <DetailRow label="Email" value={c.email || '—'} copy />
                        <DetailRow label="Company" value={c.company_name || '—'} />
                        <DetailRow label="API Key" value={c.api_key} copy mono />
                        <DetailRow label="Trial Ends" value={c.trial_ends_at ? formatDate(c.trial_ends_at) : '—'} />
                        <DetailRow label="Stripe" value={c.stripe_customer_id || '—'} copy mono />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <a href={`mailto:${c.email}`} style={{ flex: 1, padding: '0.6rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Email</a>
                        {c.stripe_customer_id && <a href={`https://dashboard.stripe.com/customers/${c.stripe_customer_id}`} target="_blank" style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.75rem', textAlign: 'center' }}>Stripe</a>}
                      </div>
                    </div>
                  )}
                </div>
              )
            }))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 500px; } }
        @media (max-width: 768px) {
          .admin-stats { grid-template-columns: repeat(3, 1fr) !important; }
          .admin-controls { flex-direction: column !important; }
          .admin-detail-grid { grid-template-columns: 1fr !important; }
          .admin-actions { flex-wrap: wrap; }
        }
      `}</style>
      <Footer />
    </div>
  )
}
