import { useEffect, useState } from 'react'
import cx from 'classnames'
import { ClockIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
  exp?: number
  onEnd(): void
}

export function Countdown({ exp = 0, className, onEnd }: Props) {
  const { t } = useTranslation()

  const [countDown, setCountDown] = useState(exp - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(exp - Date.now())
    }, 1000)

    if (countDown <= 0) {
      clearInterval(interval)
      onEnd()
    }

    return () => clearInterval(interval)
  }, [exp, countDown, onEnd])

  const { h, m, s } = toHMS(countDown)

  return (
    <div
      className={cx(
        'flex items-center gap-4 rounded-full border border-purple-600 bg-gray-50 py-1 px-2 text-xs',
        className
      )}
    >
      <ClockIcon className="h-8 w-8 text-purple-500" />

      <div>{t('profile.logout')}:</div>

      <div className="w-14">
        {h}:{m}:{s}
      </div>
    </div>
  )
}

const pad = (value: number) => ('0' + Math.floor(value)).slice(-2)

const toHMS = (distance: number) => {
  const h = pad((distance / (1000 * 60 * 60)) % 24)
  const m = pad((distance / (1000 * 60)) % 60)
  const s = pad((distance / 1000) % 60)
  return { h, m, s }
}
