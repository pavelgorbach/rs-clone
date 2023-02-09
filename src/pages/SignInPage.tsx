import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router'
import { useAuth } from '@/hooks'
import { SignInForm } from '@/components'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const { t } = useTranslation()

  const from = location.state?.from?.pathname || '/'

  function onSubmit(data: { login: string; password: string }) {
    auth.signin(data.login, () => {
      navigate(from, { replace: true })
    })
  }

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
