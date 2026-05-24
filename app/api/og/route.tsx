import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title =
    searchParams.get('title') ||
    "You're Losing |60% of Your Leads|. Here's the Proof."
  const eyebrow = searchParams.get('eyebrow') || ''
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
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#ff6b35', marginRight: '12px' }}>+</span>
          <span style={{ color: 'white' }}>Re</span>
          <span style={{ color: '#ff6b35' }}>Capture</span>
        </div>

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
              color: 'white',
            }}
          >
            {parts.map((part, i) => (
              <span
                key={i}
                style={{
                  color: i % 2 === 1 ? '#ff6b35' : 'white',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                }}
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#888888',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: '72px',
              height: '4px',
              background: '#ff6b35',
              marginRight: '18px',
              display: 'flex',
            }}
          />
          userecapture.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
