import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import SmoothScroll from './components/SmoothScroll'
import PremiumEffects from './components/PremiumEffects'
import PageTransitions from './components/PageTransitions'
import SiteTracker from './components/SiteTracker'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = { themeColor: '#0a0a0a' }

export const metadata: Metadata = {
  title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
  description: 'See who is on your site, catch the inquiries that never get submitted, and recover them before they go elsewhere. Built for law firms, medical practices, and high-consideration service businesses.',
  metadataBase: new URL('https://www.userecapture.com'),
  icons: {
    icon: '/favicon.svg?v=20260524',
    apple: '/apple-touch-icon.png?v=20260524',
    shortcut: '/favicon.svg?v=20260524',
  },
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
  keywords: ['recovery layer', 'lead recovery platform', 'form abandonment recovery', 'high-ticket lead recovery', 'lead capture SaaS', 'partial form capture', 'law firm intake form abandonment', 'legal intake recovery', 'med spa lead recovery', 'dental practice leads', 'multi-location lead recovery', 'AI lead recovery', 'enterprise lead recovery', 'live visitor tracking', 'intake form analytics'],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
    description: 'See who is on your site, catch the inquiries that never get submitted, and recover them before they go elsewhere. Built for law firms, medical practices, and high-consideration service businesses.',
    url: 'https://www.userecapture.com',
    siteName: 'ReCapture',
    images: [{
        url: 'https://www.userecapture.com/api/og',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReCapture — The Recovery Layer for High-Ticket Service Businesses',
    description: 'See who is on your site, catch the inquiries that never get submitted, and recover them before they go elsewhere. Built for law firms, medical practices, and high-consideration service businesses.',
    images: ['https://www.userecapture.com/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-132TK8H7D9" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-132TK8H7D9');`}
        </Script>
        <SiteTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ReCapture',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description: 'See who is on your site, catch the inquiries that never get submitted, and recover them before they go elsewhere. Built for law firms, medical practices, and high-consideration service businesses.',
              url: 'https://www.userecapture.com',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '397',
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
        <SmoothScroll />
        <PremiumEffects />
        <PageTransitions />
        {children}
      </body>
    </html>
  )
}
