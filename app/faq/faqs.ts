export interface FAQ {
  q: string
  a: string
}

export interface FAQCategory {
  name: string
  faqs: FAQ[]
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'Getting Started',
    faqs: [
      {
        q: 'What does ReCapture actually do?',
        a: 'ReCapture watches every form on your site and detects when a visitor starts filling it out but leaves without submitting. We capture the email and partial info they entered, score the lead, and (on Pro) automatically reach out via SMS, email, or AI voice callback within 60 seconds, recovering revenue that would otherwise vanish.',
      },
      {
        q: 'Does it actually work on mobile?',
        a: 'Yes, and this is worth knowing because it is where most tools quietly fail. On iOS, a normal browser request gets killed the moment a page unloads, so when someone fills in a form on their phone and closes the tab, the capture is sent and then cancelled mid-flight. It looks like it works in testing and silently drops the lead in the real world. We found this in our own product and rebuilt the exit path around sendBeacon, which browsers are specifically built to complete after a page closes. If you are evaluating other recovery tools, test one on a phone before you believe the demo.',
      },
      {
        q: 'Why does mobile matter so much?',
        a: 'Because that is where the inquiries are. In most of the industries we serve, well over half of form starts happen on a phone, outside business hours, when nobody is at the desk. A recovery tool that works on desktop and fails on mobile is missing the majority of what it was bought to catch. The dashboard shows you your own mobile share rather than making you take our word for it.',
      },
      {
        q: 'What happens if someone abandons the same form twice?',
        a: 'They are matched to the existing record rather than creating a duplicate, and the follow-up logic accounts for what was already sent. Someone who came back and tried again is a stronger signal than a first abandonment, and their intent score reflects that.',
      },
      {
        q: 'Does this work if we do not have much traffic?',
        a: 'It depends on what a customer is worth to you, not on traffic volume. If you get forty form starts a month and lose twenty-five of them, recovering two or three is meaningful when a client is worth thousands. If your average customer is worth eighty dollars, this is the wrong product regardless of traffic. The honest test is your customer value, not your visitor count.',
      },
      {
        q: 'What does your free form audit actually tell me?',
        a: 'What we can measure and nothing more: how your form is built, how many fields it asks for, whether abandonment tracking exists, what analytics can and cannot see inside it, and how it compares to benchmarks for your industry. We deliberately do not estimate your lost revenue. We do not know your traffic or your average customer value, and those are numbers only you have. Most audits guess at that figure. We took ours out on purpose.',
      },
      {
        q: 'Does it work with my existing forms?',
        a: 'Yes. ReCapture works with any HTML form: Webflow, WordPress, Squarespace, custom-built sites, marketing landing pages, anything. Setup is a single line of JavaScript. No form rebuilds, no plugins, no API integration required.',
      },
      {
        q: 'How long does setup take?',
        a: 'About 5 minutes. You drop one line of JavaScript on your website (or paste it into Google Tag Manager). We send a welcome email with the exact code and a setup video. Most clients are seeing live abandonment data within an hour of signing up.',
      },
      {
        q: 'Will it slow down my website?',
        a: 'No. The script is 26KB raw and 8.5KB gzipped, which is what actually travels over the wire. It loads asynchronously and does not block rendering, so it sits outside the critical path your Core Web Vitals are measured on. It does load on every page, because the visitor journey and live visitor view need to know where someone has been, but it only starts watching fields when it finds a form on the page. On a page with no form it costs you the download and nothing else.',
      },
    ],
  },
  {
    name: 'Privacy & Compliance',
    faqs: [
      {
        q: 'Is it legal to capture data from a form that was never submitted?',
        a: 'Yes, and it is the same mechanism ecommerce has used for abandoned carts for over a decade. The visitor voluntarily entered the information on your site, into your form, for the purpose of contacting you. Nothing is taken from another site, nothing is purchased, and no tracking follows them anywhere else. The capture happens on your own property, on data the person chose to type there.',
      },
      {
        q: 'What fields do you refuse to capture?',
        a: 'Passwords, Social Security numbers, payment card fields, and anything matching those patterns are excluded before the data leaves the browser. This is enforced by field type and by pattern matching, not by configuration, so it cannot be accidentally switched off.',
      },
      {
        q: 'How long do you keep captured data?',
        a: 'You set the retention period. Records can be purged on a schedule or deleted individually on request. If someone asks to be removed, that removal is complete rather than a suppression flag. A data processing agreement is available.',
      },
      {
        q: 'Do we need consent language on our form?',
        a: 'For email recovery, the visitor entering their address on your form is the relevant act. If you enable SMS or voice, you need explicit consent language at the point of entry, and we provide template wording for that, though your own counsel should approve the final version. For regulated industries we would rather you over-document this than under-document it.',
      },
      {
        q: 'Can we use ReCapture if we handle PHI?',
        a: 'ReCapture is HIPAA-ready by design across every plan. We capture contact fields only, never free text, and sensitive fields are excluded at the code level. A Business Associate Agreement is available on any plan and is executed on request. From the Group plan upward it is part of standard onboarding rather than something you have to ask for. If you handle PHI, email hello@userecapture.com and we will send the agreement.',
      },
      {
        q: 'How do you handle GDPR and CCPA?',
        a: 'ReCapture blocks EU, UK, and Swiss visitors entirely, so no data from those regions is captured in the first place. For California and elsewhere: we honour recognised consent platforms including OneTrust, Cookiebot, and CookieYes, support deletion requests within 72 hours, keep full audit logs, and never sell, rent, or share captured data with third parties. A DPA is available. We are not lawyers and this is not legal advice \u2014 if you operate in a regulated jurisdiction, have your counsel review our trust page.',
      },
      {
        q: 'Who owns the lead data?',
        a: 'You do. 100%. ReCapture is the processor; you are the controller. All captured leads are exportable as CSV anytime. If you cancel, we delete all data within 30 days, or immediately on written request.',
      },
    ],
  },
  {
    name: 'The Dashboard',
    faqs: [
      {
        q: 'What is Live Visitors?',
        a: 'It shows who is on your site right now: what page they are on, where they came from, what device, and an intent score that climbs as they engage. When someone opens your form, you see it happen. When they leave without submitting, you already know who they were. Most recovery tools tell you about someone after they are gone. This is the part before that.',
      },
      {
        q: 'What is the attention strip?',
        a: 'When a high-intent inquiry from the last forty-eight hours has not been contacted, a strip appears at the top of the dashboard. It opens to show each person waiting, how long they have been waiting, and what the matter is worth. Work the list and it disappears. It is the only thing on the page that can be finished, which is the difference between a dashboard someone checks monthly and one an intake team opens every morning.',
      },
      {
        q: 'What does the intent score actually mean?',
        a: 'It reflects how far someone got and how long they spent before leaving. Someone who filled six fields over four minutes is a different prospect from someone who typed a name and closed the tab. The score bands them hot, warm, or cool so a team knows where to spend the hour they have rather than working a list top to bottom.',
      },
      {
        q: 'What does the dashboard actually show me?',
        a: 'Ten metrics across two rows. The top row is what is happening now: live visitors, inquiries captured, how much of the form people finish, how long they spend, and what hour your inquiries actually arrive. The bottom row is what it is worth: pipeline at risk, recovered revenue, recovery rate, what share arrives outside business hours, and what share comes from a phone. Each one opens into the detail behind it, including a field-by-field breakdown of exactly where people quit.',
      },
      {
        q: 'Can I export the data?',
        a: 'Yes. Anything on screen exports to CSV with whatever filters you have applied, including the lead score, completion percentage, time on form, device, and whether a recovery message went out. You can also set the comparison window to whatever period you report on: seven days, fourteen, thirty, ninety, or the current month, with the prior period alongside it.',
      },
      {
        q: 'Can I see which field people quit at?',
        a: 'Yes, and it is usually the most actionable thing on the dashboard. A field-by-field chart shows how many people completed each question. Everyone fills in a name. Fewer give a phone number. Almost nobody reaches an open text box asking them to describe their situation. The steepest fall is the field costing you the most, and removing it, reordering it, or making it optional is normally the fastest improvement available.',
      },
      {
        q: 'Does it show when inquiries actually come in?',
        a: 'A twenty-four hour breakdown split between business hours and after hours, with your busiest windows ranked underneath. For most high-consideration businesses the peak is well outside office hours, from a phone. If yours sits at nine in the evening, that is a staffing conversation rather than a marketing one, and this is the chart that starts it.',
      },
      {
        q: 'Can I tell which captured leads are worth chasing first?',
        a: 'The pipeline value splits into hot, warm, and cool based on how far each person got before leaving. Hot inquiries got furthest into the form and are the most likely to respond, so that is where a team should spend the hour they have rather than working a list top to bottom.',
      },
      {
        q: 'Can I see how recovery is performing over time?',
        a: 'The recovery funnel shows captured, then emailed, then contacted, then converted. Seeing them separately matters because the gaps mean different things: a gap between captured and contacted is a speed problem, and a gap between contacted and converted is a follow-up problem. One is fixed with automation, the other with a conversation.',
      },
      {
        q: 'Can I change the reporting period?',
        a: 'Every number on the dashboard responds to one control. Last seven days, fourteen, thirty, ninety, or the current calendar month, with the comparison against the prior period of the same length sitting beside it. Set it to whatever window you report on and the whole page follows.',
      },
    ],
  },
  {
    name: 'The AI Voice Callback (Beta)',
    faqs: [
      {
        q: 'How does the AI voice callback work?',
        a: 'This feature is currently in beta. When a high-value lead abandons your form, our AI agent calls them within 60 seconds using the phone number they entered. The voice is natural, the script is custom to your business, and the goal is to either book the appointment on the call or warm them up for your team. The feature is in beta \u2014 built and tested, but not yet run on live traffic, so we are not going to quote you a conversion figure we cannot stand behind.',
      },
      {
        q: 'What exactly does Marissa say to my leads?',
        a: "Marissa identifies herself as your business's automated assistant calling about the inquiry they started but didn't finish. She references the specific service they were asking about, answers basic questions, and offers to book a consultation directly. She does not pretend to be human.",
      },
      {
        q: 'Can I customize the AI voice script?',
        a: "Yes. Pro and Enterprise plans get full script editing in the dashboard. You set the greeting, the qualifying questions, the booking flow, and the closing. Marissa speaks your business's tone, knows your services, and respects your guardrails (for example: don't quote pricing on the call).",
      },
      {
        q: 'Why offer AI voice at all if you tell law firms to turn it off?',
        a: 'Because it is the right tool in some places and the wrong tool in others. For a med spa or a dealership, a callback within sixty seconds while someone is still deciding is enormously effective. For a Texas law firm, a live automated call runs into Rule 7.03 and we would rather disable it than defend it. Every channel is a switch. The judgment is in knowing which ones to leave off, and any vendor who tells you everything is always appropriate has not thought about it.',
      },
      {
        q: 'Can I control when messages go out?',
        a: 'Yes. You set the delay, anywhere from immediate to a couple of hours, and you set quiet hours, which suppress overnight sends entirely. An instant message to someone who reached out at a difficult moment is often the wrong instinct even where it is permitted. For sensitive verticals we default to a delay measured in hours rather than seconds.',
      },
      {
        q: 'Will this annoy my customers? Is it creepy?',
        a: 'No. We only capture what visitors voluntarily typed into your form fields, the same data they would have sent if they finished. AI callbacks include one-keypress opt-out. Most prospects appreciate a fast follow-up when they meant to submit but got interrupted.',
      },
      {
        q: 'What about Do Not Call lists and TCPA compliance?',
        a: 'AI callbacks only fire when someone actively started your contact form, so there is a documented inquiry behind every call. Calls run inside the call-hours window you set and never during your configured quiet hours, both enforced in your own timezone. Every opt-out goes to a single do-not-contact list that suppresses email, SMS and voice together, and one-keypress opt-out is honoured on calls. ReCapture does not itself screen numbers against the national Do Not Call registry, and firms with their own registry obligations should keep their existing process. We are not your TCPA compliance layer, and we do not claim to be.',
      },
    ],
  },
  {
    name: 'Multi-Location & Franchise',
    faqs: [
      {
        q: 'What does the Pro plan actually cover?',
        a: 'One website. Every page on it, every form on it, and every landing page under that domain is included \u2014 the script is installed once and covers the whole site. If you are running ten landing pages for different practice areas or campaigns, those are all part of the same plan. Pro is scoped to a single domain; a second website or multiple physical locations is where Enterprise starts.',
      },
      {
        q: 'How does this work across multiple locations?',
        a: 'It deploys once at the account level and runs across every site you own. For a group with fifteen practices or forty franchise locations, that is one implementation rather than forty. Each location gets its own view, and reporting rolls up so you can see the whole system or drill into a single site.',
      },
      {
        q: 'Can each location see only its own leads?',
        a: 'Yes. Location managers see their own inquiries. Corporate sees everything, with the ability to compare locations side by side. That comparison is usually the most valuable part, because it tends to reveal that two or three locations are producing most of the recovered revenue while others are not working the list at all.',
      },
      {
        q: 'We are a franchisor. Do our franchisees pay, or do we?',
        a: 'Either, and we have seen both work. Some brands deploy it centrally and fund it as a corporate benefit. Others make it available and let individual franchisees opt in. If you are running franchise development marketing at corporate and local lead generation at the unit level, those are usually configured separately.',
      },
      {
        q: 'Is franchise development a good fit for this?',
        a: 'It is the highest-value version of the problem we have found. A franchise development inquiry is worth six figures in fees plus years of royalties, and those forms are long because you need financial qualification up front. People start them, reach the net worth question, and stop. That is hesitation rather than disqualification, and today it is indistinguishable from someone who never visited. Recovering one a quarter is not a marginal number.',
      },
      {
        q: 'Our locations use different website platforms. Does that matter?',
        a: 'No. It is one script tag and it does not care what the site is built on: WordPress, Squarespace, Wix, Webflow, a custom build, or a franchise site provider. If some locations run a corporate template and others built their own, both are covered the same way.',
      },
      {
        q: 'Can recovered leads route to the right location automatically?',
        a: 'Yes. Leads route based on which site they came from, and they push into whatever CRM that location uses. If you run one system across the whole group, they land in one place with the location tagged.',
      },
      {
        q: 'What does this cost for a multi-location group?',
        a: 'Enterprise starts at one thousand nine hundred ninety-seven dollars a month and is priced per deployment rather than per location. What moves the number is the number of sites, the integrations required, and the reporting you need. A group with a lot of locations and simple requirements often costs less than a smaller group with complex routing and custom reporting.',
      },
    ],
  },
  {
    name: 'Integrations',
    faqs: [
      {
        q: 'How is this different from a CRM like HubSpot or Salesforce?',
        a: "ReCapture isn't a CRM, it's the recovery layer that feeds your CRM. CRMs manage leads who already submitted; ReCapture captures the 60-70% who never submit. We push everything we recover into your existing CRM via webhook so your team works in the tools they already know.",
      },
      {
        q: 'Which CRMs and platforms do you integrate with?',
        a: 'GoHighLevel and webhook-to-any-CRM are live. HubSpot, Salesforce, Follow Up Boss, AppFolio, Boulevard, Pipedrive, and Zoho route via Zapier or Make. Plus Slack, SMS, email, Google Ads offline conversions, Meta Conversions API, and Cal.com / Calendly for booking.',
      },
      {
        q: "What if my CRM isn't listed?",
        a: "Use Zapier, Make, or our generic webhook endpoint. ReCapture pushes lead data as standard JSON, and any tool that can receive a webhook can integrate. For native integrations we don't yet have, we'll build them for Enterprise customers.",
      },
    ],
  },
  {
    name: 'Pricing & Trial',
    faqs: [
      {
        q: 'What happens during the 7-day trial?',
        a: "You get full access to every feature on the Pro plan for 7 days. A card is required to start (so there's no friction when you decide to continue), but you can cancel anytime in your dashboard before day 7 and you won't be charged. After day 7, billing starts automatically at $397/mo.",
      },
      {
        q: "What's the difference between Pro, Group and Enterprise?",
        a: 'Pro at $397/mo covers one website, including every form and page on it and any subdomains: capture, intent scoring, the live visitor view, the dashboard, campaign attribution, conversion signals to Meta and Google, exclusion signals for the leads you mark as junk, Breakpoint field diagnostics, Leak Map, Response Guard escalation, Finish Anywhere, branded recovery emails, SMS and Slack alerts and webhooks. A BAA is available on request. Group at $897/mo covers two to four locations and adds one rolled-up dashboard across every site, per-location reporting and custom-branded recovery emails per site. Enterprise starts at $1,997/mo for five or more locations and is priced by location count, adding white-glove onboarding, a BAA as standard and a dedicated account manager.',
      },
      {
        q: 'Do you offer an annual discount?',
        a: 'Yes, roughly 15% off on annual plans for Pro and Enterprise. Email hello@userecapture.com to set it up.',
      },
      {
        q: 'What if I have multiple websites?',
        a: 'Pro covers one website, including every form, page and subdomain on it. From two locations up it moves to Group at $897/mo for two to four locations, then Enterprise from $1,997/mo for five or more, priced by location count. Group and Enterprise add one rolled-up dashboard across every site, per-site reporting and custom-branded recovery emails per site.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. One click in your account dashboard. No retention call, no "are you sure" gauntlet, no surprise charges. If you cancel mid-cycle, your access continues through the end of the paid period.',
      },
    ],
  },
  {
    name: 'For Law Firms',
    faqs: [
      {
        q: 'Can a law firm follow up on an intake form nobody submitted?',
        a: 'In most cases yes, and the rule is more specific than people expect. Comment 2 to Texas Disciplinary Rule 7.03 states that a communication is not a solicitation if it is made in response to a request for information. Someone who opens your intake form and types their name has requested information about your services. That said, we are a software company and not your counsel, and we would want your own firm to confirm that reading. Our recommended configuration is built to hold up even if a regulator disagreed with it.',
      },
      {
        q: 'What does Texas Rule 7.03 actually say about this?',
        a: 'Rule 7.03(b) restricts soliciting a non-client through what 7.03(a)(1) defines as communication in a live or electronically interactive manner. Comment 4 explains that communications sent by regular mail or e-mail do not involve that kind of contact, and Comment 6 states plainly that a targeted e-mail offering legal services is not prohibited by subsection (b), because an e-mail can be ignored, set aside, or reconsidered. So the question turns almost entirely on which channel you use, not on whether you follow up at all.',
      },
      {
        q: 'Which channels do you recommend a Texas firm turn off?',
        a: 'AI voice callback. A live automated phone call is squarely the conduct Rule 7.03(b) was written to reach, so we disable it by default for legal deployments rather than on request. Email is expressly carved out in Comment 6 and is what we run. SMS sits in a genuinely unsettled middle, and we will not enable it for a firm without their own counsel signing off. We would rather propose a smaller deployment than one that creates a problem.',
      },
      {
        q: 'What if the person who abandoned our form is the opposing party?',
        a: 'This is the issue we raise first with family law firms, and it matters more than the advertising rules. A divorce has two sides, both looking for representation, often in the same week and often through the same search. One may already be your client. The other may already be represented, which brings Rule 4.02 into play. No software can run a conflict check. That needs your records and your judgment. What software can do is make sure nothing goes out until a person has looked, which is why we recommend hold-for-review as the default for family law.',
      },
      {
        q: 'What is hold-for-review?',
        a: 'Recovery messages queue in the dashboard instead of sending automatically. Your intake team runs the name against your conflict system and releases the message manually. It lowers the recovery rate, and we recommend it anyway for family law and criminal defense. Worth knowing: the captured inquiry has value even if no message is ever sent. You see that someone reached out, who they were, and when. Whether to act on it stays a human decision.',
      },
      {
        q: 'Will the message reference the case type or what they typed?',
        a: 'No. Recovery messages for legal deployments reference only that the person reached out and that the form did not come through. Nothing about the practice area, nothing about what they described. For family law and criminal defense this is a discretion requirement, nothing that would be a problem if someone else saw the phone. It is also a hedge against the message reading as targeted solicitation.',
      },
      {
        q: 'Do we need to mark messages as ADVERTISEMENT?',
        a: "That is your firm's call and we support either position. Rule 7.03(d)(2) requires solicitation communications to be plainly designated, and Comment 10 specifies that for e-mail the first word of the subject line must be ADVERTISEMENT in capital letters. A firm may reasonably conclude this is unnecessary because the message responds to a request for information. A firm may equally decide to mark it out of caution. It is a template setting on our end.",
      },
      {
        q: 'Do you integrate with Clio and Lawmatics?',
        a: 'By webhook, yes. ReCapture pushes every captured inquiry to any endpoint in real time with all the fields attached, and both Clio Grow and Lawmatics accept inbound webhooks, directly or through Zapier. To be precise about what that means: we have not built a purpose-made Clio or Lawmatics connector, so there is no button in your settings that says connect. Someone configures the webhook once at your end or ours, and from then on it runs. Which route makes sense depends on how your intake actually works, so we would want to hear that before recommending one.',
      },
    ],
  },
  {
    name: 'Results & Support',
    faqs: [
      {
        q: 'What is Leak Map?',
        a: 'A form is one way somebody gives up on reaching you, and on a phone it is rarely the most common one. People tap your phone number and nobody answers. They open your booking page, see the next slot is three weeks out, and close it. Leak Map records all of those alongside the form starts, so you can see every route somebody tried and which one is losing you the most. A phone tap carries no name or email, so these are not leads to follow up. They are intelligence. If most of your call taps happen outside business hours, that tells you something no analytics product can.',
      },
      {
        q: 'What is Finish Anywhere?',
        a: 'Somebody fills in half your form on their phone, gets interrupted, and leaves. Every other recovery tool sends them a link and asks them to start again, which almost nobody does. Finish Anywhere asks them to finish in the text message instead. If they gave a phone number and stopped before answering one of your questions, we text them that question, worded the way your form words it. They reply in plain English and the answer lands on the lead next to everything they already typed. It only runs for clients who have switched it on and confirmed they have added a consent line to their form, because this is an unsolicited text to somebody who never pressed submit. Replying STOP at any point adds them to the do-not-contact list that suppresses email, SMS and voice together.',
      },
      {
        q: 'What is Response Guard?',
        a: 'Catching the inquiry is half the job. Somebody actually following up is the other half, and that is where most of these are lost. The alert arrives, the front desk is busy, it scrolls up the channel, and a lead worth thousands sits untouched for three days. Response Guard puts a clock on every high-intent inquiry. If nobody has marked it contacted, the alerts escalate at five minutes, then fifteen, then thirty, each one carrying the value of the lead so the cost of waiting is visible. The clock runs only during your own opening hours, so nothing is flagged overdue at midnight, and it stops the moment somebody marks the lead contacted or converted. It is deliberately limited to leads that showed real intent, because an alarm that fires on everything gets ignored within a week.',
      },
      {
        q: 'What are exclusion signals?',
        a: 'Meta and Google only ever learn from your conversions. Nothing tells them what a bad lead looks like, so they keep finding more of those as well as the good ones. ReCapture sends the other half of the picture. Bots and instant bounces are flagged automatically, and anything else your team marks as junk goes back to the platforms as a disqualified signal. Meta receives a zero-value event, so value-based optimisation learns the pattern is worthless. Google receives a retraction, which removes the conversion from the account outright. We call them exclusion signals rather than negative conversions, because nothing is being damaged: the platforms are simply being told the truth about which leads were worth having.',
      },
      {
        q: 'Are these actually good leads, or just people who changed their mind?',
        a: 'This is the right thing to be skeptical about, so here is the honest version. Someone who typed their name, email, and phone number into your form and then left is not a browser. They are further into your funnel than almost anyone else who visited your site that day. Most abandonment is interruption rather than rejection: a phone rang, a child needed something, they got to a field they were not ready to answer. The intent score exists precisely so you can tell the difference. Someone who filled six fields over four minutes is a different prospect from someone who typed a name and closed the tab, and we band them so your team works the strong ones first.',
      },
      {
        q: 'How do we know it is actually working?',
        a: 'Because before ReCapture, those people had no record anywhere. There is no missed call, no partial submission, no line in a report. So every captured inquiry is by definition something you did not have. The dashboard tracks the full funnel (captured, contacted, converted) and everything exports to CSV, so you can reconcile it against your own booking system rather than taking our number for it.',
      },
      {
        q: 'Who actually follows up with these leads?',
        a: 'The automated message goes out on its own, and that part requires nobody. What happens next is a decision. Some businesses let the email do the work and only get involved when someone replies. Others treat the dashboard as a call list and have their front desk work it each morning, which is what the attention strip is built for. The honest answer is that recovery rates go up when a human works the list, and the businesses that get the most out of this are the ones who give it fifteen minutes a day rather than none.',
      },
      {
        q: 'How many customers do you have?',
        a: 'We are early, and we are choosing partners deliberately rather than selling on volume. That means the businesses working with us now get direct access to the person who built the product, and the roadmap gets shaped around how they actually operate rather than around a guess. If that sounds like the wrong stage to be at, it probably is for some. If it sounds like the right one, we would rather have that conversation honestly than pad a customer count.',
      },
      {
        q: "What's a typical recovery rate?",
        a: 'Honestly, nobody can tell you before you run it \u2014 recovery rate depends on your offer, how fast you follow up, and how far people got in the form before they left. Anyone quoting you a number up front is guessing. Run the trial and you will have your own figure rather than someone else\u2019s.',
      },
      {
        q: "Who's behind ReCapture?",
        a: 'Built by Asherton Chraibi, founder, based in Dallas, TX. 10+ years running digital marketing for high-ticket service businesses across plastic surgery, dermatology, fertility, dental, luxury real estate, and multifamily. Built ReCapture solo after seeing the same problem at every client: thousands of dollars in ad spend lost to invisible form abandonment.',
      },
    ],
  },
]
