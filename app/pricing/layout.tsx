import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Pricing — Pro from $397/mo, Enterprise from $1,997/mo',
  description: 'Pro at $397/mo includes AI voice callback within 60 seconds. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites. 7-day free trial on every plan.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'ReCapture Pricing — Pro from $397/mo, Enterprise from $1,997/mo',
    description: 'Pro at $397/mo includes AI voice callback within 60 seconds. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites. 7-day free trial on every plan.',
    url: 'https://www.userecapture.com/pricing',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
        url: 'https://www.userecapture.com/api/og?title=ReCapture%20Pricing%20%E2%80%94%20Plans%20from%20%24397/mo%20with%207-Day%20Free%20Trial&eyebrow=Pricing',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Pricing — Pro from $397/mo, Enterprise from $1,997/mo',
    description: 'Pro at $397/mo includes AI voice callback. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites.',
    images: ['https://www.userecapture.com/api/og?title=ReCapture%20Pricing%20%E2%80%94%20Plans%20from%20%24397/mo%20with%207-Day%20Free%20Trial&eyebrow=Pricing'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
