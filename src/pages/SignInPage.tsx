import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { ROUTES } from '@/router'
import { signIn } from '@/api'
import { LoginInput, SignInForm } from '@/components'
import { StoreContext } from '@/store.context'

export default function SignInPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { authStore } = useContext(StoreContext)

  const { mutate: loginUser } = useMutation((userData: LoginInput) => signIn(userData), {
    onSuccess: (data) => {
      authStore.setToken(data.token)
      toast.success('You successfully logged in')
      navigate(ROUTES.boards, { replace: true })
    },
    onError(e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })

  async function onSubmit(credentials: LoginInput) {
    loginUser(credentials)
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

export const SignInPage = observer(SignInPageView)
