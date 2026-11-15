import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Recipe } from '../types/recipe'
import HomePage from './HomePage'

const make = (id: number, over: Partial<Recipe> = {}): Recipe => ({
  id,
  name: `Recipe ${id}`,
  ingredients: ['Salt'],
  instructions: ['Cook'],
  prepTimeMinutes: 5,
  cookTimeMinutes: 5,
  servings: 2,
  difficulty: 'Easy',
  cuisine: 'Italian',
  caloriesPerServing: 200,
  tags: ['Quick'],
  userId: 1,
  image: '',
  rating: 4,
  reviewCount: 3,
  mealType: ['Dinner'],
  ...over,
})

const recipes = [
  ...Array.from({ length: 40 }, (_, i) => make(i + 1)),
  make(100, { name: 'Garlic Bread', ingredients: ['Garlic', 'Bread'] }),
]

function renderHome(url = '/') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[url]}>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} unobserve() {} })
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ recipes, total: recipes.length, skip: 0, limit: 0 }))))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('shows the first 30 recipes', async () => {
    renderHome()
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(30))
    expect(screen.getByText(/41 recipes/)).toBeInTheDocument()
  })

  it('searches by ingredient', async () => {
    renderHome('/?mode=ingredient')
    await screen.findAllByRole('article')
    await userEvent.type(screen.getByRole('searchbox'), 'garlic')
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(1))
    expect(screen.getByText(/Garlic Bread/)).toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    renderHome('/?q=zzzz')
    expect(await screen.findByText('No recipes found')).toBeInTheDocument()
  })

  it('shows an error state when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 500 })))
    renderHome()
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
  })
})
