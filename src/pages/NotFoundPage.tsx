import { Link } from 'react-router'
import { ErrorState } from '../components/states'

export default function NotFoundPage() {
  return (
    <div>
      <ErrorState message="That page doesn't exist." />
      <p className="text-center">
        <Link to="/" className="font-medium text-brand-700 underline dark:text-brand-500">Back to all recipes</Link>
      </p>
    </div>
  )
}
