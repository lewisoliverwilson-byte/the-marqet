import { useState, useEffect } from 'react'
import Logo from '../brand/Logo'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('entering') // entering → idle → exiting

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('idle'), 60)
    const t2 = setTimeout(() => setPhase('exiting'), 60 + 2000)
    const t3 = setTimeout(onDone, 60 + 2000 + 950)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const exiting = phase === 'exiting'
  const entering = phase === 'entering'

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'
  const exitEase = 'cubic-bezier(0.4, 0, 1, 1)'

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.38s ease 0.55s' : undefined,
      }}
    >
      {/* Dot grid + blue glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.04) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08), transparent 70%)',
        }} />
      </div>

      {/* Content stack — everything centered */}
      <div className="relative flex flex-col items-center">

        {/* The Marqet logo — flies in from above, exits UP */}
        <div
          style={{
            transform: exiting
              ? 'translateY(-115vh)'
              : entering ? 'translateY(-48px)' : 'translateY(0)',
            opacity: entering ? 0 : 1,
            transition: exiting
              ? `transform 0.72s ${exitEase}`
              : `transform 0.75s ${ease}, opacity 0.6s ease`,
          }}
        >
          <Logo size="splash" />
        </div>

        {/* Brought to you by + ConstruX — flies in from below, exits DOWN */}
        <div
          className="flex items-center gap-6 mt-10"
          style={{
            transform: exiting
              ? 'translateY(115vh)'
              : entering ? 'translateY(48px)' : 'translateY(0)',
            opacity: entering ? 0 : 1,
            transition: exiting
              ? `transform 0.72s ${exitEase} 0.04s`
              : `transform 0.75s ${ease} 0.1s, opacity 0.6s ease 0.1s`,
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#AAAAB8',
              whiteSpace: 'nowrap',
            }}
          >
            Brought to you by
          </span>
          <img
            src="/construx-logo-light.png"
            alt="ConstruX Group"
            draggable={false}
            style={{ width: '300px', userSelect: 'none', display: 'block' }}
          />
        </div>

      </div>
    </div>
  )
}
