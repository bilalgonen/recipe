import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { DEFAULT_FILTERS } from '../lib/filterRecipes'
import type { RecipeFilters, SearchMode, SortKey } from '../types/recipe'

const MODES: SearchMode[] = ['all', 'name', 'tag', 'ingredient']
const SORTS: SortKey[] = ['relevance', 'rating', 'time', 'calories', 'name']

/** Filters live in the URL so searches are shareable and survive refresh/back. */
export function useRecipeFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo<RecipeFilters>(() => {
    const mode = params.get('mode') as SearchMode
    const sort = params.get('sort') as SortKey
    return {
      q: params.get('q') ?? '',
      mode: MODES.includes(mode) ? mode : DEFAULT_FILTERS.mode,
      cuisine: params.get('cuisine') ?? '',
      meal: params.get('meal') ?? '',
      difficulty: params.get('difficulty') ?? '',
      tag: params.get('tag') ?? '',
      sort: SORTS.includes(sort) ? sort : DEFAULT_FILTERS.sort,
      favorites: params.get('favorites') === '1',
    }
  }, [params])

  const update = useCallback(
    (patch: Partial<RecipeFilters>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [key, value] of Object.entries(patch)) {
            const isDefault = value === DEFAULT_FILTERS[key as keyof RecipeFilters]
            if (isDefault) next.delete(key)
            else next.set(key, value === true ? '1' : String(value))
          }
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const reset = useCallback(() => setParams({}, { replace: true }), [setParams])

  return { filters, update, reset }
}
