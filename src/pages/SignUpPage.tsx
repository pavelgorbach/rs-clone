import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { User } from '@/api'
import { ROUTES } from '@/router'
import { SignUpForm } from '@/components'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()
  const { t } = useTranslation()

  const from = location.state?.from?.pathname || '/'

  function onSubmit(data: Omit<User, '_id'>) {
    auth.signin(data.login, () => {
      navigate(from, { replace: true })
    })
  }

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
