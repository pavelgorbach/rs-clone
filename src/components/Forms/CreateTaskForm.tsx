import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

export type CreateTaskFormData = {
  title: string
  description: string
}

type Props = {
  onSubmit: (data: CreateTaskFormData) => void
  disabled?: boolean
}

export function CreateTaskForm({ onSubmit, disabled }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<CreateTaskFormData>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-4">
      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="text"
        {...register('title', { required: true })}
        placeholder={t('common.name')}
      />
      {errors.title && <span className="text-sm text-red-500">{t('common.nameRequired')}</span>}

      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="text"
        {...register('description', { required: true })}
        placeholder={t('common.description')}
      />
      {errors.title && (
        <span className="text-sm text-red-500">{t('common.descriptionReqiured')}</span>
      )}

      <Button type="success" text={t('common.create')} disabled={disabled} onClick={submit} />
    </div>
  )
}
