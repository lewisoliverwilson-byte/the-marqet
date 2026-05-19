import { Star } from 'lucide-react'
import Button from '../ui/Button'

const BASE_ITEMS = [
  'WORKFLOWS', 'TEMPLATES', 'BUNDLES', 'AGENTS',
  'INTEGRATIONS', 'CLAUDE SKILLS', 'MCP SERVERS', 'PROMPT PACKS',
]
const marqueeItems = [...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS]

// ─── background card data ───────────────────────────────────────────────────
const COL_A = [
  { title: 'Web Research Agent',  type: 'Claude Skill', price: '$29',  color: '#3B82F6' },
  { title: 'Email Drafter',       type: 'Prompt Pack',  price: '$12',  color: '#14B8A6' },
  { title: 'GitHub MCP',          type: 'MCP Server',   price: '$39',  color: '#8B5CF6' },
  { title: 'Code Reviewer',       type: 'Claude Skill', price: 'Free', color: '#3B82F6' },
  { title: 'SEO Pack Pro',        type: 'Prompt Pack',  price: '$19',  color: '#14B8A6' },
  { title: 'Jira Connector',      type: 'MCP Server',   price: '$25',  color: '#8B5CF6' },
  { title: 'Meeting Notes',       type: 'Workflow',     price: 'Free', color: '#10B981' },
  { title: 'API Builder',         type: 'MCP Server',   price: '$15',  color: '#8B5CF6' },
  { title: 'Doc Generator',       type: 'Claude Skill', price: '$18',  color: '#3B82F6' },
  { title: 'Blog Writer',         type: 'Prompt Pack',  price: '$9',   color: '#14B8A6' },
]
const COL_B = [
  { title: 'Data Analysis Kit',   type: 'Bundle',       price: '$49',  color: '#F59E0B' },
  { title: 'Legal Drafter',       type: 'Prompt Pack',  price: '$22',  color: '#14B8A6' },
  { title: 'Slack Integration',   type: 'MCP Server',   price: '$19',  color: '#8B5CF6' },
  { title: 'Content Planner',     type: 'Workflow',     price: '$9',   color: '#10B981' },
  { title: 'Bug Finder Pro',      type: 'Claude Skill', price: '$35',  color: '#3B82F6' },
  { title: 'Sales Copy Pack',     type: 'Prompt Pack',  price: '$17',  color: '#14B8A6' },
  { title: 'Starter Bundle',      type: 'Bundle',       price: '$79',  color: '#F59E0B' },
  { title: 'DB Assistant',        type: 'MCP Server',   price: '$29',  color: '#8B5CF6' },
  { title: 'Test Writer',         type: 'Claude Skill', price: '$22',  color: '#3B82F6' },
  { title: 'Tweet Generator',     type: 'Prompt Pack',  price: 'Free', color: '#14B8A6' },
]
const COL_C = [
  { title: 'Design Reviewer',     type: 'Claude Skill', price: '$24',  color: '#3B82F6' },
  { title: 'Notion Sync',         type: 'MCP Server',   price: '$29',  color: '#8B5CF6' },
  { title: 'Ad Generator',        type: 'Prompt Pack',  price: '$14',  color: '#14B8A6' },
  { title: 'Full Stack Bundle',   type: 'Bundle',       price: '$99',  color: '#F59E0B' },
  { title: 'Figma Connector',     type: 'MCP Server',   price: '$22',  color: '#8B5CF6' },
  { title: 'Report Writer',       type: 'Workflow',     price: '$12',  color: '#10B981' },
  { title: 'PR Summariser',       type: 'Claude Skill', price: 'Free', color: '#3B82F6' },
  { title: 'Recipe Builder',      type: 'Prompt Pack',  price: '$7',   color: '#14B8A6' },
  { title: 'CRM Sync',            type: 'MCP Server',   price: '$35',  color: '#8B5CF6' },
  { title: 'Sprint Kit',          type: 'Bundle',       price: '$45',  color: '#F59E0B' },
]
const COL_D = [
  { title: 'Support Agent',       type: 'Claude Skill', price: '$39',  color: '#3B82F6' },
  { title: 'Linear Tracker',      type: 'MCP Server',   price: '$19',  color: '#8B5CF6' },
  { title: 'Interview Prep',      type: 'Prompt Pack',  price: '$11',  color: '#14B8A6' },
  { title: 'Sprint Planner',      type: 'Workflow',     price: '$14',  color: '#10B981' },
  { title: 'Code Documenter',     type: 'Claude Skill', price: 'Free', color: '#3B82F6' },
  { title: 'Analytics Bundle',    type: 'Bundle',       price: '$59',  color: '#F59E0B' },
  { title: 'Calendar Sync',       type: 'MCP Server',   price: '$15',  color: '#8B5CF6' },
  { title: 'Cover Letter Pro',    type: 'Prompt Pack',  price: '$8',   color: '#14B8A6' },
  { title: 'Onboarding Kit',      type: 'Workflow',     price: '$24',  color: '#10B981' },
  { title: 'Dev Bundle',          type: 'Bundle',       price: '$89',  color: '#F59E0B' },
]

function BgCard({ title, type, price, color }) {
  return (
    <div
      className="rounded-xl border border-border/60 bg-white shadow-sm mb-3 p-3.5 flex-shrink-0"
      style={{ width: '160px' }}
    >
      <div
        className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 whitespace-nowrap"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {type}
      </div>
      <div className="text-[13px] font-semibold text-primary leading-snug mb-1.5 line-clamp-2">{title}</div>
      <div className="text-[12px] font-bold text-primary">{price}</div>
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

      {/* ── Dot grid background ──────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.04) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* ── Subtle top blue glow ─────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08), transparent 70%)',
        }}
      />

      {/* ── Scrolling card columns (desktop only) ────────────────────── */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden" aria-hidden="true">
        {/* Left side */}
        <div className="absolute top-0 bottom-0 left-3 flex gap-3">
          <BgColumn cards={COL_A} scrollUp duration={32} delay={-8} />
          <BgColumn cards={COL_B} scrollUp={false} duration={40} delay={-15} />
        </div>

        {/* Right side */}
        <div className="absolute top-0 bottom-0 right-3 flex gap-3">
          <BgColumn cards={COL_C} scrollUp={false} duration={36} delay={-5} />
          <BgColumn cards={COL_D} scrollUp duration={28} delay={-20} />
        </div>

        {/* Center white mask — keeps hero text area clean */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to right,',
              '  transparent 0%,',
              '  rgba(255,255,255,0.92) 18%,',
              '  rgba(255,255,255,1) 26%,',
              '  rgba(255,255,255,1) 74%,',
              '  rgba(255,255,255,0.92) 82%,',
              '  transparent 100%)',
            ].join(''),
          }}
        />
        {/* Top + bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              '  rgba(255,255,255,0.6) 0%,',
              '  transparent 12%,',
              '  transparent 82%,',
              '  rgba(255,255,255,0.7) 100%)',
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

      {/* ── Marquee — pinned to bottom of first screen ───────────────── */}
      <div className="relative bg-primary py-4 overflow-hidden flex-shrink-0" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-primary to-transparent" />
        <div className="flex w-max animate-marquee">
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-3">
              <span className="text-[11px] font-semibold text-white/50 tracking-widest whitespace-nowrap">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
