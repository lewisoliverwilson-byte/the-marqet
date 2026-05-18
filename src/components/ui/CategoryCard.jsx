import { Cpu, Plug, MessageSquare, GitBranch, Layout, Package, ArrowRight } from 'lucide-react'

const iconMap = { Cpu, Plug, MessageSquare, GitBranch, Layout, Package }

export default function CategoryCard({ category }) {
  const { name, description, count, color, icon } = category
  const Icon = iconMap[icon] ?? Cpu

  return (
    <article className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:border-accent hover:bg-surface cursor-pointer">
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={22} strokeWidth={1.75} style={{ color }} aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-[18px] font-bold text-primary leading-snug">{name}</h3>
          <ArrowRight
            size={16}
            className="text-muted flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-dark-mid leading-relaxed mb-2">{description}</p>
        <span className="text-[11px] font-semibold uppercase tracking-widest3 text-muted">
          {count} add-ons
        </span>
      </div>
    </article>
  )
}
