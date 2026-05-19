import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Zap, Server, MessageSquare, GitBranch, Package, Layout, ArrowRight, Command } from 'lucide-react'
import { listings } from '../../data/listings'

const CAT_CONFIG = {
  'Claude Skills': { Icon: Zap,           color: '#3B82F6' },
  'MCP Servers':   { Icon: Server,        color: '#8B5CF6' },
  'Prompt Packs':  { Icon: MessageSquare, color: '#14B8A6' },
  'Workflows':     { Icon: GitBranch,     color: '#10B981' },
  'Templates':     { Icon: Layout,        color: '#EC4899' },
  'Bundles':       { Icon: Package,       color: '#F59E0B' },
}

const SHORTCUTS = [
  { label: 'Browse all add-ons', href: '/browse', hint: '↵' },
  { label: 'Start selling', href: '/submit', hint: '↵' },
  { label: 'Sign in', href: '/auth/login', hint: '↵' },
]

const TRENDING = ['Notion MCP', 'Email prompt pack', 'Code review skill', 'Slack integration']

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [])

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30)
      setSelectedIndex(0)
    }
  }, [open])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const results = query.length < 1
    ? listings.slice(0, 6)
    : listings.filter(l =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.description.toLowerCase().includes(query.toLowerCase()) ||
        l.category.toLowerCase().includes(query.toLowerCase())
      )

  const handleSelect = useCallback((item) => {
    if (item.href) {
      navigate(item.href)
    } else if (item.slug) {
      navigate(`/skills/${item.slug || item.id}`)
    } else {
      navigate('/browse')
    }
    close()
  }, [navigate, close])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') { close(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[selectedIndex]
      if (item) handleSelect(item)
    }
  }, [results, selectedIndex, handleSelect, close])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-[18vh] left-1/2 z-[61] w-full max-w-[580px] -translate-x-1/2 px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-white/92 shadow-[0_8px_48px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl">

          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
            <Search size={16} className="flex-shrink-0 text-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
              onKeyDown={onKeyDown}
              placeholder="Search add-ons, skills, MCP servers…"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-primary placeholder:text-muted outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button onClick={() => { setQuery(''); setSelectedIndex(0); inputRef.current?.focus() }} className="text-muted hover:text-primary transition-colors">
                <X size={14} />
              </button>
            ) : (
              <kbd className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[11px] font-medium text-muted sm:inline-flex">ESC</kbd>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[340px] overflow-y-auto overscroll-contain py-2">
            {query.length < 1 ? (
              <>
                {/* Trending searches */}
                <div className="px-4 pb-1 pt-1">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Trending searches</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING.map(term => (
                      <button
                        key={term}
                        onClick={() => { setQuery(term); setSelectedIndex(0); inputRef.current?.focus() }}
                        className="rounded-lg border border-border px-2.5 py-1 text-[12px] text-dark-mid hover:border-accent/40 hover:text-primary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 border-t border-border/60 pt-2">
                  <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Featured add-ons</p>
                  {listings.slice(0, 5).map((listing, i) => (
                    <ResultItem
                      key={listing.id}
                      item={listing}
                      isSelected={i === selectedIndex}
                      onHover={() => setSelectedIndex(i)}
                      onSelect={() => handleSelect(listing)}
                    />
                  ))}
                </div>
              </>
            ) : results.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-[15px] font-semibold text-primary mb-1">No results</p>
                <p className="text-[13px] text-muted">Try a different search term</p>
              </div>
            ) : (
              results.map((listing, i) => (
                <ResultItem
                  key={listing.id}
                  item={listing}
                  isSelected={i === selectedIndex}
                  onHover={() => setSelectedIndex(i)}
                  onSelect={() => handleSelect(listing)}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <Kbd>↑↓</Kbd> navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> open
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd> close
            </span>
            <span className="ml-auto flex items-center gap-1 opacity-50">
              <Command size={10} />
              <span>K</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

function Kbd({ children }) {
  return (
    <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border px-1 text-[10px] font-medium text-muted">
      {children}
    </kbd>
  )
}

function ResultItem({ item, isSelected, onHover, onSelect }) {
  const { Icon, color } = CAT_CONFIG[item.category] || { Icon: Zap, color: '#3B82F6' }

  return (
    <button
      onMouseEnter={onHover}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        isSelected ? 'bg-surface' : 'hover:bg-surface/60'
      }`}
    >
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={14} style={{ color }} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-primary">{item.title}</p>
        <p className="truncate text-[12px] text-muted">{item.category} · {item.price}</p>
      </div>
      {isSelected && <ArrowRight size={13} className="flex-shrink-0 text-muted" aria-hidden="true" />}
    </button>
  )
}
