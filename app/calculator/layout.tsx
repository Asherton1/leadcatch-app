import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Recovery ROI Calculator — ReCapture',
  description: 'Calculate how much revenue you are losing to form abandonment. Enter traffic, conversion rate, and average customer value. See your monthly recovery potential.',
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'Lead Recovery ROI Calculator — ReCapture',
    description: 'Calculate how much revenue you are losing to form abandonment. Enter traffic, conversion rate, and average customer value. See your monthly recovery potential.',
    url: 'https://www.userecapture.com/calculator',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
        url: 'https://www.userecapture.com/api/og?title=Lead%20Recovery%20ROI%20Calculator%20%E2%80%94%20ReCapture&eyebrow=Calculator',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Recovery ROI Calculator — ReCapture',
    description: 'Calculate how much revenue you are losing to form abandonment. See your monthly recovery potential in seconds.',
    images: ['https://www.userecapture.com/api/og?title=Lead%20Recovery%20ROI%20Calculator%20%E2%80%94%20ReCapture&eyebrow=Calculator'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
