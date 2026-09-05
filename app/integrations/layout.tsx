import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Integrations — CRM, Ad Platforms, Webhooks & Zapier',
  description: 'Connect ReCapture to your existing stack. Native GoHighLevel and Slack, real-time webhooks into HubSpot, Salesforce, Follow Up Boss, Boulevard and AppFolio, plus Zapier for anything else.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'ReCapture Integrations — CRM, Ad Platforms, Webhooks & Zapier',
    description: 'Connect ReCapture to your existing stack. Native GoHighLevel and Slack, real-time webhooks into HubSpot, Salesforce, Follow Up Boss, Boulevard and AppFolio, plus Zapier for anything else.',
    url: 'https://www.userecapture.com/integrations',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
        url: 'https://www.userecapture.com/api/og?title=ReCapture%20Integrations%20%E2%80%94%20HubSpot%2C%20Boulevard%2C%20AppFolio%2C%20FUB%20%2B%20More&eyebrow=Integrations',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Integrations — CRM, Ad Platforms, Webhooks & Zapier',
    description: 'Native GoHighLevel and Slack, real-time webhooks into every major CRM, plus Zapier and a REST API.',
    images: ['https://www.userecapture.com/api/og?title=ReCapture%20Integrations%20%E2%80%94%20HubSpot%2C%20Boulevard%2C%20AppFolio%2C%20FUB%20%2B%20More&eyebrow=Integrations'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
