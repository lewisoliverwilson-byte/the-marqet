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
      <section id="top" className="bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-5">
              The AI Add-On Marketplace
            </p>

            <h1 className="text-[44px] md:text-[64px] lg:text-[72px] font-bold text-primary leading-[1.05] tracking-[-0.02em] mb-6">
              Everything you need
              <br />
              to extend Claude.
            </h1>

            <p className="text-[18px] md:text-[20px] text-dark-mid leading-relaxed mx-auto max-w-[560px] mb-8">
              Browse, buy, and sell skills, plugins, MCP servers, prompts, and workflows — all in one place.
              Built for builders, used by everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Button variant="primary" size="lg" href="#featured">
                Browse the Marqet
              </Button>
              <Button variant="ghost" size="lg" href="#sellers">
                Sell Your Work →
              </Button>
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

      {/* Marquee strip — flush below hero */}
      <div className="bg-primary py-4 overflow-hidden" aria-hidden="true">
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
