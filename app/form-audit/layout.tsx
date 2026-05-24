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
    images: [{
        url: 'https://www.userecapture.com/api/og?title=Free%20Form%20Audit%20%E2%80%94%20Find%20Your%20Lost%20Lead%20Revenue%20%E2%80%94%20ReCapture&eyebrow=Form%20Audit',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Form Audit — Find Your Lost Lead Revenue — ReCapture',
    description: 'Free audit of your website forms. Submission rates, abandonment patterns, missed revenue. Delivered within 24 hours.',
    images: ['https://www.userecapture.com/api/og?title=Free%20Form%20Audit%20%E2%80%94%20Find%20Your%20Lost%20Lead%20Revenue%20%E2%80%94%20ReCapture&eyebrow=Form%20Audit'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
