import { useTranslation } from 'react-i18next'

export default function NoMatch() {
  const { t } = useTranslation()

  return (
    <div className="container m-auto">
      <h2>{t('404.404')}</h2>
    </div>
  )
}
