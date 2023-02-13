import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components'
import { Column } from '@/api'

export type CreateColumnFormData = Pick<Column, 'title'>

type Props = {
  onSubmit: (data: CreateColumnFormData) => void
}

export function CreateColumnForm({ onSubmit }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<CreateColumnFormData>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={t('common.name')}
      />
      {errors.title && <span className="text-sm text-red-500">{t('common.nameRequired')}</span>}

      <Button type="success" text={t('common.create')} onClick={submit} />
    </div>
  )
}
