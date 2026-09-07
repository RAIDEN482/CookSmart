import { Link, useLocation } from 'react-router-dom'
import { Plus, Bookmark, Menu } from 'lucide-react'
import { useState } from 'react'
import { CookSmartLogo } from './CookSmartLogo'

export function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-line shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            to="/"
            aria-label="CookSmart home"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button flex items-center gap-2"
          >
            <CookSmartLogo size={32} showText={true} />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6" role="list">
            <NavLink to="/" label="Discover" active={pathname === '/'} />
            <NavLink to="/saved" label="My Saved Recipes" active={pathname === '/saved'} />
            <NavLink to="/pantry" label="Pantry" active={pathname === '/pantry'} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-line bg-surface text-ink font-medium text-sm hover:bg-bg transition-colors">
            <Plus size={18} strokeWidth={2} />
            <span>Quick Add</span>
          </button>
          
          <Link 
            to="/saved" 
            aria-label="Bookmarks" 
            className="w-10 h-10 flex items-center justify-center rounded-lg text-muted hover:bg-bg hover:text-ink transition-colors"
          >
            <Bookmark size={20} strokeWidth={1.5} />
          </Link>

          <div className="relative flex items-center">
            <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-0.5">
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover" 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-button text-muted hover:text-ink hover:bg-bg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ml-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-3 animate-fade-in flex flex-col gap-2">
          <NavLink to="/" label="Discover" active={pathname === '/'} mobile onClick={() => setMenuOpen(false)} />
          <NavLink to="/saved" label="My Saved Recipes" active={pathname === '/saved'} mobile onClick={() => setMenuOpen(false)} />
          <NavLink to="/pantry" label="Pantry" active={pathname === '/pantry'} mobile onClick={() => setMenuOpen(false)} />
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
        mobile ? 'block py-2 text-base font-medium' : 'py-2 text-sm font-semibold border-b-2',
        'transition-colors',
        active
          ? mobile ? 'text-primary' : 'text-primary border-primary'
          : mobile ? 'text-muted' : 'text-muted border-transparent hover:text-ink',
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
