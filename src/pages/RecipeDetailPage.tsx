import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Clock, UtensilsCrossed, CheckCircle2, AlertCircle } from 'lucide-react'
import { MOCK_RECIPES } from '../mocks/recipes'
import type { Recipe } from '../types/api'

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [notFound, setNotFound]   = useState(false)

  // User's original ingredients (from URL state for missing-item callout)
  const userIngredients = (searchParams.get('q') ?? '')
    .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)

  useEffect(() => {
    const found = MOCK_RECIPES.find((r) => r.id === id) ?? null
    if (found) setRecipe(found)
    else setNotFound(true)
  }, [id])

  if (notFound) {
    return (
      <div className="page-container text-center py-16">
        <p className="text-muted">Recipe not found.</p>
        <button className="btn-ghost mt-4" onClick={() => navigate(-1)}>Go back</button>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="page-container">
        <div className="animate-pulse-soft space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-5 bg-line rounded-button w-full" />
          ))}
        </div>
      </div>
    )
  }

  const recipeIngredientNames = recipe.ingredients.map((i) => i.name.toLowerCase())
  const missing = userIngredients.length > 0
    ? recipeIngredientNames.filter(
        (n) => !userIngredients.some((u) => n.includes(u) || u.includes(n))
      )
    : []

  return (
    <div className="page-container">

      {/* ── Back button ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn-ghost p-2 !px-2 mb-6 gap-1.5"
        aria-label="Back to results"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back
      </button>

      {/* ── Recipe header ─────────────────────────────────────── */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 items-center mb-2">
          {recipe.cuisine && (
            <span className="filter-pill-inactive text-xs">
              <UtensilsCrossed size={11} strokeWidth={1.5} />
              {recipe.cuisine}
            </span>
          )}
          {recipe.cookTimeMinutes && (
            <span className="filter-pill-inactive text-xs">
              <Clock size={11} strokeWidth={1.5} />
              {recipe.timeEstimated ? '~' : ''}{recipe.cookTimeMinutes} min
            </span>
          )}
          {recipe.dietTags.map((tag) => (
            <span key={tag} className="filter-pill-inactive text-xs capitalize">{tag}</span>
          ))}
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-2">
          {recipe.name}
        </h1>

        {recipe.description && (
          <p className="text-muted text-base">{recipe.description}</p>
        )}

        {/* Missing-item callout */}
        {missing.length > 0 && (
          <div className="mt-4 rounded-card border border-accent/30 bg-accent/5 px-4 py-3
                          flex items-start gap-3">
            <AlertCircle
              size={18} strokeWidth={1.5}
              className="text-accent-text flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-ink">You're missing a few ingredients</p>
              <p className="text-xs text-accent-text mt-0.5">
                {missing.join(', ')}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* ── Two-column layout on desktop ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

        {/* LEFT — Ingredients ─────────────────────────────────── */}
        <aside>
          <div className="card sticky top-24">
            <h2 className="font-display font-semibold text-lg text-ink mb-4">
              Ingredients
              {recipe.servings && (
                <span className="text-xs font-normal text-muted ml-2">
                  (serves {recipe.servings})
                </span>
              )}
            </h2>
            <ul className="space-y-2.5" aria-label="Ingredient list">
              {recipe.ingredients.map((ing) => {
                const have = userIngredients.some(
                  (u) => ing.name.toLowerCase().includes(u) || u.includes(ing.name.toLowerCase())
                )
                return (
                  <li key={ing.name} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2
                      size={15}
                      strokeWidth={1.5}
                      className={have ? 'text-success flex-shrink-0' : 'text-line flex-shrink-0'}
                      aria-hidden="true"
                    />
                    <span className={have ? 'text-ink' : 'text-muted'}>
                      {ing.quantity && <span className="font-medium">{ing.quantity} </span>}
                      {ing.unit && <span>{ing.unit} </span>}
                      {ing.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* RIGHT — Steps + notes ──────────────────────────────── */}
        <div>
          <h2 className="font-display font-semibold text-lg text-ink mb-4">
            Instructions
          </h2>
          <ol className="space-y-5" aria-label="Recipe steps">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div
                  className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold
                             flex items-center justify-center flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <p className="text-ink text-sm leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>

          {recipe.notes && (
            <div className="mt-8 rounded-card border border-warning/30 bg-warning/5 px-4 py-3">
              <p className="text-sm font-medium text-ink mb-1">Chef's note</p>
              <p className="text-sm text-muted">{recipe.notes}</p>
            </div>
          )}

          {/* Phase 2 placeholder — shopping list CTA */}
          <div className="mt-10 rounded-card border border-dashed border-line p-4 text-center">
            <p className="text-xs text-muted">
              🛒 <strong>Phase 2:</strong> "Add missing items to shopping list" will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
