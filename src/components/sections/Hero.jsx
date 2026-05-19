import { Star, Zap, Server, MessageSquare, GitBranch, Package, Layout } from 'lucide-react'
import Button from '../ui/Button'

const BASE_ITEMS = [
  'WORKFLOWS', 'TEMPLATES', 'BUNDLES', 'AGENTS',
  'INTEGRATIONS', 'CLAUDE SKILLS', 'MCP SERVERS', 'PROMPT PACKS',
]

// ─── Card gradient / icon config (shared visual language with ListingCard) ───
const TYPE_CONFIG = {
  'Claude Skill': { Icon: Zap,           gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)' },
  'Prompt Pack':  { Icon: MessageSquare, gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)' },
  'MCP Server':   { Icon: Server,        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
  'Workflow':     { Icon: GitBranch,     gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
  'Bundle':       { Icon: Package,       gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)' },
  'Template':     { Icon: Layout,        gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
}

// ─── Column data (left = A+B merged, right = C+D merged for variety) ─────────
const LEFT_CARDS = [
  { title: 'Web Research Agent',  type: 'Claude Skill', price: '$29'  },
  { title: 'GitHub MCP',          type: 'MCP Server',   price: '$39'  },
  { title: 'Email Drafter',       type: 'Prompt Pack',  price: '$12'  },
  { title: 'Meeting Notes',       type: 'Workflow',     price: 'Free' },
  { title: 'Code Reviewer',       type: 'Claude Skill', price: 'Free' },
  { title: 'SEO Pack Pro',        type: 'Prompt Pack',  price: '$19'  },
  { title: 'Data Analysis Kit',   type: 'Bundle',       price: '$49'  },
  { title: 'Jira Connector',      type: 'MCP Server',   price: '$25'  },
  { title: 'Content Planner',     type: 'Workflow',     price: '$9'   },
  { title: 'Bug Finder Pro',      type: 'Claude Skill', price: '$35'  },
  { title: 'Blog Writer',         type: 'Prompt Pack',  price: '$9'   },
  { title: 'Starter Bundle',      type: 'Bundle',       price: '$79'  },
]

const RIGHT_CARDS = [
  { title: 'Design Reviewer',     type: 'Claude Skill', price: '$24'  },
  { title: 'Notion Sync',         type: 'MCP Server',   price: '$29'  },
  { title: 'Full Stack Bundle',   type: 'Bundle',       price: '$99'  },
  { title: 'Report Writer',       type: 'Workflow',     price: '$12'  },
  { title: 'Ad Generator',        type: 'Prompt Pack',  price: '$14'  },
  { title: 'Support Agent',       type: 'Claude Skill', price: '$39'  },
  { title: 'Linear Tracker',      type: 'MCP Server',   price: '$19'  },
  { title: 'Sprint Planner',      type: 'Workflow',     price: '$14'  },
  { title: 'Analytics Bundle',    type: 'Bundle',       price: '$59'  },
  { title: 'Interview Prep',      type: 'Prompt Pack',  price: '$11'  },
  { title: 'Code Documenter',     type: 'Claude Skill', price: 'Free' },
  { title: 'Figma Connector',     type: 'MCP Server',   price: '$22'  },
]

function BgCard({ title, type, price }) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG['Claude Skill']
  const { Icon, gradient } = config

  return (
    <div
      className="rounded-xl border border-border/50 bg-white shadow-sm mb-3 flex-shrink-0 overflow-hidden"
      style={{ width: '168px' }}
    >
      <div className="h-[52px] flex items-center justify-center" style={{ background: gradient }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
          <Icon size={15} strokeWidth={2} className="text-white" aria-hidden="true" />
        </div>
      </div>
      <div className="p-3">
        <div className="text-[10px] font-semibold text-muted mb-1 truncate uppercase tracking-wide">{type}</div>
        <div className="text-[12px] font-bold text-primary leading-snug mb-1.5 line-clamp-2">{title}</div>
        <div className="text-[11px] font-semibold text-accent">{price}</div>
      </div>
    </div>
  )
}

function BgColumn({ cards, scrollUp, duration, delay = 0 }) {
  const doubled = [...cards, ...cards]
  return (
    <div
      className="flex flex-col"
      style={{
        animation: `${scrollUp ? 'scroll-up' : 'scroll-down'} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {doubled.map((card, i) => (
        <BgCard key={i} {...card} />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative bg-white overflow-hidden min-h-screen flex flex-col">

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.04) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Blue top glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08), transparent 70%)',
        }}
      />

      {/* ── Scrolling card columns — 1 per side, desktop only ─────────── */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden" aria-hidden="true">
        {/* Left column */}
        <div className="absolute top-0 bottom-0 left-4">
          <BgColumn cards={LEFT_CARDS} scrollUp duration={55} delay={-12} />
        </div>

        {/* Right column */}
        <div className="absolute top-0 bottom-0 right-4">
          <BgColumn cards={RIGHT_CARDS} scrollUp={false} duration={62} delay={-28} />
        </div>

        {/* Center mask — clear at edges so cards are visible, solid white in the middle */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to right,',
              '  rgba(255,255,255,0)    0%,',
              '  rgba(255,255,255,0.05) 10%,',
              '  rgba(255,255,255,0.9)  18%,',
              '  rgba(255,255,255,1)    24%,',
              '  rgba(255,255,255,1)    76%,',
              '  rgba(255,255,255,0.9)  82%,',
              '  rgba(255,255,255,0.05) 90%,',
              '  rgba(255,255,255,0)    100%)',
            ].join(''),
          }}
        />

        {/* Top + bottom vertical fade */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              '  rgba(255,255,255,0.7) 0%,',
              '  transparent 10%,',
              '  transparent 86%,',
              '  rgba(255,255,255,0.5) 100%)',
            ].join(''),
          }}
        />
      </div>

      {/* ── Hero content ─────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center w-full pt-20 pb-10">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[50px] md:text-[72px] lg:text-[88px] font-bold text-primary leading-[1.01] tracking-[-0.03em] mb-7">
              Everything you need
              <br />
              to extend{' '}
              <span style={{ color: '#3B82F6' }}>Claude.</span>
            </h1>

            <p className="text-[19px] md:text-[21px] text-dark-mid leading-relaxed mx-auto max-w-[540px] mb-10">
              Browse, buy, and sell skills, plugins, MCP servers, prompts, and workflows — all in one place.
              Built for builders, used by everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Button variant="primary" size="lg" href="#featured">
                Browse the Marqet
              </Button>
              <Button variant="ghost" size="lg" href="#sellers">
                Sell Your Work →
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[13px] text-muted">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <span className="font-semibold text-primary ml-1">4.9</span>
              <span className="mx-1.5 text-border">·</span>
              <span>Built for Claude</span>
              <span className="mx-1.5 text-border">·</span>
              <span>Free to browse</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Static category strip — pinned to bottom of first screen ─── */}
      <div className="bg-primary py-4 flex-shrink-0">
        <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2 px-6">
          {BASE_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-5">
              <span className="text-[11px] font-semibold text-white/50 tracking-widest whitespace-nowrap">
                {item}
              </span>
              {i < BASE_ITEMS.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
