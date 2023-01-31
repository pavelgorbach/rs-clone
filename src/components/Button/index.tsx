export function Button(p: { text: string; onClick(): void }) {
  return (
    <button onClick={p.onClick}>
      {p.text}
    </button>
  )
}
