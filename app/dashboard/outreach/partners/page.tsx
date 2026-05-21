'use client'

import Link from 'next/link'
import { useIsAdmin } from '@/lib/use-is-admin'
import './partners.css'

export default function PartnersPage() {
  const { loading, isAdmin } = useIsAdmin()

  if (loading) return <div className="partners-state">Loading\u2026</div>
  if (!isAdmin) return <div className="partners-state partners-state-error">Unauthorized. This area is for admins only.</div>

  return (
    <div className="partners-page">
      <div className="partners-header">
        <p className="partners-eyebrow">Partner Applications</p>
        <h1 className="partners-title">Inbound from your partners page.</h1>
      </div>

      <div className="partners-stats">
        <div className="partners-stat">
          <p className="partners-stat-label">Applications</p>
          <p className="partners-stat-value">0</p>
        </div>
        <div className="partners-stat">
          <p className="partners-stat-label">Approved</p>
          <p className="partners-stat-value">0</p>
        </div>
        <div className="partners-stat">
          <p className="partners-stat-label">Pending Review</p>
          <p className="partners-stat-value">0</p>
        </div>
        <div className="partners-stat partners-stat-accent">
          <p className="partners-stat-label">Live Partners</p>
          <p className="partners-stat-value">0</p>
        </div>
      </div>

      <section className="partners-empty">
        <p className="partners-empty-eyebrow">No applications yet</p>
        <p className="partners-empty-headline">This is where every partner inquiry will land.</p>
        <p className="partners-empty-body">
          When agencies, consultants, or operators submit the form on your public partners page,
          their application will appear here with their name, agency, client count, and message.
          You\u2019ll be able to review, approve, and track them through onboarding.
        </p>
        <div className="partners-empty-actions">
          <Link href="/partners" className="partners-link-primary" target="_blank" rel="noopener">
            View public partners page \u2192
          </Link>
          <a href="mailto:hello@userecapture.com" className="partners-link-secondary">
            Email a partner directly
          </a>
        </div>
      </section>

      <section className="partners-roadmap">
        <p className="partners-roadmap-label">Coming next</p>
        <ul className="partners-roadmap-list">
          <li><strong>Application review</strong> \u00b7 Approve or decline new partners with one click.</li>
          <li><strong>Partner accounts</strong> \u00b7 Auto-provision dashboard logins for approved partners.</li>
          <li><strong>Revenue share tracking</strong> \u00b7 Monthly commission calc per partner.</li>
          <li><strong>White-label deployments</strong> \u00b7 Track which partners run their own branded ReCapture.</li>
        </ul>
      </section>
    </div>
  )
}
