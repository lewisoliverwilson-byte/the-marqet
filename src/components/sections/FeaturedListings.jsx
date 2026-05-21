import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { listings } from '../../data/listings'
import ListingCard from '../ui/ListingCard'
import RevealOnScroll from '../ui/RevealOnScroll'

const FEATURED_IDS = [90, 38, 14, 62, 64, 99]
const featured = FEATURED_IDS.map(id => listings.find(l => l.id === id)).filter(Boolean)

export default function FeaturedListings() {
  return (
    <section id="featured" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-3">Featured</p>
              <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] mb-3">
                Handpicked add-ons
              </h2>
              <p className="text-[18px] text-dark-mid">The best of The Marqet, curated by our team.</p>
            </div>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-[14px] font-medium text-primary transition-all duration-150 hover:border-accent/40 hover:text-accent hover:shadow-[0_2px_12px_rgba(59,130,246,0.1)] flex-shrink-0"
            >
              See all <ArrowRight size={15} />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((listing, i) => (
            <RevealOnScroll key={listing.id} delay={i * 80}>
              <ListingCard listing={listing} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={200}>
          <div className="mt-10 text-center">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Browse all add-ons <ArrowRight size={16} />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
