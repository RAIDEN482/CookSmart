import { Leaf, SearchX, WifiOff, Loader2 } from 'lucide-react'

type Variant = 'empty-input' | 'no-results' | 'error' | 'loading'

interface EmptyStateProps {
  variant: Variant
  onAction?: () => void
  details?: string
}

const CONFIGS = {
  'empty-input': {
    Icon: Leaf, iconColor: 'text-muted',
    title: 'Start by adding ingredients',
    body: "Type what you have — garlic, eggs, spinach — and we'll find recipes you can make right now.",
    action: null,
  },
  'no-results': {
    Icon: SearchX, iconColor: 'text-muted',
    title: 'No recipes found',
    body: null,
    action: { label: 'Clear all and start over' },
  },
  'error': {
    Icon: WifiOff, iconColor: 'text-danger',
    title: 'Something went wrong',
    body: "We couldn't reach the recipe server. Check your connection and try again.",
    action: { label: 'Try Again' },
  },
  'loading': {
    Icon: Loader2, iconColor: 'text-primary',
    title: 'Finding your recipes…',
    body: 'Checking thousands of recipes against your ingredients.',
    action: null,
  },
} as const

export function EmptyState({ variant, onAction, details }: EmptyStateProps) {
  const { Icon, iconColor, title, action } = CONFIGS[variant]

  const body =
    variant === 'no-results'
      ? details
        ? `We couldn't match "${details}". Try removing it or check your spelling.`
        : 'Try removing some ingredients or adjusting your filters.'
      : CONFIGS[variant].body

  const isLoading = variant === 'loading'
  const isError   = variant === 'error'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className={`bg-surface rounded-card p-8 max-w-md w-full shadow-card border ${isError ? 'border-danger/20' : 'border-line'}`}>
        <Icon
          className={`w-10 h-10 mx-auto mb-4 ${iconColor} ${isLoading ? 'animate-spin' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="font-display font-semibold text-xl text-ink mb-2">{title}</h3>
        <p className="text-muted mb-6">{body}</p>
        {action && onAction && (
          <button
            onClick={onAction}
            className="border border-primary text-primary rounded-button px-5 py-2 font-medium
                       hover:bg-primary/5 transition-colors focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-primary"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}
