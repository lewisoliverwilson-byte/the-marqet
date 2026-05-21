import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle, Loader2, ArrowRight, Users, Zap, BookOpen } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import { client, isConfigured } from '../lib/amplify'

const TOPICS = [
  {
    icon: Zap,
    title: 'The exact prompts that save hours',
    body: 'Copy-paste prompts for JDs, scorecards, offer letters, and rejection emails — tested in real recruiting workflows.',
  },
  {
    icon: BookOpen,
    title: 'How other recruiters use Claude',
    body: 'Real examples from people doing the same work as you. What works, what doesn\'t, and what surprised them.',
  },
  {
    icon: Users,
    title: 'One tip per issue, nothing more',
    body: 'Not a content dump. One thing you can use this week. Readable in under 5 minutes.',
  },
]

const SAMPLE_ISSUES = [
  'The interview scorecard prompt that cut my prep time in half',
  'How I write 10 job descriptions a week without losing my mind',
  'The rejection email formula that actually gets replies',
  'Using Claude to screen 200 CVs — what worked and what didn\'t',
  'My full Claude setup for recruiting: the system prompt I use every day',
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || status === 'loading' || status === 'success') return
    setStatus('loading')
    try {
      if (!isConfigured) throw new Error()
      const { errors } = await client.models.Waitlist.create({ email: email.trim(), role: 'buyer' })
      if (errors?.length) {
        const isDuplicate = errors[0].message?.includes('ConditionalCheckFailedException') ||
          errors[0].errorType === 'ConflictException'
        setStatus(isDuplicate ? 'duplicate' : 'error')
        return
      }
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const isSuccess = status === 'success' || status === 'duplicate'

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-16 px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 mb-6">
            <Mail size={13} className="text-accent" aria-hidden />
            <span className="text-[12px] font-semibold uppercase tracking-widest text-accent">Weekly newsletter</span>
          </div>
          <h1 className="text-[38px] md:text-[48px] font-bold text-primary leading-[1.08] tracking-[-0.025em] mb-5">
            Claude tips for recruiters, every week.
          </h1>
          <p className="text-[18px] text-dark-mid leading-relaxed">
            One practical tip per week for using Claude in your recruiting workflow.
            Written for people who use Claude daily and want to get more out of it — not for developers.
          </p>
        </div>

        {/* Signup form */}
        <div className="rounded-2xl border border-border bg-surface p-8 mb-12">
          {isSuccess ? (
            <div className="text-center py-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border-2 border-green-100 mb-4">
                <CheckCircle size={28} className="text-green-500" strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="text-[20px] font-bold text-primary mb-2">
                {status === 'duplicate' ? 'You\'re already subscribed.' : 'You\'re in.'}
              </h2>
              <p className="text-[14px] text-dark-mid">
                {status === 'duplicate'
                  ? 'You\'re on the list already — check your inbox for the next issue.'
                  : 'First issue lands next week. Talk soon.'}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-[20px] font-bold text-primary mb-1 text-center">Subscribe — it's free</h2>
              <p className="text-[14px] text-muted text-center mb-6">Join recruiters already on the list. No spam, ever.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-60"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'loading' || !email}
                  className="sm:flex-shrink-0"
                >
                  {status === 'loading'
                    ? <><Loader2 size={15} className="animate-spin" aria-hidden /> Subscribing…</>
                    : 'Subscribe →'}
                </Button>
              </form>
              {status === 'error' && (
                <p className="text-[12px] text-red-600 text-center mt-3">Something went wrong — try again.</p>
              )}
              <p className="text-[12px] text-muted text-center mt-4">
                One email per week. Unsubscribe any time with one click.
              </p>
            </>
          )}
        </div>

        {/* What you get */}
        <div className="mb-12">
          <h2 className="text-[22px] font-bold text-primary mb-6 text-center">What you'll get</h2>
          <div className="space-y-4">
            {TOPICS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 flex-shrink-0">
                  <Icon size={17} className="text-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-primary mb-1">{title}</p>
                  <p className="text-[13px] text-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample topics */}
        <div className="rounded-2xl border border-border bg-white p-6 mb-12">
          <h3 className="text-[15px] font-bold text-primary mb-4">Recent and upcoming issues</h3>
          <ul className="space-y-2.5">
            {SAMPLE_ISSUES.map(issue => (
              <li key={issue} className="flex items-start gap-2.5 text-[14px] text-dark-mid">
                <ArrowRight size={14} className="text-accent flex-shrink-0 mt-0.5" aria-hidden />
                {issue}
              </li>
            ))}
          </ul>
        </div>

        {/* Upsell */}
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-[13px] text-muted mb-3">Want everything now instead of one tip at a time?</p>
          <Link to="/recruiter">
            <Button variant="outline" size="md" className="gap-2">
              Get the full HR &amp; Recruiting Pack — £5.99 <ArrowRight size={14} />
            </Button>
          </Link>
          <p className="text-[12px] text-muted mt-2">System prompt + 6 prompts, delivered instantly.</p>
        </div>

      </div>
    </PageLayout>
  )
}
