import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Star, Zap, TrendingUp } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import ListingCard, { toSlug } from '../components/ui/ListingCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getSkills } from '../lib/api'
import { listings as MOCK_LISTINGS } from '../data/listings'
import { CATEGORIES } from '../data/categories'
import { isConfigured } from '../lib/amplify'

// Category ID → display name mapping
const CAT_ID_TO_NAME = {
  claude_skill: 'Claude Skills',
  mcp_server:   'MCP Servers',
  prompt_pack:  'Prompt Packs',
  workflow:     'Workflows',
  template:     'Templates',
  bundle:       'Bundles',
}

// Category → subtle ambient background tint (2-3% opacity — subliminal)
const AMBIENT = {
  '':            'rgba(255,255,255,0)',
  claude_skill:  'rgba(59,130,246,0.022)',
  mcp_server:    'rgba(139,92,246,0.022)',
  prompt_pack:   'rgba(20,184,166,0.022)',
  workflow:      'rgba(16,185,129,0.022)',
  template:      'rgba(236,72,153,0.022)',
  bundle:        'rgba(245,158,11,0.022)',
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most installed' },
  { value: 'rated', label: 'Highest rated' },
]

const TRENDING_SEARCHES = ['Notion MCP', 'Email templates', 'Code review skill', 'Slack integration']

// Normalize API skill → ListingCard shape
function normalizeSkill(skill) {
  return {
    id: skill.id,
    slug: skill.slug,
    category: CAT_ID_TO_NAME[skill.category] || skill.category,
    title: skill.title,
    description: skill.short_description,
    creator: skill.profiles?.display_name || skill.profiles?.username || 'Unknown',
    price: (skill.price_gbp ?? 0) === 0 ? 'Free' : `£${Number(skill.price_gbp).toFixed(2)}`,
    rating: skill.avg_rating,
    reviews: skill.review_count,
  }
}

// Marqet Pick — editorial featured slot
function MarqetPick({ listing }) {
  const { category, title, description, creator, price, rating, reviews } = listing
  return (
    <div className="col-span-full mb-2">
      <Link
        to={`/listing/${toSlug(listing.title)}`}
        className="group flex items-center gap-5 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/[0.04] via-accent/[0.02] to-transparent p-5 transition-all duration-200 hover:border-accent/35 hover:shadow-[0_2px_16px_rgba(59,130,246,0.1)] hover:-translate-y-0.5 cursor-pointer"
      >
        {/* Category icon */}
        <div className="hidden sm:flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <Zap size={22} className="text-accent" />
        </div>
        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
              <TrendingUp size={9} /> Marqet Pick
            </span>
            <span className="text-[12px] text-muted">· This week's top pick</span>
          </div>
          <h2 className="truncate text-[17px] font-bold text-primary group-hover:text-accent transition-colors">{title}</h2>
          <p className="hidden md:block truncate text-[13px] text-dark-mid mt-0.5">{description}</p>
        </div>
        {/* Price + rating */}
        <div className="flex-shrink-0 text-right">
          <p className="text-[18px] font-bold text-primary">{price}</p>
          {rating && (
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-[12px] text-muted">{rating} ({reviews})</span>
            </div>
          )}
          <p className="text-[12px] text-muted mt-0.5">by {creator}</p>
        </div>
      </Link>
    </div>
  )
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [skills, setSkills] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef(null)
  const gridRef = useRef(null)
  const spotlightRef = useRef(null)

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

      if (!isConfigured) {
        // Local dev: use mock data with filtering
        let mock = [...MOCK_LISTINGS]
        if (category) {
          const catName = CAT_ID_TO_NAME[category]
          mock = mock.filter(l => l.category === catName || l.category === category)
        }
        if (free) mock = mock.filter(l => l.price === 'Free')
        if (search) {
          const q = search.toLowerCase()
          mock = mock.filter(l =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.category.toLowerCase().includes(q)
          )
        }
        if (sort === 'rated') mock.sort((a, b) => b.rating - a.rating)
        setSkills(mock)
        setCount(mock.length)
      } else {
        setSkills(result.data.map(normalizeSkill))
        setCount(result.count)
      }
    } catch {
      setSkills([])
      setCount(0)
    } finally {
      setLoading(false)
      setAnimKey(k => k + 1)
    }
  }, [category, search, sort, free, page])

  useEffect(() => { load() }, [load])

  // Close search dropdown on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Spotlight beam — follows cursor across card grid
  const handleGridMouseMove = useCallback((e) => {
    const grid = gridRef.current
    const spotlight = spotlightRef.current
    if (!grid || !spotlight) return
    const rect = grid.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotlight.style.background = `radial-gradient(circle 520px at ${x}px ${y}px, rgba(59,130,246,0.055) 0%, transparent 72%)`
    spotlight.style.opacity = '1'
  }, [])

  const handleGridMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
  }, [])

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setSearchParams(next)
  }

  const totalPages = Math.ceil(count / LIMIT)
  const marqetPick = skills.length > 0 ? skills[0] : null

  return (
    <PageLayout fullWidth>
      {/* Ambient category color — subliminal background tint that shifts per category */}
      <div
        className="min-h-screen transition-[background-color] duration-700 ease-in-out"
        style={{ backgroundColor: AMBIENT[category] || AMBIENT[''] }}
      >
        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-[28px] font-bold text-primary">Browse The Marqet</h1>
              <p className="text-[15px] text-dark-mid mt-0.5">
                {loading ? 'Loading…' : count > 0 ? `${count} add-on${count === 1 ? '' : 's'}` : 'No results'}
              </p>
            </div>

            {/* Glassmorphism search */}
            <div className="sm:ml-auto flex items-center gap-3">
              <div ref={searchRef} className="relative">
                <div className={`relative transition-all duration-200 ${searchFocused ? 'drop-shadow-[0_0_12px_rgba(59,130,246,0.15)]' : ''}`}>
                  <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-150 ${searchFocused ? 'text-accent' : 'text-muted'}`} />
                  <input
                    type="search"
                    value={search}
                    onChange={e => setParam('q', e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search add-ons…"
                    className={`rounded-xl border bg-white pl-9 pr-4 py-2.5 text-[14px] outline-none transition-all duration-200 ${
                      searchFocused
                        ? 'border-accent/50 bg-white/95 backdrop-blur-sm w-72 shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                        : 'border-border w-64'
                    }`}
                  />
                </div>

                {/* Dropdown — trending searches when focused + empty */}
                {searchFocused && !search && (
                  <div className="absolute top-full mt-1.5 left-0 w-72 rounded-xl border border-border bg-white/95 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl z-30">
                    <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Trending searches</p>
                    {TRENDING_SEARCHES.map(term => (
                      <button
                        key={term}
                        onMouseDown={e => { e.preventDefault(); setParam('q', term); setSearchFocused(false) }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-dark-mid hover:bg-surface hover:text-primary transition-colors"
                      >
                        <Search size={12} className="flex-shrink-0 text-muted" />
                        {term}
                      </button>
                    ))}
                    <div className="mt-1 border-t border-border/60 pt-1 px-3 pb-1">
                      <p className="text-[10px] text-muted">Or press <kbd className="rounded border border-border px-1 text-[10px]">⌘K</kbd> for the full command palette</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setFiltersOpen(v => !v)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[14px] font-medium transition-all duration-150 ${
                  filtersOpen ? 'border-accent/40 bg-accent/5 text-accent' : 'border-border bg-white text-primary hover:border-accent/30'
                }`}
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
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-muted">Category</p>
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => setParam('category', '')}
                      className={`rounded-lg px-3 py-1.5 text-left text-[14px] transition-colors ${!category ? 'bg-accent/8 font-semibold text-accent' : 'text-dark-mid hover:text-primary hover:bg-surface'}`}
                    >
                      All categories
                    </button>
                    {CATEGORIES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setParam('category', c.id)}
                        className={`rounded-lg px-3 py-1.5 text-left text-[14px] transition-colors ${category === c.id ? 'bg-accent/8 font-semibold text-accent' : 'text-dark-mid hover:text-primary hover:bg-surface'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-muted">Price</p>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={free}
                      onChange={e => setParam('free', e.target.checked ? 'true' : '')}
                      className="accent-accent"
                    />
                    <span className="text-[14px] text-dark-mid">Free only</span>
                  </label>
                </div>

                {/* Sort */}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.20em] text-muted">Sort by</p>
                  <div className="flex flex-col gap-0.5">
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        onClick={() => setParam('sort', o.value)}
                        className={`rounded-lg px-3 py-1.5 text-left text-[14px] transition-colors ${sort === o.value ? 'bg-accent/8 font-semibold text-accent' : 'text-dark-mid hover:text-primary hover:bg-surface'}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {(category || free || search) && (
                  <button
                    onClick={() => setSearchParams({})}
                    className="flex items-center gap-1.5 text-[13px] text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    <X size={13} /> Clear filters
                  </button>
                )}
              </div>
            </aside>

            {/* Grid area */}
            <div className="min-w-0 flex-1">
              {loading ? (
                <SkeletonGrid />
              ) : skills.length === 0 ? (
                <EmptyState onClear={() => setSearchParams({})} />
              ) : (
                <>
                  {/* Spotlight + staggered grid */}
                  <div
                    ref={gridRef}
                    onMouseMove={handleGridMouseMove}
                    onMouseLeave={handleGridMouseLeave}
                    className="relative"
                  >
                    {/* Spotlight beam */}
                    <div
                      ref={spotlightRef}
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                      style={{ opacity: 0 }}
                      aria-hidden="true"
                    />

                    {/* Cards with staggered entrance */}
                    <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {/* Marqet Pick — editorial slot */}
                      {!category && !search && marqetPick && (
                        <MarqetPick listing={marqetPick} />
                      )}

                      {skills.map((skill, i) => (
                        <div
                          key={skill.id}
                          style={{
                            animation: 'card-in 0.38s ease forwards',
                            animationDelay: `${i * 42}ms`,
                            opacity: 0,
                          }}
                        >
                          <ListingCard listing={skill} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
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
      </div>
    </PageLayout>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-white p-5 animate-pulse">
          <div className="mb-4 h-[88px] w-full rounded-xl bg-surface" />
          <div className="mb-3 h-5 w-24 rounded bg-surface" />
          <div className="mb-2 h-5 w-3/4 rounded bg-surface" />
          <div className="mb-1 h-4 w-full rounded bg-surface" />
          <div className="h-4 w-2/3 rounded bg-surface" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="mb-2 text-[18px] font-bold text-primary">No add-ons found</p>
      <p className="mb-6 text-[15px] text-dark-mid">Try adjusting your filters or search term.</p>
      <Button variant="outline" size="sm" onClick={onClear}>Clear filters</Button>
    </div>
  )
}
