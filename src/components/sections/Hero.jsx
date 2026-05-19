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

export default function Hero() {
  return (
    <>
      <section id="top" className="relative bg-white overflow-hidden pt-28 pb-20 md:pt-44 md:pb-28">
        {/* Dot grid background — fades to white at center */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(17,17,17,0.045) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        {/* Blue atmospheric glow at top */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(59,130,246,0.09), transparent 70%)',
          }}
        />
        {/* White radial fade so heading text is always crisp */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 65% at 50% 42%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 55%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-6">
              The AI Add-On Marketplace
            </p>

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
      </section>

      {/* Marquee — gradient edge masks */}
      <div className="relative bg-primary py-4 overflow-hidden" aria-hidden="true">
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
    </>
  )
}
