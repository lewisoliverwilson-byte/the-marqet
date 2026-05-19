import { listings } from '../../data/listings'
import ListingCard from '../ui/ListingCard'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function FeaturedListings() {
  return (
    <section id="featured" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-3">Featured</p>
            <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] mb-3">
              Handpicked add-ons
            </h2>
            <p className="text-[18px] text-dark-mid">The best of The Marqet, curated by our team.</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing, i) => (
            <RevealOnScroll key={listing.id} delay={i * 80}>
              <ListingCard listing={listing} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
