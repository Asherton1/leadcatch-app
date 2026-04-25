'use client'

import { useEffect, useRef, useState } from 'react'

type Status = 'OPEN' | 'CONTACTED' | 'CONVERTED'

interface Lead {
  name: string
  email: string
  value: string
  finalStatus: Status
}

const leads: Lead[] = [
  { name: 'Sarah Mitchell', email: 'sarah.m@gmail.com', value: '$1,100', finalStatus: 'CONVERTED' },
  { name: 'James Nguyen', email: 'james.n@gmail.com', value: '$1,100', finalStatus: 'CONTACTED' },
  { name: 'Kelsey Thomas', email: 'kelsey.t@gmail.com', value: '$1,100', finalStatus: 'OPEN' },
  { name: 'David Lin', email: 'david.l@gmail.com', value: '$1,100', finalStatus: 'OPEN' },
]

const statusClassMap: Record<Status, string> = {
  OPEN: 'ledger-status-open',
  CONTACTED: 'ledger-status-contacted',
  CONVERTED: 'ledger-status-converted',
}

export default function LedgerRows() {
  const [visible, setVisible] = useState(false)
  const [rowsShown, setRowsShown] = useState<boolean[]>([false, false, false, false])
  const [statuses, setStatuses] = useState<Status[]>(['OPEN', 'OPEN', 'OPEN', 'OPEN'])
  const wrapRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setRowsShown([true, true, true, true])
      setStatuses(leads.map((l) => l.finalStatus))
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []

    leads.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        setRowsShown((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 400 + i * 200))
    })

    timeouts.push(setTimeout(() => {
      setStatuses((prev) => { const next = [...prev]; next[0] = 'CONTACTED'; return next })
    }, 2800))
    timeouts.push(setTimeout(() => {
      setStatuses((prev) => { const next = [...prev]; next[0] = 'CONVERTED'; return next })
    }, 3400))

    timeouts.push(setTimeout(() => {
      setStatuses((prev) => { const next = [...prev]; next[1] = 'CONTACTED'; return next })
    }, 3600))

    return () => timeouts.forEach(clearTimeout)
  }, [visible])

  return (
    <div ref={wrapRef} className="ledger-rows">
      {leads.map((lead, i) => (
        <div
          className={`ledger-row ${rowsShown[i] ? 'ledger-row-visible' : ''}`}
          key={i}
        >
          <div className="ledger-row-name">{lead.name}</div>
          <div className="ledger-row-email">{lead.email}</div>
          <div className="ledger-row-value">{lead.value}</div>
          <div className={`ledger-row-status ${statusClassMap[statuses[i]]}`}>
            {statuses[i]}
          </div>
        </div>
      ))}
    </div>
  )
}
