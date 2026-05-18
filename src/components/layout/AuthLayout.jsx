import { Link } from 'react-router-dom'
import Logo from '../brand/Logo'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-16">
      <Link to="/" className="mb-8">
        <Logo size="md" />
      </Link>
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-border p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-[24px] font-bold text-primary mb-1">{title}</h1>
          {subtitle && <p className="text-[15px] text-dark-mid">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
