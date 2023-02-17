import { Link } from 'react-router-dom'
import cx from 'classnames'

import { ROUTES } from '@/router'

type Props = {
  title: string
  className?: string
}

export function Breadcrumbs({ title, className }: Props) {
  return (
    <div className={cx('flex mb-2 gap-2 font-light', className)}>
      <Link to={ROUTES.boards} className="text-gray-400">
        Boards
      </Link>
      <span>/</span>
      <span>{title}</span>
    </div>
  )
}
