import { ROUTES } from '@/router'
import { Link } from 'react-router-dom'

export function Breadcrumbs(props: { title?: string }) {
  return (
    <div className="mb-2 flex gap-2 font-light">
      <Link to={ROUTES.boards} className="text-gray-400">
        Boards
      </Link>
      <span>/</span>
      <span>{props.title}</span>
    </div>
  )
}
