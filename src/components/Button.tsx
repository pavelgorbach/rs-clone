import cx from 'classnames'

type Props = {
  text: string
  className?: string
  type?: 'success' | 'error'
  onClick(e: React.MouseEvent): void
}

export function Button({ text, className, type, onClick }: Props) {
  return (
    <button
      className={cx(
        'whitespace-nowrap border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-600 hover:cursor-pointer hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
        className,
        {
          'focus:ring-purple-600': !type,
          'border-red-500 text-red-500 hover:bg-red-500 focus:ring-red-600': type === 'error',
          'border-green-500 text-green-500 hover:bg-green-500 focus:ring-green-600':
            type === 'success'
        }
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
