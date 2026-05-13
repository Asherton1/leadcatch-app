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
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
