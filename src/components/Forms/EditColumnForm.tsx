import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Column } from '@/api'

export type EditColumnFormData = Pick<Column, 'title'>

type Props = {
  onSubmit: (data: EditColumnFormData) => void
  disabled?: boolean
} & EditColumnFormData

export function EditColumnForm({ title, onSubmit, disabled }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<EditColumnFormData>({
    defaultValues: { title }
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

      <Button
        type="success"
        text={t('common.change')}
        disabled={disabled}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}
