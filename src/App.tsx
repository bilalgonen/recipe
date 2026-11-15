import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AboutDialog } from './components/AboutDialog'
import { Header } from './components/Header'
import { Loading } from './components/states'
import HomePage from './pages/HomePage'

const RecipePage = lazy(() => import('./pages/RecipePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
})

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
          Skip to content
        </a>
        <Header onAbout={() => setAboutOpen(true)} />
        <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
          Data from <a className="underline" href="https://dummyjson.com/docs/recipes" target="_blank" rel="noreferrer">DummyJSON</a> · Built with React 19, TypeScript, Vite &amp; Tailwind CSS 4 ·{' '}
          <button type="button" onClick={() => setAboutOpen(true)} className="underline">About this project</button>
        </footer>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
