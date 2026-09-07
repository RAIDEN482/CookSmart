import { mockIngredients } from '../mocks/recipes'

/**
 * Returns ingredient suggestions matching the query.
 * PHASE 1b TODO: Replace body with:
 *   const res = await fetch(`/ingredients/suggest?q=${encodeURIComponent(query)}`)
 *   return (await res.json()).map((i: {name:string}) => i.name)
 */
export async function suggestIngredients(query: string): Promise<string[]> {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase().trim()
  return mockIngredients.filter((i) => i.toLowerCase().includes(q)).slice(0, 8)
}
