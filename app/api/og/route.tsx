import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title =
    searchParams.get('title') ||
    "You're Losing |60% of Your Leads|. Here's the Proof."
  const eyebrow = searchParams.get('eyebrow') || ''

  // Load Inter from /public/fonts — same font every render, every page
  const [interRegular, interSemiBold, interBold, interExtraBold] =
    await Promise.all([
      fetch(new URL('/fonts/Inter-Regular.ttf', req.url)).then((r) =>
        r.arrayBuffer(),
      ),
      fetch(new URL('/fonts/Inter-SemiBold.ttf', req.url)).then((r) =>
        r.arrayBuffer(),
      ),
      fetch(new URL('/fonts/Inter-Bold.ttf', req.url)).then((r) =>
        r.arrayBuffer(),
      ),
      fetch(new URL('/fonts/Inter-ExtraBold.ttf', req.url)).then((r) =>
        r.arrayBuffer(),
      ),
    ])

  const parts = title.split('|')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '80px',
          fontFamily: 'Inter',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              color: '#ff6b35',
              fontWeight: 800,
              fontSize: 68,
              paddingRight: '14px',
              lineHeight: 1,
              display: 'flex',
              letterSpacing: '-0.025em',
            }}
          >
            +
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            Re
          </span>
          <span
            style={{
              color: '#ff6b35',
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            Capture
          </span>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                color: '#ff6b35',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                display: 'flex',
              }}
            >
              {eyebrow}
            </div>
          ) : null}

          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexWrap: 'wrap',
              color: '#ffffff',
            }}
          >
            {parts.map((part, i) => (
              <span
                key={i}
                style={{
                  color: i % 2 === 1 ? '#ff6b35' : '#ffffff',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                }}
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '72px',
              height: '4px',
              background: '#ff6b35',
              display: 'flex',
            }}
          />
          <div
            style={{
              color: '#888888',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.04em',
              display: 'flex',
            }}
          >
            userecapture.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interExtraBold, weight: 800, style: 'normal' },
      ],
    },
  )
}
