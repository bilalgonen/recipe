import { splitMatches } from '../lib/highlight'

export function Highlight({ text, query }: { text: string; query: string }) {
  return (
    <>
      {splitMatches(text, query).map((part, i) =>
        part.match ? (
          <mark key={i} className="rounded bg-brand-100 px-0.5 text-inherit dark:bg-brand-600/40">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  )
}
