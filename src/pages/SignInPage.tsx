import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router/routes'
import { LoginInput, SignInForm } from '@/components'
import useSignIn from '@/hooks/useSignIn'

export default function SignInPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const signIn = useSignIn()

  const handleLogin = async (data: LoginInput) => {
    await signIn.mutateAsync(data)
    navigate(ROUTES.boards, { replace: true })
  }

  return (
    <div className="container m-auto">
      <h1 className="text-center dark:text-slate-200">{t('common.welcome')}</h1>

      <div className="m-auto grid max-w-md bg-white p-4 shadow-md dark:bg-slate-500">
        <SignInForm onSubmit={handleLogin} />

        <div className="prose-sm m-auto flex items-center gap-2 dark:text-slate-200">
          <p>{t('signInForm.doNotHaveAnAccount')}</p>

          <Link
            className="text-purple-500 hover:text-purple-400 dark:text-purple-700 dark:hover:text-purple-900"
            to={ROUTES.signUp}
          >
            {t('common.signUp')}
          </Link>
        </div>
      </div>
    </div>
  )
}
