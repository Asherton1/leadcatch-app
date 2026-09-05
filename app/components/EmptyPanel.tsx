'use client'

import { useEffect, useRef, useState } from 'react'

const NAME = 'Sarah Whitfield'
const MAIL = 's.whitfield@gmail.com'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return { ref, seen }
}

export default function EmptyPanel({ variant }: { variant: 'arrive' | 'typing' | 'gone' }) {
  const { ref, seen } = useInView<HTMLDivElement>()
  const [views, setViews] = useState(1204)
  const [typed, setTyped] = useState(0)
  const [wiped, setWiped] = useState(false)

  // 01 — pageviews tick up, records stay at zero
  useEffect(() => {
    if (!seen || variant !== 'arrive') return
    const iv = setInterval(() => setViews(v => v + 1), 2600)
    return () => clearInterval(iv)
  }, [seen, variant])

  // 02 — the form types itself, on a loop
  useEffect(() => {
    if (!seen || variant !== 'typing') return
    let i = 0
    const total = NAME.length + MAIL.length
    const iv = setInterval(() => {
      i = i >= total + 14 ? 0 : i + 1
      setTyped(i)
    }, 110)
    return () => clearInterval(iv)
  }, [seen, variant])

  // 03 — what they entered disperses, on a loop
  useEffect(() => {
    if (!seen || variant !== 'gone') return
    const iv = setInterval(() => setWiped(w => !w), 2800)
    return () => clearInterval(iv)
  }, [seen, variant])

  const nameShown = NAME.slice(0, Math.min(typed, NAME.length))
  const mailShown = typed > NAME.length ? MAIL.slice(0, typed - NAME.length) : ''

  return (
    <div className="ep" ref={ref}>
      <div className="ep-head">
        <span className="ep-dot" /><span className="ep-dot" /><span className="ep-dot" />
        <span className="ep-title">Your CRM</span>
        <span className="ep-count">0 records</span>
      </div>

      <div className="ep-body">
        {variant === 'arrive' && (
          <div className="ep-meters">
            <div className="ep-meter">
              <span className="ep-meter-num ep-tick" key={views}>{views.toLocaleString()}</span>
              <span className="ep-meter-label">Pageviews</span>
            </div>
            <span className="ep-vs" aria-hidden="true" />
            <div className="ep-meter">
              <span className="ep-meter-num ep-zero">0</span>
              <span className="ep-meter-label">People you can name</span>
            </div>
          </div>
        )}

        {variant === 'typing' && (
          <>
            <div className="ep-form">
              <div className="ep-field">
                <b>Name</b>
                <i>{nameShown}{typed <= NAME.length && <span className="ep-caret" />}</i>
              </div>
              <div className="ep-field">
                <b>Email</b>
                <i>{mailShown}{typed > NAME.length && <span className="ep-caret" />}</i>
              </div>
            </div>
            <div className="ep-none">Nothing has reached your CRM</div>
          </>
        )}

        {variant === 'gone' && (
          <div className={'ep-gone' + (wiped ? ' ep-wiped' : '')}>
            <div className="ep-form ep-form-ghost">
              <div className="ep-field"><b>Name</b><i>Sarah Whitfield</i></div>
              <div className="ep-field"><b>Email</b><i>s.whitfield@gmail.com</i></div>
            </div>
            <div className="ep-none">Gone. No record it happened.</div>
          </div>
        )}
      </div>
    </div>
  )
}
