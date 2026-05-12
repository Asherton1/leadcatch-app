import { Metadata } from 'next'
import FAQClient from './FAQClient'
import { faqCategories } from './faqs'

export const metadata: Metadata = {
  title: 'FAQ — Common Questions About ReCapture | Lead Recovery, AI Voice, HIPAA',
  description: 'Everything you need to know about ReCapture: how we capture abandoned form leads, how the AI voice callback works, HIPAA / GDPR compliance, CRM integrations (HubSpot, Salesforce, Boulevard, AppFolio, GoHighLevel, Follow Up Boss), pricing, and what the 7-day trial includes.',
  keywords: 'ReCapture FAQ, lead recovery FAQ, AI voice callback, HIPAA compliance, form abandonment recovery, CRM integration',
  openGraph: {
    title: 'ReCapture FAQ — Common Questions About Lead Recovery',
    description: 'Everything you need to know about ReCapture and how the recovery layer works.',
    url: 'https://www.userecapture.com/faq',
    siteName: 'ReCapture',
    type: 'website',
  },
}

function buildFAQSchema() {
  const allFAQs = faqCategories.flatMap((cat) => cat.faqs)
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export default function FAQPage() {
  const schema = buildFAQSchema()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FAQClient />
    </>
  )
}
