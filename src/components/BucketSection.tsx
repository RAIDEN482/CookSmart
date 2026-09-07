import type { ReactNode } from 'react'
import type { Bucket } from '../types/api'

interface BucketSectionProps {
  bucket: Bucket
  children: ReactNode
  count: number
}

const BUCKET_CONFIG: Record<
  Bucket,
  { label: string; sublabel: string; dotColor: string; textColor: string; headerBg: string }
> = {
  'make-now': {
    label: 'You can make these now',
    sublabel: 'All ingredients matched',
    dotColor:   'bg-success',
    textColor:  'text-ink',
    headerBg:   'bg-success/10 border-success/30',
  },
  'missing-few': {
    label: 'Almost there — missing 1–2',
    sublabel: 'A quick trip to the store',
    dotColor:   'bg-warning',
    textColor:  'text-ink',
    headerBg:   'bg-warning/10 border-warning/30',
  },
  'missing-many': {
    label: 'Need a bigger shop',
    sublabel: 'Several ingredients missing',
    dotColor:   'bg-danger',
    textColor:  'text-white',
    headerBg:   'bg-danger/10 border-danger/30',
  },
}

export function BucketSection({ bucket, children, count }: BucketSectionProps) {
  const config = BUCKET_CONFIG[bucket]

  if (count === 0) return null

  return (
    <section className="section" aria-labelledby={`bucket-${bucket}`}>
      {/* Header */}
      <div
        className={`bucket-header rounded-card border px-4 py-3 mb-5 ${config.headerBg}`}
      >
        <div
          className={`bucket-dot ${config.dotColor}`}
          aria-hidden="true"
        />
        <div>
          <h2
            id={`bucket-${bucket}`}
            className="font-display font-semibold text-xl text-ink"
          >
            {config.label}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {config.sublabel} &mdash;{' '}
            <span className="font-medium text-ink">{count} recipe{count !== 1 ? 's' : ''}</span>
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  )
}
