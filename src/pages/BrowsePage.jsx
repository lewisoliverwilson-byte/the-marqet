import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'
import Button from '../components/ui/Button'
import { getSkills } from '../lib/api'
import { CATEGORIES } from '../data/categories'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most installed' },
  { value: 'rated', label: 'Highest rated' },
]

function SkillCard({ skill }) {
  const author = skill.profiles
  const initials = (author?.display_name || author?.username || '?').charAt(0).toUpperCase()
  const price = skill.price_gbp === 0 ? 'Free' : `£${Number(skill.price_gbp).toFixed(2)}`

  return (
    <a href={`/skills/${skill.slug}`} className="group block rounded-2xl border border-border bg-white p-5 hover:border-accent hover:shadow-sm transition-all duration-150">
      <div className="mb-3">
        <Badge category={skill.category} />
      </div>
      <h3 className="text-[16px] font-bold text-primary leading-snug mb-1 group-hover:text-accent transition-colors">{skill.title}</h3>
      <p className="text-[13px] text-dark-mid leading-relaxed mb-4 line-clamp-2">{skill.short_description}</p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-[11px] font-bold flex-shrink-0">
          {author?.avatar_url
            ? <img src={author.avatar_url} alt="" className="h-6 w-6 rounded-full object-cover" />
            : initials}
        </div>
        <span className="text-[13px] text-dark-mid">{author?.display_name || author?.username || 'Unknown'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-bold text-primary">{price}</span>
        {skill.avg_rating ? (
          <div className="flex items-center gap-1.5">
            <StarRating value={Math.round(skill.avg_rating)} size={12} readOnly />
            <span className="text-[12px] text-muted">{skill.avg_rating.toFixed(1)} ({skill.review_count})</span>
          </div>
        ) : (
          <span className="text-[12px] text-muted">No reviews yet</span>
        )}
      </div>
    </a>
  )
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [skills, setSkills] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = searchParams.get('category') || ''
  const search = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'newest'
  const free = searchParams.get('free') === 'true'
  const page = parseInt(searchParams.get('page') || '1')
  const LIMIT = 24

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getSkills({ category: category || undefined, search: search || undefined, sort, free: free || undefined, page, limit: LIMIT })
      setSkills(result.data)
      setCount(result.count)
    } catch {
      setSkills([])
    } finally {
      setLoading(false)
    }
  }, [category, search, sort, free, page])

  useEffect(() => { load() }, [load])

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setSearchParams(next)
  }

  const totalPages = Math.ceil(count / LIMIT)

  return (
    <PageLayout fullWidth>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-primary">Browse The Marqet</h1>
            <p className="text-[15px] text-dark-mid mt-0.5">{count > 0 ? `${count} add-ons` : 'No results'}</p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={e => setParam('q', e.target.value)}
                placeholder="Search add-ons…"
                className="rounded-xl border border-border bg-white pl-9 pr-4 py-2.5 text-[14px] focus:border-accent focus:outline-none w-64"
              />
            </div>
            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-[14px] font-medium text-primary hover:border-accent transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Category */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest3 text-muted mb-3">Category</p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setParam('category', '')}
                    className={`text-left text-[14px] px-3 py-1.5 rounded-lg transition-colors ${!category ? 'bg-blue-50 text-accent font-semibold' : 'text-dark-mid hover:text-primary'}`}
                  >
                    All categories
                  </button>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setParam('category', c.id)}
                      className={`text-left text-[14px] px-3 py-1.5 rounded-lg transition-colors ${category === c.id ? 'bg-blue-50 text-accent font-semibold' : 'text-dark-mid hover:text-primary'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest3 text-muted mb-3">Price</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={free} onChange={e => setParam('free', e.target.checked ? 'true' : '')} className="accent-accent" />
                  <span className="text-[14px] text-dark-mid">Free only</span>
                </label>
              </div>

              {/* Sort */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest3 text-muted mb-3">Sort by</p>
                <div className="flex flex-col gap-1">
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      onClick={() => setParam('sort', o.value)}
                      className={`text-left text-[14px] px-3 py-1.5 rounded-lg transition-colors ${sort === o.value ? 'bg-blue-50 text-accent font-semibold' : 'text-dark-mid hover:text-primary'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(category || free || search) && (
                <button onClick={() => setSearchParams({})} className="flex items-center gap-1.5 text-[13px] text-rose-500 hover:text-rose-600">
                  <X size={13} /> Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-white p-5 animate-pulse">
                    <div className="h-5 w-24 bg-surface rounded mb-3" />
                    <div className="h-5 w-3/4 bg-surface rounded mb-2" />
                    <div className="h-4 w-full bg-surface rounded mb-1" />
                    <div className="h-4 w-2/3 bg-surface rounded" />
                  </div>
                ))}
              </div>
            ) : skills.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-[18px] font-bold text-primary mb-2">No add-ons found</p>
                <p className="text-[15px] text-dark-mid mb-6">Try adjusting your filters or search term.</p>
                <Button variant="outline" size="sm" onClick={() => setSearchParams({})}>Clear filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {skills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setParam('page', String(page - 1))}>Previous</Button>
                    <span className="text-[14px] text-dark-mid">Page {page} of {totalPages}</span>
                    <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setParam('page', String(page + 1))}>Next</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
