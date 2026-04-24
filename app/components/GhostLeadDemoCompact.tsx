'use client'
import { useEffect, useState } from 'react'

export default function GhostLeadDemoCompact() {
  const [stage, setStage] = useState(0)
  const [nameText, setNameText] = useState('')
  const [emailText, setEmailText] = useState('')
  const [phoneText, setPhoneText] = useState('')
  const [captured, setCaptured] = useState(false)

  const fullName = 'Sarah Mitchell'
  const fullEmail = 'sarah.m@gmail.com'
  const fullPhone = '(214) 555-'

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStage(4)
      setNameText(fullName)
      setEmailText(fullEmail)
      setPhoneText(fullPhone)
      setCaptured(true)
      return
    }

    let timeouts: ReturnType<typeof setTimeout>[] = []

    const runSequence = () => {
      setStage(0); setNameText(''); setEmailText(''); setPhoneText(''); setCaptured(false)

      timeouts.push(setTimeout(() => setStage(1), 800))
      for (let i = 0; i <= fullName.length; i++) {
        timeouts.push(setTimeout(() => setNameText(fullName.slice(0, i)), 800 + i * 80))
      }

      const emailStart = 800 + fullName.length * 80 + 400
      timeouts.push(setTimeout(() => setStage(2), emailStart))
      for (let i = 0; i <= fullEmail.length; i++) {
        timeouts.push(setTimeout(() => setEmailText(fullEmail.slice(0, i)), emailStart + i * 70))
      }

      const phoneStart = emailStart + fullEmail.length * 70 + 400
      timeouts.push(setTimeout(() => setStage(3), phoneStart))
      for (let i = 0; i <= fullPhone.length; i++) {
        timeouts.push(setTimeout(() => setPhoneText(fullPhone.slice(0, i)), phoneStart + i * 80))
      }

      const abandonTime = phoneStart + fullPhone.length * 80 + 800
      timeouts.push(setTimeout(() => setStage(4), abandonTime))
      timeouts.push(setTimeout(() => setCaptured(true), abandonTime + 600))

      // Only loop on desktop — mobile runs once and stays on captured state
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 900
      if (!isMobile) {
        timeouts.push(setTimeout(runSequence, abandonTime + 5000))
      }
    }

    runSequence()
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div className="gc-wrap">
      <div className={`gc-form ${stage === 4 ? 'gc-form-fade' : ''}`}>
        <div className="gc-form-header">
          <div className="gc-dot"></div>
          <div className="gc-dot"></div>
          <div className="gc-dot"></div>
          <span className="gc-url">yourwebsite.com/contact</span>
        </div>
        <div className="gc-form-body">
          <h4>Book a Consultation</h4>
          <div className={`gc-field ${stage >= 1 ? 'active' : ''}`}>
            <label>Full Name</label>
            <div className="gc-input">
              {nameText}
              {stage === 1 && <span className="gc-cursor"></span>}
            </div>
          </div>
          <div className={`gc-field ${stage >= 2 ? 'active' : ''}`}>
            <label>Email</label>
            <div className="gc-input">
              {emailText}
              {stage === 2 && <span className="gc-cursor"></span>}
            </div>
          </div>
          <div className={`gc-field ${stage >= 3 ? 'active' : ''}`}>
            <label>Phone</label>
            <div className="gc-input">
              {phoneText}
              {stage === 3 && <span className="gc-cursor"></span>}
            </div>
          </div>
          <button className={`gc-submit ${stage >= 4 ? 'gc-submit-abandoned' : ''}`} type="button">
            {stage >= 4 ? 'Visitor left the page' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="gc-arrow">
        <div className="gc-arrow-line"></div>
        <div className="gc-arrow-label">Captured by ReCapture</div>
      </div>

      <div className={`gc-capture ${captured ? 'gc-capture-visible' : ''}`}>
        <div className="gc-capture-header">
          <div className="gc-pulse"></div>
          <span>Abandoned Lead Captured</span>
        </div>
        <div className="gc-capture-data">
          <div className="gc-row"><span className="gc-label">Name</span><span className="gc-value">{fullName}</span></div>
          <div className="gc-row"><span className="gc-label">Email</span><span className="gc-value">{fullEmail}</span></div>
          <div className="gc-row"><span className="gc-label">Phone</span><span className="gc-value">{fullPhone}</span></div>
          <div className="gc-row"><span className="gc-label">Status</span><span className="gc-status">Ai Callback in 60s</span></div>
        </div>
      </div>
    </div>
  )
}
