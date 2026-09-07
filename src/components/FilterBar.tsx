import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import type { DietTag } from '../types/api'

const CUISINES = [
  'Italian', 'Indian', 'Mexican', 'Chinese', 'Japanese',
  'Thai', 'Mediterranean', 'French', 'American', 'Korean', 'Greek',
]

const TIME_OPTIONS: { label: string; value: number }[] = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
]

export interface FilterValues {
  cuisine:  string | null
  maxTime:  number | null
  diet:     DietTag | null
}

interface FilterBarProps {
  values: FilterValues
  onChange: (next: FilterValues) => void
  totalResults: number
}

export function FilterBar({ values, onChange, totalResults }: FilterBarProps) {
  const [cuisineOpen, setCuisineOpen] = useState(false)

  const hasActiveFilters =
    values.cuisine !== null || values.maxTime !== null || values.diet !== null

  function clearAll() {
    onChange({ cuisine: null, maxTime: null, diet: null })
  }

  function toggleDiet(tag: DietTag) {
    onChange({ ...values, diet: values.diet === tag ? null : tag })
  }

  function setMaxTime(t: number) {
    onChange({ ...values, maxTime: values.maxTime === t ? null : t })
  }

  function setCuisine(c: string) {
    onChange({ ...values, cuisine: values.cuisine === c ? null : c })
    setCuisineOpen(false)
  }

  return (
    <div
      className="sticky top-14 z-30 bg-bg/95 backdrop-blur-sm
                 border-b border-line py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6"
      role="region"
      aria-label="Recipe filters"
    >
      <div className="flex items-center gap-2 flex-wrap">
        {/* Filter icon */}
        <SlidersHorizontal
          size={15}
          strokeWidth={1.5}
          className="text-muted flex-shrink-0"
          aria-hidden="true"
        />

        {/* Results count */}
        <span className="text-sm text-muted mr-1">
          <strong className="text-ink">{totalResults}</strong> recipes
        </span>

        {/* ── Cuisine dropdown ──────────────────────────── */}
        <div className="relative">
          <button
            type="button"
            id="cuisine-filter-btn"
            aria-haspopup="listbox"
            aria-expanded={cuisineOpen}
            className={values.cuisine ? 'filter-pill-active' : 'filter-pill-inactive'}
            onClick={() => setCuisineOpen((v) => !v)}
          >
            {values.cuisine ?? 'Cuisine'}
            {values.cuisine && (
              <X
                size={11}
                strokeWidth={2.5}
                aria-hidden="true"
                onClick={(e) => { e.stopPropagation(); onChange({ ...values, cuisine: null }) }}
              />
            )}
          </button>

          {cuisineOpen && (
            <div
              role="listbox"
              aria-label="Select cuisine"
              className="absolute top-full left-0 mt-1 w-44 bg-surface rounded-card
                         border border-line shadow-card z-40 max-h-60 overflow-y-auto
                         animate-fade-in"
            >
              {CUISINES.map((c) => (
                <button
                  key={c}
                  role="option"
                  aria-selected={values.cuisine === c}
                  type="button"
                  onClick={() => setCuisine(c)}
                  className={[
                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                    values.cuisine === c
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-ink hover:bg-bg',
                  ].join(' ')}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Time pills ────────────────────────────────── */}
        {TIME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={values.maxTime === opt.value}
            onClick={() => setMaxTime(opt.value)}
            className={values.maxTime === opt.value ? 'filter-pill-active' : 'filter-pill-inactive'}
          >
            ≤ {opt.label}
          </button>
        ))}

        {/* ── Diet toggles ──────────────────────────────── */}
        {(['vegetarian', 'vegan'] as DietTag[]).map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={values.diet === tag}
            onClick={() => toggleDiet(tag)}
            className={values.diet === tag ? 'filter-pill-active' : 'filter-pill-inactive'}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}

        {/* ── Clear all ─────────────────────────────────── */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-accent-text underline underline-offset-2
                       hover:text-accent transition-colors ml-auto"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
