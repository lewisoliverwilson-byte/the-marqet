import { categories } from '../../data/categories'
import CategoryCard from '../ui/CategoryCard'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function Categories() {
  return (
    <section id="categories" className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest3 text-accent mb-3">
              Browse by Category
            </p>
            <h2 className="text-[36px] md:text-[48px] font-bold text-primary leading-[1.1] tracking-[-0.01em] mb-3">
              Find exactly what you need
            </h2>
            <p className="text-[18px] text-dark-mid">Six clean categories. No clutter.</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, i) => (
            <RevealOnScroll key={category.id} delay={i * 70}>
              <CategoryCard category={category} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
