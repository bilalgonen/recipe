import { useMemo } from 'react'
import { FilterPanel } from '../components/FilterPanel'
import { RecipeGrid, PAGE_SIZE } from '../components/RecipeGrid'
import { SearchBar } from '../components/SearchBar'
import { EmptyState, ErrorState, RecipeSkeleton } from '../components/states'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipeFilters } from '../hooks/useRecipeFilters'
import { useRecipes } from '../hooks/useRecipes'
import { DEFAULT_FILTERS, filterRecipes, uniqueValues } from '../lib/filterRecipes'

export default function HomePage() {
  const { data, isPending, isError, error, refetch } = useRecipes()
  const { filters, update, reset } = useRecipeFilters()
  const { ids: favoriteIds } = useFavorites()

  const recipes = useMemo(() => data ?? [], [data])
  const results = useMemo(() => filterRecipes(recipes, filters, favoriteIds), [recipes, filters, favoriteIds])
  const options = useMemo(
    () => ({
      cuisines: uniqueValues(recipes, (r) => r.cuisine),
      meals: uniqueValues(recipes, (r) => r.mealType),
      difficulties: ['Easy', 'Medium', 'Hard'],
    }),
    [recipes],
  )

  const hasActive = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)
  const gridKey = JSON.stringify([filters, filters.favorites ? [...favoriteIds].sort() : 0])

  return (
    <main id="main" className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">What are we cooking today?</h1>
        <p className="text-stone-600 dark:text-stone-400">Search by name, tag or ingredient, then narrow down with filters.</p>
      </div>

      <SearchBar
        query={filters.q}
        mode={filters.mode}
        onQueryChange={(q) => update({ q })}
        onModeChange={(mode) => update({ mode })}
      />
      <FilterPanel
        filters={filters}
        {...options}
        onChange={update}
        onReset={reset}
        hasActive={hasActive}
      />

      <p aria-live="polite" className="text-sm text-stone-500 dark:text-stone-400">
        {isPending ? 'Loading recipes…' : `${results.length} ${results.length === 1 ? 'recipe' : 'recipes'}${results.length > PAGE_SIZE ? ` · showing ${PAGE_SIZE} at a time` : ''}`}
      </p>

      {isPending ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <RecipeSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState message={error.message} onRetry={() => void refetch()} />
      ) : results.length === 0 ? (
        <EmptyState onReset={reset} />
      ) : (
        <RecipeGrid key={gridKey} recipes={results} query={filters.q} mode={filters.mode} />
      )}
    </main>
  )
}
