import cx from 'classnames'
import { Loader } from './Loader'

type Props = {
  text: string
  className?: string
  type?: 'success' | 'error'
  disabled?: boolean
  onClick(e: React.MouseEvent): void
}

export function Button({ text, className, type, disabled, onClick }: Props) {
  return (
    <button
      className={cx(
        'whitespace-nowrap border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer hover:border-transparent hover:bg-purple-600 hover:text-white dark:focus:ring-offset-0',
        {
          'focus:ring-purple-600': !type,
          'border-red-500 text-red-500 focus:ring-red-500 hover:bg-red-500': type === 'error',
          'border-green-400 text-green-500 focus:ring-green-400 hover:bg-green-400':
            type === 'success'
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? <Loader /> : text}
    </button>
  )
}
