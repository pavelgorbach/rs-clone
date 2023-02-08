import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

type FormData = {
  login: string
  password: string
}

type Props = {
  onSubmit: (username: FormData) => void
}

export function SignInForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState
  const { t } = useTranslation()

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        {...register('login', { required: true })}
        placeholder={t('common.login')}
      />
      <span className="text-sm text-red-500">{errors.login && t('common.loginReqiured')}</span>

      <input
        type="password"
        {...register('password', { required: true })}
        placeholder={t('common.password')}
      />
      <span className="text-sm text-red-500">
        {errors.password && t('common.passwordReqiured')}
      </span>

      <Button text={t('common.signIn')} onClick={submit} />
    </div>
  )
}