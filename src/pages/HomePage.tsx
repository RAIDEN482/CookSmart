import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Bookmark, CheckCircle, Clock, UtensilsCrossed, AlertCircle } from 'lucide-react'
import { IngredientInput } from '../components/IngredientInput'

export function HomePage() {
  const navigate = useNavigate()

  function handleSubmit(ingredients: string[]) {
    const params = new URLSearchParams()
    params.set('q', ingredients.join(','))
    navigate(`/results?${params.toString()}`)
  }

  return (
    <div className="relative flex flex-col w-full">

      {/* ── Hero Section ─── */}
      <section className="relative w-full overflow-hidden px-4 md:px-8 lg:px-12 pt-12 pb-16">
        {/* Ambient organic gradient blurs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-2xl pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-xs shadow-sm mb-6 transition-transform hover:scale-105 cursor-default">
            <Sparkles size={14} strokeWidth={2} />
            <span>Find recipes with what you have</span>
          </div>

          {/* Headline & Subtitle */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-ink tracking-tight max-w-2xl text-balance mb-4">
            Cook what you've got.<br/><span className="text-primary italic font-display">No excuses.</span>
          </h1>
          <p className="text-lg text-muted max-w-xl text-balance mb-12">
            Type what's in your fridge — we'll curate thoughtful, zero-waste recipes you can assemble right now.
          </p>

          {/* Central Interactive Smart Pantry Card */}
          <div className="w-full max-w-2xl bg-surface rounded-xl shadow-card p-4 md:p-6 text-left relative z-10 border border-line">
            <IngredientInput onSubmit={handleSubmit} />

            {/* Quick Combos Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-muted text-xs">
              <span className="uppercase tracking-wider font-semibold mr-2">Try Pantry Combos:</span>
              <button 
                type="button"
                className="px-3 py-1.5 rounded-full bg-bg hover:bg-primary/10 text-ink font-medium transition-colors border border-line"
                onClick={() => handleSubmit(['chicken breast', 'lemon', 'garlic', 'rosemary'])}
              >
                Chicken, Lemon & Garlic
              </button>
              <span className="text-line">•</span>
              <button 
                type="button"
                className="px-3 py-1.5 rounded-full bg-bg hover:bg-primary/10 text-ink font-medium transition-colors border border-line"
                onClick={() => handleSubmit(['eggs', 'parmesan', 'butter', 'black pepper'])}
              >
                Eggs, Cheese & Butter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Match Counter Floating Strip */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 -mt-8 mb-16 relative z-20">
        <div className="bg-bg rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-line">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <UtensilsCrossed size={24} />
            </div>
            <div>
              <h2 className="font-display font-semibold text-base text-ink">18 instant culinary matches identified</h2>
              <p className="text-sm text-muted">Based on Garlic, Olive Oil, Pasta, and Cherry Tomatoes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>4 Recipes 100% Ready</span>
            </div>
            <button className="text-sm font-semibold text-accent-text hover:underline flex items-center gap-1" onClick={() => navigate('/results?q=garlic,olive%20oil,pasta,cherry%20tomatoes')}>
              <span>View all matches</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3-Step Mindful Philosophy Strip */}
      <section className="w-full bg-bg py-16 px-4 md:px-8 lg:px-12 border-y border-line">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-primary uppercase tracking-widest font-bold">Thoughtful Domesticity</span>
              <h2 className="font-display text-3xl font-bold text-ink mt-1">How Smart Pantry Transforms Dinner</h2>
            </div>
            <p className="text-base text-muted max-w-md">
              Engineered to eradicate the "nothing to eat" dilemma without requiring a last-minute grocery dash.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group border border-line">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="font-display font-bold text-xl">1</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted font-semibold tracking-wider">STEP 01</span>
                  <h3 className="font-display font-semibold text-lg text-ink">Add your current ingredients</h3>
                </div>
                <p className="text-sm text-muted">
                  Dump whatever loose produce, dried beans, dairy heels, or forgotten condiments are sitting quietly in your shelves.
                </p>
              </div>
              <div className="pt-4 mt-6 flex items-center gap-2 text-xs font-medium text-primary border-t border-line/50">
                <CheckCircle size={16} />
                <span>Supports bulk text entry</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group border border-line">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent-text group-hover:bg-accent group-hover:text-white transition-colors">
                  <span className="font-display font-bold text-xl">2</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted font-semibold tracking-wider">STEP 02</span>
                  <h3 className="font-display font-semibold text-lg text-ink">Pantry availability sorting</h3>
                </div>
                <p className="text-sm text-muted">
                  Our culinary match engine separates dishes into 100% ready now versus creative preparations missing just a pinch or substitution.
                </p>
              </div>
              <div className="pt-4 mt-6 flex items-center gap-2 text-xs font-medium text-accent-text border-t border-line/50">
                <CheckCircle size={16} />
                <span>Substitutions provided inline</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group border border-line">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="font-display font-bold text-xl">3</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted font-semibold tracking-wider">STEP 03</span>
                  <h3 className="font-display font-semibold text-lg text-ink">Cook step-by-step with calm</h3>
                </div>
                <p className="text-sm text-muted">
                  Follow integrated multi-timers, heat adjustments, and one-pan friendly instructions tailored for peaceful home cooking.
                </p>
              </div>
              <div className="pt-4 mt-6 flex items-center gap-2 text-xs font-medium text-primary border-t border-line/50">
                <CheckCircle size={16} />
                <span>Zero screen lock during cook flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Seasonal Inspirations */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1 text-accent-text text-xs font-bold mb-1 uppercase tracking-wide">
              WHAT OTHERS ARE COOKING
            </div>
            <h2 className="font-display text-3xl font-bold text-ink">Popular in Pantries Today</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium shadow-sm">All Matches</button>
            <button className="px-4 py-1.5 rounded-full bg-surface text-ink hover:bg-bg text-xs font-medium transition-colors border border-line">100% Ready (4)</button>
            <button className="px-4 py-1.5 rounded-full bg-surface text-ink hover:bg-bg text-xs font-medium transition-colors border border-line">Under 25 mins</button>
            <button className="px-4 py-1.5 rounded-full bg-surface text-ink hover:bg-bg text-xs font-medium transition-colors border border-line">One-Pan</button>
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <article className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group border border-line">
            <div className="relative h-56 w-full overflow-hidden bg-bg">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=800" alt="Spaghetti aglio e olio" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary text-xs font-bold flex items-center gap-1 shadow-sm">
                  <CheckCircle size={14} /> 100% Ready
                </span>
              </div>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-ink hover:text-accent-text flex items-center justify-center transition-colors shadow-sm">
                <Bookmark size={18} />
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ink bg-surface/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium">
                <span className="flex items-center gap-1"><Clock size={14} /> 15 mins</span>
                <span className="text-primary font-bold">4 Pantry items</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-muted mb-2 uppercase tracking-wide">
                  <span>PASTA & GRAINS</span><span>•</span><span>MEDITERRANEAN</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors leading-snug">
                  Blistered Tomato & Garlic Aglio e Olio
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">
                  Crisp golden garlic slivers infused into peppery olive oil, tossed with al dente pasta and bursting sweet summer tomatoes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">Garlic</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">Olive Oil</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">+2</span>
                </div>
                <button className="h-8 px-4 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">Cook Now</button>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group border border-line">
            <div className="relative h-56 w-full overflow-hidden bg-bg">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=800" alt="Shakshuka" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                  <AlertCircle size={14} /> Missing 1 item
                </span>
              </div>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-ink hover:text-accent-text flex items-center justify-center transition-colors shadow-sm">
                <Bookmark size={18} />
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ink bg-surface/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium">
                <span className="flex items-center gap-1"><Clock size={14} /> 22 mins</span>
                <span className="text-accent-text font-bold">Needs: Eggs</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-muted mb-2 uppercase tracking-wide">
                  <span>ONE-PAN</span><span>•</span><span>NORTH AFRICAN</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors leading-snug">
                  Rustic Skillet Cherry Tomato Shakshuka
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">
                  Ripe crushed cherry tomatoes slow-simmered with crushed garlic and warm spices, cradling gently poached fresh eggs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div className="text-xs text-muted">
                  <span className="text-accent-text font-semibold mr-1">Quick swap:</span>White beans
                </div>
                <button className="h-8 px-4 rounded-lg bg-bg text-ink border border-line text-sm font-medium hover:bg-line transition-colors">View Recipe</button>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group border border-line">
            <div className="relative h-56 w-full overflow-hidden bg-bg">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=800" alt="Bruschetta" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary text-xs font-bold flex items-center gap-1 shadow-sm">
                  <CheckCircle size={14} /> 100% Ready
                </span>
              </div>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-ink hover:text-accent-text flex items-center justify-center transition-colors shadow-sm">
                <Bookmark size={18} />
              </button>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ink bg-surface/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium">
                <span className="flex items-center gap-1"><Clock size={14} /> 10 mins</span>
                <span className="text-primary font-bold">Fast Lunch</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-muted mb-2 uppercase tracking-wide">
                  <span>ANTIPASTI</span><span>•</span><span>MINIMAL EFFORT</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors leading-snug">
                  Warm Garlic Bruschetta with Sweet Tomatoes
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">
                  Charred crusty bread vigorously rubbed with fresh raw garlic, bathed in cold-pressed olive oil, and topped with sea-salted tomatoes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">Tomatoes</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">Garlic</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-bg text-ink border border-line">+1</span>
                </div>
                <button className="h-8 px-4 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">Cook Now</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Interactive Pantry Breakdown */}
      <section className="w-full bg-bg py-16 px-4 md:px-8 lg:px-12 border-t border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs text-primary uppercase tracking-widest font-bold">Mindful Domestic Ecology</span>
            <h2 className="font-display text-3xl font-bold text-ink">Saving dinner, one wilted herb at a time.</h2>
            <p className="text-base text-muted">
              The average household tosses $1,500 worth of edible ingredients annually. Smart Pantry cross-references shelf lives and flavor affinities to prioritize what needs to be cooked first.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-surface p-5 rounded-xl shadow-sm border border-line">
                <span className="font-display text-4xl text-primary font-bold block mb-1">84%</span>
                <span className="text-xs text-muted leading-tight block">Average produce waste eliminated for regular home cooks</span>
              </div>
              <div className="bg-surface p-5 rounded-xl shadow-sm border border-line">
                <span className="font-display text-4xl text-accent-text font-bold block mb-1">21 min</span>
                <span className="text-xs text-muted leading-tight block">Mean weeknight preparation time achieved</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-surface rounded-xl p-6 md:p-8 shadow-sm border border-line">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                <h3 className="font-display font-semibold text-lg text-ink">Your Pantry Freshness Gauge</h3>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">Healthy Rotation</span>
            </div>
            
            <div className="py-6 flex flex-col gap-6">
              {/* Item 1 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-ink mb-2">
                  <span>Cherry Tomatoes • 250g</span>
                  <span className="text-accent-text font-semibold">Cook within 48h</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-line/50">
                  <div className="bg-accent h-full rounded-full w-3/4"></div>
                </div>
              </div>
              {/* Item 2 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-ink mb-2">
                  <span>Garlic Cloves • 1 head</span>
                  <span className="text-primary font-semibold">Pantry Stable (~3 wks)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-line/50">
                  <div className="bg-primary h-full rounded-full w-1/4"></div>
                </div>
              </div>
              {/* Item 3 */}
              <div>
                <div className="flex justify-between text-sm font-medium text-ink mb-2">
                  <span>Organic Olive Oil • 500ml</span>
                  <span className="text-primary font-semibold">Pantry Stable (~6 mos)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-line/50">
                  <div className="bg-primary h-full rounded-full w-1/6"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-2 pt-4 bg-primary/5 border border-primary/10 rounded-lg p-4 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <Sparkles className="text-primary shrink-0 hidden sm:block" size={18} />
              <div className="flex-1">
                <span className="text-sm text-ink"><span className="font-semibold text-primary">Pro tip:</span> Roast aging cherry tomatoes with garlic in oil for instant confit.</span>
              </div>
              <button className="text-primary text-sm font-semibold hover:underline shrink-0">Recipe →</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
