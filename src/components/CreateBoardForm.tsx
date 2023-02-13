import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components'
import { Board } from '@/api'

export type CreateBoardFormData = Pick<Board, 'title'>

type Props = {
  onSubmit: (data: CreateBoardFormData) => void
}

export function CreateBoardForm({ onSubmit }: Props) {
  const { t } = useTranslation()

  const { register, handleSubmit, formState } = useForm<CreateBoardFormData>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={t('createBoardForm.name')}
      />
      {errors.title && <span className="text-sm text-red-500">{t('createBoardForm.namer')}</span>}

      <Button
        text={t('createBoardForm.create')}
        className="border-green-500  text-green-500 hover:bg-green-500"
        onClick={submit}
      />
    </div>
  )
}
