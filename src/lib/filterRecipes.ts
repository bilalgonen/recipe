import type { Recipe, RecipeFilters, SortKey } from '../types/recipe'

export const DEFAULT_FILTERS: RecipeFilters = {
  q: '',
  mode: 'all',
  cuisine: '',
  meal: '',
  difficulty: '',
  sort: 'relevance',
  favorites: false,
  tag: '',
}

const norm = (s: string) => s.toLowerCase().trim()
const includes = (haystack: string, needle: string) => norm(haystack).includes(needle)

export function matchesQuery(recipe: Recipe, q: string, mode: RecipeFilters['mode']): boolean {
  const needle = norm(q)
  if (!needle) return true
  const name = () => includes(recipe.name, needle)
  const tag = () => recipe.tags.some((t) => includes(t, needle))
  const ingredient = () => recipe.ingredients.some((i) => includes(i, needle))
  switch (mode) {
    case 'name':
      return name()
    case 'tag':
      return tag()
    case 'ingredient':
      return ingredient()
    default:
      return name() || tag() || ingredient() || includes(recipe.cuisine, needle)
  }
}

export const totalTime = (r: Recipe) => r.prepTimeMinutes + r.cookTimeMinutes

const sorters: Record<Exclude<SortKey, 'relevance'>, (a: Recipe, b: Recipe) => number> = {
  rating: (a, b) => b.rating - a.rating,
  time: (a, b) => totalTime(a) - totalTime(b),
  calories: (a, b) => a.caloriesPerServing - b.caloriesPerServing,
  name: (a, b) => a.name.localeCompare(b.name),
}

export function filterRecipes(
  recipes: Recipe[],
  filters: RecipeFilters,
  favoriteIds: ReadonlySet<number> = new Set(),
): Recipe[] {
  const result = recipes.filter(
    (r) =>
      matchesQuery(r, filters.q, filters.mode) &&
      (!filters.cuisine || r.cuisine === filters.cuisine) &&
      (!filters.meal || r.mealType.includes(filters.meal)) &&
      (!filters.difficulty || r.difficulty === filters.difficulty) &&
      (!filters.tag || r.tags.includes(filters.tag)) &&
      (!filters.favorites || favoriteIds.has(r.id)),
  )
  if (filters.sort !== 'relevance') result.sort(sorters[filters.sort])
  return result
}

/** Unique sorted values used to populate filter dropdowns. */
export function uniqueValues(recipes: Recipe[], pick: (r: Recipe) => string | string[]): string[] {
  const set = new Set<string>()
  for (const r of recipes) {
    const v = pick(r)
    for (const x of Array.isArray(v) ? v : [v]) set.add(x)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}
