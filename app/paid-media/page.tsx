import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import MediaPanel from '../components/MediaPanel'
import './paid-media.css'
import '../landing.css'

export const metadata = {
  title: 'Paid Media Management — Google, Meta and the rest, run by one person',
  description: 'Google Ads, Meta, TikTok, Microsoft and X campaign management for businesses where a single client is worth thousands. A deliberately small client list, and the person you talk to is the person in the account.',
  alternates: { canonical: '/paid-media' },
  openGraph: {
    title: 'Paid Media Management — Google, Meta and the rest',
    description: 'Campaign management for businesses where a single client is worth thousands. Small client list, direct access, and measurement that tells you what a customer actually costs.',
    url: 'https://www.userecapture.com/paid-media',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Paid+Media+Management&eyebrow=Consulting',
      width: 1200, height: 630, alt: 'ReCapture',
    }],
  },
}

export default function PaidMediaPage() {
  return (
    <div className="pm-page">
      <BlogNav />

      <section className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-hero-eyebrow">Consulting</p>
          <h1 className="canon-hero-headline">
            <span className="canon-hero-headline-primary">Somebody has to actually be in the account.</span>{' '}
            <span className="canon-hero-headline-muted">I run Google and Meta campaigns for businesses where one client is worth thousands. A small list on purpose, so the person you talk to is the person doing the work.</span>
          </h1>
        </div>
      </section>

      <div className="pm-body">

        <h2>It usually starts with a number that is wrong</h2>
        <p>Almost every account I open has the same problem, and it is never the creative. The tracking is incomplete, so the reporting is confident and false.</p>
        <p>Traffic looks healthy. Spend is going out. And the number that should tell you whether any of it worked is either missing, double counted, or measuring something that is not a customer.</p>

        <MediaPanel />

        <p className="pm-caption">Same spend, same campaigns, same month. The only thing that changed was that the measurement started working.</p>

        <h2>What I actually do</h2>
        <p>Campaign management across Google Ads and Meta primarily, with TikTok, Microsoft and X where they fit. Most accounts do not need five platforms. Most accounts need two run properly.</p>
        <p>Before anything gets restructured, the measurement gets fixed. Conversion tracking that fires on the actions that matter, values attached to them, and reporting that separates cost per lead from cost per client. Those two numbers frequently point in opposite directions, and the gap between them is where budgets quietly disappear.</p>
        <p>Then the account gets rebuilt around what the data actually shows rather than what the previous structure assumed.</p>

        <h2>Who this is for</h2>
        <p>Businesses where a single customer is worth four or five figures. Law firms. Med spas and aesthetic practices. Plastic surgery. Custom home builders and luxury real estate. Property management. Dental and healthcare groups.</p>
        <p>The common thread is that volume is the wrong goal. Four of the right people beats a hundred of the wrong ones, and most accounts are optimised to produce the hundred because that is the number the reporting rewards.</p>

        <h2>The audit</h2>
        <p>If you are already spending, I will look at the account and tell you what I see. No charge and no obligation attached to it.</p>
        <p>You get two documents. A teardown of what is working, what is not, and where the money is going. Then a written strategy for what I would change and why, including whether the budget belongs on the platform it currently sits on.</p>
        <p>If it turns out everything is running well, I will say so. That happens occasionally and it is a useful thing to know.</p>

        <div className="pm-divider" />

        <h2>Where ReCapture comes in</h2>
        <p>This site is mostly about a piece of software, so it is worth explaining how the two relate.</p>
        <p>ReCapture exists because of the consulting work, not alongside it. After a decade of buying media I kept running into the same wall: every number an ad platform learns from starts at the moment somebody presses submit. The people who filled in half a form and left were invisible to every system — the CRM, the analytics, and the platforms doing the optimising.</p>
        <p>So the campaigns were being optimised against a fraction of real demand, and there was no way to fix that from inside an ad account. It had to be built.</p>

        <div className="pm-phases">
          <div className="pm-phase">
            <span className="pm-phase-num">Phase one</span>
            <h3>Fix the measurement, then the media</h3>
            <p>Conversion tracking that works, reporting that separates leads from clients, and an account structure built on what the numbers actually say. This is the consulting engagement and it stands on its own.</p>
          </div>
          <div className="pm-phase">
            <span className="pm-phase-num">Phase two</span>
            <h3>Recover what the forms are losing</h3>
            <p>Once the measurement is sound and you can see the abandonment rate, ReCapture captures the inquiries that never reached you and feeds them back to Meta and Google as real signal.</p>
          </div>
        </div>

        <p className="pm-note">The order matters. Installing recovery software on top of broken tracking captures nothing useful and tells you nothing true. The plumbing comes first.</p>

        <div className="pm-cta">
          <h3>Want an outside read on your account?</h3>
          <p>Send exports for whatever period you are comfortable sharing. You will get the teardown and the strategy back, at no cost and with nothing attached.</p>
          <Link href="/contact" className="pm-cta-btn">Request the audit</Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}
