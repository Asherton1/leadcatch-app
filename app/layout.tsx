import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
  openGraph: {
    title: 'ReCapture — Stop Losing 60% of Your Leads',
    description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
    url: 'https://userecapture.com',
    siteName: 'ReCapture',
    images: [
      {
        url: 'https://userecapture.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReCapture — Form Abandonment Recovery',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture — Stop Losing 60% of Your Leads',
    description: 'Capture partial form submissions and auto-recover lost leads.',
    images: ['https://userecapture.com/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
