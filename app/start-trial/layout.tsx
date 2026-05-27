import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Your Free Trial — ReCapture',
  description: '7-day free trial. Full access from day one. One script tag, 60-second setup. See exactly how many leads your forms are losing — then start recovering them.',
  alternates: { canonical: '/start-trial' },
  openGraph: {
    title: 'Start Your Free Trial — ReCapture',
    description: '7-day free trial. Full access from day one. One script tag, 60-second setup. Stop losing leads and start recovering revenue.',
    url: 'https://www.userecapture.com/start-trial',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Start%20Your%20Free%20Trial&eyebrow=Free%20Trial',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Free Trial — ReCapture',
    description: '7-day free trial. Full access from day one. 60-second setup.',
    images: ['https://www.userecapture.com/api/og?title=Start%20Your%20Free%20Trial&eyebrow=Free%20Trial'],
  },
}

export default function StartTrialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
