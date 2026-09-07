export type DietTag = 'vegetarian' | 'vegan'
export type Bucket  = 'make-now' | 'missing-few' | 'missing-many'

export interface Ingredient {
  name: string
  quantity: string | null
  unit: string | null
}

export interface Recipe {
  id: string
  name: string
  description: string | null
  cuisine: string | null
  cookTimeMinutes: number | null
  timeEstimated: boolean
  servings: number | null
  dietTags: DietTag[]
  ingredients: Ingredient[]
  steps: string[]
  notes: string | null
  imageUrl: string | null
  sourceDataset: string
}

export interface RecipeResult {
  id: string
  name: string
  score: number
  bucket: Bucket
  matched: string[]
  missing: string[]
  cuisine: string | null
  cookTimeMinutes: number | null
  timeEstimated: boolean
  dietTags: DietTag[]
  imageUrl: string | null
}

export interface RecommendRequest {
  ingredients: string[]
  cuisine?: string
  maxTime?: number
  diet?: DietTag
}

export interface RecommendResponse {
  results: RecipeResult[]
  totalFound: number
  filtersApplied: {
    cuisine: string | null
    maxTime: number | null
    diet: DietTag | null
  }
}

export interface ApiError {
  code: string
  message: string
  details?: string
}
