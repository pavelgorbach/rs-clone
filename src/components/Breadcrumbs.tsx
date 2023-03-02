import { Link } from 'react-router-dom'
import cx from 'classnames'

import { ROUTES } from '@/router/routes'

type Props = {
  title: string
  className?: string
}

export function Breadcrumbs({ title, className }: Props) {
  return (
    <div className={cx('mb-2 flex gap-2 font-light', className)}>
      <Link to={ROUTES.boards} className="text-gray-400 dark:text-slate-200">
        Boards
      </Link>
      <span className="dark:text-slate-200">/</span>
      <span className="dark:text-slate-400">{title}</span>
    </div>
  )
}
