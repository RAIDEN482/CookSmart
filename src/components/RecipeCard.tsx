import { Clock, UtensilsCrossed } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RecipeResult } from '../types/api'

interface RecipeCardProps {
  recipe: RecipeResult
  /** Ingredients the user searched with — used to highlight matched ones */
  userIngredients: string[]
}

export function RecipeCard({ recipe, userIngredients: _ }: RecipeCardProps) {
  const navigate = useNavigate()

  const pct = Math.round(recipe.score * 100)

  // Badge tier based on score
  const badgeClass =
    pct === 100
      ? 'score-badge-green'
      : pct >= 80
      ? 'score-badge-amber'
      : 'score-badge-terracotta'

  return (
    <article
      className="card card-hover cursor-pointer group animate-fade-in"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/recipe/${recipe.id}`)}
      aria-label={`View recipe: ${recipe.name}`}
    >
      {/* ── Top row — name + badge ─────────────────────────── */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="font-display font-semibold text-lg text-ink leading-snug
                       group-hover:text-primary transition-colors line-clamp-2">
          {recipe.name}
        </h2>
        <span
          className={`${badgeClass} flex-shrink-0 mt-0.5`}
          aria-label={`${pct}% match`}
          title={`Match score: ${pct}%`}
        >
          {pct}%
        </span>
      </div>

      {/* ── Meta — cuisine + time ─────────────────────────── */}
      <div className="flex items-center gap-3 text-muted text-xs mb-3">
        {recipe.cuisine && (
          <span className="flex items-center gap-1">
            <UtensilsCrossed size={12} strokeWidth={1.5} aria-hidden="true" />
            {recipe.cuisine}
          </span>
        )}
        {recipe.cookTimeMinutes && (
          <span className="flex items-center gap-1">
            <Clock size={12} strokeWidth={1.5} aria-hidden="true" />
            {recipe.timeEstimated ? '~' : ''}{recipe.cookTimeMinutes} min
          </span>
        )}
        {recipe.dietTags.length > 0 && (
          <span className="capitalize">{recipe.dietTags[0]}</span>
        )}
      </div>

      {/* ── Missing items note ────────────────────────────── */}
      {recipe.missing.length > 0 && (
        <p className="text-xs text-accent-text leading-relaxed">
          <span className="font-medium">Missing: </span>
          {recipe.missing.slice(0, 3).join(', ')}
          {recipe.missing.length > 3 && ` +${recipe.missing.length - 3} more`}
        </p>
      )}

      {/* ── Diet tags ─────────────────────────────────────── */}
      {recipe.dietTags.length > 1 && (
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {recipe.dietTags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-success/15 text-success rounded-chip px-2 py-0.5 font-medium capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
