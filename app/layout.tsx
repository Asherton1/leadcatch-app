import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LeadCatch',
  description: 'Form abandonment tracking for high-ticket local businesses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
