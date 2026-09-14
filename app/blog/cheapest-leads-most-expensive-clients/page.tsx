import Link from 'next/link'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'
import Image from 'next/image'

export const metadata = {
  title: 'Your Cheapest Leads Are Probably Your Most Expensive Clients',
  description: 'Almost every ad account reports cost per lead. Almost none report cost per client. For businesses where one customer is worth thousands, those two numbers routinely point in opposite directions.',
  alternates: { canonical: '/blog/cheapest-leads-most-expensive-clients' },
  openGraph: {
    title: 'Your Cheapest Leads Are Probably Your Most Expensive Clients',
    description: 'Almost every ad account reports cost per lead. Almost none report cost per client. For businesses where one customer is worth thousands, those two numbers routinely point in opposite directions.',
    url: 'https://www.userecapture.com/blog/cheapest-leads-most-expensive-clients',
    siteName: 'ReCapture',
    type: 'article',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Your+Cheapest+Leads+Are+Your+Most+Expensive+Clients&eyebrow=Blog',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Cheapest Leads Are Probably Your Most Expensive Clients',
    description: 'Almost every ad account reports cost per lead. Almost none report cost per client. Those two numbers routinely point in opposite directions.',
    images: ['https://www.userecapture.com/api/og?title=Your+Cheapest+Leads+Are+Your+Most+Expensive+Clients&eyebrow=Blog'],
  },
}

export default function Post() {
  return (
    <div className="blog-post-page">
      <BlogNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Your Cheapest Leads Are Probably Your Most Expensive Clients',
            datePublished: '2026-09-14',
            author: { '@type': 'Person', name: 'Asherton Chraibi' },
            publisher: {
              '@type': 'Organization',
              name: 'ReCapture',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.userecapture.com/icon.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.userecapture.com/blog/cheapest-leads-most-expensive-clients',
            },
          }),
        }}
      />

      <div className="blog-post-header">
        <Link href="/blog" className="blog-post-back">← Back to Insights</Link>
        <div className="blog-post-tag">Paid Media</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">September 14, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">7 min read</span>
        </div>
        <h1>Your Cheapest Leads Are Probably Your Most Expensive Clients</h1>
        <p className="post-subtitle">Almost every ad account reports cost per lead. Almost none report cost per client. For a business where one customer is worth thousands, those two numbers routinely point in opposite directions, and the reporting makes the wrong one look like success.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '0 0 2rem 0' }}>
        <Image src="/blog-cheapest-leads.webp" alt="Cost per lead and cost per client point in opposite directions" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="blog-post-divider"><hr /></div>

      <div className="blog-post-body">

        <h2>The Number Everyone Watches</h2>
        <p>Open any monthly advertising report and cost per lead will be near the top. It is easy to calculate, easy to compare month over month, and easy to celebrate when it falls. An agency that drops your cost per lead from $180 to $95 has an obvious story to tell, and most clients will take it as good news without asking a second question.</p>
        <p>The second question is the one that matters. Of those leads, how many became customers, and what did each customer actually cost?</p>
        <p>For a business selling a $60 product, the distinction rarely changes much. For a custom home builder, a plastic surgeon, a law firm, or anyone whose average client is worth five figures, the distinction is frequently the difference between a campaign that works and one that quietly wastes a year of budget.</p>

        <h2>Why The Two Numbers Diverge</h2>
        <p>The cheapest leads in almost any account come from the broadest targeting. Wide keyword matching, low-intent search terms, display placements, broad interest audiences on Meta. These produce volume, and volume drives cost per lead down.</p>
        <p>They also produce the least qualified people. Somebody who clicked a display banner while reading the news is not in the same position as somebody who searched for a specific procedure by name at eleven at night.</p>
        <p>So the account optimises toward the cheap traffic, because that is what the reported metric rewards. Six months later the lead count is up, the cost per lead is down, the report looks excellent, and the number of actual clients has not moved. Occasionally it has fallen, because the sales team is spending its time on people who were never going to buy.</p>

        <h2>What This Looks Like In Practice</h2>
        <p>A custom home builder whose homes start at $1.4 million does not need a hundred leads a month. They need four or five people a year who can genuinely finance a build and are serious about starting one. An account structured to maximise form fills will bury those five people in ninety-five who are curious, browsing, or years away.</p>
        <p>A plastic surgery practice has a variation on the same problem. A consultation request costs the same to generate whether the person is booking a surgical procedure or asking about the price of a single syringe of filler. The reporting treats both as one lead. The revenue does not.</p>
        <p>A law firm sees it most sharply. Personal injury click prices routinely run past a hundred dollars on competitive terms. A firm can spend twenty thousand dollars in a month, report two hundred leads at a hundred dollars each, and sign three cases. That is roughly $6,600 per signed case, which may be fine or may be terrible depending on the case values, and nothing in the standard monthly report tells them which.</p>

        <h2>Geography Makes It Worse</h2>
        <p>The pattern compounds in multi-location businesses, and it compounds badly.</p>
        <p>Suppose a practice runs campaigns across Dallas, Fort Worth and a smaller outlying market. Click costs in the smaller market might be a third of those in Dallas. If the account is optimising toward cheap leads, budget will migrate steadily to the cheap market. That looks like efficiency on the report.</p>
        <p>It is only efficiency if the case values are equivalent, and frequently they are not. The expensive market is expensive because that is where the competition, the population density and the spending power sit. An account that quietly moves its budget toward cheap clicks is often moving it away from the customers worth having.</p>
        <p>Nobody makes this decision deliberately. It happens because the optimisation is working exactly as instructed, toward the metric it was given.</p>

        <h2>The Fix Is Boring And It Works</h2>
        <p>The fix is to give the platforms the outcome you actually care about instead of the proxy.</p>
        <p>That means tracking what happens after the lead. Not just the form submission, but whether that person became a customer and what they were worth. Then feeding that back into Google and Meta as a conversion event, so the optimisation is aimed at the real thing rather than at form fills.</p>
        <p>Both platforms support this. Google Ads takes offline conversion imports. Meta accepts server-side conversion events through the Conversions API, including a value. Most accounts never use either, because it requires connecting the advertising to whatever system holds the sales outcome, and that is a piece of work nobody is being paid to do.</p>
        <p>The work is not difficult. It is just unglamorous, and it does not produce a number that looks better next month.</p>

        <h2>The Part Nobody Measures At All</h2>
        <p>There is a further gap underneath this one, and it is the reason we built ReCapture.</p>
        <p>Every number discussed so far begins at the form submission. Cost per lead, conversion rate, cost per client, all of it starts counting the moment somebody presses submit.</p>
        <p>But a large share of the people who arrive on a consultation form never press it. They type a name, an email, sometimes a phone number, and then something interrupts them. To every system the business owns, those people are indistinguishable from someone who landed on the wrong page and left immediately.</p>
        <p>They are not the same. Someone who filled in four fields of an intake form was actively in the middle of contacting you. They are frequently more qualified than the leads the account is celebrating, because they got far enough to be entering their phone number.</p>
        <p>You paid for all of them. You are only measuring some of them.</p>

        <h2>Where To Start</h2>
        <p>If you want to know whether your account has this problem, there is a quick test. Ask whoever runs your advertising what a signed client costs you, broken out by campaign and by location. Not a lead. A client.</p>
        <p>If the answer arrives quickly and confidently, your account is in better shape than most. If the answer is a cost per lead, or takes a week to assemble, or comes back as a range, you have found the thing worth fixing before you change anything else.</p>
        <p>It is the least exciting audit finding there is, and it is almost always the most expensive one.</p>

        <div className="blog-post-cta">
          <h3>See what your forms are losing before submit</h3>
          <p>ReCapture captures the contact details people enter into your forms and abandon, and sends them back to Meta and Google as real conversion signal.</p>
          <Link href="/demo" className="blog-post-cta-btn">Try the live demo</Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}
