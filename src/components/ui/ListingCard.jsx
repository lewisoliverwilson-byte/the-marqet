import { Star, ArrowUpRight } from 'lucide-react'
import Badge from './Badge'

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

export default function ListingCard({ listing }) {
  const { category, title, description, creator, price, rating, reviews } = listing

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:border-accent hover:shadow-sm">
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
  )
}
