import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowUpRight } from 'lucide-react'
import Badge from './Badge'
import { getListingVisual, getTreatment } from '../../lib/listingVisuals'

export const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ─── Treatment A: Stat Card ───────────────────────────────────────────────────
// Used by: command bundles, prompt packs — count is the hero element

function StatCardHeader({ Icon, gradient, badge }) {
  const parts = badge ? badge.split(' ') : ['', '']
  const count = parts[0]
  const unit = parts.slice(1).join(' ').toUpperCase()
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex-shrink-0 relative overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Ghost number — the dominant visual */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 6,
          top: -12,
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.13)',
          letterSpacing: '-0.06em',
          userSelect: 'none',
          fontFamily: 'inherit',
        }}
      >
        {count}
      </span>
      {/* Icon + unit label — bottom left */}
      <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
        <Icon size={20} strokeWidth={1.75} className="text-white/90 mb-1" />
        <p
          style={{
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {unit}
        </p>
      </div>
    </div>
  )
}

// ─── Treatment B: Terminal Card ───────────────────────────────────────────────
// Used by: MCP servers — shows a dark shell window with a command snippet

function TerminalCardHeader({ snippet }) {
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex-shrink-0 relative overflow-hidden"
      style={{ background: '#0f111a' }}
    >
      {/* Subtle top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      {/* Traffic lights */}
      <div style={{ position: 'absolute', top: 9, left: 10, display: 'flex', gap: 4 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFBD2E', display: 'block' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28CA41', display: 'block' }} />
      </div>
      {/* Command text */}
      <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
        <span
          style={{
            display: 'block',
            fontSize: 10,
            fontFamily: '"Fira Code", "Cascadia Code", "Menlo", monospace',
            color: '#4ADE80',
            marginBottom: 2,
          }}
        >
          $ claude
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 9.5,
            fontFamily: '"Fira Code", "Cascadia Code", "Menlo", monospace',
            color: 'rgba(255,255,255,0.55)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {snippet || '> tool connected'}
        </span>
      </div>
    </div>
  )
}

// ─── Treatment C: Node Graph Card ────────────────────────────────────────────
// Used by: standalone Claude skills — abstract AI/knowledge graph pattern

function NodeGraphSvg({ seed = 0 }) {
  // Vary node positions slightly per seed to make each card feel unique
  const s = seed % 5
  const dx = [0, 4, -3, 6, -5][s]
  const dy = [0, -2, 3, -4, 2][s]
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.28 }}
      viewBox="0 0 190 88"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Nodes */}
      <circle cx={18 + dx} cy={18 + dy} r="2.5" fill="white" />
      <circle cx={52 + dx} cy={32 + dy} r="2" fill="white" />
      <circle cx={90 + dx} cy={12 + dy} r="2.5" fill="white" />
      <circle cx={130 + dx} cy={38 + dy} r="2" fill="white" />
      <circle cx={168 + dx} cy={16 + dy} r="2.5" fill="white" />
      <circle cx={35 + dx} cy={68 + dy} r="2" fill="white" />
      <circle cx={75 + dx} cy={76 + dy} r="2.5" fill="white" />
      <circle cx={115 + dx} cy={64 + dy} r="2" fill="white" />
      <circle cx={158 + dx} cy={72 + dy} r="2.5" fill="white" />
      <circle cx={95 + dx} cy={44 + dy} r="3" fill="white" opacity="0.5" />
      {/* Primary connections */}
      <line x1={18 + dx} y1={18 + dy} x2={52 + dx} y2={32 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={52 + dx} y1={32 + dy} x2={90 + dx} y2={12 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={90 + dx} y1={12 + dy} x2={130 + dx} y2={38 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={130 + dx} y1={38 + dy} x2={168 + dx} y2={16 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={35 + dx} y1={68 + dy} x2={75 + dx} y2={76 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={75 + dx} y1={76 + dy} x2={115 + dx} y2={64 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      <line x1={115 + dx} y1={64 + dy} x2={158 + dx} y2={72 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.55" />
      {/* Cross-connections */}
      <line x1={52 + dx} y1={32 + dy} x2={35 + dx} y2={68 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1={90 + dx} y1={12 + dy} x2={95 + dx} y2={44 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1={95 + dx} y1={44 + dy} x2={75 + dx} y2={76 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
      <line x1={130 + dx} y1={38 + dy} x2={115 + dx} y2={64 + dy} stroke="white" strokeWidth="0.75" strokeOpacity="0.3" />
    </svg>
  )
}

function AbstractCardHeader({ Icon, gradient, seed }) {
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex-shrink-0 relative overflow-hidden flex items-center justify-center"
      style={{ background: gradient }}
    >
      <NodeGraphSvg seed={seed} />
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm relative z-10">
        <Icon size={22} strokeWidth={1.75} className="text-white" aria-hidden="true" />
      </div>
    </div>
  )
}

// ─── Treatment D: Grid Card ───────────────────────────────────────────────────
// Used by: bundles — 2×2 icon grid showing what's inside

function GridCardHeader({ gradient, gridIcons }) {
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex-shrink-0 grid grid-cols-2 gap-1.5 p-2 relative overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {gridIcons.slice(0, 4).map((IconComp, i) => (
        <div
          key={i}
          className="flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm relative z-10"
        >
          <IconComp size={15} strokeWidth={1.75} className="text-white" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

// ─── CardHeader dispatcher ────────────────────────────────────────────────────

function CardHeader({ listing }) {
  const visual = getListingVisual(listing)
  const treatment = getTreatment(listing, visual)
  const { Icon, badge, snippet, gridIcons, gradient } = visual

  if (treatment === 'stat') return <StatCardHeader Icon={Icon} gradient={gradient} badge={badge} />
  if (treatment === 'terminal') return <TerminalCardHeader snippet={snippet} />
  if (treatment === 'grid') return <GridCardHeader gradient={gradient} gridIcons={gridIcons} />
  return <AbstractCardHeader Icon={Icon} gradient={gradient} seed={listing.id ?? 0} />
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-dark-mid border border-border flex-shrink-0">
      {initials}
    </span>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function ListingCard({ listing }) {
  const { category, title, description, creator, price, rating, reviews } = listing
  const slug = toSlug(title)
  const cardRef = useRef(null)
  const shineRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    card.style.transition = 'box-shadow 0.2s ease, border-color 0.2s ease'
    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) translateZ(6px)`
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100
    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`
    shine.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return
    card.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease, border-color 0.2s ease'
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    shine.style.opacity = '0'
  }, [])

  return (
    <Link to={`/listing/${slug}`} className="block">
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col rounded-2xl border border-border bg-white p-5 cursor-pointer hover:border-primary/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.09)]"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div
          ref={shineRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        <CardHeader listing={listing} />

        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge category={category} />
          <ArrowUpRight
            size={16}
            className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-[16px] font-bold text-primary leading-snug mb-1.5">{title}</h3>
        <p className="text-sm text-dark-mid leading-relaxed line-clamp-2 flex-1 mb-4">{description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Avatar name={creator} />
          <span className="text-[13px] text-dark-mid">{creator}</span>
        </div>

        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="text-[15px] font-semibold text-primary">{price}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-[13px] font-medium text-primary">{rating}</span>
            <span className="text-[13px] text-muted">({reviews})</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
