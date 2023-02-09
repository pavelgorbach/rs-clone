import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import { ROUTES } from '@/router'
import { Banner, Button } from '@/components'

export function Greeting() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const goToMainPage = () => {
    navigate(ROUTES.boards)
  }

  return (
    <section className="gap container m-auto mb-10 flex flex-col-reverse items-center justify-between md:flex-row">
      <div className="pl-0 text-center lg:pl-3 lg:text-left">
        <h1>
          <Trans i18nKey="greeting.title">
            Manage <span className="text-purple-600">any</span> task
          </Trans>
        </h1>
        <p>{t('greeting.desc')}</p>

        <Button text={t('greeting.button')} onClick={goToMainPage} />
      </div>

      <div className="lg:max-wl-lg flex max-w-xs sm:max-w-sm md:max-w-md">
        <Banner />
      </div>
    </section>
  )
}
