import { Link } from 'react-router-dom'
import { CookSmartLogo } from './CookSmartLogo'

export function Footer() {
  return (
    <footer className="w-full bg-primary/5 border-t border-line mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-line">
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-button">
              <CookSmartLogo size={28} showText={true} />
            </Link>
            <p className="text-muted max-w-sm">
              Artisanal culinary guidance crafted for calm domesticity. Transform humble pantry staples into mindful, nourishing meals without waste.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-muted font-medium text-xs">Quick Dinners</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-muted font-medium text-xs">Pantry-First</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-muted font-medium text-xs">Seasonal Harvest</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-muted font-medium text-xs">Sourdough & Breads</span>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="font-display font-semibold text-ink">The Weekly Kitchen Journal</h4>
              <p className="text-sm text-muted">
                Seasonal ingredient guides, pantry management insights, and chef-curated weeknight formulas delivered every Sunday morning.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg" onSubmit={(e) => e.preventDefault()}>
              <input 
                className="flex-1 h-11 px-4 rounded-lg bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-primary text-sm" 
                placeholder="Enter your email address" 
                type="email" 
              />
              <button 
                className="h-11 px-6 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                type="button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted font-medium text-xs">
          <span>© {new Date().getFullYear()} Cook Smart <span className="font-semibold text-primary/80">v1.2.0</span> · Mindful kitchencraft & culinary companion.</span>
          <div className="flex items-center gap-6">
            <a className="hover:text-ink transition-colors" href="#">Terms of Table</a>
            <a className="hover:text-ink transition-colors" href="#">Privacy & Produce</a>
            <a className="hover:text-ink transition-colors" href="#">Culinary Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
