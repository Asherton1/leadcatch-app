import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import ScrollReveal from '../components/ScrollReveal'
import Footer from '../components/Footer'
import '../blog/blog.css'
import '../landing.css'
import './dashboard-tour.css'
import { CardGrid, DropoffChart, TimingChart, AttentionStrip, PipelineBands, RecoveryFunnel, IntentSignals, ReportingWindow } from './TourVisuals'

export const metadata = {
  title: 'What You Actually Look At — ReCapture Dashboard',
  description: 'Every metric in the ReCapture dashboard, what it measures, and why it matters. Live visitors, field-level drop-off, inquiry timing, recovery funnel, and CSV export.',
  alternates: { canonical: '/dashboard-tour' },
}

const ACTIVITY = [
  { name: 'Live Visitors', value: 'People on your site right now', detail: 'What page they are on, where they came from, and an intent score that climbs as they engage. Click through for the full list.' },
  { name: 'Leads Captured', value: 'Inquiries that started and never submitted', detail: 'The number that would not exist anywhere else. Filters the table when you click it.' },
  { name: 'Completion Rate', value: 'How much of the form people finish', detail: 'Opens a field-by-field breakdown showing exactly which question people quit at.' },
  { name: 'Avg. Time on Form', value: 'How long they spent before leaving', detail: 'Long times on an abandoned form usually mean the form is the problem, not the interest.' },
  { name: 'Peak Inquiry Hour', value: 'When your inquiries actually arrive', detail: 'Opens a 24-hour chart split between business hours and after hours. This is a staffing decision, not a report.' },
]

const VALUE = [
  { name: 'Pipeline at Risk', value: 'Estimated value of captured inquiries', detail: 'Broken down by hot, warm, and cool so you can see which money is actually worth chasing today.' },
  { name: 'Recovered Revenue', value: 'Value of inquiries marked converted', detail: 'The number that justifies the invoice. Set a lead to Converted and its value lands here.' },
  { name: 'Recovery Rate', value: 'Converted divided by captured', detail: 'Opens the full funnel so it is clear what the percentage measures.' },
  { name: 'After Hours', value: 'Share arriving outside 8am to 6pm', detail: 'For most high-consideration businesses this is well over half, and nobody is at the desk for any of it.' },
  { name: 'On Mobile', value: 'Share arriving from a phone', detail: 'Opens a device breakdown including how much less of the form mobile visitors finish.' },
]

const DRAWERS = [
  { n: '01', title: 'Where people stop', body: 'A field-by-field drop-off chart. Everyone fills name and email. Fewer fill phone. Almost nobody reaches the open text box at the bottom. The steepest fall is the field costing you the most, and removing or reordering it is usually the fastest win available.' },
  { n: '02', title: 'When inquiries arrive', body: 'A twenty-four hour distribution, split between business hours and after hours, with your busiest windows ranked underneath. If the peak sits at nine in the evening, that is not a marketing insight. It is a staffing conversation.' },
  { n: '03', title: 'Pipeline by intent', body: 'The dollar value of captured inquiries, split by how engaged the visitor was before they left. Hot inquiries got furthest into the form and are the most likely to respond, which is where recovery effort returns the most.' },
  { n: '04', title: 'The recovery funnel', body: 'Captured, then emailed, then contacted, then converted. The gap between contacted and converted is a follow-up question. The gap between captured and contacted is a speed question. Both are worth knowing separately.' },
]

export default function DashboardTour() {
  return (
    <div className="dt-page">
      <BlogNav />
      <ScrollReveal />

      <section className="dt-hero">
        <div className="dt-inner">
          <p className="dt-eyebrow">The Dashboard</p>
          <h1 className="dt-h1">What you actually look at every morning.</h1>
          <p className="dt-lede">
            Most recovery tools give you a list of leads. This is closer to a read on your intake: who is on the site now, where the form is losing people, when inquiries actually arrive, and what any of it is worth.
          </p>
          <div className="dt-cta-row">
            <Link href="/signup?plan=pro" className="dt-btn">Start your 7-day free trial</Link>
            <Link href="/demo" className="dt-btn-ghost">Try the live demo</Link>
          </div>
        </div>
      </section>

      <section className="dt-band reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">Ten numbers. Two questions.</h2>
            <p>The top row answers what is happening right now — who is on the site, how many inquiries you captured, how far people get into the form, and when they actually arrive. The bottom row answers what it is worth.</p>
            <p>Every one of them responds to a single time control, so the whole page is always describing the same window. Set it to the period you report on and leave it there.</p>
          </div>
          <CardGrid />
        </div>
      </section>

      <section className="dt-band dt-band-alt reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">The one thing on the page that can be finished</h2>
            <p>When a high-intent inquiry from the last forty-eight hours has not been contacted, this appears at the top of the dashboard. It opens to show each person waiting, how long they have been waiting, and what the matter is worth.</p>
            <p>Work the list and it disappears. That is the difference between a dashboard someone checks monthly and one an intake team opens every morning.</p>
          </div>
          <AttentionStrip />
        </div>
      </section>

      <section className="dt-band reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">Where the form is losing people</h2>
            <p>Everyone fills in a name. Fewer give a phone number. Almost nobody reaches an open text box at the bottom asking them to describe their situation.</p>
            <p>The steepest fall is the field costing you the most. Removing it, moving it, or making it optional is usually the fastest win available — and until you can see this, it is guesswork.</p>
          </div>
          <DropoffChart />
        </div>
      </section>

      <section className="dt-band dt-band-alt reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">When inquiries actually arrive</h2>
            <p>For most high-consideration businesses the answer is nights and weekends, from a phone, at the moment something happened. Not Tuesday at ten in the morning.</p>
            <p>If your peak sits at nine in the evening, that is not a marketing insight. It is a staffing conversation, and this is the chart that starts it.</p>
          </div>
          <TimingChart />
        </div>
      </section>

      <section className="dt-band reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">Which money is actually worth chasing</h2>
            <p>Not every abandoned inquiry is equal. Someone who filled six fields and spent four minutes is a different prospect from someone who typed a name and left.</p>
            <p>Value split by intent tells your team where to spend the hour they have, rather than working a list top to bottom.</p>
          </div>
          <PipelineBands />
        </div>
      </section>

      <section className="dt-band dt-band-alt reveal">
        <div className="dt-inner dt-narrow">
          <div className="dt-caption dt-caption-lead">
            <h2 className="dt-h2">Where recovery is working and where it is not</h2>
            <p>Captured, emailed, contacted, converted. Seeing them separately matters, because the gaps mean different things.</p>
            <p>A gap between captured and contacted is a speed problem. A gap between contacted and converted is a follow-up problem. One is fixed with automation, the other with a conversation.</p>
          </div>
          <RecoveryFunnel />
        </div>
      </section>

      <section className="dt-band reveal">
        <div className="dt-inner dt-narrow">
          <p className="dt-section-eyebrow">Intent Signals</p>
          <h2 className="dt-h2">What leaves the dashboard</h2>
          <div className="dt-body">
            <p>Meta and Google only learn that someone was interested when they press submit. Everyone who started a form and left is invisible to them, which means every optimization decision and every lookalike audience gets built from a fraction of the people who actually wanted something.</p>
            <p>ReCapture sends the ones who did not finish to Meta&apos;s Conversions API and Google Ads as server-side conversion events. Contact fields only, hashed before they leave, and deduplicated against your existing pixel so nothing is counted twice.</p>
            <p>The panel shows how many went out over the window you have selected. That number is the part of your demand your ad platforms would otherwise never have seen.</p>
            <p>Each event is also weighted rather than flat-rated. Someone who came back a third time and filled seven of eight fields carries a materially higher value than someone who typed an email and left after eight seconds. Both are worth sending. They are not worth the same, and telling the platform the difference is the point of value-based optimization.</p>
            <p>You keep running campaigns exactly as you do now. Whoever manages the account decides what to do with better data. We just make sure it gets there.</p>
          </div>
          <IntentSignals />
        </div>
      </section>

      <section className="dt-band reveal">
        <div className="dt-inner dt-narrow">
          <p className="dt-section-eyebrow">Reporting</p>
          <h2 className="dt-h2">Set the window. Export the view.</h2>
          <div className="dt-body">
            <p>Last seven days, fourteen, thirty, ninety, or the current calendar month, with the comparison against the prior period of the same length beside it.</p>
            <p>Whatever is on screen exports to CSV, and the export respects the filters you have applied. Sixteen columns including the lead score, completion percentage, time on form, device, and whether a recovery message went out.</p>
            <p>The point is that this does not become another dashboard someone has to remember to check. Pull the numbers into whatever you already report from.</p>
          </div>
          <ReportingWindow />
        </div>
      </section>

      <section className="dt-final reveal">
        <div className="dt-inner dt-narrow">
          <h2 className="dt-h2">See it against your own traffic.</h2>
          <p className="dt-body">Seven-day free trial. One line of JavaScript. You will see your first captured inquiry the same day it goes on.</p>
          <div className="dt-cta-row">
            <Link href="/signup?plan=pro" className="dt-btn">Start your 7-day free trial</Link>
            <Link href="/form-audit" className="dt-btn-ghost">Run a free form audit first</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
