import Link from 'next/link'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'

const TITLE = 'Thirty Clients, Thirty Logins: Why Agencies Do Not Resell Software'
const DESC = 'Most agencies would happily add a recurring revenue line. What stops them is not margin or interest — it is the operational weight of managing a tool across thirty client accounts. Here is what that actually costs, and what removes it.'
const URL = 'https://www.userecapture.com/blog/thirty-clients-thirty-logins'
const OG = 'https://www.userecapture.com/api/og?title=Thirty+Clients+Thirty+Logins&eyebrow=Blog'

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/blog/thirty-clients-thirty-logins' },
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
    title: 'Thirty Clients, Thirty Logins',
    description: 'Why agencies do not resell software, and what actually removes the barrier.',
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
            datePublished: '2026-08-27',
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
        <div className="blog-post-tag">Agencies</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">August 27, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">6 min read</span>
        </div>
        <h1>Thirty Clients, Thirty Logins: Why Agencies Do Not Resell Software</h1>
        <p className="post-subtitle">Most agency owners would happily add a recurring revenue line to a book they already service. What stops them usually is not margin, and it is not interest. It is the quiet operational weight of running one more tool across thirty separate client accounts.</p>
      </div>

      <div className="blog-post-divider"><hr /></div>

      <article className="blog-post-body">
        <p>
          Ask an agency owner whether they would like recurring revenue and the answer is yes, every time. Retainers churn, projects end, and a monthly line that renews on its own is the thing most independent shops are quietly working toward.
        </p>
        <p>
          Then ask why they have not added one, and the answer gets more specific. It is not that the software was bad or the margin was thin. It is that somebody on the team would have to own it across every client, and nobody has the bandwidth.
        </p>

        <h2>What the overhead actually looks like</h2>
        <p>
          Picture a shop with thirty clients. They sign a reseller agreement for a tool, roll it out, and within a quarter the account manager is carrying a set of tasks nobody scoped.
        </p>
        <p>
          There are thirty separate logins, because most tools are built for one business using them for themselves. Checking whether the tool is working means opening thirty dashboards, one at a time, and remembering what normal looks like for each. When a client asks how it is performing, the answer requires digging into that client&rsquo;s account and assembling something by hand. When a client stops using it, nobody notices for weeks.
        </p>
        <p>
          None of that is hard. All of it is friction, and friction is what kills a resale line. The tool does not get cancelled dramatically; it gets quietly deprioritized until renewal comes up and someone asks whether it is worth it.
        </p>

        <h2>The thing that makes it survivable</h2>
        <p>
          What changes the math is a single screen that answers the two questions an agency actually has: is this working across the book, and is anything on fire right now.
        </p>
        <p>
          That means one login, not thirty. Every client in one view with the numbers that matter beside their name. A rolled-up total across the whole book, because that is the figure an agency principal reports on and the one they show a client when justifying the line item. And an alert when a specific client has something waiting &mdash; not a digest email nobody reads, but a visible flag on the screen they already have open.
        </p>
        <p>
          The alert matters more than it sounds. The failure mode of a resold tool is not that it breaks. It is that it works, captures something valuable, and nobody acts on it in time. A screen that says <em>this client has three inquiries from the last two days that nobody has contacted</em> turns a passive dashboard into a work queue.
        </p>

        <h2>Why this is worth building at all</h2>
        <p>
          There is a version of this argument that is purely about convenience, and it undersells the point.
        </p>
        <p>
          An agency reselling a tool is not just adding revenue. They are taking on the risk that the tool makes them look bad &mdash; that a client pays for something, gets nothing visible from it, and blames the agency who recommended it. That risk is the real reason resale programs stall. Nobody wants to put their name on something they cannot see.
        </p>
        <p>
          Visibility across the whole book is what makes it safe to recommend. If an agency can see at a glance which clients are getting value and which are not, they can intervene before a renewal conversation goes badly. That is worth more to them than the margin.
        </p>

        <h2>What we built</h2>
        <p>
          ReCapture&rsquo;s agency console is one screen for an agency&rsquo;s entire book. Rolled-up totals across every client, a card per client showing inquiries captured, signals sent to their ad platforms, returning prospects, and recovered value, and a flag at the top when any client has inquiries nobody has contacted in the last forty-eight hours.
        </p>
        <p>
          Clicking through opens that specific client&rsquo;s dashboard, so the person working the queue lands exactly where they need to be rather than hunting for the right account.
        </p>
        <p>
          The clients themselves keep their own logins if the agency wants them to have one. Some agencies work every account themselves; others prefer the client sees their own leads and the agency just monitors. Both work from the same setup.
        </p>

        <h2>The honest version</h2>
        <p>
          A console does not make a bad product worth reselling. If the underlying tool does not capture anything a client cares about, no amount of dashboard design fixes that.
        </p>
        <p>
          What it does is remove the reason a good product still does not get resold. The margin was never the problem. The problem was that adding a tool across thirty clients meant adding thirty small ongoing obligations to a team that is already full. Take those away and the decision becomes what it should have been from the start: is this worth having, yes or no.
        </p>
        <p>
          If you run an agency and this describes a conversation you have had internally, you can see how the console works on the <Link href="/dashboard-tour" style={{ color: '#ff6b35' }}>dashboard tour</Link>, or read what ReCapture actually captures on our <Link href="/privacy" style={{ color: '#ff6b35' }}>privacy page</Link>.
        </p>
      </article>

      <Footer />
    </div>
  )
}
