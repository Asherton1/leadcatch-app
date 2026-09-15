import Link from 'next/link'
import BlogNav from '../components/BlogNav'
import Footer from '../components/Footer'
import MediaPanel from '../components/MediaPanel'
import PhaseFlow from '../components/PhaseFlow'
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
            <span className="canon-hero-headline-muted">I run Google and Meta campaigns for businesses where one client is worth thousands. No account team, no coordinator relaying messages. You email me, I am the one in the account.</span>
          </h1>
        </div>
      </section>

      <div className="pm-body">

        <h2 className="pm-reveal">It usually starts with a number that is wrong</h2>
        <p className="pm-reveal">Almost every account I open has the same problem, and it is never the creative. The tracking is incomplete, so the reporting is confident and false.</p>
        <p className="pm-reveal">Traffic looks healthy. Spend is going out. And the number that should tell you whether any of it worked is either missing, double counted, or measuring something that is not a customer.</p>

        <MediaPanel />

        <p className="pm-caption">Same spend, same campaigns, same month. The only thing that changed was that the measurement started working.</p>

        <h2 className="pm-reveal">What I actually do</h2>
        <p className="pm-reveal">Campaign management across Google Ads and Meta primarily, with TikTok, Microsoft and X where they fit. Most accounts do not need five platforms. Most accounts need two run properly.</p>
        <p className="pm-reveal">Before anything gets restructured, the measurement gets fixed. Conversion tracking that fires on the actions that matter, values attached to them, and reporting that separates cost per lead from cost per client. Those two numbers frequently point in opposite directions, and the gap between them is where budgets quietly disappear.</p>
        <p className="pm-reveal">Then the account gets rebuilt around what the data actually shows rather than what the previous structure assumed.</p>

        <h2 className="pm-reveal">Who this is for</h2>
        <p className="pm-reveal">Businesses where a single customer is worth four or five figures.</p>
        <div className="pm-verticals">
          <span style={{ ['--i' as string]: 0 }}>Law firms</span>
          <span style={{ ['--i' as string]: 1 }}>Med spas &amp; aesthetics</span>
          <span style={{ ['--i' as string]: 2 }}>Plastic surgery</span>
          <span style={{ ['--i' as string]: 3 }}>Custom home builders</span>
          <span style={{ ['--i' as string]: 4 }}>Luxury real estate</span>
          <span style={{ ['--i' as string]: 5 }}>Property management</span>
          <span style={{ ['--i' as string]: 6 }}>Dental &amp; healthcare</span>
        </div>
        <p className="pm-reveal">The common thread is that volume is the wrong goal. Four of the right people beats a hundred of the wrong ones, and most accounts are optimised to produce the hundred because that is the number the reporting rewards.</p>

        <h2 className="pm-reveal">The audit</h2>
        <p className="pm-reveal">If you are already spending, I will look at the account and tell you what I see. No charge and no obligation attached to it.</p>
        <div className="pm-docs">
          <div className="pm-doc" style={{ ['--i' as string]: 0 }}>
            <span className="pm-doc-num">01</span>
            <div>
              <h4>The teardown</h4>
              <p className="pm-reveal">What is working, what is not, and where the money is actually going. Channel by channel, with the numbers behind each call.</p>
            </div>
          </div>
          <div className="pm-doc" style={{ ['--i' as string]: 1 }}>
            <span className="pm-doc-num">02</span>
            <div>
              <h4>The strategy</h4>
              <p className="pm-reveal">What I would change and why, including whether the budget belongs on the platform it currently sits on.</p>
            </div>
          </div>
        </div>
        <p className="pm-reveal">If it turns out everything is running well, I will say so. That happens occasionally and it is a useful thing to know.</p>

        <h2 className="pm-reveal">What a month looks like</h2>
        <div className="pm-cadence">
          <div className="pm-beat" style={{ ['--i' as string]: 0 }}><b>Several times a week</b><i>Search terms, bids, creative fatigue, budget that stopped earning its place</i></div>
          <div className="pm-beat" style={{ ['--i' as string]: 1 }}><b>As it happens</b><i>Anything meaningful reaches you when it happens, not four weeks later</i></div>
          <div className="pm-beat" style={{ ['--i' as string]: 2 }}><b>Monthly</b><i>A written report on spend, what it produced, and what changed</i></div>
        </div>
        <p className="pm-reveal">Most of the work is small and continuous. Accounts get reviewed several times a week rather than once before a report is due.</p>
        <p className="pm-reveal">You get a written report monthly covering spend, what it produced, and what changed. If something meaningful happens in between, you hear about it then rather than four weeks later.</p>
        <p className="pm-reveal">And when you email, you get me. Not a ticket, not an account coordinator, and not a Monday morning status call that exists to fill an hour.</p>

        <h2 className="pm-reveal">What I do not do</h2>
        <div className="pm-not">
          <span>SEO</span>
          <span>Social media management</span>
          <span>Content calendars</span>
          <span>Branding</span>
          <span>Email marketing</span>
        </div>
        <p className="pm-reveal">All useful, none of it what I am good at. Paid media is a full discipline on its own and the people who claim all of it are usually doing one thing properly. If you need the rest, I would rather point you at someone than pretend.</p>

        <h2 className="pm-reveal">The honest constraint</h2>
        <p className="pm-reveal">I keep the client list small because the work does not scale the way an agency needs it to. Running an account properly takes real attention, and attention is the thing that runs out first.</p>
        <p className="pm-reveal">Which means there are stretches where I have no capacity at all. If you reach out and the timing is wrong, I will tell you that rather than take the retainer and stretch myself across one more account.</p>

        <div className="pm-divider" />

        <h2 className="pm-reveal">Where ReCapture comes in</h2>
        <p className="pm-reveal">This site is mostly about a piece of software, so it is worth explaining how the two relate.</p>
        <p className="pm-reveal">ReCapture exists because of the consulting work, not alongside it. After a decade of buying media I kept running into the same wall: every number an ad platform learns from starts at the moment somebody presses submit. The people who filled in half a form and left were invisible to every system — the CRM, the analytics, and the platforms doing the optimising.</p>
        <p className="pm-reveal">So the campaigns were being optimised against a fraction of real demand, and there was no way to fix that from inside an ad account. It had to be built.</p>

        <PhaseFlow />

        <p className="pm-note">The order matters. Installing recovery software on top of broken tracking captures nothing useful and tells you nothing true. The plumbing comes first.</p>

        <div className="pm-cta">
          <h3>Want an outside read on your account?</h3>
          <p className="pm-reveal">Send exports for whatever period you are comfortable sharing. You will get the teardown and the strategy back, at no cost and with nothing attached.</p>
          <Link href="/contact" className="pm-cta-btn">Request the audit</Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}
