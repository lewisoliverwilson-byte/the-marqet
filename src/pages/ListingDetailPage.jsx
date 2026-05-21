import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Star, Download, Copy, CheckCircle, ArrowLeft, ShieldCheck,
  X, Mail, Terminal, FileText, Layers, Server,
} from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { listings } from '../data/listings'
import { getListingVisual, getTreatment } from '../lib/listingVisuals'

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// ─── Install instructions per category ──────────────────────────────────────

const INSTALL_STEPS = {
  'Claude Skills': {
    sections: [
      {
        heading: 'Claude Code slash commands',
        icon: Terminal,
        description: 'If this is a slash-command bundle for Claude Code (contains a commands/ folder):',
        steps: [
          'Download the zip and unzip it on your machine.',
          <>Copy the <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">.md</code> files from the <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">commands/</code> folder into <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">~/.claude/commands/</code> (all projects) or <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">.claude/commands/</code> in your project root (project-only).</>,
          'Open or restart Claude Code — your new commands appear as /command-name in any session.',
        ],
      },
      {
        heading: 'Claude.ai system prompt skill',
        icon: FileText,
        description: 'If this is a standalone skill (a SKILL.md or prompt file):',
        steps: [
          'Click "Copy to clipboard" or download the zip.',
          <>In <strong>Claude.ai</strong>, open a Project and paste the content into "Project instructions".</>,
          'The skill activates automatically in every conversation in that project.',
          <>Alternatively, add it to your <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">CLAUDE.md</code> in any Claude Code project.</>,
        ],
      },
    ],
  },
  'MCP Servers': {
    sections: [
      {
        heading: 'Claude Desktop setup',
        icon: Server,
        description: 'MCP servers connect Claude to external tools and data. Setup takes about 2 minutes.',
        steps: [
          'Download the zip and unzip it to a stable location (e.g. ~/mcp-servers/name/).',
          <>Open Claude Desktop and go to <strong>Settings → Developer → Edit Config</strong> to open <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">claude_desktop_config.json</code>.</>,
          'Copy the server block from the README.md inside the zip into the "mcpServers" section of that file.',
          'Save the file and restart Claude Desktop — the server\'s tools appear automatically.',
        ],
      },
      {
        heading: 'Claude Code / API',
        icon: Terminal,
        description: 'Using MCP with Claude Code or the Claude API:',
        steps: [
          <>Add the server to <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">.claude/settings.json</code> under the <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">"mcpServers"</code> key.</>,
          'Follow the README in the zip for exact config values.',
          'Run claude — the MCP tools appear in the context automatically.',
        ],
      },
    ],
  },
  'Prompt Packs': {
    sections: [
      {
        heading: 'How to use your prompts',
        icon: FileText,
        description: 'Prompt packs are ready to use immediately — no installation needed.',
        steps: [
          'Download the zip and open it — you\'ll find clearly named .md or .txt files, one per prompt.',
          'When you need a prompt, copy the text and paste it into any Claude conversation.',
          <>For prompts you use regularly, add them to a <strong>Claude.ai</strong> Project's instructions so they activate automatically.</>,
          'The included README.md explains what each prompt does and when to reach for it.',
        ],
      },
    ],
  },
  'Workflows': {
    sections: [
      {
        heading: 'Setting up your workflow',
        icon: Layers,
        description: 'Each workflow is a structured multi-step process. Setup time is 5–20 minutes.',
        steps: [
          'Download and unzip the package.',
          'Open README.md — it contains the complete setup guide, prerequisites, and step-by-step instructions.',
          'Most workflows are sequences of Claude prompts. Follow the numbered steps, pasting each into Claude when prompted.',
          'Workflows designed for Claude Code can be run directly from your terminal using the included commands.',
        ],
      },
    ],
  },
  'Templates': {
    sections: [
      {
        heading: 'Using your template',
        icon: FileText,
        description: 'Templates are pre-configured Claude setups ready for your project or use case.',
        steps: [
          'Download and unzip the template package.',
          <>Open the template files — placeholders marked <code className="bg-white border border-border rounded px-1.5 py-0.5 text-[12px] font-mono">[YOUR CONTENT]</code> show where to add your details.</>,
          <>Paste the completed template as a system prompt or into a <strong>Claude.ai</strong> Project's instructions.</>,
          'Save it as your starting point and reuse it for any project that fits the same pattern.',
        ],
      },
    ],
  },
  'Bundles': {
    sections: [
      {
        heading: 'Installing your bundle',
        icon: Layers,
        description: 'Bundles combine multiple add-ons at a discounted price. Each component installs separately.',
        steps: [
          'Download and unzip the bundle — you\'ll find a folder for each included component.',
          'Open README.md in the bundle root for an overview and recommended install order.',
          'Install each component by following the INSTALL.md inside its folder.',
          'The bundle README explains how the components work together for maximum benefit.',
        ],
      },
    ],
  },
}

// ─── Payment / Notify modal ──────────────────────────────────────────────────

function PaymentModal({ listing, onClose }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const isFree = listing.price === 'Free'

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    toast.success(isFree
      ? 'You\'re on the list! We\'ll email you when downloads launch.'
      : 'You\'re on the list! We\'ll email you when payments launch.')
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-border overflow-hidden">

        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-1">
              {isFree ? 'Free Download' : 'Purchase'}
            </p>
            <h2 className="text-[20px] font-bold text-primary leading-snug">{listing.title}</h2>
          </div>
          <button onClick={onClose} className="ml-4 p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface transition-colors flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="mx-6 mb-5 rounded-xl bg-surface border border-border p-4 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-muted mb-0.5">Total</p>
            <p className="text-[28px] font-bold text-primary">{listing.price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-[14px] font-semibold text-primary">{listing.rating}</span>
            <span className="text-[13px] text-muted">({listing.reviews} reviews)</span>
          </div>
        </div>

        {submitted ? (
          <div className="px-6 pb-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 mb-4">
              <CheckCircle size={28} className="text-accent" />
            </div>
            <h3 className="text-[17px] font-bold text-primary mb-2">You're on the list</h3>
            <p className="text-[14px] text-dark-mid leading-relaxed">
              We'll send one email to <strong>{email}</strong> when this is available. No spam, ever.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-5 flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[11px] font-bold">!</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-amber-800 mb-0.5">
                  {isFree ? 'Downloads launching soon' : 'Payments launching soon'}
                </p>
                <p className="text-[12px] text-amber-700 leading-relaxed">
                  {isFree
                    ? 'Leave your email and we\'ll notify you the moment downloads go live — usually within a few days.'
                    : 'We\'re integrating Stripe checkout now. Leave your email and we\'ll notify you the moment payments go live.'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[13px] font-semibold text-primary mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-border bg-white pl-9 pr-4 py-2.5 text-[14px] text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full justify-center">
              Notify me when it's ready
            </Button>

            <p className="text-[11px] text-muted text-center mt-3 leading-relaxed">
              One email only. No newsletters, no spam. Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Stars ───────────────────────────────────────────────────────────────────

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ListingDetailPage() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const listing = listings.find(l => toSlug(l.title) === slug)

  if (!listing) {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto text-center py-28">
          <h1 className="text-[28px] font-bold text-primary mb-3">Add-on not found</h1>
          <p className="text-[16px] text-dark-mid mb-6">We couldn't find what you're looking for.</p>
          <Link to="/browse" className="inline-flex items-center gap-2 text-accent hover:underline font-medium">
            <ArrowLeft size={16} /> Back to browse
          </Link>
        </div>
      </PageLayout>
    )
  }

  const { category, title, description, creator, price, rating, reviews } = listing
  const isFree = price === 'Free'
  const visual = getListingVisual(listing)
  const { Icon, badge, snippet, gridIcons, gradient } = visual
  const treatment = getTreatment(listing, visual)
  const installConfig = INSTALL_STEPS[category] ?? INSTALL_STEPS['Claude Skills']

  function handleCopy() {
    navigator.clipboard.writeText(`# ${title}\n\n${description}`)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-muted mb-8">
          <Link to="/browse" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <ArrowLeft size={13} /> Browse
          </Link>
          <span>/</span>
          <Link to={`/browse?category=${encodeURIComponent(category)}`} className="hover:text-primary transition-colors">
            {category}
          </Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[200px]">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* ── Left column ── */}
          <div>
            {/* Hero — treatment-aware, 140px tall */}
            {treatment === 'stat' && (() => {
              const [count, ...rest] = (badge || '').split(' ')
              const unit = rest.join(' ').toUpperCase()
              return (
                <div className="rounded-2xl mb-6 h-[140px] relative overflow-hidden" style={{ background: gradient }}>
                  <span aria-hidden="true" style={{ position: 'absolute', right: 8, top: -18, fontSize: 148, fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.13)', letterSpacing: '-0.06em', userSelect: 'none', fontFamily: 'inherit' }}>
                    {count}
                  </span>
                  <div style={{ position: 'absolute', bottom: 18, left: 20 }}>
                    <Icon size={32} strokeWidth={1.75} className="text-white/90 mb-2" />
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>{unit}</p>
                  </div>
                </div>
              )
            })()}
            {treatment === 'terminal' && (
              <div className="rounded-2xl mb-6 h-[140px] relative overflow-hidden" style={{ background: '#0f111a', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', gap: 5 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'block' }} />
                </div>
                <div style={{ position: 'absolute', bottom: 20, left: 18, right: 18 }}>
                  <span style={{ display: 'block', fontSize: 13, fontFamily: 'monospace', color: '#4ADE80', marginBottom: 4 }}>$ claude</span>
                  <span style={{ display: 'block', fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>{snippet || '> mcp tool connected'}</span>
                </div>
              </div>
            )}
            {treatment === 'abstract' && (
              <div className="rounded-2xl mb-6 h-[140px] relative overflow-hidden flex items-center justify-center" style={{ background: gradient }}>
                <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.28 }} viewBox="0 0 640 140" preserveAspectRatio="xMidYMid slice">
                  <circle cx="30" cy="30" r="3.5" fill="white" />
                  <circle cx="120" cy="55" r="3" fill="white" />
                  <circle cx="200" cy="20" r="3.5" fill="white" />
                  <circle cx="320" cy="60" r="4" fill="white" opacity="0.6" />
                  <circle cx="420" cy="25" r="3" fill="white" />
                  <circle cx="520" cy="50" r="3.5" fill="white" />
                  <circle cx="600" cy="30" r="3" fill="white" />
                  <circle cx="60" cy="110" r="3" fill="white" />
                  <circle cx="180" cy="120" r="3.5" fill="white" />
                  <circle cx="300" cy="115" r="3" fill="white" />
                  <circle cx="440" cy="110" r="3.5" fill="white" />
                  <circle cx="570" cy="118" r="3" fill="white" />
                  <line x1="30" y1="30" x2="120" y2="55" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="120" y1="55" x2="200" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="200" y1="20" x2="320" y2="60" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="320" y1="60" x2="420" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="420" y1="25" x2="520" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="520" y1="50" x2="600" y2="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="60" y1="110" x2="180" y2="120" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="180" y1="120" x2="300" y2="115" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="300" y1="115" x2="440" y2="110" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="440" y1="110" x2="570" y2="118" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="120" y1="55" x2="60" y2="110" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="320" y1="60" x2="300" y2="115" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="420" y1="25" x2="440" y2="110" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                </svg>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm relative z-10">
                  <Icon size={32} strokeWidth={1.75} className="text-white" />
                </div>
              </div>
            )}
            {treatment === 'grid' && (
              <div className="rounded-2xl mb-6 h-[140px] grid grid-cols-2 gap-2.5 p-3 relative overflow-hidden" style={{ background: gradient }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                {gridIcons.slice(0, 4).map((GridIcon, i) => (
                  <div key={i} className="flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm relative z-10">
                    <GridIcon size={24} strokeWidth={1.75} className="text-white" />
                  </div>
                ))}
              </div>
            )}

            <Badge category={category} className="mb-3" />
            <h1 className="text-[32px] md:text-[40px] font-bold text-primary leading-tight tracking-[-0.02em] mb-3">
              {title}
            </h1>
            <p className="text-[18px] text-dark-mid leading-relaxed mb-6">{description}</p>

            {/* Creator */}
            <div className="flex items-center gap-3 mb-10 pb-10 border-b border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold flex-shrink-0">
                {creator.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-semibold text-primary">{creator}</span>
                  <ShieldCheck size={14} className="text-accent" />
                </div>
                <p className="text-[12px] text-muted">Verified seller</p>
              </div>
            </div>

            {/* Install instructions */}
            <div className="mb-10">
              <h2 className="text-[22px] font-bold text-primary mb-1">How to install</h2>
              <p className="text-[14px] text-muted mb-6">Follow the steps below to get up and running.</p>

              {installConfig.sections.map((section, si) => {
                const SectionIcon = section.icon
                return (
                  <div key={si} className={si > 0 ? 'mt-8 pt-8 border-t border-border' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <SectionIcon size={16} className="text-accent flex-shrink-0" />
                      <h3 className="text-[15px] font-bold text-primary">{section.heading}</h3>
                    </div>
                    <p className="text-[13px] text-muted mb-4 ml-6">{section.description}</p>
                    <ol className="ml-6 space-y-3">
                      {section.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold text-accent flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-[14px] text-dark-mid leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )
              })}
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] font-bold text-primary">Reviews</h2>
                <div className="flex items-center gap-2">
                  <Stars rating={rating} size={13} />
                  <span className="text-[14px] font-semibold text-primary">{rating}</span>
                  <span className="text-[13px] text-muted">({reviews})</span>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-border py-14 text-center">
                <Star size={28} className="text-border mx-auto mb-3" />
                <p className="text-[15px] font-semibold text-primary mb-1">No written reviews yet</p>
                <p className="text-[13px] text-muted">Download this add-on and be the first to leave a review.</p>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-4">

            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[32px] font-bold text-primary">{price}</span>
                {!isFree && <span className="text-[13px] text-muted">one-time</span>}
              </div>

              <div className="flex items-center gap-1.5 mb-5">
                <Stars rating={rating} size={12} />
                <span className="text-[13px] font-medium text-primary">{rating}</span>
                <span className="text-[12px] text-muted">· {reviews} reviews</span>
              </div>

              <div className="flex flex-col gap-2">
                {isFree ? (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center gap-2"
                      onClick={() => setShowModal(true)}
                    >
                      <Download size={16} /> Download for free
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full justify-center gap-2"
                      onClick={handleCopy}
                    >
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy to clipboard'}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setShowModal(true)}
                  >
                    Purchase — {price}
                  </Button>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[12px] text-muted">
                  <ShieldCheck size={12} className="text-accent flex-shrink-0" />
                  Verified by The Marqet Team
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-muted">
                  <CheckCircle size={12} className="text-accent flex-shrink-0" />
                  Safe to download — plain text / Markdown files only
                </div>
                {!isFree && (
                  <div className="flex items-center gap-1.5 text-[12px] text-muted">
                    <CheckCircle size={12} className="text-accent flex-shrink-0" />
                    30-day money-back guarantee
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 text-[13px] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted">Category</span>
                <Badge category={category} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Version</span>
                <span className="font-semibold text-primary">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">License</span>
                <span className="font-semibold text-primary">MIT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Compatible with</span>
                <span className="font-semibold text-primary">Claude</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Format</span>
                <span className="font-semibold text-primary">Plain text / Markdown</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">Creator</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold flex-shrink-0">
                  TM
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-primary">{creator}</span>
                    <ShieldCheck size={13} className="text-accent" />
                  </div>
                  <p className="text-[12px] text-muted">Verified · All add-ons reviewed</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showModal && (
        <PaymentModal listing={listing} onClose={() => setShowModal(false)} />
      )}
    </PageLayout>
  )
}
