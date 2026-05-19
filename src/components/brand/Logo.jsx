import QMark from './QMark'

const sizes = {
  sm:     { mark: 24, the: 9,  wordmark: 18 },
  md:     { mark: 32, the: 10, wordmark: 24 },
  lg:     { mark: 44, the: 11, wordmark: 32 },
  splash: { mark: 156, the: 24, wordmark: 112 },
}

export default function Logo({ size = 'sm', reversed = false, className = '' }) {
  const s = sizes[size]
  const textColor = reversed ? '#FFFFFF' : '#111111'
  const descriptorColor = reversed ? '#55556A' : '#AAAAB8'

  return (
    <a
      href="#top"
      className={`inline-flex items-center gap-2.5 no-underline ${className}`}
      aria-label="The Marqet — home"
    >
      <QMark size={s.mark} ariaHidden />
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontSize: s.the,
            color: descriptorColor,
            letterSpacing: '0.28em',
            fontWeight: 600,
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          THE
        </span>
        <span
          style={{
            fontSize: s.wordmark,
            fontWeight: 700,
            color: textColor,
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            marginTop: 2,
          }}
        >
          MAR
          <span style={{ color: '#3B82F6' }}>Q</span>ET
        </span>
      </div>
    </a>
  )
}
