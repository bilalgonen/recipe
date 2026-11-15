import type { Recipe, RecipesResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json() as Promise<T>
}

/** The dataset is tiny (50 recipes), so we load it in one request and filter client-side. */
export async function fetchAllRecipes(signal?: AbortSignal): Promise<Recipe[]> {
  const data = await getJson<RecipesResponse>(`${BASE_URL}?limit=0`, signal)
  return data.recipes
}

export function fetchRecipe(id: number, signal?: AbortSignal): Promise<Recipe> {
  return getJson<Recipe>(`${BASE_URL}/${id}`, signal)
}
