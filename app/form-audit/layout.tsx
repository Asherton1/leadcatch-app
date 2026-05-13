import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Form Audit — Find Your Lost Lead Revenue — ReCapture',
  description: 'Free audit of your website forms. We analyze submission rates, abandonment patterns, and missed revenue opportunities. Delivered within 24 hours.',
  alternates: { canonical: '/form-audit' },
  openGraph: {
    title: 'Free Form Audit — Find Your Lost Lead Revenue — ReCapture',
    description: 'Free audit of your website forms. We analyze submission rates, abandonment patterns, and missed revenue opportunities. Delivered within 24 hours.',
    url: 'https://www.userecapture.com/form-audit',
    siteName: 'ReCapture',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
