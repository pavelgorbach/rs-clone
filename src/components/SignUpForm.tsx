import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

type FormData = {
  name: string
  login: string
  password: string
  confirm: string
}

type Props = {
  onSubmit: (username: FormData) => void
}

export function SignUpForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState
  const { t } = useTranslation()

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...register('name', { required: true })}
        placeholder={t('signUpForm.name')}
      />
      <span className="text-sm text-red-500">{errors.name && t('signUpForm.nameRequired')}</span>

      <input
        type="email"
        {...register('login', { required: true })}
        placeholder={t('signUpForm.login')}
      />
      <span className="text-sm text-red-500">{errors.login && t('signUpForm.loginReqiured')}</span>

      <input
        type="password"
        {...register('password', { required: true })}
        placeholder={t('signUpForm.password')}
      />
      <span className="text-sm text-red-500">
        {errors.password && t('signUpForm.passwordReqiured')}
      </span>

      <input
        type="password"
        {...register('confirm', { required: true })}
        placeholder={t('signUpForm.confirmPassword')}
      />
      <span className="text-sm text-red-500">
        {errors.password && t('signUpForm.passwordReqiured')}
      </span>

      <Button text={t('common.signUp')} onClick={submit} />
    </div>
  )
}
