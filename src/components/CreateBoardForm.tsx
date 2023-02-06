import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components'
import { Board } from '@/api'

type FormData = Omit<Board, 'id'>

type Props = {
  onSubmit: (data: FormData) => void
}

export function CreateBoardForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState
  const { t } = useTranslation()
  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...register('name', { required: true })}
        placeholder={t('createBoardForm.name')}
      />
      {errors.name && <span className="text-sm text-red-500">{t('createBoardForm.namer')}</span>}

      <textarea
        {...register('description', { required: true })}
        placeholder={t('createBoardForm.description')}
      />
      {errors.description && (
        <span className="text-sm text-red-500">{t('createBoardForm.descriptionRequired')}</span>
      )}

      <Button text={t('createBoardForm.create')} onClick={submit} />
    </div>
  )
}
