import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { mockRecommend } from '../mocks/recipes'
import type { RecommendResponse, Bucket } from '../types/api'
import type { FilterValues } from '../components/FilterBar'
import { FilterBar } from '../components/FilterBar'
import { BucketSection } from '../components/BucketSection'
import { RecipeCard } from '../components/RecipeCard'
import { EmptyState } from '../components/EmptyState'

const BUCKET_ORDER: Bucket[] = ['make-now', 'missing-few', 'missing-many']

export function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const ingredients = useMemo(
    () => (searchParams.get('q') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    [searchParams],
  )

  const [response, setResponse]       = useState<RecommendResponse | null>(null)
  const [status, setStatus]           = useState<'idle' | 'loading' | 'error'>('idle')
  const [filters, setFilters]         = useState<FilterValues>({
    cuisine: null, maxTime: null, diet: null,
  })

  // Fetch on ingredient or filter change
  useEffect(() => {
    if (ingredients.length === 0) { setStatus('idle'); return }

    setStatus('loading')
    setResponse(null)

    mockRecommend({
      ingredients,
      cuisine: filters.cuisine ?? undefined,
      maxTime: filters.maxTime ?? undefined,
      diet:    filters.diet    ?? undefined,
    })
      .then((res) => { setResponse(res); setStatus('idle') })
      .catch(() => setStatus('error'))
  }, [ingredients, filters])

  // Group results by bucket
 const grouped = useMemo(() => {
  if (!response) {
    return {} as Record<Bucket, RecommendResponse['results']>
  }

  const results = response.results

  return Object.fromEntries(
    BUCKET_ORDER.map((b) => [
      b,
      results.filter((r) => r.bucket === b),
    ])
  ) as Record<Bucket, RecommendResponse['results']>
}, [response])


  // ── Empty input ──────────────────────────────────────────────────
  if (ingredients.length === 0) {
    return (
      <div className="page-container">
        <EmptyState variant="empty-input" onAction={() => navigate('/')} />
      </div>
    )
  }

  return (
    <div className="page-container">

      {/* ── Back + ingredient chips row ──────────────────────── */}
      <div className="flex items-start gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost p-2 !px-2 flex-shrink-0 mt-0.5"
          aria-label="Go back"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </button>
        <div>
          <p className="text-xs text-muted mb-1.5">Searching with:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <span key={ing} className="chip">{ing}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <FilterBar
        values={filters}
        onChange={setFilters}
        totalResults={response?.totalFound ?? 0}
      />

      {/* ── States ──────────────────────────────────────────────── */}
      {status === 'loading' && (
        <EmptyState variant="loading" />
      )}

      {status === 'error' && (
        <EmptyState
          variant="error"
          onAction={() => {
            setStatus('idle')
            setResponse(null)
          }}
        />
      )}

      {status === 'idle' && response && response.totalFound === 0 && (
        <EmptyState
          variant="no-results"
          details={ingredients.find((i) => !response.results.some((r) => r.matched.includes(i)))}
          onAction={() => navigate('/')}
        />
      )}

      {/* ── Bucketed results ─────────────────────────────────────── */}
      {status === 'idle' && response && response.totalFound > 0 && (
        <div>
          {BUCKET_ORDER.map((bucket) => (
            <BucketSection key={bucket} bucket={bucket} count={grouped[bucket]?.length ?? 0}>
              {grouped[bucket]?.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  userIngredients={ingredients}
                />
              ))}
            </BucketSection>
          ))}

          {/* Diet disclaimer */}
          {filters.diet && (
            <p className="text-xs text-muted mt-6 text-center px-4">
              ⚠️ Diet labels are estimated from ingredient keywords and may not be fully accurate.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
