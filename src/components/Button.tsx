import cx from 'classnames'

type Props = {
  text: string
  className?: string
  onClick(e: React.MouseEvent): void
}

export function Button({ text, className, onClick }: Props) {
  return (
    <button
      className={cx(
        'whitespace-nowrap border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-600 hover:cursor-pointer hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2',
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
