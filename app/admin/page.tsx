'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface DemoRequest {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  created_at: string
}

interface Client {
  id: string
  name: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  company_name: string | null
  api_key: string
  active: boolean
  trial_ends_at: string | null
  stripe_customer_id: string | null
  created_at: string
}

type Tab = 'demos' | 'signups' | 'activity'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function timeAgo(d: string) {
  const now = Date.now()
  const then = new Date(d).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function daysUntil(d: string | null) {
  if (!d) return null
  const now = Date.now()
  const target = new Date(d).getTime()
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: 4, color: copied ? '#10b981' : '#555', fontSize: '0.65rem', padding: '2px 6px', cursor: 'pointer', fontFamily: 'inherit', marginLeft: '0.5rem' }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
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
  const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session || session.user.email !== 'asherton.c@me.com') {
        router.replace('/')
        return
      }
      setAuthorized(true)
      const { data: demoData } = await supabase.from('demo_requests').select('*').order('created_at', { ascending: false })
      const { data: clientData } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
      setDemos(demoData ?? [])
      setClients(clientData ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  function closePanel() { setSelectedDemo(null); setSelectedClient(null) }
  const panelOpen = selectedDemo !== null || selectedClient !== null

  const activeClients = clients.filter(c => c.active)
  const trialsExpiringSoon = clients.filter(c => {
    const d = daysUntil(c.trial_ends_at)
    return d !== null && d >= 0 && d <= 3
  })
  const conversionRate = demos.length > 0 ? Math.round((clients.length / demos.length) * 100) : 0
  const mrr = activeClients.length * 200

  const filteredDemos = demos.filter(d =>
    !search || (d.name?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase()))
  )
  const filteredClients = clients.filter(c =>
    !search || (
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.last_name?.toLowerCase().includes(search.toLowerCase())
    )
  )

  const activity = [
    ...demos.map(d => ({ type: 'demo' as const, date: d.created_at, data: d })),
    ...clients.map(c => ({ type: 'signup' as const, date: c.created_at, data: c })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredActivity = activity.filter(a => {
    if (!search) return true
    if (a.type === 'demo') {
      const d = a.data as DemoRequest
      return d.name?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase())
    }
    const c = a.data as Client
    return c.email?.toLowerCase().includes(search.toLowerCase()) || c.company_name?.toLowerCase().includes(search.toLowerCase())
  })

  if (!authorized) return null

  const statStyle = { background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '1.25rem' }
  const statNum = (color: string) => ({ fontSize: '1.75rem', fontWeight: 700 as const, color, marginBottom: '0.25rem' })
  const statLabel = { fontSize: '0.7rem', color: '#555', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600 as const }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' as const }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image src="/logo.png" alt="ReCapture" width={120} height={31} style={{ height: '24px', width: 'auto' }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#ff6b35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 4, padding: '2px 6px' }}>ADMIN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="https://userecapture.com" target="_blank" style={{ fontSize: '0.75rem', color: '#555', textDecoration: 'none', padding: '0.4rem 0.75rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>View Site</a>
          <a href="https://resend.com" target="_blank" style={{ fontSize: '0.75rem', color: '#555', textDecoration: 'none', padding: '0.4rem 0.75rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>Resend</a>
          <a href="https://dashboard.stripe.com" target="_blank" style={{ fontSize: '0.75rem', color: '#555', textDecoration: 'none', padding: '0.4rem 0.75rem', border: '1px solid #2a2a2a', borderRadius: 6 }}>Stripe</a>
          <button style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 6, color: '#666', fontSize: '0.75rem', padding: '0.4rem 0.75rem', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => supabase.auth.signOut().then(() => router.push('/'))}>Sign Out</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 2rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={statStyle}>
            <div style={statNum('#fff')}>{demos.length}</div>
            <div style={statLabel}>Demo Requests</div>
          </div>
          <div style={statStyle}>
            <div style={statNum('#fff')}>{clients.length}</div>
            <div style={statLabel}>Total Signups</div>
          </div>
          <div style={statStyle}>
            <div style={statNum('#ff6b35')}>{activeClients.length}</div>
            <div style={statLabel}>Active Clients</div>
          </div>
          <div style={statStyle}>
            <div style={statNum('#22c55e')}>${mrr}<span style={{ fontSize: '0.75rem', color: '#555' }}>/mo</span></div>
            <div style={statLabel}>MRR</div>
          </div>
          <div style={statStyle}>
            <div style={statNum(trialsExpiringSoon.length > 0 ? '#f59e0b' : '#333')}>{trialsExpiringSoon.length}</div>
            <div style={statLabel}>Trials Expiring</div>
          </div>
          <div style={statStyle}>
            <div style={statNum('#fff')}>{conversionRate}%</div>
            <div style={statLabel}>Demo → Signup</div>
          </div>
        </div>

        {/* Search + Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {([['demos', `Demos (${demos.length})`], ['signups', `Signups (${clients.length})`], ['activity', 'All Activity']] as [Tab, string][]).map(([t, label]) => (
              <button key={t} style={{ padding: '0.5rem 1rem', background: tab === t ? '#1a1a1a' : 'transparent', border: tab === t ? '1px solid #333' : '1px solid #1e1e1e', borderRadius: 8, color: tab === t ? '#fff' : '#555', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }} onClick={() => setTab(t)}>
                {label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.5rem 1rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, fontSize: '0.8rem', color: '#fff', outline: 'none', fontFamily: 'inherit', width: '260px', boxSizing: 'border-box' }}
          />
        </div>

        {/* List */}
        {loading ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

            {tab === 'demos' && (filteredDemos.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No demo requests found.</p> : filteredDemos.map(d => (
              <div key={d.id} onClick={() => { setSelectedDemo(d); setSelectedClient(null) }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center', background: selectedDemo?.id === d.id ? '#1a1a1a' : '#111', border: selectedDemo?.id === d.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{d.name || '—'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555' }}>{d.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{d.service || '—'}</div>
                  <div style={{ fontSize: '0.7rem', color: '#444' }}>{d.phone || '—'}</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#444', whiteSpace: 'nowrap' }}>{timeAgo(d.created_at)}</div>
              </div>
            )))}

            {tab === 'signups' && (filteredClients.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No signups found.</p> : filteredClients.map(c => {
              const trialDays = daysUntil(c.trial_ends_at)
              const expiringSoon = trialDays !== null && trialDays >= 0 && trialDays <= 3
              return (
                <div key={c.id} onClick={() => { setSelectedClient(c); setSelectedDemo(null) }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center', background: selectedClient?.id === c.id ? '#1a1a1a' : '#111', border: selectedClient?.id === c.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {[c.first_name, c.last_name].filter(Boolean).join(' ') || c.name || c.email || '—'}
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: c.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: c.active ? '#22c55e' : '#666' }}>{c.active ? 'Active' : 'Inactive'}</span>
                      {expiringSoon && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Trial {trialDays}d</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#555' }}>{c.email || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{c.company_name || 'No company'}</div>
                    <div style={{ fontSize: '0.7rem', color: '#444' }}>Trial: {c.trial_ends_at ? formatDate(c.trial_ends_at) : '—'}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#444', whiteSpace: 'nowrap' }}>{timeAgo(c.created_at)}</div>
                </div>
              )
            }))}

            {tab === 'activity' && (filteredActivity.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No activity found.</p> : filteredActivity.map((a, i) => {
              if (a.type === 'demo') {
                const d = a.data as DemoRequest
                return (
                  <div key={`d-${d.id}`} onClick={() => { setSelectedDemo(d); setSelectedClient(null) }} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center', background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: 'rgba(255,107,53,0.1)', color: '#ff6b35', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Demo</span>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{d.name || '—'}</div>
                      <div style={{ fontSize: '0.7rem', color: '#555' }}>{d.email} · {d.service || '—'}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#444', whiteSpace: 'nowrap' }}>{timeAgo(d.created_at)}</div>
                  </div>
                )
              }
              const c = a.data as Client
              return (
                <div key={`c-${c.id}`} onClick={() => { setSelectedClient(c); setSelectedDemo(null) }} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center', background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: 'rgba(34,197,94,0.1)', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Signup</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {[c.first_name, c.last_name].filter(Boolean).join(' ') || c.name || c.email || '—'}
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: c.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: c.active ? '#22c55e' : '#666' }}>{c.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#555' }}>{c.email} · {c.company_name || 'No company'}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#444', whiteSpace: 'nowrap' }}>{timeAgo(c.created_at)}</div>
                </div>
              )
            }))}
          </div>
        )}
      </div>

      {/* Side Panel */}
      {panelOpen && (
        <>
          <div onClick={closePanel} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '420px', height: '100vh', background: '#111', borderLeft: '1px solid #1e1e1e', zIndex: 100, overflowY: 'auto', animation: 'slideIn 0.25s ease' }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e1e1e', position: 'sticky', top: 0, background: '#111', zIndex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{selectedDemo ? 'Demo Request' : 'Client Details'}</span>
              <button onClick={closePanel} style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 6, color: '#666', fontSize: '0.875rem', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>x</button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {selectedDemo && <>
                {[
                  ['Name', selectedDemo.name],
                  ['Email', selectedDemo.email],
                  ['Phone', selectedDemo.phone],
                  ['Business Type', selectedDemo.service],
                  ['Message', selectedDemo.message || 'None'],
                  ['Submitted', formatDate(selectedDemo.created_at)],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
                      {val || '—'}
                      {(label === 'Email' || label === 'Phone') && val && <CopyButton text={val} />}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <a href={`mailto:${selectedDemo.email}`} style={{ flex: 1, padding: '0.75rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.8rem', textAlign: 'center' }}>Reply via Email</a>
                  {selectedDemo.phone && <a href={`tel:${selectedDemo.phone}`} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.8rem', textAlign: 'center' }}>Call</a>}
                </div>
              </>}

              {selectedClient && <>
                {[
                  ['Name', [selectedClient.first_name, selectedClient.last_name].filter(Boolean).join(' ') || selectedClient.name],
                  ['Email', selectedClient.email],
                  ['Company', selectedClient.company_name],
                  ['Status', selectedClient.active ? 'Active' : 'Inactive'],
                  ['Trial Ends', selectedClient.trial_ends_at ? formatDate(selectedClient.trial_ends_at) : '—'],
                  ['Stripe ID', selectedClient.stripe_customer_id],
                  ['API Key', selectedClient.api_key],
                  ['Signed Up', formatDate(selectedClient.created_at)],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{
                      fontSize: (label === 'API Key' || label === 'Stripe ID') ? '0.7rem' : '0.9rem',
                      color: label === 'Status' ? (selectedClient.active ? '#22c55e' : '#f87171') : '#fff',
                      wordBreak: 'break-all',
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: (label === 'API Key' || label === 'Stripe ID') ? 'monospace' : 'inherit',
                    }}>
                      {val || '—'}
                      {(label === 'Email' || label === 'API Key' || label === 'Stripe ID') && val && <CopyButton text={val} />}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <a href={`mailto:${selectedClient.email}`} style={{ flex: 1, padding: '0.75rem', background: '#ff6b35', color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.8rem', textAlign: 'center' }}>Email Client</a>
                  {selectedClient.stripe_customer_id && <a href={`https://dashboard.stripe.com/customers/${selectedClient.stripe_customer_id}`} target="_blank" style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.8rem', textAlign: 'center' }}>Stripe</a>}
                </div>
              </>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
