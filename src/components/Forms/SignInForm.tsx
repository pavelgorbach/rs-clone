import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

export type LoginInput = {
  login: string
  password: string
}

type Props = {
  onSubmit: (data: LoginInput) => void
}

export function SignInForm({ onSubmit }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<LoginInput>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        className="dark:border-slate-100 dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="email"
        {...register('login', { required: true })}
        placeholder={t('common.login')}
      />
      <span className="text-sm text-red-500">{errors.login && t('common.loginReqiured')}</span>

      <input
        className="dark:border-slate-100 dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="password"
        {...register('password', { required: true })}
        placeholder={t('common.password')}
      />
      <span className="text-sm text-red-500">
        {errors.password && t('common.passwordReqiured')}
      </span>

      <Button
        text={t('common.signIn')}
        onClick={submit}
        className="dark:border-none dark:bg-slate-800"
      />
    </div>
  )
}
