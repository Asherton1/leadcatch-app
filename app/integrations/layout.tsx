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
        url: 'https://www.userecapture.com/api/og?title=Every%20place%20a%20recovered%20inquiry%20goes%2C%20the%20moment%20it%20is%20captured&eyebrow=Integrations',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Integrations — CRM, Ad Platforms, Webhooks & Zapier',
    description: 'Native GoHighLevel and Slack, real-time webhooks into every major CRM, plus Zapier and a REST API.',
    images: ['https://www.userecapture.com/api/og?title=Every%20place%20a%20recovered%20inquiry%20goes%2C%20the%20moment%20it%20is%20captured&eyebrow=Integrations'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
