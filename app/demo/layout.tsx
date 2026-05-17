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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
    description: 'Watch ReCapture capture a form abandonment in real time — AI voice callback, SMS, CRM webhook — in 60 seconds.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
