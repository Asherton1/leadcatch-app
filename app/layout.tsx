import './globals.css'
import PremiumEffects from './components/PremiumEffects'
import PageTransitions from './components/PageTransitions'
import Script from 'next/script'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
  description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
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
  keywords: ['recovery layer', 'lead recovery platform', 'form abandonment recovery', 'high-ticket lead recovery', 'lead capture SaaS', 'partial form capture', 'med spa lead recovery', 'dental practice leads', 'multi-location lead recovery', 'AI lead recovery', 'enterprise lead recovery'],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
    description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
    url: 'https://www.userecapture.com',
    siteName: 'ReCapture',
    images: [
      {
        url: 'https://www.userecapture.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
    description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
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
        {/* ReCapture tracker — dogfooding our own product on userecapture.com */}
        <Script
          src="https://www.userecapture.com/track.js?key=admin_252bcf7523b0e813f2b470d2e0f61fd9"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ReCapture',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: 'Recapture every high-value lead that almost got away. The recovery layer for high-ticket service businesses.',
              url: 'https://www.userecapture.com',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '197',
                highPrice: '397',
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
        <PremiumEffects />
        <PageTransitions />
        {children}
      </body>
    </html>
  )
}
