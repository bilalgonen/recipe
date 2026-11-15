import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import type { SearchMode } from '../types/recipe'

const MODES: { value: SearchMode; label: string; placeholder: string }[] = [
  { value: 'all', label: 'All', placeholder: 'Search recipes, tags or ingredients…' },
  { value: 'name', label: 'Name', placeholder: 'Search by recipe name, e.g. pizza' },
  { value: 'tag', label: 'Tag', placeholder: 'Search by tag, e.g. dessert, vegetarian' },
  { value: 'ingredient', label: 'Ingredient', placeholder: 'Search by ingredient, e.g. garlic, basil' },
]

interface Props {
  query: string
  mode: SearchMode
  onQueryChange: (q: string) => void
  onModeChange: (m: SearchMode) => void
}

export function SearchBar({ query, mode, onQueryChange, onModeChange }: Props) {
  const [value, setValue] = useState(query)
  const debounced = useDebounce(value)
  const lastCommitted = useRef(query)

  // Push debounced input to the URL.
  useEffect(() => {
    if (debounced !== lastCommitted.current) {
      lastCommitted.current = debounced
      onQueryChange(debounced)
    }
  }, [debounced, onQueryChange])

  // Pull external changes (e.g. "clear all") into the input.
  useEffect(() => {
    if (query !== lastCommitted.current) {
      lastCommitted.current = query
      setValue(query)
    }
  }, [query])

  const current = MODES.find((m) => m.value === mode) ?? MODES[0]!

  return (
    <div className="space-y-3">
      <div role="search" className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={current.placeholder}
          aria-label="Search recipes"
          className="h-13 w-full rounded-2xl border border-stone-300 bg-white pr-12 pl-12 text-base shadow-sm transition placeholder:text-stone-400 focus:border-brand-600 dark:border-stone-700 dark:bg-stone-900 [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setValue('')}
            className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div role="radiogroup" aria-label="Search in" className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-stone-500 dark:text-stone-400">Search in:</span>
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={mode === m.value}
            onClick={() => onModeChange(m.value)}
            className={`rounded-full px-3.5 py-1.5 font-medium transition ${
              mode === m.value
                ? 'bg-brand-600 text-white'
                : 'bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
