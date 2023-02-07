import { Switch as USwitch } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  enabled: boolean
  onChange: (cheched: boolean) => void
}

export function Switch({ enabled, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <USwitch
      checked={enabled}
      onChange={onChange}
      className={`${enabled ? 'bg-purple-100' : 'bg-purple-900'}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">{t('switch.settings')}</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
          pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </USwitch>
  )
}
