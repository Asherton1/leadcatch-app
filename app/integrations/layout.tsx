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
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
