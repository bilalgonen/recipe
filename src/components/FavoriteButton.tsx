import { Heart } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'

export function FavoriteButton({ id, name, className = '' }: { id: number; name: string; className?: string }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(id)
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      onClick={() => toggle(id)}
      className={`grid size-9 place-items-center rounded-full bg-white/90 shadow transition hover:scale-110 dark:bg-stone-900/90 ${className}`}
    >
      <Heart className={`size-5 ${active ? 'fill-red-500 text-red-500' : 'text-stone-600 dark:text-stone-300'}`} />
    </button>
  )
}
