import { Link } from 'react-router-dom'

type Props = {
  id: number
  name: string
}

export function BoardCard({ id, name }: Props) {
  return (
    <Link to={`/board/${id}`}>
      <div className="board-card">
        <h3>{name}</h3>
      </div>
    </Link>
  )
}
