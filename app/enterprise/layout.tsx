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
    images: [{
        url: 'https://www.userecapture.com/api/og?title=ReCapture%20Enterprise%20%E2%80%94%20HIPAA%20%2B%20BAA%20%2B%20White-Glove%20Setup&eyebrow=Enterprise',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture Enterprise — HIPAA + BAA + White-Glove Setup',
    description: 'Enterprise from $1,997/mo. Unlimited sites, HIPAA + BAA, dedicated account manager. Built for multi-location healthcare and real estate.',
    images: ['https://www.userecapture.com/api/og?title=ReCapture%20Enterprise%20%E2%80%94%20HIPAA%20%2B%20BAA%20%2B%20White-Glove%20Setup&eyebrow=Enterprise'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
