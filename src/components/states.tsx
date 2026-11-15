import { CookingPot, SearchX, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

function Message({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div role="status" className="mx-auto flex max-w-md flex-col items-center gap-3 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-stone-200 text-stone-500 dark:bg-stone-800">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="text-stone-600 dark:text-stone-400">{children}</div>
    </div>
  )
}

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Message icon={<SearchX className="size-8" />} title="No recipes found">
      <p>Try a different search term, switch the search mode, or remove some filters.</p>
      <button type="button" onClick={onReset} className="mt-4 rounded-full bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700">
        Clear search &amp; filters
      </button>
    </Message>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Message icon={<TriangleAlert className="size-8" />} title="Something went wrong">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 rounded-full bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700">
          Try again
        </button>
      )}
    </Message>
  )
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <Message icon={<CookingPot className="size-8 animate-pulse" />} title={label} />
  )
}

export function RecipeSkeleton() {
  return (
    <div aria-hidden className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="aspect-4/3 bg-stone-200 dark:bg-stone-800" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-5 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-5 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  )
}
