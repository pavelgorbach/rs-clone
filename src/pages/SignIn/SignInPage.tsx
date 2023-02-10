import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { ROUTES } from '@/router'
import { SignInForm } from '@/components'
import useSignInPage from './useSignInPage'

function SignInPageView() {
  const { t } = useTranslation()
  const { onSubmit } = useSignInPage()

  return (
    <div className="container m-auto grid max-w-md bg-white p-4">
      <h1>{t('common.welcome')}</h1>
      <SignInForm onSubmit={onSubmit} />

      <div className="prose-sm m-auto flex items-center gap-2">
        <p>{t('signInForm.doNotHaveAnAccount')}</p>
        <Link className="text-purple-500 hover:text-purple-400" to={ROUTES.signUp}>
          {t('common.signUp')}
        </Link>
      </div>
    </div>
  )
}

export default observer(SignInPageView)
