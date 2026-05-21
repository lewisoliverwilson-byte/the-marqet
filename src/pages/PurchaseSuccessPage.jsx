import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Download, Copy, ArrowRight, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import { listings } from '../data/listings'

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function PurchaseSuccessPage() {
  const [params] = useSearchParams()
  const slug = params.get('listing')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [copied, setCopied] = useState(null)

  const listing = slug ? listings.find(l => toSlug(l.title) === slug) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function copySection(key, text) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(null), 2000)
  }

  function handleEmailSubmit(e) {
    e.preventDefault()
    if (!email) return
    setEmailSent(true)
    toast.success('Got it! We\'ll send your receipt and future updates there.')
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-16 px-4">

        {/* Success header */}
        <div className="text-center mb-10">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-50 border-2 border-green-100 mb-6">
            <CheckCircle size={40} className="text-green-500" strokeWidth={1.75} />
          </div>
          <h1 className="text-[32px] font-bold text-primary mb-3 tracking-[-0.02em]">
            Payment confirmed
          </h1>
          <p className="text-[17px] text-dark-mid leading-relaxed">
            {listing
              ? <>Your purchase of <strong>{listing.title}</strong> is complete.</>
              : 'Your purchase is complete.'}
            {' '}Everything you need is below.
          </p>
        </div>

        {/* Product content */}
        {listing?.content ? (
          <div className="space-y-6 mb-10">
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-surface flex items-center justify-between">
                <h2 className="text-[15px] font-bold text-primary">Your download is ready</h2>
                <span className="text-[12px] text-muted font-medium">{listing.title}</span>
              </div>

              {listing.content.systemPrompt && (
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-[14px] font-bold text-primary mb-0.5">System Prompt</h3>
                      <p className="text-[12px] text-muted">Paste this into a Claude.ai Project's instructions</p>
                    </div>
                    <button
                      onClick={() => copySection('system', listing.content.systemPrompt)}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:text-accent/80 transition-colors flex-shrink-0"
                    >
                      {copied === 'system' ? <CheckCircle size={13} /> : <Copy size={13} />}
                      {copied === 'system' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[12px] text-dark-mid bg-surface rounded-xl border border-border p-4 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-48 overflow-y-auto">
                    {listing.content.systemPrompt}
                  </pre>
                </div>
              )}

              {listing.content.prompts?.map((prompt, i) => (
                <div key={i} className="p-6 border-b border-border last:border-b-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-[14px] font-bold text-primary mb-0.5">{prompt.title}</h3>
                      <p className="text-[12px] text-muted">{prompt.description}</p>
                    </div>
                    <button
                      onClick={() => copySection(`prompt-${i}`, prompt.text)}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:text-accent/80 transition-colors flex-shrink-0"
                    >
                      {copied === `prompt-${i}` ? <CheckCircle size={13} /> : <Copy size={13} />}
                      {copied === `prompt-${i}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[12px] text-dark-mid bg-surface rounded-xl border border-border p-4 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-40 overflow-y-auto">
                    {prompt.text}
                  </pre>
                </div>
              ))}
            </div>

            {/* Install guide */}
            <div className="rounded-2xl border border-border bg-white p-6">
              <h3 className="text-[15px] font-bold text-primary mb-4 flex items-center gap-2">
                <Download size={15} className="text-accent" />
                Quick start
              </h3>
              <ol className="space-y-3">
                {(listing.content.quickStart || [
                  'Copy the System Prompt above.',
                  'Go to Claude.ai and create or open a Project.',
                  'Paste it into "Project instructions" — Claude is now configured for your workflow.',
                  'Use the individual prompts above by copying them into any Claude conversation.',
                ]).map((step, i) => (
                  <li key={i} className="flex gap-3 text-[14px] text-dark-mid">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold text-accent flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          /* Generic success for listings without embedded content */
          <div className="rounded-2xl border border-border bg-white p-8 mb-10 text-center">
            <Download size={32} className="text-accent mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-[18px] font-bold text-primary mb-2">Check your email</h2>
            <p className="text-[14px] text-dark-mid leading-relaxed">
              Your download link has been sent to the email you used at checkout.
              It usually arrives within a minute.
            </p>
          </div>
        )}

        {/* Email capture */}
        {!emailSent ? (
          <div className="rounded-2xl border border-border bg-surface p-6 mb-6">
            <h3 className="text-[14px] font-bold text-primary mb-1 flex items-center gap-2">
              <Mail size={14} className="text-accent" />
              Get updates when new packs drop
            </h3>
            <p className="text-[13px] text-muted mb-4">
              One email per week. Practical Claude tips for your profession. Unsubscribe any time.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-[14px] text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl border border-green-100 bg-green-50 p-4 mb-6 text-center">
            <p className="text-[14px] text-green-700 font-medium">You're subscribed. Talk soon.</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/browse" className="flex-1">
            <Button variant="outline" size="md" className="w-full justify-center gap-2">
              Browse more add-ons
            </Button>
          </Link>
          {listing && (
            <Link to={`/listing/${toSlug(listing.title)}`} className="flex-1">
              <Button variant="ghost" size="md" className="w-full justify-center gap-2">
                Back to {listing.title} <ArrowRight size={15} />
              </Button>
            </Link>
          )}
        </div>

        <p className="text-center text-[12px] text-muted mt-6">
          Receipt sent to your Stripe email.
          Questions? <Link to="/contact" className="text-accent hover:underline">Contact us</Link>
        </p>
      </div>
    </PageLayout>
  )
}
