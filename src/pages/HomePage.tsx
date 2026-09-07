import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { IngredientInput } from '../components/IngredientInput'

export function HomePage() {
  const navigate = useNavigate()

  function handleSubmit(ingredients: string[]) {
    const params = new URLSearchParams()
    params.set('q', ingredients.join(','))
    navigate(`/results?${params.toString()}`)
  }

  return (
    <div className="relative min-h-[calc(100dvh-56px)] flex flex-col">

      {/* ── Background illustration — warm cream overlay ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Soft radial blobs for warmth */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full
                        bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[300px] h-[300px] rounded-full bg-warning/5 blur-3xl" />
      </div>

      {/* ── Hero content ──────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center
                      px-4 sm:px-6 py-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary
                        rounded-chip px-3 py-1 text-xs font-medium mb-6 animate-fade-in">
          <Sparkles size={12} strokeWidth={2} aria-hidden="true" />
          Find recipes with what you have
        </div>

        {/* Display headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[56px]
                       text-ink mb-4 leading-tight animate-fade-in"
            style={{ animationDelay: '60ms' }}>
          Cook what you've got.
          <br />
          <span className="text-primary">No excuses.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-muted text-lg sm:text-xl max-w-md mb-10 animate-fade-in"
           style={{ animationDelay: '120ms' }}>
          Type in what's in your fridge — we'll tell you what you can make right now.
        </p>

        {/* ── Ingredient Input — hero element ─────────────── */}
        <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '180ms' }}>
          <IngredientInput onSubmit={handleSubmit} />
        </div>

        {/* Quick-start examples */}
        <div className="mt-6 flex items-center gap-2 flex-wrap justify-center
                        animate-fade-in" style={{ animationDelay: '240ms' }}>
          <span className="text-xs text-muted">Try:</span>
          {[
            ['garlic', 'olive oil', 'pasta'],
            ['eggs', 'cheese', 'butter'],
            ['chicken', 'garlic', 'lemon'],
          ].map((example) => (
            <button
              key={example.join()}
              type="button"
              onClick={() => handleSubmit(example)}
              className="text-xs text-primary underline underline-offset-2
                         hover:text-primary-dark transition-colors"
            >
              {example.join(', ')}
            </button>
          ))}
        </div>
      </div>

      {/* ── How it works — 3-step strip ──────────────────── */}
      <div className="relative z-10 border-t border-line bg-surface/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8
                        grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { step: '1', title: 'Add ingredients', body: 'Type what you have in your kitchen right now.' },
            { step: '2', title: 'See what you can make', body: 'Recipes ranked by how many ingredients you already have.' },
            { step: '3', title: 'Cook with confidence', body: 'Full recipe with steps, quantities, and notes.' },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white text-sm
                              font-bold flex items-center justify-center flex-shrink-0">
                {step}
              </div>
              <h3 className="font-display font-semibold text-ink">{title}</h3>
              <p className="text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
