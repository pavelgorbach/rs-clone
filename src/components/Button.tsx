type Props = {
  text: string
  onClick(): void
}

export function Button({ text, onClick }: Props) {
  return (
    <button
      className="border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:cursor-pointer hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
