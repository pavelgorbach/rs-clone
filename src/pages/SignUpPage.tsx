import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router/routes'
import { SignUpForm } from '@/components'
import useSignUp from '@/hooks/useSignUp'

export default function SignUpPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToSignInPage = () => navigate(ROUTES.signIn, { replace: true })

  const { mutate: signUp } = useSignUp(goToSignInPage)

  return (
    <div className="container m-auto">
      <h1 className="text-center dark:text-slate-200">{t('common.welcome')}</h1>

      <div className="m-auto grid max-w-md bg-white p-4 shadow-md dark:bg-slate-500">
        <SignUpForm onSubmit={signUp} />

        <div className="prose-sm m-auto flex items-center gap-2 dark:text-slate-200">
          <p>{t('signUpForm.haveAnAccount')}</p>

          <Link
            className="text-purple-500 hover:text-purple-400 dark:text-purple-700 dark:hover:text-purple-900"
            to={ROUTES.signIn}
          >
            {t('common.signIn')}
          </Link>
        </div>
      </div>
    </div>
  )
}
