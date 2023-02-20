import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Board } from '@/api'

export type EditBoardFormData = Pick<Board, 'title'>

type Props = EditBoardFormData & {
  onSubmit: (data: EditBoardFormData) => void
  disabled?: boolean
}

export function EditBoardForm({ title, disabled, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<EditBoardFormData>({
    defaultValues: { title }
  })

  const { t } = useTranslation()
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
      {errors.title && t('common.nameRequired')}

      <Button type="success" text={t('common.change')} disabled={disabled} onClick={submit} />
    </div>
  )
}
