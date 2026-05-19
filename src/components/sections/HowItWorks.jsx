import { useState } from 'react'
import { Search, ShoppingBag, Zap, PenTool, Upload, DollarSign } from 'lucide-react'
import RevealOnScroll from '../ui/RevealOnScroll'

const tabs = {
  buyers: {
    label: 'For Buyers',
    steps: [
      {
        icon: Search,
        title: 'Find what you need',
        description: 'Browse by category or search for exactly what you\'re looking for. Every listing is clearly categorised and properly described.',
      },
      {
        icon: ShoppingBag,
        title: 'One-click purchase',
        description: 'Secure checkout in seconds. No subscriptions unless you want them. Pay once, use forever — or subscribe for ongoing updates.',
      },
      {
        icon: Zap,
        title: 'Use it instantly',
        description: 'Every add-on comes with clear setup instructions. Most take under five minutes to install and configure with Claude.',
      },
    ],
  },
  sellers: {
    label: 'For Sellers',
    steps: [
      {
        icon: PenTool,
        title: 'Build your add-on',
        description: 'Create a skill, prompt pack, MCP server, or workflow. Use the format you know — we support everything.',
      },
      {
        icon: Upload,
        title: 'List it for free',
        description: 'Submit via our structured form. Our team reviews every submission within 48 hours and gives clear feedback.',
      },
      {
        icon: DollarSign,
        title: 'Get paid',
        description: '20% platform commission. 80% goes to you, paid monthly via Stripe with no minimum threshold.',
      },
    ],
  },
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('buyers')
  const { steps } = tabs[activeTab]

  return (
    <section id="how-it-works" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] text-center mb-10">
            Simple to use. Powerful to build.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center rounded-full border border-border bg-white shadow-sm p-1 gap-1">
              {Object.entries(tabs).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-200 ${
                    activeTab === key
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-transparent text-dark-mid hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <RevealOnScroll key={`${activeTab}-${i}`} delay={i * 100}>
                <div className="relative flex flex-col items-start p-6 rounded-2xl bg-white border border-border overflow-hidden">
                  <span className="absolute top-4 right-5 text-[72px] font-bold text-primary/[0.04] leading-none select-none pointer-events-none">
                    {i + 1}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-widest3 text-muted mb-4 relative">
                    Step {i + 1}
                  </p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 mb-5 relative">
                    <Icon size={22} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-[20px] font-bold text-primary leading-snug mb-2 relative">{step.title}</h3>
                  <p className="text-[15px] text-dark-mid leading-relaxed relative">{step.description}</p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
