import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import useProfilePage from '@/pages/Profile/useProfilePage'

export type EditProfileFormData = {
  name: string
  login: string
  password: string
}

type Props = {
  onSubmit: (data: EditProfileFormData) => void
}


export function EditProfileForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState, getValues } = useForm<EditProfileFormData>()
  const { errors } = formState
  const { t } = useTranslation()
  
  const submit = handleSubmit(onSubmit)
  
  const {
    user
  } = useProfilePage()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{t('editForm.editUser')}</h2>
      <input
        type="text"
        className="rounded-full pl-5"
        {...register('name', { required: true })}
        value={user?.name}
        placeholder={t('profile.name')}
      />
      <div className="text-red-500">{errors.name && t('editForm.namer')}</div>
      <input
        type="email"
        className="rounded-full pl-5"
        {...register('login', { required: true })}
        value={user?.login}
        placeholder={t('editForm.email')}
      />
      <div className="text-red-500">{errors.login && t('editForm.emailReqiured')}</div>

      <p className="mt-4">{t('editForm.confirmationPhrase')}</p>
      <input
        type="password"
        className="rounded-full pl-5"
        {...register('password', { required: true })}
        placeholder={t('editForm.password')}
      />
      <div>{errors.password && t('editForm.passwordReqiured')}</div>

      <Button className="mt-4" text={t('common.change')} onClick={submit} />
    </div>
  )
}
