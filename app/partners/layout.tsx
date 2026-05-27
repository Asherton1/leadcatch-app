import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner with ReCapture — Agency & Integrator Program',
  description: 'Become a ReCapture partner. Agencies, integrators, and consultants serving high-ticket service businesses earn revenue share by introducing ReCapture to clients.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Partner with ReCapture — Agency & Integrator Program',
    description: 'Become a ReCapture partner. Agencies, integrators, and consultants serving high-ticket service businesses earn revenue share.',
    url: 'https://www.userecapture.com/partners',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Partner%20with%20ReCapture&eyebrow=Partners',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner with ReCapture — Agency & Integrator Program',
    description: 'Earn revenue share by introducing ReCapture to your high-ticket service business clients.',
    images: ['https://www.userecapture.com/api/og?title=Partner%20with%20ReCapture&eyebrow=Partners'],
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
