import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Pricing — Plans from $197/mo with 7-Day Free Trial',
  description: 'Plans starting at $197/mo. Pro at $397/mo includes AI voice callback. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites. 7-day free trial on every plan.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'ReCapture Pricing — Plans from $197/mo with 7-Day Free Trial',
    description: 'Plans starting at $197/mo. Pro at $397/mo includes AI voice callback. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites. 7-day free trial on every plan.',
    url: 'https://www.userecapture.com/pricing',
    siteName: 'ReCapture',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Pricing — Plans from $197/mo with 7-Day Free Trial',
    description: 'Plans starting at $197/mo. Pro at $397/mo includes AI voice callback. Enterprise from $1,997/mo for HIPAA + BAA, unlimited sites.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
