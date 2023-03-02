import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components'

export type CreateBoardFormData = { title: string }

type Props = {
  onSubmit: (data: CreateBoardFormData) => void
  disabled?: boolean
}

export function CreateBoardForm({ onSubmit, disabled }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<CreateBoardFormData>()
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

      <Button type="success" text={t('common.create')} disabled={disabled} onClick={submit} />
    </div>
  )
}
