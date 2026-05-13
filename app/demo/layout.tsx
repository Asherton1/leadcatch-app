import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
  description: 'Watch ReCapture capture a form abandonment in real time. See the recovery layer in action — Ai voice callback, SMS, CRM webhook — in 60 seconds.',
  alternates: { canonical: '/demo' },
  openGraph: {
    title: 'Live Demo — See ReCapture Recover Abandoned Leads in Real Time',
    description: 'Watch ReCapture capture a form abandonment in real time. See the recovery layer in action — Ai voice callback, SMS, CRM webhook — in 60 seconds.',
    url: 'https://www.userecapture.com/demo',
    siteName: 'ReCapture',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
