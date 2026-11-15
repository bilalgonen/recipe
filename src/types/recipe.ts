export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: Difficulty
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}

export type SearchMode = 'all' | 'name' | 'tag' | 'ingredient'
export type SortKey = 'relevance' | 'rating' | 'time' | 'calories' | 'name'

export interface RecipeFilters {
  q: string
  mode: SearchMode
  cuisine: string
  meal: string
  difficulty: string
  sort: SortKey
  favorites: boolean
  /** Exact tag filter (set by clicking a tag chip). */
  tag: string
}
