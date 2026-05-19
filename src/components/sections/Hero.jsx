import { useState, useEffect, useRef } from 'react'
import { Star, Zap, Server, GitBranch, MessageSquare } from 'lucide-react'
import Button from '../ui/Button'

const BASE_ITEMS = [
  'WORKFLOWS', 'TEMPLATES', 'BUNDLES', 'AGENTS',
  'INTEGRATIONS', 'CLAUDE SKILLS', 'MCP SERVERS', 'PROMPT PACKS',
]
const marqueeItems = [...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS]

const CYCLE_WORDS = [
  'Claude skills.',
  'MCP servers.',
  'AI workflows.',
  'Prompt packs.',
  'AI agents.',
]

const PREVIEW_CARDS = [
  {
    title: 'Code Review Pro',
    creator: 'Alex Chen',
    price: '£9.99',
    rating: '4.9',
    reviews: 312,
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    Icon: Zap,
  },
  {
    title: 'Notion MCP Bridge',
    creator: 'Sarah Kim',
    price: '£14.99',
    rating: '4.8',
    reviews: 187,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    Icon: Server,
  },
  {
    title: 'Sprint Automator',
    creator: 'Marco Rossi',
    price: 'Free',
    rating: '4.7',
    reviews: 94,
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    Icon: GitBranch,
  },
  {
    title: 'Email Prompt Pack',
    creator: 'Priya Nair',
    price: '£4.99',
    rating: '5.0',
    reviews: 58,
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
    Icon: MessageSquare,
  },
]

function CyclingWord() {
  const [current, setCurrent] = useState(0)
  const [incoming, setIncoming] = useState(null)
  const idxRef = useRef(0)

  useEffect(() => {
    const TRANSITION_MS = 480
    const run = () => {
      const next = (idxRef.current + 1) % CYCLE_WORDS.length
      setIncoming(next)
      setTimeout(() => {
        idxRef.current = next
        setCurrent(next)
        setIncoming(null)
      }, TRANSITION_MS)
    }
    const id = setInterval(run, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        color: '#3B82F6',
        verticalAlign: 'bottom',
        lineHeight: 'inherit',
        paddingBottom: '0.18em',  /* space for descenders (p, g, y…) */
        marginBottom: '-0.18em', /* cancel the layout shift from the padding */
      }}
    >
      {/*
        All words rendered as hidden spacers so the container is always
        wide enough for the longest word — prevents clipping during transitions.
        First word contributes height; the rest collapse to height 0.
      */}
      {CYCLE_WORDS.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          style={{
            visibility: 'hidden',
            display: 'block',
            whiteSpace: 'nowrap',
            lineHeight: i === 0 ? 'inherit' : '0',
            overflow: 'hidden',
          }}
        >
          {word}
        </span>
      ))}

      {/* Current word — exits upward */}
      <span
        key={`curr-${current}`}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          whiteSpace: 'nowrap',
          animation: incoming !== null
            ? 'ticker-exit 0.48s cubic-bezier(0.4, 0, 0.6, 1) forwards'
            : undefined,
        }}
      >
        {CYCLE_WORDS[current]}
      </span>

      {/* Incoming word — rises from below */}
      {incoming !== null && (
        <span
          key={`inc-${incoming}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'ticker-enter 0.48s cubic-bezier(0.4, 0, 0.6, 1) forwards',
          }}
        >
          {CYCLE_WORDS[incoming]}
        </span>
      )}
    </span>
  )
}

function PreviewCard({ card, delay = 0, floatAnim = 'hero-card-float-a', index = 0 }) {
  const { title, creator, price, rating, reviews, gradient, Icon } = card
  return (
    <div
      className="rounded-2xl border border-border/70 bg-white/95 p-4 backdrop-blur-sm"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        animation: `${floatAnim} ${6 + index * 1.3}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="rounded-xl mb-3 flex items-center justify-center flex-shrink-0"
        style={{ background: gradient, height: '56px' }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
          <Icon size={16} strokeWidth={1.75} className="text-white" aria-hidden="true" />
        </div>
      </div>
      <h4 className="text-[13px] font-bold text-primary leading-snug mb-0.5 truncate">{title}</h4>
      <p className="text-[11px] text-muted mb-3">{creator}</p>
      <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
        <span className="text-[12px] font-semibold text-primary">{price}</span>
        <div className="flex items-center gap-1">
          <Star size={10} className="text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="text-[11px] font-medium text-primary">{rating}</span>
          <span className="text-[10px] text-muted">({reviews})</span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="top" className="relative bg-white overflow-hidden h-screen flex flex-col">

      {/* Parallax background layer */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.04) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        {/* Aurora blob 1 — blue, dominant */}
        <div className="absolute" style={{
          top: '-25%', left: '5%', width: '75%', height: '75%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, transparent 68%)',
          animation: 'aurora-float-1 18s ease-in-out infinite',
        }} />
        {/* Aurora blob 2 — purple, top right */}
        <div className="absolute" style={{
          top: '-18%', right: '-8%', width: '62%', height: '62%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.16) 0%, transparent 68%)',
          animation: 'aurora-float-2 24s ease-in-out infinite',
        }} />
        {/* Aurora blob 3 — teal, top left */}
        <div className="absolute" style={{
          top: '3%', left: '-10%', width: '52%', height: '52%',
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 68%)',
          animation: 'aurora-float-3 16s ease-in-out infinite',
        }} />
        {/* Aurora blob 4 — indigo, center fill */}
        <div className="absolute" style={{
          top: '10%', left: '30%', width: '42%', height: '42%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
          animation: 'aurora-float-1 28s ease-in-out infinite reverse',
        }} />
        {/* Base atmospheric glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -15%, rgba(59,130,246,0.1), transparent 70%)',
        }} />
      </div>

      {/* Hero content — pb accounts for absolute marquee bar height (~56px) */}
      <div className="relative flex-1 flex items-center w-full pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">

            {/* Left — text */}
            <div className="lg:w-[54%] text-center lg:text-left">
              <h1 className="text-[46px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold text-primary leading-[1.01] tracking-[-0.03em] mb-7">
                Everything you need
                <br />
                to build{' '}
                <CyclingWord />
              </h1>

              <p className="text-[18px] md:text-[20px] text-dark-mid leading-relaxed mx-auto lg:mx-0 max-w-[520px] mb-10">
                Browse, buy, and sell skills, plugins, MCP servers, prompts, and workflows — all in one place.
                Built for builders, used by everyone.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
                <Button variant="primary" size="lg" href="#featured" className="hero-cta-primary">
                  Browse the Marqet
                </Button>
                <Button variant="ghost" size="lg" href="#sellers">
                  Sell Your Work →
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-[13px] text-muted">
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

            {/* Right — floating product preview (desktop only) */}
            <div className="hidden lg:block lg:w-[46%] relative" style={{ height: '440px' }}>
              {/* Ambient glow behind cards */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: '10%', left: '5%', right: '5%', bottom: '0',
                  background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(59,130,246,0.09), transparent)',
                }}
                aria-hidden="true"
              />

              {/* Card 1 — top left */}
              <div className="absolute" style={{ top: 0, left: '0%', width: '190px' }}>
                <PreviewCard card={PREVIEW_CARDS[0]} floatAnim="hero-card-float-a" index={0} delay={0} />
              </div>

              {/* Card 2 — top right, slightly lower */}
              <div className="absolute" style={{ top: '30px', right: '0%', width: '190px' }}>
                <PreviewCard card={PREVIEW_CARDS[1]} floatAnim="hero-card-float-b" index={1} delay={0.8} />
              </div>

              {/* Card 3 — center bottom, overlapping */}
              <div className="absolute" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '200px', zIndex: 10 }}>
                <PreviewCard card={PREVIEW_CARDS[2]} floatAnim="hero-card-float-a" index={2} delay={1.4} />
              </div>

              {/* Card 4 — bottom right, peeking */}
              <div className="absolute" style={{ bottom: '20px', right: '2%', width: '176px', opacity: 0.82 }}>
                <PreviewCard card={PREVIEW_CARDS[3]} floatAnim="hero-card-float-b" index={3} delay={2.1} />
              </div>

              {/* Bottom fade */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-20"
                style={{ height: '80px', background: 'linear-gradient(to top, white, transparent)' }}
                aria-hidden="true"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Marquee — flush with viewport bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-4 overflow-hidden z-10" aria-hidden="true">
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
