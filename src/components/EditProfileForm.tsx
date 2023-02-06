import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

type FormData = {
  name: string
  email: string
  password: string
}

type Props = {
  onSubmit: (data: FormData) => void
}

export function EditProfileForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState
  const { t } = useTranslation()

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...register('name', { required: true })}
        placeholder={t('editForm.name')}
      />
      {errors.name && t('editForm.namer')}
      <input
        type="email"
        {...register('email', { required: true })}
        placeholder={t('editForm.email')}
      />
      {errors.email && t('editForm.emailReqiured')}

      <p>{t('editForm.confirmationPhrase')}</p>
      <input
        type="password"
        {...register('password', { required: true })}
        placeholder={t('editForm.password')}
      />
      {errors.password && t('editForm.passwordReqiured')}

      <Button text={t('common.change')} onClick={submit} />
    </div>
  )
}
