import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import { ROUTES } from '@/router/routes'
import { Banner, Button } from '@/components'

export function Greeting() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const goToMainPage = () => {
    navigate(ROUTES.boards)
  }

  return (
    <section className="container m-auto mb-10 flex flex-col-reverse items-center justify-between md:flex-row lg:px-20">
      <div className="pl-0 text-center lg:prose-lg lg:pl-3 lg:text-left xl:prose-xl">
        <h1 className="dark:text-slate-200">
          <Trans i18nKey="greeting.title">
            Manage <span className="text-purple-600">any</span> task
          </Trans>
        </h1>
        <p className="dark:text-slate-200">{t('greeting.desc')}</p>

        <Button text={t('greeting.button')} onClick={goToMainPage} />
      </div>

      <div className="lg:max-wl-lg flex max-w-xs sm:max-w-sm md:max-w-md">
        <Banner />
      </div>
    </section>
  )
}
