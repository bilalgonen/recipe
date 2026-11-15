import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Reveals items in pages as a sentinel element scrolls into view.
 * Remount the consuming component (via `key`) to reset the count.
 */
export function useInfiniteReveal(total: number, pageSize = 30) {
  const [count, setCount] = useState(pageSize)
  const observer = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      observer.current?.disconnect()
      observer.current = null
      if (!node) return
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setCount((c) => Math.min(c + pageSize, total))
        },
        { rootMargin: '400px' },
      )
      observer.current.observe(node)
    },
    // `count` is intentional: a new callback identity re-attaches the observer so a
    // sentinel that is still on screen after a reveal triggers the next page.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
    [pageSize, total, count],
  )

  useEffect(() => () => observer.current?.disconnect(), [])

  return { visibleCount: Math.min(count, total), hasMore: count < total, sentinelRef }
}
