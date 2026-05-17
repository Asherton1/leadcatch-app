'use client'
import { useEffect, useRef, useState } from 'react'

const POOL = [
  'sarah.l@gma...',
  'james.m@out...',
  'bobby.k@ho...',
  'lauren.j@me...',
  'tony.r@yah...',
  'emily.j@ma...',
  'michael.r@...',
  'k.fresquez@...',
  'r.hughes@...',
  'david@esd...',
  'arabella@...',
  'martin@esd...',
  'paul.t@yah...',
  '+1 415 555 0...',
  '+1 214 555 0...',
  'mason@gma...',
  'jordan.b@...',
  'natalie@out...',
]

interface Entry {
  id: number
  email: string
  bornAt: number
}

export default function CaptureFeed() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [, setTick] = useState(0)
  const idCounter = useRef(0)

  useEffect(() => {
    const now = performance.now()
    const pickEmail = () => POOL[Math.floor(Math.random() * POOL.length)]
    setEntries([
      { id: idCounter.current++, email: pickEmail(), bornAt: now - 8000 },
      { id: idCounter.current++, email: pickEmail(), bornAt: now - 42000 },
      { id: idCounter.current++, email: pickEmail(), bornAt: now - 130000 },
    ])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const addEntry = () => {
      const newEntry: Entry = {
        id: idCounter.current++,
        email: POOL[Math.floor(Math.random() * POOL.length)],
        bornAt: performance.now(),
      }
      setEntries(prev => [newEntry, ...prev].slice(0, 3))
      timeoutId = setTimeout(addEntry, 5000 + Math.random() * 3500)
    }
    timeoutId = setTimeout(addEntry, 5500)
    return () => clearTimeout(timeoutId)
  }, [])

  const formatAge = (bornAt: number) => {
    const ms = performance.now() - bornAt
    const s = Math.max(0, Math.floor(ms / 1000))
    if (s < 60) return `${s}s ago`
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    return `${Math.floor(s / 3600)}h ago`
  }

  return (
    <div className="capture-feed" aria-hidden="true">
      <div className="capture-feed-label">live captures</div>
      <div className="capture-feed-list">
        {entries.map((e, i) => {
          const age = performance.now() - e.bornAt
          const isNew = i === 0 && age < 1500
          return (
            <div
              key={e.id}
              className={`capture-feed-item ${isNew ? 'new' : ''}`}
            >
              <span className="capture-feed-dot" />
              <span className="capture-feed-email">{e.email}</span>
              <span className="capture-feed-time">{formatAge(e.bornAt)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
