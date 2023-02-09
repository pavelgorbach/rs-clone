import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { signUp } from '@/api'
import { ROUTES } from '@/router'
import { RegisterInput, SignUpForm } from '@/components'

export default function SignUpPageView() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: registerUser } = useMutation((userData: RegisterInput) => signUp(userData), {
    onSuccess(createdUser) {
      toast.success(`${createdUser.name} created. You can login now.`)
      navigate(ROUTES.signIn, { replace: true })
    },
    onError(e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })

  function onSubmit(data: RegisterInput) {
    registerUser(data)
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
