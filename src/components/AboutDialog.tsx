import { Code, ExternalLink, Globe, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { LINKS } from '../lib/links'

const STACK = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS 4',
  'TanStack Query',
  'React Router',
  'Vitest & Testing Library',
  'Cloudflare Workers',
]

interface Props {
  open: boolean
  onClose: () => void
}

export function AboutDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="about-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl border border-stone-200 bg-white p-0 text-stone-900 shadow-2xl backdrop:bg-stone-950/60 backdrop:backdrop-blur-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
    >
      <div className="relative max-h-[85vh] space-y-5 overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
        >
          <X className="size-5" />
        </button>

        <h2 id="about-title" className="pr-10 text-2xl font-bold tracking-tight">
          About Recipe Box
        </h2>

        <div className="space-y-3 leading-relaxed text-stone-700 dark:text-stone-300">
          <p>
            Recipe Box is a fast, responsive web app for deciding what to cook. Search recipes by name, tag or
            ingredient, narrow them with cuisine, meal type and difficulty filters, then open a recipe to see
            timing, nutrition, an ingredient checklist and step-by-step instructions.
          </p>
          <p>
            It is built for people who start from what is in the fridge, not just a dish name. Results update
            instantly as you type, every search is a shareable link, and favorites are saved in your browser.
            It works on phones and desktops, in light and dark mode, and is fully keyboard accessible.
          </p>
          <p>
            It is also a portfolio project: a production-style single-page app with typed data access, URL-driven
            state, infinite scrolling, accessibility, automated tests and edge deployment.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
            Built with
          </h3>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-brand-600/25 dark:text-brand-100">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Recipe data from the free DummyJSON API.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-5 dark:border-stone-800">
          <a href={LINKS.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            <ExternalLink className="size-4" /> Live Demo
          </a>
          <a href={LINKS.source} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800">
            <Code className="size-4" /> Source
          </a>
          <a href={LINKS.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800">
            <Globe className="size-4" /> bilalgonen.com
          </a>
        </div>
      </div>
    </dialog>
  )
}
