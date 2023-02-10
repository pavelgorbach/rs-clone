import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router'
import { SignUpForm } from '@/components'
import useSignUpPage from './useSignUpPage'

export default function SignUpPageView() {
  const { t } = useTranslation()
  const { onSubmit } = useSignUpPage()

  return (
    <div className="container m-auto grid max-w-md bg-white p-4">
      <h1>{t('common.welcome')}</h1>
      <SignUpForm onSubmit={onSubmit} />

      <div className="prose-sm m-auto flex items-center gap-2">
        <p>{t('signUpForm.haveAnAccount')}</p>
        <Link className="text-purple-500 hover:text-purple-400" to={ROUTES.signIn}>
          {t('common.signIn')}
        </Link>
      </div>
    </div>
  )
}
