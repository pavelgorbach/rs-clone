type Props = {
  id: number
  name: string
}

export function Column({ id, name }: Props) {
  return (
    <div className="column">
      <h3>{name}</h3>
    </div>
  )
}
