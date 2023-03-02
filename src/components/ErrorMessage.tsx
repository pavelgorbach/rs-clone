import { useTranslation } from 'react-i18next'

type Props = {
  error: Error | unknown
}

export function ErrorMessage({ error }: Props) {
  const { t } = useTranslation()

  return (
    <div className="container m-auto">
      {t('boardsPage.error')} {error instanceof Error ? error.message : 'something went wrong'}
    </div>
  )
}
