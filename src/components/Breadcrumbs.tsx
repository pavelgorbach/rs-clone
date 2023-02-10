import { ROUTES } from '@/router'
import { Link } from 'react-router-dom'

export function Breadcrumbs(props: { title?: string }) {
  return (
    <div>
      <Link to={ROUTES.boards}>{'Boards'}</Link>/{props.title}
    </div>
  )
}