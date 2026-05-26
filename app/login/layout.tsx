import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — ReCapture',
  description: 'Sign in to your ReCapture dashboard to manage forms, leads, and recovery campaigns.',
  alternates: { canonical: '/login' },
  openGraph: {
    title: 'Sign In — ReCapture',
    description: 'Sign in to your ReCapture dashboard to manage forms, leads, and recovery campaigns.',
    url: 'https://www.userecapture.com/login',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
      url: 'https://www.userecapture.com/api/og?title=Sign%20In%20to%20ReCapture&eyebrow=Dashboard',
      width: 1200,
      height: 630,
      alt: 'ReCapture',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In — ReCapture',
    description: 'Sign in to your ReCapture dashboard.',
    images: ['https://www.userecapture.com/api/og?title=Sign%20In%20to%20ReCapture&eyebrow=Dashboard'],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
