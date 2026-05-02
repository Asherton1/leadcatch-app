import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your ReCapture follow-up',
  robots: { index: false, follow: false },
}

export default function ShortLinkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
