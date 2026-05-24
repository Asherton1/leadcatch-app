import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Integrations — HubSpot, Boulevard, AppFolio, FUB + More',
  description: 'Connect ReCapture to your existing stack. Native HubSpot, Boulevard, AppFolio, Follow Up Boss, GoHighLevel integrations. Webhook + Zapier for any CRM.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'ReCapture Integrations — HubSpot, Boulevard, AppFolio, FUB + More',
    description: 'Connect ReCapture to your existing stack. Native HubSpot, Boulevard, AppFolio, Follow Up Boss, GoHighLevel integrations. Webhook + Zapier for any CRM.',
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
    title: 'ReCapture Integrations — HubSpot, Boulevard, AppFolio, FUB + More',
    description: 'Native integrations for HubSpot, Boulevard, AppFolio, Follow Up Boss, GoHighLevel. Webhook + Zapier for any CRM.',
    images: ['https://www.userecapture.com/api/og?title=ReCapture%20Integrations%20%E2%80%94%20HubSpot%2C%20Boulevard%2C%20AppFolio%2C%20FUB%20%2B%20More&eyebrow=Integrations'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
