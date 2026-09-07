import type { SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

/**
 * CookSmart botanical chef hat emblem.
 * Rendered as a vector SVG matching the brand artwork:
 * - Left side: Sage Green (#5B7553) vine and leaf flourishes
 * - Right side: Terracotta (#B9713F) vine and leaf flourishes
 * - 100% transparent background, crisp at all resolutions.
 */
export function CookSmartEmblem({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* ─── BASE BRIM (Elliptical Rim) ─── */}
      {/* Lower Rim - Green left half */}
      <path
        d="M 86 170 C 98 178 112 181 122 181"
        stroke="#5B7553"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Lower Rim - Terracotta right half */}
      <path
        d="M 122 181 C 132 181 146 178 158 170"
        stroke="#B9713F"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Upper Rim - Green left half */}
      <path
        d="M 88 152 C 100 146 112 144 122 144"
        stroke="#5B7553"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Upper Rim - Terracotta right half */}
      <path
        d="M 122 144 C 132 144 144 146 156 152"
        stroke="#B9713F"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* ─── GREEN CANOPY & VINES (Left Half) ─── */}
      {/* Outer Left Hat Puff */}
      <path
        d="M 88 152 C 70 144 52 118 58 92 C 64 68 84 58 102 64"
        stroke="#5B7553"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Top Center Swirling Green Vine Arch */}
      <path
        d="M 102 64 C 112 44 134 40 146 52 C 158 64 154 88 142 106"
        stroke="#5B7553"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Left Interior Stem branching up from base */}
      <path
        d="M 94 150 C 92 126 102 104 116 88"
        stroke="#5B7553"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* ─── GREEN LEAVES ─── */}
      {/* Leaf 1: Far Left Outer Leaf */}
      <path
        d="M 68 112 C 58 96 66 78 76 76 C 76 90 76 104 68 112 Z"
        fill="#5B7553"
      />
      {/* Leaf 2: Mid-Left Sprouting Leaf */}
      <path
        d="M 90 122 C 80 106 90 92 100 90 C 100 104 98 118 90 122 Z"
        fill="#5B7553"
      />
      {/* Leaf 3: Center-Left Upright Leaf */}
      <path
        d="M 116 112 C 110 92 118 76 126 76 C 128 92 124 108 116 112 Z"
        fill="#5B7553"
      />
      {/* Leaf 4: Top Arch Horizontal Leaf */}
      <path
        d="M 112 56 C 126 48 144 50 148 58 C 136 64 120 62 112 56 Z"
        fill="#5B7553"
      />
      {/* Leaf 5: Bottom Base Resting Leaf */}
      <path
        d="M 100 140 C 114 134 132 136 136 144 C 122 148 108 146 100 140 Z"
        fill="#5B7553"
      />

      {/* ─── TERRACOTTA CANOPY & VINES (Right Half) ─── */}
      {/* Outer Right Hat Puff */}
      <path
        d="M 146 52 C 162 56 178 68 180 86 C 182 108 170 138 156 152"
        stroke="#B9713F"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Terracotta Central Branching Stem */}
      <path
        d="M 116 126 C 128 116 142 114 158 116"
        stroke="#B9713F"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* ─── TERRACOTTA LEAVES ─── */}
      {/* Leaf 6: Center Tall Terracotta Leaf */}
      <path
        d="M 134 106 C 130 84 144 68 152 70 C 154 86 148 104 134 106 Z"
        fill="#B9713F"
      />
      {/* Leaf 7: Upper Right Puff Leaf */}
      <path
        d="M 156 90 C 152 76 166 64 174 66 C 174 78 168 88 156 90 Z"
        fill="#B9713F"
      />
      {/* Leaf 8: Outer Right Edge Leaf */}
      <path
        d="M 174 116 C 170 100 182 86 190 88 C 190 102 184 116 174 116 Z"
        fill="#B9713F"
      />
      {/* Leaf 9: Lower Right Branch Leaf */}
      <path
        d="M 152 126 C 146 112 158 100 166 102 C 166 114 162 126 152 126 Z"
        fill="#B9713F"
      />
      {/* Leaf 10: Bottom Right Angle Leaf */}
      <path
        d="M 144 140 C 154 128 166 132 168 140 C 160 148 148 148 144 140 Z"
        fill="#B9713F"
      />
    </svg>
  )
}

interface FullLogoProps {
  size?: number | string
  className?: string
  showText?: boolean
  layout?: 'horizontal' | 'stacked'
}

/**
 * Full CookSmart Logo (Emblem + Typography).
 * Can be used in horizontal navigation bars or stacked hero banners.
 */
export function CookSmartLogo({
  size = 36,
  className = '',
  showText = true,
  layout = 'horizontal',
}: FullLogoProps) {
  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 group ${className}`}>
        <CookSmartEmblem size={size} />
        {showText && (
          <span className="font-display font-bold text-2xl tracking-tight text-ink group-hover:text-primary transition-colors">
            Cook <span className="text-primary">Smart</span>
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <CookSmartEmblem size={size} />
      {showText && (
        <span className="font-display font-semibold text-xl tracking-tight text-ink group-hover:text-primary transition-colors">
          Cook<span className="text-primary">Smart</span>
        </span>
      )}
    </div>
  )
}
