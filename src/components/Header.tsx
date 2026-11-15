import { ChefHat, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { useFavorites } from '../hooks/useFavorites'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { ids } = useFavorites()
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-stone-50/85 backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white">
            <ChefHat className="size-5" />
          </span>
          Recipe Box
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/?favorites=1"
            className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-stone-600 transition hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <Heart className="size-4" />
            Favorites
            <span className="rounded-full bg-stone-200 px-2 text-xs dark:bg-stone-800">{ids.size}</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
