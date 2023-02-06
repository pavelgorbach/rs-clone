import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Board } from '@/api'

type Props = Board & {
  onSubmit: (data: Board) => void
}

export function EditBoardForm({ id, name, description, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<Board>({
    defaultValues: { id, name, description }
  })

  const { t } = useTranslation()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input className="hidden" type="hidden" {...register('id')} />

      <input
        type="text"
        {...register('name', { required: true })}
        placeholder={t('createBoardForm.name')}
      />
      {errors.name && t('createBoardForm.namer')}

      <textarea
        {...register('description', { required: true })}
        placeholder={t('createBoardForm.description')}
      />
      {errors.description && t('createBoardForm.descriptionRequired')}

      <Button text={t('common.change')} onClick={submit} />
    </div>
  )
}
