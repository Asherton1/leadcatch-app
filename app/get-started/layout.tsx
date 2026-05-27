import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started — ReCapture',
  description: 'Your ReCapture onboarding dashboard.',
  robots: 'noindex',
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
