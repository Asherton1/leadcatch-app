import Link from 'next/link'
import Footer from '../../components/Footer'
import BlogNav from '../../components/BlogNav'
import '../blog.css'
import '../../landing.css'
import Image from 'next/image'

export const metadata = {
  title: 'Your Form Has a Field That Kills People. You Cannot See Which One.',
  description: 'Analytics stops at the pageview. Your CRM starts at the submission. The part in between, where people actually give up, is invisible to every tool you own.',
  alternates: { canonical: '/blog/the-field-that-kills-your-form' },
  openGraph: {
    title: 'Your Form Has a Field That Kills People. You Cannot See Which One.',
    description: 'Analytics stops at the pageview. Your CRM starts at the submission. The part in between, where people actually give up, is invisible to every tool you own.',
    url: 'https://www.userecapture.com/blog/the-field-that-kills-your-form',
    siteName: 'ReCapture',
    type: 'article',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=The+Field+That+Kills+Your+Form&eyebrow=Blog',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Form Has a Field That Kills People. You Cannot See Which One.',
    description: 'Analytics stops at the pageview. Your CRM starts at the submission. The part where people give up is invisible to every tool you own.',
    images: ['https://www.userecapture.com/api/og?title=The+Field+That+Kills+Your+Form&eyebrow=Blog'],
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
            headline: 'Your Form Has a Field That Kills People. You Cannot See Which One.',
            datePublished: '2026-10-04',
            author: { '@type': 'Person', name: 'Asherton Chraibi' },
            publisher: {
              '@type': 'Organization',
              name: 'ReCapture',
              logo: { '@type': 'ImageObject', url: 'https://www.userecapture.com/icon.png' },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.userecapture.com/blog/the-field-that-kills-your-form',
            },
          }),
        }}
      />

      <div className="blog-post-header">
        <Link href="/blog" className="blog-post-back">← Back to Insights</Link>
        <div className="blog-post-tag">Product</div>
        <div className="blog-post-meta">
          <span className="blog-post-date">October 4, 2026</span>
          <span className="blog-post-dot" />
          <span className="blog-post-readtime">7 min read</span>
        </div>
        <h1>Your Form Has a Field That Kills People. You Cannot See Which One.</h1>
        <p className="post-subtitle">Analytics stops at the pageview. Your CRM starts at the submission. The part in between, where people give up and leave, is invisible to every tool you own. We built something that looks at it.</p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '0 0 2rem 0' }}>
        <Image src="/blog-breakpoint.webp" alt="A form with one field lit in the dark" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="blog-post-divider"><hr /></div>

      <div className="blog-post-body">

        <h2>Two Tools, One Gap</h2>
        <p>Open your analytics. It will tell you how many people landed on the page with your contact form on it. Open your CRM. It will tell you how many submitted it. The difference between those two numbers is usually enormous, and everybody has made their peace with it.</p>
        <p>What nobody can tell you is what happened in the middle.</p>
        <p>Somebody arrived, read your page, decided they wanted to talk to you, and started typing. Then they stopped. That is a real event, with a real cause, happening to real people every day, and there is no row for it anywhere. Analytics counted a pageview. Your CRM counted nothing. The person who was two fields away from becoming a customer is filed under bounce.</p>

        <h2>Everyone Measures the Edges</h2>
        <p>The tools that claim to work on this measure the edges of the gap, not the gap itself.</p>
        <p>Heatmaps show you where a mouse went, which is not the same as where a person gave up, and they tell you nothing about someone on a phone. Session recordings exist, but nobody is watching four hundred recordings to find a pattern. Form analytics products mostly report completion rates, which is the number you already had.</p>
        <p>And the abandoned-cart tools built for e-commerce assume a cart. A consultation request is not a cart. Nobody adds a divorce to a basket.</p>

        <h2>The Thing That Makes This Solvable</h2>
        <p>We were already reading form fields. That is how ReCapture works: it captures the contact details somebody entered before they abandoned the form, so a business can follow up on inquiries that never arrived.</p>
        <p>Which means we were sitting on the answer and using it for something else. If you know what somebody typed, you know which field they were on when they stopped typing. Not inferred, not modelled. The actual field.</p>
        <p>So we built Breakpoint, and it does one thing: it names the field where your form loses the most people, from the sessions that never submitted.</p>

        <h2>Why It Is Almost Always Mobile</h2>
        <p>The first thing worth saying about Breakpoint is that it splits by device, because that is usually where the answer is hiding.</p>
        <p>Take a phone number field. On a laptop somebody types ten digits and moves on. On a phone the numeric keyboard inserts a space, or the formatting mask fights the autofill, or the validation rejects a leading one. The person tries twice, cannot work out what is wrong, and leaves.</p>
        <p>On your desktop that field is fine. You have tested it yourself, probably more than once. It has never failed for you. Meanwhile it is quietly killing a third of your inquiries, and the only people who know are the ones who left.</p>
        <p>An aggregate completion rate will never surface that. Split by device, it is obvious in about four seconds.</p>

        <h2>What This Costs in Media Dollars</h2>
        <p>Here is the part that matters if you are buying traffic.</p>
        <p>ReCapture already attributes every captured inquiry back to the channel and campaign that produced it. Put that next to Breakpoint and you can do arithmetic that was previously impossible.</p>
        <p>Suppose you spent four thousand dollars on paid search last month, driving people to a page with that phone field on it. Breakpoint says sixty-one percent of the mobile visitors who reached that field stopped there. Attribution says most of your mobile traffic came from paid search.</p>
        <p>You are not looking at a form problem. You are looking at a substantial portion of your advertising budget buying people who were then turned away by an input mask.</p>
        <p>Nobody gets fired for a form field. Somebody absolutely gets fired for the equivalent in wasted spend, and until now there was no way to connect the two.</p>

        <h2>What We Deliberately Did Not Build</h2>
        <p>The obvious next step is to fix the form automatically. Detect the broken field, patch it, done.</p>
        <p>We are not doing that, and the reason is worth stating plainly: the promise ReCapture makes is that nothing changes about how your forms work. Your submitted leads go exactly where they went before. We add a line of JavaScript and we read, we do not write.</p>
        <p>Rewriting a client&apos;s live intake form from a third-party script is the single worst thing this software could do. Breaking somebody&apos;s contact form at two in the morning is not a feature, it is an incident.</p>
        <p>So Breakpoint diagnoses. What you do about it is yours.</p>

        <h2>What You Actually See</h2>
        <p>It sits on the dashboard as one line: this form loses most people at Phone, with how many reached it, how many stopped there, and the percentage. Open it and you get every field in order, how many made it that far, and where the fall is steepest. Toggle between all traffic, mobile, and desktop.</p>
        <p>It needs a handful of sessions before it says anything, because a pattern from four people is not a pattern. After that it fills in on its own and keeps updating.</p>
        <p>Field names only, incidentally. Never what anyone typed into them. The diagnosis does not require reading somebody&apos;s message to know they abandoned it.</p>

        <h2>The Honest Summary</h2>
        <p>Most form advice is generic. Use fewer fields. Do not ask for a phone number. Put the submit button above the fold.</p>
        <p>Some of that is right some of the time, and all of it is guesswork applied to your specific form. Breakpoint replaces the guess with the field name. It is a small thing to build on top of data we already had, and it answers a question that has been unanswerable since forms existed.</p>
        <p>Your form has a field that kills people. It takes about a week of real traffic to find out which one.</p>

        <div className="blog-post-cta">
          <h3>Find your breakpoint</h3>
          <p>Breakpoint is included on every ReCapture plan. One line of JavaScript, and you will know which field your form dies on inside a week.</p>
          <Link href="/start-trial" className="blog-post-cta-btn">Start your 7-day trial</Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}
