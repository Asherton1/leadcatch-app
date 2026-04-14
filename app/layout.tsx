import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture — Form Abandonment Recovery for Med Spas, Dental & Luxury Services',
  description: 'Stop losing 60% of your leads. ReCapture tracks partial form submissions in real-time and auto-recovers abandoned leads for med spas, dental practices, plastic surgery, and luxury service businesses. 7-day free trial.',
  metadataBase: new URL('https://www.userecapture.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: ['form abandonment recovery', 'lead recovery software', 'partial form capture', 'med spa lead generation', 'dental practice leads', 'form tracking', 'abandoned form recovery', 'lead capture SaaS', 'high-ticket lead recovery'],
  openGraph: {
    title: 'ReCapture — Stop Losing 60% of Your Leads',
    description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
    url: 'https://www.userecapture.com',
    siteName: 'ReCapture',
    images: [
      {
        url: 'https://www.userecapture.com/og-image.png',
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
    images: ['https://www.userecapture.com/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-132TK8H7D9" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-132TK8H7D9');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ReCapture',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: 'Form abandonment recovery platform for high-ticket service businesses. Capture partial form submissions and auto-recover lost leads.',
              url: 'https://www.userecapture.com',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '150',
                highPrice: '200',
                priceCurrency: 'USD',
                offerCount: 2,
              },
              creator: {
                '@type': 'Organization',
                name: 'ReCapture',
                url: 'https://www.userecapture.com',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Dallas',
                  addressRegion: 'TX',
                  addressCountry: 'US',
                },
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
