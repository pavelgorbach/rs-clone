import { useTranslation } from 'react-i18next'

export default function NoMatch() {
  const { t } = useTranslation()

  return <h2>{t('404.404')}</h2>
}
