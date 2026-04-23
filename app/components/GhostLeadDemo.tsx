'use client'
import { useEffect, useState } from 'react'

export default function GhostLeadDemo() {
  const [stage, setStage] = useState(0)
  const [nameText, setNameText] = useState('')
  const [emailText, setEmailText] = useState('')
  const [phoneText, setPhoneText] = useState('')
  const [captured, setCaptured] = useState(false)

  const fullName = 'Sarah Mitchell'
  const fullEmail = 'sarah.m@gmail.com'
  const fullPhone = '(214) 555-'

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []
    
    const runSequence = () => {
      setStage(0)
      setNameText('')
      setEmailText('')
      setPhoneText('')
      setCaptured(false)

      // Type name
      timeouts.push(setTimeout(() => setStage(1), 800))
      for (let i = 0; i <= fullName.length; i++) {
        timeouts.push(setTimeout(() => setNameText(fullName.slice(0, i)), 800 + i * 80))
      }

      // Type email
      const emailStart = 800 + fullName.length * 80 + 400
      timeouts.push(setTimeout(() => setStage(2), emailStart))
      for (let i = 0; i <= fullEmail.length; i++) {
        timeouts.push(setTimeout(() => setEmailText(fullEmail.slice(0, i)), emailStart + i * 70))
      }

      // Type phone (partial — they abandon)
      const phoneStart = emailStart + fullEmail.length * 70 + 400
      timeouts.push(setTimeout(() => setStage(3), phoneStart))
      for (let i = 0; i <= fullPhone.length; i++) {
        timeouts.push(setTimeout(() => setPhoneText(fullPhone.slice(0, i)), phoneStart + i * 80))
      }

      // Abandon moment — pause, then capture
      const abandonTime = phoneStart + fullPhone.length * 80 + 800
      timeouts.push(setTimeout(() => setStage(4), abandonTime))
      timeouts.push(setTimeout(() => setCaptured(true), abandonTime + 600))

      // Restart after showing capture
      timeouts.push(setTimeout(runSequence, abandonTime + 5000))
    }

    runSequence()
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div className="ghost-demo-wrap">
      <div className="ghost-demo-grid">
        <div className={`ghost-form ${stage === 4 ? 'ghost-form-fade' : ''}`}>
          <div className="ghost-form-header">
            <div className="ghost-form-dot"></div>
            <div className="ghost-form-dot"></div>
            <div className="ghost-form-dot"></div>
            <span className="ghost-form-url">yourwebsite.com/contact</span>
          </div>
          <div className="ghost-form-body">
            <h4>Book a Consultation</h4>
            <div className={`ghost-field ${stage >= 1 ? 'active' : ''}`}>
              <label>Full Name</label>
              <div className="ghost-input">
                {nameText}
                {stage === 1 && <span className="ghost-cursor"></span>}
              </div>
            </div>
            <div className={`ghost-field ${stage >= 2 ? 'active' : ''}`}>
              <label>Email</label>
              <div className="ghost-input">
                {emailText}
                {stage === 2 && <span className="ghost-cursor"></span>}
              </div>
            </div>
            <div className={`ghost-field ${stage >= 3 ? 'active' : ''}`}>
              <label>Phone</label>
              <div className="ghost-input">
                {phoneText}
                {stage === 3 && <span className="ghost-cursor"></span>}
              </div>
            </div>
            <button className={`ghost-submit ${stage >= 4 ? 'ghost-submit-abandoned' : ''}`}>
              {stage >= 4 ? 'Visitor left the page' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="ghost-arrow">
          <div className="ghost-arrow-line"></div>
          <div className="ghost-arrow-label">Captured by ReCapture</div>
        </div>

        <div className={`ghost-capture ${captured ? 'ghost-capture-visible' : ''}`}>
          <div className="ghost-capture-header">
            <div className="ghost-capture-pulse"></div>
            <span>Abandoned Lead Captured</span>
          </div>
          <div className="ghost-capture-data">
            <div className="ghost-capture-row">
              <span className="ghost-capture-label">Name</span>
              <span className="ghost-capture-value">{fullName}</span>
            </div>
            <div className="ghost-capture-row">
              <span className="ghost-capture-label">Email</span>
              <span className="ghost-capture-value">{fullEmail}</span>
            </div>
            <div className="ghost-capture-row">
              <span className="ghost-capture-label">Phone</span>
              <span className="ghost-capture-value">{fullPhone}</span>
            </div>
            <div className="ghost-capture-row">
              <span className="ghost-capture-label">Status</span>
              <span className="ghost-capture-status">Ai Callback in 60s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
