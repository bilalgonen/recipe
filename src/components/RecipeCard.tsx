import { Clock, Flame, Star } from 'lucide-react'
import { Link } from 'react-router'
import { matchedIngredients } from '../lib/highlight'
import { totalTime } from '../lib/filterRecipes'
import type { Recipe, SearchMode } from '../types/recipe'
import { FavoriteButton } from './FavoriteButton'
import { Highlight } from './Highlight'
import { TagChip } from './TagChip'

const difficultyStyle = {
  Easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  Hard: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
} as const

interface Props {
  recipe: Recipe
  query: string
  mode: SearchMode
  index: number
}

export function RecipeCard({ recipe, query, mode, index }: Props) {
  const matches = matchedIngredients(recipe, query, mode)
  return (
    <article
      className="animate-fade-up group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
      style={{ animationDelay: `${Math.min(index % 30, 10) * 30}ms` }}
    >
      <Link to={`/recipe/${recipe.id}`} className="block after:absolute after:inset-0 after:content-['']">
        <div className="aspect-4/3 overflow-hidden bg-stone-200 dark:bg-stone-800">
          <img
            src={recipe.image}
            alt=""
            loading={index < 6 ? 'eager' : 'lazy'}
            width={400}
            height={300}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>{recipe.cuisine}</span>
            <span className={`rounded-full px-2 py-0.5 ${difficultyStyle[recipe.difficulty]}`}>{recipe.difficulty}</span>
          </div>
          <h2 className="line-clamp-2 min-h-12 text-lg leading-6 font-semibold">
            <Highlight text={recipe.name} query={mode === 'all' || mode === 'name' ? query : ''} />
          </h2>
          <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1" title={`${recipe.reviewCount} reviews`}>
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {recipe.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-4" />
              {totalTime(recipe)} min
            </span>
            <span className="flex items-center gap-1">
              <Flame className="size-4" />
              {recipe.caloriesPerServing}
            </span>
          </div>
          {matches.length > 0 && (
            <p className="line-clamp-1 text-xs text-stone-500 dark:text-stone-400">
              Contains: {matches.map((m, i) => (
                <span key={m}>
                  {i > 0 && ', '}
                  <Highlight text={m} query={query} />
                </span>
              ))}
            </p>
          )}
        </div>
      </Link>
      <div className="relative z-10 flex flex-wrap gap-1.5 px-4 pb-4">
        {recipe.tags.slice(0, 3).map((t) => (
          <TagChip key={t} tag={t} />
        ))}
      </div>
      <FavoriteButton id={recipe.id} name={recipe.name} className="absolute top-3 right-3 z-10" />
    </article>
  )
}
