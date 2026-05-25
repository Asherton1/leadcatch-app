import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || "You're Losing |60% of Your Leads|. Here's the Proof."
  const eyebrow = searchParams.get('eyebrow') || ''
  const parts = title.split('|')

  const origin = new URL(req.url).origin
  const [interBold, interExtraBold] = await Promise.all([
    fetch(origin + '/fonts/Inter-Bold.otf').then(r => r.arrayBuffer()),
    fetch(origin + '/fonts/Inter-ExtraBold.otf').then(r => r.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: '#0a0a0a', padding: '80px',
        fontFamily: 'Inter',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', fontFamily: 'Inter' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" style={{ marginRight: '12px' }} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="#ff6b35" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M5 12H19" stroke="#ff6b35" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'white', fontFamily: 'Inter' }}>Re</span>
          <span style={{ color: '#ff6b35', fontFamily: 'Inter' }}>Capture</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div style={{ color: '#ff6b35', fontSize: 22, fontWeight: 700, letterSpacing: '0.14em',
                          textTransform: 'uppercase', marginBottom: '28px', display: 'flex', fontFamily: 'Inter' }}>
              {eyebrow}
            </div>
          ) : null}
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
                        display: 'flex', flexWrap: 'wrap', color: 'white', fontFamily: 'Inter' }}>
            {parts.map((part, i) => (
              <span key={i} style={{ color: i % 2 === 1 ? '#ff6b35' : 'white',
                                     whiteSpace: 'pre-wrap', display: 'flex', fontFamily: 'Inter' }}>
                {part}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', color: '#888888', fontSize: 22, fontWeight: 700, fontFamily: 'Inter' }}>
          <div style={{ width: '72px', height: '4px', background: '#ff6b35', marginRight: '18px', display: 'flex' }} />
          userecapture.com
        </div>
      </div>
    ),
    {
      width: 1200, height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interExtraBold, weight: 800, style: 'normal' },
      ],
    }
  )
}
