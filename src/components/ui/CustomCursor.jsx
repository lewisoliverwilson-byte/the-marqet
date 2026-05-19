import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const scale = useRef(1)
  const rafRef = useRef(null)
  const hovering = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('cursor-none-all')

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e) => {
      hovering.current = !!e.target.closest(
        'a, button, [role="button"], input, select, textarea, label, [tabindex]'
      )
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    const tick = () => {
      const dot = dotRef.current
      const ring = ringRef.current

      if (dot) {
        dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      const targetScale = hovering.current ? 1.6 : 1
      scale.current += (targetScale - scale.current) * 0.15

      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px) scale(${scale.current})`
        ring.style.borderColor = hovering.current
          ? 'rgba(59,130,246,0.9)'
          : 'rgba(59,130,246,0.5)'
        ring.style.backgroundColor = hovering.current
          ? 'rgba(59,130,246,0.06)'
          : 'transparent'
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('cursor-none-all')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot — tracks exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-blue-500"
        style={{
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(59,130,246,0.9), 0 0 20px rgba(59,130,246,0.4)',
        }}
      />
      {/* Ring — lags behind with spring lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border"
        style={{
          willChange: 'transform',
          borderColor: 'rgba(59,130,246,0.5)',
          transition: 'border-color 0.2s ease, background-color 0.2s ease',
        }}
      />
    </>
  )
}
