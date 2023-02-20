import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

export type EditTaskFormData = {
  title: string
  description: string
}

type Props = {
  onSubmit: (data: EditTaskFormData) => void
  disabled?: boolean
} & EditTaskFormData

export function EditTaskForm({ title, description, disabled, onSubmit }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<EditTaskFormData>({
    defaultValues: { title, description }
  })

  const { errors } = formState

  return (
    <div className="flex flex-col gap-4">
      <input
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        type="text"
        {...register('title', { required: true })}
        placeholder={t('common.name')}
      />
      {errors.title && t('common.nameRequired')}

      <input
        type="text"
        className="dark:bg-slate-600 dark:text-slate-200 dark:placeholder:text-slate-200"
        {...register('description', { required: true })}
        placeholder={t('common.description')}
      />
      {errors.title && t('common.descriptionReqiured')}

      <Button
        type="success"
        text={t('common.change')}
        disabled={disabled}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}
