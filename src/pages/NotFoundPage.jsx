import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import QMark from '../components/brand/QMark'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center text-center py-24">
        <QMark size={48} ariaHidden className="mb-6 opacity-30" />
        <h1 className="text-[64px] font-bold text-primary leading-none mb-2">404</h1>
        <h2 className="text-[24px] font-bold text-primary mb-3">Page not found</h2>
        <p className="text-[16px] text-dark-mid mb-8 max-w-sm">This page doesn't exist, or the add-on may have been removed.</p>
        <div className="flex gap-3">
          <Button variant="primary" size="md" href="/browse">Browse the Marqet</Button>
          <Button variant="ghost" size="md" href="/">Home</Button>
        </div>
      </div>
    </PageLayout>
  )
}
