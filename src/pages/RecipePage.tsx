import { ArrowLeft, ChefHat, Clock, Flame, Star, Users } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import { FavoriteButton } from '../components/FavoriteButton'
import { TagChip } from '../components/TagChip'
import { ErrorState, Loading } from '../components/states'
import { useRecipe } from '../hooks/useRecipes'
import { totalTime } from '../lib/filterRecipes'

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <span className="text-brand-600">{icon}</span>
      <div>
        <div className="text-xs text-stone-500 dark:text-stone-400">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  )
}

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: recipe, isPending, isError } = useRecipe(Number(id))
  const [checked, setChecked] = useState<ReadonlySet<number>>(new Set())

  const back = () => (window.history.length > 1 ? navigate(-1) : navigate('/'))

  if (isPending) return <Loading label="Loading recipe…" />
  if (isError || !recipe) {
    return (
      <div>
        <ErrorState message="We couldn't find that recipe." />
        <p className="text-center"><Link to="/" className="font-medium text-brand-700 underline dark:text-brand-500">Back to all recipes</Link></p>
      </div>
    )
  }

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (!next.delete(i)) next.add(i)
      return next
    })

  return (
    <main id="main" className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <button type="button" onClick={back} className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-brand-700 dark:text-stone-400">
        <ArrowLeft className="size-4" /> Back
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-stone-200 dark:bg-stone-800">
          <img src={recipe.image} alt={recipe.name} width={600} height={600} className="aspect-square size-full object-cover" />
          <FavoriteButton id={recipe.id} name={recipe.name} className="absolute top-4 right-4 !size-11" />
        </div>
        <div className="space-y-5">
          <p className="text-sm font-medium tracking-wide text-brand-700 uppercase dark:text-brand-500">
            {recipe.cuisine} · {recipe.mealType.join(', ')}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{recipe.name}</h1>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat icon={<Star className="size-5" />} label={`${recipe.reviewCount} reviews`} value={`${recipe.rating.toFixed(1)} / 5`} />
            <Stat icon={<ChefHat className="size-5" />} label="Difficulty" value={recipe.difficulty} />
            <Stat icon={<Clock className="size-5" />} label={`Prep ${recipe.prepTimeMinutes} + cook ${recipe.cookTimeMinutes}`} value={`${totalTime(recipe)} min`} />
            <Stat icon={<Users className="size-5" />} label="Servings" value={String(recipe.servings)} />
            <Stat icon={<Flame className="size-5" />} label="Per serving" value={`${recipe.caloriesPerServing} kcal`} />
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <section className="md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} className="mt-1 size-4 accent-brand-600" />
                  <span className={checked.has(i) ? 'text-stone-400 line-through' : ''}>{ing}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
        <section className="md:col-span-3">
          <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
