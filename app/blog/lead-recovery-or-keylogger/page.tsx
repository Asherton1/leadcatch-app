import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'

export const metadata = {
  title: 'Is It Lead Recovery, or Is It a Keylogger? How to Tell the Difference',
  description: 'Form-abandonment recovery and keystroke logging can look similar from the outside. They are not the same thing. Here are four questions that tell you which one a vendor is actually selling you.',
  alternates: { canonical: '/blog/lead-recovery-or-keylogger' },
  openGraph: {
    title: 'Is It Lead Recovery, or Is It a Keylogger? How to Tell the Difference',
    description: 'Form-abandonment recovery and keystroke logging can look similar from the outside. They are not the same thing. Here are four questions that tell you which one a vendor is actually selling you.',
    url: 'https://www.userecapture.com/blog/lead-recovery-or-keylogger',
    siteName: 'ReCapture',
    type: 'article',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Is+It+Lead+Recovery+or+a+Keylogger&eyebrow=Blog',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is It Lead Recovery, or Is It a Keylogger?',
    description: 'Four questions that tell you which one a form-abandonment vendor is actually selling you.',
    images: ['https://www.userecapture.com/api/og?title=Is+It+Lead+Recovery+or+a+Keylogger&eyebrow=Blog'],
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
            headline: 'Is It Lead Recovery, or Is It a Keylogger? How to Tell the Difference',
            description: 'Form-abandonment recovery and keystroke logging can look similar from the outside. They are not the same thing. Here are four questions that tell you which one a vendor is actually selling you.',
            image: 'https://www.userecapture.com/api/og?title=Is+It+Lead+Recovery+or+a+Keylogger&eyebrow=Blog',
            datePublished: '2026-08-14T00:00:00Z',
            dateModified: '2026-08-14T00:00:00Z',
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
        <Link href="/blog" className="blog-post-back">&larr; Back to Insights</Link>
        <div className="blog-post-tag">Privacy</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">August 14, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">6 min read</span>
        </div>
        <h1>Is It Lead Recovery, or Is It a Keylogger? How to Tell the Difference</h1>
        <p className="post-subtitle">Form-abandonment recovery and keystroke logging can look identical in a demo. They are not the same thing &mdash; and the difference is where your legal exposure lives. Here are four questions that get a straight answer from any vendor.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '0 0 2rem 0' }}>
        <Image src="/blog-compliance-problem.webp" alt="How to tell honest form-abandonment recovery from keystroke logging" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="blog-post-divider"><hr /></div>

      <article className="blog-post-body">
          <p>
            If you run an agency or a practice, you have probably had a form-abandonment tool pitched to you. The promise is appealing: recover the visitors who start filling out a contact form and leave before submitting. But if you have any instinct for privacy, a quieter question sits underneath the pitch &mdash; <em>how, exactly, is it getting that data?</em>
          </p>
          <p>
            That question is the right one to ask, because the answer separates two very different kinds of software that look identical in a demo. One is honest lead recovery. The other is closer to a keylogger. Here is how to tell them apart &mdash; and the four questions that get you a straight answer from any vendor.
          </p>

          <h2>The two ends of the spectrum</h2>
          <p>
            At one end are session-replay and keystroke-logging tools. These record what a visitor does keystroke by keystroke, sometimes replaying the entire session like a video. They capture everything typed, including things a visitor entered and then deleted, and often everything in every field. This is the category that has drawn a wave of lawsuits under wiretapping statutes like California&rsquo;s CIPA and Pennsylvania&rsquo;s WESCA, on the argument that intercepting keystrokes without consent is unlawful interception.
          </p>
          <p>
            At the other end is honest form-abandonment recovery. It reads a field&rsquo;s completed value &mdash; the finished email address, the finished phone number &mdash; so a business can follow up on an inquiry the visitor was actively in the middle of sending. No keystroke stream. No session video. No capture of things typed and erased.
          </p>
          <p>
            From the buyer&rsquo;s chair these can be pitched with the same words: &ldquo;we recover abandoned leads.&rdquo; The difference is entirely in the mechanism, and the mechanism is where your legal and reputational exposure lives. So don&rsquo;t evaluate the pitch. Evaluate the mechanism.
          </p>

          <h2>The four questions</h2>
          <p>
            Ask any form-abandonment vendor these four questions. A vendor operating honestly can answer all four plainly and immediately. A vendor who gets vague on any of them is telling you something.
          </p>

          <h3>1. Do you log keystrokes or record sessions?</h3>
          <p>
            The answer you want is a flat no. Reading a completed field value is a fundamentally different act from capturing every keystroke as it happens. Keystroke logging and session replay are the practices courts have been skeptical of; field-completion capture is not the same thing. If a vendor cannot clearly say they do neither, assume they do at least one.
          </p>

          <h3>2. Do you capture free-text fields?</h3>
          <p>
            This is the question that matters most for law firms and medical practices, and it is the one most vendors hope you do not ask. A contact form often includes a free-text box: &ldquo;describe your legal matter,&rdquo; &ldquo;what symptoms are you experiencing,&rdquo; &ldquo;tell us about your situation.&rdquo; The substance of an inquiry lives in that box &mdash; and it is exactly the data you least want captured, stored, and forwarded to a CRM or a Slack channel. An honest tool captures contact details only (name, email, phone) and never touches the free-text body. Ask directly. The answer should be that free-text is never captured.
          </p>

          <h3>3. Do you respect consent and geography?</h3>
          <p>
            Two parts. First: if a visitor is in the EU, UK, or Switzerland, are they captured at all? Under GDPR they should not be, by default. Second: if the site runs a consent platform like OneTrust, Cookiebot, or CookieYes, and the visitor declined tracking, does the tool honor that? An honest tool blocks EU/UK/Swiss visitors outright and stands down when a consent platform says no. A tool that fires on everyone regardless of location or consent is creating exposure that lands on you, the deployer &mdash; not the vendor.
          </p>

          <h3>4. Can a person opt out, and does it stick?</h3>
          <p>
            Anyone who was recovered should be able to say &ldquo;stop,&rdquo; and that request should suppress every future contact across every channel &mdash; email, SMS, and voice &mdash; permanently. Ask how opt-out is enforced and whether it persists. If the answer is hand-wavy, the do-not-contact list is probably not real infrastructure.
          </p>

          <h2>Why the mechanism is the customer&rsquo;s problem, not just the vendor&rsquo;s</h2>
          <p>
            Here is the part vendors rarely volunteer: when a form-abandonment tool creates legal exposure, the exposure usually lands on the business that deployed it, not the vendor who built it. If you are an agency putting this on a client&rsquo;s site, that exposure runs through you to your client. Which is exactly why the honest answer to &ldquo;how does it capture&rdquo; is not a technicality &mdash; it is the whole decision. You are not just buying a feature. You are inheriting a mechanism.
          </p>

          <h2>How ReCapture answers the four questions</h2>
          <p>
            We built ReCapture to pass its own test, and we would rather show you than tell you. No keystroke logging and no session recording &mdash; we read completed contact fields only. No free-text capture &mdash; message boxes and &ldquo;describe your situation&rdquo; fields are never stored, transmitted, or forwarded anywhere. Passwords and sensitive fields (SSN, card numbers) are hard-excluded at the code level. EU, UK, and Swiss visitors are blocked entirely, and the tool honors OneTrust, Cookiebot, and CookieYes when present. Every recovered contact can opt out, and that opt-out is enforced across email, SMS, and voice, permanently.
          </p>
          <p>
            All of it is laid out in plain language on our <Link href="/privacy">Privacy &amp; Data</Link> page and in full detail on our <Link href="/trust">Trust &amp; Compliance</Link> page. For the communication side of compliance &mdash; TCPA, CAN-SPAM, GDPR, and HIPAA as they govern follow-up &mdash; we wrote a companion piece on <Link href="/blog/the-form-abandonment-compliance-problem">the form-abandonment compliance problem</Link>.
          </p>
          <p>
            We are a tool, not a law firm, and we will not tell you any vendor is &ldquo;100% compliant&rdquo; for every jurisdiction &mdash; anyone who does is overselling. What we will tell you is exactly how the software behaves, in writing, so you can make an informed call for yourself and your clients. That is the standard the whole category should be held to. Ask the four questions. Hold every vendor, including us, to the answers.
          </p>

          <div className="blog-post-cta" style={{ marginTop: '3rem', padding: '2rem', borderRadius: '12px', background: '#111', border: '1px solid #1f1f1f' }}>
            <p style={{ margin: 0, color: '#a1a1aa', lineHeight: 1.75 }}>
              Want to see exactly what ReCapture captures and what it never touches? Read the{' '}
              <Link href="/privacy" style={{ color: '#ff6b35' }}>Privacy &amp; Data</Link> page, or{' '}
              <Link href="/contact" style={{ color: '#ff6b35' }}>get in touch</Link> with any question.
            </p>
        </div>
      </article>

      <Footer />
    </div>
  )
}
