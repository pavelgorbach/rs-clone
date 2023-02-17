import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router'
import { SignUpForm } from '@/components'
import useSignUp from '@/hooks/useSignUp'

export default function SignUpPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToSignInPage = () => navigate(ROUTES.signIn, { replace: true })

  const { mutate: signUp } = useSignUp(goToSignInPage)

  return (
    <div className="container m-auto">
      <h1 className="text-center">{t('common.welcome')}</h1>

      <div className="m-auto grid max-w-md bg-white p-4 shadow-md">
        <SignUpForm onSubmit={signUp} />

        <div className="prose-sm m-auto flex items-center gap-2">
          <p>{t('signUpForm.haveAnAccount')}</p>

          <Link className="text-purple-500 hover:text-purple-400" to={ROUTES.signIn}>
            {t('common.signIn')}
          </Link>
        </div>
      </div>
    </div>
  )
}
