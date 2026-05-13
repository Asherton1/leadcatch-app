import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Enterprise — HIPAA + BAA + White-Glove Setup',
  description: 'Enterprise from $1,997/mo. Unlimited sites, HIPAA + BAA, dedicated account manager, custom integrations. Built for multi-location healthcare and real estate.',
  alternates: { canonical: '/enterprise' },
  openGraph: {
    title: 'ReCapture Enterprise — HIPAA + BAA + White-Glove Setup',
    description: 'Enterprise from $1,997/mo. Unlimited sites, HIPAA + BAA, dedicated account manager, custom integrations. Built for multi-location healthcare and real estate.',
    url: 'https://www.userecapture.com/enterprise',
    siteName: 'ReCapture',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
