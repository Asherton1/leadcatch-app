import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recapture — Form Abandonment Recovery for High-Ticket Businesses',
  description: 'Capture partial form submissions and auto-recover lost leads. Built for med spas, dental practices, and luxury service businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
