import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Board } from '@/api'

export type EditBoardFormData = Pick<Board, 'title'>

type Props = EditBoardFormData & {
  onSubmit: (data: EditBoardFormData) => void
}

export function EditBoardForm({ title, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<EditBoardFormData>({
    defaultValues: { title }
  })

  const { t } = useTranslation()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={t('createBoardForm.name')}
      />
      {errors.title && t('createBoardForm.namer')}

      <Button text={t('common.change')} onClick={submit} />
    </div>
  )
}
