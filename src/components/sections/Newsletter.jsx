import { useState, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import QMark from '../brand/QMark'
import Button from '../ui/Button'
import { supabase } from '../../lib/supabase'
import { consumeIntent, INTENT_EVENT } from '../../lib/waitlistIntent'

const STATUS = {
  idle: null,
  loading: 'loading',
  success: 'You\'re on the list. We\'ll be in touch.',
  duplicate: 'You\'re already on the list.',
  error: 'Something went wrong — try again.',
  unavailable: 'Service unavailable — try again later.',
}

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('both')
  const [status, setStatus] = useState('idle')
  const emailRef = useRef(null)

  useEffect(() => {
    function checkIntent() {
      const intent = consumeIntent()
      if (intent === 'seller') setRole('seller')
    }

    checkIntent()
    window.addEventListener(INTENT_EVENT, checkIntent)
    return () => window.removeEventListener(INTENT_EVENT, checkIntent)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    if (!supabase) {
      setStatus('unavailable')
      return
    }

    setStatus('loading')

    try {
      const { error } = await supabase.from('waitlist').insert({ email: email.trim(), role })

      if (error) {
        if (error.code === '23505') {
          setStatus('duplicate')
        } else {
          setStatus('error')
        }
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  const statusMessage = STATUS[status]
  const isSuccess = status === 'success' || status === 'duplicate'
  const isError = status === 'error' || status === 'unavailable'

  return (
    <section id="waitlist" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-[576px] text-center">
          <div className="flex justify-center mb-6">
            <QMark size={48} ariaHidden />
          </div>

          <h2 className="text-[36px] md:text-[44px] font-bold text-primary leading-[1.1] tracking-[-0.01em] mb-4">
            Be first in the door.
          </h2>
          <p className="text-[18px] text-dark-mid leading-relaxed mb-8">
            The Marqet is in early access. Join the waitlist and you'll hear from us before we go public — plus
            first access to founding seller spots.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-[15px] placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-150 disabled:opacity-60"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'loading' || status === 'success' || !email}
                className="sm:flex-shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Joining…
                  </>
                ) : (
                  'Join the Waitlist →'
                )}
              </Button>
            </div>

            <fieldset className="mb-6">
              <legend className="sr-only">I am joining as</legend>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { value: 'buyer', label: 'I\'m a buyer' },
                  { value: 'seller', label: 'I\'m a builder' },
                  { value: 'both', label: 'Both' },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => setRole(value)}
                      className="accent-accent w-4 h-4"
                    />
                    <span className="text-[15px] text-dark-mid">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div
              aria-live="polite"
              className="min-h-[24px] text-[14px] font-medium"
              style={{
                color: isSuccess ? '#3B82F6' : isError ? '#e11d48' : '#55556A',
              }}
            >
              {statusMessage}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
