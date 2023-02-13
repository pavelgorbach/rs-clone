import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Column } from '@/api'

export type EditColumnFormData = Pick<Column, 'title'>

type Props = EditColumnFormData & {
  onSubmit: (data: EditColumnFormData) => void
}

export function EditColumnForm({ title, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<EditColumnFormData>({
    defaultValues: { title }
  })

  const { t } = useTranslation()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={t('common.name')}
      />
      {errors.title && t('common.nameRequired')}

      <Button type="success" text={t('common.change')} onClick={submit} />
    </div>
  )
}
