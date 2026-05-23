interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZES: Record<NonNullable<LogoProps['size']>, { plus: number; text: string; gap: string }> = {
  sm: { plus: 16, text: '0.9rem', gap: '0.45rem' },
  md: { plus: 22, text: '1.1rem', gap: '0.5rem' },
  lg: { plus: 28, text: '1.4rem', gap: '0.55rem' },
  xl: { plus: 40, text: '2rem', gap: '0.7rem' },
}

export default function Logo({ size = 'lg', className = '' }: LogoProps) {
  const s = SIZES[size]
  return (
    <span
      className={`recapture-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
      aria-label="ReCapture"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        width={s.plus}
        height={s.plus}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M12 4v16M4 12h16"
          stroke="#ff6b35"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontSize: s.text, letterSpacing: '-0.015em' }}>
        <span style={{ color: '#fff' }}>Re</span>
        <span style={{ color: '#ff6b35' }}>Capture</span>
      </span>
    </span>
  )
}
