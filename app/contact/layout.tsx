import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact ReCapture — Sales, Demos, Partnerships, Support',
  description: 'Reach the ReCapture team. Sales inquiries, demo requests, partnership opportunities, and customer support — all in one place. We respond within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact ReCapture — Sales, Demos, Partnerships, Support',
    description: 'Reach the ReCapture team. Sales inquiries, demo requests, partnership opportunities, and customer support — all in one place. We respond within 24 hours.',
    url: 'https://www.userecapture.com/contact',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
        url: 'https://www.userecapture.com/api/og?title=Contact%20ReCapture%20%E2%80%94%20Get%20in%20Touch&eyebrow=Contact',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ReCapture — Sales, Demos, Partnerships, Support',
    description: 'Sales, demos, partnerships, support. We respond within 24 hours.',
    images: ['https://www.userecapture.com/api/og?title=Contact%20ReCapture%20%E2%80%94%20Get%20in%20Touch&eyebrow=Contact'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
