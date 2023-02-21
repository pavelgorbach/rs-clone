import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

export type EditProfileFormData = {
  name: string
  login: string
  password: string
}

type Props = {
  name: string
  login: string
  onSubmit: (data: EditProfileFormData) => void
  disabled?: boolean
}

export function EditProfileForm({ onSubmit, disabled, ...defaultValues }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<EditProfileFormData>({ defaultValues })
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold dark:text-slate-200">{t('editForm.editUser')}</h2>

      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="text"
        {...register('name', { required: true })}
        placeholder={t('profile.name')}
      />
      <div className="text-red-500">{errors.name && t('editForm.namer')}</div>

      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="email"
        {...register('login', { required: true })}
        placeholder={t('editForm.email')}
      />
      <div className="text-red-500">{errors.login && t('editForm.emailReqiured')}</div>

      <p className="mt-4 dark:text-slate-200">{t('editForm.confirmationPhrase')}</p>

      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="password"
        {...register('password', { required: true })}
        placeholder={t('editForm.password')}
      />
      <div>{errors.password && t('editForm.passwordReqiured')}</div>

      <Button
        className="mt-4 dark:border-slate-400 dark:bg-slate-700 dark:hover:border-purple-700"
        text={t('common.change')}
        disabled={disabled}
        onClick={submit}
      />
    </div>
  )
}
