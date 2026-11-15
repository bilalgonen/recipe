import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-10 place-items-center rounded-full text-stone-600 transition hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}
