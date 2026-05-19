import { useState, useEffect } from 'react'
import Logo from '../brand/Logo'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('entering') // entering → idle → exiting

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('idle'), 60)
    const t2 = setTimeout(() => setPhase('exiting'), 60 + 3000)
    const t3 = setTimeout(onDone, 60 + 3000 + 950)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const exiting = phase === 'exiting'
  const entering = phase === 'entering'
  const idle = phase === 'idle'

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
      {/* Subtle dot grid — brand texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.035) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center">

        {/* The Marqet logo — enters from above, exits UP */}
        <div
          style={{
            transform: exiting
              ? 'translateY(-115vh)'
              : entering ? 'translateY(-20px)' : 'translateY(0)',
            opacity: entering ? 0 : 1,
            transition: exiting
              ? `transform 0.72s ${exitEase}`
              : `transform 0.7s ${ease}, opacity 0.55s ease`,
          }}
        >
          <Logo size="splash" />
        </div>

        {/* Separator + attribution block — enters from below, exits DOWN */}
        <div
          className="flex flex-col items-center"
          style={{
            marginTop: '44px',
            transform: exiting
              ? 'translateY(115vh)'
              : entering ? 'translateY(20px)' : 'translateY(0)',
            opacity: entering ? 0 : 1,
            transition: exiting
              ? `transform 0.72s ${exitEase} 0.04s`
              : `transform 0.7s ${ease} 0.12s, opacity 0.55s ease 0.12s`,
          }}
        >
          {/* Thin separator */}
          <div style={{
            width: '200px',
            height: '1px',
            backgroundColor: '#E4E4E9',
            marginBottom: '22px',
          }} />

          {/* Attribution label */}
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#C4C4D0',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            Presented by
          </span>

          {/* ConstruX logo */}
          <img
            src="/construx-logo-light.png"
            alt="ConstruX Group"
            draggable={false}
            style={{ width: '180px', userSelect: 'none', display: 'block' }}
          />

          {/* Progress bar */}
          <div style={{
            marginTop: '36px',
            width: '240px',
            height: '1px',
            backgroundColor: '#EEEEF2',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#3B82F6',
              transformOrigin: 'left',
              transform: idle || exiting ? 'scaleX(1)' : 'scaleX(0)',
              transition: idle ? 'transform 2300ms linear 620ms' : 'none',
            }} />
          </div>
        </div>

      </div>
    </div>
  )
}
