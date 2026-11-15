import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'recipe-favorites'
const listeners = new Set<() => void>()
let cache: { raw: string | null; ids: ReadonlySet<number> } | null = null

function read(): ReadonlySet<number> {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    /* storage unavailable */
  }
  if (cache && cache.raw === raw) return cache.ids
  let ids: ReadonlySet<number> = new Set()
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (Array.isArray(parsed)) ids = new Set(parsed.filter((n): n is number => typeof n === 'number'))
  } catch {
    /* corrupt value: ignore */
  }
  cache = { raw, ids }
  return ids
}

function write(ids: ReadonlySet<number>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, read, () => new Set<number>())
  const toggle = useCallback((id: number) => {
    const next = new Set(read())
    if (!next.delete(id)) next.add(id)
    write(next)
  }, [])
  return { ids, toggle, isFavorite: (id: number) => ids.has(id) }
}
