import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Star, CheckCircle, Lock, ArrowRight, Mail, Zap, Loader2,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { listings } from '../data/listings'
import { client, isConfigured } from '../lib/amplify'

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const pack = listings.find(l => l.id === 90)

function Stars({ rating, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
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

export default function RecruiterPage() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email || subStatus === 'loading' || subStatus === 'success') return
    setSubStatus('loading')
    try {
      if (!isConfigured) throw new Error()
      await client.models.Waitlist.create({ email: email.trim(), role: 'buyer' })
      setSubStatus('success')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
  }

  function handleBuy() {
    if (pack?.stripeLink) {
      window.location.href = pack.stripeLink
    } else {
      window.location.href = `/listing/${toSlug(pack.title)}`
    }
  }

  if (!pack) return null
  const { content, rating, reviews, price } = pack

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>

      {/* Minimal header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-[15px] font-bold text-primary tracking-tight">The Marqet</Link>
          <Link to="/browse" className="text-[13px] text-muted hover:text-primary transition-colors flex items-center gap-1.5">
            Browse all add-ons <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-14">

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700">For Recruiters</span>
          </div>
          <h1 className="text-[38px] md:text-[50px] font-bold text-primary leading-[1.08] tracking-[-0.025em] mb-5">
            Stop starting from scratch every time you need to write a job description.
          </h1>
          <p className="text-[18px] text-dark-mid leading-relaxed mb-8">
            A Claude setup kit built specifically for recruiting work. One system prompt that turns Claude into a
            recruiting expert, plus six plug-and-play prompts for the most repetitive parts of the job.
            Set up in 3 minutes. Use forever.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
            <button
              onClick={handleBuy}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-[16px] font-semibold text-white hover:bg-accent/90 transition-colors shadow-[0_4px_20px_rgba(59,130,246,0.28)]"
            >
              Get the pack — {price}
            </button>
            <p className="text-[13px] text-muted">One-time payment. 30-day refund guarantee.</p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-12 mb-12 border-b border-border">
          <div className="flex items-center gap-2">
            <Stars rating={rating} />
            <span className="text-[14px] font-semibold text-primary">{rating}</span>
            <span className="text-[13px] text-muted">({reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-dark-mid">
            <CheckCircle size={14} className="text-teal-500 flex-shrink-0" aria-hidden />
            Instant access on payment confirmation
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-dark-mid">
            <CheckCircle size={14} className="text-teal-500 flex-shrink-0" aria-hidden />
            Plain text — no software to install
          </div>
        </div>

        {/* What's inside */}
        <div className="mb-12">
          <h2 className="text-[26px] font-bold text-primary mb-2">What's inside</h2>
          <p className="text-[15px] text-muted mb-8">
            Everything is delivered on the confirmation page — copy and paste, no download needed.
          </p>

          {/* System prompt teaser */}
          {content?.systemPrompt && (
            <div className="rounded-2xl border border-border overflow-hidden mb-5">
              <div className="px-5 py-3.5 border-b border-border bg-surface flex items-center gap-2">
                <Zap size={14} className="text-accent" aria-hidden />
                <span className="text-[13px] font-bold text-primary">System Prompt</span>
                <span className="text-[12px] text-muted">— paste once into Claude.ai Projects, works forever</span>
              </div>
              <div className="relative px-5 py-4 bg-white">
                <p className="text-[12.5px] text-dark-mid font-mono leading-relaxed opacity-60 line-clamp-4">
                  {content.systemPrompt}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, white 40%, transparent)' }}
                />
              </div>
              <div className="px-5 py-2.5 border-t border-border bg-surface flex items-center gap-1.5">
                <Lock size={11} className="text-muted" aria-hidden />
                <span className="text-[11px] text-muted">Full content unlocked after purchase</span>
              </div>
            </div>
          )}

          {/* Prompt list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content?.prompts?.map((prompt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold text-accent flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-primary mb-0.5 flex items-center gap-1.5">
                    <span className="truncate">{prompt.title}</span>
                    <Lock size={10} className="text-muted flex-shrink-0" aria-hidden />
                  </p>
                  <p className="text-[12px] text-muted leading-relaxed">{prompt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="mb-12 pb-12 border-b border-border">
          <h2 className="text-[26px] font-bold text-primary mb-8">How to use it</h2>
          <ol className="space-y-6">
            {(content?.quickStart ?? [
              'Buy and get instant access on the confirmation page.',
              'Copy the System Prompt into a Claude.ai Project\'s instructions.',
              'Use each prompt by copying it into any conversation — fill in the bracketed fields and send.',
            ]).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[16px] text-dark-mid leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Dark CTA block */}
        <div className="rounded-2xl bg-primary px-8 py-10 mb-12 text-center">
          <h2 className="text-[24px] font-bold text-white mb-2">
            Ready to speed up your recruiting workflow?
          </h2>
          <p className="text-[15px] text-white/65 mb-7">
            One-time {price}. Instant access. 30-day money-back guarantee, no questions asked.
          </p>
          <button
            onClick={handleBuy}
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-[16px] font-bold text-primary hover:bg-gray-50 transition-colors"
          >
            Get the pack — {price}
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-2xl border border-border bg-surface p-7">
          <div className="flex items-center gap-2 mb-1">
            <Mail size={15} className="text-accent" aria-hidden />
            <h3 className="text-[16px] font-bold text-primary">Not ready to buy? Get free tips every week.</h3>
          </div>
          <p className="text-[13px] text-muted mb-5 ml-[23px]">
            One email per week — practical Claude tips written for recruiters. No noise, no fluff. Unsubscribe any time.
          </p>

          {subStatus === 'success' ? (
            <div className="flex items-center gap-2 text-[14px] text-teal-700 font-medium ml-[23px]">
              <CheckCircle size={15} className="text-teal-500" aria-hidden /> You're subscribed. Talk soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={subStatus === 'loading'}
                className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-[14px] text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-60"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={subStatus === 'loading' || !email}
              >
                {subStatus === 'loading'
                  ? <Loader2 size={15} className="animate-spin" aria-hidden />
                  : 'Subscribe'}
              </Button>
            </form>
          )}
          {subStatus === 'error' && (
            <p className="text-[12px] text-red-600 mt-2 ml-[23px]">Something went wrong — try again.</p>
          )}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border px-6 py-8 mt-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-muted">
          <span>
            &copy; {new Date().getFullYear()} The Marqet &middot;{' '}
            <Link to="/legal/terms" className="hover:text-primary transition-colors">Terms</Link>
            {' '}&middot;{' '}
            <Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </span>
          <Link to="/browse" className="hover:text-primary transition-colors">
            Browse all Claude add-ons &rarr;
          </Link>
        </div>
      </footer>
    </div>
  )
}
