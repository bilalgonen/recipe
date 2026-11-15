import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'recipe-theme'

function current(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => void listeners.delete(cb)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => 'light' as Theme)
  const toggle = useCallback(() => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l())
  }, [])
  return { theme, toggle }
}
