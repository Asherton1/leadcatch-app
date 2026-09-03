import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'

const TITLE = 'Your Best Channel Might Look Like Your Worst One'
const DESC = 'Attribution reports count submissions. So the channels that produce careful, high-consideration prospects score worse than the ones producing impulsive clicks — and businesses defund the channel that was actually working.'
const URL = 'https://www.userecapture.com/blog/your-best-channel-looks-like-your-worst'
const OG = 'https://www.userecapture.com/api/og?title=Your+Best+Channel+Might+Look+Like+Your+Worst&eyebrow=Blog'

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/blog/your-best-channel-looks-like-your-worst' },
  openGraph: {
    title: TITLE, description: DESC, url: URL, siteName: 'ReCapture', type: 'article',
    images: [{ url: OG, width: 1200, height: 630, alt: 'ReCapture' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Best Channel Might Look Like Your Worst One',
    description: 'Attribution counts submissions. That quietly penalises the channels producing your most considered prospects.',
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
            datePublished: '2026-09-03',
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
        <div className="blog-post-tag">Attribution</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">September 3, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">6 min read</span>
        </div>
        <h1>Your Best Channel Might Look Like Your Worst One</h1>
        <p className="post-subtitle">Every attribution report you have ever read counts submissions. That sounds neutral until you notice what it does to channels that attract careful, expensive, slow-moving buyers &mdash; the ones who think before they type, and often stop halfway.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '0 0 2rem 0' }}>
        <Image src="/blog-best-channel.webp" alt="A crowd in near darkness, only a few faces catching the light" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="blog-post-divider"><hr /></div>

      <article className="blog-post-body">
        <p>
          Consider two campaigns running in the same account, same budget, same month.
        </p>
        <p>
          Campaign A sends four hundred people to your site. Twelve submit the form. Campaign B sends four hundred people. Six submit. Any dashboard you open will tell you Campaign A is twice as good, and any sensible marketer will shift budget accordingly.
        </p>
        <p>
          Now add the part nobody measures. Campaign A produced twenty people who started the form and left. Campaign B produced ninety. Same four hundred visitors, and one campaign generated more than four times as much demonstrated interest &mdash; none of which appears anywhere.
        </p>

        <h2>Why this is systematic, not occasional</h2>
        <p>
          It would be a curiosity if it happened at random. It does not. It skews in a consistent direction, and always against the same kind of channel.
        </p>
        <p>
          Abandonment rises with hesitation. Someone booking a haircut fills the form. Someone deciding whether to file for divorce, book a surgical consultation, or inquire about a nine-hundred-thousand-dollar house does not do it on the first pass. They start, they stop, they think, they come back. Baymard Institute puts general form abandonment at 60 to 70 percent, and considered purchases sit at the top of that band rather than the bottom.
        </p>
        <p>
          Abandonment also rises with form length, and forms get longer as stakes get higher. A legal intake form asks for matter type and county. A consultation request asks about medical history. Those fields exist for good reasons, and every one of them is a place to stop.
        </p>
        <p>
          Put those together and the pattern is uncomfortable: <strong>the channels bringing you the most serious prospects will score worst on any report that counts submissions.</strong> Not because they perform badly, but because seriousness looks like hesitation, and hesitation looks like failure.
        </p>

        <h2>What that costs in practice</h2>
        <p>
          Budget follows the numbers, so the channel producing thoughtful prospects gets cut and the one producing quick clicks gets scaled. Six months later lead volume is up and close rate is down, and nobody can point to the decision that caused it.
        </p>
        <p>
          The ad platforms compound it. Meta and Google optimise on the conversions you report. If your reported conversions skew toward impulsive submitters, the algorithm goes and finds more people like them. The bias does not just sit in a spreadsheet &mdash; it gets baked into who sees your ads next month.
        </p>
        <p>
          None of this involves anyone making a mistake. Every step is defensible. The premise underneath was just wrong.
        </p>

        <h2>Counting the other group</h2>
        <p>
          The fix is not a better attribution model. Multi-touch, data-driven, first click, last click &mdash; they all still start from the same event, which is somebody pressing submit. Reweighting credit among submissions does nothing about the people who never submitted.
        </p>
        <p>
          What changes the picture is counting the abandoned inquiry as an outcome in its own right. Someone who typed their name, their email, and their phone number into your form told you something real. That they closed the tab before finishing is information about their circumstances, not their intent.
        </p>
        <p>
          With those captured and attributed, the comparison actually holds. Campaign A: 12 submissions, 20 abandoned, 32 interested. Campaign B: 6 submissions, 90 abandoned, 96 interested. Same spend. The report you were reading had it backwards.
        </p>

        <h2>What this looks like in a dashboard</h2>
        <p>
          Every inquiry we capture is attributed back to the channel that produced it &mdash; paid search, paid social, organic, referral, direct &mdash; and broken out by campaign name across Google and Meta. Submitted or not.
        </p>
        <p>
          Untagged traffic is handled rather than discarded, which matters more than it sounds. If an agency manages your campaigns, UTM discipline is usually imperfect, and Local Services Ads carry no campaign parameter at all. Anything without tagging is attributed by platform instead of dropped into a bucket labelled direct, which is where a surprising amount of paid traffic quietly ends up.
        </p>
        <p>
          Those same inquiries also go back to Meta and Google as server-side conversion events, so the optimisation bias corrects itself over time rather than compounding.
        </p>

        <h2>The honest limit</h2>
        <p>
          This does not tell you a campaign is good. A channel can generate abandoned inquiries that never turn into anything, and volume of interest is not the same as revenue.
        </p>
        <p>
          What it does is stop you comparing two campaigns on a number that structurally favours one of them. You still have to judge quality, close rate, and what those inquiries were worth. You just get to do it with both groups on the table instead of one.
        </p>
        <p>
          If you want to see the shape of it, the <Link href="/dashboard-tour" style={{ color: '#ff6b35' }}>dashboard tour</Link> walks through the attribution view, and our <Link href="/privacy" style={{ color: '#ff6b35' }}>privacy page</Link> covers exactly what gets captured.
        </p>
      </article>

      <Footer />
    </div>
  )
}
