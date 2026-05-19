import { Star } from 'lucide-react'
import Button from '../ui/Button'

const BASE_ITEMS = [
  'WORKFLOWS',
  'TEMPLATES',
  'BUNDLES',
  'AGENTS',
  'INTEGRATIONS',
  'CLAUDE SKILLS',
  'MCP SERVERS',
  'PROMPT PACKS',
]

const marqueeItems = [...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS]

const stats = [
  { value: '2,400+', label: 'Add-ons' },
  { value: '18k', label: 'Builders' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: 'Free', label: 'To Browse' },
]

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative bg-gradient-to-b from-blue-50/80 via-white to-white pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden"
      >
        {/* Layered ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-32 -left-20 h-[320px] w-[480px] rounded-full bg-violet-300/8 blur-3xl" />
          <div className="absolute top-16 -right-20 h-[260px] w-[360px] rounded-full bg-blue-200/15 blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center relative">

            {/* Floating early access badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-4 py-2 mb-10 animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[12px] font-semibold text-dark-mid tracking-wide">
                Early Access — Join the waitlist
              </span>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-5">
              The AI Add-On Marketplace
            </p>

            <h1 className="font-display text-[46px] md:text-[68px] lg:text-[80px] italic font-normal text-primary leading-[1.0] tracking-[-0.02em] mb-8">
              Everything you need
              <br />
              to extend{' '}
              <span className="text-gradient-blue not-italic font-display">Claude.</span>
            </h1>

            <p className="text-[18px] md:text-[20px] text-dark-mid leading-relaxed mx-auto max-w-[560px] mb-10">
              Browse, buy, and sell skills, plugins, MCP servers, prompts, and workflows — all in one place.
              Built for builders, used by everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
              <Button variant="primary" size="lg" href="#featured">
                Browse the Marqet
              </Button>
              <Button variant="ghost" size="lg" href="#sellers">
                Sell Your Work →
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-0 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center px-7">
                    <span className="text-[22px] font-bold text-primary leading-tight">{stat.value}</span>
                    <span className="text-[11px] font-medium text-muted uppercase tracking-widest mt-0.5">{stat.label}</span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-[12px] text-muted">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <span>4.9</span>
              <span className="text-border">·</span>
              <span>Built for Claude</span>
              <span className="text-border">·</span>
              <span>Free to browse</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip with gradient edge masks */}
      <div className="relative bg-primary py-4 overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-primary to-transparent" />
        <div className="flex w-max animate-marquee">
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-3">
              <span className="text-[11px] font-semibold text-surface/70 tracking-widest whitespace-nowrap">{item}</span>
              <span className="h-1 w-1 rounded-full bg-surface/30 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
