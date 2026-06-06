import HeroFused from '../components/HeroFused'

export const metadata = {
  title: 'Hero preview — ReCapture',
  robots: { index: false, follow: false },
}

export default function HeroPreviewPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <HeroFused />
    </main>
  )
}
