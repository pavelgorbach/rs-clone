import { Link } from 'react-router-dom'

import { ROUTES } from '@/router'

type Props = {
  title: string
}

export function Breadcrumbs({ title }: Props) {
  return (
    <div className="mb-2 flex gap-2 font-light">
      <Link to={ROUTES.boards} className="text-gray-400">
        Boards
      </Link>
      <span>/</span>
      <span>{title}</span>
    </div>
  )
}
