import { describe, expect, it } from 'vitest'
import type { Recipe } from '../types/recipe'
import { DEFAULT_FILTERS, filterRecipes, uniqueValues } from './filterRecipes'

const make = (over: Partial<Recipe>): Recipe => ({
  id: 1,
  name: 'Test',
  ingredients: [],
  instructions: [],
  prepTimeMinutes: 10,
  cookTimeMinutes: 10,
  servings: 2,
  difficulty: 'Easy',
  cuisine: 'Italian',
  caloriesPerServing: 300,
  tags: [],
  userId: 1,
  image: '',
  rating: 4,
  reviewCount: 1,
  mealType: ['Dinner'],
  ...over,
})

const recipes = [
  make({ id: 1, name: 'Margherita Pizza', tags: ['Pizza', 'Italian'], ingredients: ['Dough', 'Basil'], rating: 4.5 }),
  make({ id: 2, name: 'Chocolate Cookies', tags: ['Dessert'], ingredients: ['Flour', 'Chocolate chips'], cuisine: 'American', mealType: ['Snack'], difficulty: 'Medium', rating: 4.9 }),
  make({ id: 3, name: 'Garlic Pasta', tags: ['Pasta'], ingredients: ['Garlic', 'Spaghetti'], rating: 3.8, cookTimeMinutes: 5 }),
]
const f = (over: object) => ({ ...DEFAULT_FILTERS, ...over })
const ids = (r: Recipe[]) => r.map((x) => x.id)

describe('filterRecipes', () => {
  it('returns everything with default filters', () => {
    expect(filterRecipes(recipes, DEFAULT_FILTERS)).toHaveLength(3)
  })
  it('searches by name only', () => {
    expect(ids(filterRecipes(recipes, f({ q: 'pizza', mode: 'name' })))).toEqual([1])
    expect(filterRecipes(recipes, f({ q: 'dessert', mode: 'name' }))).toHaveLength(0)
  })
  it('searches by tag only', () => {
    expect(ids(filterRecipes(recipes, f({ q: 'dessert', mode: 'tag' })))).toEqual([2])
  })
  it('searches by ingredient only', () => {
    expect(ids(filterRecipes(recipes, f({ q: 'garlic', mode: 'ingredient' })))).toEqual([3])
  })
  it('searches everything in "all" mode, case-insensitively', () => {
    expect(ids(filterRecipes(recipes, f({ q: 'CHOCOLATE' })))).toEqual([2])
    expect(ids(filterRecipes(recipes, f({ q: 'italian' })))).toEqual([1, 3])
  })
  it('combines filters', () => {
    expect(ids(filterRecipes(recipes, f({ cuisine: 'Italian', difficulty: 'Easy' })))).toEqual([1, 3])
    expect(ids(filterRecipes(recipes, f({ meal: 'Snack' })))).toEqual([2])
    expect(ids(filterRecipes(recipes, f({ tag: 'Pasta' })))).toEqual([3])
  })
  it('filters favorites', () => {
    expect(ids(filterRecipes(recipes, f({ favorites: true }), new Set([3])))).toEqual([3])
  })
  it('sorts without mutating the input', () => {
    expect(ids(filterRecipes(recipes, f({ sort: 'rating' })))).toEqual([2, 1, 3])
    expect(ids(filterRecipes(recipes, f({ sort: 'time' })))[0]).toBe(3)
    expect(ids(recipes)).toEqual([1, 2, 3])
  })
})

describe('uniqueValues', () => {
  it('dedupes and sorts', () => {
    expect(uniqueValues(recipes, (r) => r.cuisine)).toEqual(['American', 'Italian'])
    expect(uniqueValues(recipes, (r) => r.mealType)).toEqual(['Dinner', 'Snack'])
  })
})
