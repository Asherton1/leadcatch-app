import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReCapture Enterprise — Tailored Plans',
  description: 'Custom enterprise pricing for multi-location practices, franchise systems, and high-volume operations.',
  robots: { index: false, follow: false },
}

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
