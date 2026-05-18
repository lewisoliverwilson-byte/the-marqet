import PageLayout from '../../components/layout/PageLayout'
import { Link } from 'react-router-dom'

const LEGAL_LINKS = [
  { to: '/legal/terms', label: 'Terms of Service' },
  { to: '/legal/privacy', label: 'Privacy Policy' },
  { to: '/legal/cookies', label: 'Cookie Policy' },
  { to: '/legal/acceptable-use', label: 'Acceptable Use' },
]

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <nav className="flex flex-wrap gap-4 mb-10 pb-6 border-b border-border text-[13px]">
          {LEGAL_LINKS.map(l => (
            <Link key={l.to} to={l.to} className="text-muted hover:text-accent transition-colors">{l.label}</Link>
          ))}
        </nav>
        <p className="text-[11px] font-semibold uppercase tracking-widest3 text-muted mb-3">Legal</p>
        <h1 className="text-[32px] font-bold text-primary mb-2">{title}</h1>
        {lastUpdated && <p className="text-[14px] text-muted mb-8">Last updated: {lastUpdated}</p>}
        <div className="prose prose-sm max-w-none text-dark-mid [&_h2]:text-primary [&_h2]:font-bold [&_h2]:text-[18px] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1">
          {children}
        </div>
        <div className="mt-12 p-5 bg-surface rounded-2xl border border-border">
          <p className="text-[14px] text-dark-mid">
            Questions about these policies? Email us at <a href="mailto:legal@themarqet.com" className="text-accent hover:underline">legal@themarqet.com</a>.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
