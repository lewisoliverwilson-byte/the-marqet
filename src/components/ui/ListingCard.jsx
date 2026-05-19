import { Star, ArrowUpRight, Zap, Server, MessageSquare, GitBranch, Package, Layout } from 'lucide-react'
import Badge from './Badge'

// Shared visual config — same gradient + icon language as the hero background cards
const CARD_CONFIG = {
  claude_skill:    { Icon: Zap,           gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' },
  'Claude Skills': { Icon: Zap,           gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' },
  mcp_server:      { Icon: Server,        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
  'MCP Servers':   { Icon: Server,        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
  prompt_pack:     { Icon: MessageSquare, gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)' },
  'Prompt Packs':  { Icon: MessageSquare, gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)' },
  workflow:        { Icon: GitBranch,     gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
  'Workflows':     { Icon: GitBranch,     gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
  template:        { Icon: Layout,        gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
  'Templates':     { Icon: Layout,        gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
  bundle:          { Icon: Package,       gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)' },
  'Bundles':       { Icon: Package,       gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)' },
}

function CardHeader({ category }) {
  const config = CARD_CONFIG[category] ?? CARD_CONFIG['claude_skill']
  const { Icon, gradient } = config
  return (
    <div
      className="rounded-xl mb-4 h-[88px] flex items-center justify-center flex-shrink-0"
      style={{ background: gradient }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
        <Icon size={22} strokeWidth={1.75} className="text-white" aria-hidden="true" />
      </div>
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

export default function ListingCard({ listing }) {
  const { category, title, description, creator, price, rating, reviews } = listing

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-white p-5 transition-all duration-200 cursor-pointer hover:border-primary/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.09)] hover:-translate-y-0.5">
      <CardHeader category={category} />

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
