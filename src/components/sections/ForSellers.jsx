import { Check } from 'lucide-react'
import Button from '../ui/Button'
import { setSellerIntent } from '../../lib/waitlistIntent'

const benefits = [
  'Free to list — no upfront cost',
  '80% revenue share on every sale',
  'Monthly Stripe payouts, no minimum threshold',
  'Real ratings from verified buyers only',
  'Featured placement for top-rated add-ons',
  'Verified developer badge after identity check',
  'Portable reputation you own, not locked to a platform',
]

export default function ForSellers() {
  function handleApply(e) {
    e.preventDefault()
    setSellerIntent()
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="sellers" className="bg-primary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column */}
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
              The Marqet gives builders a home for their work — with real ratings, verified buyers, and a revenue
              share that actually rewards quality. List for free. Get paid when people value what you built.
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

          {/* Right column — benefits */}
          <div>
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                    style={{ backgroundColor: '#3B82F615' }}
                  >
                    <Check size={14} strokeWidth={2} className="text-accent" aria-hidden="true" />
                  </div>
                  <span className="text-[15px] text-muted leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
