'use client'

import { useState, useEffect, useCallback } from 'react'
import './testimonial-spotlight.css'

const TESTIMONIALS = [
  {
    quote: "We had no idea how many leads were starting our consultation form and dropping off. Within the first week, ReCapture surfaced 14 leads we never would have known about. Three of them booked. That alone paid for the year.",
    name: "Sarah K.",
    company: "Practice Director, DFW",
    initial: "S",
  },
  {
    quote: "As a healthcare practice, every qualified lead matters. ReCapture showed us exactly who was falling through the cracks on our intake forms. The dashboard is clean, the data is actionable, and the setup took less than two minutes.",
    name: "David M.",
    company: "ESD Health",
    initial: "D",
  },
  {
    quote: "Three high-value Medicare clients in our first month — all from prospects who never finished our quote form. We still can't get over it. They never hit submit, never showed up in our CRM, never existed to us. ReCapture catches the moment someone types their name and email, then triggers a personalized recovery email within 60 seconds. For seniors comparing a multi-step Medicare quote, that timing is everything.",
    name: "Joe & Terry S.",
    company: "Suncoast Insurance Solutions",
    initial: "J",
  },
  {
    quote: "We run lead gen across multiple verticals and the drop-off between form views and submissions was always a black box. ReCapture opened that box. Now we see every lead that touches a form — and the ROI data makes reporting to stakeholders effortless.",
    name: "Michael T.",
    company: "3Con Partners",
    initial: "M",
  },
]

export default function TestimonialSpotlight() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((n: number) => {
    setI((n + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6500)
    return () => clearInterval(t)
  }, [paused])

  const t = TESTIMONIALS[i]

  return (
    <div
      className="ts-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ts-card">
        <div className="ts-mark" aria-hidden="true">&ldquo;</div>
        <div key={i} className="ts-anim">
          <p className="ts-quote">{t.quote}</p>
          <div className="ts-attr">
            <div className="ts-avatar">{t.initial}</div>
            <div className="ts-meta">
              <p className="ts-name">{t.name}</p>
              <p className="ts-company">{t.company}</p>
            </div>
          </div>
        </div>
        <button className="ts-arrow ts-prev" onClick={() => go(i - 1)} aria-label="Previous testimonial">&#8249;</button>
        <button className="ts-arrow ts-next" onClick={() => go(i + 1)} aria-label="Next testimonial">&#8250;</button>
      </div>
      <div className="ts-dots">
        {TESTIMONIALS.map((_, d) => (
          <button
            key={d}
            className={d === i ? 'ts-dot active' : 'ts-dot'}
            onClick={() => go(d)}
            aria-label={`Go to testimonial ${d + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
