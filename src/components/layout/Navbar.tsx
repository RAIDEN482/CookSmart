import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { CookSmartLogo } from './CookSmartLogo'

export function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-sm border-b border-line">
      <nav
        className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="CookSmart home"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button"
        >
          <CookSmartLogo size={34} />
        </Link>

        {/* Desktop nav links (Phase 2 placeholders) */}
        <div className="hidden sm:flex items-center gap-1" role="list">
          <NavLink to="/" label="Home" active={pathname === '/'} />
          {/* Phase 2: Pantry, Favorites, Profile */}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-button text-muted hover:text-ink
                     hover:bg-bg transition-colors focus-visible:outline
                     focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-line bg-surface px-4 py-3 animate-fade-in">
          <NavLink to="/" label="Home" active={pathname === '/'} mobile onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}

function NavLink({
  to, label, active, mobile = false, onClick,
}: {
  to: string; label: string; active: boolean; mobile?: boolean; onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={[
        mobile ? 'block py-2 text-base' : 'px-3 py-1.5 text-sm rounded-button',
        'font-medium transition-colors',
        active
          ? 'text-primary bg-primary/10'
          : 'text-muted hover:text-ink hover:bg-bg',
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
