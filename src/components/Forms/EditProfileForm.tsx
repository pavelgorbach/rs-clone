import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

export type EditProfileFormData = {
  name: string
  login: string
  password: string
}

type Props = Omit<EditProfileFormData, 'password'> & {
  onSubmit: (data: EditProfileFormData) => void
}

export function EditProfileForm({ onSubmit, ...defaultValues }: Props) {
  const { register, handleSubmit, formState } = useForm<EditProfileFormData>({ defaultValues })
  const { errors } = formState
  const { t } = useTranslation()

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{t('editForm.editUser')}</h2>

      <input
        type="text"
        {...register('name', { required: true })}
        placeholder={t('profile.name')}
      />
      <div className="text-red-500">{errors.name && t('editForm.namer')}</div>

      <input
        type="email"
        {...register('login', { required: true })}
        placeholder={t('editForm.email')}
      />
      <div className="text-red-500">{errors.login && t('editForm.emailReqiured')}</div>

      <p className="mt-4">{t('editForm.confirmationPhrase')}</p>

      <input
        type="password"
        {...register('password', { required: true })}
        placeholder={t('editForm.password')}
      />
      <div>{errors.password && t('editForm.passwordReqiured')}</div>

      <Button className="mt-4" text={t('common.change')} onClick={submit} />
    </div>
  )
}
