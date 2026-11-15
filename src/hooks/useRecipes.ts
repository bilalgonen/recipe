import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAllRecipes, fetchRecipe } from '../api/recipes'
import type { Recipe } from '../types/recipe'

const LIST_KEY = ['recipes'] as const

export function useRecipes() {
  return useQuery({
    queryKey: LIST_KEY,
    queryFn: ({ signal }) => fetchAllRecipes(signal),
    staleTime: 1000 * 60 * 30,
  })
}

/** Uses the cached list when available; falls back to a direct request for deep links. */
export function useRecipe(id: number) {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: ({ signal }) => fetchRecipe(id, signal),
    initialData: () => client.getQueryData<Recipe[]>(LIST_KEY)?.find((r) => r.id === id),
    enabled: Number.isFinite(id),
    retry: false,
  })
}
