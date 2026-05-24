import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
  description: 'Watch ReCapture capture a form abandonment in real time. See the recovery layer in action — AI voice callback, SMS, CRM webhook — in 60 seconds.',
  alternates: { canonical: '/demo' },
  openGraph: {
    title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
    description: 'Watch ReCapture capture a form abandonment in real time. See the recovery layer in action — AI voice callback, SMS, CRM webhook — in 60 seconds.',
    url: 'https://www.userecapture.com/demo',
    siteName: 'ReCapture',
    type: 'website',
    images: [{
        url: 'https://www.userecapture.com/api/og?title=Live%20Demo%20%E2%80%94%20See%20ReCapture%20Recover%20Abandoned%20Leads%20in%20Real%20Time&eyebrow=Demo',
        width: 1200,
        height: 630,
        alt: 'ReCapture',
      }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
    description: 'Watch ReCapture capture a form abandonment in real time — AI voice callback, SMS, CRM webhook — in 60 seconds.',
    images: ['https://www.userecapture.com/api/og?title=Live%20Demo%20%E2%80%94%20See%20ReCapture%20Recover%20Abandoned%20Leads%20in%20Real%20Time&eyebrow=Demo'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
