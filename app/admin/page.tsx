'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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

export default function AdminPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [demos, setDemos] = useState<DemoRequest[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [tab, setTab] = useState<'demos' | 'signups'>('demos')
  const [loading, setLoading] = useState(true)
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

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  function closePanel() { setSelectedDemo(null); setSelectedClient(null) }
  const panelOpen = selectedDemo !== null || selectedClient !== null

  if (!authorized) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' as const }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
            <span><span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="24" height="24" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
              <g className="logo-bl"><path d="M10 5 L4 5 L4 31 L10 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <g className="logo-br"><path d="M26 5 L32 5 L32 31 L26 31" fill="none" stroke="#ff6b35" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>
              <circle className="logo-dg" cx="18" cy="18" r="8" fill="#ff6b35"/>
              <circle className="logo-dp" cx="18" cy="18" r="5" fill="#ff6b35"/>
            </svg><span><span style={{ color: '#fff' }}>Re</span><span style={{ color: '#ff6b35' }}>Capture</span></span></span></span></span>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#ff6b35', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '4px', padding: '2px 6px' }}>ADMIN</span>
        </div>
        <button style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#666', fontSize: '0.8125rem', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => supabase.auth.signOut().then(() => router.push('/'))}>Sign Out</button>
      </div>

      {/* Page */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', letterSpacing: '-0.02em' }}>Admin Dashboard</h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { num: demos.length, label: 'Demo Requests', color: '#fff' },
            { num: clients.length, label: 'Total Signups', color: '#fff' },
            { num: clients.filter(c => c.active).length, label: 'Active Clients', color: '#ff6b35' },
            { num: `$${clients.filter(c => c.active).length * 200}/mo`, label: 'Est. MRR', color: '#22c55e' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color, marginBottom: '0.25rem' }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['demos', 'signups'] as const).map(t => (
            <button key={t} style={{ padding: '0.625rem 1.25rem', background: tab === t ? '#1a1a1a' : 'transparent', border: tab === t ? '1px solid #333' : '1px solid #2a2a2a', borderRadius: '8px', color: tab === t ? '#fff' : '#555', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }} onClick={() => setTab(t)}>
              {t === 'demos' ? `Demo Requests (${demos.length})` : `Signups (${clients.length})`}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>Loading…</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {tab === 'demos' && (demos.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No demo requests yet.</p> : demos.map(d => (
              <div key={d.id} onClick={() => { setSelectedDemo(d); setSelectedClient(null) }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: selectedDemo?.id === d.id ? '#1a1a1a' : '#111', border: selectedDemo?.id === d.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{d.name || '—'}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#555' }}>{d.email} · {d.phone}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#555', marginTop: '0.125rem' }}>{d.service}{d.message ? ` · "${d.message}"` : ''}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#444', whiteSpace: 'nowrap' as const, marginLeft: '1rem' }}>{formatDate(d.created_at)}</div>
              </div>
            )))}

            {tab === 'signups' && (clients.length === 0 ? <p style={{ color: '#444', textAlign: 'center', padding: '3rem 0' }}>No signups yet.</p> : clients.map(c => (
              <div key={c.id} onClick={() => { setSelectedClient(c); setSelectedDemo(null) }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: selectedClient?.id === c.id ? '#1a1a1a' : '#111', border: selectedClient?.id === c.id ? '1px solid #ff6b35' : '1px solid #1e1e1e', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {[c.first_name, c.last_name].filter(Boolean).join(' ') || c.name || c.email || '—'}
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: c.active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)', color: c.active ? '#22c55e' : '#666' }}>{c.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#555' }}>{c.email || '—'}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#555', marginTop: '0.125rem' }}>{c.company_name || 'No company'} · Trial ends: {c.trial_ends_at ? formatDate(c.trial_ends_at) : '—'}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#444', whiteSpace: 'nowrap' as const, marginLeft: '1rem' }}>{formatDate(c.created_at)}</div>
              </div>
            )))}
          </div>
        )}
      </div>

      {/* Side Panel */}
      {panelOpen && (
        <>
          <div onClick={closePanel} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: '#111', borderLeft: '1px solid #1e1e1e', zIndex: 100, overflowY: 'auto' as const, animation: 'slideIn 0.25s ease' }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e1e1e', position: 'sticky' as const, top: 0, background: '#111' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{selectedDemo ? 'Demo Request' : 'Signup Details'}</span>
              <button onClick={closePanel} style={{ background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#666', fontSize: '0.875rem', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {selectedDemo && <>
                {[['Name', selectedDemo.name], ['Email', selectedDemo.email], ['Phone', selectedDemo.phone], ['Business Type', selectedDemo.service], ['Message', selectedDemo.message || 'None'], ['Submitted', formatDate(selectedDemo.created_at)]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#444', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9375rem', color: '#fff' }}>{val || '—'}</div>
                  </div>
                ))}
                <a href={`mailto:${selectedDemo.email}`} style={{ display: 'block', marginTop: '0.5rem', padding: '0.75rem 1.25rem', background: '#ff6b35', color: '#000', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', fontSize: '0.875rem', textAlign: 'center' as const }}>Reply via Email →</a>
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
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#444', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: label === 'API Key' || label === 'Stripe ID' ? '0.75rem' : '0.9375rem', color: label === 'Status' ? (selectedClient.active ? '#22c55e' : '#f87171') : '#fff', wordBreak: 'break-all' as const }}>{val || '—'}</div>
                  </div>
                ))}
                <a href={`mailto:${selectedClient.email}`} style={{ display: 'block', marginTop: '0.5rem', padding: '0.75rem 1.25rem', background: '#ff6b35', color: '#000', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', fontSize: '0.875rem', textAlign: 'center' as const }}>Email Client →</a>
              </>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
