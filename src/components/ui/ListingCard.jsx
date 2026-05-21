import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowUpRight } from 'lucide-react'
import Badge from './Badge'
import { getListingVisual } from '../../lib/listingVisuals'

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function CardHeader({ listing }) {
  const { Icon, badge, gradient } = getListingVisual(listing)
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      style={{ background: gradient }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
        <Icon size={22} strokeWidth={1.75} className="text-white" aria-hidden="true" />
      </div>
      {badge && (
        <span className="absolute bottom-2 right-2 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white/90 tracking-wide">
          {badge}
        </span>
      )}
    </div>
  )
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-dark-mid border border-border flex-shrink-0">
      {initials}
    </span>
  )
}

export { toSlug }

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

    const rotateX = ((y - cy) / cy) * -6
    const rotateY = ((x - cx) / cx) * 6

    card.style.transition = 'box-shadow 0.2s ease, border-color 0.2s ease'
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`

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
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Holographic shine overlay */}
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
