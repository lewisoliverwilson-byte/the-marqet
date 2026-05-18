import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '../brand/Logo'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Browse', href: '#featured' },
  { label: 'Sell', href: '#sellers' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#sellers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleLinkClick() {
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Logo size="sm" />

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] font-medium text-dark-mid hover:text-primary transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" href="#featured">
            Browse Add-Ons
          </Button>
          <Button variant="primary" size="sm" href="#sellers">
            Start Selling
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-primary transition-colors duration-150 hover:text-accent"
          onClick={() => setMenuOpen((o) => !o)}
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
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-3 text-[20px] font-semibold text-primary hover:text-accent transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-8">
            <Button variant="outline" size="md" href="#featured" onClick={handleLinkClick}>
              Browse Add-Ons
            </Button>
            <Button variant="primary" size="md" href="#sellers" onClick={handleLinkClick}>
              Start Selling
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
