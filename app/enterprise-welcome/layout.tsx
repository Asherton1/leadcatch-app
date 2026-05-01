import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to ReCapture Enterprise',
  robots: { index: false, follow: false },
}

export default function EnterpriseWelcomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
