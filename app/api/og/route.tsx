import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        width: 1200,
        height: 630,
        background: '#ff6b35',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 100,
        fontWeight: 700,
      }}>
        ReCapture OG test
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
