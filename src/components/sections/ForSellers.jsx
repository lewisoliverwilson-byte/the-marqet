import { Check } from 'lucide-react'
import Button from '../ui/Button'
import RevealOnScroll from '../ui/RevealOnScroll'
import { setSellerIntent } from '../../lib/waitlistIntent'

const benefits = [
  'Free to list — no upfront costs',
  'You set the price (or list for free)',
  '20% commission — you keep 80%',
  'Built-in payments via Stripe',
  'Version management for your listings',
  'Analytics dashboard — see views and sales',
  'Priority support for verified sellers',
]

export default function ForSellers() {
  function handleApply(e) {
    e.preventDefault()
    setSellerIntent()
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="sellers" className="relative bg-primary py-24 md:py-32 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Ambient corner glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at top right, rgba(59,130,246,0.07), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <RevealOnScroll>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest3 text-dark-mid mb-5">
                Sell Your Work
              </p>
              <h2 className="text-[44px] md:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6">
                Your add-ons deserve
                <br />
                an audience.
              </h2>
              <p className="text-[18px] text-muted leading-relaxed max-w-[520px] mb-8">
                The Marqet is the dedicated marketplace for AI builders. Whether you've built a Claude skill for
                your own team or an MCP server that connects to every major CRM — there are thousands of users
                looking for exactly what you've made.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button variant="white" size="lg" href="#waitlist" onClick={handleApply}>
                  Apply to Sell →
                </Button>
                <a
                  href="#how-it-works"
                  className="text-[15px] font-semibold text-accent hover:text-blue-400 transition-colors duration-150"
                >
                  Learn about our seller programme →
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                    style={{ backgroundColor: 'rgba(59,130,246,0.12)' }}
                  >
                    <Check size={14} strokeWidth={2} className="text-accent" aria-hidden="true" />
                  </div>
                  <span className="text-[15px] text-muted leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
