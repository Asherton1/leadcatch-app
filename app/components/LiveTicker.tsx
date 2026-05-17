'use client'
import { useEffect, useState } from 'react'

export default function LiveTicker() {
  const [count, setCount] = useState(1247883)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    let flashTimeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      const increment = Math.floor(Math.random() * 5) + 1
      setCount(c => c + increment)
      setFlash(true)
      flashTimeoutId = setTimeout(() => setFlash(false), 400)
      timeoutId = setTimeout(tick, 3000 + Math.random() * 2500)
    }
    timeoutId = setTimeout(tick, 1800)
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(flashTimeoutId)
    }
  }, [])

  return (
    <div className={`live-ticker ${flash ? 'flash' : ''}`} aria-hidden="true">
      <span className="live-ticker-dot" />
      <span className="live-ticker-number">{count.toLocaleString('en-US')}</span>
      <span className="live-ticker-label">leads recovered for our clients</span>
    </div>
  )
}
