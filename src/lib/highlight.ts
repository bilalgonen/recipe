import type { Recipe, SearchMode } from '../types/recipe'

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Splits text into segments flagged by whether they match the query. */
export function splitMatches(text: string, query: string): { text: string; match: boolean }[] {
  const q = query.trim()
  if (!q) return [{ text, match: false }]
  return text
    .split(new RegExp(`(${escape(q)})`, 'i'))
    .filter(Boolean)
    .map((part) => ({ text: part, match: part.toLowerCase() === q.toLowerCase() }))
}

/** Ingredients that matched the query, so the card can explain why it was returned. */
export function matchedIngredients(recipe: Recipe, query: string, mode: SearchMode): string[] {
  const q = query.trim().toLowerCase()
  if (!q || (mode !== 'ingredient' && mode !== 'all')) return []
  return recipe.ingredients.filter((i) => i.toLowerCase().includes(q))
}
