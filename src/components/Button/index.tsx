import './style.css'

type Props = {
  text: string
  onClick(): void
}

export function Button({ text, onClick }: Props) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  )
}
