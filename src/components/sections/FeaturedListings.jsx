import { listings } from '../../data/listings'
import ListingCard from '../ui/ListingCard'

export default function FeaturedListings() {
  return (
    <section id="featured" className="bg-surface py-24 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-3">Featured</p>
          <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] mb-3">
            Handpicked add-ons
          </h2>
          <p className="text-[18px] text-dark-mid">The best of The Marqet, curated by our team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  )
}
