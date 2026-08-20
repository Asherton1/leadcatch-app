import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'

const TITLE = 'Your Ad Platforms Are Optimizing on a Fraction of Your Demand'
const DESC = 'Meta and Google only learn from the people who press submit. Everyone who started your form and left is invisible to them. Here is what that costs, and how server-side conversion events close the gap.'
const URL = 'https://www.userecapture.com/blog/ad-platforms-optimizing-on-a-fraction'
const OG = 'https://www.userecapture.com/api/og?title=Optimizing+on+a+Fraction+of+Your+Demand&eyebrow=Blog'

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/blog/ad-platforms-optimizing-on-a-fraction' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: 'ReCapture',
    type: 'article',
    images: [{ url: OG, width: 1200, height: 630, alt: 'ReCapture' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Ad Platforms Are Optimizing on a Fraction of Your Demand',
    description: 'Meta and Google only learn from the people who press submit. Here is what that costs.',
    images: [OG],
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
            headline: TITLE,
            description: DESC,
            image: OG,
            datePublished: '2026-08-20',
            author: { '@type': 'Person', name: 'Asherton Chraibi' },
            publisher: {
              '@type': 'Organization',
              name: 'ReCapture',
              logo: { '@type': 'ImageObject', url: 'https://www.userecapture.com/icon.png' },
            },
          }),
        }}
      />

      <div className="blog-post-header">
        <Link href="/blog" className="blog-post-back">&larr; Back to Insights</Link>
        <div className="blog-post-tag">Paid Media</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">August 20, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">7 min read</span>
        </div>
        <h1>Your Ad Platforms Are Optimizing on a Fraction of Your Demand</h1>
        <p className="post-subtitle">Meta and Google only find out that someone wanted what you sell when that person presses submit. Everyone who started your form and walked away is invisible to them. That gap is not a reporting problem &mdash; it is a training-data problem, and it compounds every day your campaigns keep running.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '0 0 2rem 0' }}>
        <Image src="/blog-ad-platforms-fraction.webp" alt="Aerial view of a housing development at dusk with only a few lights on" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="blog-post-divider"><hr /></div>

      <article className="blog-post-body">
        <p>
          Here is a mechanic most people who buy media never stop to think about, because it is buried one layer below the dashboard.
        </p>
        <p>
          Meta and Google do not decide who to show your ads to by reading your targeting settings. Not really. They decide by studying the people who converted, building a statistical picture of what those people looked like, and then going to find more of them. The targeting you set is a fence around the search area. The conversion data is what actually teaches the algorithm who to look for inside it.
        </p>
        <p>
          Which raises the question nobody asks: <em>who counts as a conversion?</em>
        </p>
        <p>
          Someone who pressed submit. That is it. That is the entire population your ad platforms learn from.
        </p>

        <h2>The people the algorithm never meets</h2>
        <p>
          Baymard Institute&rsquo;s 2024 research puts form abandonment at 60&ndash;70% across the web. Take a hundred people who cared enough about your business to start typing their name into your inquiry form. Roughly thirty finish. Seventy do not.
        </p>
        <p>
          Those seventy did something meaningful. They found you, read enough to be interested, clicked into a form, and started giving you their contact information. Then a call came in, or a child needed something, or the page was awkward on their phone, or they wanted to check one more thing first. They left.
        </p>
        <p>
          To Meta and Google, none of that happened. No conversion event fired, so no signal exists. Those seventy people are indistinguishable from someone who landed on your page by accident and bounced in two seconds.
        </p>
        <p>
          So the algorithm builds its picture of your ideal customer from thirty people instead of a hundred. Every lookalike audience, every bid adjustment, every decision about which impression is worth buying &mdash; all of it derived from the minority who happened to finish a form.
        </p>

        <h2>Why this compounds rather than sits still</h2>
        <p>
          A one-time reporting gap would be annoying. This is worse, because the platforms are learning continuously and every cycle builds on the last one.
        </p>
        <p>
          The algorithm finds people who resemble your converters. Those people convert. That reinforces the pattern. Meanwhile an entire population of genuinely interested prospects &mdash; the ones who start forms and get interrupted &mdash; never enters the model at all, so the platform never learns to look for them.
        </p>
        <p>
          If the people who abandon differ systematically from the people who finish, and they do, then you are not just missing volume. You are training the system to avoid a segment of your market. Mobile users abandon at higher rates than desktop users. People browsing at eleven at night abandon more than people at their desk at two in the afternoon. Longer forms abandon more than short ones, which means your highest-consideration purchases leak the hardest.
        </p>
        <p>
          None of that reaches the algorithm.
        </p>

        <h2>What closing the gap actually looks like</h2>
        <p>
          Both platforms already have the mechanism for this. It is not a workaround or a loophole &mdash; it is documented infrastructure that serious advertisers have used for years.
        </p>
        <p>
          Meta calls it the Conversions API. Instead of relying only on a browser pixel firing when someone completes an action, your server sends the conversion event directly to Meta. Google Ads has the equivalent in offline conversion import, built for exactly the case where a conversion happens somewhere the browser never saw it.
        </p>
        <p>
          The pieces that matter if you are evaluating this:
        </p>
        <p>
          <strong>Identifiers are hashed before they leave.</strong> Email and phone are SHA-256 hashed on your side. Meta matches the hash against its own hashed records. The raw values never travel.
        </p>
        <p>
          <strong>Events carry a deterministic ID.</strong> Without one, a server-side event and a browser pixel event for the same person get counted twice, which corrupts the data instead of improving it. With a stable event ID derived from the session, the platform collapses them into one.
        </p>
        <p>
          <strong>The events are genuinely incremental.</strong> This is the part that makes the whole argument hold. An abandoned form start, by definition, never fired a pixel &mdash; there was no submission to fire on. So every one of these events is signal the platform did not have. You are not inflating a number. You are filling a hole.
        </p>

        <h2>The honest boundary</h2>
        <p>
          It would be easy to end this by promising that your cost per lead drops by some percentage. We are not going to, and you should be skeptical of anyone who does.
        </p>
        <p>
          Feeding conversion data to an ad platform is a mechanism, not an outcome. What happens next depends on the person managing the account: how the campaigns are structured, what the creative looks like, how budget is allocated, whether anyone is watching. A media buyer with better data will usually do better work. A neglected account with better data is still a neglected account.
        </p>
        <p>
          So the claim we will make is narrow and checkable: your campaigns are currently optimizing on the people who finished. There is a larger group who started and did not. That group can be sent through as conversion events, properly hashed and properly deduplicated. Whether that translates into better performance is the job of whoever runs the ads &mdash; and it should be, because that is their expertise, not ours.
        </p>
        <p>
          What we can tell you is how many of them there were, and that until now, nobody was counting them at all.
        </p>

        <h2>Where to start</h2>
        <p>
          If you want to know whether this matters for your business, the first question is not about conversion APIs. It is simpler: <em>how many people start your forms and do not finish?</em>
        </p>
        <p>
          Most businesses cannot answer that, because standard analytics sees the pageview and the submission and nothing in between. That number is the whole thing. If it is small, none of this is worth your attention. If it is what the research suggests, then the majority of your demonstrated demand has never once been visible to the platforms deciding where your ad budget goes.
        </p>
        <p>
          You can read more about what we capture and how we handle it on our <Link href="/privacy" style={{ color: '#ff6b35' }}>privacy page</Link>, or see how the data appears in practice on the <Link href="/dashboard-tour" style={{ color: '#ff6b35' }}>dashboard tour</Link>.
        </p>
      </article>

      <Footer />
    </div>
  )
}
