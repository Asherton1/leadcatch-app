import Link from 'next/link'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'

export const metadata = {
  title: 'Can a Law Firm Follow Up on an Intake Form Nobody Submitted? — ReCapture Blog',
  description: 'Texas Disciplinary Rule 7.03 restricts how lawyers may solicit. Before deploying form-abandonment recovery to a Texas firm, we read the rule. Here is what we found, and the problem nobody is talking about.',
  alternates: { canonical: '/blog/can-a-law-firm-follow-up-on-an-abandoned-intake-form' },
  openGraph: {
    title: 'Can a Law Firm Follow Up on an Intake Form Nobody Submitted? — ReCapture Blog',
    description: 'Texas Disciplinary Rule 7.03 restricts how lawyers may solicit. Here is what the rule actually says about abandoned intake forms — and the conflict problem nobody is talking about.',
    url: 'https://www.userecapture.com/blog/can-a-law-firm-follow-up-on-an-abandoned-intake-form',
    siteName: 'ReCapture',
    type: 'article',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Rule+7.03+and+the+Abandoned+Intake+Form&eyebrow=Blog',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can a Law Firm Follow Up on an Intake Form Nobody Submitted? — ReCapture Blog',
    description: 'What Texas Rule 7.03 actually says about abandoned intake forms — and the conflict problem nobody is talking about.',
    images: ['https://www.userecapture.com/api/og?title=Rule+7.03+and+the+Abandoned+Intake+Form&eyebrow=Blog'],
  },
}

export default function Post() {
  return (
    <div className="blog-post">
      <BlogNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Can a Law Firm Follow Up on an Intake Form Nobody Submitted?',
            description: 'Texas Disciplinary Rule 7.03 restricts how lawyers may solicit. Here is what the rule actually says about abandoned intake forms.',
            image: 'https://www.userecapture.com/api/og?title=Rule+7.03+and+the+Abandoned+Intake+Form&eyebrow=Blog',
            datePublished: '2026-08-09T00:00:00Z',
            dateModified: '2026-08-09T00:00:00Z',
            author: {
              '@type': 'Person',
              name: 'Asherton Chraibi',
              url: 'https://www.userecapture.com/about',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ReCapture',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.userecapture.com/icon.png',
              },
            },
          }),
        }}
      />

      <div className="blog-post-header">
        <div className="blog-post-meta">
          <span className="blog-post-date">August 9, 2026</span>
          <span className="blog-post-dot">&middot;</span>
          <span className="blog-post-readtime">8 min read</span>
        </div>
        <h1>Can a Law Firm Follow Up on an Intake Form Nobody Submitted?</h1>
        <p className="post-subtitle">Someone started your intake form at nine on a Sunday night and left halfway through. You have their name and their email. The marketing answer is obvious. The ethics answer is the one that matters — so before deploying to a Texas firm, we went and read the rule.</p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto 2.25rem', padding: '0 2rem' }}>
        <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderLeft: '3px solid #ff6b35', borderRadius: '0 14px 14px 0', padding: '1.75rem 2rem' }}>
          <h3 style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '1.25rem', fontWeight: 400, color: '#fff', margin: '0 0 0.6rem 0', lineHeight: 1.35 }}>
            This is not legal advice.
          </h3>
          <p style={{ fontSize: '0.9375rem', color: '#666', lineHeight: 1.7, margin: 0 }}>
            We build software. We are not a law firm, and nothing here is a substitute for your own counsel. What follows is the diligence we did before proposing a deployment to a Texas practice, written down so a firm can check our reasoning rather than take our word for it.
          </p>
        </div>
      </div>

      <div className="blog-post-divider"><hr /></div>

      <div className="blog-post-body">
        <p>A woman opens a family law firm&apos;s intake form at 9:14 PM on a Sunday. She types her first name, her last name, her email address, and half a phone number. Then she stops.</p>

        <p>Maybe someone walked into the room. Maybe she reached the field asking her to describe her situation and could not find the words. Maybe she simply was not ready. Whatever the reason, she closes the tab and the form is never submitted.</p>

        <p>Here is what the firm has: a name, an email address, and the knowledge that this person came to their website at nine on a Sunday night and started reaching out for help.</p>

        <p>Here is what the firm does with it: nothing. Because the inquiry never submitted, it exists nowhere. Not in Clio. Not in Lawmatics. Not in an intake coordinator&apos;s morning queue. As far as every system the firm owns is concerned, she was never there.</p>

        <p>Now suppose the firm could see her. Suppose there were a layer that captured what she typed before she left. The marketing answer to what happens next is obvious and immediate: email her in the morning and say you noticed she started to reach out.</p>

        <p>The ethics answer is not obvious at all. And for a law firm, the ethics answer is the only one that counts.</p>

        <h2>The Rule Everyone Reaches For Is the Wrong One</h2>

        <p>Ask most marketing vendors about compliance and they will start talking about the TCPA. It is the rule people know: prior express consent, quiet hours, do-not-call lists. All of it real, all of it relevant to text messages and automated calls.</p>

        <p>But for a law firm, the TCPA is the second question. The first one sits in the state bar rules, and in Texas that means Part VII of the Texas Disciplinary Rules of Professional Conduct — specifically Rule 7.03, which governs how a lawyer may solicit professional employment.</p>

        <p>That distinction matters because the two rules protect against different things and impose different limits. A message can be perfectly compliant with the TCPA and still be a problem under 7.03. Any vendor who has only thought about the federal side has done half the work.</p>

        <h2>Is a Recovery Message Even a Solicitation?</h2>

        <p>This is the threshold question, and the rule addresses it more directly than we expected.</p>

        <p>Comment 2 to Rule 7.03 draws the line this way: a lawyer&apos;s communication is not a solicitation if it is directed to the general public, or if it is made in response to a request for information — including an electronic search for information.</p>

        <p>A person who navigates to a firm&apos;s own website, opens the intake form, and types their name and email address has requested information about that firm&apos;s services. They initiated the contact. They were not approached. A follow-up message completes a conversation that the prospective client started.</p>

        <p>The structure of the rule supports reading it that way. Rule 7.03(b) is framed as a restriction on soliciting employment from a non-client, and Comments 3 and 4 explain what the rule is protecting against: a lawyer approaching someone who has not sought them out, who may be in a vulnerable moment, and who may feel pressure to respond on the spot. A person sitting on a firm&apos;s own intake form, halfway through filling it in, is not that person.</p>

        <p>We think that conclusion is right. We also do not think a software company should build a deployment that depends on it. So the configuration described below is chosen to hold up even if a regulator disagreed with everything in this section.</p>

        <h2>The Channel Matters More Than the Message</h2>

        <p>Here is the part that surprised us, and it is the most practically useful thing in the rule.</p>

        <p>Rule 7.03(b) does not restrict all outreach. It restricts a specific category, defined in 7.03(a)(1) as regulated telephone, social media, or other electronic contact — and that term is defined as communication in a live or electronically interactive manner.</p>

        <p>Live. Interactive. Those words are doing enormous work.</p>

        <p>Comment 4 explains the reasoning and, in doing so, carves out the rest. It observes that communications can be sent by regular mail or e-mail, or by other means that do not involve communication in a live or electronically interactive manner, and that these forms make it possible for the public to be informed with minimal risk of overwhelming a person&apos;s judgment.</p>

        <p>Comment 6 removes any remaining ambiguity. It states that a targeted e-mail offering legal services is a solicitation communication within the meaning of Rule 7.01(b)(2), but is not prohibited by subsection (b) of Rule 7.03 — because an e-mail can easily be ignored, set aside, or reconsidered.</p>

        <p>Read that again, because it resolves the question this article opened with. <strong>Email is expressly permitted.</strong> Not tolerated, not a gray area — addressed directly in the official commentary and carved out.</p>

        <p>Which means the answer to &ldquo;can a firm follow up on an abandoned intake form&rdquo; turns almost entirely on how, not whether.</p>

        <h2>What This Means for AI Voice Callbacks</h2>

        <p>We build a product that includes an AI voice callback. It is the feature that makes people sit up in a demo. A prospect abandons a form and their phone rings within sixty seconds with a natural-sounding voice offering to help.</p>

        <p>For a Texas law firm, we recommend turning it off.</p>

        <p>A live automated phone call to a prospective client is communication in a live, electronically interactive manner. That is not an edge case or a gray area — it is the precise conduct 7.03(b) was written to reach. Whatever argument exists that a recovery message is not a solicitation at all, we would not want a firm relying on it while a robot is calling someone at nine on a Sunday night.</p>

        <p>So for legal deployments, voice is disabled by default. Not on request. By default.</p>

        <p>SMS sits in a genuinely unsettled middle. A text is asynchronous like an email — it can be ignored, set aside, reconsidered. But Comment 10 contemplates text messages as a solicitation channel and imposes labeling requirements on them, which suggests the drafters were thinking about texts differently than emails. We do not enable SMS for a legal deployment without the firm&apos;s own counsel affirmatively approving it.</p>

        <h2>The Problem Nobody Is Talking About</h2>

        <p>Everything above is the compliance question a firm expects a vendor to have thought about. This next part is the one we think actually matters more, and we have not seen anyone else raise it.</p>

        <p>In family law, the person who abandons your intake form might be the opposing party.</p>

        <p>Sit with that for a second. A divorce has two sides. Both of them are looking for representation, often in the same week, often through the same Google search, often landing on the same three firms in the same city. One of them may already be your client. The other may already be represented by counsel.</p>

        <p>An automated message to that person is not a marketing misstep. It is a conflicts problem, and if they are represented, it is potentially a Rule 4.02 problem — communication with a person represented by another lawyer.</p>

        <p>The same shape appears elsewhere. In criminal defense, a co-defendant. In business litigation, someone on the other side of a matter the firm is already handling. In estate work, a family member with an adverse interest to an existing client.</p>

        <p>No software can solve this. A conflict check requires the firm&apos;s own records and the firm&apos;s own judgment, and no vendor should pretend otherwise. What software can do is make sure nothing goes out until a human has looked.</p>

        <p>So for family law, we recommend hold-for-review: recovery messages queue in the dashboard rather than sending automatically, and the intake team releases them after running the name. It lowers the recovery rate. We would rather propose the configuration the practice area actually calls for than the one that makes our numbers look better.</p>

        <p>And here is the part worth saying plainly: <strong>the captured inquiry has value even if no message is ever sent.</strong> The firm sees that someone reached out, who they were, and when. Whether to act on it stays a human decision. That alone is information the firm does not have today.</p>

        <h2>What a Compliant Deployment Actually Looks Like</h2>

        <p>Putting it together, here is the configuration we would apply to a Texas firm on day one. Every setting is firm-controlled and reversible.</p>

        <p><strong>Email only.</strong> Voice disabled. SMS disabled until counsel approves it.</p>

        <p><strong>No practice-area detail in the message.</strong> The email references only that the person reached out and that the form did not come through. Nothing about the matter type, nothing they typed about their situation. For family law and criminal defense this is a discretion requirement — nothing that would be a problem if someone else saw the phone. It is also a hedge against the message reading as targeted solicitation.</p>

        <p><strong>A delay, not an instant send.</strong> Comment 1 to Rule 7.03 identifies the value of a cooling-off period. An immediate message to someone who just reached out at a difficult moment is the wrong instinct even where it is permitted. We set the delay in hours and suppress overnight sends entirely.</p>

        <p><strong>ADVERTISEMENT marking, at the firm&apos;s election.</strong> Rule 7.03(d)(2) requires solicitation communications to be plainly designated, and Comment 10 specifies that for e-mail the first word of the subject line must be ADVERTISEMENT in capital letters. A firm may reasonably conclude this is unnecessary because the message responds to a request for information. A firm may equally decide to mark it out of caution. It is a template setting, and either position is defensible.</p>

        <p><strong>Hold-for-review for family law.</strong> As above.</p>

        <p><strong>A complete audit trail.</strong> Every message logged with timestamp, recipient, content, delivery status, and opt-out state, exportable on demand.</p>

        <h2>The Question to Ask Any Vendor</h2>

        <p>If a firm is evaluating any tool that touches prospective client communication, there is one question that separates vendors who have done this work from vendors who have not.</p>

        <p><strong>Ask them which channels they would turn off, and why.</strong></p>

        <p>A vendor who wants to sell you everything will tell you everything is compliant. A vendor who has actually read Part VII will tell you that voice is a problem in Texas, that SMS is unsettled, that email is expressly carved out in Comment 6, and that in family law the bigger risk is not the advertising rules at all — it is who might be on the other end of that form.</p>

        <p>We would rather be the second kind, even when it means recommending a smaller deployment than we could sell.</p>

        <h2>Where This Leaves the Woman at 9:14 PM</h2>

        <p>She started reaching out. She did not finish. Under the configuration described here, the firm sees her name and email in a queue the next morning, someone runs a conflict check, and if she is clear she gets a short email that says the firm noticed she started to get in touch and is here whenever she is ready.</p>

        <p>No robot calls her at nine on a Sunday. Nothing references her situation. Nothing lands on her phone that would be a problem if someone else picked it up.</p>

        <p>And if the conflict check flags something, nothing goes out at all — but the firm knows she was there, which is more than they knew before.</p>

        <p>That is a narrower version of what the technology can do. For a law firm, narrower is the point.</p>
      </div>

      <div className="blog-post-author">
        <div className="blog-post-author-avatar">AC</div>
        <div>
          <div className="blog-post-author-name">Asherton Chraibi</div>
          <div className="blog-post-author-role">Founder, ReCapture</div>
        </div>
      </div>

      <div className="blog-post-cta">
        <div className="blog-post-cta-box">
          <h3>Built for firms that have to get this right</h3>
          <p>Email-only by default. Hold-for-review for family law. A full audit trail on every message. We will send the compliance documentation before you ever see a demo.</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/for-legal">See how it works for law firms &rarr;</Link>
            <Link href="/form-audit" style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#a1a1aa' }}>Free intake form audit</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
