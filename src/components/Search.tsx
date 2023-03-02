import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

type Props = {
  onChange: (text: string) => void
}

export function Search({ onChange }: Props) {
  const { t } = useTranslation()

  const [focusValue, setFocusValue] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div
      className={cx('relative col-span-4 flex w-min border', {
        'border-gray-300 dark:border-slate-800': !focusValue,
        ' border-purple-500': focusValue
      })}
    >
      <input
        className="w-60 border-none bg-gray-100 outline-none focus:ring-0 dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="search"
        placeholder={t('boardsPage.search')}
        onChange={handleChange}
        onFocus={() => setFocusValue(true)}
        onBlur={() => setFocusValue(false)}
      />
      <div className={cx('absolute right-1 translate-y-1/2', { hidden: focusValue })}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
      </div>
    </div>
  )
}
