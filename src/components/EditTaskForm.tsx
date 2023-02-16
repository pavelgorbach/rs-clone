import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'

type EditTaskFormData = {
  title: string
  description: string
}

type Props = {
  onSubmit: (data: EditTaskFormData) => void
} & EditTaskFormData

export function EditTaskForm({ title, description, onSubmit }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<EditTaskFormData>({
    defaultValues: { title, description }
  })

  const { errors } = formState

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={t('common.name')}
      />
      {errors.title && t('common.nameRequired')}

      <input
        type="text"
        {...register('description', { required: true })}
        placeholder={t('common.description')}
      />
      {errors.title && t('common.descriptionReqiured')}

      <Button type="success" text={t('common.change')} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}
