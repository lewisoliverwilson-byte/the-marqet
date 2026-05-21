import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { XCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import { listings } from '../data/listings'

const toSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function PurchaseCancelledPage() {
  const [params] = useSearchParams()
  const slug = params.get('listing')

  const listing = slug ? listings.find(l => toSlug(l.title) === slug) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto py-20 px-4 text-center">

        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 border-2 border-gray-100 mb-6">
          <XCircle size={40} className="text-gray-400" strokeWidth={1.75} />
        </div>

        <h1 className="text-[28px] font-bold text-primary mb-3 tracking-[-0.02em]">
          Payment cancelled
        </h1>
        <p className="text-[16px] text-dark-mid leading-relaxed mb-8">
          No problem — you haven't been charged.
          {listing ? <> Your spot for <strong>{listing.title}</strong> is still available.</> : null}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {listing && (
            <Link to={`/listing/${toSlug(listing.title)}`}>
              <Button variant="primary" size="md" className="w-full sm:w-auto justify-center gap-2">
                <ArrowLeft size={15} /> Back to {listing.title}
              </Button>
            </Link>
          )}
          <Link to="/browse">
            <Button variant="outline" size="md" className="w-full sm:w-auto justify-center gap-2">
              Browse all add-ons <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        <p className="text-[12px] text-muted mt-8">
          Something went wrong?{' '}
          <Link to="/contact" className="text-accent hover:underline">Contact support</Link>
        </p>
      </div>
    </PageLayout>
  )
}
