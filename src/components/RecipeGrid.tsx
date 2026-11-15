import { useInfiniteReveal } from '../hooks/useInfiniteReveal'
import type { Recipe, SearchMode } from '../types/recipe'
import { RecipeCard } from './RecipeCard'
import { RecipeSkeleton } from './states'

export const PAGE_SIZE = 30

interface Props {
  recipes: Recipe[]
  query: string
  mode: SearchMode
}

/** Remount with a new `key` whenever the result set changes to reset scrolling state. */
export function RecipeGrid({ recipes, query, mode }: Props) {
  const { visibleCount, hasMore, sentinelRef } = useInfiniteReveal(recipes.length, PAGE_SIZE)
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.slice(0, visibleCount).map((r, i) => (
          <RecipeCard key={r.id} recipe={r} query={query} mode={mode} index={i} />
        ))}
      </div>
      {hasMore ? (
        <div ref={sentinelRef} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RecipeSkeleton />
          <div className="hidden sm:block"><RecipeSkeleton /></div>
          <div className="hidden lg:block"><RecipeSkeleton /></div>
          <div className="hidden xl:block"><RecipeSkeleton /></div>
        </div>
      ) : (
        recipes.length > PAGE_SIZE && (
          <p className="mt-10 text-center text-sm text-stone-500 dark:text-stone-400">
            You've reached the end · {recipes.length} recipes
          </p>
        )
      )}
    </>
  )
}
