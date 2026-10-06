'use client'

import { useState } from 'react'
import SignalShift from './SignalShift'
import SignalCards from './SignalCards'
import LeakFlow from './LeakFlow'
import BreakpointSim from './BreakpointSim'
import LiveVisitorsDemo from './LiveVisitorsDemo'
import './feature-showcase.css'

type Key = 'signals' | 'leak' | 'breakpoint' | 'live' | 'finish' | 'guard'

const TABS: { key: Key; name: string }[] = [
  { key: 'signals', name: 'Intent Signals' },
  { key: 'leak', name: 'Leak Map' },
  { key: 'breakpoint', name: 'Breakpoint' },
  { key: 'live', name: 'Live Visitors' },
  { key: 'finish', name: 'Finish Anywhere' },
  { key: 'guard', name: 'Response Guard' },
]

export default function FeatureShowcase() {
  const [open, setOpen] = useState<Key>('signals')

  return (
    <div className="fs">
      <div className="fs-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            type="button"
            className={'fs-tab' + (open === t.key ? ' is-on' : '')}
            onClick={() => setOpen(t.key)}
          >
            <span className="fs-tab-name">{t.name}</span>
          </button>
        ))}
      </div>

      <div className="fs-stage">
        {open === 'signals' && (
          <div className="fs-panel" key="signals">
            <p className="fs-kicker">Intent Signals</p>
            <h3 className="fs-h">
              <span className="fs-h-muted">Your ad platforms are learning</span>
              <br />
              from a fraction of your demand.
            </h3>
            <p className="fs-p">
              Meta and Google only find out someone was interested when they press submit.
            </p>

            <SignalShift />
            <SignalCards />

            <p className="fs-p fs-p-last">
              It runs the other way too. Bots, four-second bounces and anything your team
              marks as junk go back to the platforms as an exclusion signal, so they stop
              hunting for more people like that. Every other tool in this category only ever
              sends the wins. Nobody tells the platforms what a bad lead looks like, which is
              why they keep finding them.
            </p>
            <p className="fs-p fs-p-last">
              You keep running your campaigns exactly as you do now. The platforms just stop
              working from the leftovers, and you finally know which ones are working.
            </p>
          </div>
        )}

        {open === 'leak' && (
          <div className="fs-panel" key="leak">
            <p className="fs-kicker">Leak Map</p>
            <h3 className="fs-h">
              <span className="fs-h-muted">A form is only one way</span>
              <br />
              people give up on you.
            </h3>
            <p className="fs-p">
              They tap your number at nine at night and nobody answers. They open your
              booking page and see a three week wait. Every one of those is somebody who
              wanted to talk to you, and nothing you own records a single one.
            </p>

            <LeakFlow />
          </div>
        )}

        {open === 'breakpoint' && (
          <div className="fs-panel" key="breakpoint">
            <p className="fs-kicker">Breakpoint</p>
            <h3 className="fs-h">
              <span className="fs-h-muted">You know your forms leak.</span>
              <br />
              You do not know where.
            </h3>
            <p className="fs-p">
              Analytics stops at the pageview. Your CRM starts at the submission. The part in
              between, where people actually give up, is invisible to every tool you own.
            </p>

            <BreakpointSim />

            <p className="fs-p fs-p-last">
              Breakpoint names the field, split by mobile and desktop, using the sessions that
              never submitted. One broken phone input on a mobile layout can cost a third of
              your inquiries, and nothing else you run would ever tell you.
            </p>
          </div>
        )}

        {open === 'live' && (
          <div className="fs-panel" key="live">
            <div className="fs-split">
              <div>
                <p className="fs-kicker">Live Visitors</p>
                <h3 className="fs-h">
                  <span className="fs-h-muted">Not just who you lost.</span>
                  <br />
                  Who is on your site right now.
                </h3>
                <p className="fs-p">
                  Recovery is the second half. The first is seeing the people who are still
                  deciding. Live Visitors shows who is on your site at this moment, what page
                  they are on, where they came from, and how engaged they are.
                </p>
                <p className="fs-p">
                  When someone opens your form, you see it happen. When they leave without
                  submitting, you already know who they were.
                </p>
              </div>
              <LiveVisitorsDemo />
            </div>
          </div>
        )}

        {open === 'finish' && (
          <div className="fs-panel" key="finish">
            <p className="fs-kicker">Finish Anywhere</p>
            <h3 className="fs-h">
              <span className="fs-h-muted">Nobody goes back</span>
              <br />
              and fills it in again.
            </h3>
            <p className="fs-p">
              Every recovery tool sends a link and asks the person to start over. Retyping
              what you already typed is worse than never starting, so almost nobody does it.
              This removes the going back.
            </p>

            <div className="fa-thread">
              <div className="fa-msg fa-out">
                Hi, it&apos;s Northgate Furniture. You started getting in touch and did not
                quite finish. No need to go back to the site, just reply here and tell us:
                what are you looking for. Reply STOP to opt out.
              </div>
              <div className="fa-msg fa-in">a dining table for six</div>
              <div className="fa-msg fa-out">
                Perfect, that is everything we needed. Someone will be in touch shortly.
              </div>
            </div>

            <p className="fs-p fs-p-last">
              The answer lands on the lead next to everything they already typed. No link, no
              second visit, no retyping. It only runs for businesses who have added a consent
              line to their form, because this is a text to somebody who never pressed submit,
              and that is not a corner worth cutting.
            </p>
          </div>
        )}

        {open === 'guard' && (
          <div className="fs-panel" key="guard">
            <p className="fs-kicker">Response Guard</p>
            <h3 className="fs-h">
              <span className="fs-h-muted">Catching the lead</span>
              <br />
              was the easy part.
            </h3>
            <p className="fs-p">
              The alert arrives, the front desk is busy, it scrolls up the channel, and an
              inquiry worth thousands sits there for three days. Response Guard puts a clock
              on it.
            </p>

            <div className="rg-ladder">
              <div className="rg-step">
                <span className="rg-when">5 minutes</span>
                <span className="rg-msg">Still waiting: Megan Whitfield, worth about $6,500, came in five minutes ago and nobody has picked it up.</span>
              </div>
              <div className="rg-step">
                <span className="rg-when">15 minutes</span>
                <span className="rg-msg">Megan Whitfield has been sitting for fifteen minutes. Speed matters more than anything else here.</span>
              </div>
              <div className="rg-step rg-step-last">
                <span className="rg-when">30 minutes</span>
                <span className="rg-msg">Megan Whitfield has gone thirty minutes with no contact. This one is going cold.</span>
              </div>
            </div>

            <p className="fs-p fs-p-last">
              The money is the part that works. Three uncontacted leads is easy to ignore.
              Nineteen thousand dollars waiting is not. The clock only runs during your own
              opening hours, so nothing is overdue at midnight, and it stops the moment
              somebody marks the lead contacted.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
