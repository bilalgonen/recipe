import { Heart, X } from 'lucide-react'
import type { RecipeFilters } from '../types/recipe'

interface Option {
  value: string
  label: string
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: Option[]
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-stone-500 dark:text-stone-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl border border-stone-300 bg-white px-3 text-sm font-normal text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

const toOptions = (all: string, values: string[]): Option[] => [
  { value: '', label: all },
  ...values.map((v) => ({ value: v, label: v })),
]

const SORT_OPTIONS: Option[] = [
  { value: 'relevance', label: 'Default' },
  { value: 'rating', label: 'Top rated' },
  { value: 'time', label: 'Quickest' },
  { value: 'calories', label: 'Fewest calories' },
  { value: 'name', label: 'Name (A–Z)' },
]

interface Props {
  filters: RecipeFilters
  cuisines: string[]
  meals: string[]
  difficulties: string[]
  onChange: (patch: Partial<RecipeFilters>) => void
  onReset: () => void
  hasActive: boolean
}

export function FilterPanel({ filters, cuisines, meals, difficulties, onChange, onReset, hasActive }: Props) {
  return (
    <section aria-label="Filters" className="space-y-3">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Select label="Cuisine" value={filters.cuisine} onChange={(cuisine) => onChange({ cuisine })} options={toOptions('All cuisines', cuisines)} />
        <Select label="Meal type" value={filters.meal} onChange={(meal) => onChange({ meal })} options={toOptions('All meals', meals)} />
        <Select label="Difficulty" value={filters.difficulty} onChange={(difficulty) => onChange({ difficulty })} options={toOptions('Any difficulty', difficulties)} />
        <Select label="Sort by" value={filters.sort} onChange={(sort) => onChange({ sort: sort as RecipeFilters['sort'] })} options={SORT_OPTIONS} />
        <div className="flex items-end">
          <button
            type="button"
            aria-pressed={filters.favorites}
            onClick={() => onChange({ favorites: !filters.favorites })}
            className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${
              filters.favorites
                ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                : 'border-stone-300 bg-white hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800'
            }`}
          >
            <Heart className={`size-4 ${filters.favorites ? 'fill-current' : ''}`} />
            Favorites only
          </button>
        </div>
      </div>
      {(filters.tag || hasActive) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {filters.tag && (
            <button
              type="button"
              onClick={() => onChange({ tag: '' })}
              className="flex items-center gap-1 rounded-full bg-brand-600 py-1 pr-2 pl-3 text-white"
              aria-label={`Remove tag filter ${filters.tag}`}
            >
              Tag: {filters.tag}
              <X className="size-4" />
            </button>
          )}
          <button type="button" onClick={onReset} className="font-medium text-brand-700 underline-offset-4 hover:underline dark:text-brand-500">
            Clear all filters
          </button>
        </div>
      )}
    </section>
  )
}
