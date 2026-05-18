import { useState, useEffect } from 'react'
import { Menu, X, User, LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../brand/Logo'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Browse', href: '/browse' },
  { label: 'Sell', href: '/#sellers' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Custom Build', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [location])

  function handleNavHref(href) {
    if (href.startsWith('/#') && !isHome) return href
    if (href.startsWith('/#') && isHome) return href.replace('/', '')
    return href
  }

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur border-b border-border'}`}>
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <Link
                to={handleNavHref(link.href)}
                className="text-[15px] font-medium text-dark-mid hover:text-primary transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-[14px] font-medium text-primary hover:border-accent transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-[11px] font-bold">
                  {profile?.avatar_url
                    ? <img src={profile.avatar_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                    : (profile?.display_name || user.email || '?').charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{profile?.display_name || profile?.username || user.email}</span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-border shadow-lg py-1 z-20">
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-dark-mid hover:text-primary hover:bg-surface transition-colors">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    {profile?.username && (
                      <Link to={`/profile/${profile.username}`} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-dark-mid hover:text-primary hover:bg-surface transition-colors">
                        <User size={15} /> Public profile
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-accent hover:bg-blue-50 transition-colors">
                        <ShieldCheck size={15} /> Admin panel
                      </Link>
                    )}
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false) }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-dark-mid hover:text-rose-500 hover:bg-surface transition-colors w-full text-left"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" href="/auth/login">Sign in</Button>
              <Button variant="primary" size="sm" href="/submit">Start Selling</Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-primary transition-colors hover:text-accent"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-border min-h-[calc(100vh-4rem)] flex flex-col px-6 py-8">
          <ul className="list-none m-0 p-0 flex flex-col gap-1 flex-1">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <Link to={handleNavHref(link.href)} className="block py-3 text-[20px] font-semibold text-primary hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-8">
            {user ? (
              <>
                <Button variant="outline" size="md" href="/dashboard" className="w-full justify-center">Dashboard</Button>
                <Button variant="ghost" size="md" onClick={signOut} className="w-full justify-center">Sign out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="md" href="/auth/login" className="w-full justify-center">Sign in</Button>
                <Button variant="primary" size="md" href="/submit" className="w-full justify-center">Start Selling</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
