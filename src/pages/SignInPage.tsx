import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router'
import { SignInForm } from '@/components'
import useSignIn from '@/hooks/useSignIn'

export default function SignInPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToMainPage = () => navigate(ROUTES.boards, { replace: true })

  const { mutate: loginUser } = useSignIn(goToMainPage)

  return (
    <div className="container m-auto">
      <h1 className="text-center">{t('common.welcome')}</h1>

      <div className="m-auto grid max-w-md bg-white p-4 shadow-md">
        <SignInForm onSubmit={loginUser} />

        <div className="prose-sm m-auto flex items-center gap-2">
          <p>{t('signInForm.doNotHaveAnAccount')}</p>

          <Link className="text-purple-500 hover:text-purple-400" to={ROUTES.signUp}>
            {t('common.signUp')}
          </Link>
        </div>
      </div>
    </div>
  )
}
