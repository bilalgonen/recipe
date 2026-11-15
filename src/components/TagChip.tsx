import { Link } from 'react-router'

export function TagChip({ tag, active = false }: { tag: string; active?: boolean }) {
  return (
    <Link
      to={`/?tag=${encodeURIComponent(tag)}`}
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition ${
        active
          ? 'bg-brand-600 text-white'
          : 'bg-stone-100 text-stone-600 hover:bg-brand-100 hover:text-brand-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-brand-600/30'
      }`}
    >
      {tag}
    </Link>
  )
}
